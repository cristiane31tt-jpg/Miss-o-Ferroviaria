/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — APP (inicialização e autoteste)
   -------------------------------------------------------------------------
   • Inicia o jogo na tela inicial;
   • faz a delegação de cliques nos botões com [data-action];
   • executa um AUTOTESTE completo quando aberto com ?autoteste=1
     (resultado aparece no rodapé da página e no texto da aba).
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.app = (function () {
  "use strict";

  function init() {
    MFS.ui.showHome();
    document.addEventListener("click", function (e) {
      var target = e.target.closest("[data-action]");
      if (!target) return;
      MFS.ui.handleAction(target.getAttribute("data-action"), target);
    });

    /* Clique em alternativa de pergunta */
    document.addEventListener("click", function (e) {
      var opt = e.target.closest(".option-btn");
      if (!opt || opt.disabled) return;
      var idx = parseInt(opt.getAttribute("data-opt"), 10);
      MFS.ui.answerQuestion(idx);
    });

    /* Atalho: última pergunta final ainda não tratada. */
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var area = document.getElementById("modal-area");
        if (area && !area.classList.contains("hidden")) area.classList.add("hidden");
      }
    });

    var params = new URLSearchParams(window.location.search);
    if (params.get("autoteste") === "1") {
      runAutoTests();
    }
  }

  /* =================================================================
     AUTOTESTES — validam dados, embaralhamento, correção e progresso.
     ================================================================= */

  var SPEC_CORRECT = {
    Q001: 1, Q002: 2, Q003: 2, Q004: 1, Q005: 1,
    Q006: 1, Q007: 2, Q008: 0, Q009: 2, Q010: 1,
    Q011: 2, Q012: 1, Q013: 2, Q014: 2, Q015: 1,
    Q016: 2, Q017: 1, Q018: 2, Q019: 1, Q020: 2,
    Q021: 0, Q022: 0, Q023: 1, Q024: 2, Q025: 2,
    Q026: 0, Q027: 2, Q028: 2, Q029: 2, Q030: 2,
    Q031: 1, Q032: 2, Q033: 2, Q034: 0, Q035: 1,
    Q036: 2, Q037: 1, Q038: 1, Q039: 2, Q040: 2
  };

  function runAutoTests() {
    var report = [];
    var t0 = Date.now();

    window.onerror = function (msg) {
      report.push("❗ ERRO JS detectado: " + msg);
      return false;
    };

    function line(ok, name, detail) {
      report.push((ok ? "✅ " : "❌ ") + name + (detail ? " — " + detail : ""));
    }

    /* 1) Dados: 40 perguntas ativas, 5 por missão, estrutura correta */
    var activeQ = MFS.missionUtils.allActiveQuestions();
    line(activeQ.length === 40, "Banco de perguntas", activeQ.length + " ativas (esperado 40)");

    var ids = activeQ.map(function (q) { return q.id; });
    var dupes = ids.filter(function (id, i) { return ids.indexOf(id) !== i; });
    line(dupes.length === 0, "IDs únicos", dupes.length ? "duplicados: " + dupes.join(",") : "");

    var structOk = activeQ.every(function (q) {
      return q && Array.isArray(q.options) && q.options.length === 4 &&
        typeof q.correct === "number" && q.correct >= 0 && q.correct <= 3 &&
        typeof q.explanation === "string" && q.explanation.length > 0;
    });
    line(structOk, "Estrutura das perguntas (4 opções, correta 0-3, explicação)");

    var specOk = activeQ.every(function (q) {
      return SPEC_CORRECT[q.id] === undefined || SPEC_CORRECT[q.id] === q.correct;
    });
    line(specOk, "Alternativas corretas conferem com o enunciado (Q001–Q040)");

    var missions = MFS.missionUtils.list();
    line(missions.length === 8, "Missões ativas", missions.length + " (esperado 8)");
    var missionQ = missions.map(function (m) {
      return MFS.missionUtils.activeQuestions(m.id).length;
    });
    line(missionQ.every(function (n) { return n === 5; }), "5 perguntas por missão",
      missions.map(function (m, i) { return m.id + ":" + missionQ[i]; }).join(" "));

    /* 2) Embaralhamento: correta nunca fixa e conjunto preservado */
    var posHist = {};
    var shuffleOk = true;
    for (var trial = 0; trial < 60; trial++) {
      MFS.quiz.start("missao-01");
      var view = MFS.quiz.getCurrent();
      var letters = view.options.map(function (o) { return o.letter; });
      if (["A", "B", "C", "D"].join("") !== letters.slice().sort().join("")) {
        shuffleOk = false;
      }
      var correctCount = view.options.filter(function (o) { return o.correct; }).length;
      if (correctCount !== 1) shuffleOk = false;
      var pos = view.options.findIndex(function (o) { return o.correct; });
      posHist[pos] = (posHist[pos] || 0) + 1;
      var originalSet = MFS.questions[0].options.slice().sort().join("|");
      var shownSet = view.options.map(function (o) { return o.text; }).sort().join("|");
      if (originalSet !== shownSet) shuffleOk = false;
    }
    var positions = Object.keys(posHist);
    line(shuffleOk && positions.length >= 2, "Embaralhamento aleatório",
      "posições da correta: " + positions.join(", ") + " (nunca fixa)");

    /* 3) Correção: recorre independentemente da posição */
    var corrOk = true;
    MFS.quiz.start("missao-01");
    var v1 = MFS.quiz.getCurrent();
    var correctIdx = v1.options.findIndex(function (o) { return o.correct; });
    var r1 = MFS.quiz.answer(correctIdx);
    if (!r1 || r1.isCorrect !== true) corrOk = false;
    var rBlock = MFS.quiz.answer((correctIdx + 1) % 4); /* segunda resposta bloqueada */
    if (rBlock !== null) corrOk = false;
    MFS.quiz.next();
    var v2 = MFS.quiz.getCurrent();
    var wrongIdx = v2.options.findIndex(function (o) { return !o.correct; });
    var r2 = MFS.quiz.answer(wrongIdx);
    if (!r2 || r2.isCorrect !== false) corrOk = false;
    line(corrOk, "Correção de respostas (acerto e erro, resposta dupla bloqueada)");

    /* 4) Percurso completo da missão 1 */
    var total = 0, hits = 0;
    MFS.quiz.start("missao-01");
    var cur;
    while ((cur = MFS.quiz.getCurrent())) {
      total++;
      var ci = cur.options.findIndex(function (o) { return o.correct; });
      var rr = MFS.quiz.answer(ci);
      if (rr.isCorrect) hits++;
      var nxt = MFS.quiz.next();
      if (nxt === null && !MFS.quiz.isFinished()) break;
    }
    var res = MFS.quiz.getResult();
    line(total === 5 && res.total === 5 && res.correct === 5 && res.stars === 3 && res.score === 550,
      "Missão 1 completa (5/5, 3 estrelas, pontuação " + res.score + ")");

    /* 5) Estrelas e melhor resultado no armazenamento */
    var key = "mfs_progress_v1";
    var snapshot = null;
    try { snapshot = window.localStorage.getItem(key); } catch (e) { snapshot = null; }

    var stars = [MFS.quiz.starsFor(5, 5), MFS.quiz.starsFor(4, 5), MFS.quiz.starsFor(3, 5), MFS.quiz.starsFor(2, 5)];
    line(stars.join(",") === "3,2,1,1", "Faixas de estrelas", "5/5→3 • 4/5→2 • 3/5→1 • 2/5→1");

    MFS.storage.recordMission("missao-01", { stars: 1, correct: 2, score: 200 });
    var best1 = MFS.storage.getMissionResult("missao-01");
    var improve = MFS.storage.recordMission("missao-01", { stars: 3, correct: 5, score: 550 });
    var keptBest = MFS.storage.getMissionResult("missao-01");
    line(best1 && improve && improve.stars === 3 && keptBest.score === 550 && keptBest.correct === 5,
      "Melhor resultado é preservado", "score " + keptBest.score + " • estrelas " + keptBest.stars);

    var before = MFS.storage.getStats();
    MFS.storage.recordAnswer(true);
    MFS.storage.recordAnswer(true);
    MFS.storage.recordAnswer(false);
    var after = MFS.storage.getStats();
    line(after.answered === before.answered + 3 && after.hits === before.hits + 2,
      "Contadores de perguntas e acertos");

    /* 6) Pergunta inativa não entra no jogo */
    var q = MFS.questions.find(function (x) { return x.id === "Q040"; });
    var wasActive = q.active;
    q.active = false;
    var beforeDisable = MFS.missionUtils.activeQuestions("missao-08").length;
    q.active = true;
    var afterRestore = MFS.missionUtils.activeQuestions("missao-08").length;
    line((beforeDisable === 4 && afterRestore === 5) || q === null, "Pergunta com active:false não aparece", beforeDisable + " vs " + afterRestore);
    q.active = wasActive;

    /* restaura o progresso do jogador */
    try {
      if (snapshot === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, snapshot);
    } catch (e) { /* ignore */ }

    /* 7) Zero erros JavaScript capturados */
    var jsErrs = report.filter(function (r) { return r.indexOf("ERRO JS") === 0; });
    line(jsErrs.length === 0, "Nenhum erro JavaScript no console");

    var end = Date.now() - t0;
    report.push("— " + (report.filter(function (r) { return r.indexOf("❌") === 0; }).length) + " falha(s) em " + (report.length) + " verificações • " + end + " ms");

    var okAll = report.every(function (r) { return r.indexOf("❌") !== 0 && r.indexOf("❗") !== 0; });
    document.title = okAll ? "AUTOTESTE OK ✅" : "AUTOTESTE COM FALHAS ❌";
    var pre = document.getElementById("test-report");
    if (pre) {
      pre.classList.remove("hidden");
      pre.textContent = "🛤️ MISSÃO FERROVIÁRIA SEGURA — AUTOTESTE\n" + report.join("\n");
    }
  }

  return { init: init, runAutoTests: runAutoTests };
})();

document.addEventListener("DOMContentLoaded", MFS.app.init);