<template>
  <div class="wrap_404">
    <img src="~@/assets/images/404.png" alt="404" />
    <p>迷路了~</p>
    <el-button type="primary" size="small" @click="goback">回到起点</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.push({
        path: "/login"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap_404 {
  text-align: center;
  padding: 120px 0 0;
  img {
    width: 200px;
    margin: 30px 0;
  }
  p {
    font-size: 16px;
    color: #666;
  }
}
</style>