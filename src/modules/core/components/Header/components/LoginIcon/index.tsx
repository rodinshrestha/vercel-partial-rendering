"use client";
import React from "react";

import { useAuth } from "@/auth/hooks/useAuth";
import useTranslations from "@/core/hooks/useTranslations";
import { setCallBackURL } from "@/core/utils/url";
import Link from "@/core/components/Link";
import { IconUser } from "@/core/components/Icons";

type Props = {
  children?: React.ReactNode;
};

const LoginIcon = ({ children }: Props) => {
  const { user } = useAuth();
  const { _t } = useTranslations();

  if (user) {
    return (
      <Link href="/account/my-profile">
        {children ? (
          children
        ) : (
          <>
            <span className="user user-name icon">
              {_t("my_account", "My Account")}
            </span>
            <IconUser className="menu-svg" size={16} />
          </>
        )}
      </Link>
    );
  }

  return (
    <div className="log-btn">
      <Link href="/login" onClick={() => setCallBackURL()}>
        <span className="user-name">{_t("log_in", "Log In")}</span>
        <IconUser className="menu-svg" size={16} />
      </Link>
    </div>
  );
};

export default LoginIcon;
