import React from 'react';

import './warning.scss';

interface WarningParams {
  isWarning: boolean;
  warningMessage?: string;
}

const Warning = ({
  isWarning = false,
  warningMessage = 'Sorry. Something went wrong',
}: WarningParams): JSX.Element | null => {
  if (!isWarning) {
    return null;
  }

  return (
    <div className="warning">
      <code className="text-muted">{warningMessage}</code>
    </div>
  );
};

export default Warning;
