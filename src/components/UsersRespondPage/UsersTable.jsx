import React from 'react';
import PropTypes from 'prop-types';

import UserRow from './UserRow';

const UsersTable = (props) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <UserRow
            key={user._id}
            {...user}
            isFavorite={props.favorites[user._id].isFavorite}
            onDelete={() => props.handleDeleteUserRow(user._id)}
            onToggleFavorites={() => props.handleToggleFavorites(user._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  favorites: PropTypes.object.isRequired,
  handleDeleteUserRow: PropTypes.func.isRequired,
  handleToggleFavorites: PropTypes.func.isRequired
};

export default UsersTable;
