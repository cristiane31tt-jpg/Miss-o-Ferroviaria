/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — MISSÕES (dados + utilidades expansíveis)
   -------------------------------------------------------------------------
   Para criar uma nova missão basta adicionar um objeto em MFS.missions
   (com active: true) e as perguntas correspondentes em MFS.questions.
   O jogo descobre novas missões automaticamente: menu, progresso,
   estrelas e resultado final — nada é fixo para apenas 8 missões.

   Estrutura de cada missão:
     id          : identificador único (ex.: "missao-09")
     title       : nome exibido
     description : descrição curta
     intro       : fala do Lipe ao iniciar a missão
     order       : posição na lista (1, 2, 3, ...)
     icon        : chave do ícone em MFS.missionIcons
     active      : true = aparece no jogo | false = oculta
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.missions = [
  {
    id: "missao-01",
    title: "A Plataforma",
    description: "Aprenda como permanecer seguro enquanto espera o trem.",
    intro: "Pronto para a missão? Vamos descobrir como esperar o trem com segurança na plataforma!",
    scene: "assets/scenes/cena-plataforma-home.svg",
    order: 1,
    icon: "platform",
    active: true
  },
  {
    id: "missao-02",
    title: "A Faixa Amarela",
    description: "Aprenda por que devemos respeitar o limite de segurança da plataforma.",
    intro: "Olhe o chão da plataforma: aquela faixa amarela guarda um segredo de segurança. Bora descobrir?",
    scene: "assets/scenes/cena-familia-faixa.svg",
    order: 2,
    icon: "line",
    active: true
  },
  {
    id: "missao-03",
    title: "O Embarque",
    description: "Aprenda como embarcar no trem com tranquilidade e sem correrias.",
    intro: "O trem chegou! Com calma e em fila, você sabe exatamente como entrar com segurança.",
    scene: "assets/scenes/cena-embarque-anim.svg",
    order: 3,
    icon: "boarding",
    active: true
  },
  {
    id: "missao-04",
    title: "O Desembarque",
    description: "Aprenda como sair do trem com segurança e seguir pela estação.",
    intro: "Chegamos à sua estação! Agora vamos aprender a desembarcar prestando atenção em cada passo.",
    scene: "assets/scenes/cena-desembarque-anim.svg",
    order: 4,
    icon: "arrival",
    active: true
  },
  {
    id: "missao-05",
    title: "Dentro do Trem",
    description: "Aprenda comportamentos seguros durante toda a viagem.",
    intro: "Estamos a bordo! Segure firme e vem comigo: dentro do trem também tem regras de segurança.",
    scene: "assets/scenes/cena-dentro-trem-anim.svg",
    order: 5,
    icon: "train",
    active: true
  },
  {
    id: "missao-06",
    title: "Comportamento na Estação",
    description: "Aprenda a respeitar sinalização, áreas restritas e a circulação de passageiros.",
    intro: "A estação é cheia de placas e caminhos. Vamos descobrir como circular por ela do jeito certo!",
    scene: "assets/scenes/cena-estacao-anim.svg",
    order: 6,
    icon: "station",
    active: true
  },
  {
    id: "missao-07",
    title: "Passagem de Nível",
    description: "Aprenda a respeitar a sinalização e os dispositivos de segurança.",
    intro: "Luzes piscando e barreira fechada? Comigo você vai aprender a atravessar com segurança.",
    scene: "assets/scenes/cena-passagem-nivel.svg",
    order: 7,
    icon: "crossing",
    active: true
  },
  {
    id: "missao-08",
    title: "Grande Missão Final",
    description: "Reúna tudo o que você aprendeu nas missões anteriores.",
    intro: "É hora do desafio final! Mostre tudo o que você aprendeu sobre segurança ferroviária.",
    scene: "assets/scenes/cena-final-anim.svg",
    order: 8,
    icon: "trophy",
    active: true
  }
];

/* --------------------------- ÍCONES DAS MISSÕES ---------------------------
   SVG inline simples e leves. Novas missões podem usar qualquer chave
   existente ou acrescentar uma nova entrada aqui.                        */
MFS.missionIcons = {
  platform:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 34h36M6 40h36" stroke-linecap="round"/><rect x="10" y="22" width="28" height="6" rx="3"/><path d="M14 28v6M34 28v6" stroke-linecap="round"/><path d="M18 22v-6a6 6 0 0 1 12 0v6" stroke-linecap="round"/></svg>',
  line:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="24" width="36" height="8" rx="4"/><circle cx="14" cy="28" r="1.6"/><circle cx="24" cy="28" r="1.6"/><circle cx="34" cy="28" r="1.6"/><path d="M6 16h36M6 40h36" stroke-dasharray="4 6" stroke-linecap="round"/></svg>',
  boarding:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="8" width="20" height="32" rx="4"/><path d="M32 24h10M38 20l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="22" cy="24" r="1.8"/></svg>',
  arrival:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="20" y="8" width="20" height="32" rx="4"/><path d="M16 24H6M10 20l-4 4 4 4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="24" r="1.8"/></svg>',
  train:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="12" y="6" width="24" height="28" rx="8"/><path d="M12 22h24"/><circle cx="18" cy="15" r="2.4"/><circle cx="30" cy="15" r="2.4"/><path d="M16 34l-4 8M32 34l4 8M14 42h20" stroke-linecap="round"/></svg>',
  station:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 20 24 8l16 12"/><path d="M12 20v18h24V20"/><rect x="20" y="26" width="8" height="12" rx="2"/><path d="M6 42h36" stroke-linecap="round"/></svg>',
  crossing:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 14h32" stroke-linecap="round"/><path d="M14 14v6M34 14v6"/><path d="M8 26h32M14 26v6M34 26v6" stroke-linecap="round"/><path d="M10 40h28" stroke-dasharray="4 5" stroke-linecap="round"/></svg>',
  trophy:
    '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 8h16v10a8 8 0 0 1-16 0z"/><path d="M16 12h-5a5 5 0 0 0 5 8M32 12h5a5 5 0 0 1-5 8" stroke-linecap="round"/><path d="M24 26v6M18 40h12M20 32h8l1 8h-10z" stroke-linejoin="round"/></svg>'
};

/* ------------------------------- UTILIDADES ------------------------------- */
MFS.missionUtils = {

  /* Missões ativas, ordenadas pela propriedade `order`. */
  list: function () {
    return MFS.missions
      .filter(function (m) { return m.active !== false; })
      .slice()
      .sort(function (a, b) { return a.order - b.order; });
  },

  byId: function (id) {
    return MFS.missions.find(function (m) { return m.id === id; }) || null;
  },

  indexOf: function (id) {
    return MFS.missionUtils.list().findIndex(function (m) { return m.id === id; });
  },

  /* Perguntas ATIVAS de uma missão (inativas nunca entram no jogo). */
  activeQuestions: function (missionId) {
    return MFS.questions.filter(function (q) {
      return q.missionId === missionId && q.active !== false;
    });
  },

  /* Todas as perguntas ativas do jogo (qualquer missão). */
  allActiveQuestions: function () {
    return MFS.questions.filter(function (q) { return q.active !== false; });
  },

  /* Próxima missão da lista (para o botão "Próxima missão"). */
  next: function (missionId) {
    var list = MFS.missionUtils.list();
    var i = MFS.missionUtils.indexOf(missionId);
    return i >= 0 && i < list.length - 1 ? list[i + 1] : null;
  }
};
