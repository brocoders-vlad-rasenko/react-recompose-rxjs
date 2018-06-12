import React from 'react'
import { compose, createEventHandler, mapPropsStream } from 'recompose'
import { switchMap, mapTo, scan, startWith, pluck, catchError, tap } from 'rxjs/operators'
import { merge, of, zip, from, interval } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const count = mapPropsStream(props$ => {
  const { stream: onInc$, handler: onInc } = createEventHandler()
  const { stream: onDec$, handler: onDec } = createEventHandler()

  return props$.pipe(
    switchMap(
      props =>
        merge(
          onInc$.pipe(mapTo(1)),
          onDec$.pipe(mapTo(-1))
        ).pipe(
          startWith(25),
          scan((acc, curr) => acc + curr)
        ),
      (props, count) => ({
        ...props,
        count,
        onInc,
        onDec
      })
    ))
})
const load = mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        ajax(
          `https://swapi.co/api/people/${props.count}`
        ).pipe(
          pluck('response'),
          startWith({ name: 'loading...' }),
          catchError(err => of({ name: 'Not found' }))
        ),
      (props, person) => ({ ...props, person })
    )
  )
)

const typewriter = mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        zip(
          from(props.person.name),
          interval(100),
          latter => latter
        ).pipe(
          scan((acc, curr) => acc + curr)
        ),
      (props, name) => ({
        ...props,
        person: { ...props.person, name }
      })
    )
  )
)

const Counter = props => (
  <div>
    <button onClick={props.onInc}>+</button>
    <button onClick={props.onDec}>-</button>
    <h3>{props.count}</h3>
    <h1>{props.person.name}</h1>
  </div>
)

const CounterWithPersonLoader = compose(
  count,
  load,
  typewriter
)(Counter)

export default CounterWithPersonLoader
