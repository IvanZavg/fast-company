import React from 'react';
import PropTypes from 'prop-types';

function defineActivePage(page, currentPage) {
  return page === currentPage ? 'page-item active' : 'page-item';
}
const SimplePagination = ({ pages, currentPage, onPageChange }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination" style={{ cursor: 'pointer' }}>
        {pages.map((page) => (
          <li
            className={defineActivePage(page, currentPage)}
            key={'page_' + page}
          >
            <button
              className="page-link "
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

SimplePagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default SimplePagination;
