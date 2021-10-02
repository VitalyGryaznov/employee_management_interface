import React, { useReducer, useState, useEffect } from "react";
import { FormContext } from "./formContext";
import { FormReducer } from "./formReducer";
import { SHOW_EDIT_FORM, SHOW_NEW_CUSTOMER_FORM, CLOSE_FORM, FormContextType, FormStateType } from "../types";


    export const FormState: React.FC<React.ReactNode> = ({ children }) => {


    const initialState: FormStateType = {
        newForm: true,
        userId: null,
        visible: false
      }

  const [state, dispatch] = useReducer(FormReducer, initialState);


  const openEditForm = (id: number) => {
    
    dispatch({ type: SHOW_EDIT_FORM, payload: id });
  };

  const openNewCustomerForm = () => {
    dispatch({ type: SHOW_NEW_CUSTOMER_FORM});
  }

  const closeForm = () => {
    dispatch({ type: CLOSE_FORM });
  }

  return (
    <FormContext.Provider
      value={{ state, openEditForm,  openNewCustomerForm, closeForm} as FormContextType}
    >
      {children}
    </FormContext.Provider>
  );
};
