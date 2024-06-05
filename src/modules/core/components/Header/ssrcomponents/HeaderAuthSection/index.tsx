import "server-only";

import React, { Suspense } from "react";

import { fetchProfile } from "@/auth/services/auth-service";

import HeaderAuthMenu from "../../components/HeaderAuthMenu";

const HeaderAuthSection = async () => {
  const user = await fetchProfile();
  return (
    <Suspense>
      <HeaderAuthMenu user={user.data || null} />
    </Suspense>
  );
};

export default HeaderAuthSection;
