export const environment = {
  production: false,

  app: {
    name: 'Secure Sign Web',
    version: '1.0.0',
  },

  api: {
    baseUrl: 'http://192.168.0.68:3002',
    timeout: 15000,
  },

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

  /** 🖊️ FIRMA DIGITAL */
  signature: {
    endpoints: {
      sign: '/signature/sign',   // 👈 NUEVO ENDPOINT
    },
  },

  ui: {
    stepper: {
      linear: true,
      showIcons: true,
    },
  },
};
