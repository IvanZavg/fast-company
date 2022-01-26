import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../../api';

import UserCard from './UserCard';
import QualitiesCard from './QualitiesCard';
import MeetingsCard from './MeetingsCard';
import CommentsBlock from './ComentsBlock';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.fetchUserById(id).then((data) => setUser(data));
  }, []);

  const handleReplaceToEdit = () => {
    history.push(`/users/${id}/edit`);
  };

  const renderUser = () => {
    if (user) {
      return (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard
                name={user.name}
                profession={user.profession.name}
                rate={user.rate}
                onEdit={handleReplaceToEdit}
              />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>

            <div className="col-md-8">
              <CommentsBlock pageId={user._id} />
            </div>
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
