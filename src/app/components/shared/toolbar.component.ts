import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="toolbar">
      <a class="app-title" routerLink="/">TodoApp</a>

      <div class="toolbar-buttons">
        <button 
          class="toolbar-btn" 
          routerLink="/register" 
          *ngIf="isRegisterBtnShown">
          S'inscrire
        </button>

        <button 
          class="toolbar-btn" 
          routerLink="/login" 
          *ngIf="isLoginBtnShown">
          Se connecter
        </button>

        <div class="avatar-logout-btn" *ngIf="isLogoutBtnShown">
          <span class="user-avatar">
            {{ userInitial }}
          </span>
          <button class="toolbar-btn" (click)="logOut()">Se déconnecter</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      font-family: Arial, sans-serif;
    }

    /* Titre à gauche */
    .app-title {
      font-weight: bold;
      font-size: 1.5rem;
      color: white;
      text-decoration: none;
    }

    /* Conteneur des boutons à droite */
    .toolbar-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* Style commun aux boutons */
    .toolbar-btn {
      background-color: transparent;
      border: 2px solid white;
      color: white;
      padding: 6px 14px;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease, color 0.3s ease;
      text-decoration: none; /* si bouton avec routerLink */
    }

    /* Hover sur boutons */
    .toolbar-btn:hover {
      background-color: white;
      color: #007bff;
    }

    /* Style de l'avatar et bouton déconnexion */
    .avatar-logout-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-avatar {
      background-color: white;
      color: #007bff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1.1rem;
    }
  `]
})
export class ToolbarComponent implements OnInit {
  @Input() isLoginBtnShown!: boolean;     
  @Input() isRegisterBtnShown!: boolean;  
  @Input() isLogoutBtnShown!: boolean;    

  private router = inject(Router);
  private todoService = inject(TodoService);

  userInitial: string = '';

  async ngOnInit() {
    const email = localStorage.getItem('email');
    if (email) {
      const user = await this.todoService.db.users.get(email);
      if (user) {
        this.userInitial = user.email.charAt(0).toUpperCase();
      }
    }
  }

  logOut() {
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  }
}
