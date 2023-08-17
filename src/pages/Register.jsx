import React from "react";
import AppAuthLayout from "../layout/AppAuthLayout";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-toastify";
import axiosClient from "../axios/axiosClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const navigate = useNavigate();

   const handleFinish = async (values) => {
      try {
         await axiosClient.post("/auth/register", values);
         toast.success("Register successful.");
         navigate("/login", { replace: true });
      } catch (error) {
         console.log(error);
         toast.warning(error?.response?.data?.message);
      }
   };

   return (
      <AppAuthLayout type="register">
         <Form className="auth-form" onFinish={handleFinish}>
            <Form.Item
               name="username"
               rules={[
                  {
                     required: true,
                     message: "Please enter your username",
                  },
               ]}
               hasFeedback
            >
               <Input placeholder="Username" />
            </Form.Item>
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
            <Form.Item>
               <Button className="form-submit" htmlType="submit" block>
                  Create Account
               </Button>
            </Form.Item>
         </Form>
      </AppAuthLayout>
   );
};

export default Register;
