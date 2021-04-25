<template>
  <div id="container">
    <div class="fx_paper">
      <div class="fx_wrap login_wrap">
        <h3 class="fx_h3">
          <template v-if="systemName">
            <img class="logo_xs" src="~@/assets/images/logo-light.png">
            <el-divider direction="vertical"></el-divider>
            <span class="title">{{systemName}}</span>
          </template>
          <img v-else class="logo" src="~@/assets/images/logo-light.png"/>
        </h3>
        <div class="mid_line"></div>
        <div class="form_wrap">
          <el-form label-width="70px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="account">
              <el-input id="form-username" v-model="ruleForm.account" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item class="btn" label-width="0px">
              <el-button
                :loading="logining"
                type="primary"
                @click="handleSubmit">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    return {
      systemName: window.g ? window.g.TITLE : '',
      logining: false,
      collapsed: false,
      ruleForm: {
        account: 'admin',
        password: '1q2w3E*'
      },

      rules: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      visible: true,
      redirect: '',
      otherQuery: '',
      corpId: 'dingd55b04400e53d11cbc961a6cb783455b',
      code: ''
    }
  },
  created() {
    this.keyupSubmit() // 回车登录
  },
  mounted() {
    if (document.documentElement.clientWidth <= 750) {
      // 移动端适配
      this.collapsed = true
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      }
    }
  },
  methods: {
    handleOpen() {
      this.$nextTick(function () {
        let doc = document.getElementById('codeInput')
        doc.focus()
      })
    },
    keyupSubmit() {
      // 回车登录
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.handleSubmit()
        }
      }
    },
    handleSubmit() {
      let that = this

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true
          var loginParams = {
            account: this.ruleForm.account,
            password: this.ruleForm.password
          }

          that.$store
            .dispatch('user/login', loginParams)
            .then(res => {
              // 登录成功
              // that.$message.success("登录成功！")
              const _path = this.flrPath()
              that.$router.push({
                path: that.redirect || _path,
                query: that.otherQuery
              })
              that.logining = false
            })
            .catch(() => {
              that.logining = false
            })
        } else {
          return false
        }
      })
    },
    flrPath() {
      // 判断设置的几个目录是否存在
      const menuList = getMenu()
      const menu = menuList ? JSON.stringify(menuList) : ''
      if (!menu) return '/'
      if (menu.indexOf('/tenant/manage') >= 0) {
        return '/tenant/manage'
      } else {
        return '/'
      }
    },
    changePass(value) {
      this.visible = !(value === 'show')
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #31414f;
#container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: $bg;
  .fx_paper {
    display: flex;
    width: 700px;
    position: absolute;
    left: 50%;
    top: 50%;
    // border-radius: 8px;
    justify-content: center;
    transform: translate(-50%, -50%);
    background-color: $bg;
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    // overflow: hidden;
    .fx_wrap {
      height: 100%;
      .fx_h3 {
        font-size: 30px;
        text-align: center;
        margin: 10px 0 20px;
        padding-right: 20px;
        .logo_xs {
          width: 50%;
          vertical-align: middle;
        }
        .logo {
          width: 68%;
          vertical-align: middle;
        }
        .title{
          font-size: 26px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
  .link{
    cursor: pointer;
    color: #409EFF;
    position: absolute;
    left: 25px;
    bottom: 14px;
  }
}
.form_wrap /deep/ .el-form-item__content{
  line-height: 35px;
}
.form_wrap /deep/ .el-form-item__label{
  color: #fff;
  line-height: 35px;
}
.form_wrap /deep/ .el-form-item__label::before{
  display: none;
}
.form_wrap /deep/ .el-input__inner{
  height: 35px;
}
.form_wrap /deep/ .el-input{
  width: 68%;
}
.form_wrap /deep/ .el-form-item__error{
  padding-top: 0;
}
.form_wrap{
  width: 500px;
  margin: 0 auto;
  // box-shadow: 3px 3px 3px 0px #293742 , 1px 1px 0px 0px #405565 inset;
  padding: 40px 40px 25px;
  position: relative;
  .btn{
    position: absolute;
    display: inline-block;
    top: 40px;
    right: 45px;
    .el-button{
      width: 85px;
      height: 85px;
    }
  }
}
.el-divider--vertical{
  margin-left: -20px;
  opacity: 0.5;
}
.mid_line{
  opacity: 0.5;
  width: 100%;
  height: 1px;
  background: linear-gradient(left bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
}
</style>

