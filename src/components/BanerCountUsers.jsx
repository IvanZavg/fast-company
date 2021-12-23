import React from 'react';
import PropTypes from 'prop-types';

const BanerCountUsers = ({ usersCount }) => {
  const lastNumber = Number(usersCount.toString().slice(-1));
  let banerText = '';
  let banerBgClassColor = 'bg-primary';

  if (
    lastNumber > 1 &&
    lastNumber < 5 &&
    (usersCount < 10 || usersCount > 20)
  ) {
    banerText = `${usersCount} человека тусанут с тобой сегодня`;
  } else if (usersCount > 0) {
    banerText = `${usersCount} человек тусанет с тобой сегодня`;
  } else {
    banerText = 'Никто с тобой не тусанет';
    banerBgClassColor = 'bg-danger';
  }

  return (
    <div className={`badge ${banerBgClassColor} text-white m-2`}>
      <h5>{banerText}</h5>
    </div>
  );
};

BanerCountUsers.propTypes = {
  usersCount: PropTypes.number.isRequired
};

export default BanerCountUsers;
