import React, { useState, useEffect } from 'react';
import api from './api';

import UsersRespondPage from './components/UsersRespondPage';

const App = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDeleteUserRow = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      {Boolean(users) && (
        <UsersRespondPage
          allUsers={users}
          allProfessions={professions}
          onDeleteUser={handleDeleteUserRow}
        />
      )}
    </>
  );
};

export default App;