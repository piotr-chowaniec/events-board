import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import routes from '../routes';
import FaIcon from '../displayComponents/faIcon/faIcon.component';

type NavbarAuthenticatedParams = {
  handleUserLogout: () => void;
  userDisplayName: string | null;
};

const NavbarAuthenticated = ({
  handleUserLogout,
  userDisplayName,
}: NavbarAuthenticatedParams): JSX.Element => (
  <NavDropdown
    id="navbarAuthenticated"
    title={`Logged In As: ${userDisplayName}`}
  >
    <Link className="dropdown-item" to={routes.MAIN.PATH}>
      <span className="pr-3">
        <FaIcon icon="user" />
      </span>
      Profile
    </Link>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={handleUserLogout}>
      <span className="pr-3">
        <FaIcon icon="sign-out-alt" />
      </span>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
);

export default NavbarAuthenticated;
