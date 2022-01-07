import React from 'react';
import { PulseLoader } from 'react-spinners';

import './loading.scss';

interface LoadingParams {
  isLoading: boolean;
  loadingMessage?: string;
}

const Loading = ({
  isLoading = false,
  loadingMessage = 'Loading...',
}: LoadingParams): JSX.Element | null => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading">
      <div className="text-center">
        <PulseLoader size={20} color={'#2d2e2e'} loading />
        <div className="mt-4">
          <code className="text-muted">{loadingMessage}</code>
        </div>
      </div>
    </div>
  );
};

export default Loading;
