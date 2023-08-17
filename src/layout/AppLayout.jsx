import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
   return (
      <Layout className="main-layout">
         <AppHeader />
         <Content style={{ padding: "50px 0" }}>{children}</Content>
         <AppFooter />
      </Layout>
   );
};

export default AppLayout;
