// questions.js - Baza de date dedicată
window.questionsData = [
  {
    id: 1,
    question: "În care dintre următoarele situații este interzisă depășirea vehiculelor pe drumurile publice?",
    image: null,
    options: [
      { id: "A", text: "În intersecțiile cu circulație nedirijată." },
      { id: "B", text: "Pe sectoarele de drum unde vizibilitatea este sub 50 m." },
      { id: "C", text: "La trecerile pentru pietoni semnalizate." }
    ],
    correct: ["A", "B", "C"],
    article: "Art. 120 Regulament: Depășirea este interzisă în intersecții nedirijate, pe trecerile de pietoni semnalizate și în curbe unde vizibilitatea este redusă sub 50 m."
  },
  {
    id: 2,
    question: "Ce semnificație are indicatorul 'Oprire' (STOP) instalat la o intersecție?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Romania_road_sign_B2.svg/300px-Romania_road_sign_B2.svg.png",
    options: [
      { id: "A", text: "Obligă la oprirea completă a vehiculului în locul cu vizibilitate maximă, fără a depăși colțul intersecției." },
      { id: "B", text: "Obligă la acordarea priorității tuturor vehiculelor care circulă pe drumul prioritar." },
      { id: "C", text: "Permite trecerea fără oprire dacă din stânga și din dreapta nu se apropie niciun vehicul." }
    ],
    correct: ["A", "B"],
    article: "Indicatorul 'Oprire' (STOP) impune oprirea obligatorie a tuturor vehiculelor indiferent dacă pe drumul prioritar vine sau nu cineva, urmată de acordarea priorității."
  },
  {
    id: 3,
    question: "Cum procedați la apropierea de o trecere la nivel cu o cale ferată industrială fără bariere?",
    image: null,
    options: [
      { id: "A", text: "Opriți obligatoriu autovehiculul înainte de indicator." },
      { id: "B", text: "Reduceți viteza și vă asigurați că nu circulă niciun vehicul feroviar." },
      { id: "C", text: "Măriți viteza pentru a elibera cât mai repede zona de traversare." }
    ],
    correct: ["B"],
    article: "Art. 138 Regulament: La trecerea la nivel cu o cale ferată industrială, conducătorul este obligat doar să reducă viteza și să se asigure că nu se apropie niciun tren."
  },
  {
    id: 4,
    question: "Ce semnificație are indicatorul din imagine?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Romania_road_sign_A1.svg/300px-Romania_road_sign_A1.svg.png",
    options: [
      { id: "A", text: "Curbă deosebit de periculoasă la dreapta." },
      { id: "B", text: "Curbă la stânga." },
      { id: "C", text: "Drum îngustat pe ambele părți." }
    ],
    correct: ["B"],
    article: "Indicatorul avertizează apropierea de o curbă la stânga. Conducătorul este obligat să reducă viteza și să circule cât mai aproape de marginea din dreapta a drumului."
  },
  {
    id: 5,
    question: "În care dintre situațiile de mai jos este interzisă întoarcerea vehiculului?",
    image: null,
    options: [
      { id: "A", text: "În curbe și în alte locuri unde vizibilitatea este redusă sub 50 m." },
      { id: "B", text: "La mai puțin de 50 m de o trecere la nivel cu calea ferată." },
      { id: "C", text: "Pe poduri și sub poduri." }
    ],
    correct: ["A", "B", "C"],
    article: "Art. 126 Regulament: Întoarcerea este interzisă în toate locurile unde este interzisă oprirea voluntară (pe poduri, sub poduri, la sub 50m de calea ferată, în curbe cu vizibilitate sub 50m)."
  },
  {
    id: 6,
    question: "Ce obligații aveți la apropierea unui autovehicul al pompierilor cu semnalele speciale roșii și sonore în funcțiune?",
    image: null,
    options: [
      { id: "A", text: "Reduceți viteza și circulați cât mai aproape de bordură sau acostament." },
      { id: "B", text: "Opriți imediat pe acostament sau, în lipsa acestuia, cât mai aproape de marginea drumului." },
      { id: "C", text: "Măriți viteza pentru a elibera intersecția." }
    ],
    correct: ["B"],
    article: "Art. 37 OUG 195/2002: La apropierea vehiculelor prioritare cu lumini roșii în funcțiune, conducătorii sunt obligați să oprească imediat cât mai aproape de marginea drumului."
  },
  {
    id: 7,
    question: "La semnalul galben intermitent al semaforului electric aveți obligația:",
    image: null,
    options: [
      { id: "A", text: "Să opriți autovehiculul până la apariția semnalului verde." },
      { id: "B", text: "Să reduceți viteza și să respectați semnalizarea rutieră și regulile de prioritate aplicabile în acel loc." },
      { id: "C", text: "Să circulați cu o viteză de cel mult 30 km/h în localități." }
    ],
    correct: ["B"],
    article: "Art. 53 Regulament: Lumina galbenă intermitentă permite trecerea, dar obligă conducătorul să reducă viteza și să respecte regulile de prioritate din acea intersecție."
  },
  {
    id: 8,
    question: "Care este viteza maximă legală admisă în localități pentru categoria B?",
    image: null,
    options: [
      { id: "A", text: "40 km/h." },
      { id: "B", text: "50 km/h (sau până la 80 km/h pe anumite sectoare stabilite de administrator)." },
      { id: "C", text: "70 km/h în mod general." }
    ],
    correct: ["B"],
    article: "Art. 49 OUG 195/2002: Limita generală în localități este de 50 km/h, putând fi crescută pe anumite sectoare până la maximum 80 km/h."
  }
];
