/**
 * 监听页面显示、隐藏（跳出当前页窗口）
 * cb 回调函数
 * @param {*} cb
 */
export function ListenerVisibilityChange(cb) {
  this.visiFun = function (cb) {
    var hiddenProperty = 'hidden' in document ? 'hidden'
      : 'webkitHidden' in document ? 'webkitHidden'
        : 'mozHidden' in document ? 'mozHidden'
          : 'msHidden' in document ? 'msHidden'
            : 'oHidden' in document ? 'oHidden'
              : null
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    var onVisibilityChange = function () {
      if (!document[hiddenProperty]) {
        // 显示返回
        cb()
      }
    }
    if (typeof document.addEventListener !== 'undefined') {
      // window.addEventListener('load',rollover,false);
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    } else {
      document.attachEvent(visibilityChangeEvent, onVisibilityChange)
    }
  }
}
