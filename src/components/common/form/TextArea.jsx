import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ label, name, value, onChange, error }) => {
  const getInputClasses = () => {
    return 'form-control' + ' ' + (error ? 'is-invalid' : '');
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={getInputClasses()}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};
export default TextArea;
