const menulist = [
  {
    path: '/tenant',
    remark: "layout",
    name: '主页',
    redirect: '/tenant/manage',
    hidden: false,
    meta: { title: '租户管理', icon: 'fa fa-list' },
    children: [
      {
        path: 'manage',
        name: '租户列表',
        remark: "tenant",
        hidden: false,
        meta: { title: '租户列表' },
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
    meta: { title: '映射编码管理', icon: 'fa fa-list' },
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
    meta: { title: 'querier管理', icon: 'fa fa-list' },
    children: [
      {
        path: 'manage',
        name: 'querier列表',
        remark: "querier",
        hidden: false,
        meta: { title: 'querier列表' },
        // children:[]
      }
    ]
  }
]

export default menulist
