<template>
  <div class="userlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="会议">
        <el-select
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteMeeting"
          @focus="getMeetingList()"
          v-model="meetingId"
          placeholder="请选择会议名称"
        >
          <el-option
            v-for="item in meetingList"
            :key="item.id"
            :label="item.meetingName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="visitorName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="visitorMobile"></el-input>
      </el-form-item>
      <el-form-item label="参与状态">
        <el-select v-model="status" placeholder="请选择参与状态">
          <el-option
            v-for="item in partInList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userInquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="UserDataList" border stripe style="width:100%;">
      <el-table-column prop="meetingName" label="会议" align="center"></el-table-column>
      <el-table-column prop="visitorName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="visitorMobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="visitorOrganisation" label="所在单位" align="center"></el-table-column>
      <el-table-column label="参与状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未参与</span>
          <span v-if="scope.row.status == 1">报名待审核</span>
          <span v-if="scope.row.status == 2">已报名待签到</span>
          <span v-if="scope.row.status == 3">已签到</span>
          <span v-if="scope.row.status == -1">报名驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="报名时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.enlistTime=='1970-01-01 00:00:00'?'-':scope.row.enlistTime}}</template>
      </el-table-column>
      <el-table-column label="审核时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.auditTime=='1970-01-01 00:00:00'?'-':scope.row.auditTime}}</template>
      </el-table-column>
      <el-table-column label="签到时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.signTime=='1970-01-01 00:00:00'?'-':scope.row.signTime}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.status === 1"
            @click="detailUser1(scope.row.id)"
          >审核</el-button>
          <el-button type="text" size="small" @click="detailUser2(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                    {{scope.row.remark?scope.row.remark:'-'}}
                </template>
      </el-table-column>-->
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="审核" :before-close="cancel" width="500px">
      <el-form
        :model="handelData"
        label-width="140px"
        :rules="rules"
        :inline="true"
        ref="handelData"
        align="left"
      >
        <el-form-item label="处理" prop="handle">
          <el-radio-group v-model="handelData.handle">
            <el-radio label="2">通过</el-radio>
            <el-radio label="-1">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="handelData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div class="operate" style="margin-top:20px;">
        <el-button type="none" @click="cancel">取消</el-button>
        <el-button type="primary" @click="sureWithdraw()">确定</el-button>
      </div>
    </el-dialog>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelActivityMeetingRecords",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    var validatorMark = (rule, value, callback) => {
      if (this.handelData.handle == "-1" && !this.handelData.remark) {
        callback(new Error("请填写驳回理由"));
      } else {
        callback();
      }
    };
    return {
      authzData: "",
      dialogVisible: false,
      loadingH: false,
      selectRow: "",
      hotelId: "",
      meetingId: "",
      visitorName: "",
      visitorMobile: "",
      status: "",
      meetingList: [],
      UserDataList: [],
      partInList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "未参与",
          value: 0,
        },
        {
          label: "报名审核中",
          value: 1,
        },
        {
          label: "已报名待签到",
          value: 2,
        },
        {
          label: "已签到",
          value: 3,
        },
        {
          label: "报名驳回",
          value: -1,
        },
      ],

      handelData: {
        remark: "",
        handle: "",
      },

      pageTotal: 0,
      pageSize: 10,
      currentPage: 1,
      pageNum: 1,
      rules: {
        handle: [
          { required: true, message: "请选择处理方式", trigger: "change" },
        ],
        remark: [{ validator: validatorMark, trigger: "change" }],
      },
    };
  },
  mounted() {
    // (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.hotelId = localStorage.getItem("hotelId");
    this.getMeetingList();
    this.userList();
  },
  methods: {
    resetFunc() {
      this.meetingId = "";
      this.visitorName = "";
      this.visitorMobile = "";
      this.status = "";
      this.userList();
    },
    //列表
    userList() {
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,

        hotelId: this.hotelId,
        actMeetingId: this.meetingId,
        visitorName: this.visitorName,
        visitorMobile: this.visitorMobile,
        status: this.status,
      };
      this.$api
        .smartMeetingRecords({ params })
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == 0) {
            this.UserDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    sureWithdraw() {
      let params = {
        id: this.selectRow,
        auditRemark: this.handelData.remark,
        result: this.handelData.handle,
      };
      this.$refs["handelData"].validate((valid) => {
        if (valid) {
          this.$api
            .smartMeetingTest(params)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.userList();
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.handelData = {
        remark: "",
        handle: "",
      };
      this.dialogVisible = false;
    },
    remoteMeeting(val) {
      this.getMeetingList(val);
    },
    //会议列表
    getMeetingList() {
      this.loadingH = true;
      const params = {
        hotelId: this.hotelId,
      };
      this.$api
        .smartMeetingList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.meetingList = result.data.map((item) => {
              return {
                id: item.id,
                meetingName: item.meetingName,
              };
            });
            const hotelAll = {
              id: "",
              meetingName: "全部",
            };
            this.meetingList.unshift(hotelAll);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    sizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.userList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.userList();
    },
    //查询
    userInquire() {
      this.pageNum = 1;
      this.userList(this.pageNum);
      this.$store.commit("setSearchList", {
        meetingId: this.meetingId,
        visitorName: this.visitorName,
        visitorMobile: this.visitorMobile,
        status: this.status,
      });
    },
    //处理
    detailUser1(id) {
      this.dialogVisible = true;
      this.selectRow = id;
    },
    detailUser2(scope) {
      this.$router.push({ name: "HotelActivityMeetingDetail", query: scope });
    },
  },
};
</script>

<style lang="less" scoped>
.userlist {
  .searchform {
    background: #f2f2f2;
    padding-top: 20px;
  }
}
</style>