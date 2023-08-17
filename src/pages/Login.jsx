import React, { useContext } from "react";
import AppAuthLayout from "../layout/AppAuthLayout";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-toastify";
import axiosClient from "../axios/axiosClient";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const { setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleFinish = async (value) => {
      try {
         const result = await axiosClient.post("/auth/login", value);
         const authData = { ...result.data.data, role: result.data.role }
         setAuth(authData);
         localStorage.setItem("auth", JSON.stringify(authData));
         navigate('/');
         toast.success("Login successful.");

      } catch (error) {
         console.log(error);
         toast.error(error?.response?.data?.message);
      }
   };

   return (
      <AppAuthLayout>
         <Form className="auth-form" onFinish={handleFinish}>
            <Form.Item
               name="email"
               rules={[
                  {
                     required: true,
                     message: "Please enter your email",
                  },
                  { type: "email", message: "Please enter a valid email" },
               ]}
               hasFeedback
            >
               <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
               name="password"
               rules={[
                  {
                     required: true,
                     message: "Please enter your password",
                  },
                  { whitespace: true },
               ]}
               hasFeedback
            >
               <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item shouldUpdate>
               <Button className="form-submit" htmlType="submit" block>
                  Login
               </Button>
            </Form.Item>
         </Form>
      </AppAuthLayout>
   );
};

export default Login;
