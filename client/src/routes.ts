import { compile } from 'path-to-regexp';

const authRoutes = {
  LOGIN: {
    PATH: '/login',
  },
  REGISTER: {
    PATH: '/register',
  },
  ACCESS_DENIED: {
    PATH: '/access-denied',
  },
};

const userRoutes = {
  PROFILE: {
    PATH: '/user',
  },
  PASSWORD: {
    PATH: '/user/password',
  },
};

const routes = {
  MAIN: {
    PATH: '/',
  },
  EVENT: {
    PATH: '/events/:eventId',
    compileRoute: compile('/events/:eventId'),
  },
  USER_EVENTS: {
    PATH: '/events/user/:userId',
    compileRoute: compile('/events/user/:userId'),
  },
};

const appRoutes = {
  ...authRoutes,
  ...userRoutes,
  ...routes,
};

export default appRoutes;
