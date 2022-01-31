import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../utils/validator';
import {
  TextField,
  SelectField,
  RadioField,
  MultiSelectField
} from '../common/form';

import { useProfessions } from '../../hooks/useProfessions';
import { useQuality } from '../../hooks/useQuality';

const validatorConfig = {
  name: {
    isRequired: {
      errMessage: 'Поле Имя должно быть заполнено!'
    }
  },
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
  profession: {
    isRequired: {
      errMessage: 'Необходимо выбрать профессию из списка!'
    }
  },
  qualities: {
    isRequired: {
      errMessage: 'Необходимо выбрать мин. одно качество!'
    }
  }
};

const EditUserForm = ({ name, email, profession, sex, qualities, onEdit }) => {
  const [data, setData] = useState({ name, email, profession, sex, qualities });
  const [errors, setErrors] = useState({});
  const { professions } = useProfessions();
  const qualitiesList = useQuality().qualities;
  const isEnableSend = Object.keys(errors).length === 0;

  const formatQualities = () => {
    return qualitiesList.map((q) => ({ value: q._id, label: q.name }));
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
    onEdit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
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
        defaultValue={qualities.map((q) => ({ value: q._id, label: q.name }))}
        error={errors.qualities}
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isEnableSend}
      >
        Обновить
      </button>
    </form>
  );
};

export default EditUserForm;

EditUserForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profession: PropTypes.string,
  sex: PropTypes.string,
  qualities: PropTypes.array,
  onEdit: PropTypes.func
};
