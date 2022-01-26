import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import API from '../../../api';

import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';

const CommentsBlock = ({ pageId }) => {
  const [comments, setComments] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [usersComment, setUsersComment] = useState({});

  useEffect(() => updateComments(), []);

  useEffect(() => {
    API.users.fetchAll().then((users) => setUsersList(users), []);
  }, []);

  useEffect(() => {
    if (comments.length) {
      const usersIds = comments.reduce((usersIds, comment) => {
        if (!usersIds.includes(comment.userId)) usersIds.push(comment.userId);
        return usersIds;
      }, []);

      const arrPromises = [];
      usersIds.forEach((userId) =>
        arrPromises.push(API.users.fetchUserById(userId))
      );

      Promise.all(arrPromises).then((users) => {
        const usersData = {};
        users.forEach((user) => (usersData[user._id] = user));
        setUsersComment(usersData);
      });
    }
  }, [comments]);

  const updateComments = () => {
    API.comments
      .fetchCommentsForUser(pageId)
      .then((comments) => setComments(comments));
  };

  const handleAddComment = (data) => {
    API.comments.add({ ...data, pageId: pageId });
    updateComments();
  };

  const handleRemoveComment = (commentId) => {
    API.comments.remove(commentId).then((removedId) => {
      const newComments = comments.filter(({ _id }) => _id !== removedId);
      setComments(newComments);
    });
  };

  return (
    <>
      <AddCommentForm users={usersList} onSubmit={handleAddComment} />
      <CommentsList
        comments={comments}
        onRemove={handleRemoveComment}
        users={usersComment}
      />
    </>
  );
};

CommentsBlock.propTypes = {
  pageId: PropTypes.string
};
export default CommentsBlock;
