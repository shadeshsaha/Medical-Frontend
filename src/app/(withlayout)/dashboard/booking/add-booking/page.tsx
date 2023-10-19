"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";

// import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
// import { SelectOptions } from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
// import UploadImage from "@/ui/UploadImage";

import { Button, Col, Row } from "antd";

const AddBooking = () => {
  // const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });

  // const courses = data?.courses;
  // const coursesOptions = courses?.map((course) => {
  //   return {
  //     label: course?.title,
  //     value: course?.id,
  //   };
  // });

  const onSubmit = async (data: any) => {
    // data.credits = parseInt(data?.credits);
    // const coursePreRequisitesOptions = data?.coursePreRequisites?.map(
    //   (id: string) => {
    //     return {
    //       courseId: id,
    //     };
    //   }
    // );
    // data.coursePreRequisites = coursePreRequisitesOptions;
    // message.loading("Creating.....");
    // try {
    //   const res = await addCourse(data).unwrap();
    //   if (res?.id) {
    //     message.success("Course created successfully");
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    //   message.error(err.message);
    // }
  };

  const slot = [
    { label: "10.00-10.20 AM", value: "10.00-10.20 AM" },
    { label: "10.20-10.40 AM", value: "10.20-10.40 AM" },
    { label: "10.40-11.00 AM", value: "10.40-11.00 AM" },
    { label: "11.00-11.20 AM", value: "11.00-11.20 AM" },
    { label: "11.20-11.40 AM", value: "11.20-11.40 AM" },
    { label: "11.40-12.00 PM", value: "11.40-12.00 PM" },
    { label: "05.00-05.20 PM", value: "05.00-05.20 PM" },
    { label: "05.20-05.40 PM", value: "05.20-05.40 PM" },
    { label: "05.40-06.00 PM", value: "05.40-06.00 PM" },
    { label: "06.20-06.40 PM", value: "06.20-06.40 PM" },
    { label: "06.40-07.00 PM", value: "06.40-07.00 PM" },
  ];

  const service = [
    { label: "Medicine", value: "Medicine" },
    { label: "Dentist", value: "Dentist" },
    { label: "Neurology", value: "Neurology" },
  ];

  const doctor = [
    { label: "Shadesh Saha", value: "Medicine" },
    { label: "Shafiqul Islam", value: "Dentist" },
    { label: "Zahidul Islam", value: "Neurology" },
    { label: "Mostofa Kabir", value: "Sergeon" },
  ];

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: "dashboard", link: `/dashboard` },
          { label: "add-booking", link: `/dashboard/add-booking` },
        ]}
      />
      <h1 className="mt-10">Create Service</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 12, lg: 8, md: 24 }}>
          <Col span={12} style={{ margin: "15px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="booking.Date" label="Appointment Date" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                name="booking.service"
                label="Service"
                options={service}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                name="booking.Doctor"
                label="Doctor"
                options={doctor}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                name="booking.slot"
                label="Time Slot"
                options={slot}
              />
            </div>
          </Col>
          <Col span={12} style={{ margin: "15px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput size="large" name="booing.name" label="User name" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput size="large" name="booing.email" label="Email" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput size="large" name="booing.mobile" label="Mobile No" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Create Booking
        </Button>
      </Form>
    </div>
  );
};

export default AddBooking;
