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

const routes = {
  MAIN: {
    PATH: '/',
  },
};

const appRoutes = {
  ...authRoutes,
  ...routes,
};

export default appRoutes;
