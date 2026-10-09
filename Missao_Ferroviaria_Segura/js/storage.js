/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — ARMAZENAMENTO (localStorage)
   -------------------------------------------------------------------------
   Guarda: progresso, estrelas, melhores pontuações, missões concluídas,
   estatísticas gerais (perguntas respondidas e acertos) e configuração
   de som. Tudo local, sem servidor e sem banco de dados.

   Se o navegador bloquear o localStorage (modo privado, cota cheia),
   o jogo continua funcionando normalmente usando memória — só não
   mantém o progresso após fechar a aba.
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.storage = (function () {
  "use strict";

  var KEY = "mfs_progress_v1";
  var DEFAULT = {
    sound: true,
    missions: {},          /* "missao-XX": {completed, attempts, best} */
    stats: { answered: 0, hits: 0 }  /* perguntas respondidas / acertos */
  };

  function freshDefault() {
    return JSON.parse(JSON.stringify(DEFAULT));
  }

  function readRaw() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          var base = freshDefault();
          return {
            sound: parsed.sound !== undefined ? !!parsed.sound : base.sound,
            missions: parsed.missions && typeof parsed.missions === "object" ? parsed.missions : base.missions,
            stats: Object.assign({}, base.stats, parsed.stats || {})
          };
        }
      }
    } catch (e) { /* storage indisponível: segue com padrão */ }
    return freshDefault();
  }

  var state = readRaw();

  function persist() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* modo privado / cota: o jogo continua sem salvar */ }
  }

  function entry(missionId) {
    var key = String(missionId);
    if (!state.missions[key]) {
      state.missions[key] = { completed: false, attempts: 0, best: null };
    }
    return state.missions[key];
  }

  return {

    /* ------------------------- SOM ------------------------- */
    isSoundOn: function () { return state.sound !== false; },
    setSound: function (on) { state.sound = !!on; persist(); },
    toggleSound: function () { state.sound = !(state.sound !== false); persist(); return state.sound; },

    /* ---------------------- PROGRESSO ---------------------- */
    getMissionResult: function (missionId) {
      var e = state.missions[String(missionId)];
      return e && e.best ? e.best : null;
    },

    isCompleted: function (missionId) {
      var e = state.missions[String(missionId)];
      return !!(e && e.completed);
    },

    getStars: function (missionId) {
      var e = state.missions[String(missionId)];
      return e && e.best ? e.best.stars : 0;
    },

    getAttempts: function (missionId) {
      var e = state.missions[String(missionId)];
      return e ? e.attempts : 0;
    },

    /* Registra uma tentativa preservando SEMPRE o melhor resultado. */
    recordMission: function (missionId, result) {
      var e = entry(missionId);
      e.attempts += 1;
      e.completed = true;
      var norm = {
        stars: result.stars,
        correct: result.correct,
        score: result.score,
        answered: result.answered !== undefined ? result.answered : result.correct,
        hits: result.hits !== undefined ? result.hits : result.correct
      };
      if (!e.best) {
        e.best = norm;
      } else {
        /* só evolui: estrelas, acertos e pontuação do melhor desempenho */
        if (norm.stars > e.best.stars) e.best.stars = norm.stars;
        if (norm.correct > e.best.correct) e.best.correct = norm.correct;
        if (norm.score > e.best.score) e.best.score = norm.score;
        if (norm.answered > e.best.answered) e.best.answered = norm.answered;
        if (norm.hits > e.best.hits) e.best.hits = norm.hits;
      }
      persist();
      return e.best;
    },

    /* ------------------- ESTATÍSTICAS GLOBAIS ------------------- */
    recordAnswer: function (isCorrect) {
      state.stats.answered += 1;
      if (isCorrect) state.stats.hits += 1;
      persist();
    },

    getStats: function () {
      return Object.assign({}, state.stats);
    },

    /* Melhor pontuação somando todas as missões (missões futuras entram sozinhas). */
    totalScore: function () {
      var total = 0;
      Object.keys(state.missions).forEach(function (k) {
        var e = state.missions[k];
        if (e && e.best) total += e.best.score || 0;
      });
      return total;
    },

    totalStars: function () {
      var total = 0;
      Object.keys(state.missions).forEach(function (k) {
        var e = state.missions[k];
        if (e && e.best) total += e.best.stars || 0;
      });
      return total;
    },

    /* Progresso geral dinâmico — funciona com quantas missões existirem. */
    summary: function (missionIds) {
      var completed = 0, stars = 0, maxStars = missionIds.length * 3, score = 0, answered = 0, hits = 0;
      missionIds.forEach(function (id) {
        if (MFS.storage.isCompleted(id)) completed += 1;
        stars += MFS.storage.getStars(id);
        var res = MFS.storage.getMissionResult(id);
        if (res) {
          score += res.score || 0;
          answered += res.answered || 0;
          hits += res.hits || 0;
        }
      });
      return {
        completed: completed,
        total: missionIds.length,
        stars: stars,
        maxStars: maxStars,
        score: score,
        answered: answered,
        hits: hits
      };
    },

    reset: function () {
      state = freshDefault();
      persist();
    }
  };
})();