import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function renderContent(item, columnKey, columnValue) {
  if (columnValue.component) {
    if (typeof columnValue.component === 'function') {
      return <td key={columnKey}>{columnValue.component(item)}</td>;
    } else {
      return <td key={columnKey}>{columnValue.component}</td>;
    }
  } else {
    return <td key={columnKey}>{_.get(item, columnValue.path)}</td>;
  }
}

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) =>
            renderContent(item, column, columns[column])
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
