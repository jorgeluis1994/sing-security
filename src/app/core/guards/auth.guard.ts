import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // ¿Existe token?
    if (authService.isAuthenticated()) {
        return true;
    }

    // No logueado → login
    router.navigate(['/auth/login']);
    return false;
};
