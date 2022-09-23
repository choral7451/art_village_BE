export class DateService {
  getDate() {
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toString();
    const current = koreaNow.split(' ');

    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${current[3]}-${String(month.indexOf(current[1]) + 1).padStart(
      2,
      '0',
    )}-${current[2]} ${current[4]}`;
  }
}
