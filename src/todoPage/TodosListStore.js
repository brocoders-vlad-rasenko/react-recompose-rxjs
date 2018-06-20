import { BehaviorSubject } from 'rxjs'
import { scan } from 'rxjs/operators'

export class TodosListStore {
  constructor () {
    this.subject = new BehaviorSubject([])
    
    this.flow$ = this.subject.pipe(
      scan((stor, cb) => cb(stor))
    )
  }
  
  add = todo => this.subject.next(stor => stor.concat(todo))

  remove = todo => this.subject.next(stor => {
    const idx = stor.indexOf(todo)
    stor.splice(idx, 1)
    return stor
  })

  clear = () => this.subject.next(() => [])
}

export const todosListStore = new TodosListStore()
