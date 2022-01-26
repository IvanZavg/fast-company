import React from 'react';
import PropTypes from 'prop-types';

import RandomAvatar from '../../common/RandomAvatar';
import { getDescribePastTime } from '../../../utils/getDescribePastTime';

const Comment = ({ content, createdAt, user, onRemove }) => {
  const infoAboutCreateTime = getDescribePastTime(createdAt);

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <RandomAvatar />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {!!user && user.name}{' '}
                    <span className="small">
                      <em>{infoAboutCreateTime}</em>
                    </span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={onRemove}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.string,
  user: PropTypes.object,
  onRemove: PropTypes.func
};
export default Comment;
