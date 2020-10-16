<template>
  <div class="pricemanage">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          v-model="hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
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
    <div v-if="isHaveResource"  class="batchmbtn">
      <el-button type="primary" @click="searchChangePrice()">查看变价单</el-button>
    </div>
    <el-tabs v-model="typeNameTab" @tab-click="typeActiveFun">
      <el-tab-pane
        v-for="item in typeDataList"
        :key="item.id"
        :label="item.typeName"
        :name="item.id"
      ></el-tab-pane>
    </el-tabs>
    <el-tabs v-if="isHaveResource" v-model="resourceNameTab" @tab-click="activeTabFun">
      <el-tab-pane
        v-for="item in resourceDataList"
        :key="item.id"
        :label="item.resourceName"
        :name="item.id"
      >
        <el-calendar>
          <template slot="dateCell" slot-scope="{data}">
            <span v-for="item in priceDataInfo" :key="item.id">
              <p
                class="calday"
                v-if="item.priceDate == data.day"
                :class="data.isSelected ? 'is-selected' : ''"
              >
                {{ data.day.split('-').slice(2).join('-') }}
                <br />
                <br />
                <span :class="data.isSelected ? 'is-selected' : ''">{{item.price}}</span>
              </p>
            </span>
          </template>
        </el-calendar>
      </el-tab-pane>
    </el-tabs>
    <p v-else>暂无数据</p>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
