import React from 'react';
import PropTypes from 'prop-types';

const QalityList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

QalityList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QalityList;
