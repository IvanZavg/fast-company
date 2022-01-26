import React from 'react';
import PropTypes from 'prop-types';

function setSizeConfig(width, height) {
  const sizeConfig = {};
  if (!width && !height) {
    sizeConfig.width = '65';
  } else if (!height) {
    sizeConfig.width = width;
  } else if (!width) {
    sizeConfig.height = height;
  } else {
    sizeConfig.width = width;
    sizeConfig.height = height;
  }

  return sizeConfig;
}

const RandomAvatar = ({ width, height }) => {
  const sizeConfig = setSizeConfig(width, height);
  return (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      {...sizeConfig}
    />
  );
};

RandomAvatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export default RandomAvatar;
