import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import EditUserForm from '../../ui/EditUserForm';
import BackHistoryButton from '../../common/BackHistoryButton';

import api from '../../../api';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';
import { useQuality } from '../../../hooks/useQuality';

const EditUser = ({ id }) => {
  const { getProfession, isLoading: profIsLoading } = useProfessions();
  const { getQualitiesListByIds, isLoading: qualitiesIsLoading } = useQuality();
  const user = useUser().getUser(id);

  const profession = getProfession(user.profession);
  const qualities = getQualitiesListByIds(user.qualities);
  const history = useHistory();

  const handleEditUser = (userData) => {
    api.users.updateUserInStorage(id, userData);
    history.push(`/users/${id}`);
  };

  return (
    <div className="container mt-5 ">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">{'Edit User'}</h3>
          {user && !profIsLoading && !qualitiesIsLoading ? (
            <EditUserForm
              name={user.name}
              email={user.email}
              profession={profession._id}
              sex={user.sex}
              qualities={qualities}
              onEdit={handleEditUser}
            />
          ) : (
            'loading...'
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;

EditUser.propTypes = {
  id: PropTypes.string
};
