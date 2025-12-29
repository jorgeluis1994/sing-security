import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    /* ===============================
       COLOR PRIMARIO (botones, steps)
    =============================== */
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#0d9488', // 🟢 teal corporativo
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#042f2e',
      950: '#022c22',
    },

    /* ===============================
       SUPERFICIES
    =============================== */
    surface: {
      0: '#ffffff',
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4'
    },

    /* ===============================
       TEXTO
    =============================== */
    text: {
      color: '#042f2e',
      muted: '#64748b',
      inverse: '#ffffff'
    },

    /* ===============================
       BORDES
    =============================== */
    border: {
      color: '#ccfbf1',
      radius: '0.75rem'
    },

    /* ===============================
       BOTONES
    =============================== */
    button: {
      paddingX: '1rem',
      paddingY: '0.6rem',
      fontWeight: '500',
      borderRadius: '0.75rem'
    },

    /* ===============================
       INPUTS
    =============================== */
    input: {
      background: '#ffffff',
      borderColor: '#99f6e4',
      borderRadius: '0.6rem',
      focusBorderColor: '#0d9488',
      focusRingColor: 'rgba(13,148,136,0.25)'
    },

    /* ===============================
       STEPS
    =============================== */
    steps: {
      number: {
        background: '{primary.500}',
        color: '#ffffff'
      },
      title: {
        color: '{text.color}'
      }
    },

    /* ===============================
       CARDS
    =============================== */
    card: {
      background: '#ffffff',
      shadow: '0 4px 12px rgba(13,148,136,0.15)',
      borderRadius: '1rem'
    },

    /* ===============================
       TOOLBAR
    =============================== */
    toolbar: {
      background: '#ffffff',
      borderColor: '#ccfbf1'
    }
  }
});

export default MyPreset;
