// const monthDayCounts = {
//   0: 31,
//   1: 28,
//   2: 31,
//   3: 30,
//   4: 31,
//   5: 30,
//   6: 31,
//   7: 31,
//   8: 30,
//   9: 31,
//   10: 30,
//   11: 31
// };

// function getMonthDayCount(month, year) {
//   const isBigYear = !(year % 4);
//   return month === 1 && isBigYear
//     ? monthDayCounts[month] + 1
//     : monthDayCounts[month];
// }

function setDateData(unixTime) {
  unixTime = typeof unixTime === 'number' ? unixTime : Number(unixTime);
  const date = unixTime ? new Date(unixTime) : new Date();
  const dateData = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  };

  return dateData;
}

function getDateDifData(today, createDay) {
  const difDateData = {
    level: 0,
    year: 0,
    month: 0,
    date: 0,
    hours: 0,
    minutes: 0
  };

  if (today.year > createDay.year) {
    difDateData.year = today.year - createDay.year;
    if (today.month < createDay.month) difDateData.year -= 1;
    if (today.month === createDay.month && today.date < createDay.date) {
      difDateData.year -= 1;
    }
  }

  if (today.month > createDay.month) {
    difDateData.month = today.month - createDay.month;
    if (today.date < createDay.date) difDateData.month -= 1;
  } else if (today.year > createDay.year && today.month !== createDay.month) {
    difDateData.month = today.month + 11 - createDay.month;
    if (today.date < createDay.date) difDateData.month -= 1;
  }

  if (today.date > createDay.date) {
    difDateData.date = today.date - createDay.date;
    if (today.hours < createDay.hours) difDateData.date -= 1;
  }

  if (today.hours > createDay.hours) {
    difDateData.hours = today.hours - createDay.hours;
    if (today.minutes < createDay.minutes) difDateData.hours -= 1;
  }

  if (today.minutes > createDay.minutes) {
    difDateData.minutes = today.minutes - createDay.minutes;
  }

  if (difDateData.year) difDateData.level++;
  if (difDateData.month) difDateData.level++;
  if (difDateData.date) difDateData.level++;
  if (difDateData.hours) difDateData.level++;
  if (difDateData.minutes) difDateData.level++;

  return difDateData;
}

export function getDescribePastTime(unixCrateDateTime) {
  const today = setDateData();
  const createDay = setDateData(unixCrateDateTime);
  const pastDateData = getDateDifData(today, createDay);

  const msgArr = [];

  const lastYearSign = Number(pastDateData.year.toString().slice(-1));
  if (lastYearSign === 1) {
    msgArr.push(`${pastDateData.year} год`);
  } else if (
    lastYearSign > 1 &&
    lastYearSign < 5 &&
    (pastDateData.year < 10 || pastDateData.year > 20)
  ) {
    msgArr.push(`${pastDateData.year} года`);
  } else if (lastYearSign > 0) {
    msgArr.push(`${pastDateData.year} лет`);
  }

  const lastMonthSign = Number(pastDateData.month.toString().slice(-1));
  if (lastMonthSign === 1) {
    msgArr.push(`${pastDateData.month} месяц`);
  } else if (
    lastMonthSign > 1 &&
    lastMonthSign < 5 &&
    (pastDateData.month < 10 || pastDateData.month > 20)
  ) {
    msgArr.push(`${pastDateData.month} месяца`);
  } else if (lastMonthSign > 0) {
    msgArr.push(`${pastDateData.month} месяцев`);
  }

  const lastDateSign = Number(pastDateData.date.toString().slice(-1));
  if (lastDateSign === 1) {
    msgArr.push(`${pastDateData.date} день`);
  } else if (
    lastDateSign > 1 &&
    lastDateSign < 5 &&
    (pastDateData.date < 10 || pastDateData.date > 20)
  ) {
    msgArr.push(`${pastDateData.date} дня`);
  } else if (lastDateSign > 0) {
    msgArr.push(`${pastDateData.date} дней`);
  }

  if (pastDateData.level === 2) {
    const lastHoursSign = Number(pastDateData.hours.toString().slice(-1));
    if (lastHoursSign === 1) {
      msgArr.push(`${pastDateData.hours} час`);
    } else if (
      lastHoursSign > 1 &&
      lastHoursSign < 5 &&
      (pastDateData.hours < 10 || pastDateData.hours > 20)
    ) {
      msgArr.push(`${pastDateData.hours} часа`);
    } else if (lastHoursSign > 0) {
      msgArr.push(`${pastDateData.hours} часов`);
    }
  }

  if (pastDateData.level === 1) {
    const lastMinutesSign = Number(pastDateData.minutes.toString().slice(-1));
    if (lastMinutesSign <= 5) {
      msgArr.push('1 минуту');
    } else if (lastMinutesSign > 5 && lastMinutesSign <= 30) {
      msgArr.push('15 минут');
    } else if (lastMinutesSign > 30 && lastMinutesSign <= 45) {
      msgArr.push('полчаса');
    } else {
      msgArr.push('45 минут');
    }
  }

  if (pastDateData.level === 0) return 'Создано: только что';

  let msg = 'добавлено:';

  for (let i = 0; i < msgArr.length; i++) {
    if (msgArr.length > 1) {
      msg += i + 1 === msgArr.length ? ' ' + 'и ' + msgArr[i] : ' ' + msgArr[i];
    } else {
      msg += ' ' + msgArr[i];
    }
  }

  return `${msg} назад`;
}
