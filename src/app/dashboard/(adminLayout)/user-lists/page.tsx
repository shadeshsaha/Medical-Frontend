/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/Redux/features/userApi/userApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ModalForm from "@/components/modal/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroup } from "@/constant/common";
import { noImage } from "@/helpers/noImage/noImage";
import { getUserInfo } from "@/services/auth.services";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
const { confirm } = Modal;

const UserList = () => {
  const user: any = getUserInfo();

  const superAdminRole = [
    {
      label: "USER",
      value: "USER",
    },
    {
      label: "ADMIN",
      value: "ADMIN",
    },
    {
      label: "SUPER_ADMIN",
      value: "SUPER_ADMIN",
    },
  ];
  const adminRole = [
    {
      label: "USER",
      value: "USER",
    },
    {
      label: "ADMIN",
      value: "ADMIN",
    },
  ];

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // get data
  const { data, isLoading } = useGetAllUsersQuery(searchTerm);
  const filteredData = data?.filter(
    (item: any) => item?.profile?.role === "USER"
  );

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // handle edit

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const handleEdit = async (data: any) => {
    const updateData = {
      email: data?.email,
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      profileImage: data?.profileImage ?? editData?.profile?.profileImage,
      contactNumber: data?.profile?.contactNumber,
      address: data?.profile?.address,
      bloodGroup: data?.profile?.bloodGroup,
      role: data?.profile?.role,
    };

    const id = data?.profile?.profileId;

    try {
      const res = await updateUser({ id, body: updateData }).unwrap();

      if (res?.success) {
        message.success("Admin updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  // handle edit end

  // delete
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Please confirm your action!",
      async onOk() {
        try {
          const res: any = await deleteUser(id);

          if (res?.data?.success) {
            message.success("User Deleted successfully");
          }
        } catch (err: any) {
          console.error(err.data?.message);
          message.error(err.data?.message);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // delete end

  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.lastName}`;
        return (
          <div className="flex gap-2 items-center">
            <img
              src={data?.profileImage ?? noImage}
              alt={fullName}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            {fullName}
          </div>
        );
      },
      //   sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      //   sorter: true,
    },
    {
      title: "Address",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.address ?? "-"}</>;
      },
    },
    {
      title: "Contact No",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.contactNumber ?? "-"}</>;
      },
      //   sorter: true,
    },
    {
      title: "Blood Group",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.bloodGroup ?? "-"}</>;
      },
      //   sorter: true,
    },
    {
      title: "Role",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.role ?? "-"}</>;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      //   sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => {
                setIsEditModalOpen(true);
                setEditData(data);
              }}
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => deleteHandler(data?.userId)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  //   console.log(dataSource);

  return (
    <>
      <div className="container rounded bg-white mt-1 mb-5 p-4">
        <UMBreadCrumb
          items={[
            {
              label: "dashboard",
              link: "/dashboard",
            },
            {
              label: "user-lists",
              link: "/dashboard/user-lists",
            },
          ]}
        />

        <div className="mt-5">
          <ActionBar title="User Lists">
            <Input
              type="text"
              size="large"
              placeholder="Search by name, email, role..."
              style={{
                width: "30%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              <Link href="/dashboard/add-user">
                <Button type="primary">Create</Button>
              </Link>
              {(!!sortBy || !!sortOrder || !!searchTerm) && (
                <Button
                  onClick={resetFilters}
                  type="primary"
                  style={{ margin: "0px 5px" }}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>
        </div>

        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={filteredData}
          pageSize={size}
          // totalPages="meta?.total"
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
      {isEditModalOpen && editData && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="FAQ"
          isLoading={updateLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
            {/* faculty information */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "5px 0px",
                }}
              >
                Profile information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    size="large"
                    placeholder="Enter email"
                    disabled
                    required
                  />
                </Col>

                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="profile.role"
                    label="User Role"
                    options={
                      user?.role === "SUPER_ADMIN" ? superAdminRole : adminRole
                    }
                    size="large"
                    placeholder="Select Role"
                    required
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="profile.bloodGroup"
                    label="Blood Group"
                    options={bloodGroup}
                    size="large"
                    placeholder="Select Blood Group"
                    required
                  />
                </Col>
              </Row>
            </div>
            {/* basic information  */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "5px 0px",
                }}
              >
                Basic information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <label htmlFor="image">Profile Image</label>
                  <UploadImage
                    name="profileImage"
                    key="file"
                    updateImage={editData?.profile?.profileImage}
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.firstName"
                    label="First Name"
                    size="large"
                    placeholder="Enter First Name"
                    required
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.lastName"
                    label="Last Name."
                    size="large"
                    placeholder="Enter Last Name"
                    required
                  />
                </Col>{" "}
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.contactNumber"
                    label="Contact Number"
                    size="large"
                    placeholder="Enter Contract Number"
                    required
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.address"
                    label="Address"
                    size="large"
                    placeholder="Enter Address"
                    required
                  />
                </Col>{" "}
              </Row>
            </div>

            <div className="flex gap-5">
              <Button
                htmlType="submit"
                loading={updateLoading}
                disabled={updateLoading}
              >
                Update User
              </Button>

              <Button
                onClick={() => setIsEditModalOpen(false)}
                htmlType="button"
                type="primary"
                danger
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalForm>
      )}
    </>
  );
};

export default UserList;
