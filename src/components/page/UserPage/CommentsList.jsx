import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentsList = ({ onRemove, comments, users }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {!!comments.length &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              content={comment.content}
              createdAt={comment.created_at}
              user={users[comment.userId]}
              onRemove={() => onRemove(comment._id)}
            />
          ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  onRemove: PropTypes.func,
  comments: PropTypes.array,
  users: PropTypes.object
};

export default CommentsList;
