import { Routes } from '@angular/router';
import { AdminLayout } from './layout/layout';
import { AdminDashboard } from './dashboard/dashboard';
import { Issues } from './issues/issues';
import { AddIssues } from './add-issues/add-issues';
import { AddUsers } from './add-users/add-users';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component:  AdminLayout,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'issues', component: Issues },
      { path: 'add-issues', component: AddIssues},
      { path: 'add-users', component: AddUsers}
    ]
  }
];
