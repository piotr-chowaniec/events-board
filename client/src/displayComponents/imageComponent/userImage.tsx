import React from 'react';

import defaultImage from '../images/defaultProfileImage.jpeg';

import ImageComponent from './imageComponent';
import getImgSrc from './getImageSrc';

type UserImageType = {
  image?: {
    cloudName: string;
    publicId: string;
    version: number;
    format: string;
  } | null;
  width: number;
  className?: string;
};

const UserImage = ({ image, width, className }: UserImageType) => {
  const imgSrc = getImgSrc({ image, width, defaultImage });

  return <ImageComponent imgSrc={imgSrc} className={className} />;
};

export default UserImage;
