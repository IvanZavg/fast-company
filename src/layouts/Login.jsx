import React, { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import TextField from '../components/TextField';

const validatorConfig = {
  email: {
    isRequired: {
      errMessage: 'Поле почта должно быть заполнено!'
    },
    testRegExp: {
      reg: /^\S+@\S+\.\S+$/i,
      errMessage:
        'Введен не корректный адресс почты. Проверьте введенные данные!'
    }
  },
  password: {
    isRequired: {
      errMessage: 'Поле пароль должно быть заполнено!'
    },
    checkMinLength: {
      min: 6,
      errMessage: 'Пароль должен состаять минимум из 6 символов'
    },
    checkPasswordSymbols: {
      customCheckFunc: (password) =>
        [/[A-ZА-Я]/, /\d/].every((reg) => reg.test(password)),
      errMessage:
        'Пароль должен содержать минимум одну заглавную букву и мнимум одно число'
    }
  }
};

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const isEnableSend = Object.keys(errors).length === 0;

  useEffect(() => validate(), [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    setData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    console.log(data);
  };

  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              disabled={!isEnableSend}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
