import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
  // Auth pages (no sidebar/topbar)
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./modules/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },

  // Dashboard & management pages — wrapped in MainLayoutComponent (sidebar + topbar)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'orders',
        loadComponent: () => import('./modules/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'vps',
        loadComponent: () => import('./modules/vps/vps.component').then(m => m.VPSComponent),
      }
    ],
  },

  // 404
  {
    path: '**',
    loadComponent: () => import('./modules/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

