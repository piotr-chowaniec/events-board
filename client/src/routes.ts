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
  PARTICIPANT_EVENTS: {
    PATH: '/events/participant/:userId',
    compileRoute: (params: { userId: string }) =>
      generatePath('/events/participant/:userId', params),
  },
};

const adminRoutes = {
  ALL_EVENTS: {
    PATH: '/events',
  },
  ALL_USERS: {
    PATH: '/users',
  },
  ALL_PARTICIPANTS: {
    PATH: '/participants',
  },
  PARTICIPANTS: {
    PATH: '/participants/:eventId',
    compileRoute: (params: { eventId: string }) =>
      generatePath('/participants/:eventId', params),
  },
};

const appRoutes = {
  ...authRoutes,
  ...userRoutes,
  ...routes,
  ...adminRoutes,
};

export default appRoutes;
