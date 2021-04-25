import { getMultiTenancyTenantsAll } from '@/api/api'
export default {
  data() {
    return {
      mx_tenantAll: []
    }
  },
  methods: {
    // 获取所有租户列表数据
    mx_getTenantAll() {
      getMultiTenancyTenantsAll().then(res => {
        if (res && res.code === 1) {
          this.mx_tenantAll = res.data
        }
      })
    }
  }
}
