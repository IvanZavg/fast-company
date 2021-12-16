import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
// import UserRow from './UserRow';
// <tbody>
// {props.users.map((user) => (
// <UserRow
// key={user._id}
// {...user}
// isFavorite={user.bookmark}
// onDelete={() => props.onDeleteUser(user._id)}
// onToggleFavorites={() => props.onToggleFavorites(user._id)}
// />
// ))}
// </tbody>

const UsersTable = (props) => {
  const { onSort, selectedSort } = props;
  const columns = {
    name: {
      path: 'name',
      name: 'Имя'
    },
    qualities: {
      path: null,
      name: 'Качества'
    },
    profession: {
      path: 'profession.name',
      name: 'Профессия'
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: {
      path: 'rate',
      name: 'Оценка'
    },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное'
    },
    delete: {
      path: null,
      name: null
    }
  };
  return (
    <table className="table table-hover">
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ data: props.users, columns }} />
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleFavorites: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
