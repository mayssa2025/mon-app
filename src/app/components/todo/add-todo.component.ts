import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="form-container" [formGroup]="addTodoForm" (ngSubmit)="onSubmit()">
      <input type="text" placeholder="Titre" formControlName="title" />
      <input type="text" placeholder="Description" formControlName="description" />
      <button
        type="submit"
        class="auth-btn"
        [ngClass]="{ 'active-btn': addTodoForm.invalid }"
        [disabled]="addTodoForm.invalid"
      >
       Ajouter une tâche
      </button>
    </form>
    <p>add-todo works</p>
  `,
  styles: [`
  .form-container {
  display: flex;
  padding: 0;
  border: none;
& > * {
  margin: 0 0.5rem;
}
  }
    `]
})
export class AddTodoComponent {
  private ts = inject(TodoService);
  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  onSubmit() {
    const todo: Todo = {
      title: this.addTodoForm.value.title!,
      description: this.addTodoForm.value.description!,
      done: false,
    };

    this.ts.newTodo(todo);
    this.addTodoForm.reset();
  }
}


      







