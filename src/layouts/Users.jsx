import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UserPage from '../components/page/UserPage';
import UsersListPage from '../components/page/UsersListPage';
import EditUser from '../components/page/EditUser';

function renderPages(action, userId) {
  if (action === 'edit') {
    return <EditUser id={userId} />;
  } else if (!action && userId) {
    return <UserPage id={userId} />;
  } else {
    return <UsersListPage />;
  }
}

const Users = () => {
  const { userId, action } = useParams();
  return renderPages(action, userId);
};

export default Users;
