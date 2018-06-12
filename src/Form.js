import React from 'react'
import {componentFromStream, createEventHandler} from 'recompose'
import { map, startWith, delay } from 'rxjs/operators'

const SimpleForm = ({text, onInput}) => (
  <div>
    <input type='text' onInput={onInput} />
    <h2>{text}</h2>
  </div>
)

const SimpleFormStream = componentFromStream(
  props$ => {
    const {stream: onInput$, handler: onInput} = createEventHandler()

    const text$ = onInput$.pipe(
      map(e => e.target.value),
      delay(500),
      startWith('')
    )

    return text$
      .pipe(
        map(text => ({text, onInput})),
        map(SimpleForm)
      )
  }
)

export default SimpleFormStream
