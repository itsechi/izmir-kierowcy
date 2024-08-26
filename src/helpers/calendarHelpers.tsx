export const today = new Date().toISOString().split('T')[0];

export const getDayOfWeek = (dateString: Date) => {
  const date = new Date(dateString);
  const daysOfWeek = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ];
  return daysOfWeek[date.getDay()];
};

export const getMonth = (dateString: Date) => {
  const date = new Date(dateString);
  const daysOfWeek = [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz.',
    'Paź',
    'Lis',
    'Gru',
  ];
  return daysOfWeek[date.getMonth()];
};
