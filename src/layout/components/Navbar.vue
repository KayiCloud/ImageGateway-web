<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <template>
      <!-- <breadcrumb class="breadcrumb-container" /> -->

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <div class="user_name" :title="name">{{name}}</div>
            <img :src="avatar" class="user-avatar" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/updatepwd">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcrumb from "@/components/Breadcrumb"
import Hamburger from "@/components/Hamburger"
import bus from "@/api/bus"

export default {
  data() {
    return {
      unRead: 0,
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "pathname", "avatar", "name"])
  },
  filters: {
    ageFlr(val) {
      if (!val) return '-'
      const _v = val.indexOf('岁') >= 0 ? val : val + '岁'
      return _v;
    }
  },
  mounted() {
    this.fetchData();
    bus.$on('refreshMsgBadge', () => {
      this.fetchData();
    });
  },
  methods: {
    fetchData() {
      this.unRead = 0
      // getUnReadMessage().then(res=>{
      //   if(res && res.code == 10000){
      //     this.unRead = res.content 
      //   }
      // })
    },
    handleSelect(key) {
      this.$router.push({
        path: "/message",
        query: {
          activeTab: key
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #1f2d3d;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .name-icon {
      color: #fff;
      display: inline-block;
      overflow: hidden;
      line-height: 30px;
      margin-right: 20px;
    }
    .badge {
      top: -15px;
      left: -30px;
    }
    .icon {
      font-size: 16px;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      .user-dropdown {
        top: 20px;
      }

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user_name {
          vertical-align: top;
          cursor: pointer;
          display: inline-block;
          // max-width: 50px;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          color: #ccc;
          padding-right: 3px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .patient_box {
    display: flex;
    margin-top: 5px;
    .pat_avatar {
      margin-right: 10px;
      .avatar {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
    .pat_cnt {
      display: flex;
      line-height: 1;
      .pat_info_col {
        margin-right: 20px;
        font-size: 12px;
        color: #dbdbdb;
        .pat_item {
          padding: 4px 0;
        }
      }
    }
  }
}
</style>
