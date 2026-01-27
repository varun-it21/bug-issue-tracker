import { Routes } from '@angular/router';
import { AdminLayout } from './layout/layout';
import { AdminDashboard } from './dashboard/dashboard';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component:  AdminLayout,
    children: [
      { path: '', component: AdminDashboard }
    ]
  }
];
