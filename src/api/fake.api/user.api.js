import { professionsObject as professions } from './professions.api';

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    profession: professions.doctor,
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
    profession: professions.doctor,
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
    profession: professions.doctor,
    qualities: ['67rdca3eeb7f6fgeed4711012'],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    profession: professions.waiter,
    qualities: ['67rdca3eeb7f6fgeed471103'],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    profession: professions.physics,
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471198'],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    profession: professions.physics,
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471103'],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    profession: professions.engineer,
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471198'],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    profession: professions.engineer,
    qualities: ['67rdca3eeb7f6fgeed471102'],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    profession: professions.cook,
    qualities: ['67rdca3eeb7f6fgeed471100', '67rdca3eeb7f6fgeed471103'],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    profession: professions.cook,
    qualities: ['67rdca3eeb7f6fgeed471102', '67rdca3eeb7f6fgeed4711012'],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    profession: professions.actor,
    qualities: ['67rdca3eeb7f6fgeed471103', '67rdca3eeb7f6fgeed471100'],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    profession: professions.actor,
    qualities: ['67rdca3eeb7f6fgeed471102'],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users);
    }, 2000);
  });

const fetchUserById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const user = users.find((user) => user._id === id);
      resolve(user);
    }, 2000);
  });

export default {
  fetchAll,
  fetchUserById
};
