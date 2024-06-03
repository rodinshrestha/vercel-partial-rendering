import React from "react";

import { cookies } from "next/headers";

const SsrPage = () => {
  const cookie = cookies();
  return <div>{JSON.stringify(cookie.getAll())}</div>;
};

export default SsrPage;
