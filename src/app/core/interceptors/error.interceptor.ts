import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(MessageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // 🔐 Token inválido / expirado
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);

        toast.add({
          severity: 'warn',
          summary: 'Sesión expirada',
          detail: 'Vuelve a iniciar sesión',
        });
      }

      // ❌ Otros errores
      else {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || 'Error del servidor',
        });
      }

      return throwError(() => error);
    })
  );
};
