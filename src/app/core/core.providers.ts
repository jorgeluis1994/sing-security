import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import MyPreset from '../../Theme/my-preset';

export const CORE_PROVIDERS = [
  MessageService,
  
  providePrimeNG({
  theme: {
        preset: Aura
      }

  }),
  provideHttpClient(
    withInterceptors([
    AuthInterceptor,
    ErrorInterceptor
  ])),
];
