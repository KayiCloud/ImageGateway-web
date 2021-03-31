const menulist = [
  {
    path: '/tenant',
    remark: "layout",
    name: '主页',
    redirect: '/tenant/manage',
    hidden: false,
    meta: { title: '租户管理', icon: 'iconfont icon333' },
    children: [
      {
        path: 'manage',
        name: '租户管理',
        remark: "tenant",
        hidden: false,
        meta: { title: '租户管理' },
        // children:[]
      }
    ]
  },
  {
    path: '/maptenant',
    remark: "layout",
    name: '主页',
    redirect: '/maptenant/manage',
    hidden: false,
    meta: { title: '映射编码管理', icon: 'iconfont iconguanlian1' },
    children: [
      {
        path: 'manage',
        name: '映射编码',
        remark: "maptenant",
        hidden: false,
        meta: { title: '映射编码' },
        // children:[]
      }
    ]
  },
  {
    path: '/querier',
    remark: "layout",
    name: '主页',
    redirect: '/querier/manage',
    hidden: false,
    meta: { title: 'querier管理', icon: 'iconfont iconbaifang_line' },
    children: [
      {
        path: 'manage',
        name: 'querier管理',
        remark: "querier",
        hidden: false,
        meta: { title: 'querier管理' },
        // children:[]
      }
    ]
  }
]

export default menulist
