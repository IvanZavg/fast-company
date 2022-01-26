import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { validator } from '../../../utils/validator';

import { TextArea, SelectField } from '../../common/form';

const validatorConfig = {
  userId: {
    isRequired: {
      errMessage: 'Поле Имя должно быть заполнено!'
    }
  },
  content: {
    isRequired: {
      errMessage: 'Поле почта должно быть заполнено!'
    }
  }
};

const initialData = { userId: '', content: '' };

const AddCommentForm = ({ users, onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const selectUserOptions = users.map((user) => ({
    _id: user._id,
    name: user.name
  }));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <div className="mb-4">
              <SelectField
                label="Пользователь"
                name="userId"
                options={selectUserOptions}
                optionValueName="_id"
                optionTextName="name"
                selectedValue={data.userId}
                onChange={handleChange}
                error={errors.userId}
              />
            </div>
            <div className="mb-4">
              <TextArea
                label="Комментарий"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
              />
            </div>
            <button className="btn btn-primary w-100 mx-auto" type="submit">
              Добавить комментарий
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
  users: PropTypes.array
};
export default AddCommentForm;
