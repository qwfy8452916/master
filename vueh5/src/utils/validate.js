/**
 * Created by jiachenpan on 16/11/18.
 */

// 手机号验证
export function isvalidPhone (str) {
  const reg = new RegExp('^((13[0-9])|(14[5,7,8,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$')
  return reg.test(str)
}
