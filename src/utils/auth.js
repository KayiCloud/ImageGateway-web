import Cookies from 'js-cookie'
import enc from "@/utils/enc"

const TokenInfo = 'IGW-TOKENINFO'
const UserInfo = 'IGW-USERINFO'
const Expires = 'IGW-EXPIRES'
const userMenu = 'IGW-USERMENU'
const Tags = 'IGW-TAGS'
const getLocalInfo = function (key) {
  const _info = localStorage.getItem(key);
  const infoStr = !_info ? null : JSON.parse(aesEec(_info))
  return infoStr;
}
const getCookieInfo = function (key) {
  const _info = Cookies.get(key)
  const infoStr = !_info ? null : JSON.parse(aesEec(_info))
  return infoStr;
}
// 加密
const aesEnc = function (val) {
  return decodeURIComponent(enc.AESEncrypt(val))
}
// 解密
const aesEec = function (val) {
  return enc.AESDecrypt(decodeURIComponent(val))
}
//Token 信息
export function getTokenInfo() {
  return getCookieInfo(TokenInfo)
}
export function setTokenInfo(tokenInfo) {
  return Cookies.set(TokenInfo, aesEnc(tokenInfo))
}
export function removeTokenInfo() {
  return Cookies.remove(TokenInfo)
}
//Token 时间戳
export function setExpires(expires) {
  const _exp = Math.floor((new Date().getTime() + expires)/1000)
  return Cookies.set(Expires, aesEnc(_exp))
}
export function getExpires() {
  return getCookieInfo(Expires)
}
export function removeExpires() {
  return Cookies.remove(Expires)
}
// 用户信息
export function getUserInfo() {
  return getLocalInfo(UserInfo)
}
export function setUserInfo(info) {
  return localStorage.setItem(UserInfo, aesEnc(info))
}
export function removeUserInfo() {
  return localStorage.removeItem(UserInfo)
}
// 用户菜单
export function getMenu() {
  return getLocalInfo(userMenu)
}
export function setMenu(info) {
  return localStorage.setItem(userMenu, aesEnc(info))
}
export function removeMenu() {
  return localStorage.removeItem(userMenu)
}
//用户操作权限
export function getTags() {
  return getLocalInfo(Tags)
}
export function setTags(tags) {
  return localStorage.setItem(Tags, aesEnc(tags))
}
export function removeTags() {
  return localStorage.removeItem(Tags)
}
