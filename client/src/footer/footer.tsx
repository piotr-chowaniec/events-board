import React from 'react';

import FaIcon from '../displayComponents/faIcon/faIcon';

const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center">
      <span>© 2022 Piotr Chowaniec</span>
      <a
        href="https://github.com/piotr-chowaniec"
        target="_blank"
        rel="noreferrer"
      >
        <FaIcon prefix="fab" icon="github" size={16} />
      </a>
      <a
        href="https://www.linkedin.com/in/chowaniec-piotr"
        target="_blank"
        rel="noreferrer"
      >
        <FaIcon prefix="fab" icon="linkedin" size={16} />
      </a>
    </div>
  );
};

export default Footer;
