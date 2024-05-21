'use client';

import React from 'react';

import { ResolverContext } from '@/core/providers/ResolverProvider';

const useResolver = () => React.useContext(ResolverContext);
export default useResolver;
