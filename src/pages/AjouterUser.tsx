import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Typography } from "antd";

type FieldType = {
  nom?: string;
  prenom?: string;
  email?: string;
  role?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function AjouterUser() {
  return (
    <>
      <Typography
        style={{
          textAlign: "center",
          fontSize: "1.7rem",
          marginBottom: "2rem",
        }}
      >
        Ajouter Un Utilisateur
      </Typography>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="nom"
          name="nom"
          rules={[{ required: true, message: "svp entre votre nom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="prenom"
          name="prenom"
          rules={[{ required: true, message: "svp entre votre prenom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "svp entre votre email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="role">
          <Select>
            <Select.Option value="demo">admin</Select.Option>
            <Select.Option value="demo">user</Select.Option>
            <Select.Option value="demo">visiteur</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AjouterUser;
