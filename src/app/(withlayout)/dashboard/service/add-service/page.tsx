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
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";

const AddBlogPage = () => {
  const [createService, { isLoading, isError }] = useCreateServiceMutation();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery(undefined);

  // submit
  const router = useRouter();

  const serviceOnSubmit = async (data: any) => {
    message.loading("Creating new Service");
    const ServiceData = {
      serviceName: data.serviceName,
      description: data.description,
      serviceImage: data.serviceImage,
      servicePrice: parseInt(data.servicePrice),
      location: data.location,
      serviceStatus: data.serviceStatus,
      categoryId: data.categoryId,
    };
    console.log(ServiceData);
    try {
      const res = await createService(ServiceData);

      // @ts-ignore
      if (res?.data && !isError) {
        message.success("Service created successfully");
        router.push("/dashboard/service/service-list");
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
          { label: "add-blog", link: `/dashboard/service/add-service` },
        ]}
      />
      <div className="mt-3">
        <div className="mb-3">
          <h1 className="text-lg text-black/70 font-bold">
            Create New Service
          </h1>
        </div>
        <Form submitHandler={serviceOnSubmit}>
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
              Blog information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={3} style={{ margin: "10px 0" }}>
                <p className="pb-2">Blog Image</p>
                <UploadImage name="serviceImage" />
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
                    name="categoryId"
                    label="Category"
                    options={categoryData?.map((item: any) => ({
                      label: item.categoryName,
                      value: item.categoryId,
                    }))}
                  />
                </div>
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormSelectField
                    name="serviceStatus"
                    label="Service Status"
                    options={ServiceStatus}
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
        <br />
        <br />

        <br />
      </div>
    </div>
  );
};

export default AddBlogPage;
