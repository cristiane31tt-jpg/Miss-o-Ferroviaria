/* =========================================================================
   MISSÃO FERROVIÁRIA SEGURA — BANCO DE PERGUNTAS (conteúdo editável)
   -------------------------------------------------------------------------
   Este arquivo contém APENAS o conteúdo das perguntas. Para adicionar,
   editar, excluir ou desativar perguntas basta alterar este arquivo.

   Estrutura de cada pergunta:
     id          : identificador único (ex.: "Q001")
     missionId   : ID da missão à qual pertence (ex.: "missao-01")
     type        : tipo da pergunta — "direta" | "situacao" | "cena"
                   (o sistema aceita novos tipos sem alterações no código)
     question    : enunciado
     options     : EXATAMENTE 4 alternativas
     correct     : índice (0..3) da alternativa correta em `options`
                   (a apresentação é embaralhada no momento do jogo)
     explanation : explicação educativa exibida após a resposta
     image       : null ou caminho de imagem opcional (assets/scenes/...)
     active      : true = ativa | false = inativa (fica cadastrada,
                   mas NÃO aparece no jogo)

   MISSÕES ATUAIS: 8 missões × 5 perguntas = 40 perguntas.
   ========================================================================= */

window.MFS = window.MFS || {};

MFS.questions = [

  /* ===================== MISSÃO 1 — A PLATAFORMA ===================== */
  {
    id: "Q001",
    missionId: "missao-01",
    type: "direta",
    question: "Você chegou à estação com sua família. Onde deve ficar enquanto espera o trem?",
    options: [
      "Perto da borda da plataforma",
      "Atrás da faixa amarela, em local seguro",
      "Sentado no chão perto da faixa",
      "Na área dos trilhos"
    ],
    correct: 1,
    explanation: "Devemos permanecer atrás da faixa amarela, afastados da borda da plataforma e atentos aos avisos da estação.",
    image: null,
    active: true
  },
  {
    id: "Q002",
    missionId: "missao-01",
    type: "direta",
    question: "Para que serve a faixa amarela próxima à borda da plataforma?",
    options: [
      "Para indicar onde as pessoas devem correr",
      "Para decorar a plataforma",
      "Para indicar um limite de segurança que deve ser respeitado",
      "Para marcar o local onde o trem deve parar"
    ],
    correct: 2,
    explanation: "A faixa amarela ajuda a indicar o limite que os passageiros devem respeitar para permanecer afastados da borda.",
    image: null,
    active: true
  },
  {
    id: "Q003",
    missionId: "missao-01",
    type: "situacao",
    question: "Enquanto espera o trem, um amigo chama você para brincar perto da borda. O que você faz?",
    options: [
      "Vai brincar rapidamente",
      "Corre até a borda e volta",
      "Fica em local seguro e explica que não é permitido brincar ali",
      "Senta na borda da plataforma"
    ],
    correct: 2,
    explanation: "A borda da plataforma é perigosa: correr ou brincar ali pode causar quedas. O certo é ficar em local seguro e explicar ao amigo por que não é o lugar certo.",
    image: null,
    active: true
  },
  {
    id: "Q004",
    missionId: "missao-01",
    type: "situacao",
    question: "Um trem está chegando à estação. Qual é a atitude mais segura?",
    options: [
      "Aproximar-se da borda para ver melhor",
      "Permanecer atrás da faixa amarela e esperar o trem parar",
      "Acenar para o maquinista bem perto da borda",
      "Correr na direção da porta"
    ],
    correct: 1,
    explanation: "Enquanto o trem entra na estação ele ainda está em movimento. Fique atrás da faixa amarela e só se aproxixe depois que o trem parar.",
    image: null,
    active: true
  },
  {
    id: "Q005",
    missionId: "missao-01",
    type: "situacao",
    question: "Você está esperando o trem e percebe que algumas pessoas estão muito próximas da borda. O que deve fazer?",
    options: [
      "Ir para perto delas",
      "Permanecer em local seguro e avisar um adulto ou funcionário, se necessário",
      "Empurrá-las para longe",
      "Gritar com elas"
    ],
    correct: 1,
    explanation: "A própria segurança vem em primeiro lugar: não empurre ninguém. Mantenha-se em local seguro e procure um adulto ou funcionário da estação para ajudar.",
    image: null,
    active: true
  },

  /* ===================== MISSÃO 2 — A FAIXA AMARELA ===================== */
  {
    id: "Q006",
    missionId: "missao-02",
    type: "direta",
    question: "Lipe pergunta: \"Onde devemos permanecer enquanto esperamos o trem?\"",
    options: [
      "Sobre a faixa amarela",
      "Atrás da faixa amarela, afastados da borda",
      "Na área dos trilhos",
      "Entre a plataforma e o trem"
    ],
    correct: 1,
    explanation: "A posição segura é sempre atrás da faixa amarela, afastado da borda, acompanhando a chegada do trem com tranquilidade.",
    image: null,
    active: true
  },
  {
    id: "Q007",
    missionId: "missao-02",
    type: "situacao",
    question: "Uma criança deixa cair um brinquedo além da faixa amarela, próximo à borda. O que ela deve fazer?",
    options: [
      "Tentar pegar rapidamente",
      "Pedir para outra criança pegar",
      "Avisar um adulto ou funcionário e nunca tentar recuperar o objeto sozinha",
      "Descer até a via"
    ],
    correct: 2,
    explanation: "Ninguém deve ultrapassar a faixa amarela nem descer para a via. Um adulto ou funcionário da estação sabe resgatar objetos com segurança.",
    image: null,
    active: true
  },
  {
    id: "Q008",
    missionId: "missao-02",
    type: "direta",
    question: "Por que não devemos correr na plataforma?",
    options: [
      "Porque podemos tropeçar, cair ou nos aproximar perigosamente da borda",
      "Porque o trem pode parar",
      "Porque os funcionários não gostam",
      "Porque correr faz barulho"
    ],
    correct: 0,
    explanation: "A plataforma é um lugar de espera e circulação. Correr aumenta o risco de tropeçar, colidir com outras pessoas ou chegar perigosamente perto da borda.",
    image: null,
    active: true
  },
  {
    id: "Q009",
    missionId: "missao-02",
    type: "direta",
    question: "Qual dessas atitudes é segura na plataforma?",
    options: [
      "Brincar de correr",
      "Sentar perto da borda",
      "Permanecer em local seguro e prestar atenção aos avisos da estação",
      "Entrar em áreas restritas"
    ],
    correct: 2,
    explanation: "A atitude segura é esperar em local seguro, atrás da faixa amarela, e prestar atenção nos avisos e sinalizações da estação.",
    image: null,
    active: true
  },
  {
    id: "Q010",
    missionId: "missao-02",
    type: "cena",
    question: "Observe a cena: uma família espera o trem atrás da faixa amarela, todos afastados da borda. O que eles estão fazendo corretamente?",
    options: [
      "Estão ocupando a área dos trilhos",
      "Estão respeitando a área de segurança da plataforma",
      "Estão bloqueando a passagem",
      "Estão esperando no lugar errado"
    ],
    correct: 1,
    explanation: "Atrás da faixa amarela é a área segura da plataforma: todos esperam afastados da borda, com espaço para circular e para os avisos da estação.",
    image: "assets/scenes/cena-familia-faixa.svg",
    active: true
  },

  /* ===================== MISSÃO 3 — O EMBARQUE ===================== */
  {
    id: "Q011",
    missionId: "missao-03",
    type: "direta",
    question: "O trem chegou. Quando devemos embarcar?",
    options: [
      "Antes de o trem parar",
      "Enquanto as portas estão fechando",
      "Depois que o trem parar completamente e as portas forem liberadas",
      "Pela janela"
    ],
    correct: 2,
    explanation: "O embarque só começa depois que o trem está totalmente parado e as portas foram abertas com segurança pela equipe.",
    image: null,
    active: true
  },
  {
    id: "Q012",
    missionId: "missao-03",
    type: "situacao",
    question: "Antes de entrar no trem, o que devemos fazer?",
    options: [
      "Empurrar quem está na frente",
      "Esperar a saída dos passageiros e embarcar com calma",
      "Correr para garantir um lugar",
      "Entrar por qualquer porta que esteja fechando"
    ],
    correct: 1,
    explanation: "Primeiro saem quem está dentro, depois entra quem está na plataforma. Embarcar com calma evita tropeços e atrapalha menos os outros.",
    image: null,
    active: true
  },
  {
    id: "Q013",
    missionId: "missao-03",
    type: "situacao",
    question: "Uma pessoa está saindo do trem enquanto você quer entrar. O que fazer?",
    options: [
      "Entrar primeiro",
      "Bloquear a porta",
      "Dar espaço para a pessoa desembarcar e depois embarcar",
      "Empurrá-la suavemente"
    ],
    correct: 2,
    explanation: "A porta é compartilhada: quem sai tem prioridade. Dar espaço deixa o embarque mais rápido e evita colisões na porta do trem.",
    image: null,
    active: true
  },
  {
    id: "Q014",
    missionId: "missao-03",
    type: "situacao",
    question: "Lipe percebe que uma criança está correndo para alcançar a porta do trem. Qual é a atitude correta?",
    options: [
      "Correr ainda mais rápido",
      "Pedir para alguém segurar a porta",
      "Não correr nem tentar impedir o fechamento da porta; esperar o próximo trem com um adulto",
      "Entrar por qualquer porta que esteja fechando"
    ],
    correct: 2,
    explanation: "Nunca se deve segurar nem forçar as portas do trem. Se você ficou de fora, fique em local seguro atrás da faixa amarela e espere o próximo trem acompanhado de um adulto.",
    image: null,
    active: true
  },
  {
    id: "Q015",
    missionId: "missao-03",
    type: "direta",
    question: "Qual comportamento ajuda a tornar o embarque mais seguro?",
    options: [
      "Empurrar para entrar primeiro",
      "Manter a calma, respeitar a fila e seguir as orientações da estação",
      "Correr pela plataforma",
      "Segurar a porta para outras pessoas"
    ],
    correct: 1,
    explanation: "Calma, fila e orientação da estação fazem o embarque fluir melhor e com muito menos risco de tropeços e pancadas.",
    image: null,
    active: true
  },

  /* ===================== MISSÃO 4 — O DESEMBARQUE ===================== */
  {
    id: "Q016",
    missionId: "missao-04",
    type: "direta",
    question: "O trem chegou ao seu destino. Quando você deve sair?",
    options: [
      "Antes de o trem parar",
      "Assim que a porta começar a abrir",
      "Depois que o trem parar completamente e a porta estiver liberada",
      "Pela janela"
    ],
    correct: 2,
    explanation: "Só se desembarca com o trem totalmente parado e a porta totalmente aberta. Assim você evita escorregar no degrau.",
    image: null,
    active: true
  },
  {
    id: "Q017",
    missionId: "missao-04",
    type: "situacao",
    question: "Ao desembarcar, você percebe que muitas pessoas estão esperando para entrar. O que fazer?",
    options: [
      "Parar na porta",
      "Sair da área da porta para dar passagem aos outros passageiros",
      "Voltar para dentro do trem",
      "Empurrar quem está esperando"
    ],
    correct: 1,
    explanation: "Ao sair, afaste-se da porta para quem espera entrar. Isso desobstrui a porta e evita que as pessoas se choquem.",
    image: null,
    active: true
  },
  {
    id: "Q018",
    missionId: "missao-04",
    type: "situacao",
    question: "Você está quase chegando à porta quando o aviso informa que o trem está partindo. O que fazer?",
    options: [
      "Correr até a porta",
      "Tentar segurar a porta",
      "Permanecer no trem e desembarcar na próxima estação, com segurança",
      "Pedir para alguém impedir o fechamento"
    ],
    correct: 2,
    explanation: "Tentando correr ou segurar a porta você pode se machucar. O caminho seguro é continuar viagem e desembarcar na próxima estação.",
    image: null,
    active: true
  },
  {
    id: "Q019",
    missionId: "missao-04",
    type: "direta",
    question: "Depois de desembarcar, você deve:",
    options: [
      "Parar imediatamente na frente da porta",
      "Caminhar com atenção e seguir as orientações da estação",
      "Correr pela plataforma",
      "Ir para perto dos trilhos"
    ],
    correct: 1,
    explanation: "Depois de sair do trem, caminhe com atenção, afaste-se da porta e siga as placas e orientações da estação até o seu destino.",
    image: null,
    active: true
  },
  {
    id: "Q020",
    missionId: "missao-04",
    type: "situacao",
    question: "Durante o desembarque, qual atitude é mais segura?",
    options: [
      "Empurrar para sair primeiro",
      "Descer olhando para o celular",
      "Prestar atenção ao caminho e manter-se em local seguro após sair do trem",
      "Correr para encontrar a família"
    ],
    correct: 2,
    explanation: "Prestar atenção ao degrau e ao caminho evita tropeços. Depois de sair, procure um local seguro da plataforma para reencontrar sua família.",
    image: null,
    active: true
  },

  /* ===================== MISSÃO 5 — DENTRO DO TREM ===================== */
  {
    id: "Q021",
    missionId: "missao-05",
    type: "direta",
    question: "Dentro do trem, quando estiver em pé, o que é recomendado fazer?",
    options: [
      "Segurar em um apoio disponível",
      "Ficar encostado na porta",
      "Sentar no chão",
      "Caminhar durante o movimento do trem"
    ],
    correct: 0,
    explanation: "O trem pode frear a qualquer momento. Segurar em uma alça ou apoio mantém você em pé mesmo quando o trem dá uma sacudida.",
    image: null,
    active: true
  },
  {
    id: "Q022",
    missionId: "missao-05",
    type: "direta",
    question: "Por que não devemos nos apoiar ou encostar nas portas do trem?",
    options: [
      "Porque podemos interferir na operação e nos colocar em risco",
      "Porque as portas são decorativas",
      "Porque o trem fica mais lento",
      "Porque podemos sujá-las"
    ],
    correct: 0,
    explanation: "As portas são partes móveis do trem: encostar pode ativá-las ou fazer você perder o equilíbrio. O apoio certo é em alças, bancos e costas dos assentos.",
    image: null,
    active: true
  },
  {
    id: "Q023",
    missionId: "missao-05",
    type: "situacao",
    question: "Você está com uma mochila dentro do trem. Qual atitude é mais segura?",
    options: [
      "Deixá-la bloqueando a passagem",
      "Colocá-la de maneira que não atrapalhe os outros passageiros",
      "Colocá-la sobre a porta",
      "Deixá-la no meio do corredor"
    ],
    correct: 1,
    explanation: "O corredor precisa ficar livre para a circulação e para a saída em caso de emergência. Guarde a mochila no colo, no porta-objetos ou entre os pés.",
    image: null,
    active: true
  },
  {
    id: "Q024",
    missionId: "missao-05",
    type: "situacao",
    question: "Se você perceber algo estranho ou perigoso dentro do trem, o que deve fazer?",
    options: [
      "Tentar resolver sozinho",
      "Ignorar",
      "Avisar um adulto ou funcionário do sistema ferroviário",
      "Fazer uma brincadeira com a situação"
    ],
    correct: 2,
    explanation: "Adultos e funcionários têm treino para agir nessas situações. Avisar rápido é a atitude mais responsável — e você também deve avisar seus responsáveis.",
    image: null,
    active: true
  },
  {
    id: "Q025",
    missionId: "missao-05",
    type: "direta",
    question: "Durante a viagem, qual comportamento é mais seguro?",
    options: [
      "Correr pelo trem",
      "Brincar perto das portas",
      "Permanecer em segurança e respeitar os demais passageiros",
      "Mexer nos equipamentos do trem"
    ],
    correct: 2,
    explanation: "Viajar sentado ou segurado, sem correr e sem mexer nos equipamentos, protege você e deixa a viagem agradável para todo mundo.",
    image: null,
    active: true
  },

  /* ============== MISSÃO 6 — COMPORTAMENTO NA ESTAÇÃO ============== */
  {
    id: "Q026",
    missionId: "missao-06",
    type: "direta",
    question: "Na estação, por que devemos prestar atenção às placas e avisos?",
    options: [
      "Porque eles ajudam a orientar os passageiros e indicar procedimentos de segurança",
      "Porque são parte da decoração",
      "Porque mostram onde brincar",
      "Porque indicam onde podemos entrar nos trilhos"
    ],
    correct: 0,
    explanation: "Placas e avisos mostram caminhos, saídas, áreas restritas e regras de segurança. Seguir a sinalização é a forma mais rápida de chegar a lugar nenhum errado.",
    image: null,
    active: true
  },
  {
    id: "Q027",
    missionId: "missao-06",
    type: "situacao",
    question: "Você encontra uma porta com uma placa indicando acesso restrito. O que deve fazer?",
    options: [
      "Entrar para descobrir o que existe",
      "Entrar rapidamente",
      "Não entrar e respeitar a área restrita",
      "Chamar outra criança para entrar"
    ],
    correct: 2,
    explanation: "Áreas restritas são reservadas à equipe autorizada e podem ter riscos elétricos e de circulação de trens. O certo é não entrar e seguir pelo caminho do público.",
    image: null,
    active: true
  },
  {
    id: "Q028",
    missionId: "missao-06",
    type: "direta",
    question: "Ao usar uma escada na estação, qual atitude é mais segura?",
    options: [
      "Correr",
      "Empurrar quem está à frente",
      "Usar o corrimão quando necessário e subir ou descer com atenção",
      "Pular degraus"
    ],
    correct: 2,
    explanation: "Escadas concentram quedas. Segurar o corrimão, usar um degrau por vez e prestar atenção protege você e quem está por perto.",
    image: null,
    active: true
  },
  {
    id: "Q029",
    missionId: "missao-06",
    type: "situacao",
    question: "Você está com seus pais na estação e percebe que se afastou deles. O que é melhor fazer?",
    options: [
      "Sair correndo pela estação procurando-os",
      "Ir para a plataforma sozinho",
      "Procurar um funcionário da estação e pedir ajuda",
      "Sair da estação sozinho"
    ],
    correct: 2,
    explanation: "Fique em um ponto visível e procure a equipe da estação: os funcionários são treinados para ajudar crianças separadas de suas famílias.",
    image: null,
    active: true
  },
  {
    id: "Q030",
    missionId: "missao-06",
    type: "situacao",
    question: "Qual dessas atitudes NÃO é segura dentro de uma estação?",
    options: [
      "Caminhar com atenção",
      "Respeitar as sinalizações",
      "Brincar de correr perto da plataforma",
      "Permanecer acompanhado de um adulto"
    ],
    correct: 2,
    explanation: "Brincar de correr perto da plataforma pode terminar em queda ou colisão. Na estação, divertir-se é ótimo — desde que longe da borda e sem correr.",
    image: null,
    active: true
  },

  /* ===================== MISSÃO 7 — PASSAGEM DE NÍVEL ===================== */
  {
    id: "Q031",
    missionId: "missao-07",
    type: "direta",
    question: "Ao chegar a uma passagem de nível, o que você deve fazer?",
    options: [
      "Atravessar rapidamente",
      "Respeitar a sinalização e os dispositivos de segurança do local",
      "Passar por baixo da barreira",
      "Ignorar os sinais"
    ],
    correct: 1,
    explanation: "Luzes, alarmes e barreiras existem para proteger quem atravessa. Respeitar todos eles é a única forma segura de usar a passagem de nível.",
    image: null,
    active: true
  },
  {
    id: "Q032",
    missionId: "missao-07",
    type: "situacao",
    question: "A sinalização da passagem de nível indica que um trem está se aproximando. O que fazer?",
    options: [
      "Atravessar antes que o trem chegue",
      "Passar ao redor da barreira",
      "Esperar em local seguro até que a passagem esteja liberada conforme a sinalização",
      "Correr para atravessar"
    ],
    correct: 2,
    explanation: "Assim que as luzes começam a piscar, o trem está perto. A única decisão certa é esperar em local seguro até a liberação total da passagem.",
    image: null,
    active: true
  },
  {
    id: "Q033",
    missionId: "missao-07",
    type: "situacao",
    question: "A barreira de uma passagem de nível está fechada. O que você deve fazer?",
    options: [
      "Passar por baixo",
      "Passar pelo lado",
      "Esperar a liberação e nunca ultrapassar a barreira fechada",
      "Pedir para outra pessoa levantar a barreira"
    ],
    correct: 2,
    explanation: "A barreira fechada significa que o trem está chegando. Passar por baixo ou pelo lado é proibido e extremamente perigoso — espere abrir.",
    image: null,
    active: true
  },
  {
    id: "Q034",
    missionId: "missao-07",
    type: "direta",
    question: "Por que nunca devemos atravessar uma passagem de nível fora do local destinado à travessia?",
    options: [
      "Porque podemos entrar em uma área de circulação ferroviária e ficar em situação de risco",
      "Porque podemos sujar o local",
      "Porque demora mais",
      "Porque o trem pode ficar parado"
    ],
    correct: 0,
    explanation: "Fora da travessia oficial não há proteção nem visibilidade completa: você entra na área por onde o trem circula, em velocidade, sem aviso.",
    image: null,
    active: true
  },
  {
    id: "Q035",
    missionId: "missao-07",
    type: "situacao",
    question: "Lipe está acompanhado de uma criança e chega a uma passagem de nível. O sinal de alerta está acionado. Qual é a decisão correta?",
    options: [
      "Atravessar correndo",
      "Esperar em segurança até a liberação da passagem",
      "Passar pela lateral da barreira",
      "Pedir para a criança atravessar primeiro"
    ],
    correct: 1,
    explanation: "Com o alerta acionado, adultos e crianças esperam juntos, atrás da barreira, até as luzes pararem e a passagem ser liberada.",
    image: "assets/scenes/cena-passagem-nivel.svg",
    active: true
  },

  /* =================== MISSÃO 8 — GRANDE MISSÃO FINAL =================== */
  {
    id: "Q036",
    missionId: "missao-08",
    type: "situacao",
    question: "Você está na plataforma e seu brinquedo cai perto da borda. Qual é a decisão mais segura?",
    options: [
      "Pegar rapidamente",
      "Pedir para outra criança pegar",
      "Não tentar recuperar o brinquedo e avisar um adulto ou funcionário",
      "Descer para a via"
    ],
    correct: 2,
    explanation: "Objeto nenhum vale um risco: nem você nem outra criança devem ultrapassar a faixa amarela. Um funcionário recolhe o objeto com segurança.",
    image: null,
    active: true
  },
  {
    id: "Q037",
    missionId: "missao-08",
    type: "situacao",
    question: "O trem está chegando e um amigo começa a correr pela plataforma. O que você deve fazer?",
    options: [
      "Correr junto",
      "Permanecer em local seguro e chamar a atenção do adulto responsável para a situação",
      "Segurá-lo pelo braço perto da borda",
      "Correr para o trem"
    ],
    correct: 1,
    explanation: "Você não deve se arriscar nem brigar perto da borda. Fique em local seguro e chame um adulto: ele consegue agir com mais calma e autoridade.",
    image: null,
    active: true
  },
  {
    id: "Q038",
    missionId: "missao-08",
    type: "situacao",
    question: "Você precisa embarcar, mas há passageiros saindo do trem. Qual é a melhor decisão?",
    options: [
      "Entrar primeiro",
      "Esperar os passageiros desembarcarem e depois embarcar com segurança",
      "Bloquear a porta",
      "Empurrar para conseguir entrar"
    ],
    correct: 1,
    explanation: "Quem sai tem prioridade. Esperar os passageiros desembarcarem deixa a porta livre e o embarque mais rápido e seguro para todos.",
    image: null,
    active: true
  },
  {
    id: "Q039",
    missionId: "missao-08",
    type: "situacao",
    question: "Você está em uma estação e vê uma situação que parece perigosa. O que deve fazer?",
    options: [
      "Se aproximar para investigar",
      "Gravar um vídeo",
      "Afastar-se da situação e avisar um adulto ou funcionário",
      "Tentar resolver sozinho"
    ],
    correct: 2,
    explanation: "Nunca tente resolver situações de risco sozinho. Afastar-se e avisar um adulto ou funcionário é a atitude mais madura e mais segura.",
    image: null,
    active: true
  },
  {
    id: "Q040",
    missionId: "missao-08",
    type: "situacao",
    question: "Lipe faz a pergunta final: \"Qual é uma das principais regras da Missão Ferroviária Segura?\"",
    options: [
      "Ser o mais rápido possível",
      "Nunca ter medo de chegar perto do trem",
      "Respeitar as regras de segurança, permanecer em locais seguros e seguir as orientações dos adultos e funcionários",
      "Fazer tudo sozinho para aprender mais rápido"
    ],
    correct: 2,
    explanation: "Essa é a essência da missão: respeitar as regras, ficar em locais seguros e seguir os adultos e funcionários. Assim você viaja tranquilo em qualquer estação!",
    image: null,
    active: true
  }

];
