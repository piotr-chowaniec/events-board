import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export type FaIconPropsType = {
  icon: IconName;
  prefix?: IconPrefix;
  className?: string;
  size?: number;
};

const FaIcon = ({
  icon,
  prefix = 'fas',
  className = '',
  size = 20,
  ...rest
}: FaIconPropsType): JSX.Element => (
  <FontAwesomeIcon
    className={`${className} icon-size-${size}`}
    icon={[prefix, icon]}
    {...rest}
  />
);

export default FaIcon;
