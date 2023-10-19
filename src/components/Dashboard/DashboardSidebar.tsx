"use client";

import { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Service", "sub1", <TeamOutlined />, [
    getItem("Add Service", "6"),
    getItem("List of Service", "8"),
  ]),
  getItem("Products", "sub2", <UserOutlined />, [
    getItem("Add Product", "3"),
    getItem("List of Product", "4"),
  ]),
  getItem("Booking", "sub3", <TeamOutlined />, [
    getItem("Add Time Slot", "6"),
    getItem("Booking List", "8"),
  ]),
  getItem("Other", "sub4", <TeamOutlined />, [
    getItem("Add Blog", "8"),
    getItem("List of Blogs", "9"),
    getItem("Add FAQ", "10"),
    getItem("List of FAQ", "11"),
  ]),
  getItem("Bookings History", "sub5", <TeamOutlined />),
  getItem("Appointment List", "sub6", <TeamOutlined />),
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        backgroundColor: "#ffff",
        boxShadow: "unset",
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          margin: "24px",
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        <h1 className="text-black">{collapsed ? "UM" : "Uttara Medic"}</h1>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default DashboardSidebar;
