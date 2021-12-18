import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import api from '../api';

import BanerResponedUsers from './BanerRespondedUsers';
import UsersTable from './userTableComponents/UsersTable';
import Pagination from './Pagination';
import GroupList from './GroupList';

import { paginate } from '../utils/paginate';

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

const UsersRespondPage = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  useEffect(() => setCurrentPage(1), [selectedProf]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  const handleToggleFavorites = (id) => {
    const userIndex = users.findIndex((user) => user._id === id);
    users[userIndex].bookmark = !users[userIndex].bookmark;
    setUsers([...users]);
  };
  const handleProfessionSelect = (selectedProf) => {
    setSelectedProf(selectedProf);
  };
  const handleClearFilter = () => {
    setSelectedProf();
  };
  const handlePageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };
  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const pageSize = 4;
    const itemsCount = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);

    checkCurrentPage(filteredUsers, pageSize, currentPage, setCurrentPage);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
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
          </div>
        )}
        <div className="d-flex flex-column">
          <BanerResponedUsers usersCount={filteredUsers.length} />
          {Boolean(userCrop.length) && (
            <UsersTable
              onDeleteUser={handleDeleteUser}
              onToggleFavorites={handleToggleFavorites}
              onSort={handleSort}
              users={userCrop}
              selectedSort={sortBy}
            />
          )}
          {Boolean(itemsCount) && (
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return 'loading...';
  }
};

export default UsersRespondPage;
