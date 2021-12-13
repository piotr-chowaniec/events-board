const config = {
  applicationName: 'events-board',
  port: process.env.PORT || 7000,
  isProductionEnvironment: process.env.NODE_ENV === 'production',
  loggingLevel: process.env.LOGGING_LEVEL || 'DEBUG',
};

export default config;
