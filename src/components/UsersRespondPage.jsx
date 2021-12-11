import React, { useState } from 'react';
import api from '../api';

import BanerResponedUsers from './usersRespondPage/BanerRespondedUsers';
import UsersTable from './usersRespondPage/UsersTable';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';

const UsersRespondPage = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(api.users.fetchAll());
  const [favorites, setFavorites] = useState(
    users.reduce((total, user) => {
      total[user._id] = { isFavorite: false };
      return total;
    }, {})
  );
  const userCrop = paginate(users, currentPage, pageSize);

  const handleOnPageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };

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
        users={userCrop}
        favorites={favorites}
      />
      <Pagination
        itemsCount={users.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
    </div>
  );
};

export default UsersRespondPage;
