<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="openid">
        <el-input v-model="openid" placeholder="输入openid"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="nickName" placeholder="输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="柜子类型名称">
        <el-select
          v-model="inquireCabType"
          filterable
          remote
          :remote-method="remoteCabType"
          @focus="getCabTypeList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in cabTypeList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select v-model="hotelID" :loading="loadingH" @change="changeHotel" placeholder="请选择">
          <el-option
            v-for="item in hotelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="柜子编号">
        <el-select
          v-model="cabinetID"
          :loading="loadingH"
          :disabled="hotelID==''?true:false"
          placeholder="请选择"
        >
          <el-option
            v-for="item in cabinetIDList"
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
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="investorOpenId" label="openid" align="center"></el-table-column>
      <el-table-column prop="investorNickName" label="用户呢称" align="center"></el-table-column>
      <el-table-column prop="contactsName" label="联系人" align="center"></el-table-column>
      <el-table-column prop="contactsPhone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">{{scope.row.status == 0 ? '未抽取':'已抽取'}}</template>
      </el-table-column>
      <el-table-column prop="cabTypeName" label="柜子类型名称" align="center"></el-table-column>
      <el-table-column label="酒店名称" align="center">
        <template slot-scope="scope">{{scope.row.hotelName == null ? '未绑定':scope.row.hotelName}}</template>
      </el-table-column>
      <el-table-column prop="hotelCabNum" label="柜子编号" align="center"></el-table-column>
      <el-table-column label="绑定时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.bindingTime=='1970-01-01 00:00:00'?'-':scope.row.bindingTime}}</template>
      </el-table-column>
      <el-table-column label="退款状态" align="center">
        <template slot-scope="scope">{{scope.row.refoundStatus==0?'正常':'已退款'}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="退款时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.refoundTime=='1970-01-01 00:00:00'?'-':scope.row.refoundTime}}</template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LauncherinvestorCabinet",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      openid: "",
      nickName: "",
      inquireCabType: "",
      status: "",
      hotelID: "",
      cabinetID: "",
      hotelList: [],
      cabinetIDList: [],
      statusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "未抽取",
          value: 0,
        },
        {
          label: "已抽取",
          value: 1,
        },
      ],
      cabTypeList: [],

      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1,
    };
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
    this.openid = this.$route.params.modifyid;
  },
  mounted() {
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.openid = "";
      this.nickName = "";
      this.status = "";
      this.inquireCabType = "";
      this.hotelID = "";
      this.cabinetID = "";
      this.Getdata();
    },
    //查询
    inquire() {
      this.Getdata();
      this.$store.commit("setSearchList", {
        openid: this.openid,
        nickName: this.nickName,
        status: this.status,
        inquireCabType: this.inquireCabType,
        hotelID: this.hotelID,
        cabinetID: this.cabinetID,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    remoteCabType(val) {
      this.getCabTypeList(val);
    },
    //柜子类型列表
    getCabTypeList(ctName) {
      const params = {};
      this.$api
        .getCabTypeList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.cabTypeList = result.data.map((item) => {
                return {
                  id: item.id,
                  typeName: item.typeName,
                };
              });
            }
            const cabTypeAll = {
              id: "",
              typeName: "全部",
            };
            this.cabTypeList.unshift(cabTypeAll);
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
    //获取柜子编号
    changeHotel() {
      if (this.hotelID === "") {
        this.cabinetID = "";
      } else {
        const params = {
          hotelId: this.hotelID,
        };
        this.$api
          .FsCabinetHotelAll({ params })
          .then((response) => {
            if (response.data.code == 0) {
              this.cabinetIDList = response.data.data.map((item) => {
                return {
                  label: item.hotelCabNum,
                  value: item.id,
                };
              });
              let alldata = {
                value: "",
                label: "全部",
              };
              this.cabinetIDList.unshift(alldata);
            } else {
              this.$alert(response.data.data.msg, "警告", {
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
    //非空校验
    ifEmpty(item) {
      if (item === "") {
        return undefined;
      } else {
        return item;
      }
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        openId: this.ifEmpty(this.openid),
        nickName: this.ifEmpty(this.nickName),
        hotelId: this.ifEmpty(this.hotelID),
        cabinetId: this.ifEmpty(this.cabinetID),
        status: this.ifEmpty(this.status),
        cabTypeId: this.ifEmpty(this.inquireCabType),
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .FsCabinetInvestor({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.CabinetList = response.data.data.records;
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
    getHotelList() {
      this.$api
        .FsHotelAll({})
        .then((response) => {
          if (response.data.code == 0) {
            this.hotelList = response.data.data.map((item) => {
              return {
                label: item.hotelName,
                value: item.id,
              };
            });
            let alldata = {
              value: "",
              label: "全部",
            };
            this.hotelList.unshift(alldata);
          } else {
            this.$alert(response.data.data.msg, "警告", {
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
  },
};
</script>

<style lang="less" scoped>

</style>

