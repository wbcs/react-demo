import {
  VISIBILITY_FILTER,
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  addTodo,
  removeTodo,
  toggleTodo,
} from './actions'
import { AnyAction } from 'redux'

const initialState = {
  visibilityFilter: VISIBILITY_FILTER.SHOW_ALL,
  todos: []
}

// {
//   text: '123',
//   completed: false,
//   id: 0,
// }

export function todoApp(state = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_TODO: 
  }
}