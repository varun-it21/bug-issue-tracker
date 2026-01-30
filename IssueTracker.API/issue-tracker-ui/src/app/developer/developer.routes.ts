import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';

export const developerRoutes: Routes = [
  {
    path: 'developer',
    component: Layout,
    children: [
      { path: '', component: Dashboard }
    ]
  }
];
