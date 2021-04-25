window.g = {
  TITLE: '无极云转发管理', // 项目名称
  PLATFORM: '', // 平台
  AXIOS_TIMEOUT: 10000, // 请求超时时间，默认 10000
  API_ROOT: 'http://192.168.0.50:14200', // api地址
  LOGIN: 'http://localhost:4200/login', // 项目部署后的登录地址

  browserOpen: true, // 兼容弹框是否开启 默认开启  http://ip:9006/downloadBrowser?browserName=chrome
  ie360: '', // 配置 360浏览器安装包下载地址，不填默认 http://se.360.cn/
  firefox: '', // 配置 firefox浏览器安装包下载地址，不填默认 http://www.firefox.com.cn/download/
  chrome: '', // 配置 chrome浏览器安装包下载地址，不填默认 https://www.google.com.hk/chrome/
  isShellBrowser: true, // 是否开启在ie浏览器打开页面后唤起新浏览器打开页面
  shellBrowser: '360chrome.exe' // 唤起新的浏览器 ie360.exe
}