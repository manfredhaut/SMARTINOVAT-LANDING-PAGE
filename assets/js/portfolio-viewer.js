/**
 * SmartInovaT — Portfólio Interativo das 9 Aplicações Web Mocadas Locais
 * Escopo exclusivo: assets/js/portfolio-viewer.js
 * Suporte completo: Bilíngue (PT-BR / EN), Light/Dark Theme SVGs, SMARTINOVAT_ROOT_PREFIX & dataLayer
 * Regra estrita: Acesso 100% local às páginas HTML mocadas (zero links/subdomínios externos)
 */
(function () {
  'use strict';

  var I18N = {
    pt: {
      livePill: 'Vitrine Interativa (9)',
      stripNoteStrong: '9 aplicações web demonstrativas navegáveis',
      stripNoteRest:
        ' — arquitetura de nova geração sustentada por +30 anos de expertise industrial real. ',
      stripAnchor: 'Solicitar projeto sob medida →',
      mockupBadge: 'Demo Interativa • Aplicação Mocada',
      mockupShort: 'demo interativa',
      counterAll: '9 de 9 aplicações demonstrativas exibidas',
      counterFiltered: function (n) {
        return 'Exibindo ' + n + ' de 9 aplicações';
      },
      filterToolbarAria: 'Filtrar aplicações por eixo de solução',
      searchPlaceholder: 'Buscar por dor, stack, Keycloak, IA...',
      searchAria: 'Buscar entre as 9 aplicações do portfólio',
      clearSearch: 'Limpar busca',
      emptyTitle: 'Nenhuma aplicação encontrada para esse filtro',
      emptyDesc:
        'Limpe a busca ou selecione "Todas (9)" para explorar o portfólio completo da SmartInovaT.',
      emptyReset: 'Mostrar todas as 9 aplicações',
      liveCue: 'Preview ao vivo',
      openPreviewAria: function (name) {
        return 'Abrir preview interativo de ' + name;
      },
      painLabel: 'Dor Operacional Resolvida',
      modulesLabel: 'Módulos Demonstrados',
      proofStrong: 'Arquitetura & Prova Técnica:',
      btnPreview: 'Abrir preview',
      btnFullPage: 'Página completa ↗',
      navGroupAria: 'Navegar entre as 9 aplicações',
      prevBtn: 'Anterior',
      prevTitle: 'Aplicação anterior (Seta Esquerda)',
      nextBtn: 'Próxima',
      nextTitle: 'Próxima aplicação (Seta Direita)',
      viewportAria: 'Seletor de viewport',
      summaryBtn: 'Resumo',
      openNewTab: 'Abrir em Nova Aba ↗',
      closeAria: 'Fechar preview interativo (Esc)',
      closeTitle: 'Fechar (Esc)',
      sidebarAria: 'Resumo executivo da aplicação',
      reloadBtn: '↻ Recarregar',
      reloadTitle: 'Recarregar página demonstrativa',
      localPreviewLabel: 'Aplicação Mocada Local',
      loadingApp: function (name) {
        return 'Carregando demo interativa de ' + name + '...';
      },
      iframeTitle: function (name) {
        return 'Preview interativo — ' + name + ' (Demo Interativa)';
      },
      sbWhatHeading: 'O que a aplicação faz',
      sbPainHeading: 'Dor que resolve',
      sbModulesHeading: 'Módulos demonstrados',
      sbProofHeading: 'Arquitetura & Prova Técnica',
      sbConsultBtn: 'Conversar sobre solução similar',
      categories: {
        all: 'Todas',
        'diagnostico-processos': 'Diagnóstico & Processos',
        'ia-atendimento': 'IA Generativa & Atendimento',
        'capacitacao-educacao': 'Capacitação & Educação',
        'tempo-real-engenharia': 'Dados em Tempo Real & Engenharia'
      }
    },
    en: {
      livePill: 'Interactive Showcase (9)',
      stripNoteStrong: '9 interactive web application mockups',
      stripNoteRest:
        ' — next-generation software architecture backed by 30+ years of real industrial expertise. ',
      stripAnchor: 'Request a custom solution →',
      mockupBadge: 'Interactive Mockup • Local Demo',
      mockupShort: 'interactive demo',
      counterAll: 'Showing all 9 interactive application demos',
      counterFiltered: function (n) {
        return 'Showing ' + n + ' of 9 applications';
      },
      filterToolbarAria: 'Filter applications by solution axis',
      searchPlaceholder: 'Search by pain point, stack, Keycloak, AI...',
      searchAria: 'Search across the 9 portfolio applications',
      clearSearch: 'Clear search',
      emptyTitle: 'No applications match this filter',
      emptyDesc:
        'Clear your search query or select "All (9)" to explore the full SmartInovaT portfolio.',
      emptyReset: 'Show all 9 applications',
      liveCue: 'Live Preview',
      openPreviewAria: function (name) {
        return 'Open interactive preview of ' + name;
      },
      painLabel: 'Operational Pain Solved',
      modulesLabel: 'Demonstrated Modules',
      proofStrong: 'Architecture & Technical Proof:',
      btnPreview: 'Open preview',
      btnFullPage: 'Full page ↗',
      navGroupAria: 'Navigate across the 9 applications',
      prevBtn: 'Previous',
      prevTitle: 'Previous application (Left Arrow)',
      nextBtn: 'Next',
      nextTitle: 'Next application (Right Arrow)',
      viewportAria: 'Viewport selector',
      summaryBtn: 'Summary',
      openNewTab: 'Open in New Tab ↗',
      closeAria: 'Close interactive preview (Esc)',
      closeTitle: 'Close (Esc)',
      sidebarAria: 'Executive application summary',
      reloadBtn: '↻ Reload',
      reloadTitle: 'Reload demonstration page',
      localPreviewLabel: 'Local Interactive Mockup',
      loadingApp: function (name) {
        return 'Loading interactive demo for ' + name + '...';
      },
      iframeTitle: function (name) {
        return 'Interactive preview — ' + name + ' (Interactive Mockup)';
      },
      sbWhatHeading: 'What the application does',
      sbPainHeading: 'Business pain solved',
      sbModulesHeading: 'Demonstrated modules',
      sbProofHeading: 'Architecture & Technical Proof',
      sbConsultBtn: 'Discuss a similar solution',
      categories: {
        all: 'All',
        'diagnostico-processos': 'Diagnostics & Processes',
        'ia-atendimento': 'Generative AI & Service',
        'capacitacao-educacao': 'Training & Education',
        'tempo-real-engenharia': 'Real-Time Data & Engineering'
      }
    }
  };

  var CATEGORY_IDS = [
    'all',
    'diagnostico-processos',
    'ia-atendimento',
    'capacitacao-educacao',
    'tempo-real-engenharia'
  ];

  var APPS = [
    {
      slug: 'produthivia',
      indexLabel: '01 / 09',
      name: 'ProduthivIA',
      file: 'produthivia-landing.html',
      category: 'diagnostico-processos',
      accent: '#1db7c4',
      accentRgb: '29, 183, 196',
      graphicType: 'matrix',
      pt: {
        axis: 'Diagnóstico',
        tagline: 'Gêmeo de processo & priorização com prova',
        summary:
          'Plataforma de produtividade empresarial apoiada em IA que conduz do mapeamento por processos ao plano priorizado, conectando diagnóstico, simulação e comprovação de ganho.',
        pain:
          'A organização não sabe por qual gargalo começar e precisa comprovar o retorno operacional antes de escalar investimentos em automação e IA.',
        modules: [
          'Entrevista Guiada',
          'Gêmeo de Processo',
          'Matriz de Priorização',
          'Roteiro & Ficha',
          'Caixa de Ideias',
          'Agentes & Resultados'
        ],
        proof:
          'HTML5/CSS3 estático enxuto de 13 seções estruturadas, sem dependência pesada no cliente e concebido para Content Security Policy (CSP) restritiva.',
        contactTopic: 'Diagnóstico de Processos & Maturidade Digital (inspirado no ProduthivIA)'
      },
      en: {
        axis: 'Diagnostics',
        tagline: 'Process twin & ROI-backed prioritization',
        summary:
          'AI-assisted enterprise productivity platform guiding organizations from structured process mapping to a prioritized roadmap with measurable operational gains.',
        pain:
          'Companies struggle to identify which operational bottleneck to tackle first and need verifiable ROI proof before scaling automation or AI investments.',
        modules: [
          'Guided Interview',
          'Process Twin',
          'Prioritization Matrix',
          'Roadmap & Spec Sheet',
          'Idea Vault',
          'AI Agents & Results'
        ],
        proof:
          'Ultra-lean static HTML5/CSS3 architecture across 13 structured sections, zero heavy client dependencies, designed for strict Content Security Policy (CSP).',
        contactTopic: 'Process Diagnostics & Digital Maturity Roadmap (ProduthivIA)'
      }
    },
    {
      slug: 'capacittai',
      indexLabel: '02 / 09',
      name: 'CapacittAI',
      file: 'capacittai-landing.html',
      category: 'capacitacao-educacao',
      accent: '#eca94c',
      accentRgb: '236, 169, 76',
      graphicType: 'tracks',
      pt: {
        axis: 'Governança & Capacitação',
        tagline: 'Documentação interna convertida em trilha viva',
        summary:
          'Plataforma de treinamento corporativo com IA que transforma normas, manuais e documentos da própria empresa em trilhas gamificadas de carreira e operação.',
        pain:
          'Resolve a barreira clássica pós-implantação: sistemas e máquinas são modernizados, mas a equipe não domina o procedimento padrão no dia a dia.',
        modules: [
          'Trilhas Gamificadas',
          'Tutor Virtual & Copiloto',
          'Importação de Documentos',
          'Sala de Aula',
          'Ranking & Troféus',
          'Certificados & Dashboards'
        ],
        proof:
          'Vitrine web desacoplada da aplicação operacional, arquitetura orientada a ingestão documental corporativa e painéis gerenciais de evolução por equipe.',
        contactTopic: 'Capacitação Corporativa com IA a partir de Documentação Própria (CapacittAI)'
      },
      en: {
        axis: 'Governance & Enablement',
        tagline: 'Internal documentation turned into active tracks',
        summary:
          'AI-powered corporate learning platform that transforms a company’s own SOPs, manuals, and standards into gamified career paths and operational training.',
        pain:
          'Solves the classic post-deployment failure mode: new machinery or software is deployed, yet teams lack structured mastery of standard operating procedures.',
        modules: [
          'Gamified Learning Tracks',
          'AI Tutor & Copilot',
          'Document Ingestion',
          'Virtual Classroom',
          'Leaderboards & Badges',
          'Certificates & Management Dashboards'
        ],
        proof:
          'Decoupled web storefront and dedicated learning application engineered for corporate document ingestion and team-level competency analytics.',
        contactTopic: 'AI Corporate Enablement from Internal Documentation (CapacittAI)'
      }
    },
    {
      slug: 'presenthia',
      indexLabel: '03 / 09',
      name: 'Presenthia',
      file: 'presenthia-landing.html',
      category: 'ia-atendimento',
      accent: '#429a8e',
      accentRgb: '66, 154, 142',
      graphicType: 'kanban',
      pt: {
        axis: 'Inteligência & Atendimento',
        tagline: 'Atendimento, agenda e qualificação no WhatsApp',
        summary:
          'Atendente com IA no WhatsApp para PMEs, clínicas e operações de serviços: responde com dados da empresa, agenda horários, identifica intenção de compra e aciona o humano na hora certa.',
        pain:
          'Estanca a perda de receita por demora de resposta no canal principal, estruturando conversas dispersas em funil comercial auditável.',
        modules: [
          'Atendente Contextual IA',
          'Kanban & Funil',
          'Agenda Integrada',
          'Transbordo Humano',
          'Dashboard & Equipe',
          'Cofre & Documentos'
        ],
        proof:
          'Orquestração conversacional contextualizada para múltiplos segmentos de serviço, com gestão visual de pipeline e fluxos comerciais integrados.',
        contactTopic: 'Agentes Conversacionais & Automação de Atendimento e Funil (Presenthia)'
      },
      en: {
        axis: 'Intelligence & Service',
        tagline: 'WhatsApp AI concierge, booking & sales funnel',
        summary:
          'AI WhatsApp attendant built for SMBs, clinics, and service operations: answers from company knowledge, books appointments, detects buying intent, and escalates to human staff on cue.',
        pain:
          'Eliminates lost leads caused by slow messaging responses while structuring scattered conversations into an auditable Kanban sales pipeline.',
        modules: [
          'Contextual AI Attendant',
          'Kanban & Sales Funnel',
          'Appointment Scheduling',
          'Smart Human Handoff',
          'Team & Operations Dashboard',
          'Vault & Documents'
        ],
        proof:
          'Domain-grounded conversational orchestration across multiple service verticals, featuring visual pipeline management and integrated commercial workflows.',
        contactTopic: 'Conversational AI Agents & Funnel Automation (Presenthia)'
      }
    },
    {
      slug: 'eckkoai',
      indexLabel: '04 / 09',
      name: 'eckko.ai',
      file: 'eckkoai-landing.html',
      category: 'ia-atendimento',
      accent: '#c63368',
      accentRgb: '198, 51, 104',
      graphicType: 'studio',
      pt: {
        axis: 'Inteligência & Comunicação',
        tagline: 'Estúdio multi-tenant de vídeo com avatar digital',
        summary:
          'Estúdio completo de vídeo generativo onde o avatar digital apresenta roteiros com rosto e voz, combinando cenas, mídia de apoio, podcast e aprovação etapa por etapa.',
        pain:
          'Viabiliza comunicação institucional, técnica e comercial em escala sem depender de estúdio físico, mantendo controle editorial em cada etapa do vídeo.',
        modules: [
          'Avatar Digital (Rosto & Voz)',
          'Editor de Cenas',
          'Mídia de Apoio',
          'Estúdio de Podcast',
          'Aprovação por Etapa',
          'Player Nativo'
        ],
        proof:
          'Aplicação React + Vite em arquitetura multi-tenant, isolamento de estilos via Shadow DOM e pipeline multimodal de geração audiovisual em 13 seções.',
        contactTopic: 'Comunicação em Escala & IA Generativa Multimodal (eckko.ai)'
      },
      en: {
        axis: 'Intelligence & Media',
        tagline: 'Multi-tenant digital avatar video studio',
        summary:
          'End-to-end generative video studio where digital avatars deliver scripts with custom face and voice, combining scenes, B-roll media, podcasting, and stage-by-stage approval.',
        pain:
          'Enables scalable technical, corporate, and marketing video production without physical studio bottlenecks while preserving strict editorial governance.',
        modules: [
          'Digital Avatar (Face & Voice)',
          'Multi-Scene Timeline',
          'Supporting Media Library',
          'Podcast Studio',
          'Stage-Gate Approval',
          'Embedded Video Player'
        ],
        proof:
          'Multi-tenant React + Vite architecture utilizing Shadow DOM style isolation and an end-to-end multimodal video/voice generation pipeline across 13 sections.',
        contactTopic: 'Scalable Corporate Media & Multimodal Generative AI (eckko.ai)'
      }
    },
    {
      slug: 'strikeflow3',
      indexLabel: '05 / 09',
      name: 'StrikeFlow3',
      file: 'strikeflow3-landing.html',
      category: 'tempo-real-engenharia',
      accent: '#db8a50',
      accentRgb: '219, 138, 80',
      graphicType: 'quant',
      pt: {
        axis: 'Conexão & Engenharia em Tempo Real',
        tagline: 'Telemetria de mercado, risco e IA quantitativa',
        summary:
          'Plataforma quantitativa de operação em mercado financeiro com IA sobre preços reais em conta simulada, reunindo mesas operacionais, radar de volatilidade e travas de risco.',
        pain:
          'Evidencia engenharia crítica de fluxo contínuo: processar eventos em tempo real sob limites rigorosos de exposição, governança e rastreabilidade.',
        modules: [
          'Mesas Futuros / Opções / Ações',
          'Motor Quantitativo',
          'Radar de Volatilidade',
          'Bots & Modelos de IA',
          'Gestão de Risco & Limites',
          'Cofre & Trilha de Auditoria'
        ],
        proof:
          'SPA React de bundle otimizado com gráficos de alta frequência em HTML5 Canvas, CSP restritiva, cofre de credenciais e trilha completa de auditoria.',
        contactTopic: 'Engenharia de Dados em Tempo Real, Telemetria & Governança de Risco (StrikeFlow3)'
      },
      en: {
        axis: 'Real-Time Connectivity & Quant',
        tagline: 'Live market telemetry, risk guardrails & quant AI',
        summary:
          'Quantitative financial trading platform running AI models over live market prices in simulated accounts, uniting multi-asset desks, volatility radar, and strict risk controls.',
        pain:
          'Demonstrates mission-critical stream engineering: processing high-frequency live data under hard exposure limits, credential security, and full auditability.',
        modules: [
          'Futures / Options / Equities Desks',
          'Quantitative Engine',
          'Volatility & Signal Radar',
          'Automated Bots & AI Lab',
          'Risk & Exposure Guardrails',
          'Credential Vault & Audit Trail'
        ],
        proof:
          'Single-bundle React SPA featuring high-frequency HTML5 Canvas charting, strict Content Security Policy, encrypted credential vault, and full audit logging.',
        contactTopic: 'Real-Time Telemetry Engineering, Quantitative Models & Risk Governance (StrikeFlow3)'
      }
    },
    {
      slug: 'edumaxia',
      indexLabel: '06 / 09',
      name: 'EduMaxia',
      file: 'edumaxia-entrar.html',
      category: 'capacitacao-educacao',
      accent: '#1db7c4',
      accentRgb: '29, 183, 196',
      graphicType: 'federated',
      pt: {
        axis: 'Arquitetura Corporativa & Educação',
        tagline: 'Identidade federada Keycloak & portais por papel',
        summary:
          'Plataforma educacional multi-perfil para redes de ensino com autenticação federada e roteamento automático de portais conforme o papel institucional do usuário.',
        pain:
          'Garante governança centralizada de acesso, segurança e segregação por perfil (gestão, docentes e formação) exigida por grandes redes e setor público.',
        modules: [
          'Single Sign-On (Keycloak)',
          'Portal Segmentado por Papel',
          'Rota Docente Dedicada',
          'Área de Formação',
          'Governança de Identidade'
        ],
        proof:
          'Aplicação React servida por Vite estruturada para servidor dedicado de identidade federada Keycloak (IAM corporativo e controle granular de permissões).',
        contactTopic: 'Arquitetura Corporativa Multi-Perfil com Identidade Federada Keycloak (EduMaxia)'
      },
      en: {
        axis: 'Enterprise Architecture & EdTech',
        tagline: 'Keycloak federated SSO & role-segmented portals',
        summary:
          'Multi-role educational platform built for school networks, combining enterprise federated authentication with role-driven workspaces for administrators and educators.',
        pain:
          'Solves centralized identity governance, Single Sign-On security, and strict role segregation demanded by enterprise clients and public-sector networks.',
        modules: [
          'Federated SSO (Keycloak)',
          'Role-Segmented Portals',
          'Dedicated Educator Workspace',
          'Continuous Training Hub',
          'Enterprise IAM Governance'
        ],
        proof:
          'React + Vite frontend engineered for dedicated Keycloak federated identity integration delivering enterprise IAM and role-based access control.',
        contactTopic: 'Multi-Role Enterprise Architecture & Federated Keycloak IAM (EduMaxia)'
      }
    },
    {
      slug: 'bellavitia',
      indexLabel: '07 / 09',
      name: 'Bellavitia',
      file: 'bellavitia-landing.html',
      category: 'tempo-real-engenharia',
      accent: '#429a8e',
      accentRgb: '66, 154, 142',
      graphicType: 'wellness',
      pt: {
        axis: 'Saúde & Visão Aplicada',
        tagline: 'Jornada guiada de saúde, movimento e exames',
        summary:
          'Plataforma digital de bem-estar e saúde que integra sessões guiadas, interface de acompanhamento de movimento e nutrição, respiração orientada e cofre estruturado de exames.',
        pain:
          'Reúne indicadores dispersos de rotina, alimentação, sessões práticas e histórico de exames em uma experiência digital coesa e acessível em qualquer tela.',
        modules: [
          'Sessões Guiadas',
          'Movimento por Câmera',
          'Registro de Refeição',
          'Práticas de Respiração',
          'Cofre de Exames'
        ],
        proof:
          'Interface responsiva construída em 16 seções com 121 gráficos vetoriais SVG inline de carregamento leve e organização modular de jornada.',
        contactTopic: 'Plataforma Digital Especializada & Interfaces de Visão/Saúde (Bellavitia)'
      },
      en: {
        axis: 'Digital Health & Applied Vision UI',
        tagline: 'Guided wellness sessions, motion & exam vault',
        summary:
          'Digital health and wellness platform integrating guided sessions, camera-based motion and meal capture interfaces, breathwork routines, and a structured medical exam vault.',
        pain:
          'Consolidates fragmented daily wellness routines, nutritional logging, guided sessions, and personal exam records into one cohesive mobile-ready experience.',
        modules: [
          'Guided Sessions',
          'Camera Motion Interface',
          'Meal Photo Logging',
          'Guided Breathwork',
          'Structured Exam Vault'
        ],
        proof:
          'Responsive static architecture across 16 sections featuring 121 lightweight inline SVG vector illustrations and modular user journeys.',
        contactTopic: 'Specialized Digital Health & Applied Vision Interfaces (Bellavitia)'
      }
    },
    {
      slug: 'solochordys',
      indexLabel: '08 / 09',
      name: 'Solochordys',
      file: 'solochordys-landing.html',
      category: 'capacitacao-educacao',
      accent: '#eca94c',
      accentRgb: '236, 169, 76',
      graphicType: 'harmony',
      pt: {
        axis: 'Plataformas de Ensino',
        tagline: 'Ensino musical multi-instrumento em Next.js SSR',
        summary:
          'Plataforma estruturada para formação musical completa cobrindo instrumentos harmônicos, rítmicos, técnica vocal e prática de estúdio em trilhas progressivas.',
        pain:
          'Entrega conteúdo técnico denso com carregamento imediato e indexação limpa, compondo com CapacittAI e EduMaxia a prova de engenharia em educação digital.',
        modules: [
          'Violão & Guitarra',
          'Contrabaixo & Ukulele',
          'Teclado & Bateria',
          'Técnica Vocal',
          'Prática de Estúdio'
        ],
        proof:
          'Arquitetura Next.js com renderização no servidor (SSR) em 14 seções estruturadas e tipografia auto-hospedada para performance consistente.',
        contactTopic: 'Plataforma Digital de Ensino e Conteúdo em Next.js SSR (Solochordys)'
      },
      en: {
        axis: 'Learning Platforms',
        tagline: 'Multi-instrument music academy on Next.js SSR',
        summary:
          'Structured digital learning platform for comprehensive music education spanning fretted instruments, keys, drums, vocals, and studio production.',
        pain:
          'Delivers rich curriculum structures with instant server-rendered load times and SEO-ready indexing alongside CapacittAI and EduMaxia.',
        modules: [
          'Acoustic & Electric Guitar',
          'Bass & Ukulele',
          'Keyboards & Drums',
          'Vocal Technique',
          'Studio Production'
        ],
        proof:
          'Next.js architecture utilizing Server-Side Rendering (SSR) across 14 structured sections with self-hosted typography for zero layout shift.',
        contactTopic: 'Next.js SSR Digital Learning & Content Platform (Solochordys)'
      }
    },
    {
      slug: 'parthituria',
      indexLabel: '09 / 09',
      name: 'Parthituria',
      file: 'parthituria-landing.html',
      category: 'tempo-real-engenharia',
      accent: '#c63368',
      accentRgb: '198, 51, 104',
      graphicType: 'score',
      pt: {
        axis: 'Engenharia Vetorial & Áudio',
        tagline: 'Gravura coral SATB & áudio sincronizado na web',
        summary:
          'Estúdio coral SATB e gravura musical interativa no navegador, combinando renderização vetorial de altíssima precisão com player de áudio integrado.',
        pain:
          'Supera o limite gráfico de navegadores comuns ao manipular dezenas de camadas vetoriais e milhares de traçados musicais sincronizados ao estudo das vozes.',
        modules: [
          'Estúdio Coral SATB',
          'Gravura Musical Vetorial',
          '83 SVGs / 1.848 Traçados',
          'Player de Áudio Integrado',
          'Leitura Multi-Voz'
        ],
        proof:
          'Engenharia frontend em React sustentando DOM de ~17 mil elementos, geometria SVG de alta densidade (83 SVGs e 1.848 paths) e processamento de áudio web.',
        contactTopic: 'Engenharia Frontend de Alta Complexidade Vetorial & Áudio (Parthituria)'
      },
      en: {
        axis: 'Vector & Web Audio Engineering',
        tagline: 'SATB choral engraving & synced browser audio',
        summary:
          'Browser-native SATB choral studio and interactive music engraving environment uniting ultra-dense vector sheet rendering with an integrated audio player.',
        pain:
          'Pushes browser rendering boundaries by orchestrating dozens of vector score layers and thousands of precision glyph paths synchronized with multi-voice playback.',
        modules: [
          'SATB Choral Studio',
          'Vector Music Engraving',
          '83 SVGs / 1,848 Vector Paths',
          'Integrated Web Audio Player',
          'Multi-Voice Rehearsal'
        ],
        proof:
          'High-density React frontend sustaining ~17,000 live DOM nodes, 83 synchronized SVG surfaces with 1,848 vector paths, and browser-based audio playback.',
        contactTopic: 'High-Density Vector Graphics & Web Audio Engineering (Parthituria)'
      }
    }
  ];

  var SLUG_ALIASES = {
    'eckko.ai': 'eckkoai',
    'eckko': 'eckkoai',
    'strikeflow': 'strikeflow3'
  };

  function detectLang() {
    if (typeof document === 'undefined' || !document.documentElement) return 'pt';
    var ds = document.documentElement.dataset && document.documentElement.dataset.lang;
    if (ds) {
      return String(ds).toLowerCase().indexOf('en') === 0 ? 'en' : 'pt';
    }
    var attr = document.documentElement.getAttribute
      ? document.documentElement.getAttribute('data-lang') ||
        document.documentElement.getAttribute('lang')
      : document.documentElement.lang;
    if (attr && String(attr).toLowerCase().indexOf('en') === 0) {
      return 'en';
    }
    return 'pt';
  }

  function resolveAppUrl(fileName) {
    var prefix =
      typeof window !== 'undefined' && window.SMARTINOVAT_ROOT_PREFIX
        ? String(window.SMARTINOVAT_ROOT_PREFIX)
        : './';
    if (prefix.slice(-1) !== '/') {
      prefix += '/';
    }
    var cleanFile = String(fileName || '').replace(/^\.\//, '');
    return prefix + cleanFile;
  }

  var state = {
    lang: detectLang(),
    activeCategory: 'all',
    searchQuery: '',
    currentSlug: null,
    viewport: 'desktop',
    sidebarCollapsed: false,
    lastFocusedElement: null,
    loadFallbackTimer: null
  };

  var dom = {
    showcaseRoot: null,
    grid: null,
    counter: null,
    searchInput: null,
    searchClear: null,
    filterButtons: [],
    modalRoot: null,
    modal: null,
    modalTitle: null,
    modalStep: null,
    modalDomain: null,
    modalExtLink: null,
    modalSidebar: null,
    modalStage: null,
    frameShell: null,
    frameUrl: null,
    iframe: null,
    loader: null,
    loaderLabel: null,
    sidebarToggleBtn: null,
    viewportButtons: []
  };

  function t() {
    return I18N[state.lang] || I18N.pt;
  }

  function appCopy(app) {
    return app[state.lang] || app.pt;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function resolveApp(slugOrQuery) {
    if (!slugOrQuery) return APPS[0];
    var clean = String(slugOrQuery).toLowerCase().trim();
    if (SLUG_ALIASES[clean]) clean = SLUG_ALIASES[clean];
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].slug === clean || APPS[i].name.toLowerCase() === clean) {
        return APPS[i];
      }
    }
    return null;
  }

  function getAppGraphicSvg(type, accent) {
    switch (type) {
      case 'matrix':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<rect x="18" y="14" width="148" height="84" rx="8" stroke="var(--sp-svg-stroke)" fill="var(--sp-svg-panel)"/>' +
          '<line x1="92" y1="22" x2="92" y2="90" stroke="var(--sp-svg-stroke)" stroke-dasharray="3 3"/>' +
          '<line x1="28" y1="56" x2="156" y2="56" stroke="var(--sp-svg-stroke)" stroke-dasharray="3 3"/>' +
          '<path d="M36 76 L68 58 L108 44 L142 28" stroke="' + accent + '" stroke-width="1.2" stroke-linecap="round"/>' +
          '<circle cx="36" cy="76" r="4" fill="var(--sp-svg-muted-node)"/>' +
          '<circle cx="68" cy="58" r="4.5" fill="' + accent + '"/>' +
          '<circle cx="108" cy="44" r="5" fill="' + accent + '"/>' +
          '<circle cx="142" cy="28" r="6" fill="#eca94c"/>' +
          '</svg>'
        );
      case 'tracks':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<rect x="20" y="18" width="144" height="18" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="24" y="23" width="96" height="8" rx="4" fill="' + accent + '" fill-opacity="0.85"/>' +
          '<rect x="20" y="46" width="144" height="18" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="24" y="51" width="118" height="8" rx="4" fill="#429a8e" fill-opacity="0.88"/>' +
          '<rect x="20" y="74" width="144" height="18" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="24" y="79" width="74" height="8" rx="4" fill="#1db7c4" fill-opacity="0.85"/>' +
          '<circle cx="150" cy="27" r="4" fill="' + accent + '"/>' +
          '</svg>'
        );
      case 'kanban':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<rect x="18" y="16" width="42" height="80" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="69" y="16" width="42" height="80" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="120" y="16" width="42" height="80" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="24" y="24" width="30" height="14" rx="3" fill="' + accent + '" fill-opacity="0.72"/>' +
          '<rect x="24" y="43" width="30" height="14" rx="3" fill="var(--sp-svg-stroke)"/>' +
          '<rect x="75" y="24" width="30" height="18" rx="3" fill="#1db7c4" fill-opacity="0.72"/>' +
          '<rect x="126" y="24" width="30" height="22" rx="3" fill="#eca94c" fill-opacity="0.8"/>' +
          '</svg>'
        );
      case 'studio':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<rect x="22" y="14" width="138" height="62" rx="8" fill="var(--sp-svg-panel)" stroke="var(--sp-svg-stroke)"/>' +
          '<circle cx="91" cy="40" r="13" stroke="' + accent + '" stroke-width="1.2"/>' +
          '<path d="M74 66 C78 56, 104 56, 108 66" stroke="' + accent + '" stroke-width="1.2" stroke-linecap="round"/>' +
          '<rect x="22" y="83" width="138" height="12" rx="6" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="24" y="85" width="82" height="8" rx="4" fill="' + accent + '"/>' +
          '<circle cx="106" cy="89" r="5" fill="var(--sp-svg-ink)"/>' +
          '</svg>'
        );
      case 'quant':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<path d="M16 86 L42 70 L66 75 L92 46 L118 54 L144 26 L166 32" stroke="' + accent + '" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M16 86 L42 70 L66 75 L92 46 L118 54 L144 26 L166 32 L166 96 L16 96 Z" fill="' + accent + '" fill-opacity="0.16"/>' +
          '<line x1="42" y1="58" x2="42" y2="82" stroke="#429a8e" stroke-width="1.6"/>' +
          '<line x1="92" y1="34" x2="92" y2="62" stroke="#429a8e" stroke-width="1.6"/>' +
          '<line x1="118" y1="42" x2="118" y2="68" stroke="#c63368" stroke-width="1.6"/>' +
          '<line x1="144" y1="16" x2="144" y2="42" stroke="#429a8e" stroke-width="1.6"/>' +
          '</svg>'
        );
      case 'federated':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<circle cx="54" cy="55" r="18" fill="rgba(29,183,196,0.16)" stroke="' + accent + '" stroke-width="1.2"/>' +
          '<rect x="48" y="51" width="12" height="10" rx="2" stroke="var(--sp-svg-ink)" stroke-width="1"/>' +
          '<path d="M50 51 V47 A4 4 0 0 1 58 47 V51" stroke="var(--sp-svg-ink)" stroke-width="1"/>' +
          '<line x1="72" y1="50" x2="118" y2="28" stroke="var(--sp-svg-stroke-strong)" stroke-width="1"/>' +
          '<line x1="72" y1="55" x2="118" y2="55" stroke="' + accent + '" stroke-width="1.1"/>' +
          '<line x1="72" y1="60" x2="118" y2="82" stroke="var(--sp-svg-stroke-strong)" stroke-width="1"/>' +
          '<rect x="118" y="19" width="44" height="18" rx="5" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '<rect x="118" y="46" width="44" height="18" rx="5" fill="rgba(29,183,196,0.2)" stroke="' + accent + '"/>' +
          '<rect x="118" y="73" width="44" height="18" rx="5" fill="var(--sp-svg-fill-soft)" stroke="var(--sp-svg-stroke)"/>' +
          '</svg>'
        );
      case 'wellness':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<circle cx="96" cy="54" r="36" stroke="var(--sp-svg-stroke)" stroke-width="2"/>' +
          '<circle cx="96" cy="54" r="36" stroke="' + accent + '" stroke-width="2" stroke-dasharray="165 70" stroke-linecap="round"/>' +
          '<path d="M68 56 H84 L91 41 L101 69 L108 52 H124" stroke="var(--sp-svg-ink)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>'
        );
      case 'harmony':
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<line x1="18" y1="30" x2="164" y2="30" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="18" y1="45" x2="164" y2="45" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="18" y1="60" x2="164" y2="60" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="18" y1="75" x2="164" y2="75" stroke="var(--sp-svg-stroke)"/>' +
          '<path d="M22 68 Q56 20 92 54 T162 38" stroke="' + accent + '" stroke-width="1.3" fill="none"/>' +
          '<circle cx="58" cy="45" r="5" fill="' + accent + '"/>' +
          '<circle cx="106" cy="60" r="5" fill="#1db7c4"/>' +
          '<circle cx="142" cy="30" r="5" fill="#c63368"/>' +
          '</svg>'
        );
      case 'score':
      default:
        return (
          '<svg class="sp-card__graphic" viewBox="0 0 180 110" fill="none" aria-hidden="true">' +
          '<line x1="16" y1="26" x2="166" y2="26" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="16" y1="36" x2="166" y2="36" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="16" y1="46" x2="166" y2="46" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="16" y1="68" x2="166" y2="68" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="16" y1="78" x2="166" y2="78" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="16" y1="88" x2="166" y2="88" stroke="var(--sp-svg-stroke)"/>' +
          '<line x1="94" y1="16" x2="94" y2="96" stroke="' + accent + '" stroke-width="1.2"/>' +
          '<circle cx="46" cy="36" r="4.2" fill="var(--sp-svg-ink)"/>' +
          '<circle cx="72" cy="26" r="4.2" fill="' + accent + '"/>' +
          '<circle cx="118" cy="46" r="4.2" fill="#1db7c4"/>' +
          '<circle cx="62" cy="78" r="4.2" fill="#eca94c"/>' +
          '<circle cx="134" cy="68" r="4.2" fill="' + accent + '"/>' +
          '</svg>'
        );
    }
  }

  function getCategoryCount(categoryId) {
    if (categoryId === 'all') return APPS.length;
    var total = 0;
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].category === categoryId) total++;
    }
    return total;
  }

  function getFilteredApps() {
    var query = normalizeText(state.searchQuery);
    return APPS.filter(function (app) {
      var categoryMatch =
        state.activeCategory === 'all' || app.category === state.activeCategory;
      if (!categoryMatch) return false;
      if (!query) return true;
      var ptCopy = app.pt;
      var enCopy = app.en;
      var haystack = normalizeText(
        [
          app.name,
          ptCopy.axis,
          ptCopy.tagline,
          ptCopy.summary,
          ptCopy.pain,
          ptCopy.proof,
          ptCopy.modules.join(' '),
          enCopy.axis,
          enCopy.tagline,
          enCopy.summary,
          enCopy.pain,
          enCopy.proof,
          enCopy.modules.join(' ')
        ].join(' ')
      );
      return haystack.indexOf(query) !== -1;
    });
  }

  function renderCardHtml(app) {
    var copy = appCopy(app);
    var dict = t();
    var resolvedHref = resolveAppUrl(app.file);
    var modulesHtml = copy.modules
      .map(function (mod) {
        return '<span class="sp-chip">' + escapeHtml(mod) + '</span>';
      })
      .join('');

    return (
      '<article class="sp-card" data-app-slug="' +
      escapeHtml(app.slug) +
      '" style="--app-accent: ' +
      escapeHtml(app.accent) +
      '; --app-accent-rgb: ' +
      escapeHtml(app.accentRgb) +
      ';">' +
      '<div class="sp-card__browser" data-action="open-preview" data-slug="' +
      escapeHtml(app.slug) +
      '" role="button" tabindex="0" aria-label="' +
      escapeHtml(dict.openPreviewAria(app.name)) +
      '">' +
      '<div class="sp-card__chrome">' +
      '<span class="sp-card__dots" aria-hidden="true"><span></span><span></span><span></span></span>' +
      '<div class="sp-card__urlbar">' +
      '<svg class="sp-card__lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' +
      '<span class="sp-card__domain">' +
      escapeHtml(app.name) +
      '</span>' +
      '<span class="sp-card__domain-tag">' +
      escapeHtml(dict.mockupShort) +
      '</span>' +
      '</div>' +
      '<span class="sp-card__index">' +
      escapeHtml(app.indexLabel) +
      '</span>' +
      '</div>' +
      '<div class="sp-card__viewport">' +
      '<div class="sp-card__identity">' +
      '<span class="sp-axis-badge">' +
      escapeHtml(copy.axis) +
      '</span>' +
      '<h3 class="sp-card__title">' +
      escapeHtml(app.name) +
      '</h3>' +
      '<p class="sp-card__tagline">' +
      escapeHtml(copy.tagline) +
      '</p>' +
      '</div>' +
      '<div class="sp-card__art">' +
      getAppGraphicSvg(app.graphicType, app.accent) +
      '</div>' +
      '<span class="sp-card__hover-cue">' +
      escapeHtml(dict.liveCue) +
      '</span>' +
      '</div>' +
      '</div>' +
      '<div class="sp-card__body">' +
      '<p class="sp-card__summary">' +
      escapeHtml(copy.summary) +
      '</p>' +
      '<div class="sp-card__pain">' +
      '<span class="sp-card__label">' +
      escapeHtml(dict.painLabel) +
      '</span>' +
      '<p class="sp-card__pain-text">' +
      escapeHtml(copy.pain) +
      '</p>' +
      '</div>' +
      '<div>' +
      '<span class="sp-card__label">' +
      escapeHtml(dict.modulesLabel) +
      '</span>' +
      '<div class="sp-card__modules">' +
      modulesHtml +
      '</div>' +
      '</div>' +
      '<div class="sp-card__proof">' +
      '<svg class="sp-card__proof-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>' +
      '<p class="sp-card__proof-text"><strong>' +
      escapeHtml(dict.proofStrong) +
      '</strong> ' +
      escapeHtml(copy.proof) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div class="sp-card__actions">' +
      '<button type="button" class="sp-btn sp-btn--primary" data-action="open-preview" data-slug="' +
      escapeHtml(app.slug) +
      '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' +
      '<span>' +
      escapeHtml(dict.btnPreview) +
      '</span>' +
      '</button>' +
      '<a class="sp-btn sp-btn--secondary" href="' +
      escapeHtml(resolvedHref) +
      '" target="_blank" rel="noopener">' +
      '<span>' +
      escapeHtml(dict.btnFullPage) +
      '</span>' +
      '</a>' +
      '</div>' +
      '</article>'
    );
  }

  function renderGrid() {
    if (!dom.grid) return;
    var dict = t();
    var filtered = getFilteredApps();

    if (dom.counter) {
      dom.counter.textContent =
        filtered.length === APPS.length
          ? dict.counterAll
          : dict.counterFiltered(filtered.length);
    }

    if (dom.searchClear) {
      dom.searchClear.classList.toggle('is-visible', Boolean(state.searchQuery));
    }

    for (var i = 0; i < dom.filterButtons.length; i++) {
      var btn = dom.filterButtons[i];
      var isActive = btn.getAttribute('data-category') === state.activeCategory;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    if (filtered.length === 0) {
      dom.grid.innerHTML =
        '<div class="sp-empty">' +
        '<h3 class="sp-empty__title">' +
        escapeHtml(dict.emptyTitle) +
        '</h3>' +
        '<p class="sp-empty__desc">' +
        escapeHtml(dict.emptyDesc) +
        '</p>' +
        '<button type="button" class="sp-btn sp-btn--secondary" data-action="reset-filters">' +
        escapeHtml(dict.emptyReset) +
        '</button>' +
        '</div>';
      return;
    }

    dom.grid.innerHTML = filtered.map(renderCardHtml).join('');
  }

  function renderShowcaseInnerHtml() {
    var dict = t();
    var filterButtonsHtml = CATEGORY_IDS.map(function (catId) {
      var count = getCategoryCount(catId);
      var labelText = dict.categories[catId] || catId;
      var activeClass = catId === state.activeCategory ? ' is-active' : '';
      var ariaPressed = catId === state.activeCategory ? 'true' : 'false';
      return (
        '<button type="button" class="sp-filter-btn' +
        activeClass +
        '" data-category="' +
        escapeHtml(catId) +
        '" aria-pressed="' +
        ariaPressed +
        '">' +
        '<span>' +
        escapeHtml(labelText) +
        '</span>' +
        '<span class="sp-filter-btn__count">' +
        count +
        '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="sp-showcase">' +
      '<div class="sp-summary-strip">' +
      '<div class="sp-summary-strip__left">' +
      '<span class="sp-live-pill"><span class="sp-live-pill__dot"></span>' +
      escapeHtml(dict.livePill) +
      '</span>' +
      '<p class="sp-summary-strip__note"><strong>' +
      escapeHtml(dict.stripNoteStrong) +
      '</strong>' +
      escapeHtml(dict.stripNoteRest) +
      '<a class="sp-summary-strip__anchor" href="#contato">' +
      escapeHtml(dict.stripAnchor) +
      '</a>' +
      '</p>' +
      '</div>' +
      '<span class="sp-summary-strip__counter" data-role="sp-counter" aria-live="polite">' +
      escapeHtml(dict.counterAll) +
      '</span>' +
      '</div>' +
      '<div class="sp-toolbar">' +
      '<div class="sp-filters" role="toolbar" aria-label="' +
      escapeHtml(dict.filterToolbarAria) +
      '">' +
      filterButtonsHtml +
      '</div>' +
      '<div class="sp-search">' +
      '<svg class="sp-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<input type="search" class="sp-search__input" value="' +
      escapeHtml(state.searchQuery) +
      '" placeholder="' +
      escapeHtml(dict.searchPlaceholder) +
      '" aria-label="' +
      escapeHtml(dict.searchAria) +
      '" />' +
      '<button type="button" class="sp-search__clear" aria-label="' +
      escapeHtml(dict.clearSearch) +
      '" title="' +
      escapeHtml(dict.clearSearch) +
      '">×</button>' +
      '</div>' +
      '</div>' +
      '<div class="sp-grid" data-role="sp-grid"></div>' +
      '</div>'
    );
  }

  function bindShowcaseRefs(container) {
    dom.grid = container.querySelector('[data-role="sp-grid"]');
    dom.counter = container.querySelector('[data-role="sp-counter"]');
    dom.searchInput = container.querySelector('.sp-search__input');
    dom.searchClear = container.querySelector('.sp-search__clear');
    dom.filterButtons = Array.prototype.slice.call(
      container.querySelectorAll('.sp-filter-btn')
    );

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', function () {
        state.searchQuery = dom.searchInput.value || '';
        renderGrid();
      });
    }

    if (dom.searchClear) {
      dom.searchClear.addEventListener('click', function () {
        state.searchQuery = '';
        if (dom.searchInput) {
          dom.searchInput.value = '';
          dom.searchInput.focus();
        }
        renderGrid();
      });
    }
  }

  function buildShowcase(container) {
    dom.showcaseRoot = container;
    container.innerHTML = renderShowcaseInnerHtml();
    bindShowcaseRefs(container);

    if (!container.getAttribute('data-sp-events')) {
      container.setAttribute('data-sp-events', 'true');

      container.addEventListener('click', function (event) {
        var filterBtn = event.target.closest('.sp-filter-btn');
        if (filterBtn) {
          state.activeCategory = filterBtn.getAttribute('data-category') || 'all';
          renderGrid();
          return;
        }

        var resetBtn = event.target.closest('[data-action="reset-filters"]');
        if (resetBtn) {
          state.activeCategory = 'all';
          state.searchQuery = '';
          if (dom.searchInput) dom.searchInput.value = '';
          renderGrid();
          return;
        }

        var previewTrigger = event.target.closest('[data-action="open-preview"]');
        if (previewTrigger) {
          event.preventDefault();
          openPreview(previewTrigger.getAttribute('data-slug'));
        }
      });

      container.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          var browserTrigger = event.target.closest(
            '.sp-card__browser[data-action="open-preview"]'
          );
          if (browserTrigger) {
            event.preventDefault();
            openPreview(browserTrigger.getAttribute('data-slug'));
          }
        }
      });
    }

    renderGrid();
  }

  function syncModalStaticI18n() {
    if (!dom.modalRoot) return;
    var dict = t();

    var navGroup = dom.modalRoot.querySelector('.sp-nav-group');
    if (navGroup) navGroup.setAttribute('aria-label', dict.navGroupAria);

    var prevBtn = dom.modalRoot.querySelector('[data-action="prev-app"]');
    if (prevBtn) {
      prevBtn.setAttribute('title', dict.prevTitle);
      var prevTxt = prevBtn.querySelector('.sp-ctrl-btn__text-hide-sm');
      if (prevTxt) prevTxt.textContent = dict.prevBtn;
    }

    var nextBtn = dom.modalRoot.querySelector('[data-action="next-app"]');
    if (nextBtn) {
      nextBtn.setAttribute('title', dict.nextTitle);
      var nextTxt = nextBtn.querySelector('.sp-ctrl-btn__text-hide-sm');
      if (nextTxt) nextTxt.textContent = dict.nextBtn;
    }

    var vpGroup = dom.modalRoot.querySelector('.sp-viewport-group');
    if (vpGroup) vpGroup.setAttribute('aria-label', dict.viewportAria);

    if (dom.sidebarToggleBtn) {
      var sbTxt = dom.sidebarToggleBtn.querySelector('.sp-ctrl-btn__text-hide-sm');
      if (sbTxt) sbTxt.textContent = dict.summaryBtn;
    }

    if (dom.modalExtLink) {
      var extSpan = dom.modalExtLink.querySelector('span');
      if (extSpan) extSpan.textContent = dict.openNewTab;
    }

    var closeBtn = dom.modalRoot.querySelector('[data-action="close-modal"]');
    if (closeBtn) {
      closeBtn.setAttribute('aria-label', dict.closeAria);
      closeBtn.setAttribute('title', dict.closeTitle);
    }

    if (dom.modalSidebar) {
      dom.modalSidebar.setAttribute('aria-label', dict.sidebarAria);
    }

    var reloadBtn = dom.modalRoot.querySelector('[data-action="reload-iframe"]');
    if (reloadBtn) {
      reloadBtn.textContent = dict.reloadBtn;
      reloadBtn.setAttribute('title', dict.reloadTitle);
    }

    if (state.currentSlug) {
      var activeApp = resolveApp(state.currentSlug);
      if (activeApp) {
        populateModal(activeApp, true);
      }
    }
  }

  function ensureModalMounted() {
    if (dom.modalRoot) return;
    var dict = t();

    var root = document.createElement('div');
    root.className = 'sp-modal-root';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="sp-modal" role="dialog" aria-modal="true" aria-labelledby="sp-modal-title">' +
      '<header class="sp-modal__topbar">' +
      '<div class="sp-modal__brand">' +
      '<span class="sp-modal__dot" aria-hidden="true"></span>' +
      '<div class="sp-modal__title-wrap">' +
      '<div class="sp-modal__title-row">' +
      '<h2 class="sp-modal__title" id="sp-modal-title">SmartInovaT</h2>' +
      '<span class="sp-modal__step" data-role="modal-step">01 / 09</span>' +
      '</div>' +
      '<span class="sp-modal__domain" data-role="modal-domain">' +
      escapeHtml(dict.mockupBadge) +
      '</span>' +
      '</div>' +
      '</div>' +
      '<div class="sp-modal__center-controls">' +
      '<div class="sp-nav-group" role="group" aria-label="' +
      escapeHtml(dict.navGroupAria) +
      '">' +
      '<button type="button" class="sp-ctrl-btn" data-action="prev-app" title="' +
      escapeHtml(dict.prevTitle) +
      '">' +
      '<span aria-hidden="true">◀</span><span class="sp-ctrl-btn__text-hide-sm">' +
      escapeHtml(dict.prevBtn) +
      '</span>' +
      '</button>' +
      '<button type="button" class="sp-ctrl-btn" data-action="next-app" title="' +
      escapeHtml(dict.nextTitle) +
      '">' +
      '<span class="sp-ctrl-btn__text-hide-sm">' +
      escapeHtml(dict.nextBtn) +
      '</span><span aria-hidden="true">▶</span>' +
      '</button>' +
      '</div>' +
      '<div class="sp-viewport-group" role="group" aria-label="' +
      escapeHtml(dict.viewportAria) +
      '">' +
      '<button type="button" class="sp-ctrl-btn is-active" data-viewport-btn="desktop">Desktop 100%</button>' +
      '<button type="button" class="sp-ctrl-btn" data-viewport-btn="tablet">Tablet 768px</button>' +
      '<button type="button" class="sp-ctrl-btn" data-viewport-btn="mobile">Mobile 390px</button>' +
      '</div>' +
      '<button type="button" class="sp-ctrl-btn is-active" data-action="toggle-sidebar" aria-expanded="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>' +
      '<span class="sp-ctrl-btn__text-hide-sm">' +
      escapeHtml(dict.summaryBtn) +
      '</span>' +
      '</button>' +
      '</div>' +
      '<div class="sp-modal__right-controls">' +
      '<a class="sp-modal__ext-link" data-role="modal-ext-link" href="' +
      escapeHtml(resolveAppUrl('produthivia-landing.html')) +
      '" target="_blank" rel="noopener">' +
      '<span>' +
      escapeHtml(dict.openNewTab) +
      '</span>' +
      '</a>' +
      '<button type="button" class="sp-modal__close" data-action="close-modal" aria-label="' +
      escapeHtml(dict.closeAria) +
      '" title="' +
      escapeHtml(dict.closeTitle) +
      '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
      '</button>' +
      '</div>' +
      '</header>' +
      '<div class="sp-modal__workspace">' +
      '<aside class="sp-modal__sidebar" data-role="modal-sidebar" aria-label="' +
      escapeHtml(dict.sidebarAria) +
      '"></aside>' +
      '<div class="sp-modal__stage" data-role="modal-stage">' +
      '<div class="sp-frame-shell" data-role="frame-shell" data-viewport="desktop">' +
      '<div class="sp-frame-shell__address">' +
      '<span class="sp-frame-shell__url" data-role="frame-url">' +
      escapeHtml(dict.localPreviewLabel) +
      '</span>' +
      '<button type="button" class="sp-frame-shell__reload" data-action="reload-iframe" title="' +
      escapeHtml(dict.reloadTitle) +
      '">' +
      escapeHtml(dict.reloadBtn) +
      '</button>' +
      '</div>' +
      '<div class="sp-frame-shell__body">' +
      '<div class="sp-loader" data-role="modal-loader">' +
      '<div class="sp-loader__ring" aria-hidden="true"></div>' +
      '<div class="sp-loader__bar" aria-hidden="true"></div>' +
      '<p class="sp-loader__label" data-role="loader-label">...</p>' +
      '</div>' +
      '<iframe class="sp-modal__iframe" data-role="modal-iframe" src="about:blank" loading="lazy" title="SmartInovaT"></iframe>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    document.body.appendChild(root);

    dom.modalRoot = root;
    dom.modal = root.querySelector('.sp-modal');
    dom.modalTitle = root.querySelector('#sp-modal-title');
    dom.modalStep = root.querySelector('[data-role="modal-step"]');
    dom.modalDomain = root.querySelector('[data-role="modal-domain"]');
    dom.modalExtLink = root.querySelector('[data-role="modal-ext-link"]');
    dom.modalSidebar = root.querySelector('[data-role="modal-sidebar"]');
    dom.modalStage = root.querySelector('[data-role="modal-stage"]');
    dom.frameShell = root.querySelector('[data-role="frame-shell"]');
    dom.frameUrl = root.querySelector('[data-role="frame-url"]');
    dom.iframe = root.querySelector('[data-role="modal-iframe"]');
    dom.loader = root.querySelector('[data-role="modal-loader"]');
    dom.loaderLabel = root.querySelector('[data-role="loader-label"]');
    dom.sidebarToggleBtn = root.querySelector('[data-action="toggle-sidebar"]');
    dom.viewportButtons = Array.prototype.slice.call(
      root.querySelectorAll('[data-viewport-btn]')
    );

    if (window.innerWidth <= 1024) {
      state.sidebarCollapsed = true;
      syncSidebarState();
    }

    dom.iframe.addEventListener('load', function () {
      if (!state.currentSlug) return;
      hideLoader();
    });

    root.addEventListener('click', function (event) {
      if (event.target === root) {
        closePreview();
        return;
      }

      var closeBtn = event.target.closest('[data-action="close-modal"]');
      if (closeBtn) {
        closePreview();
        return;
      }

      var prevBtn = event.target.closest('[data-action="prev-app"]');
      if (prevBtn) {
        stepApp(-1);
        return;
      }

      var nextBtn = event.target.closest('[data-action="next-app"]');
      if (nextBtn) {
        stepApp(1);
        return;
      }

      var vpBtn = event.target.closest('[data-viewport-btn]');
      if (vpBtn) {
        setViewport(vpBtn.getAttribute('data-viewport-btn'));
        return;
      }

      var sidebarBtn = event.target.closest('[data-action="toggle-sidebar"]');
      if (sidebarBtn) {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        syncSidebarState();
        return;
      }

      var reloadBtn = event.target.closest('[data-action="reload-iframe"]');
      if (reloadBtn) {
        var current = resolveApp(state.currentSlug);
        if (current && dom.iframe) {
          showLoader(current.name);
          dom.iframe.src = resolveAppUrl(current.file);
        }
        return;
      }

      var consultBtn = event.target.closest('[data-action="consult-similar"]');
      if (consultBtn) {
        var app = resolveApp(state.currentSlug);
        var copy = app ? appCopy(app) : null;
        closePreview();
        if (
          copy &&
          window.SmartContact &&
          typeof window.SmartContact.prefillTopic === 'function'
        ) {
          window.SmartContact.prefillTopic(copy.contactTopic);
        } else {
          var contactEl = document.getElementById('contato');
          if (contactEl && typeof contactEl.scrollIntoView === 'function') {
            contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });

    document.addEventListener('keydown', handleGlobalKeydown);
  }

  function showLoader(appName) {
    if (state.loadFallbackTimer) {
      clearTimeout(state.loadFallbackTimer);
      state.loadFallbackTimer = null;
    }
    if (dom.loaderLabel) {
      dom.loaderLabel.textContent = t().loadingApp(appName);
    }
    if (dom.loader) {
      dom.loader.classList.remove('is-hidden');
    }
    state.loadFallbackTimer = setTimeout(function () {
      hideLoader();
    }, 3200);
  }

  function hideLoader() {
    if (state.loadFallbackTimer) {
      clearTimeout(state.loadFallbackTimer);
      state.loadFallbackTimer = null;
    }
    if (dom.loader) {
      dom.loader.classList.add('is-hidden');
    }
  }

  function syncSidebarState() {
    if (!dom.modal || !dom.sidebarToggleBtn) return;
    dom.modal.classList.toggle('is-sidebar-collapsed', state.sidebarCollapsed);
    dom.sidebarToggleBtn.classList.toggle('is-active', !state.sidebarCollapsed);
    dom.sidebarToggleBtn.setAttribute(
      'aria-expanded',
      state.sidebarCollapsed ? 'false' : 'true'
    );
  }

  function setViewport(mode) {
    var valid = mode === 'tablet' || mode === 'mobile' ? mode : 'desktop';
    state.viewport = valid;
    if (dom.frameShell) {
      dom.frameShell.setAttribute('data-viewport', valid);
    }
    if (dom.modalStage) {
      dom.modalStage.classList.toggle('is-framed', valid !== 'desktop');
    }
    for (var i = 0; i < dom.viewportButtons.length; i++) {
      var b = dom.viewportButtons[i];
      var active = b.getAttribute('data-viewport-btn') === valid;
      b.classList.toggle('is-active', active);
    }
  }

  function renderModalSidebar(app) {
    if (!dom.modalSidebar) return;
    var copy = appCopy(app);
    var dict = t();
    var chips = copy.modules
      .map(function (m) {
        return '<span class="sp-chip">' + escapeHtml(m) + '</span>';
      })
      .join('');

    dom.modalSidebar.innerHTML =
      '<div>' +
      '<span class="sp-axis-badge" style="--app-accent: ' +
      escapeHtml(app.accent) +
      '; --app-accent-rgb: ' +
      escapeHtml(app.accentRgb) +
      ';">' +
      escapeHtml(copy.axis) +
      '</span>' +
      '</div>' +
      '<div class="sp-sidebar__section">' +
      '<h3 class="sp-sidebar__heading">' +
      escapeHtml(dict.sbWhatHeading) +
      '</h3>' +
      '<p class="sp-sidebar__text">' +
      escapeHtml(copy.summary) +
      '</p>' +
      '</div>' +
      '<div class="sp-sidebar__section">' +
      '<h3 class="sp-sidebar__heading">' +
      escapeHtml(dict.sbPainHeading) +
      '</h3>' +
      '<div class="sp-sidebar__pain-box">' +
      escapeHtml(copy.pain) +
      '</div>' +
      '</div>' +
      '<div class="sp-sidebar__section">' +
      '<h3 class="sp-sidebar__heading">' +
      escapeHtml(dict.sbModulesHeading) +
      '</h3>' +
      '<div class="sp-card__modules">' +
      chips +
      '</div>' +
      '</div>' +
      '<div class="sp-sidebar__section">' +
      '<h3 class="sp-sidebar__heading">' +
      escapeHtml(dict.sbProofHeading) +
      '</h3>' +
      '<div class="sp-sidebar__proof-box">' +
      escapeHtml(copy.proof) +
      '</div>' +
      '</div>' +
      '<div class="sp-sidebar__cta-box">' +
      '<button type="button" class="sp-sidebar__consult-btn" data-action="consult-similar">' +
      '<span>' +
      escapeHtml(dict.sbConsultBtn) +
      '</span>' +
      '<span aria-hidden="true">→</span>' +
      '</button>' +
      '</div>';
  }

  function populateModal(app, preserveIframe) {
    var copy = appCopy(app);
    var dict = t();
    var resolvedHref = resolveAppUrl(app.file);
    state.currentSlug = app.slug;

    dom.modal.style.setProperty('--modal-accent', app.accent);
    dom.modal.style.setProperty('--modal-accent-rgb', app.accentRgb);

    dom.modalTitle.textContent = app.name;
    dom.modalStep.textContent = app.indexLabel;
    dom.modalDomain.textContent = dict.mockupBadge + ' • ' + copy.axis;
    dom.modalExtLink.setAttribute('href', resolvedHref);
    dom.frameUrl.innerHTML =
      '<a class="sp-frame-shell__domain-ext" href="' +
      escapeHtml(resolvedHref) +
      '" target="_blank" rel="noopener">' +
      escapeHtml(app.name + ' — ' + dict.localPreviewLabel + ' (' + resolvedHref + ') ↗') +
      '</a>';
    dom.iframe.setAttribute('title', dict.iframeTitle(app.name));

    renderModalSidebar(app);

    if (!preserveIframe) {
      showLoader(app.name);
      dom.iframe.setAttribute('src', resolvedHref);
    }
  }

  function stepApp(delta) {
    var currentIndex = 0;
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].slug === state.currentSlug) {
        currentIndex = i;
        break;
      }
    }
    var nextIndex = (currentIndex + delta + APPS.length) % APPS.length;
    populateModal(APPS[nextIndex], false);
  }

  function pushTrackingEvent(app) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'portfolio_preview_open',
        app_slug: app.slug,
        app_name: app.name,
        app_file: resolveAppUrl(app.file),
        language: state.lang
      });
    }
  }

  function openPreview(appSlug) {
    ensureModalMounted();
    var targetApp = resolveApp(appSlug) || APPS[0];

    var wasOpen = dom.modalRoot.classList.contains('is-open');
    if (!wasOpen) {
      state.lastFocusedElement = document.activeElement;
      document.body.style.overflow = 'hidden';
      dom.modalRoot.classList.add('is-open');
      dom.modalRoot.setAttribute('aria-hidden', 'false');
    }

    populateModal(targetApp, false);
    pushTrackingEvent(targetApp);

    if (!wasOpen) {
      var closeBtn = dom.modalRoot.querySelector('[data-action="close-modal"]');
      if (closeBtn) {
        setTimeout(function () {
          closeBtn.focus();
        }, 40);
      }
    }
    return true;
  }

  function closePreview() {
    if (!dom.modalRoot || !dom.modalRoot.classList.contains('is-open')) return;
    hideLoader();
    dom.modalRoot.classList.remove('is-open');
    dom.modalRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.currentSlug = null;

    if (dom.iframe) {
      dom.iframe.setAttribute('src', 'about:blank');
    }

    if (
      state.lastFocusedElement &&
      typeof state.lastFocusedElement.focus === 'function'
    ) {
      try {
        state.lastFocusedElement.focus();
      } catch (_err) {
        /* ignore focus restore failure */
      }
    }
    state.lastFocusedElement = null;
  }

  function handleGlobalKeydown(event) {
    if (!dom.modalRoot || !dom.modalRoot.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closePreview();
      return;
    }

    if (event.key === 'ArrowLeft' && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (document.activeElement && document.activeElement.tagName !== 'INPUT') {
        event.preventDefault();
        stepApp(-1);
        return;
      }
    }

    if (event.key === 'ArrowRight' && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (document.activeElement && document.activeElement.tagName !== 'INPUT') {
        event.preventDefault();
        stepApp(1);
        return;
      }
    }

    if (event.key === 'Tab' && dom.modal) {
      var focusable = dom.modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      var visibleFocusable = Array.prototype.filter.call(focusable, function (el) {
        return el.offsetParent !== null;
      });
      if (visibleFocusable.length === 0) return;

      var first = visibleFocusable[0];
      var last = visibleFocusable[visibleFocusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function filterByCategory(categoryId) {
    var exists = CATEGORY_IDS.indexOf(categoryId) !== -1;
    state.activeCategory = exists ? categoryId : 'all';
    renderGrid();
  }

  function setLanguage(nextLang) {
    var normalized =
      nextLang && String(nextLang).toLowerCase().indexOf('en') === 0
        ? 'en'
        : 'pt';
    state.lang = normalized;
    if (dom.showcaseRoot) {
      dom.showcaseRoot.innerHTML = renderShowcaseInnerHtml();
      bindShowcaseRefs(dom.showcaseRoot);
      renderGrid();
    }
    syncModalStaticI18n();
    syncExposedApps();
  }

  function getExportedApps() {
    return APPS.map(function (app) {
      var copy = appCopy(app);
      return {
        slug: app.slug,
        name: app.name,
        file: resolveAppUrl(app.file),
        rawFile: app.file,
        axis: copy.axis,
        category: app.category,
        accent: app.accent,
        summary: copy.summary,
        pain: copy.pain,
        modules: copy.modules.slice(),
        proof: copy.proof
      };
    });
  }

  function syncExposedApps() {
    if (window.SmartPortfolio) {
      window.SmartPortfolio.apps = getExportedApps();
    }
  }

  function initPortfolioShowcase() {
    state.lang = detectLang();
    syncExposedApps();
    var container = document.getElementById('portfolio-showcase-root');
    if (container && !container.getAttribute('data-sp-mounted')) {
      container.setAttribute('data-sp-mounted', 'true');
      buildShowcase(container);
    }
  }

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('smartinovat:langchange', function (event) {
      var incoming =
        event && event.detail && event.detail.lang
          ? event.detail.lang
          : detectLang();
      setLanguage(incoming);
    });
  }

  window.SmartPortfolio = {
    openPreview: openPreview,
    closePreview: closePreview,
    filterByCategory: filterByCategory,
    setLanguage: setLanguage,
    init: initPortfolioShowcase,
    apps: getExportedApps()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioShowcase);
  } else {
    initPortfolioShowcase();
  }
})();
