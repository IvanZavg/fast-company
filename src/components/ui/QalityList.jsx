import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';

const QalityList = ({ qualities }) => {
  const [allQualities, setAllQualities] = useState({});
  let userQualities;

  useEffect(() =>
    api.qualities.fetchAll().then((result) => setAllQualities(result), [])
  );

  if (Object.keys(allQualities).length) {
    userQualities = qualities.map((qualityId) => {
      let qualityObj;
      for (const key in allQualities) {
        if (allQualities[key]._id === qualityId) {
          qualityObj = allQualities[key];
        }
      }
      return qualityObj;
    });
  }

  return (
    <>
      {userQualities &&
        userQualities.map((quality) => (
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
