import React, { useState, useContext, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { FormContext } from "../context/form/formContext";
import { DataContext } from "../context/data/dataContext";
import {
  FormContextType,
  DataContextType,
  UserType
} from "../context/types";

interface CollectionCreateFormProps {
  onCreate: (payload: any) => void;
}

const ModalDialog: React.FC<CollectionCreateFormProps> = ({ onCreate }) => {
  const formContext = useContext(FormContext) as FormContextType;
  const dataContext = useContext(DataContext) as DataContextType;
  const [form] = Form.useForm();

  

  const initialUserState: UserType = {
    id: 0,
    first_name: "",
    last_name: "",
    publisher: { id: 0, name: "" },
    office: { id: 1, name: "" },
  };
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {

    setUser(
      formContext.state.newForm || formContext.state.userId === null
        ? {
          ...initialUserState,
            id: Math.max(...dataContext.state.map((user) => user.id)) + 1,
          }
        : (dataContext.state.filter(
            (user: UserType) => user.id === formContext.state.userId
          )[0] as UserType)
    );    
  }, [formContext.state]);

  useEffect(() => {
    form.setFieldsValue({"first_name" : user.first_name});
    form.setFieldsValue({"last_name" : user.last_name});
    form.setFieldsValue({"office" : user.office.id});
    form.setFieldsValue({"publisher" : user.publisher ?  user.publisher.id : "none"});
    console.log(JSON.stringify(user));
  }, [user]);

  return (
    <Modal
      visible={formContext.state.visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={formContext.closeForm}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            const payload = {...values, id: user.id}
            onCreate(payload);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="id" label="id" labelAlign="left">
          <div>{user.id}</div>
        </Form.Item>

        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
            {
              max: 20,
              message: "8 mini"
            }
          ]}
          labelAlign="left"
        >
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label="Description" labelAlign="left">
          <Input type="textarea" />
        </Form.Item>

        <Form.Item name="office" label="Office" labelAlign="left">
          <Select>
          {dataContext.officesData.map((office) => (
              <Select.Option
                key={office.id}
                value={office.id}
              >{office.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="publisher" label="Publisher" labelAlign="left">
          <Select>
          <Select.Option
          key="empty"
          value="none"
          >
        </Select.Option>
          {dataContext.publishersData.map((publisher) => (
              <Select.Option
                key={publisher.id}
                value={publisher.id}
              >{publisher.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDialog;
