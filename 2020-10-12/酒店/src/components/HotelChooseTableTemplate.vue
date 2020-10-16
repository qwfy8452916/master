<template>
  <div class="HotelChooseTableTemplate">
    <el-table
      :data="tableProps.tableData"
      stripe
      style="width:100%"
      ref="multipleTable"
      :row-key="getRowKeys"
      @selection-change="on_changeTable"
      @toggleRowSelection="toggleRowSelect"
    >
      <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableProps.tableFiled"
        :key="index"
        :label="item.label"
        :prop="item.filed"
        :align="item.align"
      ></el-table-column>
    </el-table>
    <HotelPaginationTemplate
      :pageSize="tableProps.pageSize"
      :layout="tableProps.layout"
      :pageTotal="tableProps.pageTotal"
      @pageFunc="pageFunc"
    ></HotelPaginationTemplate>
  </div>
</template>

<script>
import axios from "../request/request";
import HotelPaginationTemplate from "@/components/HotelPaginationTemplate";
export default {
  name: "HotelChooseTableTemplate",
  props: {
    /*以下为数据参数模板
    tableProps: {
        paramsObj: {},
        url: "/longan/api/user/cus/hotel",//必传
        tableData: [],
        tableFiled: [
          {
            label: "用户ID",
            filed: "commonId",
            align: "center",
          },
        ],
        pageSize: 4, //每页显示条数
        pageTotal: 1, //默认总条数
        pageNum: 1, //实际当前页码
        layout: "total,prev, pager, next, jumper, ->, slot",
      }, */
    /*示例
      <HotelChooseTableTemplate
        ref="HotelChooseTable"
        :tableProps="tableProps"
        @on_changeTable="on_changeTable"
      ></HotelChooseTableTemplate>
      //给表格参数搜索参数赋值，并首次加载表格数据
      get_userlist() {
      let that = this;
      this.tableProps.paramsObj = {
        hotelId: that.hotelId,
        commonId: that.commonId,
        mobile: that.mobile,
        lastVisitTimeStart: that.dateRange[0],
        lastVisitTimeEnd: that.dateRange[1],
      };
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.HotelChooseTable.getTablelist();
        }, 1000);
      });
    },
    //接收选择的数据
    on_changeTable(data) {
      this.multipleSelection = data;
    },
      */
    tableProps: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    HotelPaginationTemplate,
  },
  data() {
    return {
      multipleSelection: [], // 当前页选中的数据
      // 获取row的key值
      getRowKeys(row) {
        return row.id; //此id根据项目实际，且为唯一字段
      },
    };
  },
  mounted() {},
  methods: {
    $ajax(params) {
      return axios.get(this.tableProps.url, { params });
    },
    //分页
    pageFunc(data) {
      this.tableProps.pageSize = data.pageSize;
      this.tableProps.pageNum = data.pageNum;
      this.getTablelist();
    },
    //监听选择变化
    on_changeTable(val) {
      this.multipleSelection = val;
      this.$emit("on_changeTable", this.multipleSelection);
    },
    //改变选择状态
    toggleRowSelect(rows) {
      const _this = this;
      if (rows.length > 0) {
        this.$nextTick(() => {
          rows.forEach((row) => {
            _this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取表格数据
    getTablelist() {
      let that = this;
      let paramsObj = this.tableProps.paramsObj;
      let newObj = {
        pageSize: this.tableProps.pageSize,
        pageNo: this.tableProps.pageNum,
      };
      let params = Object.assign(paramsObj, newObj);
      that
        .$ajax(params)
        .then((response) => {
          let result = response.data;
          if (result.code == "0") {
            that.tableProps.tableData = result.data.records;
            that.tableProps.pageTotal = result.data.total;
          } else {
            that.$message.error("获取数据失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>