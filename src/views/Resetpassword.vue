<template>
  <div class="app-container rese_pwd_wrap">
    <el-card class="box-card apply-card-block">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form ref="pwdform" :rules="rules" :model="pwdform" label-width="100px">
        <el-form-item label="当前密码" prop="password">
          <el-input
            v-if="visible1"
            type="password"
            v-model="pwdform.password"
            placeholder="请输入当前密码"
          >
            <i
              slot="suffix"
              class="el-icon-view el-input__icon"
              title="显示密码"
              @click="changePass1('show')"
              style="cursor:pointer;"
            ></i>
          </el-input>
          <el-input v-else type="text" v-model="pwdform.password" placeholder="请输入当前密码">
            <i
              slot="suffix"
              class="el-icon-more el-input__icon"
              title="隐藏密码"
              @click="changePass1('hide')"
              style="cursor:pointer;"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            v-if="visible2"
            type="password"
            v-model="pwdform.pass"
            placeholder="请输入新密码（6-18位），可包含数字、大/小写字母、特殊字符"
            maxlength="18"
          >
            <i
              slot="suffix"
              class="el-icon-view el-input__icon"
              title="显示密码"
              @click="changePass2('show')"
              style="cursor:pointer;"
            ></i>
          </el-input>
          <el-input
            v-else
            type="text"
            v-model="pwdform.pass"
            placeholder="请输入新密码（6-18位），可包含数字、大/小写字母、特殊字符"
            maxlength="18"
          >
            <i
              slot="suffix"
              class="el-icon-more el-input__icon"
              title="隐藏密码"
              @click="changePass2('hide')"
              style="cursor:pointer;"
            ></i>
          </el-input>
          <div class="pwd_level">
            <div class="level_label">密码安全等级：</div>
            <div class="level_box">
              <div class="level_item" :class="level>=1?'level_item_1':''"></div>
              <div class="level_item" :class="level>=2?'level_item_2':''"></div>
              <div class="level_item" :class="level>=3?'level_item_3':''"></div>
              <div class="level_item" :class="level>=4?'level_item_4':''"></div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input
            v-if="visible3"
            type="password"
            v-model="pwdform.checkPass"
            placeholder="再次确认新密码"
            maxlength="18"
          >
            <i
              slot="suffix"
              class="el-icon-view el-input__icon"
              title="显示密码"
              @click="changePass3('show')"
              style="cursor:pointer;"
            ></i>
          </el-input>
          <el-input
            v-else
            type="text"
            v-model="pwdform.checkPass"
            placeholder="再次确认新密码"
            maxlength="18"
          >
            <i
              slot="suffix"
              class="el-icon-more el-input__icon"
              title="隐藏密码"
              @click="changePass3('hide')"
              style="cursor:pointer;"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('pwdform')"
        style="width:100px"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
// import { putSysUserChangePasswordByEncrypt } from "@/api/api.js"
// import { hex_md5 } from '@/utils/md5.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('密码不能低于6位数'))
        } else if (this.pwdform.checkPass !== '') {
          this.$refs.pwdform.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.pwdform.pass) {
        callback(new Error('两次输入新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      visible1: false,
      visible2: false,
      visible3: false,
      pwdform: {
        password: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      level: 0
    }
  },
  watch: {
    'pwdform.pass': function (val, oldVal) {
      this.level = this.AnalyzePasswordSecurityLevel(val)
    }
  },
  methods: {
    submitForm(formName) {
      const that = this

      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.loading = true
          // const params = {
          //   oldPassword: hex_md5(that.pwdform.password).toUpperCase(),
          //   newPassword: hex_md5(that.pwdform.pass).toUpperCase(),
          //   confirmPassword: hex_md5(that.pwdform.checkPass).toUpperCase()
          // }
          // putSysUserChangePasswordByEncrypt(params).then((res) => {
          //   if (res && res.code == 10000) {
          //     that.$message.success("密码修改成功！");
          //     that.pwdform.password = ''
          //     that.pwdform.pass = ''
          //     that.pwdform.checkPass = ''
          //   }
          that.loading = false
          // })
        } else {
          return false
        }
      })
    },
    AnalyzePasswordSecurityLevel(password) {
      let securityLevelFlag = 0
      if (password.length < 6) {
        return 0
      } else {
        if (/[a-z]/.test(password)) {
          securityLevelFlag++ // lowercase
        }
        if (/[A-Z]/.test(password)) {
          securityLevelFlag++ // uppercase
        }
        if (/[0-9]/.test(password)) {
          securityLevelFlag++ // digital
        }
        if (this.containSpecialChar(password)) {
          securityLevelFlag++ // specialcase
        }
        return securityLevelFlag
      }
    },
    containSpecialChar(str) {
      const containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)
      return (containSpecial.test(str))
    },
    changePass1(value) {
      this.visible1 = !(value === 'show')
    },
    changePass2(value) {
      this.visible2 = !(value === 'show')
    },
    changePass3(value) {
      this.visible3 = !(value === 'show')
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
  margin-top: 40px;
}
.pwd_level {
  overflow: hidden;
  .level_label {
    float: left;
  }
  .level_box {
    float: left;
    margin-left: 4px;
    .level_item {
      display: inline-block;
      width: 30px;
      height: 8px;
      margin-right: 2px;
      background-color: #ddd;
    }
    .level_item_1 {
      background-color: rgb(255, 8, 0);
    }
    .level_item_2 {
      background-color: rgb(255, 157, 0);
    }
    .level_item_3 {
      background-color: rgb(229, 255, 0);
    }
    .level_item_4 {
      background-color: rgb(60, 255, 0);
    }
  }
}
</style>

