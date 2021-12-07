import React from 'react';

const FavoritesBookmark = (props) => {
  const bookmarkType = props.isFavorite ? 'bi bi-bookmark-heart-fill' : 'bi bi-bookmark-heart';
  return (
    <i
      className={bookmarkType}
      style={{ fontSize: '2rem', cursor: 'pointer' }}
      onClick={props.onToggleFavorites}
    ></i>
  );
};

export default FavoritesBookmark;
