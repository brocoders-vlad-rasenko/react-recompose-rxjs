import { combineLatest, of, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/* export default (props$, store) => combineLatest(props$, store.serverTodos$)
  .pipe(
    map(([props, data]) => ({ ...props, data, refresh: store.refresh, addTodo: store.addTodo }))
  ) */

export default (props$, store) => {
  const observableList = Object.keys(store).map(item => (
    store[item] instanceof Observable || 'subscribe' in store[item]
      ? store[item].pipe(map(v => ({ [item]: v })))
      : of({ [item]: store[item] })
  ))
  return combineLatest([...observableList, props$])
    .pipe(
      map(observables => reduceObservablesToValue(observables))
    )
}

const reduceObservablesToValue = (values) => (
  values.reduce(
    (acc, obs) => {
      Object.keys(obs).forEach(key => {
        acc[key] = obs[key]
      })
      return acc
    },
    {}
  )
)
