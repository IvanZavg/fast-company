import React, { useState } from 'react';
import api from '../api';

import BanerResponedUsers from './UsersRespondPage/BanerRespondedUsers';
import UsersTable from './UsersRespondPage/UsersTable';

const UsersRespondPage = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [favorites, setFavorites] = useState(
    users.reduce((total, user) => {
      total[user._id] = { isFavorite: false };
      return total;
    }, {})
  );

  const handleDeleteUserRow = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleToggleFavorites = (id) => {
    const newFavoriteState = { isFavorite: !favorites[id].isFavorite };
    const newState = { ...favorites, [id]: newFavoriteState };
    setFavorites(newState);
  };

  return (
    <div className="container">
      <BanerResponedUsers usersCount={users.length} />
      <UsersTable
        handleDeleteUserRow={handleDeleteUserRow}
        handleToggleFavorites={handleToggleFavorites}
        users={users}
        favorites={favorites}
      />
    </div>
  );
};

export default UsersRespondPage;
