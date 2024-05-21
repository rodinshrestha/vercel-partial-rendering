import Lightbox from 'react-image-lightbox';

type Props = {
  images: Array<{ url: string; original: string }>;
  setIndex: (index: number) => void;
  index: number;
};
const ImageLightbox = ({ images, setIndex, index }: Props) => {
  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          mainSrcThumbnail={currentImage.url}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.url}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.url}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
};

export default ImageLightbox;
