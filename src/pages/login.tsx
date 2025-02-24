import { useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../Api/Api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await api.post("/admin/login", {
        name: values.name,
        password: values.password,
      });
      console.log("res", res);

      localStorage.setItem("token", res.data.token);
      navigate("/");
      console.log("Success:", values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   const login = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const response = await fetch(`${API_URL}/admin/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ name, password }),
  //       });

  //       const data = await response.json();

  //       if (data?.token) {
  //         localStorage.setItem("token", data.token);
  //         alert("Logged in successfully");
  //         navigate("/");
  //       } else {
  //         alert("Invalid credentials");
  //       }
  //     } catch (error) {
  //       alert("Something went wrong. Please try again.");
  //     }
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Title level={2} className="text-center mb-6">
          Admin Login
        </Title>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name  !" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="name"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        {/* <Button onClick={() => navigate("/collectorLogin")} className="w-full">
          Collector login
        </Button> */}
      </div>
    </div>
  );
}
