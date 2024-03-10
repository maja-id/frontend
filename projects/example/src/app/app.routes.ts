import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'layout',
    loadComponent: () => import('./pages/layout/layout.component').then(m => m.LayoutComponent),
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  }
];
