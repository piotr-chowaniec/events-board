import React from 'react';

import './mainPage.scss';

const MainPage = () => {
  return (
    <div className="container">
      <section className="default-background mx-1">
        <div className="showcase d-flex justify-content-center align-items-center">
          <div className="header">
            <h3>EVENTS BOARD</h3>
            <h2>YOUR EVENTS IN ONE PLACE</h2>
            <hr />
            <span className="lead text-muted">
              <em>Create, participate, share. All you ever needed.</em>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
