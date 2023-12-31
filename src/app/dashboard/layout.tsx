"use client";
import DashboardContents from "@/components/dashboard/DashboardContent/DashboardContent";
import DashboardSiteBar from "@/components/dashboard/DashboardSiteBar/DashboardSiteBar";
import { tokenKey } from "@/helpers/token/tokenKey";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.services";
import { Layout, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const user = getUserInfo() as any;

  const handleLogOut = () => {
    removeUserInfo(tokenKey);
    message.success("Logout Successfully");
    router.push("/login");
  };

  const userLoggedIn = isLoggedIn();

  if (!userLoggedIn && typeof window !== "undefined") {
    router.push("/login");
    return message.error("You are not Authorize user.please login");
  }

  return (
    <Layout hasSider>
      <DashboardSiteBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role={user?.role}
      />
      <DashboardContents
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        handleLogOut={handleLogOut}
      >
        {children}
      </DashboardContents>
    </Layout>
  );
}
