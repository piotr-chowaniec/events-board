import React from 'react';

type ImageComponentType = {
  imgSrc: string;
  className?: string;
};

const ImageComponent = ({ imgSrc, className }: ImageComponentType) => (
  <img src={imgSrc} alt="" className={className} />
);

export default ImageComponent;
