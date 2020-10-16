<template>
  <div class="statusmanage">
    <div class="selectdiv">
      <el-button type="text" @click="selectTime(1)">前14天</el-button>
      <el-date-picker
        v-model="activeDay"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="selectTime(3)"
      ></el-date-picker>
      <el-button type="text" @click="selectTime(2)">后14天</el-button>
    </div>
    <div v-if="isHaveData" class="batchmbtn" style="margin-left:12px;">
      <el-button type="primary" @click="searchStatusHandle">查看房态操作</el-button>
    </div>
    <div v-if="authzData['F:BH_BOOK_STATUS_EDIT_BATCH'] && isHaveData" class="batchmbtn">
      <el-button @click="batchModifyStatus">批量修改</el-button>
    </div>
    <br />
    <table class="tablestyle">
      <tr>
        <th class="resname">房型名称</th>
        <th class="resname">房源名称</th>
        <th v-for="item in resourceList" :key="item.index">
          {{item.week}}
          <br />
          {{item.statusDate}}
        </th>
      </tr>
      <tr v-for="item in statusDataList" :key="item.id">
        <td>{{item.roomTypeName}}</td>
        <td>{{item.resourceName}}</td>
        <td
          v-for="subitem in item.bookRoomStateDTOS"
          :key="subitem.id"
          @click="modifyStatus(item,subitem)"
        >
          <span
            v-if="subitem.status != 0 && subitem.fullFlag == 0"
          >{{subitem.roomBookedCount}}/{{subitem.roomCount}}</span>
          <span
            v-if="subitem.status != 0 && subitem.fullFlag == 1"
            class="bgcolor"
          >{{subitem.roomBookedCount}}/{{subitem.roomCount}}</span>
          <span v-if="subitem.status == 0">
            <img src="@/assets/images/rooms3.png" class="stateicon" alt="state" />
          </span>
        </td>
      </tr>
    </table>
    <div class="explaincolor">
      颜色说明：&nbsp;
      <img src="@/assets/images/rooms1.png" class="stateicon" alt="state" />可售&nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src="@/assets/images/rooms2.png"
        class="stateicon"
        alt="state"
      />满房不可售&nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src="@/assets/images/rooms3.png"
        class="stateicon"
        alt="state"
      />不可订
    </div>
    <el-dialog :visible.sync="dislogVisibleModify" width="30%">
      <span slot="title">
        修改
        <span class="mstyle">{{mDate}}</span>
        <span class="mstyle">周{{mWeek}}</span>
      </span>
      <el-form :model="modifyForm" :rules="modifyRules" ref="modifyForm" class="mform">
        <el-form-item>房源名称：{{mRName}}</el-form-item>
        <el-form-item prop="roomInfo">
          <el-checkbox-group v-model="modifyForm.roomInfo">
            <el-checkbox label="0">
              <el-radio-group v-model="mRoomStatus">
                <el-radio :label="1">房间开放</el-radio>
                <el-radio :label="0">房间关闭</el-radio>
              </el-radio-group>
            </el-checkbox>
            <br />
            <el-checkbox label="1">设为满房</el-checkbox>
            <br />
            <el-checkbox label="2">
              设置房间数：设为&nbsp;
              <i class="el-icon-thirdfangkuai1" @click.prevent="jianR"></i>&nbsp;&nbsp;
              <label v-html="mroomNum"></label>&nbsp;&nbsp;
              <i class="el-icon-thirdfangkuai2" @click.prevent="jiaR"></i>&nbsp;间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前预订
              <span
                style="color:#169BD5;"
              >{{mroomNumed}}</span>&nbsp;间
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dislogVisibleModify = false">取 消</el-button>
        <el-button
          v-if="authzData['F:BH_BOOK_STATUS_EDIT']"
          type="primary"
          @click="modifyEnsure('modifyForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量修改" :visible.sync="dislogVisibleBatchModify" width="35%">
      <el-form
        :model="batchMForm"
        :rules="batchMRules"
        ref="batchMForm"
        label-width="120px"
        class="batchmform"
      >
        <el-form-item prop="resourceId">
          <span slot="label">
            <label class="required-icon">*</label> 选择房源：
          </span>
          <el-select v-model="batchMForm.resourceId" placeholder="请选择" @change="resourceSelect">
            <el-option
              v-for="item in resourceDataList"
              :key="item.resourceId"
              :label="item.resourceName"
              :value="item.resourceId"
            ></el-option>
          </el-select>
          <br />
          <div class="tagsListBox">
            <el-tag
              class="tagItem"
              v-for="tag in tagsList"
              :key="tag.resourceId"
              closable
              @close="tagClose(tag)"
            >{{tag.resourceName}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="房态日期：" prop="rangeDate">
          <el-date-picker
            v-model="batchMForm.rangeDate"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="设置：" prop="roomInfo">
          <el-checkbox-group v-model="batchMForm.roomInfo">
            <el-checkbox label="0">
              <el-radio-group v-model="mRoomStatus">
                <el-radio :label="1">房间开放</el-radio>
                <el-radio :label="0">房间关闭</el-radio>
              </el-radio-group>
            </el-checkbox>
            <br />
            <el-checkbox label="1">设为满房</el-checkbox>
            <br />
            <el-checkbox label="2">
              设置房间数：设为&nbsp;
              <i class="el-icon-thirdfangkuai1" @click.prevent="jianR"></i>&nbsp;&nbsp;
              <label v-html="mroomNum"></label>&nbsp;&nbsp;
              <i class="el-icon-thirdfangkuai2" @click.prevent="jiaR"></i>&nbsp;间
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dislogVisibleBatchModify = false">取 消</el-button>
        <el-button type="primary" @click="batchMEnsure('batchMForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HotelBookStatusManage",
  data() {
    return {
      authzData: "",
      hotelId: "",
      activeDay: new Date(),
      endDay: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 14),
      statusDataList: [],
      resourceList: [],
      resourceDataList: [],
      //修改
      dislogVisibleModify: false,
      mDate: "",
      mWeek: "",
      mRName: "",
      mRId: "",
      mRoomStatus: 1,
      mRoomFull: 0,
      mroomNum: 0,
      mroomNumed: 0,
      modifyForm: {
        roomInfo: [],
      },
      modifyRules: {
        roomInfo: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个要修改的房间信息",
            trigger: "change",
          },
        ],
      },
      //批量修改
      isHaveData: false,
      dislogVisibleBatchModify: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      tagsList: [],
      batchMForm: {
        rangeDate: [],
        // useWeek: []
        roomInfo: [],
      },
      batchMRules: {
        // resourceId: [
        //     {required: true, message: '请选择房源', trigger: 'change'}
        // ],
        rangeDate: [
          { required: true, message: "请选择变价日期范围", trigger: "change" },
        ],
        roomInfo: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个要修改的房间信息",
            trigger: "change",
          },
        ],
      },
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
    this.hotelId = localStorage.getItem("hotelId");
    this.bookStatusInfo(this.activeDay, this.endDay);
  },
  methods: {
    //跳转至查看房态操作界面
    searchStatusHandle() {
      this.$router.push({ name: "HotelBookStatusHandleList" });
    },
    //房态数据信息
    bookStatusInfo(startDateD, endDateD) {
      const params = {
        startDate: this.changeDateType(startDateD),
        endDate: this.changeDateType(endDateD),
        hotelId: this.hotelId,
      };
      // console.log(params);
      // return;
      this.$api
        .bookStatusInfo(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.isHaveData = true;
              this.statusDataList = result.data;
              let dateData = result.data[0].bookRoomStateDTOS.map((item) => {
                return item.week + item.stateDateS;
              });
              // console.log(dateData);
              this.resourceList = dateData.map((item) => {
                return {
                  week: item.substr(0, 1),
                  statusDate: item.substr(6, item.length - 1),
                };
              });
              this.resourceDataList = result.data.map((item) => {
                return {
                  resourceId: item.id,
                  resourceName: item.resourceName,
                };
              });
            }
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
    changeDateType(cDate) {
      let yearD = cDate.getFullYear();
      let monthD = cDate.getMonth() + 1;
      let dayD = cDate.getDate();
      if (monthD < 10) {
        monthD = "0" + monthD;
      }
      if (dayD < 10) {
        dayD = "0" + dayD;
      }
      let dateArr = yearD + "-" + monthD + "-" + dayD;
      return dateArr;
    },
    //前、后14天
    selectTime(timeState) {
      if (timeState == 1) {
        //前14天
        let endDateD = this.activeDay;
        this.activeDay = new Date(
          this.activeDay.getTime() - 24 * 60 * 60 * 1000 * 14
        );
        this.bookStatusInfo(this.activeDay, endDateD);
      } else if (timeState == 2) {
        //后14天
        this.activeDay = new Date(
          this.activeDay.getTime() + 24 * 60 * 60 * 1000 * 14
        );
        let endDateD = new Date(
          this.activeDay.getTime() + 24 * 60 * 60 * 1000 * 14
        );
        this.bookStatusInfo(this.activeDay, endDateD);
      } else if (timeState == 3) {
        let endDateD = new Date(
          this.activeDay.getTime() + 24 * 60 * 60 * 1000 * 14
        );
        this.bookStatusInfo(this.activeDay, endDateD);
      }
    },
    //修改
    modifyStatus(item, subitem) {
      let modifyDate = Date.parse(subitem.stateDateS);
      if (modifyDate < Date.now() - 8.64e7) {
        return false;
      } else {
        this.modifyForm.roomInfo = [];
        this.mDate = subitem.stateDateS;
        this.mWeek = subitem.week;
        this.mRName = item.resourceName;
        this.mRId = item.id;
        this.mroomNumed = subitem.roomBookedCount;
        this.mroomNum = subitem.roomCount;
        this.dislogVisibleModify = true;
      }
    },
    modifyEnsure(modifyForm) {
      this.$refs[modifyForm].validate((valid) => {
        if (valid) {
          // for(let i = 0; i < this.modifyForm.roomInfo.length; i++){
          //     if(this.modifyForm.roomInfo[i] == 1){
          //         this.mRoomFull = 1;
          //     }
          //     if(this.modifyForm.roomInfo[i] == 2){
          //         if(this.mroomNum < this.mroomNumed){
          //             this.$message.error("设置房间数应该要大于等于预订的房间数");
          //             return false;
          //         }
          //     }
          // }
          if (this.modifyForm.roomInfo.indexOf("1") == -1) {
            this.mRoomFull = 0;
          } else {
            this.mRoomFull = 1;
          }
          if (this.modifyForm.roomInfo.indexOf("2") > -1) {
            if (this.mroomNum < this.mroomNumed) {
              this.$message.error("设置房间数应该要大于等于预订的房间数");
              return false;
            }
          }
          if (this.mRoomStatus == 0) {
            if (this.modifyForm.roomInfo.indexOf("0") == -1) {
              this.mRoomStatus = 1;
            }
          }
          if (this.modifyForm.roomInfo.indexOf("2") == -1) {
            this.mroomNum = -1;
          }

          const params = {
            modifyResource: this.mRId.toString().split(),
            modifyStartDate: this.mDate,
            modifyEndDate: this.mDate,
            fullFlag: this.mRoomFull,
            status: this.mRoomStatus,
            roomCount: this.mroomNum,
          };

          if (this.modifyForm.roomInfo.indexOf("0") == -1) {
            // this.mRoomStatus = "";
            delete params.status;
          }

          if (this.modifyForm.roomInfo.indexOf("1") == -1) {
            // this.mRoomFull = "";
            delete params.fullFlag;
          }
          if (this.modifyForm.roomInfo.indexOf("2") == -1) {
            // this.mroomNum = "";
            delete params.roomCount;
          }

          // console.log(params);
          // return;
          this.$api
            .bookStatusModify(params)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("房态修改成功！");
                this.dislogVisibleModify = false;
                this.statusDataList = [];
                this.bookStatusInfo(this.activeDay, this.endDay);
              } else {
                this.$message.error(result.msg);
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //批量修改
    batchModifyStatus() {
      this.dislogVisibleBatchModify = true;
    },
    resourceSelect(value) {
      //添加房源
      const resource = this.resourceDataList.find(
        (item) => item.resourceId === value
      );
      // console.log(resource);
      this.tagsList.push(resource);
      // console.log(this.tagsList);
      this.resourceDataList.splice(this.resourceDataList.indexOf(resource), 1);
      // console.log(this.resourceDataList);
      this.batchMForm.resourceId = "";
    },
    tagClose(tag) {
      //取消添加的房源
      // console.log(tag);
      this.tagsList.splice(this.tagsList.indexOf(tag), 1);
      this.resourceDataList.push(tag);
      // console.log(this.resourceDataList);
    },
    batchMEnsure(batchMForm) {
      const resIdList = this.tagsList.map((item) => {
        return item.resourceId;
      });
      this.$refs[batchMForm].validate((valid) => {
        if (valid) {
          if (resIdList.length == 0) {
            this.$message.error("请选择房源！");
            return;
          }
          if (this.batchMForm.roomInfo.indexOf("1") == -1) {
            this.mRoomFull = 0;
          } else {
            this.mRoomFull = 1;
          }
          if (this.mRoomStatus == 0) {
            if (this.batchMForm.roomInfo.indexOf("0") == -1) {
              this.mRoomStatus = 1;
            }
          }
          if (this.batchMForm.roomInfo.indexOf("2") == -1) {
            this.mroomNum = -1;
          }

          const params = {
            modifyResource: resIdList,
            modifyStartDate: this.batchMForm.rangeDate[0],
            modifyEndDate: this.batchMForm.rangeDate[1],
            fullFlag: this.mRoomFull,
            status: this.mRoomStatus,
            roomCount: this.mroomNum,
          };
          if (this.batchMForm.roomInfo.indexOf("0") == -1) {
            // this.mRoomStatus = "";
            delete params.status;
          }

          if (this.batchMForm.roomInfo.indexOf("1") == -1) {
            // this.mRoomFull = "";
            delete params.fullFlag;
          }
          if (this.batchMForm.roomInfo.indexOf("2") == -1) {
            // this.mroomNum = "";
            delete params.roomCount;
          }
          // console.log(params);
          // return;
          this.$api
            .bookStatusModify(params)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("批量修改成功！");
                this.dislogVisibleBatchModify = false;
                this.statusDataList = [];
                this.bookStatusInfo(this.activeDay, this.endDay);
              } else {
                this.$message.error(result.msg);
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //房间数-计算
    jianR() {
      if (this.mroomNum > 0) {
        this.mroomNum -= 1;
      }
    },
    jiaR() {
      this.mroomNum += 1;
    },
  },
};
</script>

<style scoped>
.el-date-editor.el-input {
  width: 140px;
}
</style>

<style lang="less" scoped>
.statusmanage {
  .tagsListBox {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tagItem {
      margin: 6px;
    }
  }
  .selectdiv {
    text-align: left;
  }
  .batchmbtn {
    float: right;
    margin: -20px 0px 10px 0px;
  }
  .tablestyle {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    th {
      height: 40px;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: #eee;
    }
    td {
      height: 36px;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .resname {
      background: #fff;
    }
    .bgcolor {
      background: #d81e06;
      display: inline-block;
      width: 100%;
      line-height: 36px;
    }
  }
  .explaincolor {
    font-size: 14px;
    height: 40px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    background: #ddd;
    padding: 0px 20px;
    margin-top: 30px;
  }
  .stateicon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .mstyle {
    font-size: 14px;
    margin-left: 10px;
  }
  .mform {
    text-align: left;
    padding: 0px 10%;
  }
  .batchmform {
    text-align: left;
    .required-icon {
      color: #ff3030;
    }
    .el-checkbox {
      margin-right: 15px;
    }
    .el-input {
      width: 42%;
    }
  }
}
</style>

