"use client";
import store from "@/Redux/store";
// import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntResistry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <ConfigProvider
        theme={{
          token: {
            // Seed Token
            // colorPrimary: "red",
            borderRadius: 8,
            colorText: "#000",
            fontFamily: "default",
            colorBgSpotlight: "red",
            // Alias Token
            colorBgContainer: "#fff",
          },
        }}
      >
        <Provider store={store}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      </ConfigProvider> */}

      <Provider store={store}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Provider>
    </>
  );
};

export default Providers;
