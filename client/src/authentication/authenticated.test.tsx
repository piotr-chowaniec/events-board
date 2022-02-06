import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';

import routes from '../routes';
import rootReducer from '../store/rootReducer';

import Authenticated from './authenticated';

const protectedPath = '/protected';
const ComponentToRender = () => <div>PROTECTED CONTENT</div>;

const render = (component: JSX.Element, preloadedState?: any) => {
  function Wrapper({ children }: { children: React.ReactChild }) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });

    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[protectedPath]}>
          <Routes>
            <Route path={routes.MAIN.PATH} element={<div>MAIN</div>} />
            <Route path={routes.LOGIN.PATH} element={<div>LOGIN</div>} />
            {children}
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  return rtlRender(component, { wrapper: Wrapper });
};

describe('Authenticated', () => {
  describe('isAuthenticated', () => {
    it('should redirect to login page when user is not logged in', () => {
      // when
      const { queryByText } = render(
        <Route element={<Authenticated />}>
          <Route path={protectedPath} element={<ComponentToRender />} />
        </Route>,
      );

      // then
      const expectedComponent = queryByText('PROTECTED CONTENT');
      expect(expectedComponent).toEqual(null);

      const renderedComponent = queryByText('LOGIN');
      expect(renderedComponent).not.toEqual(null);
    });

    it('should show protected content when user is logged in', () => {
      // when
      const reduxState = { user: { user: { id: 'user-id' } } };

      // when
      const { queryByText } = render(
        <Route element={<Authenticated />}>
          <Route path={protectedPath} element={<ComponentToRender />} />
        </Route>,
        reduxState,
      );

      // then
      const renderedComponent = queryByText('PROTECTED CONTENT');
      expect(renderedComponent).not.toEqual(null);
    });
  });

  describe('isAdmin', () => {
    it('should redirect to login page when user is not logged in', () => {
      // when
      const { queryByText } = render(
        <Route element={<Authenticated isAdminRoute />}>
          <Route path={protectedPath} element={<ComponentToRender />} />
        </Route>,
      );

      // then
      const expectedComponent = queryByText('PROTECTED CONTENT');
      expect(expectedComponent).toEqual(null);

      const renderedComponent = queryByText('LOGIN');
      expect(renderedComponent).not.toEqual(null);
    });

    it('should redirect to login page when user is logged in but has no admin rights', () => {
      // when
      const reduxState = { user: { user: { id: 'user-id' } } };

      // when
      const { queryByText } = render(
        <Route element={<Authenticated isAdminRoute />}>
          <Route path={protectedPath} element={<ComponentToRender />} />
        </Route>,
        reduxState,
      );

      // then
      const expectedComponent = queryByText('PROTECTED CONTENT');
      expect(expectedComponent).toEqual(null);

      const renderedComponent = queryByText('LOGIN');
      expect(renderedComponent).not.toEqual(null);
    });

    it('should show protected content for logged in admin user', () => {
      // when
      const reduxState = { user: { user: { id: 'user-id', role: 'ADMIN' } } };

      // when
      const { queryByText } = render(
        <Route element={<Authenticated />}>
          <Route path={protectedPath} element={<ComponentToRender />} />
        </Route>,
        reduxState,
      );

      // then
      const renderedComponent = queryByText('PROTECTED CONTENT');
      expect(renderedComponent).not.toEqual(null);
    });
  });
});
