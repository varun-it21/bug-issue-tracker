import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { adminRoutes } from './admin/admin.routes';
import { developerRoutes } from './developer/developer.routes';

export const routes: Routes = [
  { path: '', component: Login },
  ...adminRoutes,
  ...developerRoutes
];