import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom/cjs/react-router-dom.min';

import MainNavBar from './components/ui/MainNavBar';
import Main from './layouts/Main';
import Login from './layouts/Login';
import Users from './layouts/Users';

const App = () => {
  return (
    <>
      <MainNavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route exact path="/users/:userId?" component={Users} />
        <Route exact path="/users/:userId?/:action?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
