const getCurrentDate = (fromDate: Date = new Date()) => {
  const day = fromDate.getDate();
  const month = fromDate.getMonth() + 1;

  const dayStr = day < 10 ? `0${day}` : day.toString();
  const monthStr = month < 10 ? `0${month}` : month.toString();

  return `${dayStr}.${monthStr}.${fromDate.getFullYear()}`;
}

export default getCurrentDate;
