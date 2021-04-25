<template>
  <div class="ky-container">
    <el-card shadow="hover" class="ky-card-xs ky-card-hdbg">
      <el-form
        :inline="true"
        :model="formdata"
        class="ky-form-inline-sm ky-form-ipt-width"
        label-width="70px"
      >
        <el-form-item label="名称">
          <el-input
            clearable
            v-model="formdata.Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="查询方式">
          <el-input
            clearable
            v-model="formdata.Provider"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuerier" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="" plain @click="addTenant" icon="el-icon-plus"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="ky-card mt-10">
      <el-table v-loading="loading" class="ky-table" :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" label-width="240px" class="querier-table-expand">
              <el-form-item v-for="(item, index) in props.row.items" :key="index" :label="item.name">
                <span>{{ item.value }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
        <el-table-column prop="name" label="名称" width="220px"></el-table-column>
        <el-table-column prop="title" label="标题" width="220px"></el-table-column>
        <el-table-column prop="provider" label="查询方式" width="100px"></el-table-column>
        <el-table-column prop="style" label="样式" width="180px" :formatter="styleFlr"></el-table-column>
        <!-- <el-table-column prop="tenantId" label="tenantId"></el-table-column> -->
        <el-table-column prop="creationTime" label="创建时间" min-width="160px" :formatter="mix_tableDateFormatter"></el-table-column>
        <!-- <el-table-column prop="creatorId" label="创建ID"></el-table-column> -->
        <!-- <el-table-column prop="isMultiTenant" label="isMultiTenant"></el-table-column> -->
        <!-- <el-table-column prop="lastModificationTime" label="lastModificationTime"></el-table-column>
        <el-table-column prop="lastModifierId" label="lastModifierId"></el-table-column> -->
        <el-table-column label="操作" width="160px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyQuerier(scope.row)">修改</el-button>
            <el-button type="text" class="ky-btntxt-danger" @click="delQuerier(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <paginationCont
      :total="totalCount"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="searchQuerier"
    />
    <querierAddDialog ref="querierAddDialog" @sendQuerierEdit="sendQuerierEdit"></querierAddDialog>
  </div>
</template>

<script>
import {
  deleteQuerier,
  getQuerier
} from '@/api/api'
import paginationCont from '@/components/Pagination'
import mix_dateFormatter from '@/mixins/dateFormatter'
import querierAddDialog from './comp/querierAddDialog'
export default {
  components: {
    paginationCont,
    querierAddDialog
  },
  mixins:[mix_dateFormatter],
  data() {
    return {
      loading: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      formdata: {
        Name: '',
        Provider: ''
      }
    }
  },
  created(){
    this.getQuerierList()
  },
  methods: {
    // 搜索
    searchQuerier(){
      this.currentPage = 1
      this.getQuerierList()
    },
    // 租户列表数据请求
    getQuerierList(){
      const params = {
        Name: this.formdata.Name,
        Provider: this.formdata.Provider,
        SkipCount: this.currentPage-1,
        MaxResultCount: this.pageSize
      }
      this.loading = true
      getQuerier(params).then(res=>{
        this.loading = false
        if(res && res.code === 1){
          this.tableData = res.data.items
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 新增
    addTenant(){
      this.$refs.querierAddDialog.init('add')
    },
    // 修改
    modifyQuerier(row){
      if(row.id){
        this.$refs.querierAddDialog.init('modify', row)
      }else{
        this.$message.warning('该 querier 不存在')
      }
    },
    // 删除
    delQuerier(row){
      if(row.id){
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          deleteQuerier({id: row.id}).then(res=>{
            this.loading = false
            if(res && res.code === 1){
              this.$message.success('删除成功~')
              this.getQuerierList()
            }
          })
        }).catch(() => {})
      }else{
        this.$message.warning('该 querier 不存在')
      }
    },
    // querier 编辑返回
    sendQuerierEdit(){
      this.getQuerierList()
    },
    // style 
    styleFlr(a, b, val){
      switch(val){
        case 1:
          return 'StudyInstanceUID'
        case 2:
          return 'AccessionNo(访问号)'
        default:
          return val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.querier-table-expand >>> .el-form-item{
  margin-bottom: 0;
}
</style>
