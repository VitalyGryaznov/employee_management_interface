import React, { useReducer } from "react";
import { FormContext } from "./formContext";
import { FormReducer } from "./formReducer";
import { FormActionType, FormContextType, FormStateType } from "../types";

export const FormState: React.FC<React.ReactNode> = ({ children }) => {
  const initialState: FormStateType = {
    newForm: true,
    userId: null,
    visible: false,
  };

  const [state, dispatch] = useReducer(FormReducer, initialState);

  const openEditForm = (id: number) => {
    dispatch({ type: FormActionType.SHOW_EDIT_FORM, payload: id });
  };

  const openNewCustomerForm = () => {
    dispatch({ type: FormActionType.SHOW_NEW_CUSTOMER_FORM });
  };

  const closeForm = () => {
    dispatch({ type: FormActionType.CLOSE_FORM });
  };

  return (
    <FormContext.Provider
      value={
        {
          state,
          openEditForm,
          openNewCustomerForm,
          closeForm,
        } as FormContextType
      }
    >
      {children}
    </FormContext.Provider>
  );
};
