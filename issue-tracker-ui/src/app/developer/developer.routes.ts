import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { DashboardComponent } from './dashboard/dashboard';
import {  MyIssuesComponent } from './my-issues/my-issues';

export const developerRoutes: Routes = [
  {
    path: 'developer',
    component: Layout,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'my-issues', component: MyIssuesComponent }
    ]
  }
];
