import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UserPage from '../components/page/UserPage';
import UsersListPage from '../components/page/UsersListPage';

const Users = () => {
  const { userId } = useParams();
  return userId ? <UserPage id={userId} /> : <UsersListPage />;
};

export default Users;
