// startDate('2022-06-26') -->> 'Dom'
const startDate = (whenIn) =>
  ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][new Date(whenIn).getDay()];

//textMonthin('2022-06-22') -->> 'Jun'
const textMonthin = (whenIn) =>
  [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ][new Date(whenIn).getMonth()];

const endDate = (whenOut) =>
  ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][new Date(whenOut).getDay()];

const textMonthout = (whenOut) =>
  [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ][new Date(whenOut).getMonth()];

export function WhenInWhenOut(whenIn, whenOut) {
  let dayNumIn = new Date(whenIn).getDate();
  let startDateCard =
    startDate(whenIn) + " " + dayNumIn + "-" + textMonthin(whenIn);
  let dayNumOut = new Date(whenOut).getDate();
  let endDateCard =
    endDate(whenOut) + " " + dayNumOut + "-" + textMonthout(whenOut);
  // let dateService = "";
  if (startDateCard === endDateCard) {
    return startDateCard;
  } else {
    return startDateCard + " - " + endDateCard;
  }
}

//Cuando Hora
export function startTimeEndTime(startTime, endTime) {
  let startHour = startTime + ":00";
  let endHour = endTime + ":00";
  //   let hourService = "";
  if (startHour === endHour) {
    return startHour;
  } else {
    return startHour + " - " + endHour;
  }
}
