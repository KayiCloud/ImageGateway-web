import bus from '@/api/bus.js'
import router from '@/router'
import store from '@/store'
import { getTokenInfo, getMenu, getExpires } from '@/utils/auth'
// import getPageTitle from '@/utils/getPageTitle'
import enc from '@/utils/enc'
import { isLocal } from '@/settings.js'

// 白名单
const whiteList = ['/login']
const noRedirectlist = ['/home', '/404', '/']

const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
const expiresCalculation = () => {
  const expires = getExpires() || 0
  const nDate = new Date()
  const nTime = nDate.getTime()
  const nTimeSecond = Math.floor(nTime / 1000)
  const expTime = expires - nTimeSecond
  console.log(expTime)
  return expTime
}

router.beforeEach(async (to, from, next) => {
  // 设置title
  // document.title = getPageTitle(to.meta.title)
  // 判断用户是否登录
  const hasToken = !!getTokenInfo()
  if (isLocal) {
    next()
    return
  }
  console.log(to.path)
  // 中台跳转
  if (to.path === '/consultationLogin') {
    const _aestoken = to.query.token
    if (_aestoken) {
      const _tokenObj = JSON.parse(enc.AESDecrypt(decodeURIComponent(_aestoken)))
      await store.dispatch('user/setNewTokenInfo', _tokenObj)
    }
    next({ path: '/' })
    return
  }

  const query = to.query
  // let redirect = ''
  let otherQuery = null
  if (query) {
    // redirect = to.path
    otherQuery = getOtherQuery(query)
  }

  if (hasToken) {
    if (expiresCalculation() < 0) {
      // token 过期，退出登录
      await store.dispatch('user/logout')
      next({
        path: '/login',
        query: { ...otherQuery, 'redirect': to.path }
      })
    } else if (to.path === '/login') {
      await store.dispatch('user/getInfoLocal')
      await store.dispatch('user/getMenuLocal')
      next(`/`)
    } else {
      const _menu = getMenu()
      if (_menu === '[]' || !_menu) {
        // 如果菜单为空，判断为无菜单权限。
        await store.dispatch('user/logout')
        bus.$message.warning('您还没有权限，请联系管理员！')
        next({
          path: '/login',
          query: { ...otherQuery, 'redirect': to.path }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (noRedirectlist.indexOf(to.path) !== -1) {
        next(`/login`)
      } else {
        next({
          path: '/login',
          query: { ...otherQuery, 'redirect': to.path }
        })
      }
    }
  }
})
