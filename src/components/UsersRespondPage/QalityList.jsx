import React from 'react';

const QalityList = (props) => {
  const qualities = props.qualities;
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

export default QalityList;
