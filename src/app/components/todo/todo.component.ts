import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar.component';
import { AddTodoComponent } from "./add-todo.component";
import { TodoListComponent } from './todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, AddTodoComponent,TodoListComponent],
  template: `
    <app-toolbar [isLogoutBtnShown]="true"></app-toolbar>
    <app-add-todo></app-add-todo>
    <app-todo-list></app-todo-list>
  `,
  styles: ``
})
export class TodoComponent {

}
