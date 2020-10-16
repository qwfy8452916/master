<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="活动名称">
        <el-input v-model="activityName" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select :disabled="true" v-model="activityType" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in actTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别">
        <el-select :disabled="true" v-model="grade" placeholder="请选择级别">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用酒店">
        <el-select
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteCabType"
          @focus="getHotelList()"
          v-model="hotelId"
          placeholder="请选择酒店名称"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="禁/启用状态">
        <el-select v-model="status" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div>
      <el-button class="addbutton" @click="addNewSetting">新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="actName" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="actTypeName" label="活动类型" align="center"></el-table-column>
      <el-table-column label="级别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.actScopeLevel == 0">平台</span>
          <span v-if="scope.row.actScopeLevel == 1">单店</span>
          <span v-if="scope.row.actScopeLevel == 2">供应商</span>
        </template>
      </el-table-column>
      <el-table-column prop="actOrgName" label="所属组织" align="center"></el-table-column>
      <el-table-column prop="actHotelName" label="适用范围" align="center"></el-table-column>
      <el-table-column label="活动时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.actBegin}}</span>
          <span>至</span>
          <span>{{scope.row.actEnd}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与次数" align="center">
        <template slot-scope="scope">{{scope.row.actPartInCount?scope.row.actPartInCount:'不限制'}}</template>
      </el-table-column>
      <el-table-column label="禁/启用状态" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="changeActivityStatus(scope.row.status,scope.row.id,scope.$index)"
            v-model="scope.row.status"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
          <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
          <el-button
            type="text"
            size="small"
            @click="viewActivityDef(scope.$index, CabinetList)"
          >活动设置</el-button>
          <el-button
            v-if="scope.row.actType == 1"
            type="text"
            size="small"
            @click="viewActivityRecords(scope.$index, CabinetList)"
          >参与记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MerchantPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import MerchantPagination from "@/components/MerchantPagination";
export default {
  name: "MerchantActivityList",
  components: {
    resetButton,
    MerchantPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      activityName: "",
      status: "",
      actTypeList: [],
      activityType: "5",
      dateRange: [],
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
      gradeList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "平台",
          value: 0,
        },
        {
          label: "单店",
          value: 1,
        },
        {
          label: "供应商",
          value: 2,
        },
      ],
      grade: 2,
      hotelId: "",
      hotelList: [],
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
    this.getHotelList();
  },
  methods: {
    resetFunc() {
      this.activityName = "";
      this.activityType = "";
      this.grade = "";
      this.hotelId = "";
      this.status = "";
      this.dateRange = [];
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        activityName: this.activityName,
        activityType: this.activityType,
        grade: this.grade,
        hotelId: this.hotelId,
        status: this.status,
        dateRange: this.dateRange,
      });
    },
    addNewSetting() {
      this.$router.push({ name: "MerchantActivityAdd" });
    },
    //修改
    Cabinetglchange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "MerchantActivityChange",
        query: { modifyid: guiId },
      });
    },
    remoteCabType(val) {
      this.getHotelList(val);
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
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
    //获取活动类型列表
    getActList() {
      this.$api
        .basicDataItems({ key: "ACTTYPE", orgId: 0 })
        .then((response) => {
          if (response.data.code == 0) {
            this.actTypeList = response.data.data.map((item) => {
              return {
                id: item.dictValue,
                label: item.dictName,
              };
            });
            this.actTypeList.unshift({
              id: "",
              label: "全部",
            });
            this.CabinetList.forEach((item, index) => {
              this.actTypeList.forEach((key) => {
                if (key.id == item.actType) {
                  this.$set(this.CabinetList[index], "actTypeName", key.label);
                }
              });
            });
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
    },
    //详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "MerchantActivityDetail",
        query: { modifyid: guiId },
      });
    },
    //活动明细
    viewActivityDef(index, row) {
      let guiId=row[index].id
      let actType=row[index].actType
      if(actType == 1){
          this.$router.push({name:'MerchantActivityDef',query:{modifyid: guiId}});
      }else if(actType == 2){
          this.$router.push({name:'MerchantActivityDef',query:{modifyid: guiId}});
      }else if(actType == 3){
          this.$router.push({name:'MerchantActShareDef',query:{modifyid: guiId}});
      }else if(actType == 4){
          let hotelId=row[index].actHotelDTOS[0].hotelId
          this.$router.push({name:'MerchantActRedpackDef',query:{modifyid: guiId,hotelId}});
      }else if(actType == 5){
          this.$router.push({name:'MerchantActSecondHalf',query:{modifyid: guiId}});
      }
    },
    //活动参与记录
    viewActivityRecords(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "MerchantActivityRecord",
        query: { modifyid: guiId },
      });
    },
    //修改状态
    changeActivityStatus(value, id, index) {
      let msg = value ? "是否确认启用该活动?" : "是否确认禁用该活动?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let status = value ? 1 : 0;
          this.$api
            .changeActivityStatus(status, id)
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
    //删除
    Cabinetglcancel(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除该活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteActivityOne(guiId)
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
        actName: this.activityName,
        actType: this.activityType,
        hotelId: this.hotelId,
        status: this.status,
        actScopeLevel: this.grade,
        orgAs: 5,
        actBegin: this.dateRange == null ? undefined : this.dateRange[0],
        actEnd: this.dateRange == null ? undefined : this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .selectActivity({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.status = item.status ? true : false;
              if (item.actPartInCountType == 0) {
                item.actPartInCount = "不限制";
              } else if (item.actPartInCountType == 1) {
                item.actPartInCount = item.actPartInCount + "次/每类型";
              } else if (item.actPartInCountType == 2) {
                item.actPartInCount = item.actPartInCount + "次/每活动";
              } else if (item.actPartInCountType == 3) {
                item.actPartInCount = item.actPartInCount + "次/每天";
              } else if (item.actPartInCountType == 4) {
                item.actPartInCount = item.actPartInCount + "次/每周";
              } else if (item.actPartInCountType == 5) {
                item.actPartInCount = item.actPartInCount + "次/每月";
              }
              item.actBegin = item.actBegin.split(" ")[0];
              item.actEnd = item.actEnd.split(" ")[0];
            });
            that.CabinetList.forEach((item) => {
              let allhotel = "";
              if (item.allHotelFlag) {
                allhotel = "全部酒店";
              } else {
                let length = item.actHotelDTOS.length;
                item.actHotelDTOS.forEach((items, index) => {
                  allhotel +=
                    items.hotelName + (index === length - 1 ? "" : "，");
                });
              }
              item.actHotelName = allhotel;
            });
            that.getActList();
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

