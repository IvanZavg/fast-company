import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import api from '../api';

import BanerCountUsers from './BanerCountUsers';
import UsersTable from './UsersTable';
import Pagination from './paginationComponents/Pagination';
import GroupList from './GroupList';
import TextField from './TextField';

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

const UsersAll = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => setCurrentPage(1), [selectedProf]);

  const handleChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    setSelectedProf('');
    console.log(searchValue);
  };

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
    setSearchValue('');
  };
  const handleClearFilter = () => {
    setSelectedProf('');
  };
  const handlePageChange = (pageIdx) => {
    setCurrentPage(pageIdx);
  };
  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const filterUsers = () => {
    const searchUserName = new RegExp(searchValue, 'i');
    if (selectedProf) {
      return users.filter((user) => user.profession._id === selectedProf._id);
    } else if (searchValue) {
      return users.filter((user) => searchUserName.test(user.name));
    } else {
      return users;
    }
  };

  if (users) {
    const filteredUsers = filterUsers();
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
          <BanerCountUsers usersCount={filteredUsers.length} />
          <TextField
            label="Поиск"
            name="searchUser"
            velue={searchValue}
            type="text"
            onChange={handleChangeSearchValue}
          />
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

export default UsersAll;
