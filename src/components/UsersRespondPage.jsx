import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import BanerResponedUsers from './usersRespondPage/BanerRespondedUsers';
import UsersTable from './usersRespondPage/UsersTable';
import Pagination from './Pagination';
import GroupList from './GroupList';

import { paginate } from '../utils/paginate';
import { createFavoritesDict } from '../utils/createFavoritesDict';

function checkCurrentPage(
  filteredUsers,
  pageSize,
  currentPage,
  setCurrentPage
) {
  const countPages = Math.ceil(filteredUsers.length / pageSize);
  if (currentPage > countPages) {
    setCurrentPage(countPages);
  }
}

const UsersRespondPage = ({ allUsers, allProfessions, onDeleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [favorites, setFavorites] = useState(createFavoritesDict(allUsers));
  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession._id === selectedProf._id)
    : allUsers;

  useEffect(() => setCurrentPage(1), [selectedProf]);

  const pageSize = 4;
  const itemsCount = filteredUsers.length;
  checkCurrentPage(filteredUsers, pageSize, currentPage, setCurrentPage);
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const handleProfessionSelect = (selectedProf) => {
    setSelectedProf(selectedProf);
  };

  const handleClearFilter = () => {
    setSelectedProf();
  };

  const handleOnPageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };

  const handleToggleFavorites = (id) => {
    const newFavoriteState = { isFavorite: !favorites[id].isFavorite };
    const newState = { ...favorites, [id]: newFavoriteState };
    setFavorites(newState);
  };

  return (
    <div className="d-flex">
      {allProfessions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={allProfessions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={handleClearFilter}
          >
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <BanerResponedUsers usersCount={filteredUsers.length} />
        {Boolean(userCrop.length) && (
          <UsersTable
            onDeleteUser={onDeleteUser}
            handleToggleFavorites={handleToggleFavorites}
            users={userCrop}
            favorites={favorites}
          />
        )}
        {Boolean(itemsCount) && (
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={itemsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handleOnPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

UsersRespondPage.propTypes = {
  allUsers: PropTypes.array,
  allProfessions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onDeleteUser: PropTypes.func
};

export default UsersRespondPage;
