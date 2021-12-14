import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SimplePagination from './paginationComponents/SimplePagination';
import LargePagination from './paginationComponents/LargePagination';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const countPages = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, countPages + 1);
  if (countPages <= 1) {
    return <></>;
  } else if (countPages <= 5) {
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
        countPages={countPages}
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
