<template>
  <div class="paginationBox">
    <el-pagination
      background
      :layout="layout"
      :pager-count="pagerCount"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="pageTotal"
      :current-page.sync="currentPages"
      @size-change="sizeChange"
      @current-change="current"
      @prev-click="prev"
      @next-click="next"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "HotelPagination",
  props: {
    /*说明：如果下面的参数没传，就会按照默认值进行设置pageTotal，pageFunc函数必须传和绑定，
    如果layout设置了sizes（指定当前页展示条数），则pageSize会按照指定的pageSizes数组里面
    的值来设置，指定的pageSize会被覆盖*/
    pageTotal: {
      type: Number,
      default: 0,//总条数
    },
    pagerCount: {
      type: Number,
      default: 11,//如果页数很多大概展示的页码
    },
    layout: {
      type: String,
      default: "total,sizes, prev, pager, next, jumper, ->, slot",//分页组件会展示的功能项
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100];//指定分页展示条数
      },
    },
    currentPage: {
      type: Number,
      default: 1,//指定跳转到多少页
    },
    pageSize: {
      type: Number,
      default: 10,//每页展示的条数，根据自己实际，且会带入请求
    },
    pageNum: {
      type: Number,
      default: 1,//第几页数据，根据自己实际，且会带入请求
    },
  },
  data() {
    return {
      pageData: {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      },
      currentPages: this.currentPage,
    };
  },
  mounted() {},
  methods: {
    //选择每页显示数量
    sizeChange(val) {
      this.pageData.pageSize = val;
      this.$emit("pageFunc", this.pageData);
    },
    //选择某一页
    current() {
      this.pageData.pageNum = this.currentPages;
      this.$emit("pageFunc", this.pageData);
    },
    //上一页
    prev() {
      this.pageData.pageNum = this.pageData.pageNum - 1;
      this.$emit("pageFunc", this.pageData);
    },
    //下一页
    next() {
      this.pageData.pageNum = this.pageData.pageNum + 1;
      this.$emit("pageFunc", this.pageData);
    },
  },
};
</script>
<style lang="less" scoped>
.paginationBox {
  width: 100%;
  padding:20px 0 20px 0;
  text-align: center;
}
</style>
