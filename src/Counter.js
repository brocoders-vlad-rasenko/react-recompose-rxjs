import React, { cloneElement, Children } from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import { merge } from 'rxjs'
import { mapTo, scan, map, switchMap, startWith } from 'rxjs/operators'

export const Counter = ({ value, onInc, onDec }) => (
  <div>
    <button onClick={onInc}>+</button>
    <h2>{value}</h2>
    <button onClick={onDec}>-</button>
  </div>
)

export const WeirdCounter = ({ value, onInc, onDec }) => (
  <div>
    <span onClick={onInc}>+</span>
    <h1>{value}</h1>
    <span onClick={onDec}>-</span>
  </div>
)

const CounterStream = componentFromStream(
  props$ => {
    const {
      handler: onInc,
      stream: onInc$
    } = createEventHandler()
    const {
      handler: onDec,
      stream: onDec$
    } = createEventHandler()

    return props$.pipe(
      switchMap(props =>
        merge(
          onInc$.pipe(mapTo(1)),
          onDec$.pipe(mapTo(-1))
        ).pipe(
          startWith(props.value),
          scan((acc, curr) => acc + curr),
          map(value => ({ ...props, value, onInc, onDec })),
          map(props => Children.map(props.children, child => cloneElement(child, props)))
        )
      )
    )
  }
)

export default CounterStream
