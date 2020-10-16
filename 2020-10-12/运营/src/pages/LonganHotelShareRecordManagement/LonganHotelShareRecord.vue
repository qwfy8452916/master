<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称：">
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @change="getSelectedHotel"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="板块类型：">
                <el-select @change="changeModel" v-model="modelType" placeholder="请选择板块类型">
                    <el-option v-for="item in modelTypeList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="板块：">
                <el-select :disabled="!ifSelect" v-model="modelId" placeholder="请选择板块">
                    <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享类型：">
                <el-select v-model="shareType" placeholder="请选择分享类型">
                    <el-option v-for="item in shareTypeList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分销：">
                <el-select v-model="shareSaleFlag" placeholder="请选择是否分销">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="1" label="是"></el-option>
                    <el-option value="0" label="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享人类型：">
                <el-select v-model="shareUserType" @change="clearId" placeholder="请选择分享人类型">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="1" label="员工"></el-option>
                    <el-option value="2" label="顾客"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享人ID：">
                <el-input :disabled="!shareUserType" v-model="shareUserId" placeholder="请输入分享人ID"></el-input>
            </el-form-item>
            <el-form-item label="分享日期">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店" align=center></el-table-column>
            <el-table-column label="板块类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.modelType == 1">功能区</span>
                    <span v-if="scope.row.modelType == 2">客房协议价</span>
                    <span v-if="scope.row.modelType == 3">预售券</span>
                </template>
            </el-table-column>
            <el-table-column prop="modelName" label="板块" align=center></el-table-column>
            <el-table-column label="分享类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareType == 100">所有</span>
                    <span v-if="scope.row.shareType == 1">列表</span>
                    <span v-if="scope.row.shareType == 2">单项</span>
                </template>
            </el-table-column>
            <el-table-column label="分享对象" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareType == 100">所有</span>
                    <span v-if="scope.row.shareType == 1">列表</span>
                    <span v-if="scope.row.shareType == 2">单项</span>
                </template>
            </el-table-column>
            <el-table-column label="是否分销" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareSaleFlag">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="分享人类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareUserType == 1">员工</span>
                    <span v-if="scope.row.shareUserType == 2">顾客</span>
                </template>
            </el-table-column>
            <el-table-column prop="shareUserId" label="分享人ID" align=center></el-table-column>
            <el-table-column prop="shareUserName" label="分享人名称" align=center></el-table-column>
            <el-table-column prop="visitCount" label="分享访问次数" align=center></el-table-column>
            <el-table-column prop="saleProdCount" label="售出商品数量" align=center></el-table-column>
            <el-table-column prop="orderCount" label="订单数量" align=center></el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" align=center></el-table-column>
            <el-table-column prop="shareBonus" label="分享奖励" align=center></el-table-column>
            <el-table-column prop="shareManageBonus" label="管理奖励" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center width="120px">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="CabinetglManager1(scope.$index, CabinetList)">分享访问记录</el-button>
                    <el-button type="text" size="small" @click="CabinetglManager2(scope.$index, CabinetList)">分享订单记录</el-button>
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
  name: "LonganHotelShareRecord",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      hotelId: "",
      hotelList: [],
      modelId: "",
      modelType: "",
      shareType: "",
      modelTypeList: [
        {
          id: "",
          label: "全部",
        },
        {
          id: 1,
          label: "客房协议价",
        },
        {
          id: 2,
          label: "功能区",
        },
        {
          id: 3,
          label: "预售券",
        },
      ],
      shareTypeList: [
        {
          id: "",
          label: "全部",
        },
        {
          id: 100,
          label: "所有",
        },
        {
          id: 1,
          label: "列表",
        },
        {
          id: 2,
          label: "单项",
        },
      ],
      modelList: "",
      shareSaleFlag: "",
      shareUserId: "",
      dateRange: [],
      shareUserType: "",

      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  computed: {
    ifSelect() {
      if (!(!this.hotelId && this.modelType == 2) && this.modelType) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    //    this.oprOgrId=localStorage.orgId
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
    if (this.$route.query.userType !== undefined) {
      this.shareUserType = this.$route.query.userType.toString();
    }
    if (this.$route.query.userId !== undefined) {
      this.shareUserId = this.$route.query.userId;
    }
    this.getHotelList();
    this.Getdata();
  },
  methods: {
    clearId(){
        this.shareUserId = ''
    },
    changeModel() {
      this.modelId = "";
      if (this.modelType) {
        if (this.modelType == 2) {
          if (this.hotelId) {
            this.getSelectedHotel();
          }
        } else if (this.modelType == 1) {
          this.modelList = [{ id: 0, label: "客房协议价" }];
        } else if (this.modelType == 3) {
          this.modelList = [{ id: 0, label: "预售券" }];
        }
      }
    },
    getSelectedHotel() {
      this.modelId = "";
      if (this.modelType == 2) {
        const params = {
          hotelId: this.hotelId,
          pageSize: 50,
          pageNo: 1,
        };
        this.$api
          .HotelFuncList(params)
          .then((response) => {
            if (response.data.code == 0) {
              let recordsData = response.data.data.records;
              let areaList = recordsData.map((item) => {
                return {
                  label: item.funcCnName,
                  id: item.id,
                };
              });
              areaList.unshift({
                label: "全部",
                id: "",
              });
              this.modelList = areaList;
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
      }
    },

    resetFunc() {
      this.hotelId = "";
      this.modelId = "";
      this.modelType = "";
      this.shareSaleFlag = "";
      this.shareType = "";
      this.shareUserId = "";
      this.shareUserType = "";
      this.dateRange = [];
      this.Getdata();
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        modelId: this.modelId,
        modelType: this.modelType,
        shareSaleFlag: this.shareSaleFlag,
        shareType: this.shareType,
        shareUserId: this.shareUserId,
        shareUserType: this.shareUserType,
        dateRange: this.dateRange,
      });
    },

    //详情
    CabinetglManager1(index, row) {
      let guiId = row[index].shareCode;
      this.$router.push({
        name: "LonganHotelVisitRecord",
        query: { modifyid: guiId },
      });
    },
    CabinetglManager2(index, row) {
      let guiId = row[index].shareCode;
      this.$router.push({
        name: "LonganHotelOrderRecord",
        query: { modifyid: guiId },
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
            this.hotelList.unshift({
              id: "",
              hotelName: "全部",
            });
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
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },

    Getdata() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
        modelId: this.modelId,
        modelType: this.modelType,
        shareSaleFlag: this.shareSaleFlag,
        shareType: this.shareType,
        shareUserId: this.shareUserId,
        shareUserType: this.shareUserType,
        shareTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
        shareTimeTo: this.dateRange == null ? undefined : this.dateRange[1],

        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .selHotelShareRecords({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
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

