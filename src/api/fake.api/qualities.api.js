const qualities = {
  tedious: {
    _id: '67rdca3eeb7f6fgeed471198',
    name: 'Нудила',
    color: 'primary'
  },
  strange: {
    _id: '67rdca3eeb7f6fgeed471100',
    name: 'Странный',
    color: 'secondary'
  },
  buller: {
    _id: '67rdca3eeb7f6fgeed4711012',
    name: 'Троль',
    color: 'success'
  },
  alcoholic: {
    _id: '67rdca3eeb7f6fgeed471101',
    name: 'Алкоголик',
    color: 'danger'
  },
  handsome: {
    _id: '67rdca3eeb7f6fgeed471102',
    name: 'Красавчик',
    color: 'info'
  },
  uncertain: {
    _id: '67rdca3eeb7f6fgeed471103',
    name: 'Неуверенный',
    color: 'dark'
  }
};

const loadQualitiesToStorage = async () => {
  const processedQualities = Object.keys(qualities).map(
    (qualityKey) => qualities[qualityKey]
  );
  localStorage.setItem('userQualities', JSON.stringify(processedQualities));
  return processedQualities;
};

const fetchAll = () => {
  const qualitiesStorage = localStorage.getItem('userQualities');

  if (qualitiesStorage) {
    return new Promise((resolve) => resolve(JSON.parse(qualitiesStorage)));
  } else {
    return new Promise((resolve) => {
      window.setTimeout(async () => {
        const qualities = await loadQualitiesToStorage();
        resolve(qualities);
      }, 1000);
    });
  }
};

export default {
  fetchAll
};
