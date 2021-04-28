import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import MenuUtils from '@/utils/menuUtils.js'
import { getMenu } from '../utils/auth'

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.NODE_ENV === 'mode' ? '/query/' : '/',
  // base: '/query/',
  routes
})

const router = createRouter()

// 在路由跳转的时候同一个路由多次添加是不被允许的
// 重写路由的push方法
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 判断是否已存在菜单列表
var menuData = getMenu()
if (menuData) {
  let routes = []
  MenuUtils(routes, JSON.stringify(menuData))
  router.options.routes = Object.assign(router.options.routes, routes)
  router.addRoutes(routes)
}

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
