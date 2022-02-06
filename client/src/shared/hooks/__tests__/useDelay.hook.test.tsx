import { renderHook, act } from '@testing-library/react-hooks';

import useDelay, { useDelayParams } from '../useDelay.hook';

describe('useDelay()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set to true after run true and defined delay', () => {
    // given
    const initialProps = {
      run: false,
      delay: 100,
    };

    // when
    const { result, rerender } = renderHook(
      (props: useDelayParams) => useDelay(props),
      { initialProps },
    );

    // then
    expect(result.current.show).toEqual(false);

    act(() => {
      // when
      rerender({ ...initialProps, run: true });
      jest.advanceTimersByTime(100);

      // then
      expect(result.current.show).toEqual(true);
    });
  });

  it('should reset timer and show when run down during delay count', () => {
    // given
    const initialProps = {
      run: false,
      delay: 100,
    };

    // when
    const { result, rerender } = renderHook(
      (props: useDelayParams) => useDelay(props),
      { initialProps },
    );
    expect(result.current.show).toEqual(false);

    act(() => {
      // when
      // set run=true, timer start
      rerender({ ...initialProps, run: true });
      expect(result.current.show).toEqual(false);

      jest.advanceTimersByTime(80);
      // set run=false, timer reset
      rerender({ ...initialProps, run: false });

      // then
      jest.advanceTimersByTime(50);
      expect(result.current.show).toEqual(false);
    });
  });
});
