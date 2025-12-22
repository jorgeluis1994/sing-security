import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    /* ===============================
       COLOR PRIMARIO (botones, steps)
    =============================== */
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#2563eb', // 🔵 corporativo
      600: '#1d4ed8',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#172554',
      950: '{blue.950}',
    },

    /* ===============================
       SUPERFICIES (cards, panels)
    =============================== */
    surface: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db'
    },

    /* ===============================
       TEXTO
    =============================== */
    text: {
      color: '#111827',
      muted: '#6b7280',
      inverse: '#ffffff'
    },

    /* ===============================
       BORDES
    =============================== */
    border: {
      color: '#e5e7eb',
      radius: '0.75rem' // rounded moderno
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
       INPUTS (text, select, radio)
    =============================== */
    input: {
      background: '#ffffff',
      borderColor: '#d1d5db',
      borderRadius: '0.6rem',
      focusBorderColor: '#2563eb',
      focusRingColor: 'rgba(37,99,235,0.25)'
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
      shadow: '0 4px 12px rgba(0,0,0,0.05)',
      borderRadius: '1rem'
    },

    /* ===============================
       TOOLBAR
    =============================== */
    toolbar: {
      background: '#ffffff',
      borderColor: '#e5e7eb'
    }
  }
});

export default MyPreset;
