"use client";
import React from "react";

import { ProfileUser } from "@/auth/types/user.types";
import { LoadingStates } from "@/core/types/loading.types";
import { IDLE, RESOLVED } from "@/core/constants/states";
import useHeaders from "@/core/hooks/useHeaders";
import { publicAxios } from "@/core/utils/axios";

type ContextTypes = {
  user: ProfileUser | null;
  // authenticate?: () => void;
  status: string;
  unAuthenticate: () => Promise<unknown> | void;
  setStatus: React.Dispatch<React.SetStateAction<LoadingStates>>;
  setUser: React.Dispatch<React.SetStateAction<ProfileUser | null>>;
};

const initialValues: ContextTypes = {
  user: null,
  status: IDLE,
  setUser: () => {
    //
  },
  unAuthenticate: () => {
    //
    return Promise.resolve({});
  },
  setStatus: () => {
    //
  },
};

export const ProfileContext = React.createContext(initialValues);

interface Props {
  children: React.ReactNode;
  data: ProfileUser | null;
}

//TODO: Fix logout logic later after zitadel replies
async function clearAllSession() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (err) {
    console.error(err);
  }
}

const ProfileProvider = ({ children, data }: Props) => {
  const [user, setUser] = React.useState<ProfileUser | null>(data);

  const { clientHeaders } = useHeaders();

  const unAuthenticate = React.useCallback(() => {
    publicAxios("/auth/logout", {
      headers: {
        Authorization: `Bearer ${clientHeaders.Authorization}`,
      },
    }).then(() => clearAllSession().then(() => (window.location.href = "/")));
  }, [clientHeaders]);

  return (
    <ProfileContext.Provider
      value={{
        user,
        unAuthenticate,
        setUser,
        status: RESOLVED,
        setStatus: () => {
          // TODO remove it if not used
        },
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
