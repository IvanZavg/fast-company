import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainNavBar from './components/ui/MainNavBar';
import Main from './layouts/Main';
import Login from './layouts/Login';
import Users from './layouts/Users';
import { ProfessionsProvider } from './hooks/useProfessions';
import { QualityProvider } from './hooks/useQuality';
import AuthProvider from './hooks/useAuth';

const App = () => {
  return (
    <>
      <AuthProvider>
        <MainNavBar />
        <ProfessionsProvider>
          <QualityProvider>
            <Switch>
              <Route exact path="/login/:type?" component={Login} />
              <Route exact path="/users/:userId?/:action?" component={Users} />
              <Route exact path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
          </QualityProvider>
        </ProfessionsProvider>
        <ToastContainer />
      </AuthProvider>
    </>
  );
};

export default App;
