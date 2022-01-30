import React from 'react';

import { ImageType } from '../../shared/types';

import ImageComponent from './imageComponent';
import { getUserImageSrc } from './getImageSrc';

type UserImageType = {
  image?: ImageType | null;
  width?: number;
  className?: string;
};

const UserImage = ({ image, width = 250, className }: UserImageType) => {
  const imgSrc = getUserImageSrc({ image, width });

  return <ImageComponent imgSrc={imgSrc} className={className} />;
};

export default UserImage;
