"use client";

import { useCreateBookingMutation } from "@/Redux/features/bookingApi/bookingApi";
import { useGetServicesQuery } from "@/Redux/features/serviceApi/serviceApi";
import { useGetSlotQuery } from "@/Redux/features/slotApi/slotApi";
import { isLoggedIn } from "@/services/auth.services";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import app from "../../../public/assests/app.png";
import Form from "../Forms/Form";
import FormDatePicker from "../Forms/FormDatePicker";
import FormSelectField from "../Forms/FormSelectField";

const { confirm } = Modal;

const Appointment = () => {
  const userLoggedIn = isLoggedIn();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["searchTerm"] = searchTerm;

  const { data: slotData, isLoading: slotLoading } = useGetSlotQuery(undefined);
  console.log("slotData:", slotData);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetServicesQuery(undefined);

  const [createBooking, { isLoading, isError }] = useCreateBookingMutation();

  const router = useRouter();

  // const bookingOnSubmit = async (data: any) => {
  //   message.loading("Creating new Service");

  //   const BookingData = {
  //     appointmentDate: data.appointmentDate,
  //     slotId: data.slot.slotId,
  //     serviceId: data.service.serviceId,
  //   };
  //   console.log(BookingData);
  //   try {
  //     const res = await createBooking(BookingData);

  //     // @ts-ignore
  //     if (res?.data && !isError) {
  //       message.success("Booking created successfully");
  //       router.push("/dashboard/booking/booking-list");
  //     }
  //   } catch (err: any) {
  //     console.error(err?.data?.message);
  //     message.error("something went wrong");
  //   }
  // };

  const bookingOnSubmit = async (data: any) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content: "You need to login first to book. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      try {
        const dateString = data.appointmentDate?.$d;
        const dateObject = new Date(dateString);

        // Get ISO string
        const isoString = dateObject.toISOString();
        console.log("isoString: ", isoString);

        const BookingData = {
          appointmentDate: isoString,
          slotId: data.slot.slotId,
          serviceId: data.service.serviceId,
        };

        const res = await createBooking(BookingData).unwrap();
        console.log("res: ", res);

        if (res?.success) {
          message.success(
            "Slot added on your booking.admin will verified and confirm your booking"
          );
        }
      } catch (error: any) {
        console.error(error);
        message.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="common md:flex gap-10 items-center mb-[60px]">
      <Image
        src={app}
        alt="Picture of the author"
        width={400}
        height={400}
        className="rounded-xl md:w-[450px] md:h-[400px] border-2 "
      />
      {/* FAQS */}
      <div className="font-inter my-[20px] md:my-0 flex flex-col md:h-[400px] justify-around ">
        <p className="text-primary md:text-[20px] text-[16px] font-semibold">
          APPOINTMENT
        </p>
        <p className="font-poppins md:text-[45px] text-[35px] md:w-[550px]">
          Book Your Appointment
        </p>
        <p className="md:w-[500px] text-gray-[400px] font-poppins text-gray-500">
          The benefits of BIRDEM CDiC are that it allows diabetic patients to
          quickly heal their problems.
        </p>

        {/* Appointment Form Start */}
        <Form submitHandler={bookingOnSubmit}>
          <div className="my-[12px] flex flex-col items-center justify-center gap-2 w-full">
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormDatePicker name="appointmentDate" label="Appointment Date" />
            </div>
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormSelectField
                name="slot.slotId"
                label="Booking Slot"
                required
                options={slotData?.data?.map((c: any) => ({
                  label: c.slotTime,
                  value: c.slotId,
                }))}
              />
            </div>
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormSelectField
                name="service.serviceId"
                required
                label="Service Name"
                options={serviceData?.map((c: any) => ({
                  label: c.serviceName,
                  value: c.serviceId,
                }))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="appointmentButton"
            // style={{ marginBottom: "100px" }}
          >
            Make Appoinment
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Appointment;
