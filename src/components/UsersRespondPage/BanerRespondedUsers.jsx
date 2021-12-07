import React from 'react';

const BanerResponedUsers = (props) => {
  const usersCount = Number(props.usersCount);
  const lastNumber = Number(props.usersCount.toString().slice(-1));
  let banerText = '';
  let banerBgClassColor = 'bg-primary';

  if (lastNumber > 1 && lastNumber < 5 && (usersCount < 10 || usersCount > 20)) {
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

export default BanerResponedUsers;
