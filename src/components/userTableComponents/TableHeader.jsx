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
