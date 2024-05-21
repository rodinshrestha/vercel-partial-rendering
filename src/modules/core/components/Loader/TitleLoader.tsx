import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const TitleLoader = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={333}
      height={50}
      viewBox="0 0 333 40"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="333" height="40" />
    </ContentLoader>
  );
};
export default TitleLoader;
