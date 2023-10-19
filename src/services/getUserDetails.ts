import { getUserInfo } from "./auth.services";

export const userDetails = getUserInfo() as any;
