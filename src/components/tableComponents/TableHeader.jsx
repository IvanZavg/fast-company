import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (columnName) => {
    if (selectedSort.path === columnName) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ path: columnName, order: 'asc' });
    }
  };
  const setSortDirectionIcon = (columnName) => {
    if (selectedSort.path === columnName) {
      return selectedSort.order === 'asc'
        ? 'bi bi-caret-down-fill'
        : 'bi bi-caret-up-fill';
    } else {
      return '';
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
            <i className={setSortDirectionIcon(columns[column].path)}></i>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
