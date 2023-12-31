import { Button, Modal } from "antd";
import Link from "next/link";

type BookAppointmentData = {
  _id: number;
  day: string;
  time: string;
};

const HealthCare = () => {
  const bookAppointmentData: BookAppointmentData[] = [
    {
      _id: 1,
      day: "Mon-Tue",
      time: "8:00am - 3:00pm",
    },
    {
      _id: 2,
      day: "Wed-Thu",
      time: "9:00am - 3:00pm",
    },
    {
      _id: 3,
      day: "Sat-Sun",
      time: "9:00am - 5:00pm",
    },
    {
      _id: 4,
      day: "Sat-Thu",
      time: "11:00am - 3:00pm",
    },
  ];

  const handleInfo = () => {
    Modal.info({
      title: "This feature is under development",
      content: (
        <div>
          <p>Sorry for this problem </p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/532399350/photo/doctor-on-a-phone-call-with-his-patient.jpg?s=612x612&w=0&k=20&c=LJ7JxluXrUmciy2VsRatte2-63MX2iqqaAPhfh_nzqc=)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "10%",
      }}
      className="h-screen common w-full mb-[150px] flex justify-end items-center border-2 border-borderColor"
    >
      <div
        className="bg-primary rounded-xl md:p-[60px] p-[20px] font-inter text-white md:w-[720px] md:h-[780px]"
        // style={{ marginTop: "4%" }}
      >
        <p className="md:text-[18px] font-semibold pb-[16px]">VISITING HOURS</p>
        <p className="md:text-[45px] text-[25px] font-sans">
          Healthcare at Its Finest
        </p>

        <p className="text-[14px] my-[12px]">
          BIRDEM CDiC Doctors Are Available Saturday To Thursday To Give Health
          Checkup To Diabetic Patients. Book Your Appointment Online...
        </p>

        {/* book */}
        <div className="py-[50px] flex flex-col gap-2">
          {bookAppointmentData.map((data) => (
            <div
              key={data?._id}
              className="flex w-full font-semibold justify-between md:text-[19px] text-[14px] border-b-2 border-borderColor "
            >
              <p className=" font-semibold pb-[16px] w-[30%]">{data?.day}</p>
              <p className=" font-sans w-[40%]">{data?.time}</p>
              {/* book now button */}
              {/* <button className="bg-black rounded-xl px-[15px] font-inter text-white text-[12px] ">
                Book Now
              </button> */}
              <Button
                onClick={handleInfo}
                type="primary"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "none",
                  width: "100px",
                  height: "30px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#4851D5",
                  cursor: "pointer",
                }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[20px] font-semibold mb-5">Time’s not flexible?</p>

          <Link
            href={"#appointment"}
            style={{
              backgroundColor: "white",
              color: "black",
              margin: "5px 0px",
            }}
            className="appointmentButton"
          >
            Make an appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthCare;
