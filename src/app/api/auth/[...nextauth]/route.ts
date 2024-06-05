import NextAuth from "next-auth";
import ZitadelProvider from "next-auth/providers/zitadel";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

import { setHttpOnlyCookie } from "@/core/utils/server-cookie";
import { AUTH_TOKEN, ID_TOKEN } from "@/auth/constants/auth.constant";

const OIDC_TOKEN_EXPIRY_THRESHOLD = process.env
  .NEXT_PUBLIC_TOKEN_EXPIRY_THRESHOLD as string;
const OIDC_CLIENT_ID = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID as string;
const OIDC_CLIENT_SECRET = process.env.NEXT_PUBLIC_OIDC_CLIENT_SECRET as string;
const OIDC_REFRESH_TOKEN_URL = process.env
  .NEXT_PUBLIC_OIDC_REFRESH_TOKEN_URL as string;
const OIDC_ISSUER = process.env.NEXT_PUBLIC_OIDC_ISSUER as string;

// const AUTH_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN as string;
// const ID_TOKEN = process.env.NEXT_PUBLIC_ID_TOKEN as string;

async function refreshAccessToken(token: JWT) {
  const resp = await fetch(OIDC_REFRESH_TOKEN_URL, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: OIDC_CLIENT_ID,
      client_secret: OIDC_CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token as string,
    }),
    method: "POST",
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  setHttpOnlyCookie(AUTH_TOKEN, refreshToken.access_token);

  setHttpOnlyCookie(ID_TOKEN, refreshToken.id_token);

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

const handler = NextAuth({
  providers: [
    ZitadelProvider({
      clientId: OIDC_CLIENT_ID as string,
      clientSecret: OIDC_CLIENT_SECRET as string,
      issuer: OIDC_ISSUER,
      authorization: {
        params: {
          scope: `openid email profile phone offline_access x-zitadel-login-client urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:org:id:${process.env.NEXT_PUBLIC_ZITADEL_ORG_ID} urn:zitadel:iam:user:metadata`,
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sf/customer/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const resp = await response.json();

          if (!response.ok) {
            if (typeof resp.message === "string") throw resp.message;
            else {
              const error = Object.keys(resp.message).map(
                (el) => resp.message[el]
              );
              throw error;
            }
          }

          return { ...resp.data, isCredential: true };
        } catch (err) {
          throw new Error(err as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (user && user.access_token) {
        setHttpOnlyCookie(AUTH_TOKEN, user.access_token);
      }

      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.user = user;
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.account = account;

        setHttpOnlyCookie(AUTH_TOKEN, account.access_token);

        setHttpOnlyCookie(ID_TOKEN, account.id_token);
      } else if (
        nowTimeStamp <
        (token.expires_at as number) - parseFloat(OIDC_TOKEN_EXPIRY_THRESHOLD)
      ) {
        // token has not expired yet, return it
        return token;
      } else if (token.refresh_token) {
        // token is expired, try to refresh it
        console.log("Token will expire after 2 minutes. Refreshing token");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
