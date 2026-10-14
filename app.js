let activeQuestions = [];
let initialTotal = 0;
let correctCount = 0;
let wrongCount = 0;
let deferredCount = 0;
let userSelections = new Set();
let secondsLeft = 30 * 60;
let timerRef = null;
let isPaused = false;
let isMistakesMode = false;

// BAZĂ DE DATE PENTRU INDICATOARE RUTIERE (TAB 2)
const signsData = [
  {
    category: 'prioritate',
    icon: '🛑',
    name: 'Oprire (STOP)',
    desc: 'Obligă la oprirea completă în locul cu vizibilitate maximă și acordarea priorității tuturor vehiculelor.'
  },
  {
    category: 'prioritate',
    icon: '▽',
    name: 'Cedează trecerea',
    desc: 'Obligă la reducerea vitezei și acordarea priorității vehiculelor de pe drumul prioritar.'
  },
  {
    category: 'prioritate',
    icon: '◇',
    name: 'Drum cu prioritate',
    desc: 'Conferă prioritate de trecere în toate intersecțiile până la indicatorul „Sfârșitul drumului cu prioritate”.'
  },
  {
    category: 'avertizare',
    icon: '⚠️',
    name: 'Curbă deosebit de periculoasă',
    desc: 'Viteza se reduce obligatoriu sub 30 km/h în localități și 50 km/h în afara lor.'
  },
  {
    category: 'avertizare',
    icon: '🚶',
    name: 'Trecere de pietoni',
    desc: 'Avertizează apropierea de o trecere. Viteza se reduce la sub 30 km/h dacă drumul are maxim o bandă pe sens.'
  },
  {
    category: 'interzicere',
    icon: '⛔',
    name: 'Accesul interzis',
    desc: 'Interzice accesul tuturor vehiculelor pe sensul respectiv de mers.'
  },
  {
    category: 'interzicere',
    icon: '🚫',
    name: 'Depășirea autovehiculelor interzisă',
    desc: 'Interzice depășirea tuturor autovehiculelor (cu excepția motocicletelor fără ataș și mopedelor).'
  },
  {
    category: 'interzicere',
    icon: '🅿️',
    name: 'Staționarea interzisă',
    desc: 'Interzice imobilizarea voluntară a vehiculului pe o durată mai mare de 5 minute.'
  }
];

// MODUL NAVIGARE TAB-URI (BOTTOM NAVIGATION)
function switchTab(tabId) {
  HapticFeedback.tap();

  // Resetăm butoanele de jos
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));

  if (tabId === 'quizzes') {
    document.getElementById('tabBtnQuizzes').classList.add('active');
    document.getElementById('tabViewQuizzes').classList.add('active');
  } else if (tabId === 'signs') {
    document.getElementById('tabBtnSigns').classList.add('active');
    document.getElementById('tabViewSigns').classList.add('active');
    renderSigns('toate');
  } else if (tabId === 'guide') {
    document.getElementById('tabBtnGuide').classList.add('active');
    document.getElementById('tabViewGuide').classList.add('active');
  }
}

function renderSigns(category) {
  const container = document.getElementById('containerSigns');
  if (!container) return;

  const filtered = category === 'toate' 
    ? signsData 
    : signsData.filter(s => s.category === category);

  container.innerHTML = filtered.map(sign => `
    <div class="sign-card">
      <div class="sign-badge">${sign.icon}</div>
      <div>
        <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${sign.name}</div>
        <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${sign.desc}</div>
      </div>
    </div>
  `).join('');
}

function filterSigns(category, btnElement) {
  HapticFeedback.tap();
  document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderSigns(category);
}

