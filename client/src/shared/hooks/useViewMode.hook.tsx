import React, { useState, useCallback } from 'react';

import FaIcon from '../../displayComponents/faIcon/faIcon';

import useWindowDimensions from './useWindowDimensions';

const MIN_WIDTH = 768;

export enum viewModes {
  DEFAULT = 'DEFAULT',
  LARGE = 'LARGE',
  LIST = 'LIST',
}

type ViewModeType = keyof typeof viewModes;

const useViewMode = () => {
  const [viewMode, setViewMode] = useState<ViewModeType>(viewModes.DEFAULT);
  const { width } = useWindowDimensions();

  const onListClick = useCallback(() => {
    if (viewMode !== viewModes.LIST) {
      setViewMode(viewModes.LIST);
    }
  }, [viewMode]);

  const onDefaultClick = useCallback(() => {
    if (viewMode !== viewModes.DEFAULT) {
      setViewMode(viewModes.DEFAULT);
    }
  }, [viewMode]);

  const onLargeClick = useCallback(() => {
    if (viewMode !== viewModes.LARGE) {
      setViewMode(viewModes.LARGE);
    }
  }, [viewMode]);

  const isListView = viewMode === viewModes.LIST;
  const isDefaultView = viewMode === viewModes.DEFAULT;
  const isLargeView = viewMode === viewModes.LARGE;

  const ViewModeButtons = (): JSX.Element | null => {
    if (width < MIN_WIDTH) {
      setViewMode(viewModes.DEFAULT);
      return null;
    }

    return (
      <span className="view-mode">
        <span
          className={isListView ? 'view-mode-active' : ''}
          onClick={onListClick}
        >
          <FaIcon icon="list-ul" size={16} />
        </span>
        <span
          className={isDefaultView ? 'view-mode-active' : ''}
          onClick={onDefaultClick}
        >
          <FaIcon icon="th" size={16} />
        </span>
        <span
          className={isLargeView ? 'view-mode-active' : ''}
          onClick={onLargeClick}
        >
          <FaIcon icon="th-large" size={16} />
        </span>
      </span>
    );
  };

  return {
    viewMode,
    ViewModeButtons,
    isListView,
    isDefaultView,
    isLargeView,
  };
};

export default useViewMode;
