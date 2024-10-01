import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' //default export

export function isWeekend(date){
  const dayOfTheWeek = date.format('dddd');

  return (dayOfTheWeek === 'Sunday' || dayOfTheWeek === 'Saturday');
}

export default isWeekend;

export function formatDate(date){
  const dateObject = dayjs(date)
  let dateString = dateObject.format('dddd, MMMM D');

  const day = dateObject.get('date') % 10;
  console.log(day);

  if (day === 1) {
    dateString += 'st';
  } else if (day === 2) {
    dateString += 'nd';
  } else if (day === 3) {
    dateString += 'rd';
  } else {
    dateString += 'th';
  }
  
  return dateString;
}