// MODUL GESTIONARE CAIET DE GREȘELI
const MistakesManager = {
  STORAGE_KEY: 'autopass_drpciv_mistakes',

  getMistakeIds() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addMistake(questionId) {
    if (!questionId) return;
    const list = this.getMistakeIds();
    if (!list.includes(questionId)) {
      list.push(questionId);
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      } catch (e) {}
    }
    this.renderBadge();
  },

  removeMistake(questionId) {
    if (!questionId) return;
    let list = this.getMistakeIds();
    list = list.filter(id => id !== questionId);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    this.renderBadge();
  },

  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {}
    this.renderBadge();
  },

  renderBadge() {
    const list = this.getMistakeIds();
    const lbl = document.getElementById('lblMistakesCount');
    const btn = document.getElementById('btnStartMistakes');
    if (lbl) {
      lbl.textContent = list.length === 1 ? '1 întrebare de recuperat' : `${list.length} întrebări de recuperat`;
    }
    if (btn) {
      btn.disabled = list.length === 0;
    }
  }
};

// MODUL GESTIONARE TEMĂ
const ThemeManager = {
  STORAGE_KEY: 'autopass_theme_mode',

  getTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(theme);
    HapticFeedback.tap();
  },

  applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    const tMain = document.getElementById('toggleTheme');
    const tPause = document.getElementById('togglePauseTheme');
    if (tMain) tMain.checked = isLight;
    if (tPause) tPause.checked = isLight;
  },

  init() {
    this.applyTheme(this.getTheme());
  }
};

// MODUL FEEDBACK HAPTIC
const HapticFeedback = {
  STORAGE_KEY: 'autopass_vibrate_enabled',

  isEnabled() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === null ? true : saved === 'true';
  },

  setVibrationEnabled(enabled) {
    localStorage.setItem(this.STORAGE_KEY, enabled);
    this.syncToggles(enabled);
    if (enabled) this.tap();
  },

  syncToggles(enabled) {
    const tMain = document.getElementById('toggleVibration');
    const tPause = document.getElementById('togglePauseVibration');
    if (tMain) tMain.checked = enabled;
    if (tPause) tPause.checked = enabled;
  },

  tap() {
    if (this.isEnabled() && navigator.vibrate) {
      try { navigator.vibrate(15); } catch (e) {}
    }
  },

  error() {
    if (this.isEnabled() && navigator.vibrate) {
      try { navigator.vibrate([50, 50, 100]); } catch (e) {}
    }
  },

  action() {
    if (this.isEnabled() && navigator.vibrate) {
      try { navigator.vibrate(20); } catch (e) {}
    }
  }
};

// MODUL STATISTICI TESTE
const StatsManager = {
  STORAGE_KEY: 'autopass_drpciv_stats',

  getStats() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : { total: 0, passed: 0, failed: 0, history: [] };
    } catch (e) {
      return { total: 0, passed: 0, failed: 0, history: [] };
    }
  },

  recordTest(isPassed, score) {
    const stats = this.getStats();
    stats.total++;
    if (isPassed) {
      stats.passed++;
    } else {
      stats.failed++;
    }

    stats.history.unshift({
      date: new Date().toLocaleDateString('ro-RO'),
      score: score,
      passed: isPassed
    });
    if (stats.history.length > 10) stats.history.pop();

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {}

    this.renderStats();
  },

  reset() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {}
    this.renderStats();
  },

  renderStats() {
    const stats = this.getStats();
    const elTotal = document.getElementById('statTotalTests');
    const elPassed = document.getElementById('statPassedTests');
    const elFailed = document.getElementById('statFailedTests');
    const elRate = document.getElementById('lblPassRate');

    if (elTotal) elTotal.textContent = stats.total;
    if (elPassed) elPassed.textContent = stats.passed;
    if (elFailed) elFailed.textContent = stats.failed;

    if (elRate) {
      const rate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
      elRate.textContent = `${rate}% Admis`;
      elRate.style.color = rate >= 70 ? '#10b981' : (rate >= 50 ? '#d97706' : '#ef4444');
    }
  }
};

function toggleSettings(show) {
  HapticFeedback.action();
  const modal = document.getElementById('settingsModal');
  if (modal) {
    if (show) {
      modal.classList.add('active');
      HapticFeedback.syncToggles(HapticFeedback.isEnabled());
      ThemeManager.applyTheme(ThemeManager.getTheme());
    } else {
      modal.classList.remove('active');
    }
  }
}

