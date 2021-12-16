import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

const UsersRespondPage = ({
  allUsers,
  allProfessions,
  onDeleteUser,
  onToggleFavorites
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  useEffect(() => setCurrentPage(1), [selectedProf]);

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession._id === selectedProf._id)
    : allUsers;
  const pageSize = 4;
  const itemsCount = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);

  checkCurrentPage(filteredUsers, pageSize, currentPage, setCurrentPage);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
            onToggleFavorites={onToggleFavorites}
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
};

UsersRespondPage.propTypes = {
  allUsers: PropTypes.array,
  allProfessions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onDeleteUser: PropTypes.func,
  onToggleFavorites: PropTypes.func
};

export default UsersRespondPage;
