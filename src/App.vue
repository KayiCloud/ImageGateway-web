<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="fade" mode="out-in" v-if="isRouterAlive">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import "~scss_index";
@import "~scss_vars";
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.el-submenu [class^="fa"] {
  vertical-align: -1px;
  margin-right: 10px;
}
.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}
.toolbar {
  font: 14px "微软雅黑";
  color: $color-primary;
  background: #f2f2f2;
  padding: 10px 15px;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.headTip {
  padding: 10px 15px;
  margin: 10px auto;
  font: 14px "微软雅黑";
  color: #fff;
  background: $color-primary;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*滚动条*/
::-webkit-scrollbar-track-piece {
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 13px;
  height: 13px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  background-clip: padding-box;
  min-height: 28px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ddd;
}
</style>
