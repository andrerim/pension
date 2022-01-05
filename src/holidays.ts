const millisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


// Adapted from https://stackoverflow.com/questions/1284314/easter-date-in-javascript
function Easter(Y: number): Date {
  var C = Math.floor(Y / 100);
  var N = Y - 19 * Math.floor(Y / 19);
  var K = Math.floor((C - 17) / 25);
  var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I = I - 30 * Math.floor(I / 30);
  I =
    I -
    Math.floor(I / 28) *
      (1 -
        Math.floor(I / 28) *
          Math.floor(29 / (I + 1)) *
          Math.floor((21 - N) / 11));
  var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
  J = J - 7 * Math.floor(J / 7);
  var L = I - J;
  var M = 3 + Math.floor((L + 40) / 44);
  var D = L + 28 - 31 * Math.floor(M / 4);

  return new Date(Y, M, D);
}

export function getHolidaysInYear(year: number): number[] {
  const holidays: Date[] = [];
  holidays.push(new Date(year, 1, 1)); // 1. nyttårsdag
  holidays.push(new Date(year, 5, 1)); // Arbeidernes dag
  holidays.push(new Date(year, 5, 17)); // Grunnlovsdagen
  holidays.push(new Date(year, 12, 24)); // Julaften
  holidays.push(new Date(year, 12, 25)); // 1. Juledag
  holidays.push(new Date(year, 12, 26)); // 2. Juledag
  holidays.push(new Date(year, 12, 31)); // Nyttårsaften

  const easterSunday = Easter(year);
  holidays.push(easterSunday); // 1. påskedag
  holidays.push(new Date(easterSunday.valueOf() - 3 * millisecondsPerDay)); // Skjærtorsdag
  holidays.push(new Date(easterSunday.valueOf() - 2 * millisecondsPerDay)); // Langfredag
  holidays.push(new Date(easterSunday.valueOf() + 1 * millisecondsPerDay)); // 2. Påskedag
  holidays.push(new Date(easterSunday.valueOf() + 39 * millisecondsPerDay)); // Kristi himmelfart
  holidays.push(new Date(easterSunday.valueOf() + 50 * millisecondsPerDay)); // Andre pinsedag

  return holidays.map(date => date.valueOf());
}
