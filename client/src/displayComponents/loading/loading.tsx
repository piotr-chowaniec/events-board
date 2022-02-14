import React from 'react';
import { PulseLoader } from 'react-spinners';

import useDelay from '../../shared/hooks/useDelay.hook';

import styles from './loading.module.scss';

interface LoadingParams {
  isLoading: boolean;
  loadingMessage?: string;
  delay?: number;
}

const Loading = ({
  isLoading = false,
  loadingMessage = 'Loading...',
  delay = 50,
}: LoadingParams): JSX.Element | null => {
  const { show } = useDelay({ run: isLoading, delay });

  if (!show) {
    return null;
  }

  return (
    <div className={styles.loading}>
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
