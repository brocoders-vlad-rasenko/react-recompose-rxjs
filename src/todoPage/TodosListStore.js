import { BehaviorSubject } from 'rxjs'

export class TodosListStore {
  constructor () {
    this.serverTodos$ = new BehaviorSubject([])
  }

  refresh = () => this.serverTodos$.next([{ id: 2, text: 'Smth new' }])

  addTodo = (todo) => this.serverTodos$.next([{ id: Date.now(), ...todo }, ...this.serverTodos$.value])
}

export const todosListStore = new TodosListStore()
