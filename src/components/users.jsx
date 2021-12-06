import React, { useState } from 'react';
import api from '../api';

const BanerUsersCount = (props) => {
  const usersCount = Number(props.usersCount);
  const lastNumber = Number(props.usersCount.toString().split('').reverse()[0]);
  let banerText = '';
  let banerBgClassColor = 'bg-primary';

  if (lastNumber > 1 && lastNumber < 5 && (usersCount < 10 || usersCount > 20)) {
    banerText = `${usersCount} человека тусанут с тобой сегодня`;
  } else if (usersCount > 0) {
    banerText = `${usersCount} человек тусанет с тобой сегодня`;
  } else {
    banerText = `Никто с тобой не тусанет`;
    banerBgClassColor = 'bg-danger';
  }

  return (
    <div className={`badge ${banerBgClassColor} text-white m-2`}>
      <h5>{banerText}</h5>
    </div>
  );
};

const BadgeQalitiesList = (props) => {
  const qualities = props.qualities;
  return (
    <>
      {qualities.map((qality) => (
        <span className={`badge bg-${qality.color} m-1`} key={qality._id}>
          {qality.name}
        </span>
      ))}
    </>
  );
};

const Users = () => {
  const [users, changeUsers] = useState(api.users.fetchAll());
  const deleteUserRow = (id) => {
    changeUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  return (
    <div className="container">
      <BanerUsersCount usersCount={users.length} />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                <BadgeQalitiesList qualities={user.qualities} />
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>

              <td>{user.rate}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUserRow(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
