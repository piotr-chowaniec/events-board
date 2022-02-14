import React from 'react';

import { ImageType } from '../../shared/types';

import ImageComponent from './imageComponent';
import { getUserImageSrc } from './getImageSrc';
import styles from './styles.module.scss';

type UserImageType = {
  image?: ImageType | null;
  width?: number;
  className?: string;
};

const UserImage = ({ image, width = 250, className }: UserImageType) => {
  const imgSrc = getUserImageSrc({ image, width });
  const cn = className ? `${className} ${styles.userImage}` : styles.userImage;

  return <ImageComponent imgSrc={imgSrc} className={cn} />;
};

export default UserImage;
