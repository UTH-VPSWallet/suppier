import { Routes } from '@angular/router';

export const routes: Routes = [
    // Auth pages (no sidebar/topbar)
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent),
  },
    {
    path: 'register',
    loadComponent: () => import('./modules/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./modules/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },

  // Dashboard & management pages
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'orders',
    loadComponent: () => import('./modules/orders/orders.component').then(m => m.OrdersComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/products.component').then(m => m.ProductsComponent),
  },
  {
    path: 'customers',
    loadComponent: () => import('./modules/customers/customers.component').then(m => m.CustomersComponent),
  },
    {
    path: 'providers',
    loadComponent: () => import('./modules/providers/providers.component').then(m => m.ProvidersComponent),
  },
  {
    path: 'folders',
    loadComponent: () => import('./modules/folders/folders.component').then(m => m.FoldersComponent),
  },

  // 404
  {
    path: '**',
    loadComponent: () => import('./modules/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
