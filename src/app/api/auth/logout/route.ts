import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN, ID_TOKEN } from "@/auth/constants/auth.constant";

// const AUTH_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN;
// const ID_TOKEN = process.env.NEXT_PUBLIC_ID_TOKEN;

export const deleteCookie = (cname: string) => {
  cookies().set(cname, "", {
    expires: new Date(0),
  });
};

export async function POST(req: NextRequest) {
  //TODO: Waiting reply from Zitadel
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
      deleteCookie(cookie.name);
    }
  }

  deleteCookie(AUTH_TOKEN);
  deleteCookie(ID_TOKEN);
  // const idToken = req.cookies.get(ID_TOKEN);

  // if (idToken) {
  //   // this will log out the user on Keycloak side
  //   const url = `${OIDC_LOGOUT_URL}?id_token_hint=${idToken}&client_id=${process.env.NEXT_PUBLIC_OIDC_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/se/en`;

  //   try {
  //     const resp = await fetch(url, { method: 'GET' }).then(() => {
  //       deleteHttpOnlyCookie(AUTH_TOKEN);
  //       deleteHttpOnlyCookie(ID_TOKEN);
  //     });

  //     console.log('success', resp);
  //   } catch (err) {
  //     console.log('error');
  //     console.error(err);

  //     return new Response({ status: 500 } as any);
  //   }
  // }
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
