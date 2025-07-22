import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ToolbarComponent,ReactiveFormsModule,RouterModule],
  template: `<app-toolbar [isLoginBtnShown]="true"> </app-toolbar>
<form class="form-container" [formGroup]="loginform" (ngSubmit)="onSubmit()">
  <h2 class="title">connectez-vous</h2>
  <h3 class="sub-title">veuillez entrer votre email <a routerLink="/register">s'inscrire</a></h3>
  <br />
  <input type="email" placeholder="Email" formControlName='email' />
  <input placeholder="mot de passe" type="password" formControlName="password" />
  <p *ngIf="showError">{{errorMsg}} </p>
  <button type="submit" class="auth-btn"
   [ngClass]="{ 'active-btn' : !loginform.invalid }" 
   [disabled]="loginform.invalid" 
   (click)="onSubmit()"
   >
   connexion
  </button>

</form>
  `,
  styles:[`
    
    `,

  ]
})
export class LoginComponent {
  showError = false;
  errorMsg = "email ou password incorrect, veuillez vous inscrire"
  private ts = inject(TodoService);
private router = inject(Router);
loginform = new FormGroup({
  email: new FormControl('', [Validators.required,Validators.email]),
  password: new FormControl('', [Validators.required]),
});
async onSubmit() {
  const email = this.loginform.value.email;
  const password = this.loginform.value.password;

  if (!email || !password) {
    this.showError = true;
    return;
  }

  try {
    const success = await this.ts.logIn(email, password);

    if (success) {
      this.showError = false;
      this.router.navigateByUrl('/todos');
    } else {
      this.showError = true;
    }
  } catch (error) {
    console.error('Erreur de connexion :', error);
    this.showError = true;
  }
}

}
