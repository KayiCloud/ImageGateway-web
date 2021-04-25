<template>
  <div class="ky-container">
    <el-card shadow="hover" class="ky-card-xs ky-card-hdbg">
      <el-form
        :inline="true"
        :model="formdata"
        class="ky-form-inline-sm ky-form-ipt-width"
        label-width="70px"
      >
        <el-form-item label="租户Id">
          <el-input
            clearable
            v-model="formdata.TenantId"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input
            clearable
            v-model="formdata.Code"
          ></el-input>
        </el-form-item>
        <el-form-item label="映射编码">
          <el-input
            clearable
            v-model="formdata.MapCode"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            icon="el-icon-search"
          >查询</el-button
          >
          <el-button
            type=""
            plain
            @click="addMapTenant"
            icon="el-icon-plus"
          >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="ky-card mt-10">
      <el-table v-loading="loading" class="ky-table" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="tenantId" label="租户ID" width="320px"></el-table-column>
        <el-table-column prop="code" label="编码" width="220px"></el-table-column>
        <el-table-column prop="mapCode" label="映射编码" min-width="220px"></el-table-column>
        <!-- <el-table-column prop="tenantId" label="tenantId"></el-table-column> -->
        <el-table-column label="操作" width="160px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyMap(scope.row)">修改</el-button>
            <el-button type="text" class="ky-btntxt-danger" @click="delMap(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <paginationCont
      :total="totalCount"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="search"
    />
    <!-- 租户编码映射 -->
    <tenantMap ref="tenantMap" @tenantMapSend="getList"></tenantMap>
  </div>
</template>

<script>
import {
  deleteMapTenant,
  getMapTenant
} from '@/api/api'
import paginationCont from '@/components/Pagination'
import mix_dateFormatter from '@/mixins/dateFormatter'
import tenantMap from './comp/maptenantAddDialog'
export default {
  components: {
    paginationCont,
    tenantMap
  },
  mixins: [mix_dateFormatter],
  data() {
    return {
      loading: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      formdata: {
        Code: '',
        TenantId: '',
        MapCode: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 搜索
    search() {
      this.currentPage = 1
      this.getList()
    },
    // 列表数据请求
    getList() {
      const params = {
        Code: this.formdata.Code,
        TenantId: this.formdata.TenantId,
        MapCode: this.formdata.MapCode,
        SkipCount: this.currentPage - 1,
        MaxResultCount: this.pageSize
      }
      this.loading = true
      getMapTenant(params).then(res => {
        this.loading = false
        if (res && res.code === 1) {
          this.tableData = res.data.items
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 新增
    addMapTenant() {
      this.$refs.tenantMap.init('add')
    },
    // 修改
    modifyMap(row) {
      if (row.id) {
        this.$refs.tenantMap.init('modify', row)
      } else {
        this.$message.warning('该编码映射不存在~')
      }
    },
    // 删除
    delMap(row) {
      if (row.id) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          deleteMapTenant({ id: row.id }).then(res => {
            this.loading = false
            if (res && res.code === 1) {
              this.$message.success('删除成功~')
              this.getList()
            }
          })
        }).catch(() => {})
      } else {
        this.$message.warning('该编码映射不存在~')
      }
    }
  }
}
</script>

<style>

</style>
