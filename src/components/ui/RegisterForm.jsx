import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import {
  TextField,
  SelectField,
  RadioField,
  MultiSelectField,
  CheckBoxField
} from '../common/form';

import { useProfessions } from '../../hooks/useProfessions';
import { useQuality } from '../../hooks/useQuality';

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
  },
  profession: {
    isRequired: {
      errMessage: 'Необходимо выбрать профессию из списка!'
    }
  },
  qualities: {
    isRequired: {
      errMessage: 'Необходимо выбрать мин. одно качество!'
    }
  },
  license: {
    isChecked: {
      errMessage: 'Необходимо подтвердить лицензионное соглашение!'
    }
  }
};

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const { professions, isLoading: profLoading } = useProfessions();
  const { qualities, isLoading: qualitiesLoading } = useQuality();
  const isEnableSend = Object.keys(errors).length === 0;

  const formatQualities = () => {
    return qualities.map((q) => ({ value: q._id, label: q.name }));
  };

  useEffect(() => validate(), [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event, name, selectedData) => {
    if (event) {
      setData((prevstate) => ({
        ...prevstate,
        [event.target.name]: event.target.value
      }));
    } else {
      setData((prevstate) => ({
        ...prevstate,
        [name]: selectedData
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    console.log(data);
  };

  return (
    <>
      {!profLoading && !qualitiesLoading && (
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
          <SelectField
            label="Профессия"
            name="profession"
            options={professions}
            optionValueName="_id"
            optionTextName="name"
            selectedValue={data.profession}
            onChange={handleChange}
            error={errors.profession}
          />
          <RadioField
            label="Выберите ваш пол:"
            name="sex"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]}
            optionValueName="value"
            optionTextName="label"
            selectedValue={data.sex}
            onChange={handleChange}
          />
          <MultiSelectField
            label="Выберите качества"
            name="qualities"
            options={formatQualities()}
            onChange={handleChange}
            error={errors.qualities}
          />
          <CheckBoxField
            name="license"
            value={data.license}
            onChange={handleChange}
            error={errors.license}
          >
            Подтвердить <a href="/"> лицензионное соглашение</a>
          </CheckBoxField>
          <button
            className="btn btn-primary w-100 mx-auto"
            type="submit"
            disabled={!isEnableSend}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
