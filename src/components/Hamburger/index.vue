<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <!-- <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      ></path>
    </svg>-->
    <svg
      t="1587000258272"
      class="hamburger"
      :class="{'is-active':isActive}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2398"
      width="20"
      height="20"
    >
      <path
        d="M914.4 674.9H394.7c-25.2 0-45.6-22-45.6-48.9s20.4-48.9 45.6-48.9h519.7c25.2 0 45.6 22 45.6 48.9s-20.4 48.9-45.6 48.9z m0-228.1H394.7c-25.2 0-45.6-22-45.6-48.9s20.4-48.9 45.6-48.9h519.7c25.2 0 45.6 22 45.6 48.9s-20.4 48.9-45.6 48.9z m-3.3-219.9H115.3c-26.9 0-50.5-20.4-51.3-47.2-0.8-27.7 21.2-50.5 48.9-50.5h795.8c26.9 0 50.5 20.4 51.3 47.2 0.8 27.7-21.2 50.5-48.9 50.5zM64 674.1V349.9L291.3 512 64 674.1c0 0.8 0 0.8 0 0z m48.9 123h795.8c26.9 0 50.5 20.4 51.3 47.2 0.8 27.7-21.2 50.5-48.9 50.5H115.3c-26.9 0-50.5-20.4-51.3-47.2-0.8-27.7 21.2-50.5 48.9-50.5z"
        p-id="2399"
        fill="#ffffff"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
svg {
  vertical-align: middle;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
