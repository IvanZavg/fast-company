import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );

  const handleToggleFormType = () => {
    setFormType((prevstate) =>
      prevstate === 'register' ? 'login' : 'register'
    );
  };

  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'login' ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                {"Don't have an acount? "}
                <a role="button" onClick={handleToggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have an acount?{' '}
                <a role="button" onClick={handleToggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
