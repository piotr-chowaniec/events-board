import React from 'react';

import Loading from '../loading/loading';

import './fullPageCard.scss';

type FullPageCardParams = {
  children?: React.ReactChild | React.ReactChild[];
  isLoading?: boolean;
  loadingMessage?: string;
};

const FullPageCard = ({
  children,
  isLoading = false,
  loadingMessage,
}: FullPageCardParams): JSX.Element => (
  <div className="full-height default-background d-flex align-items-center">
    <div className="overlay" />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center">
            <div className="card-body full-page-card">
              <Loading isLoading={isLoading} loadingMessage={loadingMessage} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FullPageCard;