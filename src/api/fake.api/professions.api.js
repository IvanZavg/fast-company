export const professionsObject = {
  doctor: { _id: '67rdca3eeb7f6fgeed471818', name: 'Доктор' },
  waiter: { _id: '67rdca3eeb7f6fgeed471820', name: 'Официант' },
  physics: { _id: '67rdca3eeb7f6fgeed471814', name: 'Физик' },
  engineer: { _id: '67rdca3eeb7f6fgeed471822', name: 'Инженер' },
  actor: { _id: '67rdca3eeb7f6fgeed471824', name: 'Актер' },
  cook: { _id: '67rdca3eeb7f6fgeed471829', name: 'Повар' }
};

export const professions = [
  { _id: '67rdca3eeb7f6fgeed471818', name: 'Доктор' },
  { _id: '67rdca3eeb7f6fgeed471820', name: 'Официант' },
  { _id: '67rdca3eeb7f6fgeed471814', name: 'Физик' },
  { _id: '67rdca3eeb7f6fgeed471822', name: 'Инженер' },
  { _id: '67rdca3eeb7f6fgeed471824', name: 'Актер' },
  { _id: '67rdca3eeb7f6fgeed471829', name: 'Повар' }
];

const loadProfessionsToStorage = async () => {
  localStorage.setItem('userProfessions', JSON.stringify(professions));
  return professions;
};

const fetchAll = () => {
  const professionsStorage = localStorage.getItem('userProfessions');
  if (professionsStorage) {
    return new Promise((resolve) => resolve(JSON.parse(professionsStorage)));
  } else {
    return new Promise((resolve) => {
      window.setTimeout(function () {
        const professions = loadProfessionsToStorage();
        resolve(professions);
      }, 2000);
    });
  }
};

export default {
  fetchAll
};
