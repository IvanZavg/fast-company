import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  name,
  selectedValue,
  options,
  defaultOption,
  optionValueName,
  optionTextName,
  onChange,
  error
}) => {
  const getInputClasses = () => {
    return 'form-select' + ' ' + (error ? 'is-invalid' : '');
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        value={selectedValue}
        name={name}
        onChange={onChange}
        className={getInputClasses()}
        id="validationCustom04"
      >
        {defaultOption && (
          <option disabled value="">
            {defaultOption}
          </option>
        )}
        {options.map((option) => (
          <option key={option[optionValueName]} value={option[optionValueName]}>
            {option[optionTextName]}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.defaultProps = {
  defaultOption: 'Choose...'
};

SelectField.propTypes = {
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  optionValueName: PropTypes.string,
  optionTextName: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
