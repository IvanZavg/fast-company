import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, velue, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const getInputClasses = () => {
    return 'form-control' + ' ' + (error ? 'is-invalid' : '');
  };
  return (
    <div className="mb-4">
      <label htmlFor="email">{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={velue}
          onChange={onChange}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  velue: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};
export default TextField;
