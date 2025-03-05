import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, notification, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  nom: string;
  prenom: string;
  email: string;
  role: string[];
}
type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
};
const columns: TableProps<User>["columns"] = [
  {
    title: "nom",
    dataIndex: "nom",
    key: "nom",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "prenom",
    dataIndex: "prenom",
    key: "prenom",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "role",
    key: "role",
    dataIndex: "role",
    render: (_, { role }) => (
      <>
        {role}
        {/* {role.map((rol) => {
          let color = rol.length > 5 ? "geekblue" : "green";
          if (rol === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={rol}>
              {rol.toUpperCase()}
            </Tag>
          );
        })} */}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space key={record.id} size="middle">
        <Button>
          <Link to={`/editUser/${record.id}`}>Update</Link>
        </Button>
        <Button danger>
          {/* onClick={() => handleDelete(record.id)} */}
          Delete
        </Button>
        <Button>
          <Link to={`/viewUser/${record.id}`}>
            <EyeOutlined />
          </Link>
        </Button>
      </Space>
    ),
  },
];

const items = Array.from({ length: 1 }).map((_, index) => ({
  key: String(index + 1),
  label: `UserList`,
}));

function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://67c7131ac19eb8753e787d7a.mockapi.io/api/v1/users"
        );
        if (!response.ok) throw new Error("faild");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "UNK");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // In HomePage.tsx
  // const handleDelete = async (id: string) => {
  //   try {
  //     const response = await fetch(`https://67c7131ac19eb8753e787d7a.mockapi.io/api/v1/users/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) throw new Error('Failed to delete user');

  //     notification.success({
  //       message: 'User Deleted',
  //       description: 'User has been successfully deleted.',
  //     });

  //     setUsers(users.filter(user => user.id !== id)); // Update the local state after deletion
  //   } catch ( error) {
  //     notification.error({
  //       message: 'Error',
  //       description: error.message || 'Something went wrong.',
  //     });
  //   }
  // };

  if (loading) return <p>isLoading......</p>;
  if (erro) return <p>Error. {erro}</p>;
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content>
        <Typography
          style={{ textAlign: "center", fontSize: "2rem", margin: "1rem 0" }}
        >
          List des Utilisateurs
        </Typography>

        {/* <ul>
          {users.map((user) => (
            <li key={user.id}>{user.nom}</li>
          ))}
        </ul> */}
        <Button
          color="green"
          style={{
            marginBottom: "1rem",
            display: "flex",
            marginRight: "auto",
          }}
        >
          <Link to={"/addUser"}>Ajouter Utilisateur</Link>
        </Button>
        <Table<User> columns={columns} dataSource={users} />
      </Content>
    </Layout>
  );
}

export default HomePage;
