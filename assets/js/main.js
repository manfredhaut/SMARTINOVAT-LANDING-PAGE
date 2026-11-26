/* ==========================================================================
   SmartInovaT — Main Interactive Controller, Bilingual Engine, Theme & Ads/SEO
   Exposes:
     - window.SmartTheme = { getTheme(), setTheme(t), toggleTheme() }
     - window.SmartI18n  = { getLang(), setLang(lang), t(key) }
     - window.SmartContact = { prefillTopic(topicText, extraDetails) }
     - window.SMARTINOVAT_TRACKING_CONFIG (GTM / GA4 / Google Ads / AdSense)
   ========================================================================== */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5585987875886';
  // Silent AJAX destination (never rendered in UI; zero exposed personal email)
  var DEFAULT_AJAX_ENDPOINT =
    window.SMARTINOVAT_CONTACT_ENDPOINT ||
    window.atob('aHR0cHM6Ly9mb3Jtc3VibWl0LmNvL2FqYXgvbWFuZnJlZEBzbWFydGlub3ZhdC5jb20=');

  // Configurable Marketing, Analytics & Monetization Layer (Google Consent Mode v2 Ready)
  window.SMARTINOVAT_TRACKING_CONFIG = window.SMARTINOVAT_TRACKING_CONFIG || {
    gtmId: '',             // e.g. 'GTM-XXXXXXX'
    ga4MeasurementId: '',  // e.g. 'G-XXXXXXXXXX'
    googleAdsId: '',       // e.g. 'AW-XXXXXXXXX'
    googleAdsLeadLabel: '',// e.g. 'AW-XXXXXXXXX/AbCdEfGhIjKlMnOpQr'
    adsenseClientId: ''    // e.g. 'ca-pub-XXXXXXXXXXXXXXXX'
  };

  window.dataLayer = window.dataLayer || [];
  function pushEvent(eventName, params) {
    var payload = Object.assign({ event: eventName }, params || {});
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function' && eventName !== 'consent_update') {
      try {
        window.gtag('event', eventName, params || {});
      } catch (_e) {}
    }
  }

  /* ========================================================================
     1. THEME ENGINE (dark / light) — window.SmartTheme
     ======================================================================== */
  function getTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    return attr === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme, skipStorage) {
    var normalized = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', normalized);
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', normalized === 'light' ? '#f3f6fb' : '#06080d');
    }
    if (!skipStorage) {
      try {
        localStorage.setItem('smartinovat_theme', normalized);
      } catch (_e) {}
    }
    window.dispatchEvent(
      new CustomEvent('smartinovat:themechange', { detail: { theme: normalized } })
    );
  }

  function toggleTheme() {
    var next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    pushEvent('theme_switch', { theme: next });
    announce(
      getLang() === 'en'
        ? 'Switched to ' + next + ' mode'
        : 'Alternado para modo ' + (next === 'light' ? 'claro' : 'escuro')
    );
  }

  window.SmartTheme = {
    getTheme: getTheme,
    setTheme: setTheme,
    toggleTheme: toggleTheme
  };

  /* ========================================================================
     2. BILINGUAL I18N DICTIONARY & ENGINE (pt / en) — window.SmartI18n
     ======================================================================== */
  var I18N = {
    pt: {
      meta_title: 'SmartInovaT | Consultoria Indústria 4.0, IoT e IA Aplicada',
      meta_desc: 'Consultoria Indústria 4.0, IoT/ERP, método ACATECH, ISO 42001 e IA em produção (+30 anos de expertise). Solicite diagnóstico executivo agora!',
      skip_link: 'Ir para o conteúdo principal',
      ribbon_location: 'POMERODE — SANTA CATARINA • POLO INDUSTRIAL DO VALE EUROPEU • ATUAÇÃO NACIONAL & GLOBAL',
      ribbon_apps: '9 Aplicações em Produção',
      ribbon_contact: 'Caixa de Contato Executivo',
      brand_sub: 'Soluções Empresariais',
      nav_aria: 'Navegação principal',
      nav_qualifications: 'Qualificações',
      nav_portfolio: 'Portfólio Vivo',
      nav_axes: 'Eixos & ACATECH',
      nav_pains: 'Soluções por Dor',
      nav_arch: 'Arquitetura & Governança',
      nav_contact: 'Contato',
      theme_toggle_aria: 'Alternar modo claro ou escuro',
      header_cta: 'Agendar Diagnóstico',

      hero_badge: 'ENGENHARIA INDUSTRIAL 4.0 • IA EM PRODUÇÃO • GOVERNANÇA ISO 56002 & 42001',
      hero_title_html: 'Do chão de fábrica físico à <span class="text-spectrum">decisão lógica</span> em produção.',
      hero_quote_html: '“<strong>Dados de chão de fábrica do mundo físico para o mundo lógico.</strong> Sem dado, a aplicação de Inteligência Artificial de forma ampla não é eficaz. A SmartInovaT resolve as duas pontas: <strong>conecta o que gera o dado</strong> e <strong>constrói o que o transforma em decisão</strong>.”',
      hero_subcopy_html: 'Uma empresa de nova geração construída sobre <strong>mais de 30 anos de expertise industrial real</strong>: a bagagem executiva de quem montou linha alemã, executou retrofitting de centros de usinagem CNC e ergueu planta fabril do alicerce ao ERP — hoje aplicada na arquitetura, desenvolvimento e operação de plataformas modernas de Inteligência Artificial em produção. Nem consultoria que terceiriza a execução, nem casa de software que desconhece a máquina.',
      hero_cta_1: 'Solicitar Diagnóstico de Maturidade Digital',
      hero_cta_2: 'Explorar 9 Aplicações Integradas',
      hero_cta_3: 'Entrar pela Minha Dor Operacional',
      hero_img_alt: 'Gestor e engenheira acompanham em um painel os dados que fluem de um centro de usinagem CNC em operação, no chão de fábrica',
      hero_hud_1: 'PONTA 01 • MÁQUINA, CNC & TELEMETRIA',
      hero_hud_2: 'PONTA 02 • ERP, IA & DECISÃO',
      hero_bridge_1: 'Chão de Fábrica & Sensores',
      hero_bridge_2: 'Aquisição Nuvem & ERP',
      hero_bridge_3: 'IA & Governança ISO',

      m1_unit: 'anos',
      m1_label: 'de expertise industrial e executiva acumulada do chão de fábrica à estratégia',
      m2_label: 'da usinagem dos tambores de freio da Mercedes-Benz Caminhões implantada',
      m3_unit: 't/mês',
      m3_label: 'unidade industrial têxtil construída integralmente do alicerce ao ERP e ISO',
      m4_unit: 't/mês',
      m4_label: 'planta de fiação com modernização produtiva e gestão de manutenção de ativos',
      m5_unit: 'anos',
      m5_label: 'dedicados continuamente a IoT, M2M, LPWAN e Indústria 4.0 em campo',
      m6_unit: 'apps',
      m6_label: 'aplicações web próprias projetadas e codificadas em setores distintos',

      qual_eyebrow: 'CREDIBILIDADE VERIFICADA • CHÃO DE FÁBRICA E CÓDIGO NA MESMA ARQUITETURA',
      qual_title_html: 'Empresa de Nova Geração com <span class="text-metallic">+30 Anos de Expertise Industrial</span>',
      qual_lead: 'Nascida em 2025 para unir o mundo físico à decisão com IA, a SmartInovaT traz em sua liderança técnica mais de três décadas de experiência acumulada e verificada em campo (1994–hoje) — da automação pneumática, montagem de maquinário alemão e retrofitting CNC à construção, já em 2000, de uma fábrica online com maturidade digital no estágio “Visibilidade” do ACATECH, à direção de centros de inovação e à construção própria de software em produção.',
      diff1_tag: 'Método Reconhecido',
      diff1_title: 'ACATECH Aplicado em Campo',
      diff1_desc_html: 'Diagnóstico de maturidade Indústria 4.0 pelo <strong>ACATECH Maturity Index</strong> vivenciado em operação real — traduzido em roadmap sequenciado por retorno financeiro, nunca discurso genérico de catálogo.',
      diff2_tag: 'Rastreabilidade Executiva',
      diff2_title: 'Governança ISO 56002 + ISO 42001',
      diff2_desc_html: 'Diferencial raro em consultorias de tecnologia: inovação estruturada como sistema contínuo pela <strong>ISO 56002</strong> combinada à governança responsável e auditável de IA pela <strong>ISO 42001</strong>.',
      diff3_tag: 'Capacidade Própria de Código',
      diff3_title: 'Portfólio Próprio de 9 Apps',
      diff3_desc: 'Nove sistemas web completos projetados e codificados pela própria SmartInovaT para necessidades distintas — provando domínio real de engenharia de software, segurança, dados e IA generativa.',
      diff4_tag: 'Bagagem Verificável',
      diff4_title: '+30 Anos de Chão de Fábrica Real',
      diff4_desc_html: 'Histórico comprovado em plantas de <strong>850 t/mês</strong> e <strong>1.500 t/mês</strong>, implantação de ERP, ISO 9001/14000, comércio exterior com a Alemanha e <strong>100% da usinagem</strong> de linha Mercedes-Benz Caminhões.',

      tl_tag: 'EXPERTISE FUNDADORA & LIDERANÇA TÉCNICA ACUMULADA (1994 — HOJE)',
      tl_title: 'Linha do Tempo de Engenharia: 30+ Anos de Bagagem que Sustentam a SmartInovaT',
      tl_filter_all: 'Trajetória Completa (9)',
      tl_filter_ind: 'Plantas, CNC & Alemanha (1994–2012)',
      tl_filter_ai: 'IoT, ACATECH & IA (2013–Hoje)',
      tl1_title: 'Automação Industrial & Engenharia Aplicada',
      tl1_desc_html: 'Desenvolvimento de soluções técnicas de automação em integração direta com <strong>Spirax Sarco</strong>, <strong>Rexroth (Divisão Pneumática)</strong>, ASCOVAL, Ashcroft, Compair e Domnick Hunter, com treinamentos técnicos em plantas industriais.',
      tl2_title: 'Planta Têxtil de 850 t/mês: Do Alicerce ao ERP',
      tl2_desc_html: 'Construção integral de unidade de malharia e beneficiamento de <strong>850 t/mês</strong>: obras civis, mecânicas, elétricas e TI, seleção de maquinário, sistemas de integração produtiva em toda a cadeia, implantação de <strong>ERP</strong> e certificações <strong>ISO 9001 e 14000</strong>.',
      tl3_title: 'Fiação de 1.500 t/mês & Gestão de Ativos',
      tl3_desc_html: 'Modernização e atualização tecnológica em unidade de fiação de <strong>1.500 t/mês</strong>, novos projetos fabris, adequação aos sistemas da qualidade ISO 9002 e 14000 e estruturação da gestão patrimonial e de manutenção de ativos.',
      tl4_title: 'Direção Executiva & Comércio Exterior com a Alemanha',
      tl4_desc_html: 'Engenharia de negócios internacionais, importação/exportação, <em>business plans</em> para unidades industriais da construção civil e operação direta de comércio exterior com a <strong>Alemanha</strong>, além de direção de projetos exportadores industriais junto ao SEBRAE.',
      tl5_title: 'Linha de Moldagem Alemã Künkel Wagner',
      tl5_desc_html: 'Coordenação executiva entre montagem pesada, produção e manutenção da máquina de moldar alemã <strong>KÜNKEL WAGNER</strong>, incluindo tradução técnica de manuais, alarmes, interfaces de operação (IHM) e capacitação de equipes.',
      tl6_title: '100% Usinagem Mercedes-Benz Caminhões & Retrofitting CNC',
      tl6_desc_html: 'Implantação de <strong>100% da usinagem dos tambores de freio da Mercedes-Benz do Brasil / Caminhões</strong>, usinagem de discos e tambores e <strong>retrofitting</strong> completo de centros de usinagem, tornos CNC e máquinas-ferramenta.',
      tl7_title: '~11 Anos em Monitoramento Wireless, M2M, IoT & Visão',
      tl7_desc_html: 'Quase onze anos dedicados a sistemas de <strong>monitoramento de máquinas wireless em tempo real</strong>, soluções <strong>M2M</strong> para assistência remota, <strong>IoT</strong>, redes <strong>LPWAN</strong>, sistemas de visão, energias renováveis, lean manufacturing e maturidade digital.',
      tl8_title: 'Liderança de Inovação, i-hub, ACATECH & ISO 56002',
      tl8_desc_html: 'Direção tecnológica e gestão de inovação pela norma <strong>ISO 56002</strong>, implantação de centros corporativos de inovação (<strong>i-hub</strong>), aplicação em campo do <strong>ACATECH Maturity Index</strong> e pesquisa aplicada de sistemas na UNIFOR.',
      tl9_period: '2025 – Hoje',
      tl9_title: 'Coleta Físico-Digital em Tempo Real & IA em Produção',
      tl9_desc_html: 'Integração de dados do mundo físico para o lógico em tempo real, desenvolvimento próprio de <strong>9 aplicações web com IA</strong>, transformação Indústria 4.0, modelagem de negócios e governança executiva <strong>ISO 56002 & ISO 42001</strong>.',

      comp1_title: 'Industrial & Automação',
      comp1_count: '13 Competências',
      c_i40: 'Indústria 4.0',
      c_iot: 'IoT Industrial',
      c_m2m: 'Comunicação M2M',
      c_lpwan: 'Redes LPWAN',
      c_retro: 'Retrofitting de Máquinas CNC',
      c_mon: 'Monitoramento de Máquinas e Sensores em Tempo Real',
      c_cloud: 'Aquisição e Registro de Dados em Nuvem',
      c_auto: 'Automação Industrial',
      c_eng: 'Engenharia Industrial',
      c_prod: 'Gestão de Produção',
      c_log: 'Logística Industrial em Tempo Real',
      c_ren: 'Energias Renováveis',

      comp2_title: 'Inovação & Governança',
      comp2_count: '9 Competências',
      c_iso56: 'ISO 56002 (Gestão da Inovação)',
      c_iso42: 'ISO 42001 (IA Responsável)',
      c_ihub: 'Centros de Inovação (i-hub)',
      c_inn_mgmt: 'Gestão de Inovação Contínua',
      c_inn_dig: 'Inovação Digital',
      c_inn_ent: 'Inovação Empresarial',
      c_roi_dt: 'Transformação Digital Orientada a ROI',

      comp3_title: 'Gestão, Dados & IA',
      comp3_count: '14 Competências',
      c_ai_prod: 'Inteligência Artificial em Produção',
      c_cv: 'Visão Computacional',
      c_pred: 'Manutenção Preditiva',
      c_erp: 'Integração de Sistemas & ERP',
      c_ba: 'Análise de Dados & Negócios',
      c_mt: 'Arquitetura Web Multi-Tenant',
      c_kc: 'Identidade Federada (Keycloak)',
      c_bizdev: 'Modelagem & Novos Negócios',
      c_pm: 'Planejamento & Gestão de Projetos',
      c_deliv: 'Entrega de Projetos Ponta-a-Ponta',
      c_proc: 'Processos Empresariais',
      c_genai: 'IA Generativa (Vídeo, Voz & Agentes)',
      c_smart_cs: 'Atendimento Inteligente',
      c_team: 'Integração e Capacitação de Equipes',

      port_eyebrow: 'PROVA CONCRETA DE ENGENHARIA • NOVE APLICAÇÕES INTERATIVAS INTEGRADAS',
      port_title_html: 'Vitrine Viva: <span class="text-spectrum">9 Aplicações Próprias</span> em Demonstração Interativa',
      port_lead: 'Nenhuma das nove plataformas abaixo é revenda ou adaptação de software de prateleira. Todas foram projetadas e codificadas pela própria SmartInovaT para necessidades reais distintas — de diagnóstico de processos e treinamento corporativo gamificado a estúdio de vídeo com avatar digital, mesa quantitativa em tempo real, identidade federada Keycloak e renderização vetorial complexa. Explore cada demonstração interativa integrada diretamente aqui ou em nova aba local.',

      aca_eyebrow: 'PORTA DE ENTRADA ESTRATÉGICA • MÉTODO ALEMÃO TRADUZIDO EM RETORNO',
      aca_title_html: 'Os 4 Eixos de Solução & <span class="text-metallic">Diagnóstico ACATECH</span>',
      aca_lead_html: 'O erro mais caro na indústria é comprar sensores, painéis ou licenças de IA sem saber onde o dado morre hoje. Aplicamos o <strong>ACATECH Industrie 4.0 Maturity Index</strong> em campo para traduzir maturidade técnica em plano de investimento sequenciado pelo retorno financeiro.',
      aca_li1_html: '<strong>Fotografia Real da Operação:</strong> avaliação estruturada dos 6 estágios (da computadorização básica à adaptabilidade autônoma) cruzando máquinas, sistemas, processos e pessoas.',
      aca_li2_html: '<strong>Roadmap Priorizado por ROI:</strong> identificação exata de qual gargalo destrava caixa primeiro — evitando investimentos prematuros no lugar errado.',
      aca_li3_html: '<strong>Escopo Fechado de Projeto-Piloto:</strong> desenho técnico de baixo risco e alto impacto, sem obrigação de continuidade.',
      aca_cta: 'Solicitar Escopo do Diagnóstico ACATECH',
      aca_img_alt: 'Diretora, engenheiro e gestor analisam, na sala de gestão ao lado do chão de fábrica, o painel digital com a escada de maturidade da operação',
      aca_fig_html: '<strong>Espinha Dorsal SmartInovaT:</strong> 1. Diagnóstico → 2. Conexão → 3. Inteligência → 4. Governança',

      conn_eyebrow: 'AS DUAS PONTAS RESOLVIDAS PELA MESMA ENGENHARIA',
      conn_title_html: 'Conectividade de Chão de Fábrica & <span class="text-spectrum">Inteligência Aplicada</span>',
      conn_lead: 'Enquanto integradores tradicionais param na coleta do sinal elétrico e consultorias digitais esperam receber planilhas prontas, a SmartInovaT projeta a ponte física na máquina e a camada algorítmica que transforma telemetria em previsibilidade operacional.',
      conn_img1_alt: 'Engenheira e operador conferem em um tablet os dados de um centro de usinagem CNC conectado, no chão de fábrica',
      conn_card1_badge: 'EIXO 02 • MUNDO FÍSICO → DIGITAL',
      conn_card1_title: 'IoT, M2M, LPWAN, Retrofitting CNC & Integração Direta ao ERP',
      conn_card1_desc: 'O dado não pode morrer dentro do comando da máquina nem depender de apontamento em papel no fim do turno. Com base em quase 11 anos de monitoramento industrial sem fio e experiência real em retrofitting de centros de usinagem e tornos, conectamos parques fabris novos ou legados direto à nuvem e ao ERP.',
      conn_s1: 'Retrofitting de máquinas-ferramenta e CNC',
      conn_s2: 'Monitoramento wireless em tempo real',
      conn_s3: 'Redes industriais LPWAN de longo alcance',
      conn_s4: 'Telemetria M2M para assistência remota',
      conn_s5: 'Ponte direta Máquina–Sensor–ERP',
      conn_s6: 'Logística industrial e registro em nuvem',
      conn_card1_foot: 'Base: ~11 anos IoT/M2M + Implantação ERP Industrial',
      conn_card1_cta: 'Avaliar Conectividade →',

      conn_img2_alt: 'Inspetora de qualidade analisa no monitor a imagem de uma peça usinada capturada por câmera industrial na bancada',
      conn_card2_badge: 'EIXO 03 • DADO → DECISÃO & AÇÃO',
      conn_card2_title: 'Visão Computacional, Manutenção Preditiva & Automação com IA',
      conn_card2_desc: 'Quando o dado flui com confiabilidade, estruturamos capacidades de engenharia de IA para atacar perdas reais: inspeção óptica automatizada em pontos onde a fadiga visual humana gera refugo, modelos preditivos sobre histórico de máquina para antecipar paradas e agentes inteligentes para processos repetitivos.',
      vis_s1: 'Inspeção óptica e controle de qualidade',
      vis_s2: 'Manutenção preditiva sobre séries históricas',
      vis_s3: 'Previsibilidade de produção e indicadores',
      vis_s4: 'Automação de rotinas fabris e administrativas',
      vis_s5: 'Agentes conversacionais de atendimento 24/7',
      vis_s6: 'Estúdios generativos de vídeo, voz e ensino',
      conn_card2_foot: 'Capacidade de Engenharia + Software Próprio',
      conn_card2_cta: 'Discutir Aplicação de IA →',

      pain_eyebrow: 'ORIENTAÇÃO AO PROBLEMA • COMECE PELA REALIDADE DA SUA OPERAÇÃO',
      pain_title_html: 'Catálogo por Necessidade: <span class="text-metallic">Da Dor Operacional à Solução</span>',
      pain_lead: 'Você não precisa saber qual protocolo ou modelo de IA contratar — basta reconhecer onde sua operação perde eficiência, margem ou segurança hoje. Clique na dor mais próxima do seu cenário para visualizar a arquitetura recomendada e as provas correspondentes.',

      arch_eyebrow: 'MAPA DE TECNOLOGIAS VERIFICADO EM CAMPO E EM CÓDIGO',
      arch_title_html: 'Arquitetura Tecnológica <span class="text-spectrum">Ponta-a-Ponta</span>',
      arch_lead: 'Inspeção transparente das 6 camadas tecnológicas operadas pela SmartInovaT — unindo sensores e retrofitting no chão de fábrica a React/Next.js, identidade federada Keycloak, containers isolados e normas internacionais de governança.',

      gov_eyebrow: 'SEGURANÇA PARA A ALTA GESTÃO • INOVAÇÃO CONTÍNUA & IA RESPONSÁVEL',
      gov_title_html: 'Governança <span class="text-metallic">ISO 56002 & ISO 42001</span> e Formatos de Atuação',
      gov_lead: 'Tecnologia sem governança gera dependência de “pessoas iluminadas” ou risco jurídico e operacional com uso sombra de IA. A ISO 56002 traz as diretrizes para o sistema de gestão da inovação; a ISO/IEC 42001 define os requisitos do sistema de gestão de Inteligência Artificial — a base para governar e usar a IA de forma responsável. Com as duas como referência, estruturamos o processo decisório da sua empresa e oferecemos 5 formatos claros de contratação — do diagnóstico avulso de escopo fechado ao software sob medida.',

      bespoke_eyebrow: 'ENGENHARIA DE SOLUÇÕES SOB CONSULTA',
      bespoke_title_html: 'Sua necessidade não está nesta lista? <span class="text-spectrum">Traga o problema — não precisa trazer a solução.</span>',
      bespoke_text_html: 'As nove aplicações que desenvolvemos nasceram todas de uma necessidade que não existia em prateleira. Nenhuma delas é adaptação de produto de terceiro: foram projetadas e codificadas pela SmartInovaT em setores sem nenhuma relação entre si — indústria, produtividade, saúde, educação, música, mercado financeiro e atendimento. Se o seu desafio envolve <strong>dado, processo ou decisão</strong>, ele cabe nessa conversa.',
      bespoke_cta: 'Conversar Sobre um Problema Específico',
      bespoke_img_alt: 'Gestor explica um problema da operação em um quadro de vidro enquanto uma engenheira consultora escuta e anota, com o chão de fábrica ao fundo',

      contact_eyebrow: 'CANAL EXECUTIVO DIRETO • SEM TRIAGEM BUROCRÁTICA',
      contact_title_html: 'Inicie uma Conversa Orientada ao <span class="text-spectrum">Seu Desafio</span>',
      contact_lead: 'Selecione a frente prioritária e descreva resumidamente o contexto operacional na caixa abaixo para encaminhamento direto à liderança técnica da SmartInovaT.',
      contact_card_title: 'Caixa de Contato Executivo',
      contact_card_sub: 'Envie seu desafio operacional diretamente para análise técnica e estratégica da SmartInovaT.',
      contact_channel_label: 'Canal Direto Verificado',
      contact_channel_status: 'Encaminhamento confidencial à Diretoria de Engenharia • Retorno prioritário',
      contact_channel_chip: 'Envio Direto',
      form_name_label: 'Nome & Empresa / Setor',
      form_name_ph: 'Seu nome e empresa (ex.: Metalmecânica, Têxtil...)',
      form_return_label: 'E-mail ou Telefone de Retorno',
      form_return_ph: 'seu.email@empresa.com.br ou +55 (DDD) 9XXXX-XXXX',
      form_topic_label: 'Desafio / Eixo de Interesse',
      opt_acatech: 'Diagnóstico ACATECH (Maturidade Indústria 4.0 & Roadmap)',
      opt_conn: 'Conexão Máquina / ERP / IoT, M2M & Retrofitting',
      opt_ai: 'IA Aplicada, Visão Computacional & Automação de Processos',
      opt_gov: 'Governança Executiva (ISO 56002 / ISO 42001) & Capacitação',
      opt_custom: 'Desenvolvimento de Aplicação Web / IA Sob Medida',
      pill_acatech: 'Diagnóstico ACATECH',
      pill_conn: 'Máquina + ERP / IoT',
      pill_ai: 'IA & Visão',
      pill_gov: 'ISO 56002 / 42001',
      pill_custom: 'Sob Medida',
      form_msg_label: 'Qual problema você quer resolver?',
      form_msg_ph: 'Conte de forma direta o cenário atual (ex.: parada de linha sem rastreamento, ERP desconectado das máquinas, necessidade de diagnóstico ACATECH ou projeto de software com IA)...',
      form_submit_btn: 'Enviar Mensagem à Engenharia',
      form_sending: 'Enviando com segurança...',
      form_validation_err: 'Por favor, preencha seu nome/empresa, um contato de retorno (e-mail ou telefone) e um breve resumo do desafio.',
      form_success: 'Mensagem enviada com sucesso! Nossa liderança de engenharia recebeu seu relato e retornará em breve pelo contato informado.',
      form_net_err: 'Não foi possível concluir o envio automático no momento. Verifique sua conexão e tente novamente, ou utilize o ícone flutuante de WhatsApp no canto inferior direito.',

      loc_badge: 'Base & Presença no Polo Industrial Catarinense',
      loc_title: 'Pomerode — Santa Catarina, Brasil',
      loc_region: 'Coração Industrial do Vale Europeu (SC) • Atendimento Nacional & Internacional',
      loc_desc_html: 'Estrategicamente posicionada em <strong>Pomerode — Santa Catarina</strong>, referência nacional em tradição industrial alemã, metalmecânica de precisão, têxtil, polímeros e automação no Vale Europeu. Atuamos presencialmente e remotamente em plantas industriais e operações corporativas em todo o território brasileiro e no exterior.',
      map_contrast_btn: 'Contraste Mapa',
      map_open_gmaps: 'Abrir no Google Maps ↗',
      loc_m1_k: 'Endereço',
      loc_m1_v: 'R. Presidente Costa e Silva, 203 — Testo Rega',
      loc_m2_k: 'Atendimento Rápido',
      loc_m3_k: 'Canal Corporativo',
      loc_m3_v: 'Caixa Executiva Direta ↑',
      loc_m4_k: 'Alcance de Atuação',
      loc_m4_v: 'Brasil, América Latina, EUA & Europa',

      faq_eyebrow: 'RESPOSTAS DIRETAS PARA TOMADORES DE DECISÃO',
      faq_title_html: 'Perguntas Frequentes <span class="text-metallic">Executivas</span>',
      faq_lead: 'Como estruturamos diagnósticos, conectividade de parque fabril legado, governança de IA e projetos de software sob medida.',
      faq1_q: 'Por onde começar quando a indústria ainda não tem máquinas conectadas nem indicadores confiáveis?',
      faq1_a_html: 'Pelo <a href="#eixos-acatech">Diagnóstico de Maturidade Digital ACATECH</a> de escopo fechado. Em vez de adquirir sensores ou licenças isoladas no escuro, avaliamos os 6 estágios da operação em campo, mapeamos onde o dado morre hoje e entregamos um <strong>roadmap priorizado por retorno financeiro (ROI)</strong> junto à especificação de um projeto-piloto de baixo risco.',
      faq2_q: 'É possível conectar centros de usinagem CNC e máquinas legadas ao ERP sem substituir o maquinário?',
      faq2_a_html: 'Sim. Combinando experiência prática em <a href="#conectividade-ia">retrofitting de máquinas-ferramenta, telemetria M2M e redes LPWAN / IoT</a>, coletamos dados operacionais em tempo real diretamente de equipamentos legados e os integramos à nuvem e ao ERP corporativo.',
      faq3_q: 'Qual a diferença da SmartInovaT frente a consultorias tradicionais e fábricas de software?',
      faq3_a_html: 'A SmartInovaT é uma empresa de nova geração construída sobre <a href="#qualificacoes">mais de 30 anos de expertise industrial real</a> — incluindo unidades de 850 t/mês e 1.500 t/mês, linhas alemãs e 100% da usinagem de tambores de freio para caminhões pesados — aliada à engenharia própria demonstrada nas <a href="#portfolio">9 aplicações web com IA</a> integradas nesta vitrine.',
      faq4_q: 'O que minha organização recebe na prática com a governança ISO 56002 e ISO 42001?',
      faq4_a_html: 'Na seção de <a href="#governanca">Governança ISO 56002 & ISO 42001</a>, estruturamos a inovação como sistema contínuo auditável (ISO 56002) e estabelecemos políticas, gestão de risco e rastreabilidade executiva para uso responsável de Inteligência Artificial (ISO 42001).',
      faq5_q: 'A SmartInovaT desenvolve aplicações web e agentes de IA para outros setores além da manufatura?',
      faq5_a_html: 'Sim. Nosso <a href="#portfolio">portfólio de 9 aplicações</a> abrange produtividade por processos, capacitação corporativa gamificada, atendimento comercial no WhatsApp, estúdio de vídeo com avatar digital, engenharia quantitativa em tempo real, identidade federada Keycloak, saúde e renderização vetorial. Descreva seu cenário na <a href="#contato">Caixa de Contato Executivo</a>.',

      footer_desc: 'Empresa de nova geração apoiada em +30 anos de expertise industrial real: dados de chão de fábrica do mundo físico para o mundo lógico, software próprio com IA em produção e governança executiva.',
      footer_col1: 'Navegação Executiva',
      f_link_qual: 'Qualificações & +30 Anos de Expertise',
      f_link_port: 'Portfólio Vivo (9 Demos Integradas)',
      f_link_axes: 'Os 4 Eixos & Diagnóstico ACATECH',
      f_link_conn: 'IoT, Retrofitting CNC & Visão IA',
      f_link_pain: 'Catálogo por Necessidade Operacional',
      f_link_arch: 'Arquitetura de 6 Camadas',
      f_link_gov: 'Governança ISO 56002 & ISO 42001',
      f_link_faq: 'Perguntas Frequentes (FAQ)',
      footer_col2: 'Demos Interativas',
      f_link_all_apps: 'Ver todas as 9 aplicações →',
      footer_col3: 'Contato & Alcance Global',
      f_loc: 'R. Presidente Costa e Silva, 203 — Testo Rega, Pomerode — SC',
      f_contact_box: 'Caixa de Contato Executivo',
      f_alt_lang_link: 'English Version (Global) ↗',
      f_book_aca: 'Agendar Diagnóstico ACATECH',
      f_privacy_prefs: 'Preferências de Privacidade & Cookies',
      footer_copy: '© 2026 SmartInovaT Soluções Empresariais • www.smartinovat.com • Pomerode — SC, Brasil.',
      consent_title: 'Privacidade & Métricas (LGPD / GDPR)',
      consent_text: 'Utilizamos cookies essenciais de funcionamento e, mediante sua autorização, métricas analíticas e de publicidade (Google Consent Mode v2) para aprimorar sua experiência executiva.',
      consent_accept: 'Aceitar Todos',
      consent_essential: 'Apenas Essenciais',
      wa_tooltip: 'WhatsApp Direto • +55 85 98787 5886'
    },

    en: {
      meta_title: 'SmartInovaT | Industry 4.0, Industrial IoT & Applied AI',
      meta_desc: 'Industry 4.0 consulting, IoT/ERP connectivity, ACATECH assessments, ISO 42001 & production AI (30+ yrs expertise). Request an assessment today!',
      skip_link: 'Skip to main content',
      ribbon_location: 'POMERODE — SANTA CATARINA, BRAZIL • EUROPEAN VALLEY INDUSTRIAL HUB • GLOBAL DELIVERY',
      ribbon_apps: '9 Live Production Apps',
      ribbon_contact: 'Executive Contact Desk',
      brand_sub: 'Enterprise Solutions',
      nav_aria: 'Primary navigation',
      nav_qualifications: 'Credentials',
      nav_portfolio: 'Live Portfolio',
      nav_axes: 'Axes & ACATECH',
      nav_pains: 'Solutions by Pain',
      nav_arch: 'Architecture & ISO',
      nav_contact: 'Contact',
      theme_toggle_aria: 'Toggle light or dark mode',
      header_cta: 'Book Assessment',

      hero_badge: 'INDUSTRY 4.0 ENGINEERING • PRODUCTION AI • ISO 56002 & 42001 GOVERNANCE',
      hero_title_html: 'From the physical shop floor to <span class="text-spectrum">logical decisions</span> in production.',
      hero_quote_html: '“<strong>Shop-floor data from the physical world to the logical world.</strong> Without reliable data, broad Artificial Intelligence deployment cannot succeed. SmartInovaT solves both ends: <strong>we connect what generates the data</strong> and <strong>build what transforms it into decisions</strong>.”',
      hero_subcopy_html: 'A next-generation engineering firm built upon <strong>over 30 years of real-world industrial expertise</strong>: the executive track record of assembling German machinery, retrofitting CNC machining centers, and building manufacturing plants from civil foundations to ERP — now applied to architecting, coding, and operating modern Artificial Intelligence platforms in production. Neither a consultancy that outsources execution, nor a software shop detached from heavy machinery.',
      hero_cta_1: 'Request Digital Maturity Assessment',
      hero_cta_2: 'Explore 9 Integrated Apps',
      hero_cta_3: 'Start from Your Operational Pain',
      hero_img_alt: 'A plant manager and an engineer follow, on a dashboard, the data flowing from a CNC machining center running on the shop floor',
      hero_hud_1: 'END 01 • MACHINE, CNC & TELEMETRY',
      hero_hud_2: 'END 02 • ERP, AI & DECISION',
      hero_bridge_1: 'Shop Floor & Sensors',
      hero_bridge_2: 'Cloud Ingestion & ERP',
      hero_bridge_3: 'AI & ISO Governance',

      m1_unit: 'yrs',
      m1_label: 'of accumulated industrial & executive expertise from shop floor to boardroom',
      m2_label: 'of Mercedes-Benz Trucks brake-drum machining line commissioned',
      m3_unit: 't/mo',
      m3_label: 'textile manufacturing plant built end-to-end from foundation to ERP & ISO',
      m4_unit: 't/mo',
      m4_label: 'spinning mill plant modernization and enterprise asset maintenance',
      m5_unit: 'yrs',
      m5_label: 'continuously dedicated to field IoT, M2M, LPWAN & Industry 4.0',
      m6_unit: 'apps',
      m6_label: 'proprietary web applications engineered across distinct industries',

      qual_eyebrow: 'VERIFIED TRACK RECORD • HEAVY MACHINERY AND PRODUCTION CODE UNDER ONE ROOF',
      qual_title_html: 'Next-Generation Firm Backed by <span class="text-metallic">30+ Years of Industrial Expertise</span>',
      qual_lead: 'Established in 2025 to bridge physical operations with AI-driven decisions, SmartInovaT carries over three decades of verified field engineering leadership (1994–present) — spanning industrial pneumatics, German molding lines, and CNC retrofitting, an online factory built as early as 2000 at the ACATECH “Visibility” maturity stage, corporate innovation hubs, and full-stack AI software in production.',
      diff1_tag: 'Recognized Methodology',
      diff1_title: 'Field-Applied ACATECH Index',
      diff1_desc_html: 'Industry 4.0 maturity diagnostics via the German <strong>ACATECH Maturity Index</strong> applied in live operations — translated into ROI-sequenced investment roadmaps rather than theoretical slide decks.',
      diff2_tag: 'Executive Traceability',
      diff2_title: 'ISO 56002 + ISO 42001 Governance',
      diff2_desc_html: 'A rare capability in AI advisory: continuous innovation structured under <strong>ISO 56002</strong> paired with auditable, responsible AI governance under <strong>ISO 42001</strong>.',
      diff3_tag: 'In-House Software Engineering',
      diff3_title: '9 Proprietary Web Applications',
      diff3_desc: 'Nine complete web applications designed and coded in-house across unrelated sectors — proving end-to-end mastery of cloud architecture, federated security, data, and generative AI.',
      diff4_tag: 'Verified Shop-Floor Numbers',
      diff4_title: '30+ Years of Real Manufacturing',
      diff4_desc_html: 'Proven leadership across <strong>850 t/month</strong> and <strong>1,500 t/month</strong> plants, ERP rollouts, ISO 9001/14000, foreign trade with Germany, and <strong>100% of machining</strong> for a Mercedes-Benz Trucks line.',

      tl_tag: 'FOUNDING EXPERTISE & ACCUMULATED TECHNICAL LEADERSHIP (1994 — PRESENT)',
      tl_title: 'Engineering Timeline: 30+ Years of Field Mastery Powering SmartInovaT',
      tl_filter_all: 'Full Track Record (9)',
      tl_filter_ind: 'Plants, CNC & Germany (1994–2012)',
      tl_filter_ai: 'IoT, ACATECH & AI (2013–Present)',
      tl1_title: 'Industrial Automation & Field Engineering',
      tl1_desc_html: 'Development of industrial automation solutions integrating <strong>Spirax Sarco</strong>, <strong>Rexroth (Pneumatics Division)</strong>, ASCOVAL, Ashcroft, Compair, and Domnick Hunter, alongside technical plant training.',
      tl2_title: '850 t/month Textile Plant: Foundation to ERP',
      tl2_desc_html: 'Greenfield construction of an <strong>850 t/month</strong> knitting and finishing facility: civil, mechanical, electrical, and IT works, machinery selection, full-chain production integration, <strong>ERP rollout</strong>, and <strong>ISO 9001 & 14000</strong> certifications.',
      tl3_title: '1,500 t/month Spinning Plant & Asset Management',
      tl3_desc_html: 'Plant modernization and industrial upgrades across a <strong>1,500 t/month</strong> spinning operation, ISO 9002 and 14000 quality compliance, and enterprise asset & maintenance governance.',
      tl4_title: 'Executive Leadership & Foreign Trade with Germany',
      tl4_desc_html: 'International engineering trade, import/export operations, industrial business plans, and direct bilateral commerce with <strong>Germany</strong>, plus executive leadership of industrial export programs with SEBRAE.',
      tl5_title: 'German Künkel Wagner Molding Line Assembly',
      tl5_desc_html: 'Cross-functional coordination across heavy assembly, production, and maintenance for a German <strong>KÜNKEL WAGNER</strong> molding line, including technical translation of manuals, alarms, HMIs, and crew training.',
      tl6_title: '100% Mercedes-Benz Trucks Machining & CNC Retrofitting',
      tl6_desc_html: 'Commissioning of <strong>100% of the brake-drum machining line for Mercedes-Benz Brazil / Trucks</strong>, brake disc/drum machining, and comprehensive <strong>retrofitting</strong> of CNC machining centers and lathes.',
      tl7_title: '~11 Years in Wireless Telemetry, M2M, IoT & Vision',
      tl7_desc_html: 'Nearly eleven years dedicated to <strong>real-time wireless machine monitoring</strong>, remote-assistance <strong>M2M</strong>, industrial <strong>IoT</strong>, <strong>LPWAN</strong> networks, vision systems, renewable energy, lean manufacturing, and digital maturity diagnostics.',
      tl8_title: 'Innovation Direction, i-hub, ACATECH & ISO 56002',
      tl8_desc_html: 'Executive CTO and Head of Innovation leading <strong>ISO 56002</strong> governance, corporate innovation hubs (<strong>i-hub</strong>), field deployment of the <strong>ACATECH Maturity Index</strong>, and applied systems R&D at UNIFOR.',
      tl9_period: '2025 – Present',
      tl9_title: 'Real-Time Physical-to-Logical Data & Production AI',
      tl9_desc_html: 'Real-time physical-to-digital data acquisition, in-house engineering of <strong>9 proprietary AI web applications</strong>, Industry 4.0 transformation, business modeling, and <strong>ISO 56002 & ISO 42001</strong> governance.',

      comp1_title: 'Industrial & Automation',
      comp1_count: '13 Competencies',
      c_i40: 'Industry 4.0',
      c_iot: 'Industrial IoT',
      c_m2m: 'M2M Telemetry',
      c_lpwan: 'LPWAN Networks',
      c_retro: 'CNC Machine Retrofitting',
      c_mon: 'Real-Time Machine & Sensor Monitoring',
      c_cloud: 'Cloud Data Acquisition & Logging',
      c_auto: 'Industrial Automation',
      c_eng: 'Industrial Engineering',
      c_prod: 'Production Management',
      c_log: 'Real-Time Industrial Logistics',
      c_ren: 'Renewable Energy',

      comp2_title: 'Innovation & Governance',
      comp2_count: '9 Competencies',
      c_iso56: 'ISO 56002 (Innovation Management)',
      c_iso42: 'ISO 42001 (Responsible AI)',
      c_ihub: 'Innovation Hubs (i-hub)',
      c_inn_mgmt: 'Continuous Innovation Systems',
      c_inn_dig: 'Digital Innovation',
      c_inn_ent: 'Enterprise Innovation',
      c_roi_dt: 'ROI-Driven Digital Transformation',

      comp3_title: 'Management, Data & AI',
      comp3_count: '14 Competencies',
      c_ai_prod: 'Production Artificial Intelligence',
      c_cv: 'Computer Vision',
      c_pred: 'Predictive Maintenance',
      c_erp: 'Systems & ERP Integration',
      c_ba: 'Data & Business Analytics',
      c_mt: 'Multi-Tenant Web Architecture',
      c_kc: 'Federated Identity (Keycloak)',
      c_bizdev: 'Business Modeling & Ventures',
      c_pm: 'Project Planning & Governance',
      c_deliv: 'End-to-End Project Delivery',
      c_proc: 'Enterprise Process Engineering',
      c_genai: 'Generative AI (Video, Voice & Agents)',
      c_smart_cs: 'Conversational AI Operations',
      c_team: 'Corporate Team Enablement',

      port_eyebrow: 'CONCRETE EXECUTION PROOF • NINE INTEGRATED INTERACTIVE APPLICATIONS',
      port_title_html: 'Live Showcase: <span class="text-spectrum">9 Proprietary Applications</span> in Interactive Demo',
      port_lead: 'None of the nine platforms below is resold or white-labeled third-party software. Every system was architected and coded in-house by SmartInovaT across vastly different sectors — from AI process twins and gamified corporate training to digital-avatar video studios, real-time quantitative engines, Keycloak federated portals, and high-density vector score rendering. Launch interactive demos directly here or open local mockups in a new tab.',

      aca_eyebrow: 'STRATEGIC ENTRY POINT • GERMAN METHODOLOGY TRANSLATED INTO ROI',
      aca_title_html: 'The 4 Solution Axes & <span class="text-metallic">ACATECH Assessment</span>',
      aca_lead_html: 'The costliest mistake in manufacturing is buying isolated sensors, dashboards, or AI licenses without knowing where operational data dies today. We apply the <strong>ACATECH Industrie 4.0 Maturity Index</strong> on the ground to turn technical maturity into an ROI-sequenced investment plan.',
      aca_li1_html: '<strong>True Operational Baseline:</strong> structured audit across all 6 Industry 4.0 stages (from computerization to autonomous adaptability) spanning machines, IT systems, processes, and teams.',
      aca_li2_html: '<strong>ROI-Prioritized Roadmap:</strong> clear sequencing of which bottleneck unlocks cash flow first — eliminating premature capital expenditure.',
      aca_li3_html: '<strong>Fixed-Scope Pilot Blueprint:</strong> low-risk, high-impact technical architecture with zero lock-in obligation.',
      aca_cta: 'Request ACATECH Assessment Scope',
      aca_img_alt: 'A director, an engineer and a manager review the digital maturity staircase of the operation on a wall dashboard next to the shop floor',
      aca_fig_html: '<strong>SmartInovaT Backbone:</strong> 1. Assessment → 2. Connectivity → 3. Intelligence → 4. Governance',

      conn_eyebrow: 'BOTH ENDS ENGINEERED BY THE SAME TEAM',
      conn_title_html: 'Shop-Floor Connectivity & <span class="text-spectrum">Applied Intelligence</span>',
      conn_lead: 'While traditional integrators stop at electrical PLC signals and digital consultancies wait for clean spreadsheets, SmartInovaT engineers both the physical machine bridge and the AI layer that turns telemetry into operational predictability.',
      conn_img1_alt: 'An engineer and a machine operator check on a tablet the live data from a connected CNC machining center on the shop floor',
      conn_card1_badge: 'AXIS 02 • PHYSICAL → DIGITAL',
      conn_card1_title: 'IoT, M2M, LPWAN, CNC Retrofitting & Direct ERP Integration',
      conn_card1_desc: 'Production data must never die inside machine controllers or rely on end-of-shift paper logs. Backed by nearly 11 years of wireless machine monitoring and hands-on CNC machining center retrofitting, we connect new and legacy shop floors directly to cloud pipelines and your ERP.',
      conn_s1: 'Machine-tool & CNC retrofitting',
      conn_s2: 'Real-time wireless machine telemetry',
      conn_s3: 'Long-range industrial LPWAN networks',
      conn_s4: 'M2M remote diagnostics & assistance',
      conn_s5: 'Direct Machine–Sensor–ERP bridge',
      conn_s6: 'Real-time logistics & cloud historians',
      conn_card1_foot: 'Foundation: ~11 yrs IoT/M2M + Industrial ERP Rollouts',
      conn_card1_cta: 'Evaluate Connectivity →',

      conn_img2_alt: 'A quality inspector reviews on a monitor the image of a machined part captured by an industrial camera at the bench',
      conn_card2_badge: 'AXIS 03 • DATA → DECISION & ACTION',
      conn_card2_title: 'Computer Vision, Predictive Maintenance & AI Automation',
      conn_card2_desc: 'Once reliable data flows, we deploy AI engineering capabilities targeting measurable losses: automated optical quality inspection where human visual fatigue drives scrap, predictive models over historical telemetry to anticipate unplanned stops, and intelligent agents for repetitive workflows.',
      vis_s1: 'Optical inspection & line quality control',
      vis_s2: 'Predictive maintenance on telemetry series',
      vis_s3: 'Production forecasting & executive KPIs',
      vis_s4: 'Shop-floor & back-office AI automation',
      vis_s5: '24/7 conversational AI sales & support',
      vis_s6: 'Generative video, voice & training studios',
      conn_card2_foot: 'Engineering Capability + Proprietary Software',
      conn_card2_cta: 'Discuss AI Deployment →',

      pain_eyebrow: 'PROBLEM-FIRST NAVIGATION • START FROM YOUR OPERATIONAL REALITY',
      pain_title_html: 'Solutions by Need: <span class="text-metallic">From Operational Pain to Architecture</span>',
      pain_lead: 'You don’t need to pick a protocol or AI acronym upfront — simply identify where your operation loses uptime, margin, or control today. Select the scenario closest to yours to inspect the technical route and live portfolio proof.',

      arch_eyebrow: 'TECHNOLOGY STACK VERIFIED IN THE FIELD AND IN PRODUCTION CODE',
      arch_title_html: 'End-to-End <span class="text-spectrum">Technology Architecture</span>',
      arch_lead: 'Transparent blueprint across all 6 technology layers operated by SmartInovaT — bridging shop-floor sensors and CNC retrofitting with React/Next.js, Keycloak federated identity, isolated containers, and international ISO standards.',

      gov_eyebrow: 'EXECUTIVE ASSURANCE • CONTINUOUS INNOVATION & RESPONSIBLE AI',
      gov_title_html: '<span class="text-metallic">ISO 56002 & ISO 42001</span> Governance & Engagement Models',
      gov_lead: 'Technology without governance creates reliance on isolated “hero” individuals or exposes the company to shadow-AI risk. ISO 56002 provides the guidance for an innovation management system; ISO/IEC 42001 sets the requirements for an Artificial Intelligence management system — the basis for governing and using AI responsibly. With both as reference, we institutionalize innovation and AI traceability while offering 5 clear engagement formats — from standalone assessments to custom software.',

      bespoke_eyebrow: 'BESPOKE ENGINEERING & CUSTOM SOFTWARE',
      bespoke_title_html: 'Don’t see your exact case listed? <span class="text-spectrum">Bring the problem — you don’t need to bring the solution.</span>',
      bespoke_text_html: 'Every single one of the nine applications we engineered was born from a real-world need that off-the-shelf software could not solve. None is a third-party adaptation: all were architected and coded by SmartInovaT across unrelated sectors — manufacturing, productivity, healthcare, education, music, financial markets, and customer operations. If your challenge involves <strong>data, process, or decisions</strong>, it belongs in this conversation.',
      bespoke_cta: 'Discuss a Custom Engineering Challenge',
      bespoke_img_alt: 'A plant manager explains an operational problem on a glass board while a consulting engineer listens and takes notes, with the shop floor in the background',

      contact_eyebrow: 'DIRECT EXECUTIVE CHANNEL • ZERO SALES GATEKEEPING',
      contact_title_html: 'Start a Conversation Around <span class="text-spectrum">Your Challenge</span>',
      contact_lead: 'Select your primary priority and briefly describe your operational context below for direct routing to SmartInovaT’s engineering leadership.',
      contact_card_title: 'Executive Contact Desk',
      contact_card_sub: 'Send your operational or strategic challenge directly to SmartInovaT’s technical leadership.',
      contact_channel_label: 'Verified Direct Routing',
      contact_channel_status: 'Confidential delivery to Engineering Leadership • Priority response',
      contact_channel_chip: 'Direct Dispatch',
      form_name_label: 'Name & Company / Sector',
      form_name_ph: 'Your name & company (e.g., Automotive, Textile, SaaS...)',
      form_return_label: 'Business Email or Phone',
      form_return_ph: 'you@company.com or +1 / +49 / +55...',
      form_topic_label: 'Primary Challenge / Axis',
      opt_acatech: 'ACATECH Assessment (Industry 4.0 Maturity & ROI Roadmap)',
      opt_conn: 'Machine / ERP / IoT, M2M Connectivity & Retrofitting',
      opt_ai: 'Applied AI, Computer Vision & Process Automation',
      opt_gov: 'Executive Governance (ISO 56002 / ISO 42001) & Training',
      opt_custom: 'Custom Web / AI Application Engineering',
      pill_acatech: 'ACATECH Assessment',
      pill_conn: 'Machine + ERP / IoT',
      pill_ai: 'Applied AI & Vision',
      pill_gov: 'ISO 56002 / 42001',
      pill_custom: 'Custom Build',
      form_msg_label: 'What problem do you want to solve?',
      form_msg_ph: 'Briefly describe your operational context (e.g., untracked machine downtime, ERP disconnected from shop floor, ACATECH roadmap, or custom AI software)...',
      form_submit_btn: 'Send Message to Engineering',
      form_sending: 'Sending securely...',
      form_validation_err: 'Please enter your name/company, a return email or phone number, and a brief summary of your challenge.',
      form_success: 'Message sent successfully! Our engineering leadership received your inquiry and will reply shortly via your provided contact.',
      form_net_err: 'Automatic submission could not complete right now. Please check your connection and retry, or use the floating WhatsApp icon in the bottom-right corner.',

      loc_badge: 'Base & Presence in Southern Brazil’s Industrial Belt',
      loc_title: 'Pomerode — Santa Catarina, Brazil',
      loc_region: 'Industrial Heart of the European Valley (SC) • Nationwide & Global Delivery',
      loc_desc_html: 'Strategically based in <strong>Pomerode — Santa Catarina</strong>, renowned across Brazil for German-rooted precision metalworking, machinery, textiles, polymers, and industrial automation in the European Valley. We support industrial plants and enterprise teams both on-site and remotely across Brazil, the Americas, and Europe.',
      map_contrast_btn: 'Map Contrast',
      map_open_gmaps: 'Open in Google Maps ↗',
      loc_m1_k: 'Address',
      loc_m1_v: 'R. Presidente Costa e Silva, 203 — Testo Rega',
      loc_m2_k: 'Direct Messaging',
      loc_m3_k: 'Corporate Desk',
      loc_m3_v: 'Executive Contact Form ↑',
      loc_m4_k: 'Operating Reach',
      loc_m4_v: 'Brazil, Americas & Europe',

      faq_eyebrow: 'STRAIGHT ANSWERS FOR INDUSTRIAL & C-LEVEL LEADERS',
      faq_title_html: 'Executive <span class="text-metallic">Frequently Asked Questions</span>',
      faq_lead: 'How we structure maturity diagnostics, legacy shop-floor connectivity, ISO AI governance, and custom software delivery.',
      faq1_q: 'Where should a manufacturer start when machines are not connected and operational KPIs are unreliable?',
      faq1_a_html: 'Start with our fixed-scope <a href="#eixos-acatech">ACATECH Digital Maturity Assessment</a>. Instead of buying isolated sensors or AI licenses in the dark, we audit all 6 Industry 4.0 stages in the field, map where operational data dies today, and deliver an <strong>ROI-prioritized roadmap</strong> paired with a low-risk pilot blueprint.',
      faq2_q: 'Can legacy CNC machining centers and industrial equipment be connected to our ERP without replacing heavy machinery?',
      faq2_a_html: 'Yes. Combining hands-on <a href="#conectividade-ia">machine-tool retrofitting, M2M telemetry, and LPWAN / IoT networks</a>, we capture real-time signals from legacy equipment and integrate them directly into cloud storage and your corporate ERP.',
      faq3_q: 'How does SmartInovaT differ from traditional management consultancies and pure software agencies?',
      faq3_a_html: 'SmartInovaT is a next-generation firm built on <a href="#qualificacoes">over 30 years of verified industrial expertise</a> — including commissioning 850 t/month and 1,500 t/month plants, German molding lines, and 100% of Mercedes-Benz Trucks brake-drum machining — combined with in-house engineering demonstrated across our <a href="#portfolio">9 integrated web & AI applications</a>.',
      faq4_q: 'What concrete business deliverables do ISO 56002 and ISO 42001 governance provide?',
      faq4_a_html: 'In our <a href="#governanca">ISO 56002 & ISO 42001 Governance</a> practice, ISO 56002 structures innovation into a continuous management system with clear metrics, while ISO 42001 establishes corporate policies, risk controls, and auditable traceability for responsible AI deployment.',
      faq5_q: 'Does SmartInovaT build custom web applications and AI agents for sectors beyond manufacturing?',
      faq5_a_html: 'Yes. Our <a href="#portfolio">9 proprietary applications</a> span process productivity, gamified corporate training, WhatsApp AI concierges, digital avatar video studios, real-time quantitative analytics, Keycloak federated portals, wellness, and vector audio rendering. Share your scenario in the <a href="#contato">Executive Contact Desk</a>.',

      footer_desc: 'Next-generation firm built on 30+ years of real industrial expertise: shop-floor data from the physical world to the logical world, proprietary AI software in production, and executive ISO governance.',
      footer_col1: 'Executive Navigation',
      f_link_qual: 'Credentials & 30+ Yrs Expertise',
      f_link_port: 'Live Portfolio (9 Integrated Demos)',
      f_link_axes: '4 Solution Axes & ACATECH',
      f_link_conn: 'IoT, CNC Retrofitting & Vision AI',
      f_link_pain: 'Solutions by Operational Pain',
      f_link_arch: '6-Layer Technology Stack',
      f_link_gov: 'ISO 56002 & ISO 42001 Governance',
      f_link_faq: 'Executive FAQ',
      footer_col2: 'Interactive Demos',
      f_link_all_apps: 'Explore all 9 applications →',
      footer_col3: 'Contact & Global Reach',
      f_loc: 'R. Presidente Costa e Silva, 203 — Testo Rega, Pomerode — SC, Brazil',
      f_contact_box: 'Executive Contact Desk',
      f_alt_lang_link: 'Versão em Português (Brasil) ↗',
      f_book_aca: 'Book ACATECH Assessment',
      f_privacy_prefs: 'Privacy & Cookie Preferences',
      footer_copy: '© 2026 SmartInovaT Enterprise Solutions • www.smartinovat.com • Pomerode — SC, Brazil.',
      consent_title: 'Privacy & Analytics (GDPR / LGPD)',
      consent_text: 'We use essential functional cookies and, with your permission, analytics and advertising measurement signals (Google Consent Mode v2) to enhance our executive platform.',
      consent_accept: 'Accept All',
      consent_essential: 'Essential Only',
      wa_tooltip: 'Direct WhatsApp • +55 85 98787 5886'
    }
  };

  function getLang() {
    var ds = document.documentElement.getAttribute('data-lang');
    if (ds === 'en' || ds === 'pt') return ds;
    var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    return htmlLang.indexOf('en') === 0 ? 'en' : 'pt';
  }

  function t(key) {
    var lang = getLang();
    var pack = I18N[lang] || I18N.pt;
    return pack[key] !== undefined ? pack[key] : (I18N.pt[key] || '');
  }

  function applyLanguageToDOM(lang) {
    var pack = I18N[lang] || I18N.pt;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');

    if (pack.meta_title) document.title = pack.meta_title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pack.meta_desc) {
      metaDesc.setAttribute('content', pack.meta_desc);
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (pack[k] !== undefined) el.textContent = pack[k];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (pack[k] !== undefined) el.innerHTML = pack[k];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-placeholder');
      if (pack[k] !== undefined) el.setAttribute('placeholder', pack[k]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (pack[k] !== undefined) el.setAttribute('aria-label', pack[k]);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      if (pack[k] !== undefined) el.setAttribute('alt', pack[k]);
    });

    // Update alternate static route link in footer
    var isSubdirEn = (window.SMARTINOVAT_ROOT_PREFIX || './') === '../';
    document.querySelectorAll('[data-alt-lang-href]').forEach(function (link) {
      if (lang === 'en') {
        link.setAttribute('href', isSubdirEn ? '../' : './');
      } else {
        link.setAttribute('href', isSubdirEn ? './' : 'en/');
      }
    });

    // Update PT | EN switcher buttons
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-set-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    // Update WhatsApp pre-filled greeting according to active language
    var waFloat = document.getElementById('whatsapp-float-btn');
    if (waFloat) {
      var greeting =
        lang === 'en'
          ? 'Hello, I visited www.smartinovat.com and would like to speak with SmartInovaT engineering.'
          : 'Olá, vim pelo site www.smartinovat.com e gostaria de falar com a SmartInovaT.';
      waFloat.setAttribute(
        'href',
        'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(greeting)
      );
    }

    // Format 1,500 vs 1.500 metric counter
    var c1500 = document.querySelector('[data-counter="1500"]');
    if (c1500) {
      c1500.textContent = lang === 'en' ? '1,500' : '1.500';
    }
  }

  function setLang(lang, silent) {
    var normalized = lang === 'en' ? 'en' : 'pt';
    applyLanguageToDOM(normalized);
    try {
      localStorage.setItem('smartinovat_lang', normalized);
    } catch (_e) {}

    window.dispatchEvent(
      new CustomEvent('smartinovat:langchange', { detail: { lang: normalized } })
    );

    if (!silent) {
      pushEvent('language_switch', { language: normalized });
      announce(normalized === 'en' ? 'Language set to English' : 'Idioma alterado para Português');
    }
  }

  window.SmartI18n = {
    getLang: getLang,
    setLang: setLang,
    t: t
  };

  /* ========================================================================
     3. SMART CONTACT CONTRACT & FORM SUBMISSION — window.SmartContact
     ======================================================================== */
  var TOPIC_OPTIONS = [
    {
      value: 'Diagnóstico ACATECH',
      keywords: ['acatech', 'diagnóstico', 'diagnostico', 'assessment', 'maturidade', 'maturity', 'roadmap', 'começar', 'start', 'piloto', 'pilot', 'produthivia'],
      promptPt: 'Gostaríamos de avaliar o Diagnóstico de Maturidade Digital (ACATECH) com roadmap priorizado por retorno para nossa operação.',
      promptEn: 'We would like to evaluate an ACATECH Digital Maturity Assessment with an ROI-prioritized roadmap for our operation.'
    },
    {
      value: 'Conexão Máquina/ERP/IoT',
      keywords: ['máquina', 'maquina', 'machine', 'erp', 'iot', 'm2m', 'lpwan', 'sensor', 'retrofitting', 'cnc', 'parada', 'downtime', 'stops', 'espalhados', 'scattered', 'indicador', 'kpi', 'strikeflow'],
      promptPt: 'Buscamos conectar dados de máquinas/sensores em tempo real e integrá-los de forma estruturada ao nosso ERP e indicadores.',
      promptEn: 'We want to connect real-time machine/sensor telemetry and integrate it cleanly into our ERP and operational KPIs.'
    },
    {
      value: 'IA Aplicada/Automação',
      keywords: ['ia', 'ai', 'visão', 'visao', 'vision', 'refugo', 'scrap', 'inspeção', 'inspection', 'preditiva', 'predictive', 'repetitiva', 'repetitive', 'whatsapp', 'venda', 'sales', 'vídeo', 'video', 'avatar', 'automação', 'automation', 'presenthia', 'eckko'],
      promptPt: 'Temos interesse em aplicar Inteligência Artificial / automação para ganho direto de qualidade, previsibilidade ou produtividade.',
      promptEn: 'We are interested in deploying Applied AI / automation for measurable gains in quality, predictability, or productivity.'
    },
    {
      value: 'Governança ISO 56002/42001',
      keywords: ['iso', '56002', '42001', 'governança', 'governanca', 'governance', 'risco', 'risk', 'capacitação', 'training', 'adoption', 'treinamento', 'equipe não usa', 'inovação', 'i-hub', 'mentoria', 'capacittai'],
      promptPt: 'Queremos estruturar governança executiva (ISO 56002 / ISO 42001) ou capacitação corporativa para adoção segura e contínua.',
      promptEn: 'We want to structure executive governance (ISO 56002 / ISO 42001) or corporate AI enablement for safe, continuous adoption.'
    },
    {
      value: 'Desenvolvimento Sob Medida',
      keywords: ['sob medida', 'sob consulta', 'custom', 'bespoke', 'software', 'aplicação', 'application', 'específico', 'specific', 'prateleira'],
      promptPt: 'Temos um desafio específico de dados, processo ou decisão e gostaríamos de discutir uma arquitetura ou aplicação sob medida.',
      promptEn: 'We have a specific data, process, or decision challenge and would like to discuss a custom architecture or web/AI application.'
    }
  ];

  function announce(msg) {
    var live = document.getElementById('live-announcer');
    if (live) {
      live.textContent = '';
      window.setTimeout(function () {
        live.textContent = msg;
      }, 30);
    }
  }

  function matchSelectOption(rawTopic) {
    if (!rawTopic) return TOPIC_OPTIONS[0];
    var normalized = String(rawTopic).toLowerCase();

    for (var i = 0; i < TOPIC_OPTIONS.length; i++) {
      if (TOPIC_OPTIONS[i].value.toLowerCase() === normalized) {
        return TOPIC_OPTIONS[i];
      }
    }

    for (var j = 0; j < TOPIC_OPTIONS.length; j++) {
      var kws = TOPIC_OPTIONS[j].keywords;
      for (var k = 0; k < kws.length; k++) {
        if (normalized.indexOf(kws[k]) !== -1) {
          return TOPIC_OPTIONS[j];
        }
      }
    }

    return TOPIC_OPTIONS[4];
  }

  function syncTopicPills(selectedValue) {
    var pills = document.querySelectorAll('[data-topic-select]');
    for (var i = 0; i < pills.length; i++) {
      var isMatch = pills[i].getAttribute('data-topic-select') === selectedValue;
      pills[i].classList.toggle('is-active', isMatch);
    }
  }

  function prefillTopic(topicText, extraDetails) {
    var raw = topicText ? String(topicText).trim() : 'Diagnóstico ACATECH';
    var matched = matchSelectOption(raw);
    var lang = getLang();

    var selectEl = document.getElementById('contact-topic');
    var msgEl = document.getElementById('contact-message');
    var companyEl = document.getElementById('contact-company');
    var contactSection = document.getElementById('contato');
    var contactCard = document.getElementById('contact-card');

    if (selectEl) {
      selectEl.value = matched.value;
      syncTopicPills(matched.value);
    }

    if (msgEl) {
      var isExactCategory = false;
      for (var i = 0; i < TOPIC_OPTIONS.length; i++) {
        if (TOPIC_OPTIONS[i].value.toLowerCase() === raw.toLowerCase()) {
          isExactCategory = true;
          break;
        }
      }

      var contextPrefix = lang === 'en' ? 'Operational context: ' : 'Contexto na nossa operação: ';
      var scenarioPrefix = lang === 'en' ? 'Selected scenario / need: "' : 'Cenário / Necessidade identificada: "';
      var defaultPrompt = lang === 'en' ? matched.promptEn : matched.promptPt;

      var composed = '';
      if (!isExactCategory && raw.length > 0) {
        composed = scenarioPrefix + raw + '"\n\n';
        if (extraDetails) {
          composed += String(extraDetails).trim() + '\n\n';
        }
        composed += contextPrefix;
      } else if (extraDetails) {
        composed = String(extraDetails).trim() + '\n\n' + contextPrefix;
      } else if (!msgEl.value.trim()) {
        composed = defaultPrompt + '\n\n' + contextPrefix;
      }

      if (composed) {
        msgEl.value = composed;
      }
    }

    pushEvent('diagnostic_pain_select', {
      selected_topic: matched.value,
      raw_label: raw,
      language: lang
    });

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (contactCard) {
      contactCard.classList.remove('is-highlighted');
      void contactCard.offsetWidth;
      contactCard.classList.add('is-highlighted');
      window.setTimeout(function () {
        contactCard.classList.remove('is-highlighted');
      }, 2400);
    }

    window.setTimeout(function () {
      var focusTarget = companyEl && !companyEl.value.trim() ? companyEl : msgEl;
      if (focusTarget) {
        focusTarget.focus({ preventScroll: true });
        if (focusTarget === msgEl && typeof msgEl.setSelectionRange === 'function') {
          var len = msgEl.value.length;
          msgEl.setSelectionRange(len, len);
        }
      }
    }, 520);

    announce(
      (lang === 'en' ? 'Selected topic in contact form: ' : 'Assunto selecionado na caixa de contato: ') +
        matched.value
    );
  }

  window.SmartContact = {
    prefillTopic: prefillTopic,
    whatsapp: WHATSAPP_NUMBER
  };

  function showFeedback(message, isError) {
    var feedbackBox = document.getElementById('contact-feedback');
    var feedbackText = document.getElementById('contact-feedback-text');
    if (!feedbackBox || !feedbackText) return;

    feedbackText.textContent = message;
    feedbackBox.classList.toggle('contact-feedback--error', Boolean(isError));
    feedbackBox.classList.add('is-visible');
    announce(message);
  }

  function validateFormFields() {
    var companyEl = document.getElementById('contact-company');
    var returnEl = document.getElementById('contact-return');
    var msgEl = document.getElementById('contact-message');
    var valid = true;
    var firstInvalid = null;

    [companyEl, returnEl, msgEl].forEach(function (field) {
      if (!field) return;
      var empty = !field.value.trim();
      field.classList.toggle('is-invalid', empty);
      if (empty && !firstInvalid) {
        firstInvalid = field;
        valid = false;
      }
    });

    if (!valid && firstInvalid) {
      firstInvalid.focus();
      showFeedback(t('form_validation_err'), true);
    }

    return valid;
  }

  /* ========================================================================
     4. GOOGLE CONSENT MODE V2, GTM / GA4 / GOOGLE ADS / ADSENSE LOADER
     ======================================================================== */
  var marketingScriptsLoaded = false;

  function loadOptionalMarketingTags() {
    if (marketingScriptsLoaded) return;
    var cfg = window.SMARTINOVAT_TRACKING_CONFIG || {};

    if (cfg.gtmId) {
      marketingScriptsLoaded = true;
      var gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(cfg.gtmId);
      document.head.appendChild(gtmScript);
    } else if (cfg.ga4MeasurementId || cfg.googleAdsId) {
      marketingScriptsLoaded = true;
      var primaryId = cfg.ga4MeasurementId || cfg.googleAdsId;
      var gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryId);
      document.head.appendChild(gtagScript);
      if (typeof window.gtag === 'function') {
        window.gtag('js', new Date());
        if (cfg.ga4MeasurementId) window.gtag('config', cfg.ga4MeasurementId);
        if (cfg.googleAdsId) window.gtag('config', cfg.googleAdsId);
      }
    }

    if (cfg.adsenseClientId) {
      var adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      adsScript.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
        encodeURIComponent(cfg.adsenseClientId);
      document.head.appendChild(adsScript);
    }
  }

  function updateConsentState(choice) {
    var granted = choice === 'granted';
    try {
      localStorage.setItem('smartinovat_consent_v2', granted ? 'granted' : 'denied');
    } catch (_e) {}

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }

    pushEvent('consent_update', { consent_status: granted ? 'granted' : 'essential_only' });
    if (granted) {
      loadOptionalMarketingTags();
    }

    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.classList.remove('is-open');
  }

  function initConsentBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    var acceptBtn = document.getElementById('consent-accept-btn');
    var essentialBtn = document.getElementById('consent-essential-btn');
    var openSettingsBtn = document.getElementById('open-consent-settings');

    var stored = null;
    try {
      stored = localStorage.getItem('smartinovat_consent_v2');
    } catch (_e) {}

    if (stored === 'granted') {
      loadOptionalMarketingTags();
    } else if (!stored && banner) {
      window.setTimeout(function () {
        banner.classList.add('is-open');
      }, 900);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        updateConsentState('granted');
      });
    }

    if (essentialBtn) {
      essentialBtn.addEventListener('click', function () {
        updateConsentState('denied');
      });
    }

    if (openSettingsBtn && banner) {
      openSettingsBtn.addEventListener('click', function () {
        banner.classList.add('is-open');
      });
    }
  }

  /* ========================================================================
     5. HEADER, TIMELINE, CONTACT, ANALYTICS & REVEALS
     ======================================================================== */
  function initHeaderAndControls() {
    var header = document.getElementById('site-header');
    var toggleBtn = document.getElementById('mobile-menu-toggle');
    var nav = document.getElementById('primary-nav');
    var themeBtn = document.getElementById('theme-toggle-btn');

    function updateHeaderScroll() {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetLang = btn.getAttribute('data-set-lang');
        if (targetLang) setLang(targetLang);
      });
    });

    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', function () {
        var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        var nextState = !expanded;
        toggleBtn.setAttribute('aria-expanded', String(nextState));
        nav.classList.toggle('is-open', nextState);
      });

      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
          toggleBtn.focus();
        }
      });
    }

    var navLinks = document.querySelectorAll('.primary-nav .nav-link[href^="#"]');
    if ('IntersectionObserver' in window && navLinks.length) {
      var sectionMap = {};
      var observedSections = [];

      for (var i = 0; i < navLinks.length; i++) {
        var id = navLinks[i].getAttribute('href').slice(1);
        var sec = document.getElementById(id);
        if (sec) {
          sectionMap[id] = navLinks[i];
          observedSections.push(sec);
        }
      }

      var spyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var activeId = entry.target.id;
              navLinks.forEach(function (l) {
                l.classList.toggle('is-active', l === sectionMap[activeId]);
              });
            }
          });
        },
        { rootMargin: '-28% 0px -58% 0px', threshold: 0 }
      );

      observedSections.forEach(function (s) {
        spyObserver.observe(s);
      });
    }
  }

  function initTimelineFilters() {
    var buttons = document.querySelectorAll('[data-era-filter]');
    var items = document.querySelectorAll('#timeline-track .timeline-item');
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-era-filter');
        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        items.forEach(function (item) {
          var matches = filter === 'all' || item.getAttribute('data-era') === filter;
          item.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  function initContactAndTracking() {
    var selectEl = document.getElementById('contact-topic');
    var formEl = document.getElementById('smart-contact-form');
    var submitBtn = document.getElementById('send-email-btn');
    var submitBtnLabel = document.getElementById('send-email-btn-label');
    var honeyEl = document.getElementById('contact-honey');
    var mapToggle = document.getElementById('map-theme-toggle');
    var mapWrap = document.getElementById('pomerode-map-wrap');
    var waFloat = document.getElementById('whatsapp-float-btn');

    ['contact-company', 'contact-return', 'contact-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          if (el.value.trim()) el.classList.remove('is-invalid');
        });
      }
    });

    if (selectEl) {
      selectEl.addEventListener('change', function () {
        syncTopicPills(selectEl.value);
      });
    }

    document.querySelectorAll('[data-topic-select]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var val = pill.getAttribute('data-topic-select');
        if (selectEl && val) {
          selectEl.value = val;
          syncTopicPills(val);
        }
      });
    });

    if (formEl) {
      formEl.addEventListener('submit', function (e) {
        e.preventDefault();
        if (honeyEl && honeyEl.value) return;
        if (!validateFormFields()) return;

        var company = (document.getElementById('contact-company') || {}).value || '';
        var returnContact = (document.getElementById('contact-return') || {}).value || '';
        var topic = selectEl ? selectEl.value : 'Diagnóstico ACATECH';
        var message = (document.getElementById('contact-message') || {}).value || '';
        var lang = getLang();

        if (submitBtn) submitBtn.disabled = true;
        if (submitBtnLabel) submitBtnLabel.textContent = t('form_sending');

        var requestBody = {
          _subject: '[SmartInovaT | ' + lang.toUpperCase() + '] ' + topic + ' — ' + company.trim(),
          _template: 'table',
          _captcha: 'false',
          Nome_e_Empresa: company.trim(),
          Contato_de_Retorno: returnContact.trim(),
          Desafio_Principal: topic,
          Idioma: lang.toUpperCase(),
          Mensagem: message.trim(),
          Origem: window.location.href
        };

        fetch(DEFAULT_AJAX_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
          })
          .then(function () {
            showFeedback(t('form_success'), false);
            pushEvent('generate_lead', {
              lead_topic: topic,
              language: lang
            });

            var cfg = window.SMARTINOVAT_TRACKING_CONFIG || {};
            if (cfg.googleAdsLeadLabel && typeof window.gtag === 'function') {
              window.gtag('event', 'conversion', { send_to: cfg.googleAdsLeadLabel });
            }

            var msgEl = document.getElementById('contact-message');
            if (msgEl) msgEl.value = '';
          })
          .catch(function () {
            showFeedback(t('form_net_err'), true);
          })
          .finally(function () {
            if (submitBtn) submitBtn.disabled = false;
            if (submitBtnLabel) submitBtnLabel.textContent = t('form_submit_btn');
          });
      });
    }

    if (waFloat) {
      waFloat.addEventListener('click', function () {
        pushEvent('whatsapp_click', {
          location: 'floating_bottom_right',
          language: getLang()
        });
      });
    }

    if (mapToggle && mapWrap) {
      mapToggle.addEventListener('click', function () {
        if (getTheme() === 'light') {
          mapWrap.classList.toggle('is-dark-override');
        } else {
          mapWrap.classList.toggle('is-light-map');
        }
      });
    }

    document.addEventListener('click', function (e) {
      var prefillTrigger = e.target.closest('[data-prefill-topic]');
      if (prefillTrigger) {
        e.preventDefault();
        var topic = prefillTrigger.getAttribute('data-prefill-topic');
        var details = prefillTrigger.getAttribute('data-prefill-details') || '';
        prefillTopic(topic, details);
        return;
      }

      var portfolioTrigger = e.target.closest('[data-open-portfolio]');
      if (portfolioTrigger) {
        e.preventDefault();
        var slug = portfolioTrigger.getAttribute('data-open-portfolio');
        pushEvent('portfolio_preview_open', {
          app_slug: slug,
          source: 'footer_link',
          language: getLang()
        });
        if (window.SmartPortfolio && typeof window.SmartPortfolio.openPreview === 'function') {
          window.SmartPortfolio.openPreview(slug);
        } else {
          var portSec = document.getElementById('portfolio');
          if (portSec) portSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    window.addEventListener('smartcontact:prefill', function (e) {
      if (e && e.detail) {
        prefillTopic(e.detail.topic || e.detail, e.detail.details || '');
      }
    });
  }

  function initCountersAndReveals() {
    var prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      return;
    }

    document.documentElement.classList.add('js-ready');
    var revealEls = document.querySelectorAll('.reveal-item');

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        el.classList.add('will-animate');
      } else {
        el.classList.add('is-visible');
      }
    });

    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('will-animate');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      if (el.classList.contains('will-animate')) {
        revealObserver.observe(el);
      }
    });

    var counters = document.querySelectorAll('[data-counter]');
    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          obs.unobserve(el);

          var target = parseInt(el.getAttribute('data-counter'), 10);
          if (isNaN(target)) return;

          var prefix = el.getAttribute('data-prefix') || '';
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1100;
          var startTime = null;

          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * target);
            var locale = getLang() === 'en' ? 'en-US' : 'pt-BR';
            var formatted = target >= 1000 ? current.toLocaleString(locale) : String(current);
            el.textContent = prefix + formatted + suffix;
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          }

          window.requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  function boot() {
    // Sync initial theme & route language cleanly
    setTheme(getTheme(), true);
    var routeLang = getLang();
    // On root '/', optionally honor saved user language if explicitly toggled before; on '/en/', keep native 'en'
    var isSubdirEn = (window.SMARTINOVAT_ROOT_PREFIX || './') === '../';
    if (!isSubdirEn) {
      try {
        var savedLang = localStorage.getItem('smartinovat_lang');
        if (savedLang === 'en' || savedLang === 'pt') {
          routeLang = savedLang;
        }
      } catch (_e) {}
    }
    applyLanguageToDOM(routeLang);
    if (routeLang !== (isSubdirEn ? 'en' : 'pt')) {
      window.dispatchEvent(
        new CustomEvent('smartinovat:langchange', { detail: { lang: routeLang } })
      );
    }

    initHeaderAndControls();
    initTimelineFilters();
    initContactAndTracking();
    initConsentBanner();
    initCountersAndReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
