/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — ÁUDIO
   -------------------------------------------------------------------------
   Estrutura de sons:  assets/audio/{acerto,erro,conquista,clique}.mp3
                       assets/audio/{acerto,erro,conquista,clique}.wav
   Opcionais:          assets/audio/musica-menu.mp3, musica-missao.mp3
                       assets/audio/voz-lipe.mp3 (futuro)
                       assets/audio/ambiente-estacao.mp3 (futuro)

   FUNCIONA MESMO SEM ARQUIVOS: se o mp3 não existir tenta o wav; se não
   houver nenhum, gera o som sintetizado via WebAudio. O desempenho de cada
   arquivo é testado UMA VEZ e lembrado em memória — o jogo nunca para nem
   exibe erros por causa de som.
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.audio = (function () {
  "use strict";

  var DIR = "assets/audio/";
  var MAIN = ["acerto", "erro", "conquista", "clique"];
  var VOLUME = { acerto: 0.55, erro: 0.45, conquista: 0.6, clique: 0.4 };

  var enabled = MFS.storage.isSoundOn();
  var music = null;              /* música opcional em execução */
  var ctx = null;                /* AudioContext para sintetizar fallback */
  var availability = {};         /* cache: "acerto" -> "file" | "synth" | null */
  var audioElements = {};        /* cache de elementos funcionando */

  /* =====================================================================
     CONTEXTO WebAudio (usado apenas como fallback de síntese)
     ===================================================================== */

  function ensureCtx() {
    if (ctx) return ctx;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    } catch (e) { ctx = null; }
    return ctx;
  }

  /* Reativa o contexto no primeiro toque do usuário (política de autoplay). */
  document.addEventListener("pointerdown", function resumeOnce() {
    var c = ensureCtx();
    if (c && c.state === "suspended") c.resume();
    document.removeEventListener("pointerdown", resumeOnce);
  }, { passive: true });

  function tone(freq, start, dur, vol, type) {
    var c = ensureCtx();
    if (!c) return;
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    var t0 = c.currentTime + start;
    var v = vol;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(v, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /* Sons sintetizados: funcionam sem NENHUM arquivo de áudio. */
  function synth(name) {
    var c = ensureCtx();
    if (!c) return;
    if (c.state === "suspended") c.resume();
    if (name === "clique") {
      tone(740, 0, 0.07, 0.25, "triangle");
    } else if (name === "acerto") {
      tone(523.25, 0, 0.14, 0.30);
      tone(659.25, 0.11, 0.14, 0.30);
      tone(783.99, 0.22, 0.22, 0.32);
    } else if (name === "erro") {
      tone(349.23, 0, 0.16, 0.22, "triangle");
      tone(293.66, 0.15, 0.24, 0.20, "triangle");
    } else if (name === "conquista") {
      tone(523.25, 0, 0.14, 0.30);
      tone(659.25, 0.12, 0.14, 0.30);
      tone(783.99, 0.24, 0.14, 0.30);
      tone(1046.5, 0.36, 0.45, 0.34);
    }
  }

  /* =====================================================================
     REPRODUÇÃO DE ARQUIVOS (testa UMA vez e guarda o resultado)
     ===================================================================== */

  function testFile(url) {
    return new Promise(function (resolve, reject) {
      var a = new Audio();
      a.preload = "auto";
      var settled = false;
      function done(ok) {
        if (settled) return;
        settled = true;
        if (ok) resolve(a); else reject(new Error("audio"));
      }
      a.addEventListener("canplaythrough", function () { done(true); }, { once: true });
      a.addEventListener("error", function () { done(false); }, { once: true });
      try {
        a.src = url;
        a.load();
      } catch (e) {
        done(false);
      }
      /* Garantia de tempo: se nada acontecer, descarta sem erro fatal. */
      setTimeout(function () {
        if (!settled) {
          if (a.readyState >= 2) done(true); else done(false);
        }
      }, 2500);
    });
  }

  function resolveSource(name) {
    if (availability[name] === "file" && audioElements[name]) {
      return Promise.resolve({ kind: "file", el: audioElements[name] });
    }
    if (availability[name] === "synth") return Promise.resolve({ kind: "synth" });

    var urls = [DIR + name + ".mp3", DIR + name + ".wav"];
    var testPromises = urls.map(function (url) {
      return testFile(url).then(function (el) {
        return { el: el, url: url };
      }).catch(function () { return null; });
    });
    return Promise.all(testPromises).then(function (results) {
      var ok = results.find(function (r) { return r; });
      if (ok) {
        availability[name] = "file";
        audioElements[name] = ok.el;
        return { kind: "file", el: ok.el };
      }
      availability[name] = "synth";
      return { kind: "synth" };
    });
  }

  function play(name, volume) {
    if (!enabled) return Promise.resolve(false);
    return resolveSource(name).then(function (src) {
      if (src.kind === "synth") {
        synth(name);
        return false;
      }
      try {
        var el = src.el;
        el.volume = volume !== undefined ? volume : (VOLUME[name] !== undefined ? VOLUME[name] : 0.6);
        el.currentTime = 0;
        var p = el.play();
        if (p && p.catch) p.catch(function () { synth(name); });
      } catch (e) {
        synth(name);
      }
      return true;
    });
  }

  /* =====================================================================
     MÚSICA OPCIONAL (arquivos podem não existir — sem erro)
     ===================================================================== */

  function startMusic(kind) {
    stopMusic();
    if (!enabled) return;
    var url = DIR + "musica-" + kind + ".mp3";
    try {
      var a = new Audio(url);
      a.loop = true;
      a.volume = 0.28;
      a.addEventListener("error", function () { music = null; }, { once: true });
      var p = a.play();
      if (p && p.catch) p.catch(function () { music = null; });
      music = a;
    } catch (e) { music = null; }
  }

  function stopMusic() {
    if (music) {
      try { music.pause(); } catch (e) { /* ignore */ }
      music = null;
    }
  }

  return {
    play: play,
    startMusic: startMusic,
    stopMusic: stopMusic,
    isEnabled: function () { return enabled; },
    setEnabled: function (on) {
      enabled = !!on;
      MFS.storage.setSound(enabled);
      if (!enabled) stopMusic();
      return enabled;
    },
    toggle: function () {
      return MFS.audio.setEnabled(!enabled);
    }
  };
})();