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

export function giveMeCurrentDate(SQLFormat = false) {
  let date = new Date();
  let month = date.getMonth() + 1;
  month < 10 ? (month = "0" + String(month)) : String(month);
  let day = date.getDate();
  day < 10 ? (day = "0" + String(day)) : String(day);
  if (SQLFormat) {
    return date.getFullYear() + "-" + month + "-" + day;
  } else {
    return day + "-" + month + "-" + date.getFullYear();
  }
}

export function giveMeCurrentDateAsOBJECT() {
  let date = new Date();
  let month = date.getMonth() + 1;
  month < 10 ? (month = "0" + String(month)) : String(month);
  let day = date.getDate();
  day < 10 ? (day = "0" + String(day)) : String(day);
  return {
    day: String(day),
    month: String(month),
    year: String(date.getFullYear()),
  };
}

export function giveMeCurrentHour() {
  let date = new Date();
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// dateToStringyyyyMMdd(20,06,2022) -->> '20220620'
export function dateToStringyyyyMMdd(day, month, year) {
  try {
    day = Number(day);
    month = Number(month);
    year = Number(year);
    let dayString = Number(day) < 10 ? "0" + String(day) : String(day);
    let monthString = Number(month) < 10 ? "0" + String(month) : String(month);
    let yearString = String(year);
    return yearString + monthString + dayString;
  } catch (error) {
    return error.message;
  }
}

//daysBetweenTwoStringDates('20220101','20220201') -->> 31
export function daysBetweenTwoStringDates(yyyyMMdd_old, yyyyMMdd_new) {
  try {
    let oldDate = {
      year: yyyyMMdd_old.substring(0, 4),
      month: yyyyMMdd_old.substring(4, 6),
      day: yyyyMMdd_old.substring(6, 8),
    };
    let newDate = {
      year: yyyyMMdd_new.substring(0, 4),
      month: yyyyMMdd_new.substring(4, 6),
      day: yyyyMMdd_new.substring(6, 8),
    };
    let dateString1 =
      oldDate.year + "-" + oldDate.month + "-" + oldDate.day + " 01:00:00";
    let dateString2 =
      newDate.year + "-" + newDate.month + "-" + newDate.day + " 01:00:00";

    let date1 = new Date(dateString1);
    let date2 = new Date(dateString2);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  } catch (error) {
    return error.message;
  }
}

// addOneMonthToGivenyyyyMMdd('20221201') -->> '20230101'
export function addOneMonthToGivenyyyyMMdd(yyyyMMdd) {
  let obj = {
    year: yyyyMMdd.substring(0, 4),
    month: yyyyMMdd.substring(4, 6),
    day: yyyyMMdd.substring(6, 8),
  };
  if (Number(obj.month) < 12) {
    if (Number(obj.month) < 10) {
      obj.month = "0" + String(Number(obj.month) + 1);
    } else {
      obj.month = String(Number(obj.month) + 1);
    }
  } else if (Number(obj.month) === 12) {
    obj.month = "01";
    obj.year = String(Number(obj.year) + 1);
  }
  return obj.year+obj.month+obj.day;
}

