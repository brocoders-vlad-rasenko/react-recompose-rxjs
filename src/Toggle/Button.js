import ToggleStream from './ToggleStream'
import { MyToggle, Switch } from './Toggle'
import React from 'react'

export default () => {
  return (
    <ToggleStream
      onToggle={on => console.log('toggle', on)}
      render={({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <MyToggle on={on} toggle={toggle} />
        </div>
      )}
    />
  )
}
