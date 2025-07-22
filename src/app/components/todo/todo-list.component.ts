import { Component, inject } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-card-container" *ngFor="let todo of todos$ | async">
      <div class="todo-content"><input
    type="checkbox"
    name="done"
    [checked]="todo.done"
    (click)="updateTodo(todo)"
  />
  <div class="title-desc" [ngClass]="{done:todo.done}">
    <h4 class="title">{{ todo.title }}</h4>
    <h5 class="description">{{ todo.description }}</h5>
  </div></div>
  
  <button class="delete-btn" (click)="deleteTodo(todo)">Supprimer</button>
</div>
  `,
styles: [`.todo-card-container {
  width: clamp(80%, 5vw, 90%);
  max-width: 1200px;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px #2828281a solid;
  padding: 1rem;
}
.todo-content {
  display: flex;
}
.title-desc > * {
  margin: 0.2rem;
  font-weight: normal;
}
.done {
  text-decoration: line-through;
}
input {
  width: 20px;
  margin-right: 1rem;
}

.delete-btn {
  padding: 0.5rem;
  border-radius: 8px;
  color: white;
  background: red;
  border: none;
}

.delete-btn:hover {
  cursor: pointer;
}


`]
})
export class TodoListComponent {
  private ts = inject (TodoService);
  readonly todos$ = this.ts.gettodos();
  updateTodo(todo: Todo) {
    todo.done = !todo.done;
    this.ts.updateTodo(todo);
  }

 deleteTodo = (todo: Todo) => this.ts.deleteTodo(todo) ;

 

}
