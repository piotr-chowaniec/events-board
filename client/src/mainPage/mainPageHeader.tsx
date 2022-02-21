import React from 'react';

import styles from './mainPage.module.scss';

const MainPageHeader = () => {
  return (
    <div
      className={`default-background mx-1 ${styles.showcase}`}
      data-testid="main-page-header"
    >
      <div className={styles.header}>
        <h3>EVENTS BOARD</h3>
        <h2>YOUR EVENTS IN ONE PLACE</h2>
        <hr />
        <span className="lead text-muted">
          <em>Create, participate, share. All you ever needed.</em>
        </span>
      </div>
    </div>
  );
};

export default MainPageHeader;
