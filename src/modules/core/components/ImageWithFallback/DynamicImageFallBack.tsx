'use client';
import React from 'react';

import Image, { ImageProps, StaticImageData } from 'next/image';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { baseImageLoader } from '.';

interface IProps extends ImageProps {
  isBlur?: boolean;
}

const DynamicImageFallBack = ({ src, alt, isBlur, ...rest }: IProps) => {
  const [imageSrc, setImageSrc] = React.useState<string | StaticImport>(src);

  React.useEffect(() => {
    let source: StaticImageData | string = '/images/default.png';

    if (src) {
      if (typeof src === 'string') source = src;
      else if (typeof src === 'object') if ('blurDataURL' in src) source = src;
    }

    setImageSrc(source);
  }, [src]);

  return (
    <Image
      className={clsx(rest.className)}
      src={imageSrc || '/images/default.png'}
      alt={alt || 'dogman'}
      placeholder={isBlur ? 'blur' : 'empty'}
      quality={100}
      sizes="100%"
      onError={() => {
        setImageSrc('/images/default.png');
      }}
      loader={baseImageLoader(
        3000,
        typeof src === 'string' && src.startsWith('http')
      )}
      fetchPriority="high"
      {...rest}
    />
  );
};

export default DynamicImageFallBack;
