import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import EditUserForm from '../../ui/EditUserForm';
import BackHistoryButton from '../../common/BackHistoryButton';

import api from '../../../api';

const EditUser = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.fetchUserById(id).then((data) => setUser(data));
  }, []);

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
          {user ? (
            <EditUserForm
              name={user.name}
              email={user.email}
              profession={user.profession._id}
              sex={user.sex}
              qualities={user.qualities}
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
