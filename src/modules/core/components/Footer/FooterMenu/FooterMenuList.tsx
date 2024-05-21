'use client';

import React from 'react';

import { NavigationItem } from '@/core/types/navigation-type';
import Link from '@/core/components/Link';
import { navigationLinkGenerator } from '@/core/utils/format';

type Props = {
  item: NavigationItem;
};

const FooterMenuList = ({ item }: Props) => {
  return (
    <li>
      <Link
        href={navigationLinkGenerator(item)}
        asSelfLink={item.type === 'custom'}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default FooterMenuList;
