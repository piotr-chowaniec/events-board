import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faEnvelope,
  faLock,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import App from './App';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

library.add(faUser, faEnvelope, faLock, faSignOutAlt);

const queryClient = new QueryClient(config.QUERY_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
