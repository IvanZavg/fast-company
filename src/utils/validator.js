function validate(fieldData, ruleName, ruleConfig) {
  let hasErrors = false;

  switch (ruleName) {
    case 'isRequired':
      hasErrors = fieldData.trim() === '';
      break;
    case 'testRegExp':
      hasErrors = ruleConfig.reg.test(fieldData) === false;
      break;
    case 'checkMinLength':
      hasErrors = fieldData.length < ruleConfig.min;
      break;
    default:
      if (typeof ruleConfig.customCheckFunc === 'function') {
        hasErrors = ruleConfig.customCheckFunc(fieldData) === false;
      }
      break;
  }

  return hasErrors === true ? ruleConfig.errMessage : null;
}

export function validator(data, validatorConfig) {
  const errors = {};

  for (const fieldName in data) {
    const validateRules = validatorConfig[fieldName];

    for (const ruleName in validateRules) {
      const error = validate(
        data[fieldName],
        ruleName,
        validateRules[ruleName]
      );
      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  }

  return errors;
}
