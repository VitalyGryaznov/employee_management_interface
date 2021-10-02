import React, { useReducer, useState, useEffect } from "react";
import { DataContext } from "./dataContext";
import { DataReducer } from "./dataReducer";
import { DataActionType, DataContextType } from "../types";
import { DataUrls } from "../../constants/urls";

export const DataState: React.FC<React.ReactNode> = ({ children }) => {
  const [publishersData, setPublishersData] = useState([]);
  const [officesData, setOfficesData] = useState([]);
  const [state, dispatch] = useReducer(DataReducer, []);

  interface DataSetter {
    (setter: any): void;
  }

  const fetchStaticData = async (url: string, setCallback: DataSetter) => {
    const response = await fetch(url);
    const resultBody = await response.json();
    setCallback(resultBody);
  };

  const fetchUsers = async () => {
    const response = await fetch(DataUrls.USERS);
    const resultBody = await response.json();
    dispatch({ type: DataActionType.FETCH_USERS, payload: resultBody });
  };

  useEffect(() => {
    fetchStaticData(DataUrls.PUBLISHERS, setPublishersData);
    fetchStaticData(DataUrls.OFICES, setOfficesData);
    fetchUsers();
  }, []);

  const addUser = (newUser: any) => {
    dispatch({ type: DataActionType.ADD_USER, payload: newUser });
  };

  const updateUser = (payload: any) => {
    dispatch({ type: DataActionType.UPDATE_USER, payload });
  };

  const removeUser = (id: number) => {
    dispatch({
      type: DataActionType.REMOVE_USER,
      payload: id,
    });
  };

  return (
    <DataContext.Provider
      value={
        {
          addUser,
          updateUser,
          removeUser,
          state,
          publishersData,
          officesData,
        } as DataContextType
      }
    >
      {children}
    </DataContext.Provider>
  );
};
