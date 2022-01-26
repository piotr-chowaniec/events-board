import eventDefaultImage from '../images/defaultEventImage.jpeg';
import userDefaultImage from '../images/defaultProfileImage.jpeg';
import { ImageType } from '../../shared/types';

type GetSpecificImageType = {
  image?: ImageType | null;
  width?: number;
};

type GetImageSrcType = GetSpecificImageType & {
  defaultImage: string;
};

const getImageSrc = ({
  image,
  width = 2000,
  defaultImage,
}: GetImageSrcType): string => {
  const imageSrc =
    image?.cloudName &&
    image?.publicId &&
    `https://res.cloudinary.com/${image.cloudName}/image/upload/w_${width}/v${image.version}/${image.publicId}.${image.format}`;

  const previewSrc = typeof image === 'string' && image;

  return previewSrc || imageSrc || defaultImage;
};

export const getEventImageSrc = ({ image, width }: GetSpecificImageType) =>
  getImageSrc({
    image,
    width,
    defaultImage: eventDefaultImage,
  });

export const getUserImageSrc = ({ image, width }: GetSpecificImageType) =>
  getImageSrc({
    image,
    width,
    defaultImage: userDefaultImage,
  });

export default getImageSrc;
