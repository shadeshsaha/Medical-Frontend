"use client";

import Contents from "@/components/Dashboard/Contents";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
// import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import SideBar from "@/ui/sideBar";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = getUserInfo() as any;

  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return (
    <Layout hasSider>
      {/* <DashboardSidebar /> */}
      <SideBar role={role} />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
