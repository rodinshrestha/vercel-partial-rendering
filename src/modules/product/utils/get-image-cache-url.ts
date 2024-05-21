export const getImageCacheUrl = (imgURL: string) => {
  const IMAGE_PROXY = process.env.NEXT_PUBLIC_IMAGE_PROXY;

  if (!imgURL) return '';

  if (!IMAGE_PROXY) throw new Error('Please set image proxy in .env file');

  return `${IMAGE_PROXY}/preset:sharp/resize:fit:3000:0:0/width:3000/quality:100/gravity:sm/plain/${imgURL}`;
};
