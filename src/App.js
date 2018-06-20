import React, { Component } from 'react'
import './App.css'
import {
  setObservableConfig
} from 'recompose'
import {from} from 'rxjs'
import TodosList from './todoPage/TodoList'

setObservableConfig({
  fromESObservable: from
})

class App extends Component {
  render () {
    return (
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          textAlign: 'left'
        }}
      >
        {/* <h1>Hello</h1>
        <SimpleFormStream />
        <CounterStream value={3}>
          <WeirdCounter />
          <Counter />
          <Counter />
        </CounterStream>
        <CounterWithInterval />
        <CounterWithPersonLoader /> */}
        {/* <Form /> */}
        <TodosList one={'two'} />
      </div>
    )
  }
}

export default App
