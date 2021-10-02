import { CLOSE_FORM, SHOW_EDIT_FORM, SHOW_NEW_CUSTOMER_FORM, FormStateType } from '../types'

const handlers: any = {
  [SHOW_EDIT_FORM]: (state: FormStateType, {payload}: any) => ({...state, newForm: false,
    userId: payload, visible: true}),
  [SHOW_NEW_CUSTOMER_FORM]: (state: FormStateType) => ({...state, newForm: true,
    userId: null, visible: true}),
  [CLOSE_FORM]: (state: FormStateType) => ({...state, visible: false}),
  DEFAULT: (state: FormStateType) => state
}

export const FormReducer = (state: any, action: any) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
