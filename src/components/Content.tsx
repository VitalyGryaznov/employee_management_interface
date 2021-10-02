import React, { useContext } from "react";
import { DataContext } from "../context/data/dataContext";
import { FormContext } from "../context/form/formContext";
import { Button, Table } from "antd";
import "antd/dist/antd.css";
import ModalDialog from "./ModalDialog";
import {
  DataContextType,
  FormContextType,
  UserType,
  OfficeType,
  PublisherType,
} from "../context/types";
import "./Content.scss"

const Content = () => {
  const dataContext = useContext(DataContext) as DataContextType;
  const formContext = useContext(FormContext) as FormContextType;

  const onDelete = (key: any, e: any) => {
    e.preventDefault();
    dataContext.removeUser(key.id);
  };

  const creatUserObjectFromFormData = (payload: any) => {
    return {
      id: payload.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      office: {
        id: payload.office,
        name: dataContext.officesData.find(
          (office) => office.id === payload.office
        )?.name,
      } as OfficeType,
      publisher: (payload.publisher
        ? {
            id: payload.publisher,
            name: dataContext.publishersData.find(
              (publisher) => publisher.id === payload.publisher
            )?.name,
          }
        : null) as PublisherType,
    } as UserType;
  };

  const onEdit = (key: any, e: any) => {
    e.preventDefault();
    formContext.openEditForm(key.id as number);
  };

  const onCreate = (payload: any) => {
    const user = creatUserObjectFromFormData(payload);
    formContext.state.newForm
      ? dataContext.addUser(user)
      : dataContext.updateUser(user);
    formContext.closeForm();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Office",
      dataIndex: ["office", "name"],
      key: "officeName",
    },
    {
      title: "Publisher",
      dataIndex: ["publisher", "name"],
      key: "publisherName",
    },
    {
      key: "edit",
      render: (text: any, record: any) => {
        return (
          <div>
            <Button
              onClick={(e) => { onEdit(record, e) }}
              type="primary"
            >
              E
            </Button>
          </div>
        );
      },
    },
    {
      key: "delete",
      render: (text: any, record: any) => {
        return (
          <div>
            <Button
              onClick={(e) => { onDelete(record, e) }}
              type="primary"
            >
              X
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="content_container">
      <div className="content_flex">
        <div className="content_add_button" >
        <Button type="primary" onClick={formContext.openNewCustomerForm}>
        Add
      </Button>
        </div>
     
      <Table
        dataSource={dataContext.state}
        columns={columns}
        rowKey="id"
        bordered
      />
      </div>
      <ModalDialog onCreate={onCreate} />
    </div>
  );
};

export default Content;
