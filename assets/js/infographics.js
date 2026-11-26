/* ==========================================================================
   SmartInovaT — Interactive Data Visualization & SVG Infographics Engine
   File: assets/js/infographics.js
   Features:
     - Bilingual PT-BR / EN (reacts to data-lang & smartinovat:langchange)
     - Theme-Aware SVGs (Dark Obsidian & Light Precision Blueprint via CSS vars
       and smartinovat:themechange)
     - Analytics dataLayer hooks (diagnostic_pain_select, portfolio_preview_open)
     - Root-prefix aware for /index.html and /en/index.html
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Portfolio App Metadata ---------- */
  const PORTFOLIO_MAP = {
    produthivia: { name: 'ProduthivIA', file: 'produthivia-landing.html' },
    capacittai: { name: 'CapacittAI', file: 'capacittai-landing.html' },
    presenthia: { name: 'Presenthia', file: 'presenthia-landing.html' },
    eckkoai: { name: 'eckko.ai', file: 'eckkoai-landing.html' },
    strikeflow3: { name: 'StrikeFlow3', file: 'strikeflow3-landing.html' },
    edumaxia: { name: 'EduMaxia', file: 'edumaxia-entrar.html' },
    bellavitia: { name: 'Bellavitia', file: 'bellavitia-landing.html' },
    solochordys: { name: 'Solochordys', file: 'solochordys-landing.html' },
    parthituria: { name: 'Parthituria', file: 'parthituria-landing.html' }
  };

  /* ---------- Bilingual Content Dictionary (PT & EN) ---------- */
  const I18N = {
    pt: {
      ui: {
        interactiveHint: '⚡ Interativo • Clique nos nós ou botões',
        partAEyebrow: 'PARTE A • ARQUITETURA DE VALOR EM 4 EIXOS',
        partATitle: 'Como o Dado Sai da Máquina Física e Vira Decisão Governada',
        partASubtitle:
          'Sem dado confiável de chão de fábrica, a Inteligência Artificial não entrega resultado amplo. Selecione cada eixo para inspecionar a dor resolvida, o escopo entregue e as aplicações em produção que comprovam a execução.',
        axesTabAria: 'Os 4 Eixos de Solução',
        axesSvgAria: 'Fluxo interativo dos 4 Eixos de Solução SmartInovaT conectando máquina física à decisão governada',
        physicalEndTag: 'PONTA FÍSICA',
        physicalEndTitle: 'Máquina & Linha',
        physicalEndSub: 'CNC • Sensores • Chão',
        logicalEndTag: 'PONTA LÓGICA',
        logicalEndTitle: 'Decisão & ROI',
        logicalEndSub: 'IA Auditável • Gestão',
        axesFlowCaption: 'FLUXO CONTÍNUO DE VALOR • CLIQUE EM CADA EIXO PARA INSPECIONAR ENTREGAS E PROVAS',
        axisLabelPrefix: 'EIXO ',
        painSolvedKicker: ' • A DOR QUE RESOLVE',
        talkAxisBtn: 'Conversar sobre este Eixo →',
        concreteDeliverablesKicker: 'ENTREGAS CONCRETAS AO CLIENTE',
        realProofKicker: 'PROVA REAL NO PORTFÓLIO & CAMPO',
        seeProofBtn: 'Ver Prova: ',

        partBEyebrow: 'PARTE B • ESCADA DE MATURIDADE DIGITAL ACATECH',
        partBTitle: 'Os 6 Estágios da Indústria 4.0: Em Qual Degrau Sua Operação Está Hoje?',
        partBSubtitle:
          'Selecione qualquer degrau na escada vetorial abaixo para ver o retrato operacional típico, o gargalo oculto que drena margem e o entregável prático priorizado por retorno financeiro.',
        execTranslationTag: 'TRADUÇÃO EXECUTIVA',
        acatechTranslationHtml:
          '<strong>O que é o ACATECH Maturity Index?</strong> É a metodologia estruturada pela Academia Alemã de Ciência e Engenharia para diagnosticar a maturidade industrial em 6 níveis objetivos. <strong>O que o cliente recebe:</strong> clareza sobre onde investir primeiro para obter retorno rápido, sem comprar IA complexa antes de conectar o dado que a sustenta.',
        acatechSvgAria: 'Escada de Maturidade Digital ACATECH em 6 estágios da Indústria 4.0',
        acatechBand1: '1–2 • DIGITALIZAÇÃO DE BASE',
        acatechBand2: '3–4 • VISIBILIDADE & CAUSA-RAIZ',
        acatechBand3: '5–6 • PREDIÇÃO & AUTONOMIA',
        acatechFooterCaption: 'PROGRESSÃO DE MATURIDADE INDUSTRIAL • CADA DEGRAU SUSTENTA O RETORNO DO PRÓXIMO',
        typicalPlantKicker: ' • RETRATO TÍPICO DA PLANTA',
        hiddenBottleneckKicker: 'GARGALO OCULTO NESTE DEGRAU',
        hiddenBottleneckHeading: 'Onde o investimento costuma travar',
        practicalDeliverableKicker: 'ENTREGÁVEL PRÁTICO SMARTINOVAT',
        practicalDeliverableHeading: 'Próximo degrau priorizado por ROI',
        assessStageBtn: 'Avaliar Meu Estágio Atual →',
        assessStageTopicPrefix: 'Diagnóstico ACATECH — Avaliar minha operação (referência atual: ',

        archEyebrow: 'BLUEPRINT PONTA A PONTA • 6 CAMADAS INTEGRADAS',
        archTitle: 'Do Chão de Fábrica à Decisão Executiva sob o Mesmo Teto Técnico',
        archSubtitle:
          'Consultorias tradicionais entregam o diagnóstico e terceirizam o código; fábricas de software dominam telas, mas desconhecem um centro de usinagem CNC. Explore como as 6 camadas se conectam sem elos quebrados.',
        archHint: '6 Camadas • Físico + Lógico',
        archSvgAria: 'Blueprint em 6 camadas conectando Chão de Fábrica à Governança Executiva',
        archTopCaption: 'BARRAMENTO ÓPTICO INTEGRADO • ZERO QUEBRA ENTRE HARDWARE INDUSTRIAL E CÓDIGO',
        archBusLeft: 'TELEMETRIA & DADO EM TEMPO REAL ▲',
        archBusRight: 'GOVERNANÇA, AUDITORIA & ROI ▲',
        archBottomCaption: 'PASSE O MOUSE OU CLIQUE EM QUALQUER CAMADA PARA VER OS COMPONENTES VERIFICADOS',
        archLayerWord: 'CAMADA ',
        archSelectedKicker: ' SELECIONADA • TECNOLOGIAS & MÉTODOS',
        evidenceBtnPrefix: 'Evidência: ',

        painEyebrow: 'CATÁLOGO POR NECESSIDADE • 11 DORES OPERACIONAIS REAIS',
        painTitle: 'Comece pela Dor da Sua Operação — Não pela Sigla da Tecnologia',
        painSubtitle:
          'Selecione o cenário que mais se aproxima do momento atual da sua fábrica ou empresa para visualizar imediatamente a rota técnica, os eixos acionados e o próximo passo recomendado.',
        painFilterAria: 'Filtrar dores operacionais por área',
        painListAria: 'Lista de dores operacionais',
        axisWord: 'Eixo ',
        routeHeaderPrefix: 'ROTA DE SOLUÇÃO SMARTINOVAT • ',
        routeSvgAria: 'Rota visual de solução SmartInovaT para a dor selecionada',
        routeSt1: 'DOR REAL',
        routeSt2: 'ARQUITETURA',
        routeSt2Sub: 'Engenharia Aplicada',
        routeSt3: 'EIXO(S)',
        routeSt4: 'IMPACTO & AÇÃO',
        routeSt4Sub: 'Escopo Priorizado',
        step1Label: '01 • SINTOMA RAIZ NA OPERAÇÃO',
        step2Label: '02 • ARQUITETURA DA SOLUÇÃO TÉCNICA',
        step3Label: '03 • EIXO(S) ACIONADO(S)',
        step3Suffix: ' — combinação desenhada para resolver coleta, decisão e adoção sem ponta solta.',
        step4Label: '04 • IMPACTO ESPERADO & PRÓXIMO PASSO',
        solvePainBtn: 'Resolver Esta Dor (Pré-preencher Contato) →',
        openRelatedAppBtn: 'Abrir App Relacionado: ',

        govEyebrow: 'GOVERNANÇA EXECUTIVA TRADUZIDA EM NEGÓCIO',
        govTitle: 'Inovação como Processo Contínuo (ISO 56002) + IA Auditável (ISO 42001)',
        govSubtitle:
          'Siglas técnicas sozinhas não resolvem problemas operacionais. Veja na prática o que muda na gestão da sua empresa quando a tecnologia já nasce governada pelos dois referenciais internacionais.',
        lensBoth: 'Visão Integrada (ISO 56002 + ISO 42001)',
        lens56002: 'Foco ISO 56002 • Gestão da Inovação',
        lens42001: 'Foco ISO 42001 • IA Responsável',
        govSvgAria: 'Diagrama comparativo de Governança Dupla ISO 56002 e ISO 42001',
        svg56002Top: 'ISO 56002 • SISTEMA DE GESTÃO DA INOVAÇÃO',
        svg56002Title: 'De “Pessoa Iluminada” para Processo Contínuo',
        svg56002Funnel1: 'IDEIAS & DORES',
        svg56002Funnel2: 'FILTRO ROI',
        svg56002Box1: 'Funil Estruturado & Centro i-hub',
        svg56002Box2: 'Métricas, Donos & Escala Real',
        svgCoreTop: 'DUPLA BLINDAGEM',
        svgCoreMain: 'Valor + Controle',
        svgCoreSub: 'Raro no mercado',
        svg42001Top: 'ISO 42001 • GESTÃO DE INTELIGÊNCIA ARTIFICIAL',
        svg42001Title: 'De “IA Sombra” para Operação Auditável',
        svg42001Box1: 'Políticas de Dados & Limites de Risco',
        svg42001Box2: 'Supervisão Humana & Rastreabilidade',
        card56002Domain: 'Referencial de Gestão da Inovação',
        card56002Heading: 'O fim da inovação por improviso ou “evento isolado”',
        card56002BeforeLabel: '✕ Sem Governança (Cenário Comum)',
        card56002BeforeText:
          'Iniciativas dependem de uma “pessoa iluminada”, nascem sem cálculo de retorno e morrem quando a urgência do turno aperta.',
        card56002AfterLabel: '✓ O Que o Cliente Recebe na Prática',
        card56002AfterText:
          'Funil permanente de captura e priorização por ROI, comitê com papéis claros, métricas de portfólio e estruturação de centro de inovação (i-hub).',
        card42001Domain: 'Referencial de IA Responsável',
        card42001Heading: 'O fim do uso sombra de IA sem rastreabilidade',
        card42001BeforeLabel: '✕ Sem Governança (Risco Oculto)',
        card42001BeforeText:
          'Equipes colam informações industriais, financeiras ou contratuais em IAs públicas, ou operam automações sem revisão nem histórico.',
        card42001AfterLabel: '✓ O Que o Cliente Recebe na Prática',
        card42001AfterText:
          'Política corporativa clara de uso de IA, matriz de risco por aplicação, proteção de dados sensíveis, validação humana nos pontos críticos e trilha auditável.',

        fmtEyebrow: 'JORNADA DE CONTRATAÇÃO EM 5 FORMATOS',
        fmtTitle: 'Como Contratar: Do Diagnóstico de Escopo Fechado ao Software Sob Medida',
        fmtSubtitle:
          'As 9 aplicações próprias que operamos nasceram de necessidades que não existiam em prateleira. Se o seu desafio envolve dado, processo ou decisão, escolha o formato mais adequado ao momento da sua empresa.',
        fmtTrackCaption: 'JORNADA MODULAR DE CONTRATAÇÃO • ENTRE PELO ESCOPO EXATO QUE SUA OPERAÇÃO PRECISA',
        fmtWord: 'FORMATO ',
        fmtWhenKicker: ' • QUANDO ESCOLHER',
        fmtDeliverablesKicker: 'ENTREGÁVEIS OBJETIVOS',
        fmtCommitmentKicker: 'MODELO DE COMPROMISSO',
        fmtRequestBtn: 'Solicitar Este Formato →',
        fmtProofBtnPrefix: 'Prova: ',
        readTag: 'COMO LER',
        readAxes: 'Da esquerda para a direita: o dado nasce na máquina, atravessa os 4 eixos e chega como decisão com retorno. Clique em um eixo para ver a dor que ele resolve, o que é entregue e a prova em produção.',
        readAcatech: 'Cada degrau é um estágio de maturidade: quanto mais alto, mais a operação decide com dado. A curva mostra o ganho acumulado. Clique no degrau que mais se parece com a sua fábrica hoje.',
        readPain: 'Sua dor entra à esquerda e sai à direita como escopo priorizado: arquitetura recomendada, eixos acionados e impacto esperado.',
        readArch: 'Leia de baixo para cima: o dado sobe da máquina (camada 01) até a governança (camada 06) pelo mesmo barramento. Clique em uma camada para ver suas tecnologias.',
        readGov: 'Duas normas, um núcleo: a ISO 56002 organiza como a inovação gera valor; a ISO 42001 controla como a IA é usada. Clique em um dos lados para focar.',
        readFormats: 'Cinco formas de começar, da mais leve à mais profunda. Não é uma sequência obrigatória: entre pelo formato que resolve o seu momento.',
        acatechAxisLabel: 'MATURIDADE DIGITAL',
        contactMsgPrefix: 'Assunto selecionado no diagnóstico interativo: ',
        contactContextPrompt: 'Contexto da operação: '
      },

      axes: [
        {
          id: 'diagnostico',
          num: '01',
          name: 'Diagnóstico',
          shortSub: 'Clareza de Prioridade',
          color: '#1db7c4',
          cx: 255,
          painTitle: 'A empresa não sabe por onde começar e teme investir no lugar errado.',
          painDetail:
            'Sem medir o estágio real da planta e dos processos, projetos de digitalização começam pela vitrine tecnológica e travam por falta de base operacional ou retorno claro.',
          deliverables: [
            'Avaliação estruturada de maturidade digital pelo método alemão ACATECH Maturity Index aplicado em campo.',
            'Roadmap executivo priorizado por retorno financeiro (ROI) e viabilidade operacional.',
            'Sequenciamento seguro de investimento etapa por etapa, sem saltos no escuro.',
            'Planejamento estratégico conectando operação industrial e ecossistema digital.'
          ],
          proofSummary:
            'Metodologia ACATECH aplicada na prática em ambientes industriais e centros de inovação, somada a produto próprio de diagnóstico por processos.',
          apps: ['produthivia'],
          contactTopic: 'Diagnóstico ACATECH — Avaliação de maturidade digital e roadmap priorizado por retorno'
        },
        {
          id: 'conexao',
          num: '02',
          name: 'Conexão',
          shortSub: 'Físico → Digital',
          color: '#429a8e',
          cx: 445,
          painTitle: 'Máquinas e sistemas não conversam; o dado morre dentro do equipamento.',
          painDetail:
            'Apontamentos em papel ou planilhas atrasadas criam um abismo entre o que acontece no centro de usinagem ou na linha produtiva e o que chega ao ERP da diretoria.',
          deliverables: [
            'Integração direta entre máquinas, sensores industriais e sistema ERP corporativo.',
            'Coleta contínua de dados do mundo físico para o mundo lógico em tempo real.',
            'Telemetria wireless com IoT, comunicação máquina-a-máquina (M2M) e redes LPWAN.',
            'Retrofitting de equipamentos legados, aquisição em nuvem e logística industrial em tempo real.'
          ],
          proofSummary:
            'Bagagem acumulada de quase 11 anos dedicados a monitoramento wireless de máquinas, M2M e LPWAN e implantação de 100% da usinagem de tambores de freio para caminhões pesados, aplicada hoje em engenharia moderna de dados em tempo real.',
          apps: ['strikeflow3'],
          contactTopic: 'Conexão Máquina/ERP/IoT — Coleta em tempo real do chão de fábrica ao sistema de gestão'
        },
        {
          id: 'inteligencia',
          num: '03',
          name: 'Inteligência',
          shortSub: 'Dado → Decisão',
          color: '#c63368',
          cx: 635,
          painTitle: 'Há volume de dados acumulado, mas ele não vira decisão rápida nem reduz custo.',
          painDetail:
            'Ter relatórios passados não evita paradas inesperadas, refugo na linha, perda de oportunidades comerciais nem horas gastas pela equipe em tarefas manuais repetitivas.',
          deliverables: [
            'Capacidade de engenharia em visão computacional aplicável à inspeção óptica e controle de qualidade.',
            'Soluções de manutenção preditiva estruturadas sobre séries históricas coletadas dos ativos.',
            'Automação inteligente de tarefas repetitivas em fluxos industriais, comerciais e administrativos.',
            'Previsibilidade de produção, agentes conversacionais e estúdios de IA generativa de vídeo e voz.'
          ],
          proofSummary:
            'Capacidades comprovadas em código próprio operando em produção nos domínios de IA generativa multi-tenant, atendimento automatizado e modelagem quantitativa.',
          apps: ['eckkoai', 'presenthia', 'strikeflow3'],
          contactTopic: 'IA Aplicada & Automação — Transformar dados operacionais e processos em decisão'
        },
        {
          id: 'governanca',
          num: '04',
          name: 'Governança',
          shortSub: 'Escala & Rastreabilidade',
          color: '#eca94c',
          cx: 825,
          painTitle: 'A inovação ocorre por evento isolado e a IA é usada sem rastreabilidade nem adoção.',
          painDetail:
            'Iniciativas dependem de entusiasmo individual, ferramentas implantadas são abandonadas pela operação e equipes usam IA pública sem política de risco ou proteção de dados.',
          deliverables: [
            'Gestão da inovação como processo contínuo pela norma ISO 56002 (funil, métricas e comitês).',
            'Governança responsável de Inteligência Artificial pela norma ISO 42001 (risco, políticas e auditoria).',
            'Estruturação de centros de inovação corporativos (i-hub) orientados a resultado.',
            'Mentoria executiva para a alta gestão e capacitação gamificada a partir dos manuais da empresa.'
          ],
          proofSummary:
            'Expertise executiva acumulada na estruturação de centros i-hub e aplicação da norma ISO 56002, unida à arquitetura moderna da plataforma própria de educação corporativa assistida por IA.',
          apps: ['capacittai'],
          contactTopic: 'Governança ISO 56002 / ISO 42001 & Capacitação — Inovação contínua e IA auditável'
        }
      ],

      acatech: [
        {
          stage: 1,
          code: 'ESTÁGIO 01',
          name: 'Computadorização',
          horizon: 'Digitalização de Base',
          color: '#6e86a6',
          typicalState:
            'Equipamentos CNC, CLPs e computadores operam como ilhas isoladas. Parte dos controles já é digital na máquina, mas os parâmetros e apontamentos ainda dependem de intervenção manual e planilhas soltas.',
          hiddenBottleneck:
            'Digitação duplicada, erro humano de transcrição e impossibilidade de consolidar a eficiência real do turno sem fechar planilhas dias depois.',
          deliverable:
            'Mapeamento dos ativos críticos de chão de fábrica, inventário de controladores/protocolos e plano de retrofitting seletivo onde o retorno justifica.'
        },
        {
          stage: 2,
          code: 'ESTÁGIO 02',
          name: 'Conectividade',
          horizon: 'Digitalização de Base',
          color: '#429a8e',
          typicalState:
            'Sistemas de TI corporativos (ERP) e equipamentos de TO (tecnologia operacional) começam a ser interligados em rede, substituindo ilhas isoladas por canais de comunicação estruturados.',
          hiddenBottleneck:
            'Protocolos industriais heterogêneos que não conversam com o ERP, gerando integrações frágeis ou captura parcial dos eventos de parada.',
          deliverable:
            'Arquitetura de conectividade M2M, IoT e redes LPWAN interligando sensores e máquinas diretamente à nuvem e ao ERP com segurança.'
        },
        {
          stage: 3,
          code: 'ESTÁGIO 03',
          name: 'Visibilidade',
          horizon: 'Compreensão em Tempo Real',
          color: '#1db7c4',
          typicalState:
            'Sensores capturam dados do início ao fim do processo em tempo real, criando uma fotografia digital fiel (“o que está acontecendo agora”) acessível para supervisão e diretoria.',
          hiddenBottleneck:
            'Excesso de telas e alarmes brutos sem hierarquia executiva: todos veem que a linha parou, mas cada setor mantém sua própria versão dos números.',
          deliverable:
            'Fonte única de verdade operacional com painéis executivos em tempo real, indicadores confiáveis de disponibilidade, ciclo e rastreabilidade.'
        },
        {
          stage: 4,
          code: 'ESTÁGIO 04',
          name: 'Transparência',
          horizon: 'Compreensão em Tempo Real',
          color: '#c63368',
          typicalState:
            'A empresa cruza o histórico coletado com o contexto de engenharia e ERP para responder “por que está acontecendo”, identificando causas-raiz de paradas, perdas e desvios de qualidade.',
          hiddenBottleneck:
            'Análises de causa-raiz demoradas e dependentes de poucos especialistas sobrecarregados, atrasando a correção de gargalos recorrentes.',
          deliverable:
            'Gêmeo digital de processos (como aplicado no ProduthivIA), correlação entre variáveis de máquina, turno, matéria-prima e impacto direto na margem.'
        },
        {
          stage: 5,
          code: 'ESTÁGIO 05',
          name: 'Capacidade Preditiva',
          horizon: 'Antecipação & Autonomia',
          color: '#db8a50',
          typicalState:
            'Com base limpa e transparente, modelos quantitativos e algoritmos de IA projetam cenários futuros (“o que vai acontecer”), antecipando tendências de falha, demanda ou desvio dimensional.',
          hiddenBottleneck:
            'Tentar implantar IA preditiva sem ter passado pelos degraus 2 a 4 gera alarmes falsos, descrédito na equipe técnica e desperdício de orçamento.',
          deliverable:
            'Engenharia de modelos preditivos, detecção de anomalias sobre telemetria histórica e simulação de cenários operacionais com validação de risco.'
        },
        {
          stage: 6,
          code: 'ESTÁGIO 06',
          name: 'Adaptabilidade Autônoma',
          horizon: 'Antecipação & Autonomia',
          color: '#eca94c',
          typicalState:
            'Sistemas integrados ajustam parâmetros operacionais, rotas de atendimento ou filas produtivas de forma assistida ou autônoma dentro de limites estritos definidos pela governança.',
          hiddenBottleneck:
            'Automações sem governança (caixa-preta) expõem a empresa a decisões não auditáveis, riscos operacionais e perda de controle humano.',
          deliverable:
            'Agentes autônomos supervisionados sob governança ISO 42001: limites operacionais travados, trilha de auditoria completa e escalonamento humano imediato.'
        }
      ],

      layers: [
        {
          num: '06',
          id: 'layer-06',
          title: 'Governança & Normas Internacionais',
          zone: 'Topo Executivo',
          subtitle: 'Direção estratégica, ROI priorizado e conformidade auditável',
          color: '#eca94c',
          nodes: [
            'ACATECH Maturity Index',
            'ISO 56002 (Gestão da Inovação)',
            'ISO 42001 (IA Responsável)',
            'ISO 9001 & ISO 14000'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Garante que nenhum sensor instalado na Camada 01 ou algoritmo na Camada 03 exista por modismo — cada entrega nasce amarrada a retorno mensurável, política de risco e processo contínuo.',
          apps: ['produthivia', 'capacittai']
        },
        {
          num: '05',
          id: 'layer-05',
          title: 'Identidade, Segurança & Rastreabilidade',
          zone: 'Blindagem & Infra',
          subtitle: 'Isolamento corporativo, controle de acesso por papel e auditoria',
          color: '#db8a50',
          nodes: [
            'Autenticação Federada Keycloak',
            'CSP Restritiva (Content Security Policy)',
            'Cofre de Credenciais',
            'Trilha de Auditoria',
            'VPS Próprios & Containers Isolados'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Dados industriais e corporativos exigem arquitetura robusta desde o servidor até o login por perfil. Toda a infraestrutura em containers e políticas de segurança é operada internamente.',
          apps: ['edumaxia', 'strikeflow3']
        },
        {
          num: '04',
          id: 'layer-04',
          title: 'Engenharia de Aplicações Web',
          zone: 'Software Próprio',
          subtitle: 'Interfaces de alta densidade construídas e operadas pela própria casa',
          color: '#c63368',
          nodes: [
            'React & Vite',
            'Next.js SSR',
            'Arquitetura Multi-Tenant & Shadow DOM',
            'Canvas & SVG Vetorial de Alta Densidade',
            'Processamento de Áudio Web'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Em vez de entregar um relatório PDF e indicar uma fábrica de software externa, a SmartInovaT projeta, codifica e publica aplicações completas prontas para uso real.',
          apps: ['eckkoai', 'parthituria', 'solochordys']
        },
        {
          num: '03',
          id: 'layer-03',
          title: 'Motor de Inteligência Artificial',
          zone: 'Núcleo Cognitivo',
          subtitle: 'Modelos aplicados sobre dados reais para prever, inspecionar e automatizar',
          color: '#1db7c4',
          nodes: [
            'Visão Computacional (Capacidade Aplicável)',
            'Manutenção Preditiva sobre Histórico',
            'Agentes Conversacionais',
            'IA Generativa de Vídeo e Voz',
            'Modelos Quantitativos & Previsibilidade'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Quem modela a IA entende a física do equipamento que gerou o sinal, filtrando ruído operacional antes que ele distorça previsões, triagens ou recomendações.',
          apps: ['presenthia', 'eckkoai', 'strikeflow3']
        },
        {
          num: '02',
          id: 'layer-02',
          title: 'Conectividade & Integração Corporativa',
          zone: 'Ponte Físico-Lógica',
          subtitle: 'Eliminação do abismo entre a linha de produção e o ERP da gestão',
          color: '#429a8e',
          nodes: [
            'Ponte Máquina–Sensor–ERP',
            'Seleção e Implantação de ERP',
            'Aquisição e Registro em Nuvem',
            'Logística Industrial em Tempo Real'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Une a expertise executiva acumulada na seleção e implantação de ERP em plantas industriais de 850 t/mês e 1.500 t/mês à engenharia moderna de telemetria em nuvem, eliminando retrabalho manual.',
          apps: ['produthivia', 'strikeflow3']
        },
        {
          num: '01',
          id: 'layer-01',
          title: 'Chão de Fábrica & Ativos Físicos',
          zone: 'Base Industrial Real',
          subtitle: 'Onde o dado nasce: usinagem, sensores, redes industriais e automação',
          color: '#6e86a6',
          nodes: [
            'Sensores em Tempo Real',
            'Comunicação M2M (Assistência Remota)',
            'Redes LPWAN Wireless',
            'Sistemas de Visão',
            'Retrofitting CNC / Máquina-Ferramenta',
            'Automação Industrial'
          ],
          bridgeText:
            '<strong>Conexão sem terceirização:</strong> Empresa de nova geração construída sobre +30 anos de expertise industrial real da sua liderança técnica — de automação, montagem de linha alemã e retrofitting CNC a 100% da usinagem de tambores de freio para caminhões pesados.',
          apps: []
        }
      ],

      painCategories: [
        { id: 'all', label: 'Todas' },
        { id: 'shopfloor', label: 'Chão de Fábrica & Operação' },
        { id: 'commercial', label: 'Gestão, Vendas & Comunicação' },
        { id: 'strategy', label: 'Estratégia, Equipe & Risco de IA' }
      ],

      pains: [
        {
          id: 'pain-01',
          code: 'DOR #01',
          category: 'shopfloor',
          quote: '“Minha máquina para e eu só descubro depois.”',
          rootSymptom:
            'Manutenção puramente corretiva e cegueira de turno: o gestor só descobre a indisponibilidade quando o lote atrasa.',
          solutionArch:
            'Monitoramento wireless em tempo real com sensores industriais, IoT e M2M, evoluindo para capacidade de manutenção preditiva sobre o histórico coletado dos ativos.',
          axesLabel: 'Eixos 2 e 3 • Conexão + Inteligência',
          axesCodes: ['02', '03'],
          impactNext:
            'Visibilidade imediata de paradas e microparadas, histórico estruturado de falhas e evolução segura para alertas antecipados via projeto-piloto.',
          complianceNote:
            'Capacidade de engenharia: telemetria M2M/IoT (~11 anos de expertise acumulada) combinada a modelagem preditiva aplicável à sua linha.',
          accent: '#1db7c4',
          appSlug: 'strikeflow3',
          contactTopic:
            'Conexão Máquina/ERP/IoT — Monitoramento em tempo real e manutenção preditiva ("Minha máquina para e só descubro depois")'
        },
        {
          id: 'pain-02',
          code: 'DOR #02',
          category: 'shopfloor',
          quote: '“Meu refugo é alto e a inspeção é visual, feita por pessoa cansada.”',
          rootSymptom:
            'Fadiga humana no fim do turno gera variação de critério na inspeção, deixando passar peças defeituosas ou descartando peças boas.',
          solutionArch:
            'Engenharia de visão computacional aplicável à inspeção óptica e controle padronizado de qualidade diretamente na linha produtiva.',
          axesLabel: 'Eixo 3 • Inteligência',
          axesCodes: ['03'],
          impactNext:
            'Padronização objetiva dos critérios de aceite 24/7, registro rastreável de não-conformidades e redução consistente de perdas por lote. Próximo passo: avaliação óptica de viabilidade na linha.',
          complianceNote:
            'Oferta estruturada como capacidade técnica de engenharia em sistemas de visão e IA aplicada sob medida ao processo.',
          accent: '#c63368',
          appSlug: null,
          contactTopic: 'IA Aplicada/Automação — Visão computacional para inspeção de qualidade e redução de refugo'
        },
        {
          id: 'pain-03',
          code: 'DOR #03',
          category: 'shopfloor',
          quote: '“Meu ERP não fala com o chão de fábrica.”',
          rootSymptom:
            'Apontamentos em prancheta chegam horas ou dias atrasados ao sistema corporativo, distorcendo estoque em processo, custo real e OEE.',
          solutionArch:
            'Integração direta de sistemas: máquinas, controladores e sensores conversando automaticamente com o ERP, com aquisição e registro estruturado em nuvem.',
          axesLabel: 'Eixo 2 • Conexão',
          axesCodes: ['02'],
          impactNext:
            'Eliminação de digitação manual intermediária, conciliação fiel entre produção física e saldo contábil e resposta rápida a desvios de ordem.',
          complianceNote: null,
          accent: '#429a8e',
          appSlug: null,
          contactTopic: 'Conexão Máquina/ERP/IoT — Integração direta entre chão de fábrica, sensores e ERP'
        },
        {
          id: 'pain-04',
          code: 'DOR #04',
          category: 'shopfloor',
          quote: '“Tenho dados espalhados e nenhum indicador confiável.”',
          rootSymptom:
            'Cada área leva uma planilha diferente para a reunião de resultados; gasta-se mais tempo discutindo quem tem o número certo do que decidindo.',
          solutionArch:
            'Aquisição e registro estruturado em nuvem, consolidação de fontes operacionais, painéis executivos unificados e modelos de previsibilidade de produção.',
          axesLabel: 'Eixos 2 e 3 • Conexão + Inteligência',
          axesCodes: ['02', '03'],
          impactNext:
            'Fonte única da verdade para diretoria e operação, indicadores auditáveis em tempo real e base pronta para previsibilidade de entrega.',
          complianceNote: null,
          accent: '#1db7c4',
          appSlug: 'strikeflow3',
          contactTopic:
            'Conexão Máquina/ERP/IoT — Estruturação de dados dispersos em indicadores confiáveis e previsibilidade'
        },
        {
          id: 'pain-05',
          code: 'DOR #05',
          category: 'commercial',
          quote: '“Minha equipe perde horas em tarefa repetitiva.”',
          rootSymptom:
            'Profissionais qualificados gastam metade da semana copiando dados entre sistemas, triando solicitações padronizadas e montando relatórios.',
          solutionArch:
            'Automação de tarefas industriais, técnicas e administrativas com agentes de IA desenhados sobre o fluxo real do processo.',
          axesLabel: 'Eixo 3 • Inteligência',
          axesCodes: ['03'],
          impactNext:
            'Liberação imediata de horas produtivas da equipe, queda drástica de erros operacionais e padronização do tempo de resposta interno.',
          complianceNote: null,
          accent: '#c63368',
          appSlug: 'produthivia',
          contactTopic: 'IA Aplicada/Automação — Automação de tarefas repetitivas industriais e administrativas'
        },
        {
          id: 'pain-06',
          code: 'DOR #06',
          category: 'strategy',
          quote: '“Não sei se vale investir em Indústria 4.0 nem por onde começar.”',
          rootSymptom:
            'Receio legítimo de imobilizar capital em sensores, softwares ou consultorias genéricas que entregam slides e não pagam o investimento.',
          solutionArch:
            'Diagnóstico de maturidade digital pelo método ACATECH Maturity Index com roadmap priorizado por retorno financeiro e desenho de projeto-piloto de baixo risco.',
          axesLabel: 'Eixo 1 • Diagnóstico',
          axesCodes: ['01'],
          impactNext:
            'Clareza executiva em escopo fechado: você recebe onde atuar primeiro, quanto custa, qual ganho esperar e valida tudo em piloto controlado antes de escalar.',
          complianceNote: null,
          accent: '#1db7c4',
          appSlug: 'produthivia',
          contactTopic: 'Diagnóstico ACATECH — Saber por onde começar na Indústria 4.0 com roadmap por retorno'
        },
        {
          id: 'pain-07',
          code: 'DOR #07',
          category: 'commercial',
          quote: '“Perco venda porque demoro a responder no WhatsApp.”',
          rootSymptom:
            'Leads comerciais esfriam fora do horário comercial ou em picos de demanda enquanto o time humano não consegue triar e agendar a tempo.',
          solutionArch:
            'Atendente com IA que responde com as informações oficiais da empresa, identifica intenção de compra, agenda horários e aciona a equipe humana no momento exato.',
          axesLabel: 'Eixo 3 • Inteligência',
          axesCodes: ['03'],
          impactNext:
            'Atendimento imediato 24/7, funil organizado e vendedores focados apenas em negociações qualificadas.',
          complianceNote: null,
          accent: '#429a8e',
          appSlug: 'presenthia',
          contactTopic: 'IA Aplicada/Automação — Atendimento e qualificação comercial com IA no WhatsApp'
        },
        {
          id: 'pain-08',
          code: 'DOR #08',
          category: 'strategy',
          quote: '“Implantei a tecnologia e a equipe não usa.”',
          rootSymptom:
            'Baixa adesão pós-implantação, rotatividade operacional e manuais técnicos em PDF que ninguém lê no dia a dia.',
          solutionArch:
            'Capacitação corporativa com trilhas gamificadas, tutor virtual por IA e certificação construídas diretamente a partir da documentação e dos POPs da própria empresa.',
          axesLabel: 'Eixo 4 • Governança & Capacitação',
          axesCodes: ['04'],
          impactNext:
            'Adoção real das ferramentas implantadas, nivelamento rápido de novos colaboradores e painel gerencial de domínio técnico por setor.',
          complianceNote: null,
          accent: '#eca94c',
          appSlug: 'capacittai',
          contactTopic: 'Governança ISO 56002/42001 — Capacitação corporativa com IA para adoção tecnológica da equipe'
        },
        {
          id: 'pain-09',
          code: 'DOR #09',
          category: 'commercial',
          quote: '“Preciso comunicar muito e não tenho estúdio nem tempo.”',
          rootSymptom:
            'Comunicação técnica, treinamentos internos e presença comercial travam porque gravar e editar vídeos exige agenda de executivos e produtora.',
          solutionArch:
            'Estúdio de vídeo com avatar digital e voz a partir de roteiro estruturado, com mídia de apoio, aprovação etapa por etapa e formatos prontos por canal.',
          axesLabel: 'Eixo 3 • Inteligência',
          axesCodes: ['03'],
          impactNext:
            'Escala de comunicação institucional, comercial e técnica em fração do tempo de gravação tradicional, mantendo controle total de aprovação.',
          complianceNote: null,
          accent: '#c63368',
          appSlug: 'eckkoai',
          contactTopic: 'IA Aplicada/Automação — Produção escalável de vídeos corporativos e técnicos com avatar digital'
        },
        {
          id: 'pain-10',
          code: 'DOR #10',
          category: 'strategy',
          quote: '“Minha inovação depende de uma pessoa iluminada.”',
          rootSymptom:
            'Projetos nascem no improviso, perdem fôlego na rotina operacional e param completamente quando um gestor-chave muda de função.',
          solutionArch:
            'Governança da inovação alinhada à norma ISO 56002 e estruturação de hub de inovação (i-hub) para transformar ideias em processo permanente com funil e métricas.',
          axesLabel: 'Eixo 4 • Governança',
          axesCodes: ['04'],
          impactNext:
            'Inovação institucionalizada: captura contínua de melhorias, critérios objetivos de aprovação financeira e portfólio acompanhado pela diretoria.',
          complianceNote: null,
          accent: '#db8a50',
          appSlug: 'produthivia',
          contactTopic: 'Governança ISO 56002/42001 — Estruturação de processo contínuo de inovação e i-hub (ISO 56002)'
        },
        {
          id: 'pain-11',
          code: 'DOR #11',
          category: 'strategy',
          quote: '“Estou usando IA sem saber o risco que estou correndo.”',
          rootSymptom:
            'Uso sombra (Shadow AI): colaboradores inserem contratos, custos e dados industriais sensíveis em ferramentas abertas sem política nem auditoria.',
          solutionArch:
            'Governança de Inteligência Artificial referenciada pela norma ISO 42001, estabelecendo políticas claras, classificação de risco, papéis de responsabilidade e rastreabilidade.',
          axesLabel: 'Eixo 4 • Governança',
          axesCodes: ['04'],
          impactNext:
            'Segurança jurídica e informacional para escalar IA com tranquilidade, protegendo segredos de negócio e garantindo trilha auditável de decisões.',
          complianceNote: null,
          accent: '#eca94c',
          appSlug: null,
          contactTopic: 'Governança ISO 56002/42001 — Diagnóstico e governança de risco em IA responsável (ISO 42001)'
        }
      ],

      formats: [
        {
          num: '01',
          id: 'fmt-01',
          name: 'Diagnóstico Avulso',
          shortTag: 'Porta de entrada • Escopo fechado',
          color: '#1db7c4',
          cx: 115,
          whenToChoose:
            'Ideal para indústrias e médias/grandes empresas que querem clareza antes de comprometer orçamento de CAPEX ou TI — sabendo exatamente onde há retorno imediato.',
          whatClientGets: [
            'Levantamento em campo da maturidade digital pelo referencial ACATECH Maturity Index.',
            'Mapa dos gargalos entre chão de fábrica, sistemas de gestão (ERP) e fluxos de decisão.',
            'Roadmap executivo priorizado por retorno financeiro e complexidade de execução.'
          ],
          commitmentProfile:
            'Entrega fechada, prazo e escopo definidos em contrato único, sem obrigação ou amarra de continuidade.',
          appSlug: 'produthivia',
          contactTopic: 'Diagnóstico ACATECH — Solicitar proposta de Diagnóstico Avulso (escopo fechado)'
        },
        {
          num: '02',
          id: 'fmt-02',
          name: 'Projeto-Piloto',
          shortTag: 'Alto impacto • Baixo risco',
          color: '#429a8e',
          cx: 308,
          whenToChoose:
            'O passo natural após o diagnóstico: validar a tecnologia em uma máquina crítica, célula produtiva ou processo comercial específico antes de expandir para toda a planta.',
          whatClientGets: [
            'Implantação focada (conectividade, automação ou agente de IA) em perímetro controlado.',
            'Medição objetiva do indicador antes vs. depois (tempo, disponibilidade, resposta ou custo).',
            'Caso de negócio comprovado internamente para liberar a escala com segurança.'
          ],
          commitmentProfile:
            'Investimento enxuto e risco circunscrito, desenhado para provar valor real em semanas.',
          appSlug: 'presenthia',
          contactTopic: 'Conexão Máquina/ERP/IoT — Estruturar Projeto-Piloto de alto impacto e baixo risco'
        },
        {
          num: '03',
          id: 'fmt-03',
          name: 'Desenvolvimento Sob Medida',
          shortTag: 'Software próprio • Fim a fim',
          color: '#c63368',
          cx: 500,
          whenToChoose:
            'Quando nenhum software de prateleira resolve a particularidade da sua operação e você precisa de uma plataforma exclusiva, segura e pronta para produção.',
          whatClientGets: [
            'Arquitetura completa, interface web moderna (React / Next.js), banco de dados e motor de IA.',
            'Segurança corporativa nativa (autenticação federada, CSP restritiva, cofre e auditoria).',
            'Implantação em servidores dedicados/containers — a mesma engenharia demonstrada nas 9 aplicações próprias integradas nesta vitrine.'
          ],
          commitmentProfile:
            'Projeto estruturado por entregas verificáveis em ambiente real, sem terceirizar código para fábricas externas.',
          appSlug: 'eckkoai',
          contactTopic: 'Desenvolvimento Sob Medida — Construção de aplicação/plataforma exclusiva para minha operação'
        },
        {
          num: '04',
          id: 'fmt-04',
          name: 'Mentoria Executiva',
          shortTag: 'Apoio direto à alta gestão',
          color: '#db8a50',
          cx: 692,
          whenToChoose:
            'Para CEOs, diretores industriais e conselhos que estão avaliando compras de máquinas, troca de ERP, criação de hub de inovação (i-hub) ou governança de IA.',
          whatClientGets: [
            'Aconselhamento técnico isento unindo +30 anos de bagagem executiva e de chão de fábrica à arquitetura moderna de software e IA.',
            'Revisão crítica de propostas técnicas de fornecedores, integradores e arquiteturas.',
            'Estruturação prática de governança ISO 56002 (inovação) e ISO 42001 (IA responsável).'
          ],
          commitmentProfile:
            'Cadência executiva mensal ou por ciclo estratégico de decisão e gestão da mudança.',
          appSlug: null,
          contactTopic: 'Governança ISO 56002/42001 — Mentoria Executiva para alta gestão em tecnologia, ERP e IA'
        },
        {
          num: '05',
          id: 'fmt-05',
          name: 'Capacitação Corporativa',
          shortTag: 'Adoção real pela equipe',
          color: '#eca94c',
          cx: 885,
          whenToChoose:
            'Quando a empresa implantou novos sistemas, normas da qualidade ou ferramentas de IA e precisa garantir que líderes e operadores dominem o novo processo.',
          whatClientGets: [
            'Workshops práticos para liderança industrial, engenharia e equipes administrativas.',
            'Transformação de manuais técnicos, POPs e normas internas em trilhas interativas.',
            'Acompanhamento de evolução, certificação interna e tutoria assistida por IA.'
          ],
          commitmentProfile:
            'Programas por turma/unidade ou implantação contínua apoiada na plataforma CapacittAI.',
          appSlug: 'capacittai',
          contactTopic: 'Governança ISO 56002/42001 — Capacitação Corporativa e trilhas técnicas a partir da documentação'
        }
      ]
    },

    /* ========================================================================
       ENGLISH (EN) — Full Executive Translation
       ======================================================================== */
    en: {
      ui: {
        interactiveHint: '⚡ Interactive • Click nodes or buttons',
        partAEyebrow: 'PART A • 4-AXIS VALUE ARCHITECTURE',
        partATitle: 'How Raw Shop-Floor Data Becomes Governed Executive Decision',
        partASubtitle:
          'Without reliable shop-floor data, broad Artificial Intelligence fails to deliver real impact. Select each axis to inspect the operational pain solved, concrete deliverables, and live production software proving execution.',
        axesTabAria: 'The 4 Solution Axes',
        axesSvgAria: 'Interactive flow of the 4 SmartInovaT Solution Axes linking physical machinery to governed decisions',
        physicalEndTag: 'PHYSICAL END',
        physicalEndTitle: 'Machine & Line',
        physicalEndSub: 'CNC • Sensors • Floor',
        logicalEndTag: 'LOGICAL END',
        logicalEndTitle: 'Decision & ROI',
        logicalEndSub: 'Auditable AI • Exec',
        axesFlowCaption: 'CONTINUOUS VALUE STREAM • CLICK ANY AXIS TO INSPECT DELIVERABLES & LIVE PROOF',
        axisLabelPrefix: 'AXIS ',
        painSolvedKicker: ' • OPERATIONAL PAIN SOLVED',
        talkAxisBtn: 'Discuss This Axis →',
        concreteDeliverablesKicker: 'CONCRETE CLIENT DELIVERABLES',
        realProofKicker: 'VERIFIED PROOF IN PORTFOLIO & FIELD',
        seeProofBtn: 'Live Proof: ',

        partBEyebrow: 'PART B • ACATECH DIGITAL MATURITY STAIRCASE',
        partBTitle: 'The 6 Industry 4.0 Stages: Which Step Is Your Operation on Today?',
        partBSubtitle:
          'Select any step on the vector staircase below to examine the typical plant profile, the hidden margin-draining bottleneck, and the ROI-prioritized SmartInovaT deliverable.',
        execTranslationTag: 'EXECUTIVE TRANSLATION',
        acatechTranslationHtml:
          '<strong>What is the ACATECH Maturity Index?</strong> It is the engineering framework developed by the German National Academy of Science and Engineering to assess industrial maturity across 6 objective stages. <strong>What you receive:</strong> an actionable roadmap showing where to invest first for fast payback—never buying complex AI before fixing the data foundation.',
        acatechSvgAria: 'ACATECH Industry 4.0 Maturity Index Staircase across 6 stages',
        acatechBand1: '1–2 • CORE DIGITALIZATION',
        acatechBand2: '3–4 • VISIBILITY & ROOT CAUSE',
        acatechBand3: '5–6 • PREDICTION & AUTONOMY',
        acatechFooterCaption: 'INDUSTRIAL MATURITY PROGRESSION • EACH STEP UNLOCKS PAYBACK FOR THE NEXT',
        typicalPlantKicker: ' • TYPICAL PLANT PROFILE',
        hiddenBottleneckKicker: 'HIDDEN BOTTLENECK AT THIS STAGE',
        hiddenBottleneckHeading: 'Where capital investments usually stall',
        practicalDeliverableKicker: 'PRACTICAL SMARTINOVAT DELIVERABLE',
        practicalDeliverableHeading: 'Next step prioritized by financial ROI',
        assessStageBtn: 'Assess My Current Stage →',
        assessStageTopicPrefix: 'ACATECH Assessment — Evaluate my operation (current reference: ',

        archEyebrow: 'END-TO-END BLUEPRINT • 6 INTEGRATED LAYERS',
        archTitle: 'From Shop Floor to Executive Boardroom Under One Technical Roof',
        archSubtitle:
          'Traditional consultancies deliver slide decks and outsource code; software shops master screens but have never retrofitted a CNC machining center. Explore how all 6 layers connect with zero broken links.',
        archHint: '6 Layers • Physical + Logical',
        archSvgAria: '6-layer blueprint linking Shop Floor assets to Executive Governance',
        archTopCaption: 'INTEGRATED OPTICAL DATA BUS • ZERO GAP BETWEEN INDUSTRIAL HARDWARE & SOFTWARE',
        archBusLeft: 'REAL-TIME TELEMETRY & DATA ▲',
        archBusRight: 'GOVERNANCE, AUDIT & ROI ▲',
        archBottomCaption: 'HOVER OR CLICK ANY LAYER TO INSPECT VERIFIED ENGINEERING COMPONENTS',
        archLayerWord: 'LAYER ',
        archSelectedKicker: ' SELECTED • TECHNOLOGIES & STANDARDS',
        evidenceBtnPrefix: 'Evidence: ',

        painEyebrow: 'NEEDS-FIRST CATALOG • 11 REAL OPERATIONAL PAINS',
        painTitle: 'Start From Your Operational Pain — Not From Technology Buzzwords',
        painSubtitle:
          'Select the scenario closest to your plant or enterprise today to immediately visualize the technical architecture, triggered solution axes, and recommended next step.',
        painFilterAria: 'Filter operational pains by business area',
        painListAria: 'List of operational pains',
        axisWord: 'Axis ',
        routeHeaderPrefix: 'SMARTINOVAT SOLUTION ROUTE • ',
        routeSvgAria: 'Visual SmartInovaT solution route for the selected operational pain',
        routeSt1: 'IDENTIFIED PAIN',
        routeSt2: 'ARCHITECTURE',
        routeSt2Sub: 'Applied Engineering',
        routeSt3: 'AXIS(ES)',
        routeSt4: 'IMPACT & NEXT',
        routeSt4Sub: 'Prioritized Scope',
        step1Label: '01 • ROOT OPERATIONAL SYMPTOM',
        step2Label: '02 • TECHNICAL SOLUTION ARCHITECTURE',
        step3Label: '03 • TRIGGERED SOLUTION AXIS(ES)',
        step3Suffix: ' — engineered to connect data capture, intelligence, and team adoption seamlessly.',
        step4Label: '04 • EXPECTED IMPACT & NEXT STEP',
        solvePainBtn: 'Solve This Pain (Prefill Contact) →',
        openRelatedAppBtn: 'Open Related App: ',

        govEyebrow: 'EXECUTIVE GOVERNANCE IN BUSINESS LANGUAGE',
        govTitle: 'Continuous Innovation System (ISO 56002) + Auditable AI (ISO 42001)',
        govSubtitle:
          'Technical acronyms alone do not protect margins. See what practically changes inside your organization when technology is engineered from day one under both international standards.',
        lensBoth: 'Integrated View (ISO 56002 + ISO 42001)',
        lens56002: 'Focus ISO 56002 • Innovation Management',
        lens42001: 'Focus ISO 42001 • Responsible AI',
        govSvgAria: 'Side-by-side Dual Governance diagram for ISO 56002 and ISO 42001',
        svg56002Top: 'ISO 56002 • INNOVATION MANAGEMENT SYSTEM',
        svg56002Title: 'From “Lone Genius” to Repeatable Process',
        svg56002Funnel1: 'IDEAS & PAINS',
        svg56002Funnel2: 'ROI FILTER',
        svg56002Box1: 'Structured Funnel & i-hub Center',
        svg56002Box2: 'Metrics, Ownership & Real Scale',
        svgCoreTop: 'DUAL SHIELD',
        svgCoreMain: 'Value + Control',
        svgCoreSub: 'Rare in AI market',
        svg42001Top: 'ISO 42001 • AI MANAGEMENT SYSTEM',
        svg42001Title: 'From “Shadow AI” to Auditable Operations',
        svg42001Box1: 'Data Policies & Risk Thresholds',
        svg42001Box2: 'Human Oversight & Audit Trail',
        card56002Domain: 'Innovation Governance Framework',
        card56002Heading: 'Ending ad-hoc innovation and isolated one-off events',
        card56002BeforeLabel: '✕ Without Governance (Common Trap)',
        card56002BeforeText:
          'Initiatives rely on a single “inspired champion,” start without ROI criteria, and stall as soon as daily shift pressure rises.',
        card56002AfterLabel: '✓ What You Actually Receive',
        card56002AfterText:
          'A permanent capture-and-ROI prioritization funnel, clear governance roles, portfolio KPIs, and structured corporate innovation hub (i-hub) operations.',
        card42001Domain: 'Responsible AI Framework',
        card42001Heading: 'Ending uncontrolled Shadow AI without traceability',
        card42001BeforeLabel: '✕ Without Governance (Hidden Exposure)',
        card42001BeforeText:
          'Teams paste confidential industrial, financial, or contractual data into public AI tools—or run black-box automations without oversight.',
        card42001AfterLabel: '✓ What You Actually Receive',
        card42001AfterText:
          'Clear corporate AI policies, per-use-case risk classification, IP/sensitive data protection, human-in-the-loop checkpoints, and full audit trails.',

        fmtEyebrow: '5-FORMAT ENGAGEMENT PROGRESSION',
        fmtTitle: 'How to Engage: From Fixed-Scope Diagnostic to Custom Production Software',
        fmtSubtitle:
          'All 9 proprietary applications we operate were born from needs no off-the-shelf tool could solve. If your challenge involves data, process, or decision-making, choose the engagement format built for your stage.',
        fmtTrackCaption: 'MODULAR ENGAGEMENT TRACK • START WITH THE EXACT SCOPE YOUR OPERATION NEEDS',
        fmtWord: 'FORMAT ',
        fmtWhenKicker: ' • WHEN TO CHOOSE',
        fmtDeliverablesKicker: 'CONCRETE DELIVERABLES',
        fmtCommitmentKicker: 'COMMITMENT & SCOPE MODEL',
        fmtRequestBtn: 'Request This Format →',
        fmtProofBtnPrefix: 'Proof: ',
        readTag: 'HOW TO READ',
        readAxes: 'Left to right: data is born at the machine, crosses the 4 axes and arrives as a decision with payback. Click an axis to see the pain it solves, what is delivered and the live proof.',
        readAcatech: 'Each step is a maturity stage: the higher it is, the more the operation decides on data. The curve shows cumulative gain. Click the step that best matches your plant today.',
        readPain: 'Your pain enters on the left and leaves on the right as a prioritized scope: recommended architecture, axes involved and expected impact.',
        readArch: 'Read bottom-up: data rises from the machine (layer 01) to governance (layer 06) through the same bus. Click a layer to see its technologies.',
        readGov: 'Two standards, one core: ISO 56002 organizes how innovation creates value; ISO 42001 controls how AI is used. Click either side to focus.',
        readFormats: 'Five ways to start, from lightest to deepest. It is not a mandatory sequence: enter through the format that fits your moment.',
        acatechAxisLabel: 'DIGITAL MATURITY',
        contactMsgPrefix: 'Topic selected in interactive diagnostic: ',
        contactContextPrompt: 'Operational context: '
      },

      axes: [
        {
          id: 'diagnostico',
          num: '01',
          name: 'Diagnostic',
          shortSub: 'Priority Clarity',
          color: '#1db7c4',
          cx: 255,
          painTitle: 'The company does not know where to start and fears investing in the wrong place.',
          painDetail:
            'Without measuring true plant and process maturity, digitalization projects start with flashy tools and stall due to missing operational foundations or unclear payback.',
          deliverables: [
            'Structured field assessment of digital maturity using the German ACATECH Maturity Index.',
            'Executive roadmap prioritized strictly by financial return (ROI) and operational feasibility.',
            'Safe, stage-by-stage investment sequencing with zero blind leaps.',
            'Strategic planning linking industrial operations and your digital ecosystem.'
          ],
          proofSummary:
            'ACATECH methodology applied directly in industrial plants and innovation hubs, backed by our proprietary process-twin diagnostic platform.',
          apps: ['produthivia'],
          contactTopic: 'ACATECH Assessment — Digital maturity diagnostic and ROI-prioritized roadmap'
        },
        {
          id: 'conexao',
          num: '02',
          name: 'Connection',
          shortSub: 'Physical → Digital',
          color: '#429a8e',
          cx: 445,
          painTitle: 'Machines and enterprise systems do not talk; data dies inside the equipment.',
          painDetail:
            'Paper logs and delayed spreadsheets create a blind gap between what happens at the CNC center or production line and what reaches executive ERP dashboards.',
          deliverables: [
            'Direct integration across industrial machines, sensors, and corporate ERP systems.',
            'Continuous real-time data capture from the physical world to the logical world.',
            'Wireless industrial telemetry via IoT, M2M remote assistance, and LPWAN networks.',
            'Legacy equipment retrofitting, cloud data acquisition, and real-time industrial logistics.'
          ],
          proofSummary:
            'Nearly 11 years of accumulated leadership focus on wireless machine telemetry, M2M, and LPWAN plus 100% heavy-truck brake-drum machining deployment, applied to modern real-time data engineering.',
          apps: ['strikeflow3'],
          contactTopic: 'Machine/ERP/IoT Connection — Real-time shop-floor to ERP integration'
        },
        {
          id: 'inteligencia',
          num: '03',
          name: 'Intelligence',
          shortSub: 'Data → Decision',
          color: '#c63368',
          cx: 635,
          painTitle: 'Data exists in volume, yet it neither drives fast decisions nor cuts cost.',
          painDetail:
            'Backward-looking reports do not prevent unplanned downtime, scrap on the line, lost sales leads, or hundreds of hours wasted on repetitive manual routines.',
          deliverables: [
            'Computer vision engineering capability applicable to optical inspection and line quality control.',
            'Predictive maintenance solutions engineered over historical asset telemetry.',
            'Intelligent workflow automation across industrial, commercial, and administrative processes.',
            'Production predictability, conversational AI agents, and generative video/voice studios.'
          ],
          proofSummary:
            'Proven in-house software engineering operating live across multi-tenant generative AI, automated commercial triage, and quantitative risk engines.',
          apps: ['eckkoai', 'presenthia', 'strikeflow3'],
          contactTopic: 'Applied AI & Automation — Turning operational data and workflows into decisions'
        },
        {
          id: 'governanca',
          num: '04',
          name: 'Governance',
          shortSub: 'Scale & Auditability',
          color: '#eca94c',
          cx: 825,
          painTitle: 'Innovation happens in isolated bursts and AI is used without traceability or adoption.',
          painDetail:
            'Projects rely on individual heroics, newly deployed systems go unused by operators, and staff use public AI tools with zero risk policy or data governance.',
          deliverables: [
            'Continuous innovation management structured under ISO 56002 (funnel, KPIs, committees).',
            'Responsible AI governance aligned with ISO 42001 (risk controls, policies, auditability).',
            'Design and deployment of results-driven corporate innovation hubs (i-hub).',
            'C-suite executive advisory and gamified AI corporate training built from company SOPs.'
          ],
          proofSummary:
            'Accumulated executive track record establishing i-hub centers and ISO 56002 frameworks, paired with our proprietary AI-powered corporate learning platform.',
          apps: ['capacittai'],
          contactTopic: 'ISO 56002 / ISO 42001 Governance & Training — Repeatable innovation and auditable AI'
        }
      ],

      acatech: [
        {
          stage: 1,
          code: 'STAGE 01',
          name: 'Computerization',
          horizon: 'Core Digitalization',
          color: '#6e86a6',
          typicalState:
            'CNC machines, PLCs, and workstations run as isolated islands. Local machine control is digital, but parameters and production logs still depend on manual entry and scattered spreadsheets.',
          hiddenBottleneck:
            'Duplicate typing, transcription errors, and inability to know true shift efficiency until spreadsheets are reconciled days later.',
          deliverable:
            'Critical shop-floor asset mapping, controller/protocol inventory, and selective retrofitting plan focused strictly where payback is clear.'
        },
        {
          stage: 2,
          code: 'STAGE 02',
          name: 'Connectivity',
          horizon: 'Core Digitalization',
          color: '#429a8e',
          typicalState:
            'Corporate IT (ERP) and plant-floor OT equipment begin linking over structured networks, replacing isolated islands with reliable communication channels.',
          hiddenBottleneck:
            'Heterogeneous industrial protocols failing to sync cleanly with the ERP, causing brittle integrations or incomplete downtime capture.',
          deliverable:
            'Secure M2M, IoT, and LPWAN connectivity architecture bridging sensors and machines directly to cloud storage and ERP.'
        },
        {
          stage: 3,
          code: 'STAGE 03',
          name: 'Visibility',
          horizon: 'Real-Time Understanding',
          color: '#1db7c4',
          typicalState:
            'End-to-end sensors capture live operational events, creating a faithful digital shadow (“what is happening right now”) accessible to supervisors and leadership.',
          hiddenBottleneck:
            'Raw alarm overload without executive hierarchy: everyone sees the line stopped, yet each department defends a different spreadsheet.',
          deliverable:
            'Single source of operational truth with live executive KPIs for availability, cycle time, and batch traceability.'
        },
        {
          stage: 4,
          code: 'STAGE 04',
          name: 'Transparency',
          horizon: 'Real-Time Understanding',
          color: '#c63368',
          typicalState:
            'Historical plant data is correlated with engineering and ERP context to answer “why it is happening,” exposing root causes of stops, scrap, and bottlenecks.',
          hiddenBottleneck:
            'Slow root-cause investigations dependent on a handful of overloaded specialists, delaying corrective action on recurring losses.',
          deliverable:
            'Process digital twin modeling (as demonstrated in ProduthivIA), correlating machine parameters, shifts, raw material, and margin impact.'
        },
        {
          stage: 5,
          code: 'STAGE 05',
          name: 'Predictive Capacity',
          horizon: 'Foresight & Autonomy',
          color: '#db8a50',
          typicalState:
            'Built upon clean, transparent data, quantitative models and AI project future states (“what will happen”), anticipating failure trends, demand shifts, or quality drift.',
          hiddenBottleneck:
            'Attempting predictive AI before securing Stages 2–4 produces false alarms, erodes maintenance team trust, and wastes capital.',
          deliverable:
            'Predictive engineering models, anomaly detection over historical telemetry, and risk-validated operational scenario simulation.'
        },
        {
          stage: 6,
          code: 'STAGE 06',
          name: 'Autonomous Adaptability',
          horizon: 'Foresight & Autonomy',
          color: '#eca94c',
          typicalState:
            'Integrated systems dynamically adjust operational parameters, commercial routing, or production queues within strict governance guardrails.',
          hiddenBottleneck:
            'Ungoverned black-box automation exposes the business to non-auditable decisions, operational risk, and loss of human authority.',
          deliverable:
            'Supervised autonomous agents governed under ISO 42001: hard operational bounds, complete audit trails, and instant human escalation.'
        }
      ],

      layers: [
        {
          num: '06',
          id: 'layer-06',
          title: 'Governance & International Standards',
          zone: 'Executive Top',
          subtitle: 'Strategic direction, prioritized ROI, and auditable compliance',
          color: '#eca94c',
          nodes: [
            'ACATECH Maturity Index',
            'ISO 56002 (Innovation Management)',
            'ISO 42001 (Responsible AI)',
            'ISO 9001 & ISO 14000'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> Ensures no sensor installed at Layer 01 or AI model at Layer 03 exists for hype—every deliverable is tied to measurable payback, risk policy, and continuous governance.',
          apps: ['produthivia', 'capacittai']
        },
        {
          num: '05',
          id: 'layer-05',
          title: 'Identity, Security & Traceability',
          zone: 'Shield & Infra',
          subtitle: 'Enterprise isolation, role-based access control, and auditability',
          color: '#db8a50',
          nodes: [
            'Keycloak Federated Identity',
            'Strict Content Security Policy (CSP)',
            'Credential Vault',
            'Full Audit Trail',
            'Dedicated VPS & Isolated Containers'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> Industrial and enterprise data demand hardened architecture from container infrastructure to role-based login—engineered and operated entirely in-house.',
          apps: ['edumaxia', 'strikeflow3']
        },
        {
          num: '04',
          id: 'layer-04',
          title: 'Web Application Engineering',
          zone: 'Proprietary Software',
          subtitle: 'High-density production applications designed, coded, and operated in-house',
          color: '#c63368',
          nodes: [
            'React & Vite',
            'Next.js SSR',
            'Multi-Tenant & Shadow DOM Architecture',
            'High-Density Canvas & Vector SVG',
            'Browser Audio Processing'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> Instead of handing over a static slide deck and pointing to third-party vendors, SmartInovaT architects, codes, and runs complete production software.',
          apps: ['eckkoai', 'parthituria', 'solochordys']
        },
        {
          num: '03',
          id: 'layer-03',
          title: 'Artificial Intelligence Engine',
          zone: 'Cognitive Core',
          subtitle: 'Applied models over real operational signals to predict, inspect, and automate',
          color: '#1db7c4',
          nodes: [
            'Computer Vision (Applicable Capability)',
            'Predictive Maintenance over Telemetry',
            'Conversational AI Agents',
            'Generative Video & Voice AI',
            'Quantitative Models & Predictability'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> Our AI engineers understand the physical mechanics generating the signal—filtering shop-floor noise before it distorts predictions or automated triage.',
          apps: ['presenthia', 'eckkoai', 'strikeflow3']
        },
        {
          num: '02',
          id: 'layer-02',
          title: 'Connectivity & Enterprise Integration',
          zone: 'Physical-Logical Bridge',
          subtitle: 'Closing the gap between production lines and corporate ERP systems',
          color: '#429a8e',
          nodes: [
            'Machine–Sensor–ERP Bridge',
            'ERP Selection & Deployment',
            'Cloud Data Acquisition & Logging',
            'Real-Time Industrial Logistics'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> Combines executive leadership experience selecting and deploying ERPs in 850 t/month and 1,500 t/month plants with modern cloud telemetry.',
          apps: ['produthivia', 'strikeflow3']
        },
        {
          num: '01',
          id: 'layer-01',
          title: 'Shop Floor & Physical Assets',
          zone: 'Real Industrial Base',
          subtitle: 'Where data is born: machining centers, sensors, wireless networks, automation',
          color: '#6e86a6',
          nodes: [
            'Real-Time Machine Sensors',
            'M2M Remote Assistance',
            'Wireless LPWAN Networks',
            'Industrial Vision Systems',
            'CNC / Machine-Tool Retrofitting',
            'Industrial Automation'
          ],
          bridgeText:
            '<strong>Zero-outsourcing bridge:</strong> A next-generation company built upon 30+ years of real industrial leadership expertise—from German molding lines and CNC retrofitting to 100% heavy-truck brake-drum machining.',
          apps: []
        }
      ],

      painCategories: [
        { id: 'all', label: 'All' },
        { id: 'shopfloor', label: 'Shop Floor & Operations' },
        { id: 'commercial', label: 'Management, Sales & Comms' },
        { id: 'strategy', label: 'Strategy, Team & AI Risk' }
      ],

      pains: [
        {
          id: 'pain-01',
          code: 'PAIN #01',
          category: 'shopfloor',
          quote: '“My machine stops and I only find out afterwards.”',
          rootSymptom:
            'Purely reactive maintenance and shift blindness: leadership only discovers downtime after batch delivery slips.',
          solutionArch:
            'Real-time wireless monitoring via industrial sensors, IoT, and M2M, scaling into predictive maintenance capability over collected asset history.',
          axesLabel: 'Axes 2 & 3 • Connection + Intelligence',
          axesCodes: ['02', '03'],
          impactNext:
            'Immediate visibility into stops and micro-stops, structured failure logs, and safe progression to early anomaly alerts via a low-risk pilot.',
          complianceNote:
            'Engineering capability: M2M/IoT telemetry (~11 years of accumulated expertise) paired with predictive modeling tailored to your line.',
          accent: '#1db7c4',
          appSlug: 'strikeflow3',
          contactTopic:
            'Machine/ERP/IoT Connection — Real-time machine monitoring and predictive maintenance ("My machine stops and I only find out afterwards")'
        },
        {
          id: 'pain-02',
          code: 'PAIN #02',
          category: 'shopfloor',
          quote: '“My scrap rate is high and visual inspection is done by tired staff.”',
          rootSymptom:
            'End-of-shift human fatigue causes inconsistent inspection criteria—letting defective parts pass or scrapping good units.',
          solutionArch:
            'Computer vision engineering capability applicable to optical quality inspection directly on the production line.',
          axesLabel: 'Axis 3 • Intelligence',
          axesCodes: ['03'],
          impactNext:
            'Objective 24/7 acceptance criteria, traceable non-conformance logs, and consistent scrap reduction. Next step: line optical feasibility assessment.',
          complianceNote:
            'Structured as custom engineering capability in vision systems and applied AI tailored to your manufacturing process.',
          accent: '#c63368',
          appSlug: null,
          contactTopic: 'Applied AI & Automation — Computer vision engineering for quality inspection and scrap reduction'
        },
        {
          id: 'pain-03',
          code: 'PAIN #03',
          category: 'shopfloor',
          quote: '“My ERP does not talk to the shop floor.”',
          rootSymptom:
            'Clipboard production logs reach corporate systems hours or days late, distorting WIP inventory, unit costing, and OEE.',
          solutionArch:
            'Direct systems integration: machines, controllers, and sensors communicating automatically with your ERP, backed by structured cloud logging.',
          axesLabel: 'Axis 2 • Connection',
          axesCodes: ['02'],
          impactNext:
            'Eliminates manual re-typing, reconciles physical output with financial ERP balances in real time, and accelerates order-variance response.',
          complianceNote: null,
          accent: '#429a8e',
          appSlug: null,
          contactTopic: 'Machine/ERP/IoT Connection — Direct shop-floor sensor and machine integration with ERP'
        },
        {
          id: 'pain-04',
          code: 'PAIN #04',
          category: 'shopfloor',
          quote: '“I have scattered data and zero reliable KPIs.”',
          rootSymptom:
            'Every department brings a conflicting spreadsheet to executive reviews—wasting meetings debating numbers instead of making decisions.',
          solutionArch:
            'Structured cloud data acquisition, unified operational pipelines, executive dashboards, and production predictability models.',
          axesLabel: 'Axes 2 & 3 • Connection + Intelligence',
          axesCodes: ['02', '03'],
          impactNext:
            'A single auditable source of truth across plant and boardroom, real-time KPIs, and reliable delivery forecasting.',
          complianceNote: null,
          accent: '#1db7c4',
          appSlug: 'strikeflow3',
          contactTopic: 'Machine/ERP/IoT Connection — Structuring scattered operational data into reliable real-time KPIs'
        },
        {
          id: 'pain-05',
          code: 'PAIN #05',
          category: 'commercial',
          quote: '“My team loses hours every week on repetitive tasks.”',
          rootSymptom:
            'Skilled engineers and staff spend half their week copying fields across systems, triaging routine requests, and assembling reports.',
          solutionArch:
            'Industrial, technical, and administrative workflow automation powered by AI agents engineered around your actual process.',
          axesLabel: 'Axis 3 • Intelligence',
          axesCodes: ['03'],
          impactNext:
            'Immediate recovery of high-value engineering and back-office hours, sharp reduction in manual errors, and faster internal SLA.',
          complianceNote: null,
          accent: '#c63368',
          appSlug: 'produthivia',
          contactTopic: 'Applied AI & Automation — Automating repetitive industrial and administrative workflows'
        },
        {
          id: 'pain-06',
          code: 'PAIN #06',
          category: 'strategy',
          quote: '“I don’t know if Industry 4.0 pays off or where to begin.”',
          rootSymptom:
            'Legitimate concern over locking CAPEX into sensors, software, or generic consultancies that deliver slides without financial payback.',
          solutionArch:
            'ACATECH Maturity Index assessment delivering an ROI-prioritized roadmap and a low-risk, high-impact pilot blueprint.',
          axesLabel: 'Axis 1 • Diagnostic',
          axesCodes: ['01'],
          impactNext:
            'Fixed-scope executive clarity: know exactly where to act first, expected cost vs. return, and prove value in a controlled pilot before scaling.',
          complianceNote: null,
          accent: '#1db7c4',
          appSlug: 'produthivia',
          contactTopic: 'ACATECH Assessment — Industry 4.0 ROI roadmap and low-risk pilot planning'
        },
        {
          id: 'pain-07',
          code: 'PAIN #07',
          category: 'commercial',
          quote: '“We lose sales because we reply too slowly on WhatsApp.”',
          rootSymptom:
            'Inbound leads go cold after hours or during demand spikes while human reps struggle to qualify and schedule appointments in time.',
          solutionArch:
            'AI commercial attendant answering with verified company knowledge, detecting buying intent, booking slots, and escalating to humans at the right moment.',
          axesLabel: 'Axis 3 • Intelligence',
          axesCodes: ['03'],
          impactNext:
            'Instant 24/7 lead response, structured commercial pipeline, and sales reps focused strictly on high-intent opportunities.',
          complianceNote: null,
          accent: '#429a8e',
          appSlug: 'presenthia',
          contactTopic: 'Applied AI & Automation — 24/7 AI WhatsApp attendant, qualification, and scheduling'
        },
        {
          id: 'pain-08',
          code: 'PAIN #08',
          category: 'strategy',
          quote: '“We deployed new technology, and the team doesn’t use it.”',
          rootSymptom:
            'Low post-launch adoption, workforce turnover, and static PDF operating manuals that nobody reads on the job.',
          solutionArch:
            'AI-powered corporate training with gamified career tracks, virtual tutor, and certification generated directly from your company’s own SOPs.',
          axesLabel: 'Axis 4 • Governance & Training',
          axesCodes: ['04'],
          impactNext:
            'Sustained adoption of deployed systems, faster onboarding, and management dashboards tracking verified skill mastery.',
          complianceNote: null,
          accent: '#eca94c',
          appSlug: 'capacittai',
          contactTopic: 'ISO 56002/42001 Governance — Corporate AI training tracks from internal documentation'
        },
        {
          id: 'pain-09',
          code: 'PAIN #09',
          category: 'commercial',
          quote: '“We need high-volume communication but lack studio time.”',
          rootSymptom:
            'Technical updates, internal training, and commercial outreach stall because recording executives requires studios and editing bottlenecks.',
          solutionArch:
            'Digital-avatar video studio turning approved scripts into realistic face-and-voice presentations with stage-by-stage approval.',
          axesLabel: 'Axis 3 • Intelligence',
          axesCodes: ['03'],
          impactNext:
            'Scalable executive, technical, and marketing video production in a fraction of studio time with full editorial control.',
          complianceNote: null,
          accent: '#c63368',
          appSlug: 'eckkoai',
          contactTopic: 'Applied AI & Automation — Scalable corporate and technical video studio with digital avatars'
        },
        {
          id: 'pain-10',
          code: 'PAIN #10',
          category: 'strategy',
          quote: '“Our innovation depends on one inspired individual.”',
          rootSymptom:
            'Initiatives start informally, lose momentum under operational pressure, and stall whenever a key manager changes roles.',
          solutionArch:
            'Innovation governance structured under ISO 56002 plus corporate innovation hub (i-hub) design to make innovation a repeatable system.',
          axesLabel: 'Axis 4 • Governance',
          axesCodes: ['04'],
          impactNext:
            'Institutionalized innovation: continuous idea capture, objective ROI gates, and board-level portfolio tracking.',
          complianceNote: null,
          accent: '#db8a50',
          appSlug: 'produthivia',
          contactTopic: 'ISO 56002/42001 Governance — Continuous innovation process and i-hub design (ISO 56002)'
        },
        {
          id: 'pain-11',
          code: 'PAIN #11',
          category: 'strategy',
          quote: '“We are using AI without knowing the risks we are taking.”',
          rootSymptom:
            'Shadow AI exposure: employees paste contracts, pricing, and proprietary plant data into public tools with zero policy or audit trail.',
          solutionArch:
            'AI management system aligned with ISO 42001 establishing clear usage policies, risk tiers, accountability roles, and traceability.',
          axesLabel: 'Axis 4 • Governance',
          axesCodes: ['04'],
          impactNext:
            'Legal and operational confidence to scale AI safely while protecting trade secrets and maintaining auditable decision logs.',
          complianceNote: null,
          accent: '#eca94c',
          appSlug: null,
          contactTopic: 'ISO 56002/42001 Governance — Responsible AI risk governance and auditability (ISO 42001)'
        }
      ],

      formats: [
        {
          num: '01',
          id: 'fmt-01',
          name: 'Standalone Diagnostic',
          shortTag: 'Entry point • Fixed scope',
          color: '#1db7c4',
          cx: 115,
          whenToChoose:
            'Ideal for industrial plants and mid-to-large enterprises seeking objective clarity before committing CAPEX or IT budgets—identifying immediate payback.',
          whatClientGets: [
            'Field assessment of digital maturity using the ACATECH Maturity Index framework.',
            'End-to-end bottleneck map across shop floor, ERP systems, and decision workflows.',
            'Executive roadmap prioritized by financial return and implementation complexity.'
          ],
          commitmentProfile:
            'Fixed deliverables, timeline, and fee in a standalone engagement—with zero lock-in or obligation to continue.',
          appSlug: 'produthivia',
          contactTopic: 'ACATECH Assessment — Request Standalone Diagnostic proposal (fixed scope)'
        },
        {
          num: '02',
          id: 'fmt-02',
          name: 'Pilot Project',
          shortTag: 'High impact • Low risk',
          color: '#429a8e',
          cx: 308,
          whenToChoose:
            'The natural step after diagnostics: validate technology on one critical machine, production cell, or commercial workflow before plant-wide rollout.',
          whatClientGets: [
            'Focused deployment (connectivity, workflow automation, or AI agent) in a bounded perimeter.',
            'Objective before-vs-after KPI measurement (downtime, cycle, response time, or unit cost).',
            'Internally proven business case to greenlight enterprise scale with confidence.'
          ],
          commitmentProfile:
            'Lean capital footprint and contained risk, engineered to demonstrate measurable payback within weeks.',
          appSlug: 'presenthia',
          contactTopic: 'Machine/ERP/IoT Connection — Scope a high-impact, low-risk Pilot Project'
        },
        {
          num: '03',
          id: 'fmt-03',
          name: 'Custom Software Build',
          shortTag: 'Proprietary software • End-to-end',
          color: '#c63368',
          cx: 500,
          whenToChoose:
            'When off-the-shelf SaaS cannot fit your operational reality and you require an exclusive, hardened platform ready for live production.',
          whatClientGets: [
            'Full-stack architecture, modern web UI (React / Next.js), data pipelines, and AI engine.',
            'Enterprise-grade security built in (federated SSO, strict CSP, credential vault, audit logs).',
            'Deployment on dedicated VPS/containers—the exact engineering demonstrated across the 9 proprietary applications in this showcase.'
          ],
          commitmentProfile:
            'Milestone-driven engineering executed 100% in-house without outsourcing code to third-party dev shops.',
          appSlug: 'eckkoai',
          contactTopic: 'Custom Software Build — Architect and build a dedicated production application'
        },
        {
          num: '04',
          id: 'fmt-04',
          name: 'Executive Advisory',
          shortTag: 'Direct C-suite & board support',
          color: '#db8a50',
          cx: 692,
          whenToChoose:
            'For CEOs, COOs, industrial directors, and boards evaluating machinery CAPEX, ERP replacement, i-hub creation, or AI governance.',
          whatClientGets: [
            'Vendor-neutral advisory combining 30+ years of industrial & executive leadership with modern AI software engineering.',
            'Critical technical review of vendor proposals, integrators, and enterprise architectures.',
            'Practical implementation of ISO 56002 (innovation) and ISO 42001 (responsible AI) governance.'
          ],
          commitmentProfile:
            'Monthly executive cadence or strategic advisory structured around key investment and change cycles.',
          appSlug: null,
          contactTopic: 'ISO 56002/42001 Governance — Executive Advisory for C-suite on technology, ERP, and AI'
        },
        {
          num: '05',
          id: 'fmt-05',
          name: 'Corporate Enablement',
          shortTag: 'Real workforce adoption',
          color: '#eca94c',
          cx: 885,
          whenToChoose:
            'When new systems, quality standards, or AI tools have been deployed and you need supervisors, engineers, and operators to truly master them.',
          whatClientGets: [
            'Hands-on workshops tailored for plant leadership, engineering, and business teams.',
            'Transformation of technical manuals, SOPs, and internal policies into interactive tracks.',
            'Progress analytics, internal certification, and AI-assisted tutoring.'
          ],
          commitmentProfile:
            'Cohort-based workshops or continuous corporate enablement powered by the CapacittAI platform.',
          appSlug: 'capacittai',
          contactTopic: 'ISO 56002/42001 Governance — Corporate Enablement and AI training tracks from SOPs'
        }
      ]
    }
  };

  /* ---------- State ---------- */
  let currentLang = 'pt';
  const state1 = { axisIndex: 0, acatechStage: 3 };
  const state2 = { activeLayerId: 'layer-03' };
  const state3 = { category: 'all', activePainId: 'pain-01' };
  const state4 = { govFocus: 'both', formatId: 'fmt-01' };

  function detectLang() {
    if (window.SmartI18n && typeof window.SmartI18n.getLang === 'function') {
      const l = String(window.SmartI18n.getLang() || '').toLowerCase();
      if (l.startsWith('en')) return 'en';
      if (l.startsWith('pt')) return 'pt';
    }
    const ds = String(document.documentElement.dataset.lang || '').toLowerCase();
    if (ds.startsWith('en')) return 'en';
    if (ds.startsWith('pt')) return 'pt';
    const htmlLang = String(document.documentElement.lang || '').toLowerCase();
    return htmlLang.startsWith('en') ? 'en' : 'pt';
  }

  function dict() {
    return I18N[currentLang] || I18N.pt;
  }

  function pushTrackingEvent(eventName, params) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: eventName, language: currentLang }, params || {}));
    } catch (_) {
      /* no-op */
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function openPortfolioApp(slug, sourceInfographic) {
    if (!slug) return;
    pushTrackingEvent('portfolio_preview_open', {
      app_slug: slug,
      source_module: sourceInfographic || 'infographics'
    });
    if (window.SmartPortfolio && typeof window.SmartPortfolio.openPreview === 'function') {
      window.SmartPortfolio.openPreview(slug);
      return;
    }
    const portfolioRoot = document.getElementById('portfolio-showcase-root');
    if (portfolioRoot) {
      const trigger = portfolioRoot.querySelector('[data-app-slug="' + slug + '"], [data-slug="' + slug + '"]');
      if (trigger && typeof trigger.click === 'function') {
        trigger.click();
        return;
      }
      portfolioRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const meta = PORTFOLIO_MAP[slug];
    if (meta && meta.file) {
      const prefix = window.SMARTINOVAT_ROOT_PREFIX || './';
      window.open(prefix + meta.file, '_blank', 'noopener');
    }
  }

  function triggerContactTopic(topicText, sourceInfographic) {
    pushTrackingEvent('infographic_contact_intent', {
      topic: topicText,
      source_module: sourceInfographic || 'infographics'
    });
    if (window.SmartContact && typeof window.SmartContact.prefillTopic === 'function') {
      window.SmartContact.prefillTopic(topicText);
      return;
    }
    const contactEl =
      document.getElementById('contato') ||
      document.getElementById('contact') ||
      document.querySelector('[id*="contato"], [id*="contact"]') ||
      document.querySelector('form');

    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const selectEl = contactEl.querySelector('select');
      if (selectEl) {
        const lowerTopic = String(topicText).toLowerCase();
        for (let i = 0; i < selectEl.options.length; i += 1) {
          const optText = selectEl.options[i].text.toLowerCase();
          if (
            (lowerTopic.includes('acatech') && (optText.includes('diagn') || optText.includes('acatech'))) ||
            ((lowerTopic.includes('conex') || lowerTopic.includes('connection')) &&
              (optText.includes('conex') || optText.includes('connect') || optText.includes('iot') || optText.includes('erp'))) ||
            ((lowerTopic.includes('ia ') || lowerTopic.includes('applied ai')) &&
              (optText.includes('ia') || optText.includes('ai') || optText.includes('automa'))) ||
            (lowerTopic.includes('iso') && (optText.includes('govern') || optText.includes('iso'))) ||
            ((lowerTopic.includes('sob medida') || lowerTopic.includes('custom software')) &&
              (optText.includes('medida') || optText.includes('custom') || optText.includes('bespoke')))
          ) {
            selectEl.selectedIndex = i;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            break;
          }
        }
      }
      const msgField = contactEl.querySelector('textarea') || contactEl.querySelector('input[type="text"]');
      if (msgField) {
        const d = dict().ui;
        const pfxPT = I18N.pt.ui.contactMsgPrefix;
        const pfxEN = I18N.en.ui.contactMsgPrefix;
        if (!msgField.value || msgField.value.startsWith(pfxPT) || msgField.value.startsWith(pfxEN)) {
          msgField.value = d.contactMsgPrefix + topicText + '\n\n' + d.contactContextPrompt;
          msgField.dispatchEvent(new Event('input', { bubbles: true }));
        }
        setTimeout(function () {
          msgField.focus({ preventScroll: true });
        }, 450);
      }
    } else {
      window.location.hash = 'contato';
    }
  }

  function bindKeyboardActivation(el, handler) {
    el.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        handler(ev);
      }
    });
  }

  /* ==========================================================================
     SVG TOOLKIT — traço fino, ícones de linha e curvas suaves compartilhadas
     ========================================================================== */
  const SVG_FONT_D = 'Plus Jakarta Sans, Inter, sans-serif';
  const SVG_FONT_M = 'JetBrains Mono, monospace';
  const SVG_FONT_S = 'Inter, sans-serif';

  const ICON_PATHS = {
    pulse: '<path d="M2 12h4l3-8 5 16 3-8h5"/>',
    link:
      '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7l7.4-4.3M8.3 13.3l7.4 4.3"/>',
    chip:
      '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx="0.6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    factory: '<path d="M3 21V10l6 4v-4l6 4V5h4v16z"/><path d="M8 17h2M13 17h2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    alert: '<path d="M12 3L2.5 20h19z"/><path d="M12 10v4.5M12 17.4v.2"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 17l9 5 9-5"/>',
    branch:
      '<circle cx="6" cy="5" r="2.4"/><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="8" r="2.4"/><path d="M6 7.4v9.2M18 10.4c0 4-6 3.2-11.2 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.6-4.6"/>',
    flag: '<path d="M5 22V4M5 4c5-2.4 8 2.4 14 0v10c-6 2.4-9-2.4-14 0"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6M13.5 4l-3 16"/>',
    compass: '<circle cx="12" cy="12" r="9.5"/><path d="M16 8l-2.2 5.8L8 16l2.2-5.8z"/>',
    users:
      '<circle cx="9" cy="8" r="3.6"/><path d="M2 21v-1.5A4.5 4.5 0 0 1 6.5 15h5a4.5 4.5 0 0 1 4.5 4.5V21"/><path d="M16.5 4.6a3.6 3.6 0 0 1 0 6.8M22 21v-1.5a4.5 4.5 0 0 0-3-4.2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };

  function svgNum(v) {
    return String(Math.round(v * 10) / 10);
  }

  function svgIcon(name, cx, cy, size, color, strokePx, opacity) {
    const k = size / 24;
    return (
      '<g transform="translate(' +
      svgNum(cx - size / 2) +
      ' ' +
      svgNum(cy - size / 2) +
      ') scale(' +
      k.toFixed(3) +
      ')" fill="none" stroke="' +
      color +
      '" stroke-width="' +
      (strokePx / k).toFixed(2) +
      '" stroke-linecap="round" stroke-linejoin="round"' +
      (opacity ? ' opacity="' + opacity + '"' : '') +
      '>' +
      (ICON_PATHS[name] || '') +
      '</g>'
    );
  }

  /* Catmull-Rom -> Bézier cúbica: curva suave passando por todos os pontos */
  function smoothPath(pts) {
    if (!pts.length) return '';
    let dPath = 'M' + svgNum(pts[0].x) + ' ' + svgNum(pts[0].y);
    for (let i = 0; i < pts.length - 1; i += 1) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      dPath +=
        'C' +
        svgNum(p1.x + (p2.x - p0.x) / 6) +
        ' ' +
        svgNum(p1.y + (p2.y - p0.y) / 6) +
        ' ' +
        svgNum(p2.x - (p3.x - p1.x) / 6) +
        ' ' +
        svgNum(p2.y - (p3.y - p1.y) / 6) +
        ' ' +
        svgNum(p2.x) +
        ' ' +
        svgNum(p2.y);
    }
    return dPath;
  }

  /* Fio senoidal com envelope: converge nas duas pontas, respira no meio */
  function threadPath(x0, x1, cy, amp, freq, phase, steps) {
    const pts = [];
    const n = steps || 36;
    for (let i = 0; i <= n; i += 1) {
      const u = i / n;
      const env = Math.pow(Math.sin(Math.PI * u), 0.55);
      pts.push({ x: x0 + (x1 - x0) * u, y: cy + amp * env * Math.sin(2 * Math.PI * freq * u + phase) });
    }
    return smoothPath(pts);
  }

  function svgText(x, y, str, opts) {
    const o = opts || {};
    return (
      '<text x="' +
      svgNum(x) +
      '" y="' +
      svgNum(y) +
      '"' +
      (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') +
      ' fill="' +
      (o.fill || 'var(--si-svg-ink-metallic)') +
      '" font-family="' +
      (o.font || SVG_FONT_S) +
      '" font-size="' +
      (o.size || 10) +
      '" font-weight="' +
      (o.weight || 400) +
      '"' +
      (o.spacing ? ' letter-spacing="' + o.spacing + '"' : '') +
      (o.opacity ? ' opacity="' + o.opacity + '"' : '') +
      '>' +
      escapeHtml(str) +
      '</text>'
    );
  }

  /* Legenda de leitura exibida logo abaixo de cada diagrama */
  function readNote(text) {
    return (
      '<p class="si-ig-read"><span class="si-ig-read-tag">' +
      escapeHtml(dict().ui.readTag) +
      '</span><span>' +
      escapeHtml(text) +
      '</span></p>'
    );
  }

  /* ==========================================================================
     1. RENDER: #infographic-axes-acatech
     ========================================================================== */
  function buildAxesSvg(d, activeIdx) {
    const axes = d.axes;
    const ui = d.ui;
    const activeAxis = axes[activeIdx];
    const CY = 132;
    const X0 = 144;
    const X1 = 936;
    const AXIS_ICONS = ['pulse', 'link', 'chip', 'shield'];

    /* Fios do espectro: cruzam o eixo exatamente em cada nó (zeros da senoide) */
    const span = X1 - X0;
    const uFirst = (axes[0].cx - X0) / span;
    const uStep = (axes[1].cx - axes[0].cx) / span;
    const freq = 1 / (2 * uStep);
    const basePhase = -2 * Math.PI * freq * uFirst;
    let threads = '';
    [0, Math.PI].forEach(function (shift, fam) {
      for (let k = 0; k < 5; k += 1) {
        threads +=
          '<path d="' +
          threadPath(X0, X1, CY, 22 + k * 4.5, freq, basePhase + shift, 44) +
          '" stroke="url(#siAxSpectrum)" stroke-width="0.7" opacity="' +
          (fam === 0 ? 0.5 - k * 0.07 : 0.34 - k * 0.05).toFixed(2) +
          '"/>';
      }
    });

    let ticks = '';
    for (let x = X0 + 12; x < X1; x += 12) {
      const major = Math.round((x - X0) / 12) % 5 === 0;
      ticks +=
        '<line x1="' + x + '" y1="' + (CY - (major ? 4 : 2)) + '" x2="' + x + '" y2="' + (CY + (major ? 4 : 2)) + '"/>';
    }

    const chevrons = axes
      .slice(0, -1)
      .map(function (ax, idx) {
        const mx = (ax.cx + axes[idx + 1].cx) / 2;
        return '<path d="M' + (mx - 3) + ' ' + (CY - 4) + 'L' + (mx + 2) + ' ' + CY + 'L' + (mx - 3) + ' ' + (CY + 4) + '"/>';
      })
      .join('');

    const nodesMarkup = axes
      .map(function (ax, idx) {
        const isSelected = idx === activeIdx;
        const isDone = idx <= activeIdx;
        return (
          '<g class="si-svg-node" role="button" tabindex="0" aria-label="' +
          escapeHtml(ui.axisLabelPrefix + ax.num + ' ' + ax.name) +
          '" data-axis-idx="' +
          idx +
          '">' +
          '<circle cx="' + ax.cx + '" cy="' + CY + '" r="50" fill="transparent"/>' +
          (isSelected
            ? '<circle cx="' + ax.cx + '" cy="' + CY + '" r="48" fill="' + ax.color + '" fill-opacity="0.05"/>' +
              '<circle cx="' + ax.cx + '" cy="' + CY + '" r="41" fill="none" stroke="' + ax.color +
              '" stroke-width="0.8" stroke-dasharray="2 5" opacity="0.85" class="si-svg-flow"/>'
            : '') +
          '<circle cx="' + ax.cx + '" cy="' + CY + '" r="31" fill="var(--si-svg-plate)" stroke="' + ax.color +
          '" stroke-width="' + (isSelected ? 1.3 : 0.9) + '" stroke-opacity="' + (isDone ? 1 : 0.6) + '"/>' +
          '<circle cx="' + ax.cx + '" cy="' + CY + '" r="31" fill="' + ax.color + '" fill-opacity="' +
          (isSelected ? 0.14 : 0.04) + '"/>' +
          '<circle cx="' + ax.cx + '" cy="' + CY + '" r="25" fill="none" stroke="' + ax.color +
          '" stroke-width="0.6" stroke-opacity="0.35"/>' +
          svgIcon(AXIS_ICONS[idx] || 'pulse', ax.cx, CY, 22, isSelected ? 'var(--si-svg-ink-strong)' : ax.color, 1.15, isSelected ? '' : '0.9') +
          svgText(ax.cx, CY - 44, ax.num, {
            anchor: 'middle', fill: ax.color, font: SVG_FONT_M, size: 10, weight: 500, spacing: 1.5
          }) +
          svgText(ax.cx, CY + 58, ax.name.toUpperCase(), {
            anchor: 'middle',
            fill: isSelected ? 'var(--si-svg-ink-strong)' : 'var(--si-svg-ink-metallic)',
            font: SVG_FONT_D, size: 12, weight: 500, spacing: 1.6
          }) +
          svgText(ax.cx, CY + 75, ax.shortSub, {
            anchor: 'middle',
            fill: isSelected ? ax.color : 'var(--si-svg-ink-subtle)',
            font: SVG_FONT_M, size: 9.6
          }) +
          (isSelected
            ? '<path d="M' + ax.cx + ' ' + (CY + 86) + 'V' + (CY + 104) + '" stroke="' + ax.color +
              '" stroke-width="0.8" stroke-dasharray="2 3"/>' +
              '<path d="M' + (ax.cx - 4) + ' ' + (CY + 104) + 'h8l-4 5z" fill="' + ax.color + '"/>'
            : '') +
          '</g>'
        );
      })
      .join('');

    function terminal(x, color, cssVar, icon, tag, title, sub) {
      return (
        '<g>' +
        '<rect x="' + x + '" y="' + (CY - 50) + '" width="130" height="100" rx="10" fill="var(--si-svg-plate)" stroke="' +
        color + '" stroke-opacity="0.6" stroke-width="0.9"/>' +
        '<path d="M' + (x + 12) + ' ' + (CY - 50) + 'h22" stroke="' + color + '" stroke-width="1.6"/>' +
        svgIcon(icon, x + 65, CY - 27, 18, color, 1.1) +
        svgText(x + 65, CY - 3, tag, { anchor: 'middle', fill: cssVar, font: SVG_FONT_M, size: 8.6, weight: 500, spacing: 1.2 }) +
        svgText(x + 65, CY + 16, title, { anchor: 'middle', fill: 'var(--si-svg-ink-primary)', font: SVG_FONT_D, size: 12.4, weight: 500 }) +
        svgText(x + 65, CY + 33, sub, { anchor: 'middle', fill: 'var(--si-svg-ink-muted)', size: 9.6 }) +
        '</g>'
      );
    }

    return (
      '<svg class="si-ig-svg si-ig-svg--wide" viewBox="0 0 1080 250" role="img" aria-label="' +
      escapeHtml(ui.axesSvgAria) +
      '">' +
      '<defs>' +
      '<linearGradient id="siAxSpectrum" x1="' + X0 + '" y1="0" x2="' + X1 + '" y2="0" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#429a8e"/>' +
      '<stop offset="0.28" stop-color="#1db7c4"/>' +
      '<stop offset="0.58" stop-color="#c63368"/>' +
      '<stop offset="0.82" stop-color="#db8a50"/>' +
      '<stop offset="1" stop-color="#eca94c"/>' +
      '</linearGradient>' +
      '</defs>' +
      svgText(540, 22, ui.axesFlowCaption, {
        anchor: 'middle', fill: 'var(--si-svg-ink-muted)', font: SVG_FONT_M, size: 9.4, spacing: 1.3
      }) +
      '<g fill="none" stroke-linecap="round">' + threads + '</g>' +
      '<line x1="' + X0 + '" y1="' + CY + '" x2="' + X1 + '" y2="' + CY + '" stroke="var(--si-svg-baseline)" stroke-width="0.8"/>' +
      '<g stroke="var(--si-svg-baseline)" stroke-width="0.6" opacity="0.7">' + ticks + '</g>' +
      '<line x1="' + X0 + '" y1="' + CY + '" x2="' + activeAxis.cx + '" y2="' + CY + '" stroke="url(#siAxSpectrum)" stroke-width="1.4"/>' +
      '<line x1="' + X0 + '" y1="' + CY + '" x2="' + X1 + '" y2="' + CY + '" stroke="' + activeAxis.color +
      '" stroke-width="1" opacity="0.7" class="si-svg-flow--fast"/>' +
      '<g fill="none" stroke="var(--si-svg-ink-muted)" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">' + chevrons + '</g>' +
      terminal(14, '#429a8e', 'var(--si-teal)', 'factory', ui.physicalEndTag, ui.physicalEndTitle, ui.physicalEndSub) +
      terminal(936, '#eca94c', 'var(--si-amber)', 'target', ui.logicalEndTag, ui.logicalEndTitle, ui.logicalEndSub) +
      nodesMarkup +
      '</svg>'
    );
  }

  function buildAcatechStaircaseSvg(d, activeStageNum) {
    const stages = d.acatech;
    const ui = d.ui;
    const stepWidth = 140;
    const gap = 14;
    const startX = 62;
    const baseY = 318;
    const heights = [56, 92, 130, 168, 208, 246];
    const endX = startX + stages.length * stepWidth + (stages.length - 1) * gap;

    const nodes = stages.map(function (st, i) {
      return { x: startX + i * (stepWidth + gap) + stepWidth / 2, y: baseY - heights[i] - 18, color: st.color };
    });
    const curve = smoothPath(
      [{ x: startX - 14, y: baseY - 26 }].concat(nodes).concat([{ x: endX + 14, y: nodes[nodes.length - 1].y - 9 }])
    );

    const defs = stages
      .map(function (st, i) {
        const isSelected = st.stage === activeStageNum;
        return (
          '<linearGradient id="siAcFill' + i + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="' + st.color + '" stop-opacity="' + (isSelected ? 0.34 : 0.16) + '"/>' +
          '<stop offset="1" stop-color="' + st.color + '" stop-opacity="0.015"/>' +
          '</linearGradient>'
        );
      })
      .join('');

    const bandColors = ['var(--si-teal)', 'var(--si-cyan)', 'var(--si-amber)'];
    const bands = [ui.acatechBand1, ui.acatechBand2, ui.acatechBand3]
      .map(function (label, b) {
        const xs = startX + b * 2 * (stepWidth + gap);
        const xe = xs + 2 * stepWidth + gap;
        return (
          '<path d="M' + xs + ' 38V32H' + xe + 'V38" fill="none" stroke="' + bandColors[b] + '" stroke-width="0.8" opacity="0.75"/>' +
          svgText((xs + xe) / 2, 22, label, { anchor: 'middle', fill: bandColors[b], font: SVG_FONT_M, size: 9.4, weight: 500, spacing: 1.2 })
        );
      })
      .join('');

    const stepsSvg = stages
      .map(function (st, i) {
        const isSelected = st.stage === activeStageNum;
        const x = startX + i * (stepWidth + gap);
        const h = heights[i];
        const y = baseY - h;
        const nameParts = st.name.length > 15 && st.name.indexOf(' ') > 0
          ? [st.name.slice(0, st.name.indexOf(' ')), st.name.slice(st.name.indexOf(' ') + 1)]
          : [st.name];
        const nameFill = isSelected ? 'var(--si-svg-ink-strong)' : 'var(--si-svg-ink-metallic)';
        const nameSvg = nameParts
          .map(function (part, li) {
            return svgText(x + 14, baseY - 14 - (nameParts.length - 1 - li) * 13, part, {
              fill: nameFill, font: SVG_FONT_D, size: 11, weight: 500
            });
          })
          .join('');

        return (
          '<g class="si-svg-node" role="button" tabindex="0" aria-label="ACATECH 0' +
          st.stage + ': ' + escapeHtml(st.name) + '" data-acatech-stage="' + st.stage + '">' +
          '<line x1="48" y1="' + y + '" x2="' + x + '" y2="' + y + '" stroke="var(--si-svg-baseline)" stroke-width="0.5" stroke-dasharray="1.5 4" opacity="0.7"/>' +
          svgText(42, y + 3, '0' + st.stage, { anchor: 'end', fill: 'var(--si-svg-ink-subtle)', font: SVG_FONT_M, size: 8 }) +
          '<rect x="' + x + '" y="' + y + '" width="' + stepWidth + '" height="' + h + '" fill="url(#siAcFill' + i + ')"/>' +
          '<path d="M' + x + ' ' + baseY + 'V' + y + 'H' + (x + stepWidth) + 'V' + baseY + '" fill="none" stroke="' + st.color +
          '" stroke-width="' + (isSelected ? 1 : 0.7) + '" stroke-opacity="' + (isSelected ? 0.95 : 0.45) + '"/>' +
          '<line x1="' + x + '" y1="' + y + '" x2="' + (x + stepWidth) + '" y2="' + y + '" stroke="' + st.color +
          '" stroke-width="' + (isSelected ? 2 : 1.4) + '"/>' +
          svgText(x + 14, y + 31, '0' + st.stage, {
            fill: isSelected ? 'var(--si-svg-ink-strong)' : st.color, font: SVG_FONT_D, size: 22, weight: 300
          }) +
          nameSvg +
          (isSelected
            ? '<line x1="' + nodes[i].x + '" y1="' + (nodes[i].y + 8) + '" x2="' + nodes[i].x + '" y2="' + y +
              '" stroke="' + st.color + '" stroke-width="0.7" stroke-dasharray="2 3"/>' +
              '<line x1="' + nodes[i].x + '" y1="' + (nodes[i].y - 16) + '" x2="' + nodes[i].x + '" y2="40" stroke="' + st.color +
              '" stroke-width="0.6" stroke-dasharray="1.5 4" opacity="0.7"/>' +
              '<circle cx="' + nodes[i].x + '" cy="' + nodes[i].y + '" r="12" fill="none" stroke="' + st.color +
              '" stroke-width="0.8" stroke-dasharray="2 4" class="si-svg-flow"/>' +
              '<rect x="' + (nodes[i].x - 86) + '" y="' + (nodes[i].y - 9) + '" width="66" height="17" rx="8.5" fill="var(--si-svg-plate)" stroke="' +
              st.color + '" stroke-width="0.8"/>' +
              svgText(nodes[i].x - 53, nodes[i].y + 3, st.code, {
                anchor: 'middle', fill: st.color, font: SVG_FONT_M, size: 8, weight: 500, spacing: 0.8
              })
            : '') +
          '<circle cx="' + nodes[i].x + '" cy="' + nodes[i].y + '" r="' + (isSelected ? 4.6 : 3.2) + '" fill="' +
          (isSelected ? st.color : 'var(--si-svg-plate)') + '" stroke="' + st.color + '" stroke-width="1.1"/>' +
          '</g>'
        );
      })
      .join('');

    return (
      '<svg class="si-ig-svg si-ig-svg--wide" viewBox="0 0 1020 362" role="img" aria-label="' +
      escapeHtml(ui.acatechSvgAria) +
      '">' +
      '<defs>' +
      defs +
      '<linearGradient id="siAcCurve" x1="' + startX + '" y1="0" x2="' + endX + '" y2="0" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#429a8e"/><stop offset="0.4" stop-color="#1db7c4"/>' +
      '<stop offset="0.7" stop-color="#c63368"/><stop offset="1" stop-color="#eca94c"/>' +
      '</linearGradient>' +
      '</defs>' +
      bands +
      '<path d="M48 ' + baseY + 'V46" fill="none" stroke="var(--si-svg-baseline)" stroke-width="0.7"/>' +
      '<text x="14" y="' + (baseY - 96) + '" transform="rotate(-90 14 ' + (baseY - 96) + ')" text-anchor="middle" fill="var(--si-svg-ink-subtle)" font-family="' +
      SVG_FONT_M + '" font-size="8.4" letter-spacing="1.6">' + escapeHtml(ui.acatechAxisLabel) + '</text>' +
      '<path d="M45 51l3-6 3 6" fill="none" stroke="var(--si-svg-baseline)" stroke-width="0.7"/>' +
      '<line x1="48" y1="' + baseY + '" x2="' + (endX + 22) + '" y2="' + baseY + '" stroke="var(--si-svg-baseline)" stroke-width="0.8"/>' +
      '<path d="' + curve + '" fill="none" stroke="var(--si-svg-rail)" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="' + curve + '" fill="none" stroke="url(#siAcCurve)" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="' + curve + '" fill="none" stroke="var(--si-svg-ink-strong)" stroke-width="0.9" stroke-linecap="round" opacity="0.55" class="si-svg-flow"/>' +
      stepsSvg +
      svgText(510, 346, ui.acatechFooterCaption, {
        anchor: 'middle', fill: 'var(--si-svg-ink-subtle)', font: SVG_FONT_M, size: 9.4, spacing: 1.1
      }) +
      '</svg>'
    );
  }

  function renderAxesAcatech(root) {
    const d = dict();
    const ui = d.ui;
    const activeAxis = d.axes[state1.axisIndex] || d.axes[0];
    const activeStage =
      d.acatech.find(function (s) {
        return s.stage === state1.acatechStage;
      }) || d.acatech[2];

    const axisPills = d.axes
      .map(function (ax, idx) {
        return (
          '<button type="button" class="si-ig-pill ' +
          (idx === state1.axisIndex ? 'is-active' : '') +
          '" style="--pill-accent:' +
          ax.color +
          '" data-axis-idx="' +
          idx +
          '">' +
          '<span class="si-ig-pill-num">' +
          ax.num +
          '</span>' +
          '<span>' +
          escapeHtml(ax.name) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    const portfolioButtons = activeAxis.apps
      .map(function (slug) {
        const meta = PORTFOLIO_MAP[slug];
        if (!meta) return '';
        return (
          '<button type="button" class="si-ig-btn si-ig-btn--portfolio" data-open-portfolio="' +
          slug +
          '">' +
          '<span>' +
          escapeHtml(ui.seeProofBtn + meta.name) +
          ' ↗</span>' +
          '</button>'
        );
      })
      .join('');

    const stageButtons = d.acatech
      .map(function (st) {
        return (
          '<button type="button" class="si-stage-btn ' +
          (st.stage === state1.acatechStage ? 'is-active' : '') +
          '" style="--stage-color:' +
          st.color +
          '" data-acatech-stage="' +
          st.stage +
          '">' +
          '<span class="si-stage-btn-num">' +
          escapeHtml(st.code) +
          '</span>' +
          '<span class="si-stage-btn-name">' +
          escapeHtml(st.name) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    root.innerHTML =
      '<div class="si-ig-shell">' +
      '<div class="si-ig-frame">' +
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.partAEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.partATitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.partASubtitle) +
      '</p>' +
      '</div>' +
      '<div class="si-ig-helper-hint">' +
      escapeHtml(ui.interactiveHint) +
      '</div>' +
      '</div>' +
      '<div class="si-ig-pill-row" role="tablist" aria-label="' +
      escapeHtml(ui.axesTabAria) +
      '">' +
      axisPills +
      '</div>' +
      '<div class="si-ig-canvas-box">' +
      buildAxesSvg(d, state1.axisIndex) +
      '</div>' +
      readNote(ui.readAxes) +
      '<div class="si-axes-detail-grid si-panel-animate">' +
      '<div class="si-detail-card" style="--card-accent:' +
      activeAxis.color +
      '">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(ui.axisLabelPrefix + activeAxis.num + ui.painSolvedKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(activeAxis.painTitle) +
      '</h4>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeAxis.painDetail) +
      '</p>' +
      '</div>' +
      '<div class="si-ig-btn-row">' +
      '<button type="button" class="si-ig-btn" data-contact-topic="' +
      escapeHtml(activeAxis.contactTopic) +
      '">' +
      escapeHtml(ui.talkAxisBtn) +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="si-detail-card" style="--card-accent:' +
      activeAxis.color +
      '">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(ui.concreteDeliverablesKicker) +
      '</div>' +
      '<ul class="si-detail-list">' +
      activeAxis.deliverables
        .map(function (item) {
          return '<li>' + escapeHtml(item) + '</li>';
        })
        .join('') +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="si-detail-card" style="--card-accent:' +
      activeAxis.color +
      '">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(ui.realProofKicker) +
      '</div>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeAxis.proofSummary) +
      '</p>' +
      '</div>' +
      '<div class="si-ig-btn-row">' +
      portfolioButtons +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="si-section-divider"></div>' +
      /* PART B */
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow" style="--eyebrow-color:var(--si-amber)"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.partBEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.partBTitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.partBSubtitle) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-ig-translation-bar">' +
      '<span class="si-ig-translation-tag">' +
      escapeHtml(ui.execTranslationTag) +
      '</span>' +
      '<p class="si-ig-translation-text">' +
      ui.acatechTranslationHtml +
      '</p>' +
      '</div>' +
      '<div class="si-acatech-stage-strip">' +
      stageButtons +
      '</div>' +
      '<div class="si-ig-canvas-box">' +
      buildAcatechStaircaseSvg(d, state1.acatechStage) +
      '</div>' +
      readNote(ui.readAcatech) +
      '<div class="si-acatech-readout si-panel-animate">' +
      '<div class="si-detail-card" style="--card-accent:' +
      activeStage.color +
      '">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(activeStage.code + ui.typicalPlantKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(activeStage.name + ' (' + activeStage.horizon + ')') +
      '</h4>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeStage.typicalState) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-detail-card" style="--card-accent:var(--si-magenta)">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(ui.hiddenBottleneckKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(ui.hiddenBottleneckHeading) +
      '</h4>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeStage.hiddenBottleneck) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-detail-card" style="--card-accent:var(--si-amber)">' +
      '<div>' +
      '<div class="si-detail-kicker">' +
      escapeHtml(ui.practicalDeliverableKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(ui.practicalDeliverableHeading) +
      '</h4>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeStage.deliverable) +
      '</p>' +
      '</div>' +
      '<div class="si-ig-btn-row">' +
      '<button type="button" class="si-ig-btn si-ig-btn--amber" data-contact-topic="' +
      escapeHtml(ui.assessStageTopicPrefix + activeStage.code + ' ' + activeStage.name + ')') +
      '">' +
      escapeHtml(ui.assessStageBtn) +
      '</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    root.querySelectorAll('[data-axis-idx]').forEach(function (el) {
      const selectFn = function () {
        const idx = parseInt(el.getAttribute('data-axis-idx'), 10);
        if (!Number.isNaN(idx) && idx !== state1.axisIndex) {
          state1.axisIndex = idx;
          renderAxesAcatech(root);
        }
      };
      el.addEventListener('click', selectFn);
      if (el.tagName.toLowerCase() === 'g') bindKeyboardActivation(el, selectFn);
    });

    root.querySelectorAll('[data-acatech-stage]').forEach(function (el) {
      const selectFn = function () {
        const st = parseInt(el.getAttribute('data-acatech-stage'), 10);
        if (!Number.isNaN(st) && st !== state1.acatechStage) {
          state1.acatechStage = st;
          renderAxesAcatech(root);
        }
      };
      el.addEventListener('click', selectFn);
      if (el.tagName.toLowerCase() === 'g') bindKeyboardActivation(el, selectFn);
    });

    root.querySelectorAll('[data-open-portfolio]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPortfolioApp(btn.getAttribute('data-open-portfolio'), 'axes_acatech');
      });
    });

    root.querySelectorAll('[data-contact-topic]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        triggerContactTopic(btn.getAttribute('data-contact-topic'), 'axes_acatech');
      });
    });
  }

  /* ==========================================================================
     2. RENDER: #infographic-architecture-stack
     ========================================================================== */
  function buildArchitectureSvg(d, activeId) {
    const ui = d.ui;
    const CX = 196;
    const HW = 132;
    const HH = 28;
    const THICK = 7;
    const TOP = 70;
    const PITCH = 80;
    const count = d.layers.length;
    const busTop = TOP - 20;
    const busBottom = TOP + (count - 1) * PITCH + 2 * HH + THICK + 22;

    const layersSvg = d.layers
      .map(function (layer, idx) {
        const isSelected = layer.id === activeId;
        const y0 = TOP + idx * PITCH;
        const ym = y0 + HH;
        const yb = y0 + 2 * HH;
        const edgeOpacity = isSelected ? 1 : 0.55;
        const edgeWidth = isSelected ? 1.2 : 0.8;
        const topFace = CX + ',' + y0 + ' ' + (CX + HW) + ',' + ym + ' ' + CX + ',' + yb + ' ' + (CX - HW) + ',' + ym;
        const insetK = 0.62;
        const inset =
          CX + ',' + svgNum(ym - HH * insetK) + ' ' + svgNum(CX + HW * insetK) + ',' + ym + ' ' + CX + ',' +
          svgNum(ym + HH * insetK) + ' ' + svgNum(CX - HW * insetK) + ',' + ym;

        const labels = (layer.nodes || []).map(function (n) {
          return String(n || '').split('(')[0].trim();
        });
        const shown = labels.slice(0, 3);
        const extra = labels.length - shown.length;

        const chips = [-66, 0, 66]
          .map(function (dx) {
            return (
              '<circle cx="' + (CX + dx) + '" cy="' + ym + '" r="' + (isSelected ? 2.8 : 2.2) + '" fill="' +
              (isSelected ? layer.color : 'var(--si-svg-plate)') + '" stroke="' + layer.color + '" stroke-width="0.8"/>' +
              (isSelected
                ? '<line x1="' + (CX + dx) + '" y1="' + (ym - 3) + '" x2="' + (CX + dx) + '" y2="' + (ym - 12) +
                  '" stroke="' + layer.color + '" stroke-width="0.7"/>'
                : '')
            );
          })
          .join('');

        const detail = isSelected
          ? svgText(358, ym - 13, layer.title, { fill: 'var(--si-svg-ink-strong)', font: SVG_FONT_D, size: 11.6, weight: 500 }) +
            shown
              .map(function (label, li) {
                const isLast = li === shown.length - 1 && extra > 0;
                return (
                  '<rect x="358" y="' + (ym - 3 + li * 12.5) + '" width="3" height="3" fill="' + layer.color + '"/>' +
                  svgText(366, ym + 1 + li * 12.5, label + (isLast ? '  +' + extra : ''), {
                    fill: 'var(--si-svg-ink-metallic)', font: SVG_FONT_M, size: 8.6
                  })
                );
              })
              .join('')
          : svgText(358, ym + 4, layer.title, {
              fill: 'var(--si-svg-ink-metallic)', font: SVG_FONT_D, size: 11.2, weight: 400, opacity: '0.82'
            });

        return (
          '<g class="si-svg-node" role="button" tabindex="0" aria-label="' +
          escapeHtml(ui.archLayerWord + layer.num + ': ' + layer.title) +
          '" data-layer-id="' + layer.id + '">' +
          '<rect x="0" y="' + (y0 - 8) + '" width="636" height="' + (2 * HH + THICK + 16) + '" fill="transparent"/>' +
          /* faces laterais (espessura da placa) */
          '<polygon points="' + (CX - HW) + ',' + ym + ' ' + CX + ',' + yb + ' ' + CX + ',' + (yb + THICK) + ' ' + (CX - HW) + ',' + (ym + THICK) +
          '" fill="var(--si-svg-plate)" stroke="' + layer.color + '" stroke-width="0.7" stroke-opacity="' + edgeOpacity + '"/>' +
          '<polygon points="' + (CX - HW) + ',' + ym + ' ' + CX + ',' + yb + ' ' + CX + ',' + (yb + THICK) + ' ' + (CX - HW) + ',' + (ym + THICK) +
          '" fill="' + layer.color + '" fill-opacity="' + (isSelected ? 0.3 : 0.1) + '"/>' +
          '<polygon points="' + CX + ',' + yb + ' ' + (CX + HW) + ',' + ym + ' ' + (CX + HW) + ',' + (ym + THICK) + ' ' + CX + ',' + (yb + THICK) +
          '" fill="var(--si-svg-plate)" stroke="' + layer.color + '" stroke-width="0.7" stroke-opacity="' + edgeOpacity + '"/>' +
          '<polygon points="' + CX + ',' + yb + ' ' + (CX + HW) + ',' + ym + ' ' + (CX + HW) + ',' + (ym + THICK) + ' ' + CX + ',' + (yb + THICK) +
          '" fill="' + layer.color + '" fill-opacity="' + (isSelected ? 0.16 : 0.05) + '"/>' +
          /* face superior */
          '<polygon points="' + topFace + '" fill="' + (isSelected ? 'var(--si-svg-plate-active)' : 'var(--si-svg-plate)') +
          '" stroke="' + layer.color + '" stroke-width="' + edgeWidth + '" stroke-opacity="' + edgeOpacity + '" stroke-linejoin="round"/>' +
          '<polygon points="' + topFace + '" fill="' + layer.color + '" fill-opacity="' + (isSelected ? 0.16 : 0.035) + '"/>' +
          '<polygon points="' + inset + '" fill="none" stroke="' + layer.color + '" stroke-width="0.5" stroke-dasharray="1.5 3.5" stroke-opacity="' +
          (isSelected ? 0.8 : 0.4) + '"/>' +
          '<line x1="' + (CX - 66) + '" y1="' + ym + '" x2="' + (CX + 66) + '" y2="' + ym + '" stroke="' + layer.color +
          '" stroke-width="0.5" stroke-opacity="' + (isSelected ? 0.8 : 0.35) + '"/>' +
          chips +
          /* numeral + guias */
          svgText(20, ym + 7, layer.num, {
            fill: layer.color, font: SVG_FONT_D, size: 20, weight: 300, opacity: isSelected ? '1' : '0.72'
          }) +
          '<line x1="48" y1="' + ym + '" x2="' + (CX - HW - 4) + '" y2="' + ym + '" stroke="' + layer.color +
          '" stroke-width="0.6" stroke-opacity="' + (isSelected ? 0.9 : 0.35) + '"/>' +
          '<line x1="' + (CX + HW + 4) + '" y1="' + ym + '" x2="350" y2="' + ym + '" stroke="' + layer.color +
          '" stroke-width="0.6" stroke-opacity="' + (isSelected ? 0.9 : 0.35) + '"' + (isSelected ? '' : ' stroke-dasharray="1.5 3"') + '/>' +
          (isSelected ? '<circle cx="350" cy="' + ym + '" r="1.8" fill="' + layer.color + '"/>' : '') +
          detail +
          '</g>'
        );
      })
      .join('');

    return (
      '<svg class="si-ig-svg" viewBox="0 0 636 606" role="img" aria-label="' +
      escapeHtml(ui.archSvgAria) +
      '">' +
      '<defs>' +
      '<linearGradient id="siBusUp" x1="0" y1="' + busBottom + '" x2="0" y2="' + busTop + '" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#429a8e"/>' +
      '<stop offset="0.45" stop-color="#1db7c4"/>' +
      '<stop offset="0.78" stop-color="#c63368"/>' +
      '<stop offset="1" stop-color="#eca94c"/>' +
      '</linearGradient>' +
      '</defs>' +
      svgText(318, 18, ui.archTopCaption, {
        anchor: 'middle', fill: 'var(--si-svg-ink-muted)', font: SVG_FONT_M, size: 8.4, spacing: 0.9
      }) +
      /* barramento vertical: visível apenas entre as placas */
      '<line x1="' + CX + '" y1="' + busBottom + '" x2="' + CX + '" y2="' + busTop + '" stroke="var(--si-svg-rail)" stroke-width="2.4" stroke-linecap="round"/>' +
      '<line x1="' + CX + '" y1="' + busBottom + '" x2="' + CX + '" y2="' + busTop + '" stroke="url(#siBusUp)" stroke-width="1.1" class="si-svg-flow--reverse"/>' +
      '<path d="M' + (CX - 3.5) + ' ' + (busTop + 6) + 'L' + CX + ' ' + busTop + 'L' + (CX + 3.5) + ' ' + (busTop + 6) +
      '" fill="none" stroke="#eca94c" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      svgText(CX, busTop - 8, ui.archBusRight, {
        anchor: 'middle', fill: 'var(--si-amber)', font: SVG_FONT_M, size: 8.4, weight: 500, spacing: 0.9
      }) +
      svgText(CX, busBottom + 14, ui.archBusLeft, {
        anchor: 'middle', fill: 'var(--si-cyan)', font: SVG_FONT_M, size: 8.4, weight: 500, spacing: 0.9
      }) +
      layersSvg +
      svgText(318, 596, ui.archBottomCaption, {
        anchor: 'middle', fill: 'var(--si-svg-ink-subtle)', font: SVG_FONT_M, size: 8.4, spacing: 0.8
      }) +
      '</svg>'
    );
  }

  function renderArchitectureStack(root) {
    const d = dict();
    const ui = d.ui;
    const activeLayer =
      d.layers.find(function (l) {
        return l.id === state2.activeLayerId;
      }) || d.layers[2];

    const stackButtons = d.layers
      .map(function (layer) {
        const isSelected = layer.id === state2.activeLayerId;
        return (
          '<button type="button" class="si-arch-layer-btn ' +
          (isSelected ? 'is-active' : '') +
          '" style="--layer-color:' +
          layer.color +
          '" data-layer-select="' +
          layer.id +
          '">' +
          '<span class="si-arch-layer-code">L-' +
          layer.num +
          '</span>' +
          '<span>' +
          '<span class="si-arch-layer-title">' +
          escapeHtml(layer.title) +
          '</span>' +
          '<span class="si-arch-layer-sub">' +
          escapeHtml(layer.subtitle) +
          '</span>' +
          '</span>' +
          '<span class="si-arch-layer-zone">' +
          escapeHtml(layer.zone) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    const techChips = activeLayer.nodes
      .map(function (node) {
        return '<span class="si-tech-chip">' + escapeHtml(node) + '</span>';
      })
      .join('');

    const appBtns = activeLayer.apps
      .map(function (slug) {
        const meta = PORTFOLIO_MAP[slug];
        if (!meta) return '';
        return (
          '<button type="button" class="si-ig-btn si-ig-btn--portfolio" data-arch-portfolio="' +
          slug +
          '">' +
          escapeHtml(ui.evidenceBtnPrefix + meta.name) +
          ' ↗</button>'
        );
      })
      .join('');

    root.innerHTML =
      '<div class="si-ig-shell">' +
      '<div class="si-ig-frame">' +
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.archEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.archTitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.archSubtitle) +
      '</p>' +
      '</div>' +
      '<div class="si-ig-helper-hint">' +
      escapeHtml(ui.archHint) +
      '</div>' +
      '</div>' +
      '<div class="si-arch-layout">' +
      '<div class="si-ig-canvas-box">' +
      buildArchitectureSvg(d, state2.activeLayerId) +
      '</div>' +
      readNote(ui.readArch) +
      '<div>' +
      '<div class="si-arch-stack-list" role="tablist" aria-label="' +
      escapeHtml(ui.archEyebrow) +
      '">' +
      stackButtons +
      '</div>' +
      '<div class="si-arch-inspector si-panel-animate" style="border-color:' +
      activeLayer.color +
      '">' +
      '<div class="si-detail-kicker" style="--card-accent:' +
      activeLayer.color +
      '">' +
      escapeHtml(ui.archLayerWord + activeLayer.num + ui.archSelectedKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(activeLayer.title) +
      '</h4>' +
      '<div class="si-chip-cloud">' +
      techChips +
      '</div>' +
      '<p class="si-arch-bridge-note">' +
      activeLayer.bridgeText +
      '</p>' +
      (appBtns ? '<div class="si-ig-btn-row">' + appBtns + '</div>' : '') +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    const updateLayer = function (id) {
      if (id && id !== state2.activeLayerId) {
        state2.activeLayerId = id;
        renderArchitectureStack(root);
      }
    };

    root.querySelectorAll('[data-layer-id]').forEach(function (node) {
      const id = node.getAttribute('data-layer-id');
      node.addEventListener('click', function () {
        updateLayer(id);
      });
      node.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover: hover) and (min-width: 1081px)').matches) {
          updateLayer(id);
        }
      });
      bindKeyboardActivation(node, function () {
        updateLayer(id);
      });
    });

    root.querySelectorAll('[data-layer-select]').forEach(function (btn) {
      const id = btn.getAttribute('data-layer-select');
      btn.addEventListener('click', function () {
        updateLayer(id);
      });
    });

    root.querySelectorAll('[data-arch-portfolio]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPortfolioApp(btn.getAttribute('data-arch-portfolio'), 'architecture_stack');
      });
    });
  }

  /* ==========================================================================
     3. RENDER: #infographic-pain-diagnostic
     ========================================================================== */
  function buildPainRouteSvg(d, pain) {
    const ui = d.ui;
    const CARD_W = 168;
    const CARD_Y = 26;
    const CARD_H = 98;
    const RAIL_Y = CARD_Y + CARD_H / 2;
    const stations = [
      { x: 105, code: '01', icon: 'alert', title: ui.routeSt1, sub: pain.code },
      { x: 308, code: '02', icon: 'layers', title: ui.routeSt2, sub: ui.routeSt2Sub },
      { x: 512, code: '03', icon: 'branch', title: ui.routeSt3, sub: ui.axisWord + pain.axesCodes.join(' + ') },
      { x: 715, code: '04', icon: 'target', title: ui.routeSt4, sub: ui.routeSt4Sub }
    ];

    const connectors = stations
      .slice(0, -1)
      .map(function (st, idx) {
        const xa = st.x + CARD_W / 2;
        const xb = stations[idx + 1].x - CARD_W / 2;
        const mx = (xa + xb) / 2;
        return (
          '<line x1="' + xa + '" y1="' + RAIL_Y + '" x2="' + xb + '" y2="' + RAIL_Y + '" stroke="var(--si-svg-rail)" stroke-width="1"/>' +
          '<line x1="' + xa + '" y1="' + RAIL_Y + '" x2="' + xb + '" y2="' + RAIL_Y + '" stroke="' + pain.accent +
          '" stroke-width="1" stroke-dasharray="2 4" class="si-svg-flow--fast"/>' +
          '<circle cx="' + xa + '" cy="' + RAIL_Y + '" r="2" fill="var(--si-svg-plate)" stroke="' + pain.accent + '" stroke-width="0.8"/>' +
          '<path d="M' + svgNum(mx - 2.5) + ' ' + (RAIL_Y - 4) + 'L' + svgNum(mx + 2.5) + ' ' + RAIL_Y + 'L' + svgNum(mx - 2.5) + ' ' + (RAIL_Y + 4) +
          '" fill="none" stroke="' + pain.accent + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>'
        );
      })
      .join('');

    const nodesSvg = stations
      .map(function (st, idx) {
        const active = idx >= 2;
        const x0 = st.x - CARD_W / 2;
        return (
          '<g>' +
          '<rect x="' + x0 + '" y="' + CARD_Y + '" width="' + CARD_W + '" height="' + CARD_H + '" rx="10" fill="var(--si-svg-plate-alt)" stroke="' +
          (active ? pain.accent : 'var(--si-svg-baseline)') + '" stroke-width="' + (active ? 1 : 0.8) + '"/>' +
          (active
            ? '<rect x="' + x0 + '" y="' + CARD_Y + '" width="' + CARD_W + '" height="' + CARD_H + '" rx="10" fill="' + pain.accent + '" fill-opacity="0.05"/>'
            : '') +
          '<path d="M' + (x0 + 14) + ' ' + CARD_Y + 'h24" stroke="' + pain.accent + '" stroke-width="1.5"/>' +
          svgIcon(st.icon, x0 + 24, CARD_Y + 27, 15, pain.accent, 1.05) +
          svgText(x0 + 40, CARD_Y + 30.5, st.title, {
            fill: 'var(--si-svg-ink-muted)', font: SVG_FONT_M, size: 8.6, weight: 500, spacing: 1
          }) +
          svgText(x0 + CARD_W - 14, CARD_Y + 30.5, st.code, {
            anchor: 'end', fill: pain.accent, font: SVG_FONT_M, size: 8.6, opacity: '0.85'
          }) +
          '<line x1="' + (x0 + 14) + '" y1="' + (CARD_Y + 44) + '" x2="' + (x0 + CARD_W - 14) + '" y2="' + (CARD_Y + 44) +
          '" stroke="var(--si-svg-baseline)" stroke-width="0.5" opacity="0.7"/>' +
          svgText(st.x, CARD_Y + 74, st.sub, {
            anchor: 'middle', fill: 'var(--si-svg-ink-strong)', font: SVG_FONT_D, size: 12.6, weight: 500
          }) +
          '</g>'
        );
      })
      .join('');

    return (
      '<svg class="si-ig-svg si-ig-svg--wide" viewBox="0 0 820 150" role="img" aria-label="' +
      escapeHtml(ui.routeSvgAria) +
      '">' +
      nodesSvg +
      connectors +
      '</svg>'
    );
  }

  function renderPainDiagnostic(root) {
    const d = dict();
    const ui = d.ui;
    const filteredPains =
      state3.category === 'all'
        ? d.pains
        : d.pains.filter(function (p) {
            return p.category === state3.category;
          });

    let activePain = filteredPains.find(function (p) {
      return p.id === state3.activePainId;
    });
    if (!activePain) {
      activePain = filteredPains[0] || d.pains[0];
      state3.activePainId = activePain.id;
    }

    const filterPills = d.painCategories
      .map(function (cat) {
        const count =
          cat.id === 'all'
            ? d.pains.length
            : d.pains.filter(function (p) {
                return p.category === cat.id;
              }).length;
        return (
          '<button type="button" class="si-ig-pill ' +
          (state3.category === cat.id ? 'is-active' : '') +
          '" data-pain-cat="' +
          cat.id +
          '">' +
          '<span>' +
          escapeHtml(cat.label) +
          '</span>' +
          '<span class="si-ig-pill-num">' +
          count +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    const painCards = filteredPains
      .map(function (p) {
        const isSelected = p.id === activePain.id;
        return (
          '<button type="button" class="si-pain-card ' +
          (isSelected ? 'is-active' : '') +
          '" style="--pain-accent:' +
          p.accent +
          '" data-pain-id="' +
          p.id +
          '">' +
          '<div class="si-pain-card-top">' +
          '<span class="si-pain-code">' +
          escapeHtml(p.code) +
          '</span>' +
          '<span class="si-pain-axis-tag">' +
          escapeHtml(ui.axisWord + p.axesCodes.join(' + ')) +
          '</span>' +
          '</div>' +
          '<p class="si-pain-quote">' +
          escapeHtml(p.quote) +
          '</p>' +
          '</button>'
        );
      })
      .join('');

    const appMeta = activePain.appSlug ? PORTFOLIO_MAP[activePain.appSlug] : null;

    root.innerHTML =
      '<div class="si-ig-shell">' +
      '<div class="si-ig-frame">' +
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow" style="--eyebrow-color:var(--si-magenta)"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.painEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.painTitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.painSubtitle) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-ig-pill-row" role="tablist" aria-label="' +
      escapeHtml(ui.painFilterAria) +
      '">' +
      filterPills +
      '</div>' +
      '<div class="si-pain-layout">' +
      '<div class="si-pain-list" role="listbox" aria-label="' +
      escapeHtml(ui.painListAria) +
      '">' +
      painCards +
      '</div>' +
      '<div class="si-pain-route-panel si-panel-animate" style="border-color:' +
      activePain.accent +
      '">' +
      '<div class="si-detail-kicker" style="--card-accent:' +
      activePain.accent +
      '">' +
      escapeHtml(ui.routeHeaderPrefix + activePain.code) +
      '</div>' +
      '<h4 class="si-detail-heading" style="font-size:1.14rem;margin-bottom:0.85rem">' +
      escapeHtml(activePain.quote) +
      '</h4>' +
      '<div class="si-ig-canvas-box" style="padding:0.65rem 0.85rem">' +
      buildPainRouteSvg(d, activePain) +
      '</div>' +
      readNote(ui.readPain) +
      '<div class="si-route-steps-grid">' +
      '<div class="si-route-step-box">' +
      '<span class="si-route-step-label" style="--step-accent:var(--si-magenta)">' +
      escapeHtml(ui.step1Label) +
      '</span>' +
      '<p class="si-route-step-text">' +
      escapeHtml(activePain.rootSymptom) +
      '</p>' +
      '</div>' +
      '<div class="si-route-step-box">' +
      '<span class="si-route-step-label" style="--step-accent:' +
      activePain.accent +
      '">' +
      escapeHtml(ui.step2Label) +
      '</span>' +
      '<p class="si-route-step-text">' +
      escapeHtml(activePain.solutionArch) +
      '</p>' +
      '</div>' +
      '<div class="si-route-step-box">' +
      '<span class="si-route-step-label" style="--step-accent:var(--si-cyan)">' +
      escapeHtml(ui.step3Label) +
      '</span>' +
      '<p class="si-route-step-text"><strong>' +
      escapeHtml(activePain.axesLabel) +
      '</strong>' +
      escapeHtml(ui.step3Suffix) +
      '</p>' +
      '</div>' +
      '<div class="si-route-step-box">' +
      '<span class="si-route-step-label" style="--step-accent:var(--si-amber)">' +
      escapeHtml(ui.step4Label) +
      '</span>' +
      '<p class="si-route-step-text">' +
      escapeHtml(activePain.impactNext) +
      '</p>' +
      '</div>' +
      '</div>' +
      (activePain.complianceNote
        ? '<div class="si-compliance-note">◈ ' + escapeHtml(activePain.complianceNote) + '</div>'
        : '') +
      '<div class="si-ig-btn-row" style="margin-top:1.1rem">' +
      '<button type="button" class="si-ig-btn si-ig-btn--primary" data-pain-contact="' +
      escapeHtml(activePain.contactTopic) +
      '">' +
      escapeHtml(ui.solvePainBtn) +
      '</button>' +
      (appMeta
        ? '<button type="button" class="si-ig-btn si-ig-btn--portfolio" data-pain-portfolio="' +
          activePain.appSlug +
          '">' +
          escapeHtml(ui.openRelatedAppBtn + appMeta.name) +
          ' ↗</button>'
        : '') +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    root.querySelectorAll('[data-pain-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.getAttribute('data-pain-cat');
        if (cat && cat !== state3.category) {
          state3.category = cat;
          renderPainDiagnostic(root);
        }
      });
    });

    root.querySelectorAll('[data-pain-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pid = btn.getAttribute('data-pain-id');
        if (pid && pid !== state3.activePainId) {
          state3.activePainId = pid;
          pushTrackingEvent('diagnostic_pain_select', { pain_id: pid });
          renderPainDiagnostic(root);
          if (window.innerWidth <= 1080) {
            const panel = root.querySelector('.si-pain-route-panel');
            if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    });

    root.querySelectorAll('[data-pain-contact]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        triggerContactTopic(btn.getAttribute('data-pain-contact'), 'pain_diagnostic');
      });
    });

    root.querySelectorAll('[data-pain-portfolio]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPortfolioApp(btn.getAttribute('data-pain-portfolio'), 'pain_diagnostic');
      });
    });
  }

  /* ==========================================================================
     4. RENDER: #infographic-governance-formats
     ========================================================================== */
  function buildDualGovernanceSvg(d, focusMode) {
    const ui = d.ui;
    const iso56Opacity = focusMode === '42001' ? '0.36' : '1';
    const iso42Opacity = focusMode === '56002' ? '0.36' : '1';
    const TEAL = '#429a8e';
    const CYAN = '#1db7c4';
    const AMBER = '#eca94c';
    const CORE_X = 510;
    const CORE_Y = 134;

    function itemBox(x, y, w, color, label) {
      return (
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="36" rx="8" fill="' + color + '" fill-opacity="0.06" stroke="' +
        color + '" stroke-opacity="0.42" stroke-width="0.8"/>' +
        '<circle cx="' + (x + 18) + '" cy="' + (y + 18) + '" r="7.5" fill="none" stroke="' + color + '" stroke-width="0.8" stroke-opacity="0.7"/>' +
        svgIcon('check', x + 18, y + 18, 9, color, 1.1) +
        svgText(x + 33, y + 21.5, label, { fill: 'var(--si-svg-ink-metallic)', size: 10.2, weight: 500 })
      );
    }

    /* Ideias entrando no funil: muitas no topo, poucas validadas na saída */
    const ideaDots = [
      [52, 96], [64, 91], [77, 97], [89, 90], [101, 96], [113, 91], [126, 97], [138, 92]
    ]
      .map(function (p, i) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.5" fill="' + (i % 3 === 0 ? CYAN : TEAL) + '" fill-opacity="' + (0.5 + (i % 3) * 0.2) + '"/>';
      })
      .join('');

    let trailTicks = '';
    for (let x = 748; x <= 980; x += 14.5) {
      trailTicks += '<line x1="' + svgNum(x) + '" y1="214" x2="' + svgNum(x) + '" y2="218"/>';
    }

    return (
      '<svg class="si-ig-svg si-ig-svg--wide" viewBox="0 0 1020 268" role="img" aria-label="' +
      escapeHtml(ui.govSvgAria) +
      '">' +
      /* LEFT WING: ISO 56002 */
      '<g opacity="' + iso56Opacity + '" class="si-svg-node" role="button" tabindex="0" aria-label="' +
      escapeHtml(ui.lens56002) + '" data-gov-lens="56002">' +
      '<rect x="20" y="20" width="384" height="228" rx="12" fill="var(--si-svg-plate)" stroke="' + TEAL + '" stroke-width="0.9"/>' +
      '<path d="M36 20h34" stroke="' + TEAL + '" stroke-width="1.6"/>' +
      svgText(40, 49, ui.svg56002Top, { fill: 'var(--si-teal)', font: SVG_FONT_M, size: 9.4, weight: 500, spacing: 0.9 }) +
      svgText(40, 71, ui.svg56002Title, { fill: 'var(--si-svg-ink-primary)', font: SVG_FONT_D, size: 13.4, weight: 500 }) +
      '<line x1="40" y1="84" x2="384" y2="84" stroke="var(--si-svg-baseline)" stroke-width="0.5" opacity="0.7"/>' +
      ideaDots +
      '<polygon points="46,106 144,106 126,142 64,142" fill="' + TEAL + '" fill-opacity="0.1" stroke="' + TEAL + '" stroke-width="0.9" stroke-linejoin="round"/>' +
      '<polygon points="66,148 124,148 110,180 80,180" fill="' + CYAN + '" fill-opacity="0.12" stroke="' + CYAN + '" stroke-width="0.9" stroke-linejoin="round"/>' +
      svgText(95, 127, ui.svg56002Funnel1, { anchor: 'middle', fill: 'var(--si-svg-ink-strong)', font: SVG_FONT_M, size: 7.8, weight: 500, spacing: 0.5 }) +
      svgText(95, 167, ui.svg56002Funnel2, { anchor: 'middle', fill: 'var(--si-svg-ink-strong)', font: SVG_FONT_M, size: 7.8, weight: 500, spacing: 0.5 }) +
      '<line x1="95" y1="180" x2="95" y2="196" stroke="' + CYAN + '" stroke-width="0.8" stroke-dasharray="2 3"/>' +
      '<circle cx="95" cy="206" r="9" fill="' + CYAN + '" fill-opacity="0.12" stroke="' + CYAN + '" stroke-width="0.9"/>' +
      svgIcon('check', 95, 206, 10, 'var(--si-svg-ink-strong)', 1.1) +
      itemBox(172, 104, 212, TEAL, ui.svg56002Box1) +
      itemBox(172, 150, 212, TEAL, ui.svg56002Box2) +
      /* ciclo contínuo: captura -> triagem -> piloto -> escala */
      '<line x1="176" y1="216" x2="380" y2="216" stroke="var(--si-svg-rail)" stroke-width="0.8"/>' +
      '<line x1="176" y1="216" x2="380" y2="216" stroke="' + TEAL + '" stroke-width="0.9" stroke-dasharray="2 4" class="si-svg-flow"/>' +
      [176, 244, 312, 380]
        .map(function (x, i) {
          return '<circle cx="' + x + '" cy="216" r="' + (i === 3 ? 3.4 : 2.6) + '" fill="' + (i === 3 ? TEAL : 'var(--si-svg-plate)') +
            '" stroke="' + TEAL + '" stroke-width="0.9"/>';
        })
        .join('') +
      '</g>' +
      /* conectores ao núcleo */
      '<line x1="404" y1="' + CORE_Y + '" x2="' + (CORE_X - 60) + '" y2="' + CORE_Y + '" stroke="' + TEAL + '" stroke-width="1" class="si-svg-flow--fast"/>' +
      '<line x1="616" y1="' + CORE_Y + '" x2="' + (CORE_X + 60) + '" y2="' + CORE_Y + '" stroke="' + AMBER + '" stroke-width="1" class="si-svg-flow--reverse"/>' +
      /* CENTER CORE */
      '<g class="si-svg-node" role="button" tabindex="0" aria-label="' + escapeHtml(ui.lensBoth) + '" data-gov-lens="both">' +
      '<circle cx="' + CORE_X + '" cy="' + CORE_Y + '" r="66" fill="none" stroke="var(--si-svg-baseline)" stroke-width="0.7" stroke-dasharray="2 5" class="si-svg-flow"/>' +
      '<circle cx="' + CORE_X + '" cy="' + CORE_Y + '" r="56" fill="var(--si-svg-plate-alt)"/>' +
      '<path d="M' + CORE_X + ' ' + (CORE_Y - 56) + 'A56 56 0 0 0 ' + CORE_X + ' ' + (CORE_Y + 56) + '" fill="none" stroke="' + TEAL + '" stroke-width="1.3"/>' +
      '<path d="M' + CORE_X + ' ' + (CORE_Y - 56) + 'A56 56 0 0 1 ' + CORE_X + ' ' + (CORE_Y + 56) + '" fill="none" stroke="' + AMBER + '" stroke-width="1.3"/>' +
      '<circle cx="' + CORE_X + '" cy="' + CORE_Y + '" r="48" fill="none" stroke="var(--si-svg-baseline)" stroke-width="0.5" opacity="0.6"/>' +
      '<circle cx="' + CORE_X + '" cy="' + (CORE_Y - 56) + '" r="2.4" fill="var(--si-svg-ink-strong)"/>' +
      '<circle cx="' + CORE_X + '" cy="' + (CORE_Y + 56) + '" r="2.4" fill="var(--si-svg-ink-strong)"/>' +
      svgText(CORE_X, CORE_Y - 13, ui.svgCoreTop, { anchor: 'middle', fill: 'var(--si-amber)', font: SVG_FONT_M, size: 8.4, weight: 500, spacing: 1 }) +
      svgText(CORE_X, CORE_Y + 6, ui.svgCoreMain, { anchor: 'middle', fill: 'var(--si-svg-ink-strong)', font: SVG_FONT_D, size: 12.4, weight: 500 }) +
      svgText(CORE_X, CORE_Y + 23, ui.svgCoreSub, { anchor: 'middle', fill: 'var(--si-svg-ink-muted)', size: 9.2 }) +
      '</g>' +
      /* RIGHT WING: ISO 42001 */
      '<g opacity="' + iso42Opacity + '" class="si-svg-node" role="button" tabindex="0" aria-label="' +
      escapeHtml(ui.lens42001) + '" data-gov-lens="42001">' +
      '<rect x="616" y="20" width="384" height="228" rx="12" fill="var(--si-svg-plate)" stroke="' + AMBER + '" stroke-width="0.9"/>' +
      '<path d="M632 20h34" stroke="' + AMBER + '" stroke-width="1.6"/>' +
      svgText(636, 49, ui.svg42001Top, { fill: 'var(--si-amber)', font: SVG_FONT_M, size: 9.4, weight: 500, spacing: 0.9 }) +
      svgText(636, 71, ui.svg42001Title, { fill: 'var(--si-svg-ink-primary)', font: SVG_FONT_D, size: 13.4, weight: 500 }) +
      '<line x1="636" y1="84" x2="980" y2="84" stroke="var(--si-svg-baseline)" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M686 100L722 111V146C722 168 705 181 686 190C667 181 650 168 650 146V111Z" fill="' + AMBER + '" fill-opacity="0.08" stroke="' + AMBER + '" stroke-width="0.9" stroke-linejoin="round"/>' +
      '<path d="M686 110L713 118.500V146C713 162 700 172 686 179C672 172 659 162 659 146V118.500Z" fill="none" stroke="' + AMBER + '" stroke-width="0.5" stroke-dasharray="1.5 3" opacity="0.8"/>' +
      svgIcon('check', 686, 143, 20, 'var(--si-svg-ink-strong)', 1.2) +
      svgText(686, 208, 'AUDIT', { anchor: 'middle', fill: 'var(--si-amber)', font: SVG_FONT_M, size: 8, weight: 500, spacing: 2 }) +
      itemBox(748, 104, 232, AMBER, ui.svg42001Box1) +
      itemBox(748, 150, 232, AMBER, ui.svg42001Box2) +
      /* trilha auditável: registros em sequência */
      '<line x1="748" y1="216" x2="980" y2="216" stroke="var(--si-svg-rail)" stroke-width="0.8"/>' +
      '<g stroke="' + AMBER + '" stroke-width="0.6" opacity="0.6">' + trailTicks + '</g>' +
      [777, 835, 893, 951]
        .map(function (x) {
          return '<rect x="' + (x - 3) + '" y="208" width="6" height="6" rx="1" fill="var(--si-svg-plate)" stroke="' + AMBER + '" stroke-width="0.9"/>';
        })
        .join('') +
      '</g>' +
      '</svg>'
    ).replace(/\.500/g, '.5');
  }

  function buildFormatsTrackSvg(d, activeFmtId) {
    const ui = d.ui;
    const RAIL_Y = 84;
    const FMT_ICONS = ['search', 'flag', 'code', 'compass', 'users'];
    const first = d.formats[0];
    const last = d.formats[d.formats.length - 1];
    const activeIndex = Math.max(
      0,
      d.formats.findIndex(function (f) {
        return f.id === activeFmtId;
      })
    );

    let ticks = '';
    for (let x = first.cx; x <= last.cx; x += 19.25) {
      ticks += '<line x1="' + svgNum(x) + '" y1="' + (RAIL_Y - 2) + '" x2="' + svgNum(x) + '" y2="' + (RAIL_Y + 2) + '"/>';
    }

    const chevrons = d.formats
      .slice(0, -1)
      .map(function (fmt, idx) {
        const mx = (fmt.cx + d.formats[idx + 1].cx) / 2;
        return '<path d="M' + svgNum(mx - 3) + ' ' + (RAIL_Y - 4) + 'L' + svgNum(mx + 2) + ' ' + RAIL_Y + 'L' + svgNum(mx - 3) + ' ' + (RAIL_Y + 4) + '"/>';
      })
      .join('');

    const nodesMarkup = d.formats
      .map(function (fmt, idx) {
        const isSelected = fmt.id === activeFmtId;
        const r = isSelected ? 27 : 23;
        return (
          '<g class="si-svg-node" role="button" tabindex="0" aria-label="' +
          escapeHtml(ui.fmtWord + fmt.num + ': ' + fmt.name) + '" data-fmt-id="' + fmt.id + '">' +
          '<circle cx="' + fmt.cx + '" cy="' + RAIL_Y + '" r="44" fill="transparent"/>' +
          (isSelected
            ? '<circle cx="' + fmt.cx + '" cy="' + RAIL_Y + '" r="42" fill="' + fmt.color + '" fill-opacity="0.05"/>' +
              '<circle cx="' + fmt.cx + '" cy="' + RAIL_Y + '" r="35" fill="none" stroke="' + fmt.color +
              '" stroke-width="0.8" stroke-dasharray="2 5" class="si-svg-flow"/>'
            : '') +
          '<circle cx="' + fmt.cx + '" cy="' + RAIL_Y + '" r="' + r + '" fill="var(--si-svg-plate)" stroke="' + fmt.color +
          '" stroke-width="' + (isSelected ? 1.3 : 0.9) + '" stroke-opacity="' + (idx <= activeIndex ? 1 : 0.6) + '"/>' +
          '<circle cx="' + fmt.cx + '" cy="' + RAIL_Y + '" r="' + r + '" fill="' + fmt.color + '" fill-opacity="' + (isSelected ? 0.15 : 0.04) + '"/>' +
          svgIcon(FMT_ICONS[idx] || 'search', fmt.cx, RAIL_Y, isSelected ? 20 : 17, isSelected ? 'var(--si-svg-ink-strong)' : fmt.color, 1.1) +
          svgText(fmt.cx, RAIL_Y - 40, fmt.num, { anchor: 'middle', fill: fmt.color, font: SVG_FONT_M, size: 9.6, weight: 500, spacing: 1.5 }) +
          svgText(fmt.cx, RAIL_Y + 54, fmt.name, {
            anchor: 'middle',
            fill: isSelected ? 'var(--si-svg-ink-strong)' : 'var(--si-svg-ink-metallic)',
            font: SVG_FONT_D, size: 11.8, weight: 500
          }) +
          svgText(fmt.cx, RAIL_Y + 71, fmt.shortTag.split('•')[0].trim(), {
            anchor: 'middle', fill: isSelected ? fmt.color : 'var(--si-svg-ink-subtle)', font: SVG_FONT_M, size: 9.2
          }) +
          '</g>'
        );
      })
      .join('');

    return (
      '<svg class="si-ig-svg si-ig-svg--wide" viewBox="0 0 1000 172" role="img" aria-label="' +
      escapeHtml(ui.fmtEyebrow) +
      '">' +
      '<defs>' +
      '<linearGradient id="siFmtRail" x1="' + first.cx + '" y1="0" x2="' + last.cx + '" y2="0" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#1db7c4"/>' +
      '<stop offset="0.28" stop-color="#429a8e"/>' +
      '<stop offset="0.55" stop-color="#c63368"/>' +
      '<stop offset="0.8" stop-color="#db8a50"/>' +
      '<stop offset="1" stop-color="#eca94c"/>' +
      '</linearGradient>' +
      '</defs>' +
      svgText(500, 18, ui.fmtTrackCaption, {
        anchor: 'middle', fill: 'var(--si-svg-ink-muted)', font: SVG_FONT_M, size: 9.2, spacing: 1.1
      }) +
      '<line x1="' + first.cx + '" y1="' + RAIL_Y + '" x2="' + last.cx + '" y2="' + RAIL_Y + '" stroke="var(--si-svg-baseline)" stroke-width="0.8"/>' +
      '<g stroke="var(--si-svg-baseline)" stroke-width="0.6" opacity="0.7">' + ticks + '</g>' +
      '<line x1="' + first.cx + '" y1="' + RAIL_Y + '" x2="' + d.formats[activeIndex].cx + '" y2="' + RAIL_Y + '" stroke="url(#siFmtRail)" stroke-width="1.4"/>' +
      '<line x1="' + first.cx + '" y1="' + RAIL_Y + '" x2="' + last.cx + '" y2="' + RAIL_Y + '" stroke="url(#siFmtRail)" stroke-width="0.9" opacity="0.7" class="si-svg-flow"/>' +
      '<g fill="none" stroke="var(--si-svg-ink-muted)" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">' + chevrons + '</g>' +
      nodesMarkup +
      '</svg>'
    );
  }

  function renderGovernanceFormats(root) {
    const d = dict();
    const ui = d.ui;
    const activeFmt =
      d.formats.find(function (f) {
        return f.id === state4.formatId;
      }) || d.formats[0];
    const fmtAppMeta = activeFmt.appSlug ? PORTFOLIO_MAP[activeFmt.appSlug] : null;

    const lensPills = [
      { id: 'both', label: ui.lensBoth },
      { id: '56002', label: ui.lens56002 },
      { id: '42001', label: ui.lens42001 }
    ]
      .map(function (lens) {
        return (
          '<button type="button" class="si-ig-pill ' +
          (state4.govFocus === lens.id ? 'is-active' : '') +
          '" data-gov-lens="' +
          lens.id +
          '">' +
          escapeHtml(lens.label) +
          '</button>'
        );
      })
      .join('');

    const formatBtns = d.formats
      .map(function (fmt) {
        return (
          '<button type="button" class="si-format-step-btn ' +
          (fmt.id === state4.formatId ? 'is-active' : '') +
          '" style="--fmt-color:' +
          fmt.color +
          '" data-fmt-id="' +
          fmt.id +
          '">' +
          '<span class="si-format-num">' +
          escapeHtml(ui.fmtWord + fmt.num) +
          '</span>' +
          '<span class="si-format-name">' +
          escapeHtml(fmt.name) +
          '</span>' +
          '<span class="si-format-tag">' +
          escapeHtml(fmt.shortTag) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    root.innerHTML =
      '<div class="si-ig-shell">' +
      '<div class="si-ig-frame">' +
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow" style="--eyebrow-color:var(--si-teal)"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.govEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.govTitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.govSubtitle) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-ig-pill-row">' +
      lensPills +
      '</div>' +
      '<div class="si-ig-canvas-box">' +
      buildDualGovernanceSvg(d, state4.govFocus) +
      '</div>' +
      readNote(ui.readGov) +
      '<div class="si-gov-dual-grid">' +
      '<div class="si-gov-card ' +
      (state4.govFocus === '56002' ? 'is-highlighted' : '') +
      '" style="--gov-accent:var(--si-teal)">' +
      '<div class="si-gov-card-head">' +
      '<span class="si-gov-norm-badge">ISO 56002</span>' +
      '<span class="si-gov-domain">' +
      escapeHtml(ui.card56002Domain) +
      '</span>' +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(ui.card56002Heading) +
      '</h4>' +
      '<div class="si-gov-compare">' +
      '<div class="si-gov-before">' +
      '<span class="si-gov-state-label">' +
      escapeHtml(ui.card56002BeforeLabel) +
      '</span>' +
      escapeHtml(ui.card56002BeforeText) +
      '</div>' +
      '<div class="si-gov-after">' +
      '<span class="si-gov-state-label">' +
      escapeHtml(ui.card56002AfterLabel) +
      '</span>' +
      escapeHtml(ui.card56002AfterText) +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="si-gov-card ' +
      (state4.govFocus === '42001' ? 'is-highlighted' : '') +
      '" style="--gov-accent:var(--si-amber)">' +
      '<div class="si-gov-card-head">' +
      '<span class="si-gov-norm-badge">ISO 42001</span>' +
      '<span class="si-gov-domain">' +
      escapeHtml(ui.card42001Domain) +
      '</span>' +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(ui.card42001Heading) +
      '</h4>' +
      '<div class="si-gov-compare">' +
      '<div class="si-gov-before">' +
      '<span class="si-gov-state-label">' +
      escapeHtml(ui.card42001BeforeLabel) +
      '</span>' +
      escapeHtml(ui.card42001BeforeText) +
      '</div>' +
      '<div class="si-gov-after">' +
      '<span class="si-gov-state-label">' +
      escapeHtml(ui.card42001AfterLabel) +
      '</span>' +
      escapeHtml(ui.card42001AfterText) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="si-section-divider"></div>' +
      /* MODULE B */
      '<div class="si-ig-header">' +
      '<div class="si-ig-header-main">' +
      '<div class="si-ig-eyebrow" style="--eyebrow-color:var(--si-amber)"><span class="si-ig-eyebrow-dot"></span>' +
      escapeHtml(ui.fmtEyebrow) +
      '</div>' +
      '<h3 class="si-ig-title">' +
      escapeHtml(ui.fmtTitle) +
      '</h3>' +
      '<p class="si-ig-subtitle">' +
      escapeHtml(ui.fmtSubtitle) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="si-ig-canvas-box">' +
      buildFormatsTrackSvg(d, state4.formatId) +
      '</div>' +
      readNote(ui.readFormats) +
      '<div class="si-formats-strip" role="tablist" aria-label="' +
      escapeHtml(ui.fmtEyebrow) +
      '">' +
      formatBtns +
      '</div>' +
      '<div class="si-format-detail-panel si-panel-animate" style="border-color:' +
      activeFmt.color +
      '">' +
      '<div>' +
      '<div class="si-detail-kicker" style="--card-accent:' +
      activeFmt.color +
      '">' +
      escapeHtml(ui.fmtWord + activeFmt.num + ui.fmtWhenKicker) +
      '</div>' +
      '<h4 class="si-detail-heading">' +
      escapeHtml(activeFmt.name) +
      '</h4>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeFmt.whenToChoose) +
      '</p>' +
      '</div>' +
      '<div>' +
      '<div class="si-detail-kicker" style="--card-accent:' +
      activeFmt.color +
      '">' +
      escapeHtml(ui.fmtDeliverablesKicker) +
      '</div>' +
      '<ul class="si-detail-list" style="--card-accent:' +
      activeFmt.color +
      '">' +
      activeFmt.whatClientGets
        .map(function (item) {
          return '<li>' + escapeHtml(item) + '</li>';
        })
        .join('') +
      '</ul>' +
      '</div>' +
      '<div>' +
      '<div class="si-detail-kicker" style="--card-accent:' +
      activeFmt.color +
      '">' +
      escapeHtml(ui.fmtCommitmentKicker) +
      '</div>' +
      '<p class="si-detail-body">' +
      escapeHtml(activeFmt.commitmentProfile) +
      '</p>' +
      '<div class="si-ig-btn-row">' +
      '<button type="button" class="si-ig-btn si-ig-btn--primary" data-fmt-contact="' +
      escapeHtml(activeFmt.contactTopic) +
      '">' +
      escapeHtml(ui.fmtRequestBtn) +
      '</button>' +
      (fmtAppMeta
        ? '<button type="button" class="si-ig-btn si-ig-btn--portfolio" data-fmt-portfolio="' +
          activeFmt.appSlug +
          '">' +
          escapeHtml(ui.fmtProofBtnPrefix + fmtAppMeta.name) +
          ' ↗</button>'
        : '') +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    root.querySelectorAll('[data-gov-lens]').forEach(function (el) {
      const fn = function () {
        const lens = el.getAttribute('data-gov-lens');
        if (lens && lens !== state4.govFocus) {
          state4.govFocus = lens;
          renderGovernanceFormats(root);
        }
      };
      el.addEventListener('click', fn);
      if (el.tagName.toLowerCase() === 'g') bindKeyboardActivation(el, fn);
    });

    root.querySelectorAll('[data-fmt-id]').forEach(function (el) {
      const fn = function () {
        const fid = el.getAttribute('data-fmt-id');
        if (fid && fid !== state4.formatId) {
          state4.formatId = fid;
          renderGovernanceFormats(root);
        }
      };
      el.addEventListener('click', fn);
      if (el.tagName.toLowerCase() === 'g') bindKeyboardActivation(el, fn);
    });

    root.querySelectorAll('[data-fmt-contact]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        triggerContactTopic(btn.getAttribute('data-fmt-contact'), 'governance_formats');
      });
    });

    root.querySelectorAll('[data-fmt-portfolio]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPortfolioApp(btn.getAttribute('data-fmt-portfolio'), 'governance_formats');
      });
    });
  }

  /* ==========================================================================
     BOOTSTRAP, RE-RENDER ON LANG / THEME EVENTS & PUBLIC API
     ========================================================================== */
  function renderAllContainers(forceRemount) {
    currentLang = detectLang();

    const c1 = document.getElementById('infographic-axes-acatech');
    if (c1 && (forceRemount || c1.dataset.siIgMounted !== '1')) {
      c1.dataset.siIgMounted = '1';
      renderAxesAcatech(c1);
    }

    const c2 = document.getElementById('infographic-architecture-stack');
    if (c2 && (forceRemount || c2.dataset.siIgMounted !== '1')) {
      c2.dataset.siIgMounted = '1';
      renderArchitectureStack(c2);
    }

    const c3 = document.getElementById('infographic-pain-diagnostic');
    if (c3 && (forceRemount || c3.dataset.siIgMounted !== '1')) {
      c3.dataset.siIgMounted = '1';
      renderPainDiagnostic(c3);
    }

    const c4 = document.getElementById('infographic-governance-formats');
    if (c4 && (forceRemount || c4.dataset.siIgMounted !== '1')) {
      c4.dataset.siIgMounted = '1';
      renderGovernanceFormats(c4);
    }
  }

  function handleLanguageSwitch(nextLang) {
    const normalized = String(nextLang || detectLang()).toLowerCase().startsWith('en') ? 'en' : 'pt';
    if (normalized !== currentLang) {
      currentLang = normalized;
    }
    renderAllContainers(true);
  }

  window.addEventListener('smartinovat:langchange', function (ev) {
    const langFromEvent = ev && ev.detail && ev.detail.lang ? ev.detail.lang : detectLang();
    handleLanguageSwitch(langFromEvent);
  });

  window.addEventListener('smartinovat:themechange', function () {
    /* CSS custom properties update SVG and surface colors automatically;
       lightweight re-render ensures any dynamic state stays crisp */
    renderAllContainers(true);
  });

  /* Attribute observer fallback if <html data-lang="..."> changes directly */
  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
    const obs = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i += 1) {
        if (mutations[i].attributeName === 'data-lang' || mutations[i].attributeName === 'lang') {
          const detected = detectLang();
          if (detected !== currentLang) {
            handleLanguageSwitch(detected);
          }
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang', 'lang'] });
  }

  window.SmartInfographics = {
    init: function () {
      renderAllContainers(false);
    },
    refresh: function () {
      renderAllContainers(true);
    },
    setLang: function (lang) {
      handleLanguageSwitch(lang);
    },
    selectAxis: function (index) {
      const c1 = document.getElementById('infographic-axes-acatech');
      if (c1 && index >= 0 && index < 4) {
        state1.axisIndex = index;
        renderAxesAcatech(c1);
      }
    },
    selectAcatechStage: function (stageNum) {
      const c1 = document.getElementById('infographic-axes-acatech');
      if (c1 && stageNum >= 1 && stageNum <= 6) {
        state1.acatechStage = stageNum;
        renderAxesAcatech(c1);
      }
    },
    selectArchitectureLayer: function (layerId) {
      const c2 = document.getElementById('infographic-architecture-stack');
      if (c2) {
        state2.activeLayerId = layerId;
        renderArchitectureStack(c2);
      }
    },
    selectPain: function (painId) {
      const c3 = document.getElementById('infographic-pain-diagnostic');
      if (c3) {
        state3.category = 'all';
        state3.activePainId = painId;
        renderPainDiagnostic(c3);
      }
    },
    selectFormat: function (formatId) {
      const c4 = document.getElementById('infographic-governance-formats');
      if (c4) {
        state4.formatId = formatId;
        renderGovernanceFormats(c4);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderAllContainers(false);
    });
  } else {
    renderAllContainers(false);
  }
})();
