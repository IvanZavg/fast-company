import React from 'react';
import PropTypes from 'prop-types';

function definePageNumber(btnIdx, currentPage, pageCount) {
  if (btnIdx === 1) {
    const prevTenth = Math.floor(currentPage / 10 - 1) * 10 || 10;
    const showPrevTenth = currentPage - 2 >= 10;

    if (currentPage <= 2) {
      return 1;
    } else if (showPrevTenth) {
      return prevTenth;
    } else if (currentPage === pageCount - 1) {
      return currentPage - 3;
    } else if (currentPage === pageCount) {
      return currentPage - 4;
    } else {
      return currentPage - 2;
    }
  }

  if (btnIdx === 2) {
    if (currentPage <= 2) {
      return 2;
    } else if (currentPage >= pageCount - 1) {
      return pageCount - 3;
    } else {
      return currentPage - 1;
    }
  }

  if (btnIdx === 3) {
    if (currentPage <= 3) {
      return 3;
    } else if (currentPage >= pageCount - 1) {
      return pageCount - 2;
    } else {
      return currentPage;
    }
  }

  if (btnIdx === 4) {
    if (currentPage < 4) {
      return 4;
    } else if (currentPage >= 4 && currentPage + 2 <= pageCount) {
      return currentPage + 1;
    } else if (currentPage === pageCount) {
      return currentPage - 1;
    } else {
      return currentPage;
    }
  }

  if (btnIdx === 5) {
    const nextTenth = Math.floor(currentPage / 10 + 1) * 10;
    const showNextTenth = nextTenth + 2 <= pageCount;
    if (showNextTenth) {
      return nextTenth;
    } else if (currentPage < 3) {
      return 5;
    } else if (currentPage + 2 < pageCount) {
      return currentPage + 2;
    } else {
      return pageCount;
    }
  }
}

function defineActivePage(pageNumber, currentPage) {
  return currentPage === pageNumber ? 'page-item active' : 'page-item';
}

function choosePageNumber(pageNumber, onPageChange) {
  return () => {
    onPageChange(pageNumber);
  };
}

function choosePrevPage(currentPage, onPageChange) {
  if (currentPage - 1 <= 0) return;
  return () => {
    onPageChange(currentPage - 1);
  };
}

function chooseNextPage(currentPage, pageCount, onPageChange) {
  if (currentPage + 1 > pageCount) return;
  return () => {
    onPageChange(currentPage + 1);
  };
}

function chooseFirstPage(currentPage, onPageChange) {
  if (currentPage === 1) return;
  return () => {
    onPageChange(1);
  };
}

function chooseLastPage(currentPage, pageCount, onPageChange) {
  if (currentPage === pageCount) return;
  return () => {
    onPageChange(pageCount);
  };
}

const LargePagination = ({ pageCount, currentPage, onPageChange }) => {
  const pageNumber1 = definePageNumber(1, currentPage, pageCount);
  const pageNumber2 = definePageNumber(2, currentPage, pageCount);
  const pageNumber3 = definePageNumber(3, currentPage, pageCount);
  const pageNumber4 = definePageNumber(4, currentPage, pageCount);
  const pageNumber5 = definePageNumber(5, currentPage, pageCount);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination" style={{ cursor: 'pointer' }}>
        <li className={'page-item'}>
          <button
            className="page-link"
            onClick={chooseFirstPage(currentPage, onPageChange)}
          >
            First Page
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={choosePrevPage(currentPage, onPageChange)}
          >
            Previous
          </button>
        </li>
        <li className={defineActivePage(pageNumber1, currentPage)}>
          <button
            className="page-link"
            onClick={choosePageNumber(pageNumber1, onPageChange)}
          >
            {pageNumber1}
          </button>
        </li>
        <li className={defineActivePage(pageNumber2, currentPage)}>
          <button
            className="page-link"
            onClick={choosePageNumber(pageNumber2, onPageChange)}
          >
            {pageNumber2}
          </button>
        </li>
        <li className={defineActivePage(pageNumber3, currentPage)}>
          <button
            className="page-link"
            onClick={choosePageNumber(pageNumber3, onPageChange)}
          >
            {pageNumber3}
          </button>
        </li>
        <li className={defineActivePage(pageNumber4, currentPage)}>
          <button
            className="page-link"
            onClick={choosePageNumber(pageNumber4, onPageChange)}
          >
            {pageNumber4}
          </button>
        </li>
        <li className={defineActivePage(pageNumber5, currentPage)}>
          <button
            className="page-link"
            onClick={choosePageNumber(pageNumber5, onPageChange)}
          >
            {pageNumber5}
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={chooseNextPage(currentPage, pageCount, onPageChange)}
          >
            Next
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={chooseLastPage(currentPage, pageCount, onPageChange)}
          >
            Last page
          </button>
        </li>
      </ul>
    </nav>
  );
};

LargePagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default LargePagination;
