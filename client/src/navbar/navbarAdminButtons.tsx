import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import routes from '../routes';

const NavbarAdminButtons = (): JSX.Element => (
  <NavDropdown title="Admin Panel">
    <NavDropdown.Item>
      <Link to={routes.ALL_EVENTS.PATH} className="nav-link">
        Events
      </Link>
    </NavDropdown.Item>
    <NavDropdown.Item>
      <Link to={routes.ALL_USERS.PATH} className="nav-link">
        Users
      </Link>
    </NavDropdown.Item>
    <NavDropdown.Item>
      <Link to={routes.ALL_PARTICIPANTS.PATH} className="nav-link">
        Participants
      </Link>
    </NavDropdown.Item>
  </NavDropdown>
);

export default NavbarAdminButtons;
