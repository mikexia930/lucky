import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

function getUnix(datetime = '') {
  let unix = 0;
  if (datetime) {
    unix = dayjs(datetime).unix();
  } else {
    unix = dayjs().unix();
  }
  return unix * 1000;
}

function getFormatDate(datetime: any, format = 'YYYY-MM-DD') {
  return dayjs(datetime).format(format);
}

function getWeekOfYear(datetime: string) {
  return dayjs(datetime).isoWeek();
}

function getDayOfWeek(datetime: string) {
  let backData = 0;
  if (datetime) {
    backData = dayjs(datetime).isoWeekday();
  } else {
    backData = dayjs().isoWeekday();
  }
  return backData;
}

export { getUnix, getFormatDate, getWeekOfYear, getDayOfWeek };
