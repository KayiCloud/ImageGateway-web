<template>
  <el-dialog
    class="ky-dialog ky-dialog-maxw"
    :title="dialogTitle"
    width="600px"
    :close-on-click-modal="false"
    :visible.sync="tenantDialog"
    @click="dialogClose"
  >
    <div class="ky-dlg-wrap">
      <el-form
        ref="tenantForm"
        v-loading="tenantLoading"
        label-width="80px"
        :model="formtenant"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="formtenant.name"
            placeholder="名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="adminEmailAddress" v-if="tenantType=='add'">
          <el-input
            v-model="formtenant.adminEmailAddress"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPassword" v-if="tenantType=='add'">
          <el-input
            type="password"
            v-model="formtenant.adminPassword"
            placeholder="密码"
          ></el-input>
          <div class="pwd_tips">密码必须包含非字母数字字符、大小字母、小写字母，且长度大于等于6位</div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="tenantDialog = false">取消</el-button>
      <el-button v-if="tenantType=='add'" size="small" type="primary" @click="sendTenant" :loading="sendLoading">添加</el-button>
      <el-button v-else size="small" type="primary" @click="sendTenantModify" :loading="sendLoading">修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  putMultiTenancyTenants,
  postMultiTenancyTenants
} from '@/api/api'
const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&#^\(\)~])[A-Za-z\d$@$!%*?&#^\(\)~]{6,}/
export default {
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'));
      } else {
        if (value.length < 6) {
          callback(new Error('密码不能低于6位数！'));
        } else if (!pwdReg.test(value)) {
          callback(new Error('密码格式不正确！'));
        }
        callback()
      }
    };
    return {
      sendLoading: false,
      tenantType: 'add',
      dialogTitle: '租户新增',
      tenantDialog: false,
      tenantLoading: false,
      formtenant: {
        name: '',
        adminEmailAddress: '',
        adminPassword: ''
      },
      tenantInfo: {
        id: '',
        name: '',
        extraProperties: {}
      },
      rules: {
        name: [{required: true, message: '名称不能为空！', trigger: 'blur'}],
        adminEmailAddress: [{required: true, message: '邮箱不能为空！', trigger: 'blur'}],
        adminPassword: [
          {required: true, message: '密码不能为空！', trigger: 'blur'},
          {validator: validatePass, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    init(type, tenantInfo){
      this.tenantType = type
      this.dialogTitle = type=='add'?'新增租户':'修改租户'
      this.tenantDialog = true
      if(tenantInfo){
        this.tenantInfo = {...tenantInfo}
        this.dialogTitle = this.dialogTitle+'【'+tenantInfo.name+'】'
      }
      this.$nextTick(()=>{
        this.$refs.tenantForm.resetFields()
        if(tenantInfo){
          this.formtenant.name = tenantInfo.name
        }
      })
    },
    dialogClose(){
      this.formtenant.name = ''
      this.formtenant.adminEmailAddress = ''
      this.formtenant.adminPassword = ''
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
    // 租户新增提交
    async sendTenant(){
      const valid = await this.validateFun('tenantForm')
      if(valid){
        const params = {...this.formtenant}
        this.sendLoading = true
        postMultiTenancyTenants(params).then(res=>{
          this.sendLoading = false
          if(res && res.code === 1){
            this.$message.success('新增成功！')
            this.tenantDialog = false
            this.$emit('tenantEditChange')
          }
        })
      }
    },
    // 租户修改提交
    async sendTenantModify(){
      const valid = await this.validateFun('tenantForm')
      if(valid){
        const params = {
          id: this.tenantInfo.id,
          name: this.formtenant.name
        }
        this.sendLoading = true
        putMultiTenancyTenants(params).then(res=>{
          this.sendLoading = false
          if(res && res.code === 1){
            this.$message.success('修改成功！')
            this.tenantDialog = false
            this.$emit('tenantEditChange')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pwd_tips{
  font-size: 12px;
  color: #999;
  line-height: 20px;
}
</style>
