import moment from "moment";

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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

export const getMonth = (month: number) => {
  return months[month];
}

export const generateWeeksInfo = (startDate: any, weeksNumber: number) => {
  const data : any [] = [];
  let date = moment(startDate);

  for (let i=0; i<weeksNumber; i++){
    let toDate = moment(date).add(7, 'days');
    const week = `${date.format('MM/DD/YY')} - ${toDate.format('MM/DD/YY')}`;
    data.push({[week]: {}});
    date = moment(toDate).add(1, 'days');
  }
  //console.log(data);
  
  return data; 
}