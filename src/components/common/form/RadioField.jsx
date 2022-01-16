import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({
  label,
  name,
  options,
  selectedValue,
  optionValueName,
  optionTextName,
  onChange
}) => {
  return (
    <div className="mb-4">
      <label className="col col-12 form-label">{label}</label>
      {options.map((option, idx) => (
        <div
          key={option[optionValueName]}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={'inlineRadio' + idx}
            value={option[optionValueName]}
            checked={option[optionValueName] === selectedValue}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={'inlineRadio' + idx}>
            {option[optionTextName]}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  optionValueName: PropTypes.string,
  optionTextName: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
