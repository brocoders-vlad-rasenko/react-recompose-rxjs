import React from 'react'

class TodosListComponent extends React.PureComponent {
  state = {
    todoText: ''
  };

  componentDidMount () {
    this.props.refresh()
  }

  render () {
    const { serverTodos$ } = this.props

    return (
      <div>
        <button onClick={this.addTodo}>add</button>
        <input type='text' value={this.state.todoText} onChange={this.updateTodoText} onKeyPress={this.handleEnter} />
        <ol>
          {serverTodos$.map((todo) => <li key={todo.id}>{todo.text}</li>)}
        </ol>
      </div>
    )
  }

  updateTodoText = e => this.setState({ todoText: e.currentTarget.value })

  addTodo = () => {
    this.props.addTodo({text: this.state.todoText})
    this.setState({todoText: ''})
  };

  handleEnter = e => {
    if (e.which === 13) {
      this.addTodo()
    }
  }
}

export default TodosListComponent
