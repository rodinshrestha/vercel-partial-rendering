'use client';

import React from 'react';

import type { SectionSettings } from '@/builder/types/builder.types';

import { BackgroundContent } from './helpers/BackgroundContent';

type Props = {
  sectionSetting: SectionSettings;
};

const BackgroundContentPage = ({ sectionSetting }: Props): JSX.Element => {
  return <>{BackgroundContent({ section_settings: sectionSetting })}</>;
};

export default BackgroundContentPage;
