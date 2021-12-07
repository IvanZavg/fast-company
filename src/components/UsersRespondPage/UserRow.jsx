import React from 'react';
import QalityList from './QalityList';
import FavoritesBookmark from './FavoritesBookmark';

const UserRow = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <QalityList qualities={props.qualities} />
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>

      <td>{props.rate}</td>
      <td>
        <FavoritesBookmark
          isFavorite={props.isFavorite}
          onToggleFavorites={props.onToggleFavorites}
        />
      </td>
      <td>
        <button className="btn btn-danger" onClick={props.onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
