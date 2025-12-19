import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';

export const CORE_PROVIDERS = [
  providePrimeNG({
    theme: {
      preset: Aura
    }
  }),
  provideHttpClient(),
];
