import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../../api';

import QalityList from '../../ui/QalityList';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.fetchUserById(id).then((data) => setUser(data));
  }, []);

  const handleReplaceToAllUsers = () => {
    history.push('/users');
  };

  const renderUser = () => {
    if (user) {
      return (
        <div className="row">
          <div className="col m-2">
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QalityList qualities={user.qualities} />
            <h3>Completed Meetings: {user.completedMeetings}</h3>
            <h3>Rate: {user.rate}</h3>
            <button
              className="btn btn-primary"
              onClick={handleReplaceToAllUsers}
            >
              Return to Users
            </button>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  };

  return renderUser();
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};
export default UserPage;
