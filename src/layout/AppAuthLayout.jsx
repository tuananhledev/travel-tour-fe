import React from "react";
import { Button, Col, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const AppAuthLayout = ({ children, type = "login" }) => {
   return (
      <div className="container">
         <Row justify="center">
            <Col span={16} lg={16} md={24} xs={24}>
               <div className="auth-container">
                  <div className="auth-image">
                     <img src="/images/auth.png" alt="" />
                  </div>
                  <div className="auth-content">
                     <div className="auth-content-user">
                        <img src="/images/user.png" alt="" />
                     </div>
                     <Space direction="vertical" size="middle">
                        <h2>{type === "login" ? "Login" : "Register"}</h2>
                        <>{children}</>
                        {type === "login" ? (
                           <p>
                              {`Don't have an account?`} <Link to="/register">Create</Link>
                           </p>
                        ) : (
                           <p>
                              {`Already have an account?`} <Link to="/login">Login</Link>
                           </p>
                        )}
                     </Space>
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default AppAuthLayout;
