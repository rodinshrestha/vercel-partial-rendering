// Get auth user
import { cache } from "react";

import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { executeFetch } from "@/lib/execute-fetch";

import { AUTH_TOKEN } from "../constants/auth.constant";
import { ProfileUser } from "../types/user.types";
import { isProtectedPage } from "../utils/is-protected-page";

export const fetchProfile = cache(async () => {
  const nextCookies = cookies();
  const HC_TOKEN = nextCookies.get(AUTH_TOKEN)?.value;
  const pathname = headers().get("x-pathname") as string;

  if (!HC_TOKEN) {
    const redirect_url = "/";
    /**
     * Redirect to homepage if unauthenticated user want to access auth pages
     */
    if (isProtectedPage(pathname)) redirect(redirect_url);
    return { status: null, data: null, error: true };
  }

  const url = "/sf/customer/auth/profile";

  const response = await executeFetch(url, {
    headers: {
      Authorization: `Bearer ${HC_TOKEN}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    if (response.status !== 401) return notFound();

    const res = await response.json();

    const redirect_url = isProtectedPage(pathname) ? "/" : pathname;

    /**
     * Redirect to token-error page if token is invalid
     */
    return redirect(
      `/token-error?redirect_url=${redirect_url}&error=${res.message || "Server Error"}`
    );
  }

  return (await response.json()) as { data: ProfileUser };
});
