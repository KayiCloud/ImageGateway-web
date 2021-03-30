function Base64() {
  // private property
  var _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  // public method for encoding
  this.encode = function (input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = this._utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4)
    }
    return output
  }
  // public method for decoding
  this.decode = function (input) {
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = this._utf8_decode(output)
    return output
  }
  // private method for UTF-8 encoding
  this._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }
  // private method for UTF-8 decoding
  this._utf8_decode = function (utftext) {
    var string = ''
    var i = 0
    var c = 0
    // var c1 = 0
    var c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        var c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        )
        i += 3
      }
    }
    return string
  }
}
var b64 = new Base64();

/**
 * 浏览器低版本提示判断 （低于不包括等于）
 * ie        < 10
 * chrome    < 70，xp 系统 < 49
 * firefox   < 72，xp 系统 < 72
 *
 * ie 提示不可关闭
 * chrome, firefox 提示可关闭
 *  */

(function (b64) {
  if (!window.g || !window.g.browserOpen) { return false }
  // ie 打开页面时，唤起其它浏览器打开页面
  var isOOBrowser = window.g.isShellBrowser
  var isOOBSHow = false
  var tipsType = 'browser'
  var initParams = {
    'ie360': 'http://se.360.cn/',
    'firefox': 'http://www.firefox.com.cn/download/',
    'chrome': 'https://www.google.com.hk/chrome/'
  }
  if (window.g) {
    initParams.ie360 = window.g.ie360 ? window.g.ie360 : initParams.ie360
    initParams.firefox = window.g.firefox ? window.g.firefox : initParams.firefox
    initParams.chrome = window.g.chrome ? window.g.chrome : initParams.chrome
  }
  var isShow = localStorage.getItem('_BROWER_STATUS')
  if (isShow) { return false }

  // 获取浏览器信息
  function getBrowser() {
    var agent = navigator.userAgent.toLowerCase()
    var arr = []
    var system = agent.split(' ')[1].split(' ')[0].split('(')[1]
    arr.push(system)
    var REGSTR_EDGE = /edge\/[\d.]+/gi
    var REGSTR_IE = /trident\/[\d.]+/gi
    var OLD_IE = /msie\s[\d.]+/gi
    var REGSTR_FF = /firefox\/[\d.]+/gi
    var REGSTR_CHROME = /chrome\/[\d.]+/gi
    var REGSTR_SAF = /safari\/[\d.]+/gi
    var REGSTR_OPERA = /opr\/[\d.]+/gi

    // IE
    if (agent.indexOf('trident') > 0) {
      arr.push(agent.match(REGSTR_IE)[0].split('/')[0])
      arr.push(agent.match(REGSTR_IE)[0].split('/')[1])
      return arr
    }
    // OLD_IE
    if (agent.indexOf('msie') > 0) {
      arr.push(agent.match(OLD_IE)[0].split(' ')[0])
      arr.push(agent.match(OLD_IE)[0].split(' ')[1])
      return arr
    }
    // Edge
    if (agent.indexOf('edge') > 0) {
      arr.push(agent.match(REGSTR_EDGE)[0].split('/')[0])
      arr.push(agent.match(REGSTR_EDGE)[0].split('/')[1])
      return arr
    }
    // firefox
    if (agent.indexOf('firefox') > 0) {
      arr.push(agent.match(REGSTR_FF)[0].split('/')[0])
      arr.push(agent.match(REGSTR_FF)[0].split('/')[1])
      return arr
    }
    // Opera
    if (agent.indexOf('opr') > 0) {
      arr.push(agent.match(REGSTR_OPERA)[0].split('/')[0])
      arr.push(agent.match(REGSTR_OPERA)[0].split('/')[1])
      return arr
    }
    // Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      arr.push(agent.match(REGSTR_SAF)[0].split('/')[0])
      arr.push(agent.match(REGSTR_SAF)[0].split('/')[1])
      return arr
    }
    // Chrome
    if (agent.indexOf('chrome') > 0) {
      arr.push(agent.match(REGSTR_CHROME)[0].split('/')[0])
      arr.push(agent.match(REGSTR_CHROME)[0].split('/')[1])
      return arr
    } else {
      arr.push('未获取到浏览器信息')
      return arr
    }
  }

  // 检测Windows操作系统
  function testWin() {
    var agent = navigator.userAgent.toLowerCase()
    var p = navigator.platform.toLowerCase()
    var win = p.indexOf('win') === 0
    if (win) {
      if (/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(agent)) {
        if (RegExp['$1'] === 'nt') {
          switch (RegExp['$2']) {
            case '5.0':
              win = '2000'
              break
            case '5.1':
              win = 'XP'
              break
            case '6.0':
              win = 'Vista'
              break
            case '6.1':
              win = '7'
              break
            case '10.0':
              win = '10'
              break
            default:
              win = 'NT'
              break
          }
        } else if (RegExp['$1'] === '9x') {
          win = 'ME'
        } else {
          win = RegExp['$1']
        }
      }
      return win
    }
    return ''
  }
  // 检测是否是 IE 浏览器
  function IEVersion() {
    var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(userAgent)
      var fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return 7
      } else if (fIEVersion === 8) {
        return 8
      } else if (fIEVersion === 9) {
        return 9
      } else if (fIEVersion === 10) {
        return 10
      } else {
        return 6 // IE版本<=7
      }
    } else if (isEdge) {
      return 'edge' // edge
    } else if (isIE11) {
      return 11 // IE11
    } else {
      return -1 // 不是ie浏览器
    }
  }

  // 测试mime，判断是否360极速 浏览器
  function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true
      }
    }
    return false
  }

  // 2000、XP、7、Vista、10、NT、ME、''
  // 执行判断系统浏览器给出提示
  function _bInit() {
    var bArr = getBrowser()
    var winV = testWin()
    var isIE = IEVersion()
    // console.log('浏览器信息', bArr)
    // console.log('电脑系统', winV)
    var isActiveX = window.location.search ? window.location.search.indexOf('_shellParams') >= 0 ? 0 : 1 : 1
    var paramsB64 = window.location.search ? b64.encode(window.location.search.substring(1)) : window.location.search
    var _url = paramsB64 ? window.location.href.split('?')[0] + '?_shellParams=' + paramsB64 : window.location.href
    if (winV === 'XP') {
      if (isIE !== -1) {
        if (isOOBrowser && isIE < 11 && !!isActiveX) {
          isOOBSHow = true
          var objShell
          try {
            objShell = new ActiveXObject('WScript.Shell')
          } catch (err) {
            // console.log('err:', err)
          }
          if (objShell) {
            objShell.Run('cmd.exe /c start ' + (window.g.shellBrowser ? window.g.shellBrowser : 'chrome.exe') + ' ' + _url, 0)
          }
        }
        if (!isActiveX) {
          tipsType = 'compatible360'
        }
        // console.log('XP IE ', isIE)
        if (isIE < 10) {
          browserTips({ ie360: true, sysType: 'XP' })
        }
      } else if (bArr[1] === 'chrome') {
        // console.log('XP chrome ', bArr[2])
        if (bArr[2].split('.')[0] < 49) {
          browserTips({ ie360: true, isClose: true, sysType: 'XP' })
        }
      } else if (bArr[1] === 'firefox') {
        // console.log('XP firefox ', bArr[2])
        if (bArr[2].split('.')[0] < 72) {
          browserTips({ ie360: true, isClose: true, sysType: 'XP' })
        }
      }
    } else if (winV === '7') {
      if (isIE !== -1) {
        if (isOOBrowser && isIE < 11 && !!isActiveX) {
          isOOBSHow = true
          var objShell
          try {
            objShell = new ActiveXObject('WScript.Shell')
          } catch (err) {
            // console.log('err:', err)
          }
          if (objShell) {
            objShell.Run('cmd.exe /c start ' + (window.g.shellBrowser ? window.g.shellBrowser : 'chrome.exe') + ' ' + _url, 0)
          }
        }
        if (!isActiveX) {
          tipsType = 'compatible360'
        }
        // console.log('win7 IE ', isIE)
        if (isIE < 10) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      } else if (bArr[1] === 'chrome') {
        // console.log('win7 chrome ', bArr[2])
        if (bArr[2].split('.')[0] < 70) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      } else if (bArr[1] === 'firefox') {
        // console.log('win7 firefox ', bArr[2])
        if (bArr[2].split('.')[0] < 72) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      }
    } else if (winV === '10') {
      if (isIE !== -1) {
        if (isOOBrowser && isIE < 11 && !!isActiveX) {
          isOOBSHow = true
          var objShell
          try {
            objShell = new ActiveXObject('WScript.Shell')
          } catch (err) {
            // console.log('err:', err)
          }
          if (objShell) {
            objShell.Run('cmd.exe /c start ' + (window.g.shellBrowser ? window.g.shellBrowser : 'chrome.exe') + ' ' + _url, 0)
          }
        }
        if (!isActiveX) {
          tipsType = 'compatible360'
        }
        // console.log('win10 IE ', isIE)
        if (isIE < 10) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      } else if (bArr[1] === 'chrome') {
        // console.log('win10 chrome ', bArr[2])
        var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
        if (is360) {
          // alert('检测到是360浏览器')
        } else if (bArr[2].split('.')[0] < 70) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      } else if (bArr[1] === 'firefox') {
        // console.log('win10 firefox ', bArr[2])
        if (bArr[2].split('.')[0] < 72) {
          browserTips({
            isClose: true,
            ie360: true,
            chrome: true
          })
        }
      }
    } else {
      // console.log('除 xp、win7、win10 以外的操作系统')
    }
  }

  // 弹出框
  var addEvent = function (obj, sEv, fn) {
    if (document.addEventListener) {
      obj.addEventListener(sEv, fn, false)
    } else {
      obj.attachEvent('on' + sEv, fn)
    }
  }
  function browserTips(params) {
    var eventType = 'click' // 绑定动作
    var isClose = params.isClose || false // 是否可关闭
    var closeFun = function () { } // 关闭回调函数
    var ie360 = params.ie360 || false
    var chrome = params.chrome || false
    var firefox = params.firefox || false
    var sysType = params.sysType || null // XP系统时会传 XP
    var showAgainFun = function () {
      localStorage.setItem('_BROWER_STATUS', true)
    }

    if (sysType === 'XP' && window.g && window.g.chrome) {
      initParams.chrome = initParams.chrome + '&systemType=XP'
    }

    var tips360 = '<h4 style="text-align: left;line-height: 1.8em;margin: 10px 0;">如果是360浏览器，请切换成极速模式，操作如下：</h4><div style="font-size: 16px;color:#333;text-align:left;line-height:1.8em;">1、点击网站地址输入框后面的IE图标。<br>2、切换成闪电图标的极速模式</div>'

    var hotHtml = '<img style="margin-right:40px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAMAAADaFm2tAAAAaVBMVEUAAADySkr/Y2P0S0vyS0vyS0vzS0vzTEzzSkr0S0v0Skr1TEz1TEz3UVH/WlrySkryS0vzS0vzSkrzSkrzTEzzTEzyTU34SkrzS0vzSkrzS0vzS0vzS0vzS0v0TEzzS0vyTU30S0vySkp8Uwh1AAAAInRSTlMAtAVa896AQNObc0ovFQvy28+9e2FUKCDrxKmnppOHaVBE4hZygAAAAIlJREFUCNc9z1cShDAMA1CREEJfOtuL7n/IlRngfXgmlvJh7OJ9xql5kA0ObU7S4ZBQInYVTYLNaqGpFaDtkZKhIwsUT5T8WLMmr54ZBl70nOxH4Kim5E4tecOydAE85YVB0wOYAsnMtjdIseRkBddpJx4jgwPqtMQm4w8SEwdx/byfF+2q76r5B1AMDJgMxARjAAAAAElFTkSuQmCC"/>'
    var closeHtml = isClose ? '<span style="position:absolute;right:20px;top:20px;font-size:20px;color:#666;cursor:pointer;">&times;</span>' : ''
    var isOOBrowserHtml = isOOBSHow ? '<h5 style="margin: 30px 0 10px;"><em style="font-size:14px;color:#666;line-height:1.6em;">（如已装有推荐的浏览器，还是无法打开的情况请执行以下操作）</em><br>ie 浏览器打开时使用其它浏览器打开页面设置说明:</h5><div style="font-size: 14px;color:#666;">1、在浏览器设置里打开internet 选项 <br>2、添加受信任站点： 安全 => 受信任的站点 => 选择站点 => 添加当前地址<br>3、启用ActiveX 控件和插件：安全 => 受信任的站点 => 自定义级别 => 对标记为可安全执行脚本的ActiveX控件初始化并执行脚本 (启用)<br>4、刷新当前浏览器<br>(如果已经是360浏览器，请切换成极速模式)</div>' : ''
    var ie360Html = ie360 ? '<a href="' + initParams.ie360 + '" target="_blank" style="font-size: 18px;color:#00C0EF;font-weight:500;margin: 20px 6px;">360浏览器(极速)</a>' + hotHtml : ''
    var chromeHtml = chrome ? '<a href="' + initParams.chrome + '" target="_blank" style="font-size: 18px;color:#00C0EF;font-weight:500;margin: 20px 40px 20px 0px;">Chrome浏览器</a>' : ''
    var firefoxHtml = firefox ? '<a href="' + initParams.firefox + '" target="_blank" style="font-size: 18px;color:#00C0EF;font-weight:500;margin: 20px 40px 20px 0px;">Firefox浏览器</a>' : ''
    var browserTipsHtml = '<h4 style="text-align: left;line-height: 1.8em;margin: 10px 0;">系统检测到您使用的浏览器版本过低，为达到更好的体验效果请升级您的浏览器，<br>我们为您推荐：</h4>' +
      '<p style="text-align:left">' + ie360Html + chromeHtml + firefoxHtml +
      '</p>' +
      '<div style="text-align:left;">' +
      isOOBrowserHtml +
      '</div>'
    var _html = tipsType === 'browser' ? browserTipsHtml : tips360
    var str = '<div style="width:100%;height:100%;background-color:#000;position:fixed;left:0;top:0;z-index:200000;opacity: 0.5;"></div><div class="alert_box alert-warning" style="width: 860px;height: 390px;background-color: #fff;position: fixed;left: 50%;top: 50%;margin:-195px 0 0 -430px;z-index: 200001;font-size: 20px;text-align: center;padding: 40px;box-sizing:border-box;">' +
      _html +
      closeHtml +
      '<i style="font-size:14px;color:#666;position:absolute;right:20px;bottom:20px;cursor:pointer;font-style: initial;">不再提示</i>' +
      '</div>'

    var parentNode = document.getElementsByTagName('body')[0]
    var wrapEle = null

    wrapEle = document.createElement('div')
    wrapEle.style.display = 'block'
    wrapEle.innerHTML = str

    var curObj = parentNode.appendChild(wrapEle)
    if (isClose) {
      addEvent(curObj.getElementsByTagName('span')[0], eventType, function () {
        if (curObj) {
          curObj.parentNode.removeChild(curObj)
        }
        closeFun()
      }, false)
    }
    addEvent(curObj.getElementsByTagName('i')[0], eventType, function () {
      if (curObj) {
        curObj.parentNode.removeChild(curObj)
      }
      showAgainFun()
    }, false)
  }

  /** * 是否为mac系统（包含iphone手机） * */
  // var isMac = function () {
  //   return /macintosh|mac os x/i.test(navigator.userAgent)
  // }
  /** * 是否为windows系统 * */
  var isWindows = function () {
    return /windows|win32/i.test(navigator.userAgent)
  }
  if (isWindows) {
    _bInit()
  }
})(b64)
