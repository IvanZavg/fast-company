import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UsersAll from '../components/UsersAll';
import User from '../components/User';

const Users = () => {
  const { userId } = useParams();
  return userId ? <User id={userId} /> : <UsersAll />;
};

export default Users;
