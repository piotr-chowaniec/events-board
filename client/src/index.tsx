import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { store } from './store';
import App from './App';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

library.add(faUser, faEnvelope, faLock, faSignOutAlt, faGithub, faLinkedin);

const queryClient = new QueryClient(config.QUERY_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
