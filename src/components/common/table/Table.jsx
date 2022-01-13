import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ onSort, selectedSort, columns, data }) => {
  return (
    <table className="table table-hover">
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ data, columns }} />
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  data: PropTypes.array,
  columns: PropTypes.object
};
export default Table;
