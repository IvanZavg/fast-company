import React from 'react';
import PropTypes from 'prop-types';

const FavoritesBookmark = ({ isFavorite, onToggleFavorites }) => {
  const bookmarkType = isFavorite
    ? 'bi bi-bookmark-heart-fill'
    : 'bi bi-bookmark-heart';
  return (
    <i
      className={bookmarkType}
      style={{ fontSize: '2rem', cursor: 'pointer' }}
      onClick={onToggleFavorites}
    ></i>
  );
};

FavoritesBookmark.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorites: PropTypes.func.isRequired
};

export default FavoritesBookmark;
