import { NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN, ID_TOKEN } from "@/auth/constants/auth.constant";
import { getChannelStore } from "@/core/utils/get-channel-store";

const removeNextAuthTokens = (req: NextRequest, response: NextResponse) => {
  /**
   * Next auth adds _Secure- prefix in cookie for secure domain
   */
  const isSecure = req.headers.get("x-forwarded-proto") === "https";

  const cookiePrefix = `${isSecure ? "__Secure-" : ""}next-auth.session-token`;

  /**
   * Next auth maintains multiple sessions
   * deletes all next auth session from cookie
   */
  for (const cookie of req.cookies.getAll()) {
    if (cookie.name.startsWith(cookiePrefix)) {
      response.cookies.delete(cookie.name);
    }
  }
};

const getRewritePath = (urlPath: string[]) => {
  // const { NEXT_PUBLIC_AREA } = process.env;
  // const vendor = NEXT_PUBLIC_AREA === 'default' ? 'b2c' : 'b2b';

  /**
   * Url path empty means,
   * base page
   */
  if (!urlPath.length) {
    return `/guest`;
  }

  return urlPath.map((x, i) => (i === 0 ? `guest/${x}` : x)).join("/");
};

export default async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;
    const urlPath = url.pathname.split("/").filter((x: string) => x);

    /**
     * Is redirected to token error page if Auth token in cookie is not valid
     * Removes all the token from cookie
     */
    if (pathname === "/token-error") {
      const redirect_url = url.searchParams.get("redirect_url");

      if (redirect_url) {
        url.pathname = redirect_url;

        url.searchParams.delete("redirect_url");

        const response = NextResponse.redirect(url);

        response.headers.set("x-pathname", url.pathname);

        removeNextAuthTokens(req, response);
        response.cookies.delete(AUTH_TOKEN);
        response.cookies.delete(ID_TOKEN);

        return response;
      }

      //Redirect to "/" if redirect url is not present
      url.pathname = "/";
      const response = NextResponse.redirect(url);
      return response;
    }

    const { channel = "", store = "" } = getChannelStore();

    if (!channel || !store) {
      throw "";
    }

    url.pathname = getRewritePath(urlPath);

    const resp = NextResponse.rewrite(url);

    /**
     * set actual pathname to headers can be access in server side
     * headers().get("x-pathname")
     */
    resp.headers.set("x-pathname", pathname);

    return resp;
  } catch (e: any) {
    if (
      typeof e === "object" &&
      "status" in e &&
      [502, 503].includes(e.status)
    ) {
      return NextResponse.redirect(new URL("/503", req.url));
    }
    const res = NextResponse.rewrite(new URL("/404", req.url));

    return res;
  }
}

// export const config = {
//   matcher: '/((?!api|static|.*\\..*|_next).*)',
// };

export const config = {
  matcher: "/((?!api|auth/signin|static|.*\\..*|_next).*)",
};