/* eslint-disable react/jsx-no-bind */

import React, { useState, useCallback } from 'react';
import { Pagination } from 'react-bootstrap';

import styles from './styles.module.scss';

const DEFAULT_MAX_ITEMS = 8;

type UsePaginationParams = {
  count: number;
  maxItems?: number;
};

const usePagination = ({
  count,
  maxItems = DEFAULT_MAX_ITEMS,
}: UsePaginationParams) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPageNumber = count ? Math.ceil(count / maxItems) : 1;

  const onPageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const renderFirst = useCallback(
    () =>
      maxPageNumber > 3 && (
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
      ),
    [onPageChange, currentPage, maxPageNumber],
  );

  const renderLast = useCallback(
    () =>
      maxPageNumber > 3 && (
        <Pagination.Last
          disabled={currentPage === maxPageNumber}
          onClick={() => onPageChange(maxPageNumber)}
        />
      ),
    [onPageChange, currentPage, maxPageNumber],
  );

  const renderPages = useCallback(
    () =>
      Array.from(Array(maxPageNumber).keys()).map((page) => {
        const isActive = page + 1 === currentPage;
        const shouldRenderPageButton =
          (page <= currentPage || page <= 2) &&
          (page >= currentPage - 2 || page >= maxPageNumber - 3);

        return (
          shouldRenderPageButton && (
            <Pagination.Item
              key={page}
              active={isActive}
              onClick={() => onPageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          )
        );
      }),
    [onPageChange, currentPage, maxPageNumber],
  );

  const PaginationButtons = (): JSX.Element | null => {
    return maxPageNumber > 1 ? (
      <div className={styles.pagination}>
        <Pagination size="sm">
          {renderFirst()}
          {renderPages()}
          {renderLast()}
        </Pagination>
      </div>
    ) : null;
  };

  return {
    maxItems,
    currentPage,
    PaginationButtons,
  };
};

export default usePagination;
