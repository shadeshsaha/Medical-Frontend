"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";

import { USER_ROLE } from "@/constant/role";
import { sidebarItems } from "@/constant/sideBarItems";
import { getUserInfo } from "@/services/auth.services";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = ({ role }: { role: string }) => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.SUPER_ADMIN;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        background: "white",
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Link
        href="/"
        style={{
          color: "black",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        U-Medic
      </Link>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
