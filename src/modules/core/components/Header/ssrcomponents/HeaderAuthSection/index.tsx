import "server-only";

import React from "react";

import { fetchProfile } from "@/auth/services/auth-service";

import HeaderAuthMenu from "../../components/HeaderAuthMenu";

const HeaderAuthSection = async () => {
  const user = await fetchProfile();
  return <HeaderAuthMenu user={user.data || null} />;
};

export default HeaderAuthSection;
