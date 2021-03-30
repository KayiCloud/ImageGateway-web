<template>
  <div class="page_wrap" v-if="total>0">
    <template v-if="total>10">
      <el-pagination
        :small="small"
        :background="background"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :total="total"
        v-bind="$attrs"
      ></el-pagination>
    </template>
    <div v-else class="onlyPage">共 {{total}} 条</div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前第 ${val} 页`);
      // this.$emit("changePage", val);
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }

    },
    handleSizeChange(val) {
      // console.log(`一页 ${val} 条`);
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page_wrap {
  padding: 10px 0;
  .onlyPage {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
// .pagination-container {
//   background: #fff;
//   padding: 32px 16px;
// }
// .pagination-container.hidden {
//   display: none;
// }
</style>