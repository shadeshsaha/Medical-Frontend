"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, message } from "antd";
const { confirm } = Modal;
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";

import Image from "next/image";
import UMBreadCrumb from "@/ui/UMBreadCrumb";
import ActionBar from "@/ui/ActionBar";
import ModalForm from "@/components/modal/modal";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/ui/UploadImage";
import FormTextArea from "@/components/Forms/FormTextArea";

import TableList from "@/components/Table/TableList";
import {
  useDeleteServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/features/serviceApi";
import FormSelectField from "@/components/Forms/FormSelectField";
import { Category, ServiceStatus } from "@/constant/role";

const ServiceList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetServiceQuery({ ...query });
  // handle edit

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  console.log(editData);

  const [updateService, { isLoading: deleteLoading }] =
    useUpdateServiceMutation();

  const handleEdit = async (updated: any) => {
    const editedData = {
      serviceName: updated.serviceName,
      description: updated.description,
      serviceImage: updated.serviceImage,
      servicePrice: parseInt(updated.servicePrice),
      location: updated.location,
      serviceStatus: updated.serviceStatus,
      categoryId: updated.categoryId,
    };
    console.log(editedData);

    const id = updated.serviceId;

    try {
      const res = await updateService({ id, data: editedData }).unwrap();

      if (res) {
        message.success("Service updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  // handle edit end

  // delete
  const [deleteService, { isError }] = useDeleteServiceMutation();

  const deleteHandler = async (id: string) => {
    confirm({
      title: "Do you Want to delete this  Service?",
      icon: <ExclamationCircleFilled />,
      content: "Please confirm your action!",
      async onOk() {
        try {
          const res: any = await deleteService(id);
          console.log(res);
          if (res && res?.success) {
            message.success("Service Deleted successfully");
          }
        } catch (err: any) {
          console.error(err.data?.message);
          message.error(err.data?.message || "Something went wrong!");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Image",
      render: function (data: any) {
        return data?.serviceImage ? (
          <Image
            src={data?.serviceImage}
            alt=""
            width={50}
            className=" object-cover object-center rounded-full border h-[50px] w-[50px]"
            height={50}
          />
        ) : (
          "---"
        );
      },
      //   sorter: true,
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      //   sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      //   sorter: true,
    },
    {
      title: "Price",
      dataIndex: "servicePrice",
      //   sorter: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      //   sorter: true,
    },
    {
      title: "Status",
      dataIndex: "serviceStatus",
      //   sorter: true,
    },
    {
      title: "Category",
      render: function (data: any) {
        return data?.category ? <p>{data?.category?.categoryName}</p> : "---";
      },
      //   sorter: true,
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
          <div className="flex gap-3">
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
              onClick={() => deleteHandler(data?.serviceId)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
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
      <div className="bg-white  p-5 rounded-2xl shadow-lg">
        <UMBreadCrumb
          items={[
            {
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              label: "Service Lists",
              link: "/dashboard/service/service-list",
            },
          ]}
        />
        <div className="mt-5">
          <ActionBar title="Service Lists">
            <Input
              type="text"
              size="large"
              placeholder="Search by title or description..."
              style={{
                width: "30%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              <Link href="/dashboard/service/add-service">
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
        <TableList
          // loading={isLoading}
          columns={columns}
          dataSource={data}
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
          title="Blog"
          isLoading={deleteLoading}
        >
          {/* <Form submitHandler={handleEdit} defaultValues={editData}>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="blogTitle"
                    label="Blog Title"
                    placeholder="Blog Title"
                    size="large"
                    type="text"
                  />
                </Col>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <label htmlFor="blogImage">Profile Image</label>
                  <UploadImage
                    defaultImage={editData?.blogImage}
                    key="blogImage"
                    name="blogImage"
                  />
                </Col>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="blogDescription"
                    label="Blog Description"
                    rows={8}
                    placeholder="Enter Blog Description"
                  />
                </Col>
              </Row>
            </div>

            <div className="flex gap-5">
              <Button loading={deleteLoading} htmlType="submit">
                Update Service
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
          </Form> */}

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
                Blog information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={3} style={{ margin: "10px 0" }}>
                  <p className="pb-2">Blog Image</p>
                  <UploadImage
                    defaultImage={editData?.serviceImage}
                    name="serviceImage"
                  />
                </Col>{" "}
              </Row>

              <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      size="large"
                      name="serviceName"
                      label="Service Name"
                    />
                  </div>
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput size="large" name="servicePrice" label="Price" />
                  </div>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput size="large" name="location" label="Location" />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormSelectField
                      name="category.categoryName"
                      label="Category"
                      options={Category?.map((c) => ({
                        label: c.label,
                        value: c.value,
                      }))}
                    />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormSelectField
                      name="serviceStatus"
                      label="Service Status"
                      options={ServiceStatus.map((c) => ({
                        label: c.label,
                        value: c.value,
                      }))}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormTextArea
                      name="description"
                      label="Service Description"
                      rows={8}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <Button htmlType="submit">submit</Button>
          </Form>
        </ModalForm>
      )}
    </>
  );
};

export default ServiceList;
