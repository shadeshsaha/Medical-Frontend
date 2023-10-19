"use client";

import { Layout } from "antd";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* Header     */}
      this is header for dashboard
      {children}
    </Content>
  );
};

export default Contents;
