import React from 'react'
import { mapPropsStream } from 'recompose'
import { switchMap } from 'rxjs/operators'
import { interval } from 'rxjs'

const Interval = mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props => interval(1000),
      (props, count) => ({ ...props, count })
    )
  )
)
const Counter = props => <h1>{props.count}</h1>

export default Interval(Counter)
