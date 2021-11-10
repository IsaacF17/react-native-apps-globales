export const formatShortDate = (date: Date) => {
  const splittedDate = date
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    .split('/');
  return `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
};
