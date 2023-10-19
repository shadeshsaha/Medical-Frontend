"use client";
import { useState } from "react";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import UMBreadCrumb from "@/ui/UMBreadCrumb";
import Form from "@/components/Forms/Form";
import UploadImage from "@/ui/UploadImage";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useCreateBlogMutation } from "@/redux/api/features/blogApi";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { Category, ServiceStatus } from "@/constant/role";
import { useCreateServiceMutation } from "@/redux/api/features/serviceApi";
import { parentSelectorLinter } from "@ant-design/cssinjs";
import { useCreateCategoryMutation } from "@/redux/api/features/categoryApi";

const AddBlogPage = () => {
    
  const [createCategory, { isLoading, isError }] = useCreateCategoryMutation();

  const router = useRouter();

  const categoryOnSubmit = async (data: any) => {
    message.loading("Creating new Category");

    const CategoryData = {
      categoryName: data.categoryName,
      description: data.description,
    };
    console.log(CategoryData);
    try {
      const res = await createCategory(CategoryData);

      // @ts-ignore
      if (res?.data && !isError) {
        message.success("Category created successfully");
        router.push("/dashboard/service/add-service");
      }
    } catch (err: any) {
      console.error(err?.data?.message);
      message.error("something went wrong");
    }
  };

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-lg">
      <UMBreadCrumb
        items={[
          { label: `dashboard`, link: `/dashboard` },
          { label: "add-blog", link: `/dashboard/service/add-category` },
        ]}
      />
      <div className="mt-3">
        <div className="mb-3">
          <h1 className="text-lg text-black/70 font-bold">
            Create New Category
          </h1>
        </div>
        <Form submitHandler={categoryOnSubmit}>
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
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Add Category For your Service
            </p>
            <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
              <Col span={24} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    size="large"
                    name="categoryName"
                    label="Category Name"
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
              <Col span={24} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormTextArea
                    style={{ margin: "10px 0px" }}
                    name="description"
                    label="Description"
                    rows={8}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <Button htmlType="submit">submit</Button>
        </Form>
        <br />
        <br />

        <br />
      </div>
    </div>
  );
};

export default AddBlogPage;