function resetStatistics() {
  HapticFeedback.action();
  const confirmAction = confirm("Ești sigur că vrei să resetezi toate statisticile?");
  if (confirmAction) {
    StatsManager.reset();
    toggleSettings(false);
  }
}

function clearMistakesBook() {
  HapticFeedback.action();
  const confirmAction = confirm("Sigur vrei să golești Caietul de Greșeli?");
  if (confirmAction) {
    MistakesManager.clear();
    toggleSettings(false);
  }
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initTest() {
  HapticFeedback.action();
  const source = window.questionsData || window.localDatabase || (typeof localDatabase !== 'undefined' ? localDatabase : null);

  if (!source || !Array.isArray(source) || source.length === 0) {
    alert("Eroare: Nu am putut citi baza de întrebări!");
    return;
  }

  isMistakesMode = false;
  activeQuestions = shuffleArray(source).slice(0, 26);
  setupExamUI("Întrebarea activă", "/5");
}

function initMistakesTest() {
  HapticFeedback.action();
  const mistakeIds = MistakesManager.getMistakeIds();
  const source = window.questionsData || window.localDatabase || (typeof localDatabase !== 'undefined' ? localDatabase : null);

  if (!source || mistakeIds.length === 0) {
    alert("Nu ai nicio întrebare greșită salvată în caiet!");
    return;
  }

  const filtered = source.filter(q => mistakeIds.includes(q.id));
  if (filtered.length === 0) {
    alert("Întrebările din caiet nu mai există în baza de date.");
    MistakesManager.clear();
    return;
  }

  isMistakesMode = true;
  activeQuestions = shuffleArray(filtered);
  setupExamUI("Caiet de Greșeli", "");
}

function setupExamUI(badgeText, wrongMaxText) {
  initialTotal = activeQuestions.length;
  correctCount = 0;
  wrongCount = 0;
  deferredCount = 0;
  secondsLeft = isMistakesMode ? Math.max(activeQuestions.length * 70, 300) : 30 * 60;
  isPaused = false;

  document.getElementById('lblQuizModeBadge').textContent = badgeText;
  document.getElementById('lblWrongMax').textContent = wrongMaxText;
  document.getElementById('lblCorrect').textContent = '0';
  document.getElementById('lblWrong').textContent = '0';
  updateCounters();

  document.getElementById('startScreen').classList.remove('active');
  document.getElementById('quizScreen').classList.add('active');

  renderQuestion();
  startTimer();
}

function startTimer() {
  if (timerRef) clearInterval(timerRef);
  timerRef = setInterval(updateTimer, 1000);
}

function stopTimer() {
  if (timerRef) {
    clearInterval(timerRef);
    timerRef = null;
  }
}

function togglePause() {
  HapticFeedback.action();
  isPaused = !isPaused;
  const overlay = document.getElementById('pauseOverlay');
  const icon = document.getElementById('iconPause');

  if (isPaused) {
    stopTimer();
    HapticFeedback.syncToggles(HapticFeedback.isEnabled());
    ThemeManager.applyTheme(ThemeManager.getTheme());
    overlay.classList.add('active');
    icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  } else {
    startTimer();
    overlay.classList.remove('active');
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
  }
}

function abortTest() {
  HapticFeedback.action();
  const confirmAbort = confirm("Sigur vrei să abandonezi? Progresul actual nu va fi salvat.");
  if (confirmAbort) {
    stopTimer();
    isPaused = false;
    document.getElementById('pauseOverlay').classList.remove('active');
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    MistakesManager.renderBadge();
  }
}

function updateCounters() {
  document.getElementById('lblRemaining').textContent = activeQuestions.length;
  document.getElementById('lblDeferredCount').textContent = deferredCount;
  const completed = initialTotal - activeQuestions.length;
  const progress = (completed / initialTotal) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateTimer() {
  if (isPaused) return;

  secondsLeft--;
  const min = Math.floor(secondsLeft / 60);
  const sec = secondsLeft % 60;
  document.getElementById('lblTimer').textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  if (secondsLeft <= 0) finalize(false, "Timpul acordat a expirat.");
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
      if (isPaused) return;
      HapticFeedback.tap();

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
  if (isPaused) return;
  HapticFeedback.action();
  userSelections.clear();
  document.querySelectorAll('.opt-card').forEach(el => el.classList.remove('selected'));
}

function deferQuestion() {
  if (isPaused) return;
  HapticFeedback.action();
  if (activeQuestions.length <= 1) {
    alert("Aceasta este ultima întrebare!");
    return;
  }
  const deferred = activeQuestions.shift();
  activeQuestions.push(deferred);
  deferredCount++;
  renderQuestion();
}

function validateCurrentAnswer() {
  if (isPaused) return;

  const q = activeQuestions[0];
  const selectedArr = Array.from(userSelections).sort();
  const correctArr = [...q.correct].sort();

  const isMatch = JSON.stringify(selectedArr) === JSON.stringify(correctArr);

  if (isMatch) {
    HapticFeedback.tap();
    correctCount++;
    document.getElementById('lblCorrect').textContent = correctCount;

    if (isMistakesMode) {
      MistakesManager.removeMistake(q.id);
    }

    advance();
  } else {
    HapticFeedback.error();
    wrongCount++;
    document.getElementById('lblWrong').textContent = wrongCount;
    document.getElementById('secondaryActions').style.display = 'none';

    if (!isMistakesMode) {
      MistakesManager.addMistake(q.id);
    }

    const box = document.getElementById('boxExplanation');
    box.style.display = 'block';
    box.innerHTML = `<strong>Răspuns incorect!</strong> Variante corecte: <b>${correctArr.join(', ')}</b><br><br>${q.article}`;

    if (!isMistakesMode && wrongCount >= 5) {
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
    if (isMistakesMode) {
      finalize(true, `Ai terminat recapitularea! Ai rezolvat cu succes ${correctCount} întrebări din ${initialTotal}.`);
    } else {
      finalize(correctCount >= 22, `Ai obținut ${correctCount} puncte din ${initialTotal}.`);
    }
  } else {
    renderQuestion();
  }
}

function finalize(isPassed, details) {
  stopTimer();
  document.getElementById('quizScreen').classList.remove('active');
  document.getElementById('endScreen').classList.add('active');

  if (!isMistakesMode) {
    StatsManager.recordTest(isPassed, correctCount);
  }

  const title = document.getElementById('endTitle');
  if (isMistakesMode) {
    title.textContent = "Recapitulare Finalizată! 🎯";
    title.style.color = "#10b981";
  } else {
    title.textContent = isPassed ? "ADMIS 🎉" : "RESPINS ❌";
    title.style.color = isPassed ? "#10b981" : "#ef4444";
  }
  document.getElementById('endSubtitle').textContent = details;
  MistakesManager.renderBadge();
}

window.switchTab = switchTab;
window.filterSigns = filterSigns;
window.initTest = initTest;
window.initMistakesTest = initMistakesTest;
window.clearSelection = clearSelection;
window.deferQuestion = deferQuestion;
window.validateCurrentAnswer = validateCurrentAnswer;
window.togglePause = togglePause;
window.abortTest = abortTest;
window.toggleSettings = toggleSettings;
window.resetStatistics = resetStatistics;
window.clearMistakesBook = clearMistakesBook;
window.HapticFeedback = HapticFeedback;
window.ThemeManager = ThemeManager;

function bindEvents() {
  ThemeManager.init();
  StatsManager.renderStats();
  MistakesManager.renderBadge();
  HapticFeedback.syncToggles(HapticFeedback.isEnabled());

  const btnStart = document.getElementById('btnStart');
  if (btnStart) btnStart.onclick = initTest;

  const btnRestart = document.getElementById('btnRestart');
  if (btnRestart) btnRestart.onclick = () => location.reload();

  const btnClear = document.getElementById('btnClear');
  if (btnClear) btnClear.onclick = clearSelection;

  const btnDefer = document.getElementById('btnDefer');
  if (btnDefer) btnDefer.onclick = deferQuestion;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindEvents);
} else {
  bindEvents();
}
