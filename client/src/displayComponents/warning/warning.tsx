import React from 'react';

import useDelay from '../../shared/hooks/useDelay.hook';

import styles from './warning.module.scss';

interface WarningParams {
  isWarning: boolean;
  warningMessage?: string;
  delay?: number;
}

const Warning = ({
  isWarning = false,
  warningMessage = 'Sorry. Something went wrong',
  delay = 50,
}: WarningParams): JSX.Element | null => {
  const { show } = useDelay({ run: isWarning, delay });

  if (!show) {
    return null;
  }

  return (
    <div className={styles.warning}>
      <code className="text-muted">{warningMessage}</code>
    </div>
  );
};

export default Warning;
