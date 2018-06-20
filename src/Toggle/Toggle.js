import React from 'react'

export function MyToggle ({ on, toggle }) {
  return (
    <button onClick={toggle}>{on ? 'on' : 'off'}</button>
  )
}

export function Switch ({ on, className = '', ...props }) {
  return (
    <div className='toggle'>
      <input className='toggle-input' type='checkbox' />
      <button
        className={`${className} toggle-btn ${
          on ? 'toggle-btn-on' : 'toggle-btn-off'
        }`}
        aria-expanded={on}
        {...props}
      />
    </div>
  )
}
