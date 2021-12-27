const twoHours = '2h';

const config = {
  applicationName: 'events-board',
  port: process.env.PORT || 7000,
  isProductionEnvironment: process.env.NODE_ENV === 'production',
  loggingLevel: process.env.LOGGING_LEVEL || 'DEBUG',

  authentication: {
    isPublicKey: process.env.PUBLIC_KEY || 'isPublic',
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'access_token',
    authorizationKey: process.env.AUTHORIZATION_KEY || 'authorization',
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'refresh_token',
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'NotSoSecretKey',
    jwtExpireIn: process.env.JWT_EXPIRE_IN
      ? process.env.JWT_EXPIRE_IN
      : twoHours,
  },
};

export default config;
