import { Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [

  // 🔓 Público (sin layout)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // 🔐 Privado (con layout)
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
