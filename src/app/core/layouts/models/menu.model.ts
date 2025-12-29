import { MenuItem } from 'primeng/api';

export const SIDEBAR_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      }
    ]
  },

  {
    label: 'Firmas',
    icon: 'pi pi-file-signature',
    items: [
      {
        label: 'Firmar documento',
        icon: 'pi pi-pencil',
        routerLink: '/sign/manual',
      },
      {
        label: 'Firma automática',
        icon: 'pi pi-bolt',
        routerLink: '/sign/automatic',
      },
      {
        label: 'Documentos firmados',
        icon: 'pi pi-check-circle',
        routerLink: '/sign/signed',
      },
    ],
  },

  {
    label: 'Configuración',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
    ],
  },
];

