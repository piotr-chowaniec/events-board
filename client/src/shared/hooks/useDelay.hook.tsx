import { useState, useEffect } from 'react';

export interface useDelayParams {
  run: boolean;
  delay?: number;
}

const useDelay = ({ run = false, delay = 50 }: useDelayParams) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (run) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }

    setShow(false);
  }, [run, delay]);

  return {
    show,
  };
};

export default useDelay;
