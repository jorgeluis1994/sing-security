import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import Lara from '@primeuix/themes/lara';
import MyPreset from '../../Theme/my-preset';


export const CORE_PROVIDERS = [
  MessageService,

  providePrimeNG({
    ripple: true,
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: '.dark-theme',
        cssLayer: true,
        inputStyle: 'outlined',
        scale: 14,
        fontFamily: 'Inter, system-ui, sans-serif',
        transitionDuration: '0.2s',
        overlayOptions: {
          appendTo: 'body',
          autoZIndex: true
        }
      }
    }
  })

  // providePrimeNG({
  //   theme: {
  //     preset: Lara
  //   }
  // })

  ,
  provideHttpClient(
    withInterceptors([
      AuthInterceptor,
      ErrorInterceptor
    ])),
];
