import React from 'react';

import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ProductLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={260}
    height={370}
    viewBox="0 0 260 370"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="61" y="273" rx="8" ry="8" width="194" height="24" />
    <rect x="0" y="273" rx="8" ry="8" width="54" height="24" />
    <rect x="0" y="231" rx="8" ry="8" width="260" height="26" />
    <rect x="0" y="336" rx="19" ry="24" width="260" height="34" />
    <path d="M 0 15 C 0 6.716 6.716 0 15 0 h 230 c 8.284 0 15 6.716 15 15 v 200 H 0 V 15 z" />
  </ContentLoader>
);

export default ProductLoader;
