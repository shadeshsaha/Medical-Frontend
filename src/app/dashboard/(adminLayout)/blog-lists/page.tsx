"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
const { confirm } = Modal;

import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/Redux/features/blogApi/blogApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ModalForm from "@/components/modal/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import UploadImage from "@/components/ui/UploadImage";
import Image from "next/image";

const BlogLists = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // get data
  const { data, isLoading } = useGetBlogQuery(query);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();

  const handleEdit = async (updated: any) => {
    const editedData = {
      blogTitle: updated.blogTitle,
      blogDescription: updated.blogDescription,
      blogImage: updated.blogImage,
    };
    console.log(editedData);

    const id = updated.blogId;

    try {
      const res = await updateBlog({ id, body: editedData }).unwrap();

      if (res) {
        message.success("Blog updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  const [deleteBlog, { isError }] = useDeleteBlogMutation();

  const deleteHandler = async (id: string) => {
    confirm({
      title: "Do you Want to delete this  Blog?",
      icon: <ExclamationCircleFilled />,
      content: "Please confirm your action!",
      async onOk() {
        try {
          const res: any = await deleteBlog(id);
          if (res && !isError) {
            message.success("Blog Deleted successfully");
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
  const columns = [
    {
      title: "Image",
      render: function (data: any) {
        return data?.blogImage ? (
          <Image
            src={data.blogImage}
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
      title: "Blog Title",
      dataIndex: "blogTitle",
      //   sorter: true,
    },
    {
      title: "Blog Description",
      dataIndex: "blogDescription",
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
      title: "Author Name",
      dataIndex: "profile",
      render: function (data: Record<any, any>) {
        const fullName = `${data?.firstName!} ${data?.lastName}`;
        return <>{fullName}</>;
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
              onClick={() => deleteHandler(data?.blogId)}
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
              label: "Blog Lists",
              link: "/dashboard/blog-lists",
            },
          ]}
        />
        <div className="mt-5">
          <ActionBar title="Blog Lists">
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
              <Link href="/dashboard/add-blog">
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
          isLoading={updateLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
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
                    updateImage={editData?.blogImage}
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
              <Button loading={updateLoading} htmlType="submit">
                Update Blog
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

export default BlogLists;
