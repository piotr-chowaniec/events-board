import React, { useCallback } from 'react';
import { useMutation } from 'react-query';

import { httpGet } from './services/fetchService';

export const requestApiData = async (): Promise<{ message: string }> =>
  await httpGet({
    route: '/events',
    errorMessage: 'Something went wrong',
  });

const App: React.FC = () => {
  const { mutate } = useMutation(requestApiData);

  const onButtonClick = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div id="events-board">
      <section id="main-container">Events Board</section>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
};

export default App;
