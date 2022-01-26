import professionsAPI from './professions.api';
import qualitiesAPI from './qualities.api';

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471818',
    qualities: [
      '67rdca3eeb7f6fgeed471198',
      '67rdca3eeb7f6fgeed471103',
      '67rdca3eeb7f6fgeed471100'
    ],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471818',
    qualities: [
      '67rdca3eeb7f6fgeed4711012',
      '67rdca3eeb7f6fgeed471102',
      '67rdca3eeb7f6fgeed471101'
    ],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471818',
    qualities: ['67rdca3eeb7f6fgeed4711012'],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    sex: 'female',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471820',
    qualities: ['67rdca3eeb7f6fgeed471103'],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471814',
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471198'],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471814',
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471103'],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471822',
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471198'],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471822',
    qualities: ['67rdca3eeb7f6fgeed471102'],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    sex: 'female',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471829',
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471103'],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471829',
    qualities: ['67rdca3eeb7f6fgeed471102', '67rdca3eeb7f6fgeed4711012'],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471824',
    qualities: ['67rdca3eeb7f6fgeed471103', '67rdca3eeb7f6fgeed471100'],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    sex: 'male',
    email: 'test@tt.com',
    profession: '67rdca3eeb7f6fgeed471824',
    qualities: ['67rdca3eeb7f6fgeed471102'],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
];

const processUser = async (user) => {
  const userQualities = await getUserQualities(user);
  const userProfession = await getUserProfession(user);
  return {
    ...user,
    qualities: userQualities,
    profession: userProfession
  };
};

const getUserProfession = async (user) => {
  const professions = await professionsAPI.fetchAll();
  const userProfession = professions.find(
    (prof) => prof._id === user.profession
  );
  return userProfession;
};

const getUserQualities = async (user) => {
  const qualities = await qualitiesAPI.fetchAll();
  const userQualities = qualities.filter((quality) =>
    user.qualities.includes(quality._id)
  );
  return userQualities;
};

const loadUsersToStorage = async () => {
  const processedUsers = [];
  let i = 0;
  while (i < users.length) {
    const procUser = await processUser(users[i++]);
    processedUsers.push(procUser);
  }
  localStorage.setItem('users', JSON.stringify(processedUsers));
  return processedUsers;
};

const updateUserInStorage = async (userId, userData) => {
  console.log(1);
  const usersStorage = JSON.parse(localStorage.getItem('users'));
  const userIdx = usersStorage.findIndex((user) => user._id === userId);
  const prevUser = usersStorage[userIdx];
  const editQualities = userData.qualities.map((quality) => quality.value);
  const editProfesion = userData.profession;
  const editUser = {
    ...prevUser,
    ...userData,
    qualities: editQualities,
    profession: editProfesion
  };
  const newUserData = await processUser(editUser);

  usersStorage.splice(userIdx, 1, newUserData);
  localStorage.removeItem('users');
  localStorage.setItem('users', JSON.stringify(usersStorage));
};

const fetchAll = () => {
  const usersStorage = localStorage.getItem('users');
  if (usersStorage) {
    return new Promise((resolve) => resolve(JSON.parse(usersStorage)));
  } else {
    return new Promise((resolve) => {
      window.setTimeout(async () => {
        const users = await loadUsersToStorage();
        resolve(users);
      }, 1000);
    });
  }
};

const fetchUserById = (id) => {
  const usersStorage = localStorage.getItem('users');

  if (usersStorage) {
    const users = JSON.parse(usersStorage);
    return new Promise((resolve) => {
      const user = users.find((user) => {
        return user._id === id;
      });
      resolve(user);
    });
  } else {
    return new Promise((resolve) => {
      window.setTimeout(async () => {
        const users = await loadUsersToStorage();
        resolve(users.find((user) => user._id === id));
      }, 1000);
    });
  }
};

export default {
  fetchAll,
  fetchUserById,
  updateUserInStorage
};
