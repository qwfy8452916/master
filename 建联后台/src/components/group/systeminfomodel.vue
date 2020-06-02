<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
      <el-tab-pane label="系统消息模板" name="first"></el-tab-pane>
      <el-tab-pane label="短消息模板" name="second"></el-tab-pane>
      <el-tab-pane label="App模板消息推送" name="third"></el-tab-pane>
    </el-tabs>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
      border
      class="top"
      :row-style="{height:'50px'}"
    >
      <el-table-column type="selection" :reserve-selection="true" width="55" align="center"></el-table-column>
      <el-table-column label="标题" align="center" width="500">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="content" label="系统消息" align="center"></el-table-column>
    </el-table>
    <el-button type="primary" class="btn-mid top" style="float:left" @click="submit">提交</el-button>
    <div class="pageCont top" v-if="total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="current_change"
        @prev-click="prev"
        @next-click="next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      infoId: "",
      multipleSelection: [],
      total: 0,
      currentPage: 1,
      pageNum: 1,
      type: 1,
      idList: "",
      listid: "",
      reciveData: "",
      ids: "",
      ischeck: true,
      processList: "",
      processLists: ""
    };
  },
  mounted() {
    this.infoId = this.$route.params.id;
    this.getSystemList();
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
        case "1":
          this.$router.push({
            name: "shortinfomodel",
            params: { id: this.infoId }
          });
          this.type = 2;
          this.getSystemList();
          break;
        case "2":
          this.$router.push({
            name: "appinfomodel",
            params: { id: this.infoId }
          });
          this.type = 3;
          this.getSystemList();
          break;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.idList = this.multipleSelection.map(item => {
        return item.id;
      });
      this.processList = this.multipleSelection.map(item => {
        return item.process;
      });
      this.ids = this.idList.join(",");
      this.processLists = this.processList.join(",");
    },
    // 页码改变 
    current_change(currentPage) {
      this.pageNum = this.currentPage;
      this.getSystemList();
    },
    // 上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.getSystemList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.getSystemList();
    },
    // 获取系统消息列表
    getSystemList() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        type: this.type
      };
      this.$api
        .getSystemInfo(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.tableData = result.data.records;
            that.total = result.data.total;
            console.log(that.total);
            that.listid = that.tableData.map(item => {
              return item.id;
            });
            const params = {
              uid: this.infoId
            };
            this.$api
              .reciveSystemInfo(params)
              .then(response => {
                const result = response.data;
                if (result.code == "0") {
                  that.reciveData = result.data.map(item => {
                    return parseInt(item.tid);
                  });
                  that.listid.forEach((res, index) => {
                    if (that.reciveData.indexOf(res) != -1) {
                      that.$refs.multipleTable.toggleRowSelection(
                        that.tableData[index],
                        true
                      );
                    }
                  });
                } else {
                  that.$message.error("保存用户消息模板失败！");
                }
              })
              .catch(error => {
                that.$alert(error, "警告", {
                  confirmButtonText: "确定"
                });
              });
          } else {
            that.$message.error("获取系统消息失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    // 提交消息模板
    submit() {
      let that = this;
      const params = {
        process: this.processLists,
        tid: this.ids,
        type: this.type,
        uid: this.infoId
      };
      if (this.ids == "") {
        this.$message.warning("您还未勾选消息模板，请勾选！");
        return;
      }
      this.$api
        .saveUserInfo(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.$message.success("保存用户消息模板成功！");
          } else {
            that.$message.error("保存用户消息模板失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
  }
};
</script>
<style>
</style>