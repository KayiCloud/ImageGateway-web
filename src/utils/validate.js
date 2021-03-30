/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * 判断数据是否为空
 * @param {string} obj 
 * @returns {Boolean}
 */
export function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "" || obj == "null") {
    return true;
  } else {
    return false;
  }
}
/**
 * 默认返回yyyy-MM-dd HH-mm-ss
 * 可传第二个参数false，返回yyyy-MM-dd
 * 可传第三个参数，true 返回yyyy年MM月dd日
 * @param {*} str 
 */
export function dateFormatter(str) {
  var hasTime = arguments[1] != false ? true : false;
  var hasType = arguments[2];
  var d = (typeof str === 'string' && str.indexOf('-') > 0) ? new Date(str.replace(/\-/g, '/')) : new Date(str)
  var year = d.getFullYear();
  var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  if (hasTime) {
    if (hasType) {
      return `${month}月${day}日 ${hour}时${minute}分${second}秒`;
    }

    return [year, month, day].join('-') + " " + [hour, minute, second].join(':');

  } else {
    if (hasType) {
      return `${month}月${day}日`;
    }
    return [year, month, day].join('-');
  }
}
/**
 * 默认返回 [yyyy-MM-01,yyyy-MM-dd]   整月时间
 * @param {*} date 
 * @param {Boolean} hasTime 
 */
export function getTotalMonth(date, hasTime = false) {
  let newDate = (typeof date === 'string' && date.indexOf('-') > 0) ? new Date(date.replace(/\-/g, '/')) : new Date(date)
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
  var hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
  var minute = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
  var second = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
  let timestamp = new Date(`${year}/${newDate.getMonth() + 2}/01`).getTime() - 24 * 60 * 60 * 1000;

  if (hasTime) {
    return [`${year}-${month}-01 ${hour}:${minute}:${second}`, dateFormatter(timestamp, true)];
  } else {
    return [`${year}-${month}-01`, dateFormatter(timestamp, false)];
  }

}
/**
 * 身份证号校验
 * @param {string} value 
 * @returns {Boolean}
 */
export function isIdCard(value) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}
/**
 * 电话好号码（手机号及固定电话）验证
 * @param {string} value 
 * @returns {Boolean}
 */
export function isPhone(value) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)
}
export function isMobilePhone(value) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
}

export function imgReg(file) {
  return /\.(png|jpg|gif|jpeg)$/.test(file)
}
