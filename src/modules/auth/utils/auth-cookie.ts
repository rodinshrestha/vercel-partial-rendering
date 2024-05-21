import { deleteCookie, getCookie, setCookie } from "@/core/utils/cookie";

import { AUTH_TOKEN } from "../constants/auth.constant";

export const getAuthToken = () => {
  return getCookie(AUTH_TOKEN);
};

export const setAuthToken = (authToken: string) => {
  setCookie(AUTH_TOKEN, authToken);
};

export const removeAuthToken = () => {
  deleteCookie(AUTH_TOKEN);
};
