<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已读" name="second"></el-tab-pane>
      <el-tab-pane label="未读" name="third"></el-tab-pane>
    </el-tabs>
    <div class="infoBox" style="text-align:left" v-for="(item,index) in infoData" :key="index">
      <el-checkbox-group v-model="sign.signByRead" @change="handleItemChange">
        <el-checkbox
          :label="item.id"
          :key="item.id"
          :value="item.id"
          style="margin-top:18px;"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <div style="width:100%;">
        <div style="display:inline-block;">
          <p v-if="item.isRead==1">{{item.title}}</p>
          <el-badge is-dot class="item weight" v-else>{{item.title}}</el-badge>
        </div>
        <span class="time">{{item.createdAt}}</span>
      </div>
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :name="item.index" @click="isFold(item)">
          <div>{{item.message}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div style="float:left;margin-top:20px;">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        class="weight"
      >全选</el-checkbox>
      <span
        class="align-left weight"
        style="color:#0576DB;font-size:16px;margin-left:20px;"
        @click="signRead"
        v-if="isRead!=1"
      >标记为已读</span>
    </div>
    <div class="pagination" style="margin-top:60px;" v-if="pageTotal>10">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :pager-count="11"
        :page-size="10"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="current"
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
      infoData: [],
      idList: "",
      sign: {
        signByRead: []
      },
      isRead: "",
      activeNames: 1,
      isIndeterminate: false,
      checkAll: false,
      selectedData: [],
      pageTotal: 1,
      currentPage: 1,
      pageNum: 1
    };
  },
  mounted() {
    this.getInfoList();
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.index) {
        case "0":
          this.isRead = "";
          this.getInfoList();
          break;
        case "1":
          this.isRead = 1;
          this.getInfoList();
          break;
        case "2":
          this.isRead = 0;
          this.getInfoList();
          break;
      }
    },
    // 单选处理
    handleItemChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.infoData.length;

      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.infoData.length;
    },
    // 全选处理
    handleCheckAllChange(val) {
      if (val) {
        this.infoData.forEach(item => {
          this.sign.signByRead.push(item.id);
        });
      } else {
        this.sign.signByRead = [];
      }
      this.isIndeterminate = false;
    },
    isFold(item) {
      item.isFold = !item.isFold;
    },
    // 获取消息列表
    getInfoList() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        status: this.isRead
      };
      that.$api
        .groupInfoList(params)
        .then(response => {
          const result = response.data;
          that.infoData = result.data.records.map(item => {
            item.isFold = false;
            return item;
          });
          that.pageTotal = result.data.total;
          if (result.code == "0") {
          } else {
            that.$message.error("获取消息列表失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    // 标记为已读
    signRead() {
      let that = this;
      let ids = that.sign.signByRead.join(",");
      if (ids == "") {
        this.$message.warning("您还未勾选任何消息，请勾选！");
        return;
      }
      const params = {
        ids: ids
      };
      this.$api
        .signInfoRead(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.$message.success("标记为已读成功！");
            that.getInfoList();
          } else {
            that.$message.error("标记为已读失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    // 当前页
    current() {
      this.pageNum = this.currentPage;
      this.getInfoList();
    },
    //上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.getInfoList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.getInfoList();
    }
  }
};
</script>
<style lang="less">
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.infoBox {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .time {
    margin-right: 0;
  }
  .el-checkbox {
    float: left;
  }
  .doBox {
    p {
      font-size: 16px;
      color: #5a97e2;
    }
  }
}
</style>>
