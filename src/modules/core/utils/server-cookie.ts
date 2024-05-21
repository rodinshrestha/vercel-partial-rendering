import { cookies } from 'next/headers';

/**Sets HTTP only cookie server side */
export const setHttpOnlyCookie = (cname: string, cvalue?: string) => {
  if (!cvalue) return;
  cookies().set(cname, cvalue, {
    httpOnly: true,
    sameSite: 'lax',
  });
};
