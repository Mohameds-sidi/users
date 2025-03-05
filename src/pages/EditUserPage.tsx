import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://67c7131ac19eb8753e787d7a.mockapi.io/api/v1/users/${id}`
      );
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (values: unknown) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://67c7131ac19eb8753e787d7a.mockapi.io/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      notification.success({
        message: "User Updated",
        description: "User has been successfully updated.",
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

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ width: 400, margin: "auto", padding: "2rem" }}>
      <h2>Edit User</h2>
      <Form onFinish={handleSubmit} layout="vertical" initialValues={user}>
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
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input the role!" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default EditUserPage;
