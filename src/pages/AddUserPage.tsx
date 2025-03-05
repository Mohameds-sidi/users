import { useState } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: unknown) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://67c7131ac19eb8753e787d7a.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) throw new Error("Failed to add user");

      notification.success({
        message: "User Added",
        description: "User has been successfully added.",
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification.error({
          message: "Error",
          description: error.message || "Something went wrong.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 400, margin: "auto", padding: "2rem" }}>
      <h2>Ajouter User</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Nom"
          name="nom"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prenom"
          name="prenom"
          rules={[{ required: true, message: "Please input the surname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input the role!" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item label="role" name="role">
          <Select>
            <Select.Option value="demo">admin</Select.Option>
            <Select.Option value="demo">user</Select.Option>
            <Select.Option value="demo">visiteur</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUserPage;
