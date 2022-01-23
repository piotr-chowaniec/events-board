import React, { useEffect, useState } from 'react';

import './warning.scss';

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isWarning) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }

    setShow(false);
  }, [isWarning, delay]);

  if (!show) {
    return null;
  }

  return (
    <div className="warning">
      <code className="text-muted">{warningMessage}</code>
    </div>
  );
};

export default Warning;
