<template>
  <div class="ky-container">
    <el-card shadow="hover" class="ky-card-xs ky-card-hdbg">
      <el-form
        :inline="true"
        :model="formdata"
        class="ky-form-inline-sm ky-form-ipt-width"
        label-width="70px"
      >
        <el-form-item label="租户">
          <el-input
            v-model="formdata.tenantName"
            placeholder="租户"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTenant" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="" plain @click="addTenant" icon="el-icon-plus"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="ky-card mt-10">
      <el-table class="ky-table" :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
        <el-table-column prop="name" label="租户"></el-table-column>
        <!-- <el-table-column prop="extraProperties" label="extraProperties">
          <template slot-scope="scope">
            <span v-if="scope.row.extraProperties.id">{{scope.row.extraProperties}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="220px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="tenantConfigEdit(scope.row)">配置</el-button>
            <el-button type="text" @click="modifyTenant(scope.row)">修改</el-button>
            <el-button type="text" @click="mapTenant(scope.row)">映射</el-button>
            <el-button type="text" class="ky-btntxt-danger" @click="delTenant(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <paginationCont
      :total="totalCount"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="searchTenant"
    />
    <!-- 租户新增、修改 -->
    <tenantAddDialog ref="tenantAddDialog" @tenantEditChange="tenantEditChange"></tenantAddDialog>
    <!-- 租户配置 -->
    <tenantConfig ref="tenantConfig" @tenantConfigChange="getTenantList"></tenantConfig>
    <!-- 租户编码映射 -->
    <tenantMap ref="tenantMap" @tenantMapSend="getTenantList"></tenantMap>
  </div>
</template>

<script>
import {
  deleteMultiTenancyTenants,
  getMultiTenancyTenants
} from '@/api/api'
import paginationCont from '@/components/Pagination'
import tenantAddDialog from './comp/tenantAddDialog'
import tenantConfig from './comp/configDialog'
import tenantMap from '../maptenant/comp/maptenantAddDialog'
export default {
  components: {
    paginationCont,
    tenantAddDialog,
    tenantConfig,
    tenantMap
  },
  data() {
    return {
      loading: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      formdata: {
        tenantName: ''
      }
    }
  },
  created(){
    this.getTenantList()
  },
  methods: {
    // 搜索
    searchTenant(){
      this.currentPage = 1
      this.getTenantList()
    },
    // 租户列表数据请求
    getTenantList(){
      const params = {
        SkipCount: this.currentPage-1,
        MaxResultCount: this.pageSize
      }
      this.loading = true
      getMultiTenancyTenants(params).then(res=>{
        this.loading = false
        if(res && res.code === 1){
          this.tableData = res.data.items
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 映射
    mapTenant(row){
      this.$refs.tenantMap.init('add', row)
    },
    // 新增
    addTenant(){
      this.$refs.tenantAddDialog.init('add')
    },
    // 修改
    modifyTenant(row){
      this.$refs.tenantAddDialog.init('modify', row)
    },
    // 修改、新增弹框回调
    tenantEditChange(){
      this.searchTenant()
      this.$refs.tenantMap.refreshMxTenantAll()
    },
    // 配置
    tenantConfigEdit(row){
      this.$refs.tenantConfig.init(row)
    },
    // 删除
    delTenant(row){
      if(row.id){
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: row.id
          }
          this.loading=true
          deleteMultiTenancyTenants(params).then(res=>{
            this.loading=false
            if(res && res.code === 1){
              this.$message.success('租户删除成功！')
              this.searchTenant()
            }
          })
        }).catch(() => {})
      }else{
        this.$message.warning('该租户不存在~')
      }
    }
  }
}
</script>

<style>

</style>