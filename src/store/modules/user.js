import {
  userLogin
} from '@/api/api.js'
import {
  getTokenInfo,
  setTokenInfo,
  removeTokenInfo,
  setUserInfo,
  removeUserInfo,
  setExpires,
  getExpires,
  getUserInfo,
  removeExpires,
  setMenu,
  removeMenu,
  removeTags
} from '@/utils/auth'
// import {
//   hex_md5
// } from '@/utils/md5.js'
import router from '@/router'
import MenuUtils from '@/utils/menuUtils.js'
import asyncMenu from '@/router/asyncMenu.js'
import menulistjson from '@/data/menulistjson.js'
import avatar from '@/assets/images/avatar2.jpg'
import { isLocal } from '@/settings.js'

let userNameLocal = ''
let _userInfo = getUserInfo()
let _tokenInfo = getTokenInfo()
const getDefaultState = () => {
  return {
    tokenInfo: !_tokenInfo ? '' : _tokenInfo,
    token: !_tokenInfo ? '' : _tokenInfo.access_token,
    tokenExpires: getExpires() * 1,
    userName: !_userInfo ? null : _userInfo.userName,
    avatar: avatar,
    userInfo: !_userInfo ? null : _userInfo
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKENINFO: (state, tokeninfo) => {
    state.tokenInfo = tokeninfo
    state.token = tokeninfo.access_token
    state.tokenExpires = tokeninfo.expires_in
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, info) => {
    state.userInfo = info
    state.userName = info.userName
  }
}

const actions = {
  // 用户登录
  login({
    dispatch,
    commit
  }, userInfo) {
    if (isLocal) {
      return new Promise(async (resolve, reject) => {
        await dispatch('loginLocal')
        resolve()
      })
    } else {
      // 登录逻辑
      // grant_type=password&username=admin&password=1q2w3E*&client_id=ImageGateway_App&client_secret=1q2w3e*&scope=ImageGateway
      const {
        account,
        password
      } = userInfo
      // const pwd = hex_md5(password).toUpperCase();
      return new Promise((resolve, reject) => {
        userLogin({
          grant_type: 'password',
          client_id: 'ImageGateway_App',
          client_secret: '1q2w3E*',
          scope: 'ImageGateway',
          username: account.trim(),
          password: password
        }).then(async resp => {
          if (resp && resp.code === 1) {
            userNameLocal = account
            setExpires(resp.data.expires_in)
            setTokenInfo(JSON.stringify(resp.data))
            commit('SET_TOKENINFO', resp.data)
            // 获取本地登录信息
            await dispatch('getInfoLocal')
            await dispatch('getMenuLocal')
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },

  // 刷新令牌
  setNewTokenInfo({
    commit
  }, tokeninfo) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKENINFO', tokeninfo)
      setTokenInfo(JSON.stringify(tokeninfo))
      setExpires(tokeninfo.expires_in)
      resolve()
    })
  },

  // 退出登录
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeTokenInfo() // 移除token信息
      removeUserInfo() // 移除用户信息
      removeExpires()
      removeTags()
      removeMenu()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      //     reject(error)
      // })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeTokenInfo()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 本地登录
  loginLocal({ dispatch, commit }) {
    return new Promise(async (resolve, reject) => {
      const content = {
        access_token: 'local-login-token',
        expires_in: Math.floor(new Date().getTime()) + 18000,
        token_type: 'local'
      }
      commit('SET_TOKENINFO', content)
      setTokenInfo(JSON.stringify(content))
      setExpires(content.expires_in)
      await dispatch('getInfoLocal')
      await dispatch('getMenuLocal')
      resolve()
    })
  },
  getInfoLocal({
    commit
  }) {
    return new Promise((resolve, reject) => {
      const content = {
        userName: userNameLocal || 'local',
        userCode: 'local',
        hospitalId: 'local',
        hospitalCode: 'local',
        hospitalName: 'local',
        id: 'local'
      }
      commit('SET_USERINFO', content)
      setUserInfo(JSON.stringify(content))
      resolve()
    })
  },
  getMenuLocal({
    commit
  }) {
    return new Promise((resolve, reject) => {
      // 遍历更新菜单格式
      let menuData = menulistjson
      if (menuData != null) {
        // 遍历添加本地，菜单隐藏路由配置
        menuData = menuData.map((item) => {
          const asyncMenuIdx = asyncMenu.findIndex((value) => value.path === item.path)
          if (asyncMenuIdx >= 0) {
            const _child = asyncMenu[asyncMenuIdx].children
            asyncMenu.splice(asyncMenuIdx, 1)
            item.children = item.children.concat(_child)
          }
          return item
        })
        menuData = menuData.concat(asyncMenu)

        menuData = JSON.stringify(menuData).toLowerCase() // 所有的key转换成小写
        setMenu(menuData)
      }
      router.options.routes = []
      let routes = []
      if (menuData.length > 0) {
        MenuUtils(routes, menuData)
        router.options.routes = Object.assign(
          router.options.routes,
          routes
        )
        router.addRoutes(routes)
      }
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
