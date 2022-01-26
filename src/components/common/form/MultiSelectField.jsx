import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({
  label,
  name,
  options,
  onChange,
  error,
  defaultValue
}) => {
  const handleChange = (data) => {
    onChange(null, name, data);
  };

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <Select
        isMulti
        name={name}
        options={options}
        className="basic-multi-select is-invalid"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
