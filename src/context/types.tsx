export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'
export const ADD_USER = 'ADD_USER'
export const FETCH_USERS = 'FETCH_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM'
export const SHOW_NEW_CUSTOMER_FORM = 'SHOW_NEW_CUSTOMER_FORM'
export const CLOSE_FORM = 'CLOSE_FORM'
export type DataContextType = {
    addUser: (newUser: any) => void
    updateUser: (payload: any) => void
    removeUser: (id: number) => void
    state: Array<UserType>
    publishersData: Array<PublisherType>
    officesData: Array<OfficeType>
  }

  export type FormStateType = {
    newForm: boolean;
    userId: number | null;
    visible: boolean;
  }

  export type FormContextType = {
    state: FormStateType;
    openEditForm: (id: number) => void
    openNewCustomerForm: () => void
    closeForm: () => void
  }

  export type OfficeType = {
      id: number;
      name: string;
  }

  export type PublisherType = {
    id: number;
    name: string;
}

  export type UserType = {
      id: number;
      first_name: string;
      last_name: string;
      office: OfficeType;
      publisher: PublisherType;

  }

  

