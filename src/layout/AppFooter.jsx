import React from "react";
import { Link } from "react-router-dom";
import { Col, Layout, Row, Space, Typography } from "antd";

import { FiYoutube } from "react-icons/fi";
import { AiFillGithub, AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";


const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const AppFooter = () => {
   return (
      <Footer className="footer">
         <div className="container">
            <Row gutter={[24, 34]}>
               <Col span={6} lg={6} md={12} sm={12} xs={24}>
                  <Space direction="vertical" size="middle">
                     <div className="footer-logo">
                        <img src="/images/logo.png" alt="" />
                     </div>

                     <Text>Duong we love you so muchhhhhhhhhhhhhhhhhhhhhhhhhhhh</Text>

                     <Space direction="horizontal" size="large" className="footer-social">
                        <FiYoutube className="social-icon" />
                        <AiFillGithub className="social-icon" />
                        <CiFacebook className="social-icon" />
                        <AiOutlineInstagram className="social-icon" />
                     </Space>
                  </Space>
               </Col>
               <Col span={6} lg={6} md={12} sm={12} xs={24}>
                  <Space direction="vertical" size="large">
                     <Title level={5} className="footer-title">
                        Discover
                     </Title>
                     <Space direction="vertical" size="middle">
                        <Link className="footer-link" to="/">
                           Home
                        </Link>
                        <Link className="footer-link" to="/about">
                           About
                        </Link>
                        <Link className="footer-link" to="/tours">
                           Tours
                        </Link>
                     </Space>
                  </Space>
               </Col>
               <Col span={6} lg={6} md={12} sm={12} xs={24}>
                  <Space direction="vertical" size="large">
                     <Title level={5} className="footer-title">
                        Quick Links
                     </Title>
                     <Space direction="vertical" size="middle">
                        <Link className="footer-link" to="/">
                           Gallery
                        </Link>
                        <Link className="footer-link" to="/login">
                           Login
                        </Link>
                        <Link className="footer-link" to="/register">
                           Register
                        </Link>
                     </Space>
                  </Space>
               </Col>
               <Col span={6} lg={6} md={12} sm={12} xs={24}>
                  <Space direction="vertical" size="large">
                     <Title level={5} className="footer-title">
                        Contact
                     </Title>
                     <Space direction="vertical" size="middle">
                        <Space className="contact-item" align="center">
                           <Space className="contact-item-left" align="center">
                              <HiOutlineLocationMarker className="contact-item-icon" />
                              <span>Address:</span>
                           </Space>
                           <Link className="footer-link" to="/">
                              Duong
                           </Link>
                        </Space>
                        <Space className="contact-item" align="center">
                           <Space className="contact-item-left" align="center">
                              <AiOutlineMail className="contact-item-icon" />
                              <span>Email:</span>
                           </Space>
                           <Link style={{ wordBreak: "break-word" }} className="footer-link" to="/">
                              duonghovo@gmail.com
                           </Link>
                        </Space>
                        <Space className="contact-item" align="center">
                           <Space className="contact-item-left" align="center">
                              <FaPhoneAlt className="contact-item-icon" />
                              <span>Phone:</span>
                           </Space>
                           <Link className="footer-link" to="/">
                              0344362989
                           </Link>
                        </Space>
                     </Space>
                  </Space>
               </Col>
            </Row>
         </div>
      </Footer>
   );
};

export default AppFooter;
