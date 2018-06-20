import React from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import { combineLatest } from 'rxjs'
import { map, startWith, scan } from 'rxjs/operators'

const SimpleForm = ({handleChange, values}) => {
  return (
    <div>
      <input type='text' onChange={handleChange('title')} value={values.title} />
      <h2>{values.title}</h2>
      <button>Press me</button>
    </div>
  )
}

const SimpleFormStream = componentFromStream(
  props$ => {
    const {stream, handler} = createEventHandler()
    const handleChange = name => ({target}) => handler({[name]: target.value})

    const data$ = stream.pipe(
      startWith({ title: '' }),
      scan((values, curr) => ({...values, ...curr}), {})
    )

    return combineLatest(
      props$,
      data$
    ).pipe(
      map(([props, data]) => ({ ...props, values: data, handleChange })),
      map(SimpleForm)
    )
  }
)

export default SimpleFormStream
