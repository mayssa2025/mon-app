import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ToolbarComponent,ReactiveFormsModule,RouterModule],
  template: `
    <app-toolbar [isRegisterBtnShown]="true"></app-toolbar>
    <form [formGroup]="registerForm" class="form-container" (ngSubmit)="onSubmit()">
  <h2 class="title">Enregistrez-vous</h2>
  <h3 class="sub-title">veuillez entrer votre email et mdp <a routerLink="/login">se connecter</a></h3>
  <br />
  <input placeholder="Email" type="email" formControlName="email" />
   <input placeholder="mot de passe" type="password" formControlName="password" />
  <br />
  <button
  class="auth-btn"
    [ngClass]="{ 'active-btn': !registerForm.invalid }"
    [disabled]="registerForm.invalid"
    (click)="onSubmit()"
    type="submit"
  >
    S'inscrire
  </button>
</form>
  `,
  styles: ``
})
export class RegisterComponent {
  private ts = inject(TodoService);
  private router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    if (this.registerForm.invalid) {
    return; // ne rien faire si invalide
  }
  const user: User = {
    email: this.registerForm.get('email')?.value ?? '',
    password: this.registerForm.get('password')?.value ?? '',
  };

  localStorage.setItem('email', user.email);
  await this.ts.newUser(user);
  this.router.navigateByUrl('/todos');
}
}




