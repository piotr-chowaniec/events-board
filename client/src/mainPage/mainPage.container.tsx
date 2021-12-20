import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Container } from 'react-bootstrap';

import { httpGet } from '../services/fetchService';

import './mainPage.scss';

export const requestApiData = async (): Promise<{ message: string }> =>
  await httpGet({
    route: '/events',
    errorMessage: 'Something went wrong',
  });

const MainPage = () => {
  const { mutate } = useMutation(requestApiData);

  const onButtonClick = useCallback(() => {
    mutate();
  }, [mutate]);
  return (
    <div className="container">
      <section className="default-background mx-1">
        <div className="showcase d-flex justify-content-center align-items-center">
          <div className="header">
            <h3>EVENTS BOARD</h3>
            <h2>YOUR EVENTS IN ONE PLACE</h2>
            <hr />
            <span className="lead text-muted">
              <em>Create, participate, share. All you ever needed.</em>
            </span>
          </div>
        </div>
      </section>
      <section>
        <Container>
          Events Board
          <button onClick={onButtonClick}>Click me</button>
        </Container>
      </section>
    </div>
  );
};

export default MainPage;
