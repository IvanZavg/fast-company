import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '../common/table';
import FavoritesBookmark from '../common/FavoritesBookmark';
import QalityList from './QalityList';
import Profession from './Profession';

const UsersTable = ({
  onSort,
  selectedSort,
  users,
  onToggleFavorites,
  onDeleteUser
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => {
        return <Link to={`/users/${user._id}`}>{user.name}</Link>;
      }
    },
    qualities: {
      path: null,
      name: 'Качества',
      component: (user) => {
        return <QalityList qualitiesId={user.qualities} />;
      }
    },
    profession: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
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
            onToggleFavorites={() => onToggleFavorites(user._id)}
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
            onClick={() => onDeleteUser(user._id)}
          >
            Delete
          </button>
        );
      }
    }
  };
  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleFavorites: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
