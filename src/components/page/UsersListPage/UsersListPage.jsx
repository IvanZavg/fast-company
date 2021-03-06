import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import BanerCountUsers from '../../ui/BanerCountUsers';
import UsersTable from '../../ui/UsersTable';
import Pagination from '../../common/pagination';
import GroupList from '../../common/GroupList';
import { TextField } from '../../common/form';

import { paginate } from '../../../utils/paginate';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';

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

const UsersListPage = () => {
  const { users } = useUser();
  const { professions, isLoading } = useProfessions();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => setCurrentPage(1), [selectedProf]);

  const handleChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    setSelectedProf(null);
    console.log(searchValue);
  };

  const handleDeleteUser = (id) => {
    // setUsers(users.filter((user) => user._id !== id));
    console.log(`delete user: ${id}`);
  };

  const handleToggleFavorites = (id) => {
    const userIndex = users.findIndex((user) => user._id === id);
    users[userIndex].bookmark = !users[userIndex].bookmark;
    // setUsers([...users]);
  };
  const handleProfessionSelect = (selectedProf) => {
    setSelectedProf(selectedProf);
    setSearchValue('');
  };
  const handleClearFilter = () => {
    setSelectedProf(null);
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
      return users.filter((user) => user.profession === selectedProf._id);
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
            {!isLoading && (
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
              />
            )}
            <button
              className="btn btn-secondary mt-2"
              onClick={handleClearFilter}
            >
              ????????????????
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <BanerCountUsers usersCount={filteredUsers.length} />
          <TextField
            label="??????????"
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

export default UsersListPage;
