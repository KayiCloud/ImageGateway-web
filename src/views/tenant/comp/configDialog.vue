<template>
  <el-dialog
    class="ky-dialog ky-dialog-maxw"
    :title="dialogTitle"
    width="600px"
    :close-on-click-modal="false"
    :visible.sync="querierDialog"
    @close="dialogClose"
  >
    <div class="ky-dlg-wrap tenant_wrap">
      <el-form
        ref="querierForm"
        v-loading="querierLoading"
        label-width="80px"
        :model="formquerier"
        :rules="rules"
      >
        <el-form-item label="租户" prop="name">
          <el-input
            clearable
            v-model="formquerier.name"
            placeholder="租户"
          ></el-input>
        </el-form-item>
        <el-form-item label="查询器" prop="dataQueryId">
          <el-select v-model="formquerier.dataQueryId" filterable>
            <el-option
              v-for="item in querierOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input
            clearable
            type="textarea"
            :rows="3"
            v-model="formquerier.describe"
            placeholder="描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="querierDialog = false">取消</el-button>
      <el-button v-if="formquerier.id" size="small" type="primary" @click="sendModify" :loading="sendLoading">修改</el-button>
      <el-button v-else size="small" type="primary" @click="sendConfig" :loading="sendLoading">配置</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getQuerierTenant,
  putGatewayConfiguration,
  postGatewayConfiguration,
  getGatewayConfigurationInfo
} from '@/api/api'
export default {
  data() {
    return {
      sendLoading: false,
      dialogTitle: '租户配置设置',
      querierDialog: false,
      querierLoading: false,
      formquerier: {
        id: '',
        name: '',
        dataQueryId: '',
        describe: ''
      },
      rules: {
        dataQueryId: [{ required: true, message: '请选择查询器！', trigger: 'change' }],
        name: [{ required: true, message: '那么不能为空！', trigger: 'blur' }]
      },
      tenantInfo: {
        id: '',
        name: '',
        extraProperties: ''
      },
      querierOptions: []
    }
  },
  methods: {
    init(tenantInfo) {
      this.querierDialog = true
      this.$nextTick(() => {
        this.$refs.querierForm.resetFields()
        if (tenantInfo) {
          // 修改的租户信息
          this.tenantInfo = { ...tenantInfo }
          this.getGatewayInfo()
          this.getQuerierOptions()
        }
      })
    },
    // 弹框关闭
    dialogClose() {
      this.formquerier.id = ''
      this.formquerier.name = ''
      this.formquerier.dataQueryId = ''
      this.formquerier.describe = ''
      this.tenantInfo = null
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
    // 新增提交
    async sendConfig() {
      const valid = await this.validateFun('querierForm')
      if (valid) {
        const params = {
          tenantId: this.tenantInfo.id,
          bodyObject: {
            tenantId: this.tenantInfo.id,
            name: this.formquerier.name,
            dataQueryId: this.formquerier.dataQueryId,
            describe: this.formquerier.describe
          }
        }
        this.sendLoading = true
        postGatewayConfiguration(params).then(res => {
          this.sendLoading = false
          if (res && res.code === 1) {
            this.$message.success('配置添加成功！')
            this.querierDialog = false
            this.$emit('tenantConfigChange')
          }
        })
      }
    },
    // 修改提交
    async sendModify() {
      const valid = await this.validateFun('querierForm')
      if (valid) {
        const params = { ...this.formquerier }
        this.sendLoading = true
        putGatewayConfiguration(params).then(res => {
          this.sendLoading = false
          if (res && res.code === 1) {
            this.$message.success('配置修改成功！')
            this.querierDialog = false
            this.$emit('tenantConfigChange')
          }
        })
      }
    },
    // 获取租户配置
    getGatewayInfo() {
      getGatewayConfigurationInfo({ tenantId: this.tenantInfo.id }).then(res => {
        if (res && res.code === 1) {
          this.formquerier = { ...res.data }
        }
      })
    },
    // querier 获取
    getQuerierOptions() {
      getQuerierTenant({ tenantId: this.tenantInfo.id }).then(res => {
        if (res && res.code === 1) {
          this.querierOptions = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tenant_wrap >>> .el-select{
  width: 100%;
}
</style>
