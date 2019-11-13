import { AnyAction } from 'redux'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export enum VISIBILITY_FILTER {
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  SHOW_ALL,
}

let id: number = 0
export function addTodo(text: string): AnyAction {
  return { type: ADD_TODO, text, id: id++ }
}

export function 

export function toggleTodo(id: number): AnyAction {
  return { type: TOGGLE_TODO, id }
}

export function setVisibilityFilter(filter: VISIBILITY_FILTER): AnyAction {
  return { type: SET_VISIBILITY_FILTER, filter }
}