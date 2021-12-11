import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SimplePagination from './paginationComponents/SimplePagination';
import LargePagination from './paginationComponents/LargePagination';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);
  if (currentPage > pageCount) {
    onPageChange(pageCount);
  }

  if (pageCount === 1) {
    return null;
  } else if (pageCount <= 5) {
    return (
      <SimplePagination
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
  } else {
    return (
      <LargePagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
  }
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
