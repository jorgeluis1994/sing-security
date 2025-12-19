import { Routes } from '@angular/router';


export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        loadComponent: () =>
            import('./dashboard/dashboard').then(m => m.Dashboard),
    },
];
