/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — QUIZ (lógica do jogo)
   -------------------------------------------------------------------------
   • monta a lista de perguntas ATIVAS da missão;
   • EMBARALHA as 4 alternativas a cada apresentação (Fisher–Yates) com a
     posição da resposta correta ALEATÓRIA — a correta nunca fica sempre
     na mesma letra, e a correção continua válida após o embaralhamento;
   • corrige a resposta, conta acertos, calcula estrelas e pontuação.
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.quiz = (function () {
  "use strict";

  var LETTERS = ["A", "B", "C", "D"];

  var state = {
    missionId: null,
    questions: [],
    index: 0,
    correct: 0,
    total: 0,
    presented: null,   /* alternativas embaralhadas da pergunta atual */
    answered: false
  };

  function shuffle(array) {
    var copy = array.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function reset() {
    state.missionId = null;
    state.questions = [];
    state.index = 0;
    state.correct = 0;
    state.total = 0;
    state.presented = null;
    state.answered = false;
  }

  function start(missionId) {
    reset();
    state.missionId = missionId;
    state.questions = MFS.missionUtils.activeQuestions(missionId);
    state.total = state.questions.length;
    return state.total;
  }

  /* Embaralha só a APRESENTAÇÃO; cada alternativa carrega se é correta. */
  function present(question) {
    var items = question.options.map(function (text, i) {
      return { text: text, correct: i === question.correct };
    });
    items = shuffle(items);
    items.forEach(function (item, i) { item.letter = LETTERS[i]; });
    return items;
  }

  function getCurrent() {
    if (!state.questions.length) return null;
    if (state.index >= state.questions.length) return null;
    if (!state.presented) state.presented = present(state.questions[state.index]);
    return {
      question: state.questions[state.index],
      options: state.presented,
      number: state.index + 1,
      total: state.questions.length
    };
  }

  /* Corrige comparando a MARCA da alternativa (nunca a posição fixa). */
  function answer(optionIndex) {
    if (state.answered || !state.presented) return null;
    state.answered = true;
    var chosen = state.presented[optionIndex];
    var isCorrect = !!(chosen && chosen.correct);
    if (isCorrect) state.correct += 1;

    var correctPos = state.presented.findIndex(function (o) { return o.correct; });

    return {
      isCorrect: isCorrect,
      chosenIndex: optionIndex,
      correctIndex: correctPos,
      chosenText: chosen ? chosen.text : "",
      correctText: state.presented[correctPos] ? state.presented[correctPos].text : "",
      explanation: state.questions[state.index].explanation,
      isLast: state.index >= state.questions.length - 1
    };
  }

  /* Prepara a próxima pergunta. */
  function next() {
    state.index += 1;
    state.presented = null;
    state.answered = false;
    if (state.index >= state.questions.length) return null;
    return getCurrent();
  }

  function isFinished() {
    return state.index >= state.questions.length;
  }

  function progress() {
    if (!state.total) return 0;
    return Math.round((state.index / state.total) * 100);
  }

  /* Estrelas: 5/5 → ⭐⭐⭐ | 4/5 → ⭐⭐ | demais → ⭐ (missão concluída) */
  function starsFor(correct, total) {
    if (total <= 0) return 0;
    if (correct >= total) return 3;
    if (correct >= total - 1) return 2;
    return 1;
  }

  function getResult() {
    var total = state.total || state.questions.length;
    var stars = starsFor(state.correct, total);
    var score = state.correct * 100 + 50;
    return {
      missionId: state.missionId,
      correct: state.correct,
      total: total,
      stars: stars,
      score: score,
      pct: total ? Math.round((state.correct / total) * 100) : 0
    };
  }

  return {
    start: start,
    getCurrent: getCurrent,
    answer: answer,
    next: next,
    isFinished: isFinished,
    progress: progress,
    getResult: getResult,
    starsFor: starsFor,
    shuffle: shuffle
  };
})();