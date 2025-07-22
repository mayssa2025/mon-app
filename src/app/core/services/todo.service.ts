import { Injectable, inject } from '@angular/core';
import { AngularTodoDB } from './db';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  db = new AngularTodoDB();
  private router = inject(Router);

  constructor() {
    this.initUsers();
  }

  async initUsers() {
    const users = await this.db.users.toArray();
    const emails = users.map(u => u.email);

    if (!emails.includes('mayssa@gmail.com')) {
      await this.db.users.add({ email: 'mayssa@gmail.com', password: 'passMayssa' });
    }
    if (!emails.includes('amir@gmail.com')) {
      await this.db.users.add({ email: 'amir@gmail.com', password: 'passAmir' });
    }
  }

  async logIn(email: string, password: string): Promise<boolean> {
    const user = await this.db.users.get(email);
    if (user && user.password === password) {
      localStorage.setItem('email', email);
      return true;
    }
    return false;
  }

  newUser = (user: User) => this.db.users.add(user);

  getUsers = () => this.db.users.toArray();

  isLoggedIn = (): boolean => {
    if (localStorage.getItem('email')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  };

  logOut() {
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  }
  // crud todos
  newTodo = (todo: Todo) => this.db.todos.add(todo);
  gettodos = () => liveQuery(()=>this.db.todos.toArray());
  updateTodo = (todo: Todo) => this.db.todos.update(todo.id!,todo);
  deleteTodo = (todo: Todo) => this.db.todos.delete(todo.id!);
 
}
