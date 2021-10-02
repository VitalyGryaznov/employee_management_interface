import { ADD_USER, FETCH_USERS, REMOVE_USER, UPDATE_USER } from '../types'

const handlers: any = {
  [ADD_USER]: (state: any, {payload}: any) => ([...state, payload]),
  [FETCH_USERS]: (state: any, {payload}: any) => (payload),
  [REMOVE_USER]: (state: any, {payload}: any) => (state.filter((user: any) => user.id !== payload)),
  [UPDATE_USER]: (state: any, {payload}: any) => ([...state.filter((user: any) => user.id !== payload.id), payload]),
  DEFAULT: (state: any) => state
}

export const DataReducer = (state: any, action: any) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
