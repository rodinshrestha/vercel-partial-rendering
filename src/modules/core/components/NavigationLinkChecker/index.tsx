import React from 'react';

import { NavigationItem } from '@/core/types/navigation-type';
import { navigationLinkGenerator } from '@/core/utils/format';

import Link from '../Link';

type Props = {
  children: React.ReactNode;
  data: NavigationItem;
};

const NavigationLinkChecker = ({ children, data }: Props) => {
  if (!data.type) {
    return children;
  }

  return (
    <Link
      href={navigationLinkGenerator(data)}
      style={{ display: 'inline-block' }}
    >
      {children}
    </Link>
  );
};

export default NavigationLinkChecker;
