import { generatePath } from 'react-router-dom';

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
    compileRoute: (params: { eventId: string }) =>
      generatePath('/events/:eventId', params),
  },
  USER_EVENTS: {
    PATH: '/events/user/:userId',
    compileRoute: (params: { userId: string }) =>
      generatePath('/events/user/:userId', params),
  },
};

const appRoutes = {
  ...authRoutes,
  ...userRoutes,
  ...routes,
};

export default appRoutes;
