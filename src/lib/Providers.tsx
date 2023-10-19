"use client";

import store from "@/Redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntDRegistry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
