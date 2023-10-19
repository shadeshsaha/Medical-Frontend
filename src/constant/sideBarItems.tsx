import type { MenuProps } from "antd";
import {
  UsergroupAddOutlined,
  TableOutlined,
  AppstoreOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  BookOutlined,
  PlusSquareOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  CustomerServiceOutlined,
  CloudServerOutlined,
  FolderAddOutlined,
  DiffOutlined,
  FileAddOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "@/constant/role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/${role}/my-profile`}>Account Profile</Link>
          ),
          icon: <UserOutlined />,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/booking-list`}>Booking List</Link>,
      icon: <BookOutlined />,
      key: `/${role}/booking-list`,
    },
    {
      label: <Link href={`/dashboard/${role}/reviews`}>My Reviews</Link>,
      icon: <PlusSquareOutlined />,
      key: `/${role}/reviews`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    // ...userSidebarItems,
    ...defaultSidebarItems,
    {
      label: "User management",
      key: "user-management",
      icon: <UserSwitchOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/user/add-user`}>Add user</Link>,
          key: `/add-user`,
          icon: <UserAddOutlined />,
        },
        {
          label: <Link href={`/dashboard/user/user-list`}>User List</Link>,
          key: `/user-list`,
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "service management",
      key: "service-management",
      icon: <CustomerServiceOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/service/add-category`}>Add Category</Link>
          ),
          key: `/add-category`,
          icon: <FolderAddOutlined />,
        },
        {
          label: (
            <Link href={`/dashboard/service/add-service`}>Add Service</Link>
          ),
          key: `/add-service`,
          icon: <FolderAddOutlined />,
        },
        {
          label: (
            <Link href={`/dashboard/service/service-list`}>Service List</Link>
          ),
          key: `/service-list`,
          icon: <CloudServerOutlined />,
        },
      ],
    },
    {
      label: "booking management",
      key: "booking-management",
      icon: <DiffOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/booking/add-slot`}>Add Slot</Link>,
          key: `/add-slot`,
          icon: <FileAddOutlined />,
        },
        {
          label: (
            <Link href={`/dashboard/booking/booking-list`}>Booking List</Link>
          ),
          key: `/booking-list`,
          icon: <FileSearchOutlined />,
        },
      ],
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/blog/add-blog`}>Add Blog</Link>,
          key: `/add-blog`,
          icon: <BookOutlined />,
        },
        {
          label: <Link href={`/dashboard/blog/blog-list`}>Blog List</Link>,
          key: `/blog-list`,
          icon: <BookOutlined />,
        },
        {
          label: <Link href={`/dashboard/faq/add-faq`}>Add FAQ</Link>,
          key: `/add-faq`,
          icon: <BookOutlined />,
        },
        {
          label: <Link href={`/dashboard/faq/faq-list`}>FAQ List</Link>,
          key: `/faq-list`,
          icon: <BookOutlined />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: "Admin-Management",
      key: "admin-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/admin/add-admin`}>add Admin</Link>,
          icon: <TableOutlined />,
          key: `/add-admin`,
        },
        {
          label: <Link href={`/dashboard/admin/admin-list`}>Admin List </Link>,
          icon: <TableOutlined />,
          key: `/admin-list`,
        },
      ],
    },
  ];

  const doctorSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: (
        <Link href={`/dashboard/${role}/booking-list`}>Booking Lists</Link>
      ),
      icon: <TableOutlined />,
      key: `/booking-list`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.DOCTOR) return doctorSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
