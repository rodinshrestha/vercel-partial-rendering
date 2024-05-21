import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { AUTH_TOKEN } from "@/auth/constants/auth.constant";
import FavouriteModule from "@/wishlist/components/Favourite";

export async function generateStaticParams() {
  return [];
}
export async function generateMetadata() {
  return {
    title: "Favourite Page",
    description: "jackson Favourite Page",
  };
}

const Page = () => {
  const cookie = cookies();
  const authToken = cookie.get(AUTH_TOKEN)?.value || "";

  if (!authToken) {
    return notFound();
  }

  return <FavouriteModule />;
};
export default Page;