export default {
  name: "LonganBookPrice",
  components: {
    resetButton,
  },
  data() {
    var decimalsReg = /^\d+(\.\d+)?$/;
    var validateDecimals = (rule, value, callback) => {
      if (!decimalsReg.test(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    return {
      authzData: "",
      hotelId: "",
      hotelList: [],
      loadingH: false,
      typeNameTab: "",
      typeDataList: [],
      resourceNameTab: "",
      resourceDataList: [],
      priceDataInfo: [],
      isHaveType: false,
      isHaveResource: false,
      isOneSend: true,
      //切换 - 月
      nowDate: new Date(),
      nowYear: "",
      nowMonth: "",
      activeMonth: "",
      resourceIndex: "0",
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
    this.getHotelList();
    this.nowYear = this.nowDate.getFullYear();
    this.nowMonth = this.nowDate.getMonth() + 1;
  },
  methods: {
    searchChangePrice() {
      this.$router.push({ name: "LonganBookPriceList" });
    },
    resetFunc() {
      this.hotelId = "";
      this.getHotelList();
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 5000,
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
            if (this.isOneSend) {
              this.isOneSend = false;
              if (this.hotelList.length != 0) {
                this.hotelId = this.hotelList[0].id;
                this.getTypeList();
              }
            }
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
        });
    },
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //查询
    inquire() {
      this.getTypeList();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
      });
    },
    //获取房型列表
    getTypeList() {
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
      };
      this.$api
        .getBookTypeList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.isHaveType = true;
              this.typeNameTab = result.data[0].id.toString();
              this.typeDataList = result.data.map((item) => {
                return {
                  id: item.id.toString(),
                  typeName: item.typeName,
                };
              });
              this.getResourceList();
            } else {
              this.isHaveType = false;
              this.$message.warning("此酒店下暂无房型信息！");
              this.typeDataList = [];
              this.resourceDataList = [];
              this.priceDataInfo = [];
            }
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch((e) => {
              e;
            });
        });
    },
    //切换房型
    typeActiveFun() {
      this.getResourceList();
    },
    //获取房源列表
    getResourceList() {
      const loading = this.$loading({
        lock: true,
        text: "加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(192,196,204, 0.4)",
      });
      const params = {
        hotelId: this.hotelId,
        roomType: this.typeNameTab,
      };
      // console.log(params);
      this.$api
        .getBookResourceList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.isHaveResource = true;
              this.resourceNameTab = result.data[0].id.toString();
              this.resourceDataList = result.data.map((item) => {
                return {
                  id: item.id.toString(),
                  resourceName: item.resourceName,
                };
              });
              loading.close();
              this.bookPriceInfo();
            } else {
              this.isHaveResource = false;
              this.$message.warning("此房型下暂无对应的房源！");
              this.resourceDataList = [];
              this.priceDataInfo = [];
              loading.close();
            }
          } else {
            this.$message.error(result.msg);
            loading.close();
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch((e) => {
              e;
            });
          loading.close();
        });
    },
    //切换房源
    activeTabFun(tab, event) {
      this.resourceIndex = tab.index;
      // console.log(tab);
      // console.log(event);
      this.bookPriceInfo();
    },
    //房价数据信息
    bookPriceInfo() {
      const loading = this.$loading({
        lock: true,
        text: "加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(192,196,204, 0.4)",
      });
      const params = {
        resource: parseInt(this.resourceNameTab),
        year: this.nowYear,
        month: this.nowMonth,
      };
      this.$api
        .bookPriceInfo(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.priceDataInfo = result.data.map((item) => {
              let priceStr = "￥ " + item.price;
              return {
                price: priceStr,
                priceDate: item.priceDateS,
                roomResourceId: item.roomResourceId,
              };
            });
            loading.close();
            this.bindingClick();
          } else {
            this.$message.error(result.msg);
            loading.close();
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch((e) => {
              e;
            });
          loading.close();
        });
    },
    getYearMonth() {
      let nowYM = document.getElementsByClassName("el-calendar__title");
      // console.log(nowYM);
      let nowYMArr = nowYM[this.resourceIndex].innerText
        .split(" ")
        .slice(0)
        .join("");
      // console.log(nowYMArr);
      // let nowMArr = nowYMArr.slice(5,nowYMArr.length-1);
      let nowYMArr3 = nowYMArr;
      let nowYMArr1 = nowYMArr3.replace("年", "-");
      let nowYMArr2 = nowYMArr1.replace("月", "");
      // console.log(nowYMArr2);
      let nowYArr = nowYMArr2.split("-")[0];
      let nowMArr = nowYMArr2.split("-")[1];
      // console.log(nowMArr);
      if (nowMArr < 10) {
        nowMArr = "0" + nowMArr;
      }
      this.nowYear = nowYArr;
      this.nowMonth = nowMArr;
      let nowYMData = nowYMArr.split("年")[0] + "-" + nowMArr;
      // console.log(nowYMData);
      return nowYMData;
    },
    bindingClick() {
      const that = this;
      let activeButton = document.getElementsByTagName("button");
      // console.log(activeButton);
      for (let i = 0; i < activeButton.length; i++) {
        let btnText = activeButton[i].innerText.replace(/\s+/g, "");
        if (btnText == "上个月") {
          activeButton[i].onclick = function () {
            that.activeMonth = that.getYearMonth();
            that.selectMonth(that.activeMonth);
          };
        } else if (btnText == "今天") {
          activeButton[i].onclick = function () {
            that.activeMonth = that.getYearMonth();
            that.selectMonth(that.activeMonth);
          };
        } else if (btnText == "下个月") {
          activeButton[i].onclick = function () {
            that.activeMonth = that.getYearMonth();
            that.selectMonth(that.activeMonth);
          };
        }
      }
    },
    selectMonth(val) {
      // console.log(val);
      this.nowYear = val.substr(0, 4);
      this.nowMonth = val.substr(5, 2);
      this.bookPriceInfo();
    },
  },
};
</script>

<style>
.el-calendar__header {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
}
.el-calendar__title {
  margin-right: 30px;
}
</style>

<style lang="less" scoped>
.batchmbtn {
  position: absolute;
  right: 40px;
  margin-top: -6px;
  z-index: 1;
}
.pricemanage{
  color: #aaaaaa;
}
.calday {
  margin: -8px;
  padding: 16px 0px;
  font-size: 14px;
}
.is-selected {
  color: #409eff;
}
.spancolor {
  color: #bbb;
  font-size: 14px;
}
.mstyle {
  font-size: 14px;
  margin-left: 10px;
}
.batchmform {
  text-align: left;
  .el-checkbox {
    margin-right: 15px;
  }
  .el-input {
    width: 42%;
  }
}
</style>

