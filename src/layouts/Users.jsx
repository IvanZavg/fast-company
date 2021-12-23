import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UsersListPage from '../components/UsersListPage';
import UserPage from '../components/UserPage';

const Users = () => {
  const { userId } = useParams();
  return userId ? <UserPage id={userId} /> : <UsersListPage />;
};

export default Users;
