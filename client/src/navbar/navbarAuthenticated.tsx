import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import routes from '../routes';
import FaIcon from '../displayComponents/faIcon/faIcon';

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
    align="end"
    data-testid="navbar-authenticated-dropdown-button"
  >
    <div data-testid="navbar-authenticated-dropdown">
      <Link className="dropdown-item" to={routes.PROFILE.PATH}>
        <span className="pe-3">
          <FaIcon icon="user" />
        </span>
        Profile
      </Link>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleUserLogout}>
        <span className="pe-3">
          <FaIcon icon="sign-out-alt" />
        </span>
        Logout
      </NavDropdown.Item>
    </div>
  </NavDropdown>
);

export default NavbarAuthenticated;
