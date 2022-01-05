import { getHolidaysInYear } from "./holidays";

const millisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export function calculateWorkingDays(endDate: Date): number {
  let startDate = new Date();
  if (startDate.getHours() > 17) {
    /* if the clock has passed 17, set the start day to the next day */
    startDate = new Date(startDate.valueOf() + millisecondsPerDay);
    startDate.setHours(0, 0, 0);
  }
  endDate.setHours(23, 59, 59); // make sure the end of the endate is always at the end of the day

  if (endDate <= startDate) {
    return 0;
  }

  let workingDays = 0; 

  let yearsInSpan = 0 // used to calculate vacation days
  let year = startDate.getFullYear();
  let holidaysInYear = getHolidaysInYear(year);
  for (let i = startDate.valueOf(); i < endDate.valueOf(); i += millisecondsPerDay){
    const date = new Date(i);
    if (date.getFullYear() !== year){
      year = date.getFullYear(); 
      holidaysInYear = getHolidaysInYear(year);
      
    }
    if (workingDays % 260 === 0 && workingDays !== 0) {
      // each "årsverk" subtract 25 days of vacation
      yearsInSpan += 1;  
    }

    if (!(holidaysInYear.includes(date.setHours(0,0,0,0).valueOf()) || date.getDay() === 0 || date.getDay() === 6)) {
      workingDays += 1;
    } 
  }

  return workingDays - (yearsInSpan * 25);
}
