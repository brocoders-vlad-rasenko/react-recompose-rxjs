import { componentFromStream, createEventHandler } from 'recompose'
import { interval, merge } from 'rxjs'
import { startWith, scan, combineLatest } from 'rxjs/operators'

const ToggleStream = componentFromStream(props$ => {
  const { handler: toggle, stream: toggle$ } = createEventHandler()

  const on$ = merge(
    toggle$,
    interval(1000)
  ).pipe(
    startWith(true),
    scan(bool => !bool)
  )

  return props$.pipe(
    combineLatest(on$, (props, on) =>
      props.render({
        on,
        toggle
      })
    )
  )
})

export default ToggleStream
