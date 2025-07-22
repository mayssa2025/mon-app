import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TodoService } from './core/services/todo.service';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login | TodoApp',
    loadComponent: () =>
      import('./components/auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    title: 'Register | TodoApp',
    loadComponent: () =>
      import('./components/auth/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'todos',
    title: 'Todos | TodoApp',
    canActivate: [ ()=> inject(TodoService).isLoggedIn()],
    loadComponent: () =>
      import('./components/todo/todo.component').then(m => m.TodoComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
    

