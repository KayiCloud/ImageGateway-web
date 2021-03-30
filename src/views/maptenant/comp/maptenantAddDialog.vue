<template>
  <el-dialog
    class="ky-dialog ky-dialog-maxw"
    :title="dialogTitle"
    width="600px"
    :close-on-click-modal="false"
    :visible.sync="mapTenantDialog"
    @close="dialogClose"
  >
    <div class="ky-dlg-wrap tenantmap_wrap">
      <el-form
        ref="dataForm"
        v-loading="loading"
        label-width="80px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="租户" prop="tenantId">
          <el-select filterable :disabled="dialogType==='modify'" v-model="formData.tenantId">
            <el-option v-for="(item) in mx_tenantAll" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id.slice(0,8) }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="映射编码" prop="mapCode">
          <el-input
            v-model="formData.mapCode"
            placeholder="映射编码"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="mapTenantDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="send">{{dialogType=='add'?'添加':'修改'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  putMapTenant,
  postMapTenant,
  getMultiTenancyTenantInfo
} from '@/api/api'
import mxTenant from '@/mixins/tenant'
export default {
  mixins: [mxTenant],
  data(){
    return {
      dialogType: 'add',
      dialogTitle: '映射编码新增',
      mapTenantDialog: false,
      loading: false,
      formData: {
        id: '',
        tenantId: '',
        // tenantName: '',
        code: '',
        mapCode: ''
      },
      rules: {
        tenantId: [{required: true, message: '租户不能为空！', trigger: 'blur'}],
        code: [{required: true, message: '编码不能为空！', trigger: 'blur'}],
        mapCode: [{required: true, message: '映射编码不能为空！', trigger: 'blur'}]
      }
    }
  },
  created(){
    this.mx_getTenantAll()
  },
  methods: {
    init(type, tenantInfo){
      this.dialogType = type
      this.dialogTitle = type=='add'?'映射编码新增':'映射编码修改'
      this.mapTenantDialog = true
      this.$nextTick(()=>{
        this.$refs.dataForm.resetFields()
        if(tenantInfo && tenantInfo.id){
          if(this.dialogType === 'add'){
            // this.formData.tenantName = tenantInfo.name
            this.formData.tenantId = tenantInfo.id
          }else if(this.dialogType === 'modify') {
            this.formData.id = tenantInfo.id
            // this.formData.tenantName = tenantInfo.tenantName
            this.formData.tenantId = tenantInfo.tenantId
            this.formData.code = tenantInfo.code
            this.formData.mapCode = tenantInfo.mapCode
            // this.getTenantInfo()
          }
        }
      })
    },
    // 关闭回调
    dialogClose(){
      this.formData.id = ''
      // this.formData.tenantName = ''
      this.formData.tenantId = ''
      this.formData.code = ''
      this.formData.mapCode = ''
    },
    // 用于租户新增或修改的时候刷新租户数据
    refreshMxTenantAll(){
      this.mx_getTenantAll()
    },
    // 验证表单
    validateFun(formName) {
      return new Promise(async resolve => {
        let _valid = false
        await this.$refs[formName].validate((valid) => {
          _valid = valid
        })
        resolve(_valid)
      })
    },
    // 映射编码新增提交
    async send(){
      const valid = await this.validateFun('dataForm')
      if(valid){
        const params = {...this.formData}
        this.loading = true
        if(this.dialogType === 'add') {
          // 新增
          postMapTenant(params).then(res=>{
            this.loading = false
            if(res && res.code === 1){
              this.$message.success(`映射编码设置成功`)
              this.mapTenantDialog = false
              this.$emit('tenantMapSend')
            }
          })
        }else{
          // 修改
          putMapTenant(params).then(res=>{
            this.loading = false
            if(res && res.code === 1){
              this.$message.success(`映射编码修改成功`)
              this.mapTenantDialog = false
              this.$emit('tenantMapSend')
            }
          })
        }
      }
    },
    // 获取租户信息
    getTenantInfo(){
      getMultiTenancyTenantInfo({id:this.formData.tenantId}).then(res=>{
        if(res && res.code === 1){
          this.formData.tenantName = res.data.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tenantmap_wrap /deep/ .el-select{
  width: 100%;
}
</style>