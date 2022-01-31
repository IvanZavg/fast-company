import React from 'react';
import PropTypes from 'prop-types';
import { useQuality } from '../../hooks/useQuality';

const QalityList = ({ qualitiesId }) => {
  const { getQualitiesListByIds, isLoading } = useQuality();
  const qualities = getQualitiesListByIds(qualitiesId);
  return (
    <>
      {!isLoading &&
        Boolean(qualities.length) &&
        qualities.map((quality) => (
          <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
            {quality.name}
          </span>
        ))}
    </>
  );
};

QalityList.propTypes = {
  qualitiesId: PropTypes.array.isRequired
};

export default QalityList;
