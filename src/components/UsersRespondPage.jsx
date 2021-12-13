import React, { useState, useEffect } from 'react';
import api from '../api';

import BanerResponedUsers from './usersRespondPage/BanerRespondedUsers';
import UsersTable from './usersRespondPage/UsersTable';
import Pagination from './Pagination';
import GroupList from './GroupList';

import { paginate } from '../utils/paginate';
import { createFavoritesDict } from '../utils/createFavoritesDict';
import { filterItems } from '../utils/filterItems';

const UsersRespondPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfessions] = useState(api.professions.fetchAll());
  const [selectedProf, setSelectedProf] = useState();
  const [favorites, setFavorites] = useState(createFavoritesDict(users));
  const [filteredUsers, setFilteredUsers] = useState(
    filterItems({
      arr: users,
      value: selectedProf,
      propValue: 'profession',
      ifEmptyReturnPrev: true
    })
  );

  const pageSize = 4;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => console.log(professions), [professions]);

  const handleProfessionSelect = (selectedProf) => {
    const filteredUsers = filterItems({
      arr: users,
      value: selectedProf,
      propValue: 'profession',
      ifEmptyReturnPrev: false
    });
    setSelectedProf(selectedProf);
    setFilteredUsers(filteredUsers);
  };

  const handleClearFilter = () => {
    setSelectedProf();
    setFilteredUsers(users);
  };

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
      <BanerResponedUsers usersCount={filteredUsers.length} />
      {professions && (
        <>
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={handleClearFilter}
          >
            Очистить
          </button>
        </>
      )}
      <UsersTable
        handleDeleteUserRow={handleDeleteUserRow}
        handleToggleFavorites={handleToggleFavorites}
        users={userCrop}
        favorites={favorites}
      />
      <Pagination
        itemsCount={filteredUsers.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
    </div>
  );
};

export default UsersRespondPage;
