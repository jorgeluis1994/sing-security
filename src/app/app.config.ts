import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CORE_PROVIDERS } from './core/core.providers';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    DialogService,   
    provideRouter(routes),
    ...CORE_PROVIDERS
  ]
};
