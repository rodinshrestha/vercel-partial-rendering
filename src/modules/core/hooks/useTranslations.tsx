'use client';

import React from 'react';

import { TranslationContext } from '@/core/providers/TranslationProvider';

const useTranslations = () => React.useContext(TranslationContext);
export default useTranslations;
