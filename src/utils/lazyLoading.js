// vue components  列表数据字段名对应 Remark
const layout = import('@/layout/index.vue'); //外层框架
const home = import('@/views/Home.vue'); //主页

const tenant = import('@/views/tenant/index.vue'); // 租户管理
const maptenant = import('@/views/maptenant/index.vue'); // 映射编码管理
const querier = import('@/views/querier/index.vue'); // querier管理

function look(n) {
  switch (n) {
    case 'home':
      return home;
      break;
    case 'layout':
      return layout;
      break;
    case 'tenant':
      return tenant;
      break;
    case 'maptenant':
      return maptenant;
      break;
    case 'querier':
      return querier;
      break;

    default:
      return home;
      break;
  }
}

export default (name) => () => look(name);
