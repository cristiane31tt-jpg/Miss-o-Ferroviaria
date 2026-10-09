/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — LIPE (motor de diálogo e gestos)
   -------------------------------------------------------------------------
   Dá vida ao retrato do Lipe em qualquer balão:
     • troca expressão, direção do olhar e gesto por data-* no retrato;
     • escreve as falas com efeito de digitação (ou imediato em modo de
       movimento reduzido);
     • percorre sequências de fala no ritmo da criança (toque avança);
     • nunca bloqueia o jogo: os botões continuam sempre disponíveis e
       qualquer sequência pode ser interrompida com stop().
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.lipe = (function () {
  "use strict";

  var reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var TYPE_MS = 28;                 /* ms por caractere na digitação */
  var DEFAULT_DUR = 3800;           /* tempo padrão de uma fala */
  var active = {};                  /* el -> { clear() } */

  var LOOKS = ["cima", "baixo", "esquerda", "direita"];

  function mount(el) {
    if (!el || el.getAttribute("data-mounted")) return;
    var tpl = document.getElementById("tpl-lipe");
    if (!tpl) return;
    el.appendChild(tpl.content.cloneNode(true));
    el.setAttribute("data-mounted", "1");
  }

  /* Aplica estado visual (expressão / olhar / gesto / fala / comemoração). */
  function set(mountEl, opts) {
    mount(mountEl);
    if (!mountEl) return;
    opts = opts || {};
    if (opts.face) {
      mountEl.setAttribute("data-exp", opts.face || "alegre");
    }
    if (opts.look && LOOKS.indexOf(opts.look) >= 0) {
      mountEl.setAttribute("data-look", opts.look);
    } else if (!opts.look) {
      mountEl.removeAttribute("data-look");
    }
    if (opts.gesture) {
      mountEl.setAttribute("data-gesture", opts.gesture);
    } else {
      mountEl.removeAttribute("data-gesture");
    }
    if (opts.talking === true) mountEl.classList.add("talking");
    if (opts.talking === false) mountEl.classList.remove("talking");
    if (opts.celebrate) mountEl.classList.add("celebrate");
    if (opts.uncelebrate) mountEl.classList.remove("celebrate");
  }

  /* Rotaciona uma lista de linhas (objeto | array) sem repetir seguidamente.
     Retorna a linha e o índice (para guardar como "usado"). */
  function pickLine(lines, lastIdx) {
    if (!lines || !lines.length) return { line: null, idx: -1 };
    var i = Math.floor(Math.random() * lines.length);
    if (lines.length > 1 && i === lastIdx) i = (i + 1) % lines.length;
    return { line: lines[i], idx: i };
  }

  /* ------------------------------------------------------------------
     SEQUÊNCIA DE FALAS
     seq(bubbleEl, lines, opts)
       opts.mount : seletor do retrato dentro do balão (padrão ".lipe-mount")
       opts.dur   : duração (ms) padrão das falas sem dur própria
       opts.keepFace: manter a expressão da última linha ao terminar
     Retorna uma função stop() que interrompe limpa a sequência.
     ------------------------------------------------------------------ */
  function seq(bubbleEl, lines, opts) {
    opts = opts || {};
    if (!bubbleEl || !lines || !lines.length) return function () {};
    var p = bubbleEl.querySelector("p");
    if (!p) return function () {};
    var mountEl = null;
    if (opts.mountEl) {
      mountEl = opts.mountEl;
    } else if (opts.mount) {
      mountEl = bubbleEl.querySelector(opts.mount) || document.querySelector(opts.mount);
    } else {
      mountEl = bubbleEl.querySelector(".lipe-mount");
    }

    var state = { i: 0, done: false, typed: 0, target: 0, interval: null, timer: null };

    function clearTimers() {
      if (state.interval) { clearInterval(state.interval); state.interval = null; }
      if (state.timer) { clearTimeout(state.timer); state.timer = null; }
    }

    function finalize(keepFace) {
      if (state.done) return;
      state.done = true;
      clearTimers();
      if (mountEl) mountEl.classList.remove("talking");
      if (!keepFace) set(mountEl);
      void opts;
    }

    function gotoNext() {
      clearTimers();
      if (state.done) return;
      state.i += 1;
      if (state.i < lines.length) render(lines[state.i]);
      else finalize(opts.keepFace);
    }

    function onClick() {
      if (state.done || !bubbleEl) return;
      /* se ainda está digitando, termina a frase; senão, avança */
      if (state.typed < state.target) {
        var text = (lines[state.i] && lines[state.i].t) || "";
        if (p) p.textContent = text;
        if (state.interval) { clearInterval(state.interval); state.interval = null; }
        state.typed = state.target;
        if (mountEl) mountEl.classList.remove("talking");
        scheduleNext(1100);
      } else {
        gotoNext();
      }
    }

    function scheduleNext(dur) {
      dur = dur != null ? dur
        : ((lines[state.i] && lines[state.i].dur != null) ? lines[state.i].dur
          : (opts.dur != null ? opts.dur : DEFAULT_DUR));
      clearTimers();
      state.timer = setTimeout(gotoNext, dur);
    }

    function render(l) {
      if (!l) return gotoNext();
      set(mountEl, { face: l.f, look: l.look, gesture: l.gesture });
      var text = l.t || "";
      if (text) {
        if (mountEl) mountEl.classList.add("talking");
        state.target = text.length;
        state.typed = 0;
        p.textContent = "";
        if (opts.instant || reduced) {
          p.textContent = text;
          state.typed = state.target;
          if (mountEl) mountEl.classList.remove("talking");
          scheduleNext();
          return;
        }
        state.interval = setInterval(function () {
          state.typed += 1;
          p.textContent = text.slice(0, state.typed);
          if (state.typed >= state.target) {
            clearTimers();
            if (mountEl) mountEl.classList.remove("talking");
            scheduleNext();
          }
        }, TYPE_MS);
      } else {
        /* linha só de expressão/gesto */
        state.target = 0;
        scheduleNext();
      }
    }

    render(lines[0]);
    bubbleEl.addEventListener("click", onClick);

    function stop() {
      if (state.done) return;
      state.done = true;
      clearTimers();
      if (mountEl) mountEl.classList.remove("talking");
      bubbleEl.removeEventListener("click", onClick);
    }

    active[bubbleEl] = { clear: stop };
    return function () { stop(); };
  }

  function stop(bubbleEl) {
    if (bubbleEl && active[bubbleEl]) {
      active[bubbleEl].clear();
      delete active[bubbleEl];
    }
  }

  /* ------------------------------------------------------------------
     FALA ÚNICA (curta): mostra a linha e mantém até nova chamada.
     ------------------------------------------------------------------ */
  function say(bubbleEl, opts, onDone) {
    opts = opts || {};
    if (!bubbleEl || !opts.t) return;
    var p = bubbleEl.querySelector("p");
    if (!p) return;
    var mountEl = bubbleEl.querySelector(opts.mount || ".lipe-mount") || null;
    set(mountEl, { face: opts.f, look: opts.look, gesture: opts.gesture });
    p.textContent = reduced || opts.instant ? opts.t : "";
    if (mountEl) mountEl.classList.add("talking");
    if (reduced || opts.instant) {
      p.textContent = opts.t;
      if (mountEl) mountEl.classList.remove("talking");
      if (onDone) onDone();
      return;
    }
    var i = 0;
    var target = opts.t.length;
    var iv = setInterval(function () {
      i += 1;
      p.textContent = opts.t.slice(0, i);
      if (i >= target) {
        clearInterval(iv);
        if (mountEl) mountEl.classList.remove("talking");
        if (onDone) onDone();
      }
    }, TYPE_MS);
    var handle = {
      finish: function () {
        clearInterval(iv);
        p.textContent = opts.t;
        if (mountEl) mountEl.classList.remove("talking");
        if (onDone) onDone();
      }
    };
    return handle;
  }

  /* ------------------------------------------------------------------
     SAUDAÇÃO DA TELA INICIAL (uma vez por sessão)
     ------------------------------------------------------------------ */
  var greetedHome = false;
  function greetHome() {
    if (greetedHome) return;
    var bubble = document.getElementById("home-bubble");
    if (!bubble) return;
    greetedHome = true;
    seq(bubble, MFS.lipeLines.home, { mount: ".home-lipe", dur: 4300 });
  }

  /* ------------------------------------------------------------------
     INTRODUÇÃO DA MISSÃO (sobre a cena da missão)
     ------------------------------------------------------------------ */
  function playMissionIntro(mission) {
    var bubble = document.getElementById("intro-bubble");
    if (!bubble || !mission) return;
    stop(bubble);
    var introLines = (MFS.lipeLines.intro && MFS.lipeLines.intro[mission.id]) || [];
    var lines = [
      { t: mission.intro || "", f: "alegre", look: "cima", gesture: "wave" }
    ].concat(introLines);
    seq(bubble, lines, {
      mountEl: document.querySelector(".intro-lipe"),
      dur: 4000
    });
  }

  /* ------------------------------------------------------------------
     OBSERVAÇÃO NA PERGUNTA (dica sem revelar a resposta)
     ------------------------------------------------------------------ */
  var lastObserveIdx = {};
  function observeLine(missionId) {
    var pool = (MFS.lipeLines.observe && MFS.lipeLines.observe[missionId]) || MFS.lipeLines.observe.generic;
    var p = pickLine(pool, lastObserveIdx[missionId]);
    lastObserveIdx[missionId] = p.idx;
    return p.line || "";
  }

  /* Combina expressão/direção de olhar/gesto adequados à missão e à pergunta. */
  var MISSION_STAGE = {
    "missao-01": { look: "baixo", gesture: "apontar-baixo" },
    "missao-02": { look: "baixo", gesture: "apontar-baixo" },
    "missao-03": { look: "direita", gesture: "apontar" },
    "missao-04": { look: "esquerda", gesture: "apontar" },
    "missao-05": { look: "cima", gesture: "apontar" },
    "missao-06": { look: "direita", gesture: "apontar" },
    "missao-07": { look: "baixo", gesture: "apontar-baixo" },
    "missao-08": { look: "cima", gesture: "apontar" }
  };
  function stageFor(missionId) {
    return MISSION_STAGE[missionId] || { look: "cima", gesture: "apontar" };
  }
  function questionStage(missionId) {
    var s = stageFor(missionId);
    var face = Math.random() < 0.5 ? "atencao" : "curioso";
    return { face: face, look: Math.random() < 0.25 ? "cima" : s.look, gesture: s.gesture };
  }

  /* ------------------------------------------------------------------
     LINHAS DE REAÇÃO (elogio / incentivo) variadas por missão
     ------------------------------------------------------------------ */
  var lastReact = {};
  function reactionLine(kind, missionId) {
    var pool = (MFS.lipeLines[kind] && MFS.lipeLines[kind][missionId]) || MFS.lipeLines[kind].generic || [];
    var p = pickLine(pool, lastReact[missionId + ":" + kind]);
    lastReact[missionId + ":" + kind] = p.idx;
    return p.line || "";
  }

  /* ---------------------------------------------------------------- */
  function celebrate(mountEl, ms) {
    if (!mountEl) return;
    mountEl.classList.add("celebrate");
    setTimeout(function () {
      mountEl.classList.remove("celebrate");
    }, ms || 3200);
  }

  return {
    set: set,
    seq: seq,
    stop: stop,
    say: say,
    greetHome: greetHome,
    playMissionIntro: playMissionIntro,
    observeLine: observeLine,
    questionStage: questionStage,
    reactionLine: reactionLine,
    celebrate: celebrate,
    pickLine: pickLine
  };
})();