import React from 'react';

import ImageWithFallback from '@/core/components/ImageWithFallback';

type Props = {
  src: string | null;
  imageObjectFit: 'cover' | 'contain' | 'fill';
};

const BackgroundImage = ({ src, imageObjectFit }: Props) => {
  if (src === null) {
    throw new Error('Image url cannot be null');
  }
  return (
    <ImageWithFallback
      src={src}
      fill
      className="object-cover"
      alt="Background Image"
      priority
      style={{ objectFit: imageObjectFit }}
    />
  );
};

export default BackgroundImage;
