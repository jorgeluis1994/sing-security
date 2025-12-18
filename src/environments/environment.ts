export const environment = {
  production: false,

  app: {
    name: 'Secure Sign Web',
    version: '1.0.0',
  },

  api: {
    baseUrl: 'https://api.firmasegura.work',
    timeout: 15000,
  },

  signing: {
    tokenQueryParam: 'tk',
    tokenTtlMinutes: 15,

    endpoints: {
      validateToken: '/signing/token/validate',
      consumeToken: '/signing/token/consume',
      getDocument: '/signing/document',
      signDocument: '/signing/document/sign',
    },
  },

  ui: {
    stepper: {
      linear: true,
      showIcons: true,
    },
  },

  security: {
    allowRefreshWithToken: false,
  },
};
