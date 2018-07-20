/**
 * 获取变量类型
 * @param {*} value 要判断类型的变量
 * @return {String} 该变量的类型
 */
const typeOf = (value) =>
  Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();

/**
 * 判断输入是否为手机号（宽松判断）
 * @param {String, Number} phone 手机号
 * @return {Boolean} 是否为手机号
 */
const isPhone = (phone) => /^1[0-9]{10}$/.test(phone);

/**
 * 判断输入是否为身份证号（宽松判断）
 * @param {String, Number} idcard 身份证号
 * @return {Boolean} 是否为身份证号
 */
const isIdcard = (idcard) =>
  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcard);

exports = module.exports = {
  typeOf,
  isPhone,
  isIdcard
};
