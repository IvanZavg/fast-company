import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const getInputClasses = () => {
    return 'form-check-input' + ' ' + (error ? 'is-invalid' : '');
  };
  const handleChange = () => {
    onChange(null, name, !value);
  };
  return (
    <div className="mb-4">
      <div className="form-check form-check-inline">
        <input
          className={getInputClasses()}
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
};

export default CheckBoxField;
