<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称：" prop="hotelId">
        <el-select
          v-model="hotelId"
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteHotel"
          @focus="getHotelList()"
          placeholder="请选择酒店"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议单位">
        <el-input v-model="enterpiseName" placeholder="请输入协议单位"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="enterpiseContact" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="enterpiseContactMobile" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="绑定状态">
        <el-select v-model="bindFlag" :loading="loadingH" placeholder="请选择绑定状态">
          <el-option
            v-for="item in statusList1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议开始时间">
        <el-date-picker
          v-model="contractTimeStart"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="协议开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="禁/启用状态">
        <el-select v-model="status" :loading="loadingH" placeholder="请选择禁/启用状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <!-- <div>
            <el-button class="addbutton" @click="addNewSetting">新&nbsp;&nbsp;增</el-button>
    </div>-->
    <el-table :data="CabinetList" :fit="true" border stripe>
      <el-table-column fixed prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="enterpiseName" label="协议单位" align="center"></el-table-column>
      <el-table-column prop="license" label="根授权码" align="center"></el-table-column>
      <el-table-column prop="enterpiseContact" label="联系人" align="center"></el-table-column>
      <el-table-column prop="enterpiseContactMobile" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="contractTimeStart" label="协议开始时间" align="center"></el-table-column>
      <el-table-column prop="contractTimeEnd" label="协议结束时间" align="center"></el-table-column>
      <el-table-column prop="defaultDiscount" label="默认折扣" align="center"></el-table-column>
      <el-table-column label="绑定状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.bindFlag == 0">未绑定</span>
          <span v-if="scope.row.bindFlag == 1">已绑定</span>
        </template>
      </el-table-column>
      <el-table-column prop="bindUserId" label="绑定微信ID" align="center"></el-table-column>
      <el-table-column prop="wxNickName" label="绑定微信昵称" align="center"></el-table-column>
      <el-table-column prop="wxMobile" label="绑定微信手机号" align="center"></el-table-column>
      <el-table-column prop="bindUserName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="bindUserDept" label="部门" align="center"></el-table-column>
      <el-table-column prop="bindUserPosition" label="职位" align="center"></el-table-column>
      <el-table-column prop="bindUserEmail" label="Email" align="center"></el-table-column>
      <el-table-column label="禁/启用" align="center">
        <template slot-scope="scope">
          <el-switch
            :disabled="true"
            @change="changeActivityStatus(scope.row.status,scope.row.id,scope.$index)"
            v-model="scope.row.status"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="CabinetglUpdate(scope.$index, CabinetList)">更新</el-button> -->
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
          <!-- <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
                    <el-button v-if="scope.row.bindFlag == 1" type="text" size="small" @click="viewActivityDef(scope.$index, CabinetList)">解绑</el-button>
          <el-button type="text" size="small" @click="viewActivityRecords(scope.$index, CabinetList)">单位房源协议价</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganEnterprisesList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,

      enterpiseName: "",
      enterpiseContact: "",
      enterpiseContactMobile: "",
      bindFlag: "",
      contractTimeStart: "",
      status: "",
      hotelList: [],

      statusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
      statusList1: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "未绑定",
          value: 0,
        },
        {
          label: "已绑定",
          value: 1,
        },
      ],
      hotelId: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });
  },
  mounted() {
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.Getdata();
    this.getHotelList()
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.enterpiseName = "";
      this.enterpiseContact = "";
      this.enterpiseContactMobile = "";
      this.bindFlag = "";
      this.contractTimeStart = "";
      this.status = "";
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        enterpiseName: this.enterpiseName,
        enterpiseContact: this.enterpiseContact,
        enterpiseContactMobile: this.enterpiseContactMobile,
        bindFlag: this.bindFlag,
        status: this.status,
        contractTimeStart: this.contractTimeStart,
      });
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        pageNo: 1,
        hotelName: hName,
        pageSize: 50,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.hotelList.unshift(hotelAll);
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //新增
    addNewSetting() {
      this.$router.push({ name: "HotelEnterprisesAdd" });
    },
    //修改
    Cabinetglchange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelEnterprisesChange",
        query: { modifyid: guiId },
      });
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LonganEnterprisesDetail",
        query: { modifyid: guiId },
      });
    },
    //解绑
    viewActivityDef(index, row) {
      let guiId = row[index].id;
      let actType = row[index].actType;
      let hotelId = row[index].actHotelDTOS[0].hotelId;
      if (actType == 1) {
        this.$router.push({
          name: "HotelActivityDef",
          query: { modifyid: guiId },
        });
      } else if (actType == 2) {
        this.$router.push({
          name: "HotelActivityDef",
          query: { modifyid: guiId },
        });
      } else if (actType == 3) {
        this.$router.push({
          name: "HotelActShareDef",
          query: { modifyid: guiId },
        });
      } else if (actType == 4) {
        this.$router.push({
          name: "HotelActRedpackDef",
          query: { modifyid: guiId, hotelId },
        });
      } else if (actType == 5) {
        this.$router.push({
          name: "HotelActSecondHalf",
          query: { modifyid: guiId },
        });
      } else if (actType == 6) {
        this.$router.push({
          name: "HotelActivityMeeting",
          query: { modifyid: guiId },
        });
      }
    },
    //单位房源协议价
    viewActivityRecords(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelEnterprisesRoomsList",
        query: { modifyid: guiId },
      });
    },
    //修改状态
    changeActivityStatus(value, id, index) {
      let msg = value ? "是否确认启用该协议?" : "是否确认禁用该协议?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let status = value ? 0 : 1;
          this.$api
            .changeEnterprisesStatus(status, id)
            .then((response) => {
              if (response.data.code == 0) {
                if (value) {
                  this.$message.success("启用成功");
                } else {
                  this.$message.success("禁用成功");
                }
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
                this.CabinetList[index].status = !value;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
          this.CabinetList[index].status = !value;
        });
    },
    //更新授权码
    CabinetglUpdate(index, row) {
      let msg = "是否确认更新该授权码？";
      let guiId = row[index].id;
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .updateEnterprises(guiId)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("更新成功");
                this.Getdata();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //删除
    Cabinetglcancel(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除该协议?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteEnterprises(guiId)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("操作成功");
                this.Getdata();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //当前页码
    current() {
      // this.pageNum = this.currentPage;
      this.Getdata();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        enterpiseName: this.enterpiseName,
        enterpiseContact: this.enterpiseContact,
        enterpiseContactMobile: this.enterpiseContactMobile,
        bindFlag: this.bindFlag,
        contractTimeStart: this.contractTimeStart,
        hotelId: this.hotelId,
        status: this.status,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getEnterprises({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.status = item.status ? false : true;
            });
            that.pageTotal = response.data.data.total;
          } else {
            that.$alert(response.data.data.msg, "警告", {
              confirmButtonText: "确定",
            });
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

<style lang="less" scoped>
</style>

