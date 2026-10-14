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
];
