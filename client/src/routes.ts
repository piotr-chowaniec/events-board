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
};

const appRoutes = {
  ...authRoutes,
  ...userRoutes,
  ...routes,
};

export default appRoutes;
