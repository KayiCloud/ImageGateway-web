<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <div v-if="!isCollapse && sidebarTitle" class="project_name">{{sidebarTitle}}</div>
    <!-- <div v-else class="project_name_sm">远协</div> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuBg"
        :text-color="menuText"
        :unique-opened="false"
        :active-text-color="menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { sidebarTitle } from '@/settings'
// import variables from '@/styles/variables.scss'

export default {
  data() {
    return {
      menuBg: '#1f2d3d',
      menuText: '#bfcbd9',
      menuActiveText: '#00C0EF',
      sidebarTitle: sidebarTitle
    }
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // variables() {
    //   return variables
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>
.project_name {
  font-size: 20px;
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 10px;
  white-space: nowrap;
}
</style>
