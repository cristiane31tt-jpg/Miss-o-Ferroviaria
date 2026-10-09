/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — FALAS DO LIPE (conteúdo pedagogicamente
   organizado por situação e por missão)
   -------------------------------------------------------------------------
   Estas são textos curtos, naturais e infantis em português brasileiro.
   Eles NUNCA revelam a alternativa correta antes da escolha da criança —
   as falas de observação incentivam a olhar a cena e pensar.

   Campos de cada linha:
     t        : texto da fala
     f        : expressão do rosto (alegre|vitoria|curioso|atencao|surpresa|preocupado|quase)
     look     : direção do olhar (cima|baixo|esquerda|direita) — opcional
     gesture  : gesto (wave|apontar|apontar-baixo) — opcional
     dur      : duração em ms antes de avançar — opcional
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.lipeLines = {

  /* ----- Abertura do jogo (tela inicial) ----- */
  home: [
    { t: "Olá! Eu sou o Lipe, e você acabou de ganhar um companheiro de aventura!", f: "alegre", look: "cima", gesture: "wave" },
    { t: "Vamos descobrir juntos como viajar de trem com segurança.", f: "curioso", look: "direita" },
    { t: "Toque em COMEÇAR MISSÃO quando se sentir pronto!", f: "alegre", look: "baixo", gesture: "apontar" }
  ],

  /* ----- Início de cada missão (fala extra sobre a cena) ----- */
  intro: {
    "missao-01": [
      { t: "Olha a plataforma! É aqui que esperamos o trem com cuidado.", f: "alegre", look: "baixo", gesture: "apontar-baixo" },
      { t: "Repare onde todo mundo está parado — e por quê.", f: "curioso", look: "esquerda" },
      { t: "Quando tocar em COMEÇAR, vamos descobrir as escolhas mais seguras!", f: "atencao", gesture: "apontar" }
    ],
    "missao-02": [
      { t: "Você vê aquela faixa amarela no chão? Ela guarda um segredo de segurança.", f: "curioso", look: "baixo", gesture: "apontar-baixo" },
      { t: "É o limite que não podemos passar com o trem por perto.", f: "atencao", look: "baixo" },
      { t: "Quando tocar em COMEÇAR, a gente descobre por que ela é tão especial!", f: "alegre", gesture: "apontar" }
    ],
    "missao-03": [
      { t: "O trem parou e as portas abriram! Como entramos sem correria?", f: "curioso", look: "direita", gesture: "apontar" },
      { t: "Observa a fila e o espaço da porta com atenção.", f: "atencao", look: "direita" },
      { t: "Quando tocar em COMEÇAR, embarque comigo nessa descoberta!", f: "alegre", gesture: "apontar" }
    ],
    "missao-04": [
      { t: "Chegamos! Agora todo mundo desce com calma, um passo de cada vez.", f: "alegre", look: "direita", gesture: "apontar" },
      { t: "Repare como quem desce se afasta logo da porta.", f: "curioso", look: "direita" },
      { t: "Quando tocar em COMEÇAR, vamos aprender a desembarcar bem!", f: "atencao", gesture: "apontar" }
    ],
    "missao-05": [
      { t: "A bordo! Aqui dentro também existem regrinhas de segurança legais.", f: "curioso", look: "cima", gesture: "apontar" },
      { t: "Olha como as pessoas seguram nas barras e nos apoios.", f: "atencao", look: "cima" },
      { t: "Quando tocar em COMEÇAR, descobrimos como viajar firme e feliz!", f: "alegre", gesture: "apontar" }
    ],
    "missao-06": [
      { t: "A estação é cheia de placas e caminhos. Cada placa dá uma dica!", f: "curioso", look: "direita", gesture: "apontar" },
      { t: "Repare nos avisos e em como as pessoas andam com cuidado.", f: "atencao", look: "esquerda" },
      { t: "Quando tocar em COMEÇAR, vamos ler as placas juntos!", f: "alegre", gesture: "apontar" }
    ],
    "missao-07": [
      { t: "Luzes piscando e barreira fechada! Sinal de que o trem está chegando.", f: "surpresa", look: "baixo", gesture: "apontar-baixo" },
      { t: "Observa a cancela e o lugar onde todo mundo espera.", f: "atencao", look: "baixo" },
      { t: "Quando tocar em COMEÇAR, aprendemos a aguardar com respeito!", f: "alegre", gesture: "apontar" }
    ],
    "missao-08": [
      { t: "Hora do grande desafio! Mostre tudo o que você aprendeu!", f: "vitoria", look: "cima", gesture: "wave" },
      { t: "Pense em cada cena: plataforma, faixa, portas e barreiras.", f: "atencao", look: "cima" },
      { t: "Quando tocar em COMEÇAR, a prova começa. Você consegue!", f: "alegre", gesture: "apontar" }
    ]
  },

  /* ----- Durante as perguntas: estimular a observação (nunca dar a resposta) ----- */
  observe: {
    generic: [
      "Leia com atenção e escolha a alternativa mais segura!",
      "Pensa com calma: o que o Lipe faria aqui?",
      "Qual escolha protege você e a sua família?",
      "Respira fundo, você consegue!"
    ],
    "missao-01": [
      "Pensa: onde é mais seguro ficar na plataforma?",
      "Repara na borda da plataforma e na faixa amarela. Qual lugar protege mais?",
      "Se a gente ficasse pertinho da borda, o que poderia acontecer?"
    ],
    "missao-02": [
      "Olha o chão: a faixa amarela marca até onde podemos chegar.",
      "O que aconteceria se alguém ficasse em cima da faixa?",
      "Repara na distância entre a faixa e os trilhos."
    ],
    "missao-03": [
      "Antes de entrar, quem precisa descer primeiro?",
      "Observa a ordem na fila do embarque.",
      "Na hora de entrar, a gente caminha ou corre?"
    ],
    "missao-04": [
      "Quem desce com mais calma? E depois de descer, para onde vão?",
      "Repara: depois de descer, a gente fica perto ou longe da porta?",
      "Observa cada passo de quem desembarca."
    ],
    "missao-05": [
      "Dentro do trem, o que a gente segura com a mão?",
      "Repara no espaço das pessoas ao redor.",
      "O que é divertido fazer no trem… e o que é seguro fazer?"
    ],
    "missao-06": [
      "Repara nas placas da estação: elas dão dicas de caminho.",
      "Onde devemos andar com calma e atenção?",
      "Observa os avisos e as áreas da estação."
    ],
    "missao-07": [
      "A barreira está fechada. O que o sinal vermelho piscando indica?",
      "Repara na posição de quem espera perto da cancela.",
      "Como sabemos que o trem está chegando?"
    ],
    "missao-08": [
      "Lembra das faixas amarelas e das barreiras! Qual escolha protege?",
      "Pensa em tudo o que já aprendemos nesta aventura.",
      "Qual atitude mantém a família inteira em segurança?"
    ]
  },

  /* ----- Resposta correta (elogio variado, específico da missão) ----- */
  correct: {
    generic: [
      "Isso mesmo! Essa escolha é a mais segura. 🧡",
      "Perfeito! Você pensou com cuidado e escolheu muito bem!",
      "Show de bola! Continua assim!",
      "Acertou! É assim que a gente viaja com segurança!",
      "Mandou bem demais! 🚂"
    ],
    "missao-01": [
      "Atrás da faixa amarela é o lugar certo para esperar!",
      "Que bom que você não fica perto da borda! Assim ninguém se machuca."
    ],
    "missao-02": [
      "Isso! A faixa amarela é o limite de segurança da plataforma!",
      "Você respeitou o limite. É assim que a gente se protege!"
    ],
    "missao-03": [
      "Exato! Embarcar com calma e em fila é o certo!",
      "Quem desce primeiro, a gente espera depois. Você lembrou!"
    ],
    "missao-04": [
      "Isso! Desce com calma e se afasta da porta!",
      "Perfeito! Um passo de cada vez e todo mundo chega bem."
    ],
    "missao-05": [
      "Boa! Segurar nos apoios mantém todo mundo firme!",
      "Respeitar os passageiros também é segurança dentro do trem!"
    ],
    "missao-06": [
      "Muito bem! As placas existem para nos guiar em segurança!",
      "Circular com calma pela estação é o caminho certo!"
    ],
    "missao-07": [
      "Exato! Atrás da barreira é o lugar mais seguro!",
      "A cancela fechada é aviso de perigo: a gente aguarda junto!"
    ],
    "missao-08": [
      "Você juntou tudo! Especialista em segurança ferroviária!",
      "Cada escolha certa protegeu a sua família inteira!"
    ]
  },

  /* ----- Resposta incorreta (gentileza e incentivo, nunca reprovação) ----- */
  wrong: {
    generic: [
      "Tudo bem! A gente aprende tentando. Vamos ver por quê.",
      "Quase acertou! Pensa na explicação com carinho.",
      "Sem problema! O importante é aprender agora.",
      "Respira e repara: qual escolha mantém todo mundo longe do perigo?"
    ],
    "missao-01": [
      "Fica tranquilo(a): a borda da plataforma não é lugar de ninguém!",
      "Vamos juntos: atrás da faixa amarela, sempre!"
    ],
    "missao-02": [
      "A faixa amarela existe para nos proteger, viu?",
      "Com a faixa, a gente fica sempre longe dos trilhos."
    ],
    "missao-03": [
      "Na hora de embarcar, a calma e a fila ganham da correria!",
      "Pensa: as pessoas descem antes de a gente entrar."
    ],
    "missao-04": [
      "Depois de descer, é só se afastar da porta com calma!",
      "Um passo de cada vez, olhando para onde pisa."
    ],
    "missao-05": [
      "Dentro do trem, segurar nos apoios é a jogada certa!",
      "Respeitar o espaço dos outros também é segurança."
    ],
    "missao-06": [
      "As placas da estação sempre mostram o caminho mais seguro!",
      "Andar com calma e atenção sempre ajuda."
    ],
    "missao-07": [
      "A barreira fechada é um sinal sério: o trem está chegando!",
      "Esperar atrás da cancela é a única escolha segura."
    ],
    "missao-08": [
      "Pensa de novo com calma: qual escolha é a mais protegida?",
      "Juntos a gente aprende — olha a explicação e tenta de novo."
    ]
  },

  /* ----- Ao concluir uma missão (lembra a principal regra aprendida) ----- */
  done: {
    generic: "Missão concluída! Cada regra que você aprendeu deixa a viagem mais segura!",
    "missao-01": "Missão da Plataforma concluída! Lembre-se: sempre atrás da faixa amarela!",
    "missao-02": "Missão da Faixa Amarela concluída! Respeitar o limite é proteger todo mundo!",
    "missao-03": "Missão do Embarque concluída! Embarcar com calma e em fila é o caminho!",
    "missao-04": "Missão do Desembarque concluída! Você desceu com calma e seguiu em frente!",
    "missao-05": "Missão Dentro do Trem concluída! Segure firme e respeite os passageiros!",
    "missao-06": "Missão da Estação concluída! Placas e avisos são os nossos guias de segurança!",
    "missao-07": "Missão da Passagem de Nível concluída! Barreira fechada, aguardamos com respeito!",
    "missao-08": "MISSÃO FERROVIÁRIA SEGURA CONCLUÍDA! Você é um guardião da segurança nas trilhas! 🏆"
  },

  /* ----- Convite para continuar a aventura ----- */
  doneNext: "Bora continuar a aventura? Toque em PRÓXIMA MISSÃO quando quiser!",

  /* ----- Fim do jogo ----- */
  final: [
    "Você completou todas as missões e virou um especialista em segurança ferroviária!",
    "Guarde tudo: plataforma, faixa amarela, portas, barreiras… você sabe direitinho!",
    "Obrigado por jogar comigo! Nos vemos na próxima aventura! 🚂"
  ]
};