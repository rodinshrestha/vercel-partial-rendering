import { authRoutes } from "../constants/auth.constant";

/**
 * @authRoutes Array<string> | Route that needs auth access
 * @param pathname Current pathname
 * @returns boolean
 */
export const isProtectedPage = (pathname: string) => {
  if (!pathname) {
    return false;
  }
  return authRoutes.some((el) => pathname.includes(el));
};
