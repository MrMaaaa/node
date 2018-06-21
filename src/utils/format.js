/**
 * 
 * @param {String, Number} date 日期参数
 * @param {String} format 格式化文本
 * @return {String} 格式化后的日期
 */
const formatDate = (date, format = 'yyyy-mn-dd hh:mm:ss') => {
  const d = date ? new Date(date) : new Date();
  if (isNaN(d.getFullYear())) return '';
  const addZero = (v) => (v.toString().length < 2 ? '0' + v : v);

  return format
    .replace('yyyy', d.getFullYear())
    .replace('mn', addZero(d.getMonth() + 1))
    .replace('dd', addZero(d.getDate()))
    .replace('hh', addZero(d.getHours()))
    .replace('mm', addZero(d.getMinutes()))
    .replace('ss', addZero(d.getSeconds()));
};

/**
 * 
 * @param {Number} seconds 倒计时秒数
 * @param {String} format 格式化文本
 * @return {String} 格式化后的倒计时
 */
const formatCountdown = (seconds, format = 'hh:mm:ss') => {
  const addZero = (v) => (v.toString().length < 2 ? '0' + v : v);
  const hour = Math.floor(seconds / 60 / 60);
  const min = Math.floor((seconds - hour * 60 * 60) / 60);
  const sec = seconds - hour * 60 * 60 - min * 60;
  return format
    .replace('hh', addZero(hour))
    .replace('mm', addZero(min))
    .replace('ss', addZero(sec));
};

exports = module.exports = {
  formatDate,
  formatCountdown
};
