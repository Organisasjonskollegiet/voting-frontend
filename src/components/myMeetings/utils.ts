const months = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const prependZeroIfNecessary = (min: number) => {
  if (min < 10) return '0' + min.toString();
  return min.toString();
};

export const formatMeetingTime: (startTime: Date) => string = (startTime: Date) => {
  return `${prependZeroIfNecessary(startTime.getHours())}:${prependZeroIfNecessary(
    startTime.getMinutes()
  )}, ${startTime.getDate()}. ${months[startTime.getMonth()]}`;
};

const modulo = (a: number, n: number) => {
  return ((a % n) + n) % n;
};

const getTimeString = (amount: number, singular: string, plural: string) => {
  if (amount <= 0) {
    return '';
  } else if (amount === 1) {
    return `${amount.toString()} ${singular} `;
  } else {
    return `${amount.toString()} ${plural} `;
  }
};

export const formatTimeLeftToMeeting: (start: Date, now: Date) => string = (start: Date, now: Date) => {
  const days = start.getDate() - now.getDate();
  const hours = start.getHours() - now.getHours();
  const minutes = start.getMinutes() - now.getMinutes();
  const months = start.getMonth() - now.getMonth();

  // if days are negative we have to subtract one from the remaining months
  const monthsString = getTimeString(days < 0 ? modulo(months - 1, 12) : modulo(months, 12), 'måned', 'måneder');
  // if there are more than one month left we do not care about what time the meeting is and will not subtract
  // one from days left even if the last day is just 12 hours
  const daysString = getTimeString(
    monthsString === '' && (hours < 0 || (hours === 0 && minutes < 0))
      ? modulo(days - 1, daysOfMonth[modulo(start.getMonth() - 1, 12)])
      : modulo(days, daysOfMonth[modulo(start.getMonth() - 1, 12)]),
    'dag',
    'dager'
  );
  const hoursString = getTimeString(minutes < 0 ? modulo(hours - 1, 24) : modulo(hours, 24), 'time', 'timer');
  const minutesString = getTimeString(modulo(minutes, 60), 'minutt', 'minutter');
  if (monthsString !== '') {
    return (
      'Starter om ' +
      (monthsString !== '' ? monthsString + ' ' : '') +
      (monthsString !== '' && daysString !== '' ? 'og ' : '') +
      daysString
    );
  } else if (daysString !== '') {
    return (
      'Starter om ' +
      (daysString !== '' ? daysString + ' ' : '') +
      (daysString !== '' && hoursString !== '' ? 'og ' : '') +
      hoursString
    );
  } else if (hoursString !== '' || minutesString !== '') {
    return (
      'Starter om ' +
      (hoursString !== '' ? hoursString + ' ' : '') +
      (hoursString !== '' && minutesString !== '' ? 'og ' : '') +
      minutesString
    );
  } else {
    return 'Starter om under ett minutt';
  }
};
