'use client';

import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { ProfileUser } from '../types/user.types';

import ProfileProvider from './ProfileProvider';

const AuthProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProfileUser | null;
}) => {
  return (
    <SessionProvider refetchInterval={30}>
      <ProfileProvider data={data}>{children}</ProfileProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
