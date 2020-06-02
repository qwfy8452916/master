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
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="模板名称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="模板类型" align="center" width="150"></el-table-column>
      <el-table-column prop="name" label="模板CODE" align="center" width="150"></el-table-column>
      <el-table-column prop="name" label="系统消息" align="center"></el-table-column>
    </el-table>
    <el-button type="primary" class="btn-mid top" style="float:left">提交</el-button>
    <div class="pageCont top" v-if="total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :currentPage="currentPage"
        @current-change="current_change"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      tableData: [],     
      multipleSelection: [],
      total: 0,
      currentPage: 0,
      infoId:'',
      type:2,
      idList:'',
      listid:'',
      ids:''
    };
  },
  mounted(){
    this.infoId = this.$route.params.id;
  },
  methods: {
    handleClick(tab, event) {
      switch(tab.index){
        case '0':
        this.$router.push({name:'systeminfomodel',params:{id:this.infoId}});
        this.type = 1;
        break;
        case '1':
        this.$router.push({name:'shortinfomodel',params:{id:this.infoId}});
        this.type = 2;
        break;
        case '2':
        this.$router.push({name:'appinfomodel',params:{id:this.infoId}});
        this.type = 3;
        break; 
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.idList = this.multipleSelection.map(item => {
      return item.id;
      });
      this.ids = this.idList.join(',');
    },
    // 页码改变
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
     // 获取系统消息列表
    getSystemList(){
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        type:this.type
      };
      this.$api
        .getSystemInfo(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.tableData = result.data.records;
              that.listid = that.tableData.map(item => {
              return item.id;
            });
            let uid = localStorage.getItem("userID");
            const params = {
              uid: uid
            };
            this.$api
              .reciveSystemInfo(params)
              .then(response => {
                const result = response.data;
                if (result.code == "0") {
                  that.reciveData = result.data.map(item => {
                    return item.tid;
                  });
                  if(that.reciveData.join(',')  == that.listid.join(',')){
                   that.ischeck = true;
                   console.log(that.ischeck)
                  }
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
    submit(){
      let that = this;
      let uid = localStorage.getItem('userID');
      const params = {
        process:'',
        tid:this.ids,
        type:this.type,
        uid:uid
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
    }
  }
};
</script>
<style>
</style>