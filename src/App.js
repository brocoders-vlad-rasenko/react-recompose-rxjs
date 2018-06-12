import React, { Component } from 'react'
import './App.css'
import {
  setObservableConfig
} from 'recompose'
import {from} from 'rxjs'
import SimpleFormStream from './Form'

setObservableConfig({
  fromESObservable: from
})

class App extends Component {
  render () {
    return (
      <div>
        <h1>Hello</h1>
        <SimpleFormStream />
      </div>
    )
  }
}

export default App
