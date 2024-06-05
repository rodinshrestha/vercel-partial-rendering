import React from "react";

import CartModule from "@/cart/index";

export async function generateMetadata() {
  return {
    title: "Cart Page",
    description: "Jacson Cart Page",
  };
}

const Page = () => {
  return <CartModule />;
};

export default Page;
