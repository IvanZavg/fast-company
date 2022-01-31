import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import UserCard from './UserCard';
import QualitiesCard from './QualitiesCard';
import MeetingsCard from './MeetingsCard';
import CommentsBlock from './ComentsBlock';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';

const UserPage = ({ id }) => {
  const user = useUser().getUser(id);
  const profession = useProfessions().getProfession(user.profession);
  const isProfessionLoading = useProfessions().isLoading;
  const history = useHistory();

  const handleReplaceToEdit = () => {
    history.push(`/users/${id}/edit`);
  };

  const renderUser = () => {
    if (user) {
      return (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              {!isProfessionLoading && (
                <UserCard
                  name={user.name}
                  profession={profession.name}
                  rate={user.rate}
                  onEdit={handleReplaceToEdit}
                />
              )}
              <QualitiesCard qualitiesId={user.qualities} />
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
