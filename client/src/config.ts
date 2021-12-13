const config = {
  QUERY_CONFIG: {
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 60, // 1h in milliseconds
        cacheTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  },
};

export default config;
