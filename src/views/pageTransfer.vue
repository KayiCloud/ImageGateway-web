<template>
  <div class="wrap_transfer">
    <div v-loading.fullscreen.lock="fullscreenLoading"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: true
    }
  }
}
</script>
