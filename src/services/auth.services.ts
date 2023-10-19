import { tokenKey } from "@/helpers/token/tokenKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(tokenKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(tokenKey);
  console.log("authToken: ", authToken);

  if (authToken) {
    const decodedData = decodedToken(authToken);
    console.log("decodedData: "), decodedData;
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(tokenKey);
  console.log("authToken: ", authToken);

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
