"use client";
import { isLoggedIn } from "@/services/auth.services";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Statistic, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
const { confirm } = Modal;

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const FreeInsulin = () => {
  const book = getFromLocalStorage("freeVaccine");
  const [isBook, setIsBook] = useState((book === "true" && true) ?? false);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const handleBookNow = () => {
    // check if user is logged in
    // if not logged in
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
      // if logged in
      setToLocalStorage("freeVaccine", "true");
      setIsBook(true);
      message.success("You have successfully booked");
    }
  };

  return (
    <div
      className="common grid grid-cols-5 gap-4 items-center h-[700px]"
      style={{
        backgroundColor: "rgb(242, 246, 247)",
        backgroundImage:
          'url("https://m3.healio.com/~/media/slack-news/stock-images/endocrinology/d/diabetes-child_adobe.jpg")',
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxSizing: "border-box",
        color: "rgb(92, 114, 125)",
        colorInterpolation: "sRGB",
        colorRendering: "auto",
        fontFamily: '"Nunito Sans", sans-serif',
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: 1.8,
        outlineColor: "rgb(92, 114, 125)",
        outlineOffset: "0px",
        outlineStyle: "none",
        outlineWidth: "0px",
        paddingBottom: "120px",
        paddingTop: "100px",
        marginTop: "50px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="md:col-span-2 col-span-4">
        <p
          style={{
            boxSizing: "border-box",
            clear: "both",
            colorInterpolation: "sRGB",
            colorRendering: "auto",
            fontFamily: "Josefin Sans,sans-serif",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "1.3",
          }}
          className="text-primary"
        >
          Free Insulin For Everyone 😀
        </p>
        <h3
          className="md:text-[44px] text-[24px] font-bold "
          style={{
            boxSizing: "border-box",
            clear: "both",
            color: "rgb(7, 28, 31)",
            colorInterpolation: "sRGB",
            colorRendering: "auto",
            fontFamily: '"Josefin Sans", sans-serif',
            // fontSize: "44px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: "15px",
            marginTop: "0px",
            outlineColor: "rgb(7, 28, 31)",
            outlineOffset: "0px",
            outlineStyle: "none",
            outlineWidth: "0px",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Free Insulin For Every Diabetic Patient of CDiC, LFAC
        </h3>

        <p
          style={{
            boxSizing: "border-box",
            color: "rgb(92, 114, 125)",
            colorInterpolation: "sRGB",
            colorRendering: "auto",
            fontFamily: '"Nunito Sans", sans-serif',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            hyphens: "auto",
            lineHeight: 1.8,
            marginBottom: "0px",
            marginTop: "0px",
            maxWidth: "600px",
            outlineColor: "rgb(92, 114, 125)",
            outlineOffset: "0px",
            outlineStyle: "none",
            outlineWidth: "0px",
            WebkitFontSmoothing: "antialiased",
          }}
          className="text-[14px] text-white-600"
        >
          Birdem CDIC proudly offers free insulin to all individuals in need,{" "}
          <br />
          demonstrating our commitment to ensuring accessible healthcare and
          improving the lives of those who require this vital medication.
        </p>
      </div>
    </div>
  );
};

export default FreeInsulin;
