import { authKey } from "@/constant/common";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage, setToLocalStorage } from "@/helpers/utils";
import { decodedToken } from "@/utils/jwt";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  console.log("authToken: " + authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
