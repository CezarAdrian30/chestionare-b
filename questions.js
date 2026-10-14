// questions.js - Baza de date locală (offline) cu suport pentru imagini
const localDatabase = [
  {
    id: 1,
    question: "În care dintre următoarele situații este interzisă depășirea vehiculelor pe drumurile publice?",
    image: null, // Fără imagine
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
    question: "Care dintre autovehicule va trece primul prin intersecția prezentată în imagine?",
    // Exemplu de imagine SVG/Vectorială curată direct integrată sau link extern
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=80",
    options: [
      { id: "A", text: "Autoturismul roșu, deoarece vine din partea dreaptă." },
      { id: "B", text: "Autocamionul, deoarece circulă pe drumul cu prioritate." },
      { id: "C", text: "Autoturismul albastru, acordând prioritate de dreapta." }
    ],
    correct: ["B"],
    article: "Art. 57 OUG 195/2002: Vehiculele care circulă pe un drum semnalizat cu indicatorul 'Drum cu prioritate' au prioritate de trecere față de cele care vin de pe un drum secundar."
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
    article: "Art. 138 Regulament: La trecerea la nivel cu o cale ferată industrială, conducătorul este obligat doar să reducă viteza și să se asigure că nu se apropie niciun convoi feroviar."
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
    article: "Indicatorul avertizează apropierea de o curbă la stânga. Conducătorul auto este obligat să reducă viteza și să circule cât mai aproape de marginea din dreapta."
  }
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
    article: "Art. 126 Regulament: Întoarcerea este interzisă în toate locurile unde este interzisă și oprirea voluntară (pe poduri, sub poduri, la mai puțin de 50m de calea ferată, în curbe cu vizibilitate sub 50m)."
  },
  {
    id: 6,
    question: "Cum procedați atunci când circulați pe un drum public și vă întâlniți cu un autovehicul al pompierilor care are în funcțiune semnalele speciale luminoase de culoare roșie și sonore?",
    image: null,
    options: [
      { id: "A", text: "Reduceți viteza și circulați cât mai aproape de bordură sau acostament." },
      { id: "B", text: "Opriți imediat pe acostament sau, în lipsa acestuia, cât mai aproape de marginea drumului sau de bordura trotuarului." },
      { id: "C", text: "Măriți viteza pentru a elibera intersecția." }
    ],
    correct: ["B"],
    article: "Art. 37 OUG 195/2002: La apropierea vehiculelor cu regim de circulație prioritară ce au în funcțiune lumina roșie (Pompieri, Poliție), conducătorii sunt obligați să oprească imediat pe acostament sau cât mai aproape de marginea drumului."
  },
  {
    id: 7,
    question: "Ce obligații aveți dacă ați accidentat un pieton care traversa strada pe trecerea semnalizată?",
    image: null,
    options: [
      { id: "A", text: "Să transportați imediat victima la cel mai apropiat spital, fără aprobarea poliției." },
      { id: "B", text: "Să anunțați imediat poliția prin numărul unic 112, să nu modificați sau să ștergeți urmele accidentului și să rămâneți la fața locului." },
      { id: "C", text: "Să mutați mașina pe trotuar pentru a nu bloca circulația celorlalte vehicule." }
    ],
    correct: ["B"],
    article: "Art. 77 OUG 195/2002: În cazul accidentelor soldate cu victime, este strict interzisă părăsirea locului accidentului sau modificarea urmelor. Se apelează 112 și se acordă primul ajutor până la sosirea echipajelor."
  },
  {
    id: 8,
    question: "La semnalul galben intermitent al semaforului electric aveți obligația:",
    image: null,
    options: [
      { id: "A", text: "Să opriți autovehiculul până la apariția semnalului verde." },
      { id: "B", text: "Să reduceți viteza și să respectați semnalizarea rutieră și regulile de prioritate aplicabile în acel loc." },
      { id: "C", text: "Să circulați cu o viteză de cel mult 30 km/h în localități." }
    ],
    correct: ["B"],
    article: "Art. 53 Regulament: Lumina galbenă intermitentă permite trecerea, dar obligă conducătorul de vehicul să reducă viteza și să respecte regulile de prioritate din acea zonă."
  },
  {
    id: 9,
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
    id: 10,
    question: "În care dintre situații se suspendă exercitarea dreptului de a conduce autovehicule pe drumurile publice?",
    image: null,
    options: [
      { id: "A", text: "La depășirea cu mai mult de 50 km/h a vitezei maxime admise pe sectorul respectiv de drum." },
      { id: "B", text: "La neoprirea la trecerea la nivel cu calea ferată curentă când barierele sunt coborâte sau în curs de coborâre." },
      { id: "C", text: "La conducerea sub influența băuturilor alcoolice (valoare sub pragul de infracțiune)." }
    ],
    correct: ["A", "B", "C"],
    article: "Art. 100-102 OUG 195/2002: Toate aceste abateri atrag suspendarea dreptului de a conduce (reținerea permisului) pe perioade între 90 și 120 de zile."
  },
  {
    id: 11,
    question: "Care dintre manevre este interzisă pe autostradă?",
    image: null,
    options: [
      { id: "A", text: "Întoarcerea sau mersul înapoi." },
      { id: "B", text: "Circulația sau staționarea pe banda de urgență, cu excepția cazurilor de forță majoră." },
      { id: "C", text: "Depășirea altor autovehicule pe banda din stânga." }
    ],
    correct: ["A", "B"],
    article: "Art. 74 OUG 195/2002: Pe autostradă sunt strict interzise învățarea conducerii, încercările prototipurilor, mersul înapoi, întoarcerea, precum și circulația pe banda de urgență nejustificată."
  },
  {
    id: 12,
    question: "Când este obligat conducătorul auto să folosească luminile de avarie?",
    image: null,
    options: [
      { id: "A", text: "Când vehiculul este imobilizat involuntar pe partea carosabilă." },
      { id: "B", text: "Când este remorcat." },
      { id: "C", text: "Când circulă foarte încet din cauza unor defecțiuni tehnice." }
    ],
    correct: ["A", "B", "C"],
    article: "Art. 114 Regulament: Luminile de avarie se folosesc când vehiculul este imobilizat forțat, când este remorcat, când se deplasează lent din motive de avarie sau când se formează o coloană oprită brusc în față."
  }
];
