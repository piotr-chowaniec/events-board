import React from 'react';

import { UserType } from './types';

const DeleteUser = (user: UserType): JSX.Element => (
  <>
    <h5>Be careful.</h5>
    <p>
      Are you sure you want to remove
      <span className="fw-bold"> {user?.email} </span>
      account?{'\n'}
      Account removal can&apos;t be undone.
    </p>
  </>
);

export default DeleteUser;
