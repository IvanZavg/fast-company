import React from 'react';
import PropTypes from 'prop-types';

import QalityList from '../../ui/QalityList';

const QualitiesCard = ({ qualitiesId }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <QalityList qualitiesId={qualitiesId} />
        </p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesCard;
