import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import AllUsers from '../components/AllUsers';
import User from '../components/User';

const Users = () => {
  const { userId } = useParams();
  return userId ? <User id={userId} /> : <AllUsers />;
};

export default Users;
