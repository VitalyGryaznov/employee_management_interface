import React, { useReducer, useState, useEffect } from "react";
import { DataContext } from "./dataContext";
import { DataReducer } from "./dataReducer";
import { ADD_USER, FETCH_USERS, REMOVE_USER, UPDATE_USER, DataContextType } from "../types";

export const DataState: React.FC<React.ReactNode> = ({ children }) => {
     
  
  
  
    const dataUrls = new Map();
  dataUrls.set("users", "https://yoc-media.github.io/weather/api/users.json");
  dataUrls.set(
    "publishers",
    "https://yoc-media.github.io/weather/api/publishers.json"
  );
  dataUrls.set(
    "offices",
    "https://yoc-media.github.io/weather/api/offices.json"
  );

  



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
    const response = await fetch(dataUrls.get("users"));
    const resultBody = await response.json();
    dispatch({ type: FETCH_USERS, payload: resultBody });
  };

  useEffect(() => {
    fetchStaticData(dataUrls.get("publishers"), setPublishersData);
    fetchStaticData(dataUrls.get("offices"), setOfficesData);
    fetchUsers();
  }, []);

  const addUser = (newUser: any) => {
      console.log("ADDING USER");
      console.log(newUser);
    dispatch({ type: ADD_USER, payload: newUser });
  };

  const updateUser = (payload: any) => {
    
    dispatch({ type: UPDATE_USER, payload });
  }

  const removeUser = (id: number) => {
    dispatch({
      type: REMOVE_USER,
      payload: id,
    });
  };
  //value={{ addUser, updateUser, removeUser, state, publishersData, officesData } as DataContextType}

  return (
    <DataContext.Provider
      value={{ addUser, updateUser, removeUser, state, publishersData, officesData } as DataContextType}
    >
      {children}
    </DataContext.Provider>
  );
};
