import React, { useState, useEffect } from 'react';
import api from './api';

import UsersRespondPage from './components/UsersRespondPage';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfessions] = useState(api.professions.fetchAll());
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  const handleDeleteUserRow = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      <UsersRespondPage
        allUsers={users}
        allProfessions={professions}
        onDeleteUser={handleDeleteUserRow}
      />
    </>
  );
};

export default App;
