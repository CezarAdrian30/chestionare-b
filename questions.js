/**
 * questions.js - Baza de date dedicată pentru chestionare auto Cat. B
 * Conține întrebări oficiale DRPCIV / DGPCI, variante de răspuns, imagini și articole de lege.
 */
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
    article: "Art. 120 Regulament: Se interzice depășirea în intersecții nedirijate, pe trecerile de pietoni semnalizate și în curbe sau alte locuri unde vizibilitatea este redusă sub 50 m."
  },
  {
    id: 2,
    question: "Ce semnificație are indicatorul instalat la apropierea de intersecție?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Romania_road_sign_B2.svg/300px-Romania_road_sign_B2.svg.png",
    options: [
      { id: "A", text: "Obligă la oprirea completă a autovehiculului în locul cu vizibilitate maximă, fără a depăși colțul intersecției." },
      { id: "B", text: "Obligă la acordarea priorității tuturor vehiculelor care circulă pe drumul prioritar." },
      { id: "C", text: "Permite traversarea fără oprire dacă din stânga și din dreapta nu se apropie niciun vehicul." }
    ],
    correct: ["A", "B"],
    article: "Indicatorul 'Oprire' (STOP): Conducătorul este obligat să oprească complet în locul cu vizibilitate maximă și să acorde prioritate tuturor vehiculelor de pe drumul prioritar."
  },
  {
    id: 3,
    question: "Cum procedați la apropierea de o trecere la nivel cu o cale ferată industrială fără bariere?",
    image: null,
    options: [
      { id: "A", text: "Opriți obligatoriu autovehiculul înainte de calea ferată." },
      { id: "B", text: "Reduceți viteza și vă asigurați că nu circulă niciun vehicul feroviar." },
      { id: "C", text: "Măriți viteza pentru a elibera cât mai repede zona de traversare." }
    ],
    correct: ["B"],
    article: "Art. 138 Regulament: La trecerea la nivel cu o cale ferată industrială, conducătorul auto este obligat doar să reducă viteza și să se asigure că nu se apropie niciun convoi."
  },
  {
    id: 4,
    question: "Ce semnificație are indicatorul din imagine?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Romania_road_sign_A1.svg/300px-Romania_road_sign_A1.svg.png",
    options: [
      { id: "A", text: "Curbă deosebit de periculoasă la dreapta." },
      { id: "B", text: "Curbă periculoasă la stânga." },
      { id: "C", text: "Drum îngustat pe partea stângă." }
    ],
    correct: ["B"],
    article: "Indicatorul 'Curbă la stânga' avertizează apropierea de un viraj periculos. Se reduce viteza și se circulă cât mai aproape de marginea dreaptă a carosabilului."
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
    article: "Art. 126 Regulament: Întoarcerea este interzisă în toate locurile unde este interzisă oprirea voluntară (pe poduri, sub poduri, la sub 50 m de calea ferată, în curbe cu vizibilitate sub 50 m)."
  },
  {
    id: 6,
    question: "Ce obligații aveți la întâlnirea indicatorului din imagine?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Romania_road_sign_B1.svg/300px-Romania_road_sign_B1.svg.png",
    options: [
      { id: "A", text: "Să opriți obligatoriu autovehiculul chiar dacă nu circulă nimeni." },
      { id: "B", text: "Să reduceți viteza și să acordați prioritate vehiculelor care circulă pe drumul prioritar." },
      { id: "C", text: "Să acordați prioritate numai autovehiculelor care vin din dreapta." }
    ],
    correct: ["B"],
    article: "Indicatorul 'Cedează trecerea' obligă conducătorul să reducă viteza și să acorde prioritate de trecere vehiculelor de pe drumul prioritar. Oprirea este obligatorie doar pentru acordarea priorității."
  },
  {
    id: 7,
    question: "Ce obligații aveți la apropierea unui autovehicul al pompierilor cu semnalele speciale roșii și sonore în funcțiune?",
    image: null,
    options: [
      { id: "A", text: "Reduceți viteza și circulați cât mai aproape de bordură sau acostament." },
      { id: "B", text: "Opriți imediat pe acostament sau, în lipsa acestuia, cât mai aproape de marginea drumului." },
      { id: "C", text: "Măriți viteza pentru a elibera intersecția în fața acestuia." }
    ],
    correct: ["B"],
    article: "Art. 37 OUG 195/2002: La apropierea vehiculelor prioritare echipate cu semnal luminos de culoare roșie (Pompieri, Poliție), conducătorii sunt obligați să oprească imediat cât mai aproape de marginea carosabilului."
  },
  {
    id: 8,
    question: "La semnalul galben intermitent al semaforului electric aveți obligația:",
    image: null,
    options: [
      { id: "A", text: "Să opriți autovehiculul până la apariția luminii verzi." },
      { id: "B", text: "Să reduceți viteza și să respectați semnalizarea rutieră și regulile de prioritate din acea intersecție." },
      { id: "C", text: "Să circulați cu o viteză maximă de 30 km/h." }
    ],
    correct: ["B"],
    article: "Art. 53 Regulament: Lumina galbenă intermitentă permite trecerea, dar obligă conducătorul să reducă viteza și să respecte regulile de prioritate specifice locului respectiv."
  },
  {
    id: 9,
    question: "Care este viteza maximă legală admisă în localități pentru categoria B?",
    image: null,
    options: [
      { id: "A", text: "40 km/h." },
      { id: "B", text: "50 km/h (sau până la 80 km/h pe anumite sectoare stabilite de administratorul drumului)." },
      { id: "C", text: "70 km/h pe toate străzile principale." }
    ],
    correct: ["B"],
    article: "Art. 49 OUG 195/2002: Limita maximă de viteză în localități este de 50 km/h, putând fi stabilită pe anumite tronsoane până la cel mult 80 km/h."
  },
  {
    id: 10,
    question: "În care dintre situațiile de mai jos se suspendă dreptul de a conduce autovehicule pe drumurile publice?",
    image: null,
    options: [
      { id: "A", text: "La depășirea cu mai mult de 50 km/h a vitezei maxime admise." },
      { id: "B", text: "La neoprirea la trecerea la nivel cu calea ferată curentă când barierele sunt coborâte." },
      { id: "C", text: "La conducerea sub influența băuturilor alcoolice (contravaloare sub limita de infracțiune)." }
    ],
    correct: ["A", "B", "C"],
    article: "Art. 100-102 OUG 195/2002: Toate aceste abateri grave atrag măsura complementară de suspendare a dreptului de a conduce pe o perioadă de 90 sau 120 de zile."
  }
];

// Păstrăm și denumirea clasică pentru compatibilitate maximă
window.localDatabase = window.questionsData;
