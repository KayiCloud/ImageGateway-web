<template>
  <div id="container">
    <div class="fx_paper" :class="collapsed == false ? '' : 'fx_pager_m'">
      <div class="fx_wrap login_wrap">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          label-width="0px"
          class="login-container"
          @submit.native.prevent
        >
          <h3 class="fx_h3">
            <img class="logo" src="~@/assets/images/logo-light.png" />
          </h3>
          <el-form-item prop="account" class="ipt-item">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="on"
              placeholder="请输入用户名"
              autofocus
            >
              <template slot="prepend">
                <i class="fa fa-user fa-lg"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="ipt-item" v-if="visible">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="on"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                class="el-icon-view el-input__icon"
                title="显示密码"
                @click="changePass('show')"
                style="cursor: pointer"
              ></i>
              <template slot="prepend">
                <i class="fa fa-key fa-lg"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="ipt-item" v-else>
            <el-input
              type="text"
              v-model="ruleForm.password"
              autocomplete="on"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                class="el-icon-more el-input__icon"
                title="隐藏密码"
                @click="changePass('hide')"
                style="cursor: pointer"
              ></i>
              <template slot="prepend">
                <i class="fa fa-key fa-lg"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSubmit"
              :loading="logining"
              style="width: 100%; height: 45px"
            >
              立即登录
              <i class="fa fa-long-arrow-right" style="margin-left: 10px"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenu } from '@/utils/auth'

export default {
  name: "login",
  data() {
    return {
      logining: false,
      collapsed: false,
      ruleForm: {
        account: "admin",
        password: "1q2w3E*"
      },

      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      visible: true,
      redirect: "",
      otherQuery: "",
      corpId: 'dingd55b04400e53d11cbc961a6cb783455b',
      code: ''
    };
  },
  created() {
    this.keyupSubmit(); //回车登录
  },
  mounted() {
    if (document.documentElement.clientWidth <= 750) {
      //移动端适配
      this.collapsed = true;
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      }
    }
  },
  methods: {
    handleOpen() {
      this.$nextTick(function () {
        let doc = document.getElementById("codeInput");
        doc.focus();
      });
    },
    keyupSubmit() {
      //回车登录
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.handleSubmit();
        }
      };
    },
    handleSubmit() {
      let that = this;

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            account: this.ruleForm.account,
            password: this.ruleForm.password
          };

          that.$store
            .dispatch("user/login", loginParams)
            .then(res => {
              //登录成功
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
            });
        } else {
          return false;
        }
      });
    },
    flrPath() {
      // 判断设置的几个目录是否存在
      const menuList = getMenu()
      if (!menuList) return '/'
      if (menuList.indexOf('/tenant/manage') >= 0 && menuList.indexOf('租户管理') >= 0) {
        return '/tenant/manage'
      } else {
        return '/'
      }
    },
    changePass(value) {
      this.visible = !(value === "show");
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #283443;
#container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: $bg;
}
.fx_paper {
  display: flex;
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 8px;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: $bg;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.fx_pager_m {
  width: 420px;
}
.fx_banner {
  width: 440px;
  height: 100%;
}
.fx_wrap {
  width: 560px;
  height: 100%;
}
.login-container {
  width: 330px;
  margin: 0 auto;
  padding-top: 30px;
  .fx_h3 {
    font-size: 30px;
    text-align: center;
    color: rgb(62, 173, 109);
    margin: 10px 0 40px;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.remember {
  margin-bottom: 6px;
}
.swiper1 {
  height: 100%;
  background-color: #00c0ef;
}
.swiper2 {
  height: 100%;
  background-color: #606266;
}
</style>

