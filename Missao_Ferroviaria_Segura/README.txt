============================================================
   MISSÃO FERROVIÁRIA SEGURA — Jogo Educativo
   Educação e segurança ferroviária para crianças de 7 a 12 anos
============================================================

COMO ABRIR O JOGO
-----------------
Dê dois cliques em  index.html  (ou arraste-o para o navegador).
O jogo funciona 100% offline, sem servidor, sem internet
e sem instalação de programas. Recomendado: Google Chrome ou
Microsoft Edge (outros navegadores também funcionam).

STRUCTURE DO PROJETO
--------------------
  index.html                 Página principal (tela única com o jogo)
  css/style.css              Visual completo e responsivo
  js/storage.js              Progresso salvo em localStorage
  js/questions.js            Banco de perguntas (conteúdo editável)
  js/missions.js             Missões + utilidades
  js/quiz.js                 Lógica do quiz e embaralhamento
  js/audio.js                Sons com fallback automático
  js/ui.js                   Telas, quiz, feedback e progresso
  js/app.js                  Inicialização e autoteste
  assets/characters/lipe.svg Guia da aventura
  assets/scenes/             Cenas ilustradas (plataforma, faixa, passagem)
  assets/audio/              Efeitos sonoros (mp3 + wav)

CONTEÚDO
--------
- 8 missões:
   1. A Plataforma          2. A Faixa Amarela
   3. O Embarque            4. O Desembarque
   5. Dentro do Trem        6. Comportamento na Estação
   7. Passagem de Nível     8. Grande Missão Final
- 40 perguntas iniciais (5 por missão), com explicação educativa.
- As alternativas são embaralhadas a cada jogada; a correta
  nunca fica fixa em uma posição.

COMO ADICIONAR / EDITAR CONTEÚDO
--------------------------------
PERGUNTAS (js/questions.js):
  Cada pergunta tem: id, missionId, type, question, options (4),
  correct (índice 0-3), explanation, image, active.
  • active: false  => a pergunta fica cadastrada, mas não aparece.
  • Para trocar a resposta certa, altere apenas o número em "correct".

NOVAS MISSÕES (js/missions.js):
  Adicione um objeto em MFS.missions com id, title, description,
  intro, order, icon e active: true. Missões com active: true
  aparecem automaticamente no menu, no progresso e no resultado.
  Depois cadastre suas perguntas com missionId igual ao id da missão.

IMAGENS:
  Coloque arquivos em assets/scenes/ e aponte o campo "image" da
  pergunta. Por padrão as cenas são desenhadas em SVG.

SOM:
  assets/audio/*.mp3 (e *.wav). Se um arquivo não existir, o jogo
  toca um som sintetizado — nunca trava. Controle de som em:
  botão 🔊/🔇 na tela e durante as missões.

PROGRESSO
---------
Tudo fica salvo automaticamente no aparelho (localStorage):
missões concluídas, estrelas, melhores pontuações, perguntas
respondidas e acertos. Em "MEU PROGRESSO" há opção de
REINICIAR PROGRESSO com confirmação.

REGRAS DE SEGURANÇA NAS IMAGENS
-------------------------------
Todas as cenas respeitam a regra de ouro: NUNCA personagens sobre
os trilhos. Todos aparecem atrás da faixa amarela, atrás das
barreiras ou em área segura. Esse é o ponto mais importante do jogo.

DIREÇÃO VISUAL (estilo filme de animação)
-----------------------------------------
Personagens e cenas são desenhados como animação 3D cinematográfica
familiar (luz, profundidade, expressões), SEM copiar qualquer obra
existente: o guia Lipe tem 7 expressões (alegre, vitória, curioso,
atenção, surpresa, preocupado, quase); as cenas de plataforma, faixa
e passagem de nível ganharam iluminação, gradientes e detalhes.
As camadas visuais NUNCA contrariam a regra acima: a faixa amarela
continua visível e ninguém invade a via (os testes E2E garantem isso).
- assets/characters/lipe.svg: versão estática do guia.
- assets/scenes/cena-plataforma-home.svg: estação com trem parando.
- assets/scenes/cena-familia-faixa.svg: família atrás da faixa amarela.
- assets/scenes/cena-passagem-nivel.svg: barreiras fechadas, trem
  passando, ninguém na travessia.

Emojis e símbolos são evitados; toda arte é em SVG (vetorial),
redimensiona sem perder qualidade.

AUTOTESTE
---------
Abra:  index.html?autoteste=1
O jogo roda uma bateria de verificações (dados, embaralhamento,
correção, estrelas, progresso) e mostra o resultado no rodapé
e no título da aba.

SEGURANÇA (crianças)
--------------------
As mensagens são sempre positivas ("Muito bem!", "Quase!").
Nunca há frases constrangedoras, imagens de acidentes ou sangue.
O objetivo é ensino e prevenção.