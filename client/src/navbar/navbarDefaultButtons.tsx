import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { useAppSelector } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import routes from '../routes';

const NavbarDefaultButtons = (): JSX.Element => {
  const { id: userId } = useAppSelector(userDataSelector);

  return (
    <>
      <Nav.Item>
        <Link
          to={routes.USER_EVENTS.compileRoute({
            userId,
          })}
          className="nav-link"
        >
          Your Events
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Item>
          <Link
            to={routes.PARTICIPANT_EVENTS.compileRoute({
              userId,
            })}
            className="nav-link"
          >
            You Participate
          </Link>
        </Nav.Item>
      </Nav.Item>
    </>
  );
};

export default NavbarDefaultButtons;
