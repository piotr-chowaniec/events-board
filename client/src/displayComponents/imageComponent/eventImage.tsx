import React from 'react';

import { ImageType } from '../../shared/types';

import ImageComponent from './imageComponent';
import { getEventImageSrc } from './getImageSrc';

type EventImageType = {
  image?: ImageType | null;
  width?: number;
  className?: string;
};

const EventImage = ({ image, width = 500, className }: EventImageType) => {
  const imgSrc = getEventImageSrc({ image, width });

  return <ImageComponent imgSrc={imgSrc} className={className} />;
};

export default EventImage;
