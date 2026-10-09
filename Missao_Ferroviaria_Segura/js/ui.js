/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — UI (apresentação e telas)
   -------------------------------------------------------------------------
   Responsável por: troca de telas, lista de missões, fluxo do quiz,
   feedback visual (acerto/erro), telas de resultado/progresso, confete,
   modal de confirmação e atualização dos botões de som.
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.ui = (function () {
  "use strict";

  var currentMissionId = null;

  var LIPE_TIPS = [
    "Leia com atenção e escolha a alternativa mais segura!",
    "Respire fundo: você consegue!",
    "Pense: o que o Lipe faria aqui?",
    "Em caso de dúvida, lembre-se da faixa amarela!",
    "Qual escolha protege você e a sua família?",
    "Faixa amarela e barreiras são seus amigos!"
  ];

  var TYPE_LABEL = {
    direta: "PERGUNTA",
    situacao: "SITUAÇÃO",
    cena: "OBSERVE A CENA"
  };

  function el(id) {
    return document.getElementById(id);
  }

  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  /* ------------------------- RETRATO DO LIPE -------------------------
     Instancia o personagem (template SVG) dentro de um .lipe-mount e
     troca a expressão pelo atributo data-exp. */
  function mountFaces(root) {
    root = root || document;
    var tpl = document.getElementById("tpl-lipe");
    if (!tpl) return;
    root.querySelectorAll(".lipe-mount").forEach(function (m) {
      if (m.getAttribute("data-mounted")) return;
      m.appendChild(tpl.content.cloneNode(true));
      m.setAttribute("data-mounted", "1");
    });
  }

  function setLipe(mount, expr) {
    if (!mount) return;
    mountFaces(mount);
    mount.setAttribute("data-exp", expr || "alegre");
  }

  function show(screenId) {
    document.querySelectorAll(".screen").forEach(function (s) {
      s.classList.toggle("active", s.id === screenId);
    });
    window.scrollTo(0, 0);
  }

  function randomTip() {
    var idx = Math.floor(Math.random() * LIPE_TIPS.length);
    return LIPE_TIPS[idx];
  }

  /* ---------------------------- SOM ---------------------------- */
  function refreshSoundButton() {
    var on = MFS.storage.isSoundOn();
    var icon = on ? "🔊" : "🔇";
    var label = on ? "🔊 SOM" : "🔇 SOM";
    var btn = el("btn-sound");
    if (btn) btn.textContent = icon;
    document.querySelectorAll('[data-action="toggle-sound"]').forEach(function (b) {
      b.textContent = b.classList.contains("btn-sound-toggle") ? label : icon;
    });
  }

  /* --------------------------- ESTRELAS --------------------------- */
  function starsHTML(count, cls) {
    var html = "";
    for (var i = 0; i < 3; i++) {
      if (i < count) {
        html += '<span class="star' + (cls ? " " + cls : "") + '" style="animation-delay:' + (i * 0.18) + 's">★</span>';
      } else {
        html += '<span class="star empty" style="color:#dde1ee">☆</span>';
      }
    }
    return html;
  }

  /* ---------------------------- CONFETE ---------------------------- */
  function confetti(n, colors, big) {
    var layer = el("confetti-layer");
    if (!layer) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    colors = colors || ["#ffb830", "#12b3a8", "#3f7ff0", "#f4647a", "#7ae0a0"];
    for (var i = 0; i < n; i++) {
      var c = document.createElement("div");
      var size = (big ? 10 : 8) + Math.random() * 6;
      var dur = 1.6 + Math.random() * 2;
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "%";
      c.style.width = size + "px";
      c.style.height = (big ? 12 : 5) + Math.random() * 6 + "px";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = dur + "s";
      c.style.animationDelay = Math.random() * 0.6 + "s";
      layer.appendChild(c);
      (function (node) {
        setTimeout(function () { node.remove(); }, (dur + 0.7) * 1000);
      })(c);
    }
  }

  /* ---------------------------- MODAL ---------------------------- */
  function modal(title, text, okLabel, callback) {
    el("modal-title").textContent = title;
    el("modal-text").textContent = text;
    el("modal-ok").textContent = okLabel || "Sim";
    el("modal-area").classList.remove("hidden");
    el("modal-cancel").onclick = function () {
      el("modal-area").classList.add("hidden");
    };
    el("modal-ok").onclick = function () {
      el("modal-area").classList.add("hidden");
      if (callback) callback();
    };
  }

  /* ---------------------------- HOME ---------------------------- */
  function showHome() {
    refreshSoundButton();
    show("screen-home");
    if (MFS.lipe) MFS.lipe.greetHome();
  }

  /* ---------------------------- MISSÕES ---------------------------- */
  function renderMissions() {
    var grid = el("missions-grid");
    var list = MFS.missionUtils.list();
    var totalStars = MFS.storage.totalStars();
    var maxStars = list.length * 3;
    var starsEl = el("missions-stars");

    if (starsEl) {
      starsEl.textContent = totalStars ? "⭐ " + totalStars + " / " + maxStars : "";
    }

    grid.innerHTML = list.map(function (m) {
      var stars = MFS.storage.getStars(m.id);
      var completed = MFS.storage.isCompleted(m.id);
      var best = MFS.storage.getMissionResult(m.id);
      var icon = MFS.missionIcons[m.icon] || MFS.missionIcons.platform;
      var badge = completed
        ? (m.order === list.length ? '<span class="badge badge-final">Missão final ✓</span>' : '<span class="badge badge-done">Concluída</span>')
        : '<span class="badge badge-new">Nova</span>';
      return (
        '<article class="mission-card">' +
          '<div class="mission-icon">' + icon + '</div>' +
          '<div>' + badge + '</div>' +
          '<h3>Missão ' + m.order + ' — ' + esc(m.title) + '</h3>' +
          '<p>' + esc(m.description) + '</p>' +
          '<div class="mission-meta">' +
            '<span class="mission-stars">' + starsHTML(stars) + '</span>' +
            '<span>' + (best ? best.score + ' pts' : '—') + '</span>' +
          '</div>' +
          '<button class="btn ' + (m.order === list.length ? "btn-primary" : "btn-secondary") +
            '" data-action="start-mission" data-mission="' + m.id + '">' +
            (completed ? "Jogar de novo" : "▶ Jogar missão") + '</button>' +
        '</article>'
      );
    }).join("");

    show("screen-missions");
  }

  function showMissions() {
    renderMissions();
  }

  /* ---------------------------- COMO JOGAR ---------------------------- */
  function showHowto() {
    show("screen-howto");
  }

  /* ---------------------------- PROGRESSO ---------------------------- */
  function renderProgress() {
    var list = MFS.missionUtils.list();
    var sum = MFS.storage.summary(list.map(function (m) { return m.id; }));
    var stats = MFS.storage.getStats();
    var overallPct = sum.total ? Math.round((sum.completed / sum.total) * 100) : 0;

    el("progress-overall-text").textContent = sum.completed + " de " + sum.total + " missões (" + overallPct + "%)";
    el("progress-overall-bar").style.width = overallPct + "%";
    el("p-completed").textContent = sum.completed + " / " + sum.total;
    el("p-stars").textContent = sum.stars + " / " + sum.maxStars;
    el("p-answered").textContent = stats.answered;
    el("p-hits").textContent = stats.hits;
    el("p-best").textContent = sum.score;

    var row = el("progress-missions");
    row.innerHTML = list.map(function (m) {
      var stars = MFS.storage.getStars(m.id);
      var completed = MFS.storage.isCompleted(m.id);
      var best = MFS.storage.getMissionResult(m.id);
      var attempts = MFS.storage.getAttempts(m.id);
      var icon = MFS.missionIcons[m.icon] || MFS.missionIcons.platform;
      var status = completed
        ? (best ? best.score + " pts • " + attempts + " tentativa(s)" : "concluída")
        : "ainda não concluída";
      return (
        '<div class="progress-mission">' +
          '<div class="mission-icon">' + icon + '</div>' +
          '<h4>Missão ' + m.order + ' — ' + esc(m.title) + '</h4>' +
          '<span class="mission-stars">' + starsHTML(stars) + '</span>' +
          '<span class="m-status">' + esc(status) + '</span>' +
        '</div>'
      );
    }).join("");

    show("screen-progress");
  }

  function showProgress() {
    renderProgress();
  }

  /* ---------------------------- QUIZ ---------------------------- */
  function startMission(missionId) {
    var mission = MFS.missionUtils.byId(missionId);
    var active = MFS.missionUtils.activeQuestions(missionId);
    if (!mission || !active.length) {
      modal("Ops!", "Esta missão ainda não tem perguntas ativas. Tente outra ou adicione perguntas no arquivo questions.js.", "Entendi");
      return;
    }
    currentMissionId = missionId;
    MFS.quiz.start(missionId);

    el("quiz-mission").textContent = "Missão " + mission.order + " — " + mission.title;
    el("quiz-bar").style.width = "0%";
    el("intro-title").textContent = "Missão " + mission.order + " — " + mission.title;
    el("intro-text").textContent = mission.intro || "";
    var introScene = el("intro-scene");
    if (mission.scene) {
      introScene.src = mission.scene;
      introScene.classList.remove("hidden");
    } else {
      introScene.classList.add("hidden");
      introScene.removeAttribute("src");
    }
    el("quiz-intro").classList.remove("hidden");
    el("quiz-play").classList.add("hidden");
    show("screen-quiz");
    if (MFS.lipe) {
      MFS.lipe.stop(el("intro-bubble"));
      MFS.lipe.playMissionIntro(mission);
    }
  }

  function beginLesson() {
    if (MFS.lipe) MFS.lipe.stop(el("intro-bubble"));
    el("quiz-intro").classList.add("hidden");
    el("quiz-play").classList.remove("hidden");
    renderQuestion();
  }

  function renderQuestion() {
    var view = MFS.quiz.getCurrent();
    if (!view) return;

    var q = view.question;
    el("quiz-counter").textContent = "Pergunta " + view.number + " de " + view.total;
    el("quiz-bar").style.width = MFS.quiz.progress() + "%";
    var tipFace = document.querySelector(".lipe-tip-face");
    if (MFS.lipe) {
      el("lipe-tip").textContent = MFS.lipe.observeLine(currentMissionId) || randomTip();
      var st = MFS.lipe.questionStage(currentMissionId);
      MFS.lipe.set(tipFace, { face: st.face, look: st.look, gesture: st.gesture });
    } else {
      el("lipe-tip").textContent = randomTip();
      setLipe(tipFace, Math.random() < 0.5 ? "atencao" : "curioso");
    }
    el("q-badge").textContent = TYPE_LABEL[q.type] || "PERGUNTA";
    el("q-text").textContent = q.question;

    var wrap = el("q-image-wrap");
    if (q.image) {
      var img = el("q-image");
      img.src = q.image;
      img.onerror = function () {
        wrap.classList.add("hidden");
      };
      wrap.classList.remove("hidden");
    } else {
      wrap.classList.add("hidden");
    }

    var box = el("q-options");
    box.innerHTML = view.options.map(function (opt, i) {
      return (
        '<button type="button" class="option-btn" data-opt="' + i + '" role="listitem">' +
          '<span class="opt-letter">' + opt.letter + '</span>' +
          '<span class="opt-text">' + esc(opt.text) + '</span>' +
        '</button>'
      );
    }).join("");

    el("feedback").classList.add("hidden");
    window.scrollTo(0, 0);
  }

  function answerQuestion(optIdx) {
    var view = MFS.quiz.getCurrent();
    if (!view) return;
    var res = MFS.quiz.answer(optIdx);
    if (!res) return;

    MFS.storage.recordAnswer(res.isCorrect);

    var btns = document.querySelectorAll(".option-btn");
    btns.forEach(function (b, i) {
      b.disabled = true;
      b.classList.add("dimmed");
      if (i === res.correctIndex) b.classList.remove("dimmed", "wrong");
      if (i === res.correctIndex) b.classList.add("correct");
      if (i === res.chosenIndex && !res.isCorrect) b.classList.remove("dimmed");
      if (i === res.chosenIndex && !res.isCorrect) b.classList.add("wrong");
    });

    var fb = el("feedback");
    var head, html;
    var faceExpr = "quase";
    if (res.isCorrect) {
      head = "Muito bem! 🎉";
      faceExpr = "vitoria";
      MFS.audio.play("acerto");
      confetti(22);
    } else {
      head = "Quase!";
      MFS.audio.play("erro");
      html =
        "<p><strong>Resposta certa:</strong> " + esc(res.correctText) + "</p>";
    }
    html = (html || "") + "<p>" + esc(res.explanation) + "</p>";
    fb.className = "feedback " + (res.isCorrect ? "correct-fb" : "wrong-fb");
    fb.innerHTML =
      '<div class="feedback-head">' +
        '<span class="lipe-mount feedback-lipe" data-exp="' + faceExpr + '" role="img" aria-label="Lipe reagindo a sua resposta"></span>' +
        '<div class="feedback-head-text"><h4>' + head + "</h4>" + html + "</div>" +
      "</div>" +
      '<button class="btn btn-primary" data-action="quiz-next">' +
        (res.isLast ? "Ver resultado ➜" : "Continuar ➜") + "</button>";
    setLipe(fb.querySelector(".feedback-lipe"), faceExpr);
    if (MFS.lipe) {
      var react = MFS.lipe.reactionLine(res.isCorrect ? "correct" : "wrong", currentMissionId);
      if (react) {
        var fala = document.createElement("p");
        fala.className = "lipe-fala";
        fala.textContent = react;
        var hd = fb.querySelector(".feedback-head-text");
        if (hd) hd.appendChild(fala);
      }
      if (res.isCorrect) {
        MFS.lipe.set(fb.querySelector(".feedback-lipe"), { face: "vitoria", look: "cima", gesture: "wave" });
        MFS.lipe.celebrate(fb.querySelector(".feedback-lipe"), 3600);
      } else {
        MFS.lipe.set(fb.querySelector(".feedback-lipe"), { face: "quase", look: "baixo" });
      }
    }
    fb.classList.remove("hidden");
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function nextQuestion() {
    var next = MFS.quiz.next();
    if (!next) {
      completeMission();
    } else {
      renderQuestion();
    }
  }

  function completeMission() {
    var res = MFS.quiz.getResult();
    var mission = MFS.missionUtils.byId(res.missionId);
    var stored = MFS.storage.recordMission(res.missionId, res);

    MFS.audio.play("conquista");

    var list = MFS.missionUtils.list();
    var isLast = list.length ? res.missionId === list[list.length - 1].id : false;

    if (isLast) {
      showFinal(res, stored);
    } else {
      showResult(res, stored, mission);
    }
  }

  function showResult(res, stored, mission) {
    el("result-title").textContent = "Missão concluída! 🎉";
    setLipe(document.querySelector(".result-lipe"), "vitoria");
    el("result-stars").innerHTML = starsHTML(res.stars);
    var msg =
      res.stars === 3 ? "Excelente! Você arrasou na " + mission.title + "!"
      : res.stars === 2 ? "Muito bom! Quase perfeito na " + mission.title + "!"
      : "Missão " + mission.title + " concluída! Repita para conquistar mais estrelas.";
    el("result-message").textContent = msg;
    el("stat-score").textContent = res.score;
    el("stat-correct").textContent = res.correct + " / " + res.total;
    el("stat-pct").textContent = res.pct + "%";
    el("stat-best").textContent = stored.score;

    if (MFS.lipe) {
      var doneLine = (MFS.lipeLines.done && MFS.lipeLines.done[mission.id]) || MFS.lipeLines.done.generic;
      var invite = (MFS.lipeLines.doneNext || "") + " ";
      el("result-lipe-line").textContent = invite + doneLine;
      var rl = document.querySelector(".result-lipe");
      MFS.lipe.set(rl, { face: "vitoria", look: "cima", gesture: "wave" });
      MFS.lipe.celebrate(rl, 3600);
    }

    var next = MFS.missionUtils.next(res.missionId);
    var btnNext = el("btn-next-mission");
    if (next) {
      btnNext.hidden = false;
      btnNext.setAttribute("data-mission", next.id);
    } else {
      btnNext.hidden = true;
    }
    show("screen-result");
  }

  function showFinal(res, stored) {
    var list = MFS.missionUtils.list();
    var sum = MFS.storage.summary(list.map(function (m) { return m.id; }));
    var pct = sum.answered ? Math.round((sum.hits / sum.answered) * 100) : 0;
    setLipe(document.querySelector(".final-lipe"), "vitoria");

    el("final-stars").innerHTML = '<span class="star" style="font-size:1.6rem">⭐</span><span style="font-size:1.5rem;font-weight:800;color:var(--accent-deep)"> ' + sum.stars + " / " + sum.maxStars + "</span>";
    el("final-score").textContent = sum.score;
    el("final-stars-count").textContent = sum.stars + " / " + sum.maxStars;
    el("final-hits").textContent = sum.hits + " / " + sum.answered;
    el("final-pct").textContent = pct + "%";

    MFS.audio.play("conquista");
    confetti(70, null, true);
    if (MFS.lipe) {
      var fLines = (MFS.lipeLines.final && MFS.lipeLines.final.length) ? MFS.lipeLines.final : [];
      if (fLines.length) el("final-lipe-line").textContent = fLines[0];
      var fl = document.querySelector(".final-lipe");
      MFS.lipe.set(fl, { face: "vitoria", look: "cima", gesture: "wave" });
      MFS.lipe.celebrate(fl, 4000);
    }
    show("screen-final");
  }

  /* ---------------------------- NAVEGAÇÃO ---------------------------- */
  function handleAction(action, target) {
    switch (action) {
      case "toggle-sound":
        MFS.audio.toggle();
        refreshSoundButton();
        if (MFS.audio.isEnabled()) MFS.audio.play("clique");
        break;
      case "go-home":
        showHome();
        break;
      case "go-missions":
        renderMissions();
        break;
      case "go-howto":
        showHowto();
        break;
      case "go-progress":
        renderProgress();
        break;
      case "start-mission":
        MFS.audio.play("clique");
        startMission(target.getAttribute("data-mission"));
        break;
      case "exit-quiz":
        renderMissions();
        break;
      case "quiz-start":
        MFS.audio.play("clique");
        beginLesson();
        break;
      case "quiz-next":
        nextQuestion();
        break;
      case "retry-mission":
        MFS.audio.play("clique");
        if (currentMissionId) startMission(currentMissionId);
        break;
      case "next-mission":
        MFS.audio.play("clique");
        startMission(target.getAttribute("data-mission"));
        break;
      case "reset-progress":
        modal(
          "Reiniciar progresso?",
          "Isso apagará todas as missões concluídas, estrelas e pontuações deste dispositivo. Depois não dá para desfazer.",
          "Sim, apagar",
          function () {
            MFS.storage.reset();
            refreshSoundButton();
            renderProgress();
          }
        );
        break;
      default:
        break;
    }
  }

  /* monta o retrato do Lipe em todo lugar assim que o DOM é lido */
  mountFaces();

  return {
    showHome: showHome,
    renderMissions: renderMissions,
    showMissions: showMissions,
    showHowto: showHowto,
    renderProgress: renderProgress,
    showProgress: showProgress,
    startMission: startMission,
    answerQuestion: answerQuestion,
    refreshSoundButton: refreshSoundButton,
    handleAction: handleAction,
    starsHTML: starsHTML,
    mountFaces: mountFaces,
    setLipe: setLipe
  };
})();