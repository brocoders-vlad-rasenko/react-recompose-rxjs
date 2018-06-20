import { mapPropsStream } from 'recompose'
import TodosListComponent from './TodosListComponent'
import serializeModelToProps from '../lib/serializeModelToProps'
import { todosListStore } from '../todoPage/TodosListStore'

const TodosListObservable = mapPropsStream(props$ =>
  serializeModelToProps(props$, todosListStore)
)(TodosListComponent)

export default TodosListObservable
