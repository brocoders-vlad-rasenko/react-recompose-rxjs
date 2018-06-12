import React, { Component } from 'react'
import './App.css'
import {
  setObservableConfig
} from 'recompose'
import {from} from 'rxjs'
import SimpleFormStream from './Form'
import CounterStream, { Counter, WeirdCounter } from './Counter'
import CounterWithInterval from './CounterWithInterval'
import CounterWithPersonLoader from './CounterWithPersonLoader'

setObservableConfig({
  fromESObservable: from
})

class App extends Component {
  render () {
    return (
      <div>
        <h1>Hello</h1>
        <SimpleFormStream />
        <CounterStream value={3}>
          <WeirdCounter />
          <Counter />
          <Counter />
        </CounterStream>
        <CounterWithInterval />
        <CounterWithPersonLoader />
      </div>
    )
  }
}

export default App
