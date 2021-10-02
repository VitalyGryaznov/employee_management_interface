import { FormActionType, FormStateType } from "../types";

interface IReducer {
  type: FormActionType;
  payload?: any;
}

export const FormReducer: React.Reducer<FormStateType, IReducer> = (
  state,
  action
) => {
  switch (action.type) {
    case FormActionType.SHOW_EDIT_FORM:
      return {
        ...state,
        newForm: false,
        userId: action.payload,
        visible: true,
      };
    case FormActionType.SHOW_NEW_CUSTOMER_FORM:
      return { ...state, newForm: true, userId: null, visible: true };
    case FormActionType.CLOSE_FORM:
      return { ...state, visible: false };
    default:
      return state;
  }
};
