import React from 'react';
import PropTypes from 'prop-types';

import RandomAvatar from '../../common/RandomAvatar';

const UserCard = ({ name, profession, rate, onEdit }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={onEdit}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <RandomAvatar width="150" />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
  rate: PropTypes.number,
  onEdit: PropTypes.func
};

export default UserCard;
