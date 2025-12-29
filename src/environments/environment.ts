export const environment = {
  production: false,

  /* =========================
   * 📦 APLICACIÓN
   * ========================= */
  app: {
    name: 'Secure Sign Web',
    version: '1.0.0',
  },

  /* =========================
   * 🔐 BACKEND PRINCIPAL
   * ========================= */
  api: {
    baseUrl: 'http://192.168.0.68:3002',
    timeout: 15000,

    auth: {
      endpoints: {
        login: '/auth/login',
        register: '/auth/register',
      },
      storage: {
        tokenKey: 'access_token',
      },
    },

    signing: {
      tokenQueryParam: 'tk',
      tokenTtlMinutes: 15,
      endpoints: {
        validateToken: '/token/validate',
        consumeToken: '/signing/token/consume',
        getDocument: '/signing/document',
        signDocument: '/signing/document/sign',
      },
    },

    signature: {
      endpoints: {
        sign: '/signature/sign',
        signGraphological: '/signature/sign-graphological',
      },
    },

    /* 🟢 NUEVO – PARA CÓDIGO FUTURO */
    endpoints: {
      login: '/auth/login',
      register: '/auth/register',
      validateToken: '/token/validate',
      consumeToken: '/signing/token/consume',
      getDocument: '/signing/document',
      signDocument: '/signing/document/sign',
      signDigital: '/signature/sign',
      signGraphological: '/signature/sign-graphological',
    },
  },

  /* =========================
   * 🌐 APIS EXTERNAS (REGISTRY)
   * ========================= */
  externalApis: {
    documentAnalysis: {
      baseUrl: 'https://api-dev-001.doctor360.website:29008',
      endpoints: {
        analyzePdf: '/api/analyze-pdf',
      },
    },

    /* =========================
         * 📦 IPFS – Almacenamiento descentralizado
         * Utilizado para:
         * - Subir archivos en formato buffer
         * - Persistir documentos firmados
         * - Integración con sistemas blockchain / hash
         * ========================= */
    ipfsFilw: {
      baseUrl: 'https://api-dev-001.doctor360.website:29000',
      endpoints: {
        buffer: '/buffer',
      },
    },
    /* 🚀 Futuras APIs */
    biometric: {
      baseUrl: '',
      endpoints: {},
    },

    notifications: {
      baseUrl: '',
      endpoints: {},
    },
  },

  /* =========================
   * 🎨 UI
   * ========================= */
  ui: {
    stepper: {
      linear: true,
      showIcons: true,
    },
  },
};
