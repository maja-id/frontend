import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'layout',
    loadComponent: () =>
      import('./pages/layout/layout.component').then((m) => m.LayoutComponent),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./pages/buttons/buttons.component').then(
        (m) => m.ButtonsComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
];
