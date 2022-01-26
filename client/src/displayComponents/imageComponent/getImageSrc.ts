type GetImageSrcType = {
  image?: {
    cloudName: string;
    publicId: string;
    version: number;
    format: string;
  } | null;
  width: number;
  defaultImage: string;
};

const getImageSrc = ({ image, width, defaultImage }: GetImageSrcType) => {
  const imageSrc =
    image?.cloudName &&
    image?.publicId &&
    `https://res.cloudinary.com/${image.cloudName}/image/upload/w_${width}/v${image.version}/${image.publicId}.${image.format}`;

  const previewSrc = typeof image === 'string' && image;

  return previewSrc || imageSrc || defaultImage;
};

export default getImageSrc;
