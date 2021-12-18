import React from 'react';
import PropTypes from 'prop-types';

import Table from '../tableComponent/Table';
import FavoritesBookmark from './FavoritesBookmark';
import QalityList from './QalityList';

const UsersTable = (props) => {
  const { onSort, selectedSort } = props;
  const columns = {
    name: {
      path: 'name',
      name: 'Имя'
    },
    qualities: {
      path: null,
      name: 'Качества',
      component: (user) => {
        return <QalityList qualities={user.qualities} />;
      }
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
      name: 'Избранное',
      component: (user) => {
        return (
          <FavoritesBookmark
            isFavorite={user.bookmark}
            onToggleFavorites={() => props.onToggleFavorites(user._id)}
          />
        );
      }
    },
    delete: {
      path: null,
      name: null,
      component: (user) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => props.onDeleteUser(user._id)}
          >
            Delete
          </button>
        );
      }
    }
  };
  return <Table {...{ onSort, selectedSort, columns, data: props.users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleFavorites: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
