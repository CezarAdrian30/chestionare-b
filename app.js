let activeQuestions = [];
let initialTotal = 0;
let correctCount = 0;
let wrongCount = 0;
let deferredCount = 0;
let userSelections = new Set();
let secondsLeft = 30 * 60;
let timerRef = null;

// Modul suport reclame (gestionează ascunderea în timpul examenului și afișarea la final)
const AdManager = {
  onTestStart() {
    // În timpul examenului nu afișăm reclame pentru a nu distrage candidatul
    console.log("[AdMob] Examen pornit - banner ascuns.");
  },
  onTestEnd() {
    // La finalul examenului se poate apela reclama nativă AdMob
    console.log("[AdMob] Examen încheiat - banner activat pe ecranul de rezultat.");
  }
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initTest() {
  const source = window.questionsData;

  if (!source || !Array.isArray(source) || source.length === 0) {
    alert("Eroare: Fișierul questions.js nu conține date sau nu a fost găsit!");
    return;
  }

  AdManager.onTestStart();

  activeQuestions = shuffleArray(source).slice(0, 26);
  initialTotal = activeQuestions.length;

  correctCount = 0;
  wrongCount = 0;
  deferredCount = 0;
  secondsLeft = 30 * 60;

  document.getElementById('lblCorrect').textContent = '0';
  document.getElementById('lblWrong').textContent = '0';
  updateCounters();

  document.getElementById('startScreen').classList.remove('active');
  document.getElementById('quizScreen').classList.add('active');

  renderQuestion();
  if (timerRef) clearInterval(timerRef);
  timerRef = setInterval(updateTimer, 1000);
}

function updateCounters() {
  document.getElementById('lblRemaining').textContent = activeQuestions.length;
  document.getElementById('lblDeferredCount').textContent = deferredCount;
  const completed = initialTotal - activeQuestions.length;
  const progress = (completed / initialTotal) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateTimer() {
  secondsLeft--;
  const min = Math.floor(secondsLeft / 60);
  const sec = secondsLeft % 60;
  document.getElementById('lblTimer').textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  if (secondsLeft <= 0) finalize(false, "Timpul de 30 de minute a expirat.");
}

function renderQuestion() {
  userSelections.clear();
  document.getElementById('boxExplanation').style.display = 'none';
  document.getElementById('secondaryActions').style.display = 'grid';

  const btn = document.getElementById('btnAction');
  btn.textContent = "Trimite Răspunsul";
  btn.onclick = validateCurrentAnswer;

  const q = activeQuestions[0];
  document.getElementById('lblQuestionText').textContent = q.question;

  const imgContainer = document.getElementById('imgContainer');
  const qImage = document.getElementById('qImage');
  if (q.image) {
    qImage.src = q.image;
    imgContainer.style.display = 'block';
  } else {
    imgContainer.style.display = 'none';
    qImage.src = '';
  }

  const container = document.getElementById('containerOptions');
  container.innerHTML = '';

  q.options.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'opt-card';
    item.id = `opt-${opt.id}`;
    item.innerHTML = `<span class="opt-tag">${opt.id}</span><span>${opt.text}</span>`;
    item.onclick = () => {
      if (userSelections.has(opt.id)) {
        userSelections.delete(opt.id);
        item.classList.remove('selected');
      } else {
        userSelections.add(opt.id);
        item.classList.add('selected');
      }
    };
    container.appendChild(item);
  });

  updateCounters();
}

function clearSelection() {
  userSelections.clear();
  document.querySelectorAll('.opt-card').forEach(el => el.classList.remove('selected'));
}

function deferQuestion() {
  if (activeQuestions.length <= 1) {
    alert("Aceasta este ultima întrebare din chestionar!");
    return;
  }
  const deferred = activeQuestions.shift();
  activeQuestions.push(deferred);
  deferredCount++;
  renderQuestion();
}

function validateCurrentAnswer() {
  const q = activeQuestions[0];
  const selectedArr = Array.from(userSelections).sort();
  const correctArr = [...q.correct].sort();

  const isMatch = JSON.stringify(selectedArr) === JSON.stringify(correctArr);

  if (isMatch) {
    correctCount++;
    document.getElementById('lblCorrect').textContent = correctCount;
    advance();
  } else {
    wrongCount++;
    document.getElementById('lblWrong').textContent = wrongCount;
    document.getElementById('secondaryActions').style.display = 'none';

    const box = document.getElementById('boxExplanation');
    box.style.display = 'block';
    box.innerHTML = `<strong>Răspuns incorect!</strong> Variante corecte: <b>${correctArr.join(', ')}</b><br><br>${q.article}`;

    if (wrongCount >= 5) {
      finalize(false, "Ai acumulat 5 răspunsuri greșite. Examen picat.");
      return;
    }

    const btn = document.getElementById('btnAction');
    btn.textContent = "Continuă la următoarea";
    btn.onclick = advance;
  }
}

function advance() {
  activeQuestions.shift();

  if (activeQuestions.length === 0) {
    finalize(correctCount >= 22, `Ai obținut ${correctCount} puncte din ${initialTotal}.`);
  } else {
    renderQuestion();
  }
}

function finalize(isPassed, details) {
  clearInterval(timerRef);
  document.getElementById('quizScreen').classList.remove('active');
  document.getElementById('endScreen').classList.add('active');

  AdManager.onTestEnd();

  const title = document.getElementById('endTitle');
  title.textContent = isPassed ? "ADMIS 🎉" : "RESPINS ❌";
  title.style.color = isPassed ? "#34d399" : "#f87171";
  document.getElementById('endSubtitle').textContent = details;
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnStart').addEventListener('click', initTest);
  document.getElementById('btnRestart').addEventListener('click', () => location.reload());
  document.getElementById('btnClear').addEventListener('click', clearSelection);
  document.getElementById('btnDefer').addEventListener('click', deferQuestion);
});
