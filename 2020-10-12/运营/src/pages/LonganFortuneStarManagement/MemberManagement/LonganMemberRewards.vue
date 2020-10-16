<template>
  <div class="channellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="openId">
        <el-input v-model="inquireOpenId"></el-input>
      </el-form-item>
      <el-form-item label="柜子类型">
        <el-select
          v-model="inquireCabType"
          filterable
          remote
          :remote-method="remoteCabType"
          :loading="loadingC"
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
      <el-form-item label="奖励类型">
        <el-select v-model="inquirebonusType" :loading="loadingC" placeholder="请选择">
          <el-option
            v-for="item in bonusTypeList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖励时间">
        <el-date-picker
          v-model="inquireCreateTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
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
    <el-table :data="PartnerDataList" border stripe style="width:100%;">
      <el-table-column prop="openId" label="openId" align="center"></el-table-column>
      <el-table-column label="柜子类型" align="center">
        <template slot-scope="scope">{{scope.row.cabTypeName?scope.row.cabTypeName:"-"}}</template>
      </el-table-column>
      <el-table-column label="柜子数量" align="center">
        <template slot-scope="scope">{{scope.row.cabCount?scope.row.cabCount:"-"}}</template>
      </el-table-column>
      <el-table-column label="实付金额" align="center">
        <template slot-scope="scope">{{scope.row.orderPayAmount?scope.row.orderPayAmount:"-"}}</template>
      </el-table-column>
      <el-table-column label="奖励类型" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.detailType==3?"推广奖":scope.row.detailType==4?"团队奖":""}}</template>
      </el-table-column>
      <el-table-column prop="amount" label="奖励金额" align="center"></el-table-column>
      <el-table-column prop="nickName" label="奖励人" align="center"></el-table-column>
      <el-table-column prop="transTime" label="奖励时间" align="center"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganMemberRewards",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      inquireOpenId: "",
      inquireCabType: "",
      cabTypeList: [],
      loadingC: false,
      inquireCreateTime: [],
      PartnerDataList: [],
      bonusTypeList: [
        {
          id: "",
          typeName: "全部",
        },
        {
          id: 3,
          typeName: "推广奖",
        },
        {
          id: 4,
          typeName: "团队奖",
        },
      ],
      inquirebonusType: "",
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.channelPartnerList();
  },
  methods: {
    resetFunc() {
      this.inquireOpenId = "";
      this.inquireCabType = "";
      this.inquirebonusType = "";
      this.inquireCreateTime = [];
      this.channelPartnerList();
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
    remoteCabType(val) {
      this.getCabTypeList(val);
    },
    //合伙人列表
    channelPartnerList() {
      const params = {
        openId: this.inquireOpenId,
        bonusType: this.inquirebonusType,
        cabTypeId: this.inquireCabType,
        transTimeFrom: this.inquireCreateTime[0],
        transTimeTo: this.inquireCreateTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getMemberBonus({ params })
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.PartnerDataList = result.data.records;
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.channelPartnerList();
      this.$store.commit("setSearchList", {
        inquireOpenId: this.inquireOpenId,
        inquireCabType: this.inquireCabType,
        inquirebonusType: this.inquirebonusType,
        inquireCreateTime: this.inquireCreateTime,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.channelPartnerList();
    },
  },
};
</script>

<style lang="less" scoped>
.channellist {

}
</style>

