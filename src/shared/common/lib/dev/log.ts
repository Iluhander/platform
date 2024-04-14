const getCurrentMoment = () => {
  const date = new Date();
  const moment = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

  return moment;
}

export const P = (num: number | string = Math.random(), data?: any) => {
  console.log(`%c ${num} %c (${getCurrentMoment()})`, 'background-color: white; color: black; font-weight: bolder; border-radius: 2px', 'color: gray');

  if (data !== undefined) {
    console.log('Data:');
    console.log(data); 
  }
}

export const D: typeof P = (...args) => {
  console.log('\n\n');
  console.log(`%c> ${getCurrentMoment()}`, 'font-size: 20px')
  return P(...args);
}

export const D1: typeof P = (...args) => {
  console.log('\n\n');
  console.log(`%c> ${getCurrentMoment()}`, 'font-size: 20px; color: steelblue');
  return P(...args);
}
