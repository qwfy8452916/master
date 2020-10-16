<template>
  <div class="hoteladd">
    <p class="title">活动明细</p>
    <div class="detail">
      <p style="color:#ccc;">活动信息</p>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动名称：</span><span class="content">{{ actName }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动类型：</span><span class="content">{{ actType }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动时间：</span
        ><span class="content">{{ actBegin + " 至 " + actEnd }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>级别：</span><span class="content">{{ actScopeLevel }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts" v-if="dateSels">
        <span class="content" style="margin-left:70px;">{{ dateSels }}</span>
      </div>
      <el-divider v-if="dateSels"></el-divider>
      <div class="parts" v-if="timeSels">
        <span class="content" style="margin-left:70px;">{{ timeSels }}</span>
      </div>
      <el-divider v-if="timeSels"></el-divider>
    </div>
    <div class="code">
      <div class="code1">
        <span class="codeTitle">报名码</span>
        <div class="code1_1">
          <span>（只对报名可用）</span>
          <div class="imgCode" v-if="isSetting">
            <el-image
              :src="meetingEnlistQrUrl"
              :preview-src-list="[meetingEnlistQrUrl]"
            >
            </el-image>
          </div>
          <span style="font-size:14px;">点击可查看大图</span>
        </div>
      </div>
      <div class="code1">
        <span class="codeTitle">签到码</span>
        <div class="code1_1">
          <span>（只对签到可用）</span>
          <div class="imgCode" v-if="isSetting">
            <el-image
              :src="meetingSignQrUrl"
              :preview-src-list="[meetingSignQrUrl]"
            >
            </el-image>
          </div>
          <span>点击可查看大图</span>
        </div>
      </div>
    </div>
    <p style="font-weight:bold">会议设置</p>
    <el-form
      :model="Commoditygai"
      :rules="rules"
      ref="Commoditygai"
      label-width="140px"
      class="hotelform"
    >
      <el-form-item label="会议名称：" prop="meetingName">
        <el-input
          maxlength="30"
          v-model="Commoditygai.meetingName"
          placeholder="请输入会议名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="会议地点：" prop="meetingPlace">
        <el-input
          maxlength="30"
          v-model="Commoditygai.meetingPlace"
          placeholder="请输入会议地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否要报名：" prop="meetingEnlistFlag">
        <el-popover
          placement="right-start"
          title="提示"
          width="200"
          trigger="hover"
          content="如果开关打开，表示需要先报名 ；并且要设置报名截止时间。如果开关关上，则可以不用报名。"
        >
          <el-button
            style="border:none;padding:0;vertical-align:middle;"
            slot="reference"
          >
            <i class="el-icon-warning-outline" style="font-size:18px"></i>
          </el-button>
        </el-popover>
        <el-switch v-model="Commoditygai.meetingEnlistFlag"></el-switch>
      </el-form-item>
      <el-form-item
        label="报名截止时间："
        v-if="Commoditygai.meetingEnlistFlag"
        prop="meetingEnlistDeadLine"
      >
        <el-date-picker
          v-model="Commoditygai.meetingEnlistDeadLine"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :picker-options="pickerOptions0"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="是否要审核："
        v-if="Commoditygai.meetingEnlistFlag"
        prop="meetingAuditFlag"
      >
        <el-popover
          placement="right-start"
          title="提示"
          width="200"
          trigger="hover"
          content="如果开关打开，表示报名的用户都需要在后台进行审核，审核通过的才能签到打卡成功。 如果关上，则不需要审核。"
        >
          <el-button
            style="border:none;padding:0;vertical-align:middle;"
            slot="reference"
          >
            <i class="el-icon-warning-outline" style="font-size:18px"></i>
          </el-button>
        </el-popover>
        <el-switch v-model="Commoditygai.meetingAuditFlag"></el-switch>
      </el-form-item>
      <el-form-item label="进场配置：" prop="meetingEnterId">
        <el-select
          v-model="Commoditygai.meetingEnterId"
          placeholder="选择进场配置"
        >
          <el-option
            v-for="item in enterSettings"
            :value="item.id"
            :label="item.settingName"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <uploadpics
        :props="'actMeetingImageDTOS'"
        :type="'会议描述图片：'"
        :descList="Commoditygai.actMeetingImageDTOS"
        @descListevent="descListevent"
      ></uploadpics>
      <p style="font-weight:bold">会议资料设置</p>
      <el-form-item label="会议资料：" prop="meetingData">
        <el-upload
          :action="uploadUrl"
          :headers="headers"
          name="fileContent"
          :file-list="fileList"
          :on-success="handleSuccess1"
          :on-remove="handleRemove1"
          :on-exceed="handleExceed1"
          :on-error="imgUploadError1"
          :before-remove="beforeRemove1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <p style="font-weight:bold">会议礼包设置</p>
      <el-form-item label="会议礼包开关：" prop="couponFlag">
        <el-switch v-model="Commoditygai.couponFlag"></el-switch>
      </el-form-item>
      <el-form-item v-if="Commoditygai.couponFlag" label="礼品券管理：">
        <el-form-item>
          <el-button
            type="primary"
            class="addbtn"
            size="small"
            @click="giftAddLine"
            >添加</el-button
          >
        </el-form-item>
        <el-table :data="Commoditygai.actMeetingCouponDTOS">
          <el-table-column label="礼包类型" min-width="80px" align="center">
            <template slot-scope="scope">
              <el-form-item
                :prop="'actMeetingCouponDTOS.' + scope.$index + '.couponType'"
                :rules="rules.couponType"
              >
                <el-select
                  style="width:160px;"
                  v-model="scope.row.couponType"
                  @change="selectCouponT(scope.$index, scope.row.couponType)"
                  placeholder="请选择类型"
                >
                  <el-option label="优惠券" :value="1"></el-option>
                  <el-option label="卡券" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="礼包名称" min-width="100px" align="center">
            <template slot-scope="scope">
              <el-form-item
                class="tableItem"
                :prop="'actMeetingCouponDTOS.' + scope.$index + '.couponId'"
                :rules="rules.couponId"
              >
                <el-select
                  v-model="scope.row.couponId"
                  style="width:160px;"
                  placeholder="请选择名称"
                >
                  <el-option
                    v-for="item in scope.row.couponList"
                    :key="item.id"
                    :label="item.couponName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数量" min-width="80px" align="center">
            <template slot-scope="scope">
              <el-form-item
                class="tableItem"
                :prop="'actMeetingCouponDTOS.' + scope.$index + '.couponCount'"
                :rules="rules.couponCount"
              >
                <el-input
                  style="width:160px;"
                  v-model.number="scope.row.couponCount"
                  placeholder="请输入数量"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="80px" align="center">
            <template slot-scope="scope">
              <el-form-item
                class="tableItem"
                :prop="'actMeetingCouponDTOS.' + scope.$index + '.couponSort'"
                :rules="rules.couponSort"
              >
                <el-input
                  style="width:160px;"
                  v-model.number="scope.row.couponSort"
                  placeholder="请输入排序"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="40px" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-button
                  type="text"
                  size="small"
                  @click="giftDeleteLine(scope.$index)"
                  >移除</el-button
                >
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        v-if="Commoditygai.couponFlag"
        label="礼包图片："
        prop="actImagePath"
      >
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :headers="headers"
          :limit="1"
          :file-list="imageListOne"
          name="fileContent"
          :on-success="handleSuccess2"
          :on-remove="handleRemove2"
          :on-exceed="handleExceed2"
          :on-error="imgUploadError2"
          :before-remove="beforeRemove2"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip"
            >&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label
          >
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="none" @click="cancelRedpack()">取消</el-button>
        <el-button type="primary" @click="ensureRedpack('Commoditygai')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadpics from "./uploadpics";
export default {
  name: "LaunchCabinetAdd",
  components: {
    uploadpics
  },
  data() {
    var validatorTime = (rule, value, callback) => {
      if (
        this.Commoditygai.meetingEnlistFlag &&
        !this.Commoditygai.meetingEnlistDeadLine
      ) {
        callback(new Error("请填写报名截止时间"));
      } else {
        callback();
      }
    };
    var validatorimg = (rule, value, callback) => {
      if (this.Commoditygai.couponFlag && !this.Commoditygai.actImagePath) {
        callback(new Error("请上传礼包图片"));
      } else {
        callback();
      }
    };
    return {
      uploadUrl: this.$api.upload_file_url,
      headers: "",
      pickerOptions0: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      Commoditygai: {
        meetingName: "",
        meetingPlace: "",
        meetingEnlistFlag: false,
        meetingEnlistDeadLine: "",
        meetingAuditFlag: false,
        meetingEnterId: "",
        actMeetingCouponDTOS: [
          {
            couponType: "",
            couponList: [],
            couponId: "",
            couponCount: 1,
            couponSort: 0
          }
        ],
        meetingData: [],
        actMeetingImageDTOS: [],
        couponFlag: false,
        actImagePath: ""
      },
      enterSettings: [],
      yCouponList: [],
      cCouponList: [],
      imageListOne: [],
      fileList: [],
      isSetting: false,

      actName: "",
      actType: "",
      actScopeLevel: "",
      actBegin: "",
      actEnd: "",
      dateSels: "",
      timeSels: "",
      actID: "",
      hotelId: "",
      actHotelId: "",
      hotelName: "",

      detailId: "",
      meetingEnlistQrUrl: "",
      meetingSignQrUrl: "",

      rules: {
        meetingName: [
          { required: true, message: "请输入会议名称", trigger: "blur" }
        ],
        meetingPlace: [
          { required: true, message: "请输入会议地点", trigger: "blur" }
        ],
        meetingEnterId: [
          { required: true, message: "请选择进场配置", trigger: "change" }
        ],
        actMeetingImageDTOS: [
          { required: true, message: "请上传会议描述图片", trigger: "change" }
        ],
        actImagePath: [{ validator: validatorimg, trigger: "change" }],
        meetingEnlistDeadLine: [
          { validator: validatorTime, trigger: "change" }
        ],
        couponType: [
          { required: true, message: "请选择礼包类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    const token = localStorage.getItem("Authorization");
    this.headers = { Authorization: token };
    this.actID = this.$route.query.modifyid;
    // this.hotelId = this.$route.query.hotelId;
    this.getFillbackData();
    // this.getEnterSettings();
  },
  methods: {
    descListevent(e) {
      this.Commoditygai.actMeetingImageDTOS = e.fileList;
    },
    cancelRedpack() {
      this.$router.push({ name: "HotelActivityList" });
    },
    getEnterSettings() {
      let params = {
        all: 1,
        hotelId: this.hotelId
      };
      this.$api
        .getCabinetConfig(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.enterSettings = result.data;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //添加
    giftAddLine() {
      let newLine = {
        couponType: "",
        couponId: "",
        couponCount: 1,
        couponSort: 0
      };
      this.Commoditygai.actMeetingCouponDTOS.push(newLine);
    },
    //移除
    giftDeleteLine(index) {
      this.Commoditygai.actMeetingCouponDTOS.splice(index, 1);
    },
    //卡券列表
    getActVouList(hotelId) {
      const that = this;
      let params = {
        hotelId: hotelId
      };
      this.$api
        .getActVouList(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.cCouponList = result.data.map(item => {
              return {
                id: item.id,
                couponName: item.vouName
              };
            });
            this.Commoditygai.actMeetingCouponDTOS = this.Commoditygai.actMeetingCouponDTOS.map(
              item => {
                let couponList;
                if (item.couponType == 1) {
                  couponList = that.yCouponList;
                } else {
                  couponList = that.cCouponList;
                }
                return {
                  couponType: item.couponType,
                  couponList: couponList,
                  couponId: item.couponId,
                  couponCount: item.couponCount,
                  couponSort: item.couponSort
                };
              }
            );
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //优惠券列表
    getActCouponList(actStartDate, actEndDate) {
      const that = this;
      let params = {
        actStartDate: actStartDate,
        actEndDate: actEndDate,
        drawWay: 4
      };
      this.$api
        .getActCouponList(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.yCouponList = result.data.map(item => {
              return {
                id: item.id,
                couponName: item.couponBatchName
              };
            });
            this.Commoditygai.actMeetingCouponDTOS = this.Commoditygai.actMeetingCouponDTOS.map(
              item => {
                let couponList;
                if (item.couponType == 1) {
                  couponList = that.yCouponList;
                } else {
                  couponList = that.cCouponList;
                }
                return {
                  couponType: item.couponType,
                  couponList: couponList,
                  couponId: item.couponId,
                  couponCount: item.couponCount,
                  couponSort: item.couponSort
                };
              }
            );
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //选择礼包类型 1：优惠券 2：卡券
    selectCouponT(index, cType) {
      this.Commoditygai.actMeetingCouponDTOS[index].couponId = "";
      if (cType == 1) {
        this.Commoditygai.actMeetingCouponDTOS[
          index
        ].couponList = this.yCouponList;
      } else if (cType == 2) {
        this.Commoditygai.actMeetingCouponDTOS[
          index
        ].couponList = this.cCouponList;
      }
    },
    //确认明细
    ensureRedpack(Commoditygai) {
      let params = {
        meetingName: this.Commoditygai.meetingName,
        meetingPlace: this.Commoditygai.meetingPlace,
        meetingEnlistFlag: this.Commoditygai.meetingEnlistFlag ? 1 : 0,
        meetingAuditFlag: this.Commoditygai.meetingEnlistFlag
          ? this.Commoditygai.meetingAuditFlag
            ? 1
            : 0
          : 0,
        meetingEnlistDeadLine: this.Commoditygai.meetingEnlistDeadLine,
        meetingEnterId: this.Commoditygai.meetingEnterId,
        actMeetingCouponDTOS: this.Commoditygai.actMeetingCouponDTOS.map(
          item => {
            return {
              couponType: item.couponType,
              couponId: item.couponId,
              couponCount: item.couponCount,
              couponSort: item.couponSort
            };
          }
        ),
        meetingData: this.Commoditygai.meetingData.map((item, index) => {
          return {
            imagePath: item
          };
        }),
        actMeetingImageDTOS: this.Commoditygai.actMeetingImageDTOS.map(
          (item, index) => {
            return {
              imagePath: item.path,
              imageSort: item.sort
            };
          }
        ),
        actImagePath: this.Commoditygai.actImagePath,
        couponFlag: this.Commoditygai.couponFlag ? 1 : 0
      };
      console.log(params);
      // return
      this.$refs[Commoditygai].validate(valid => {
        if (valid) {
          this.$api
            .checkMeetingCode(params, this.detailId)
            .then(response => {
              const result = response.data;
              if (result.code == "0") {
                this.$api
                  .smartMeetingSet(params, this.detailId)
                  .then(response => {
                    if (response.data.code == 0) {
                      this.$message.success("操作成功");
                      this.$router.push({ name: "HotelActivityList" });
                    } else {
                      this.$alert(response.data.msg, "警告", {
                        confirmButtonText: "确定"
                      });
                    }
                  })
                  .catch(error => {
                    this.$alert(error, "警告", {
                      confirmButtonText: "确定"
                    });
                  });
              } else {
                const h = this.$createElement;
                let msgBoxs = result.msg.split('、')
                let newArray = []
                msgBoxs.forEach(item => {
                    newArray.push(h("p",null,item))
                })
                newArray.push(h("p",{style:'margin-top:20px'},'是否确认移除上述券？'))
                this.$msgbox({
                  title: "提示",
                  message: h("div", null, newArray),
                  showCancelButton: true,
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                }).then(action => {
                  if (action === "confirm") {
                      this.$api
                        .smartMeetingSet(params, this.detailId)
                        .then(response => {
                          if (response.data.code == 0) {
                            this.$message.success("操作成功");
                            this.$router.push({ name: "HotelActivityList" });
                          } else {
                            this.$alert(response.data.msg, "警告", {
                              confirmButtonText: "确定"
                            });
                          }
                        })
                        .catch(error => {
                          this.$alert(error, "警告", {
                            confirmButtonText: "确定"
                          });
                        });
                    }
                });
              }
            })
            .catch(error => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定"
              });
            });
        } else {
          return false;
        }
      });
    },
    //获取回填数据
    getFillbackData() {
      this.$api
        .selectActivityOne(this.actID)
        .then(response => {
          if (response.data.code == 0) {
            let hotelName = response.data.data.actHotelDTOS[0].hotelName;
            this.actName = response.data.data.actName;
            this.hotelName = hotelName;
            this.actScopeLevel =
              response.data.data.actScopeLevel == 2
                ? "供应商"
                : response.data.data.actScopeLevel == 1
                ? "单店"
                : "平台";
            this.actBegin = response.data.data.actBegin.split(" ")[0];
            this.actEnd = response.data.data.actEnd.split(" ")[0];
            this.getActList(response.data.data.actType);
            this.hotelId = response.data.data.actHotelDTOS[0].hotelId;
            this.actHotelId = response.data.data.actHotelDTOS[0].id;
            this.getEnterSettings();
            let actMeetingSettingDetail =
              response.data.data.actMeetingSettingDetail;
            this.meetingSignQrUrl = actMeetingSettingDetail.meetingSignQrUrl;
            this.meetingEnlistQrUrl =
              actMeetingSettingDetail.meetingEnlistQrUrl;
            this.detailId = actMeetingSettingDetail.id;
            this.isSetting = actMeetingSettingDetail.isSet ? true : false;
            if (actMeetingSettingDetail.actImageUrl) {
              this.imageListOne = [
                {
                  name: actMeetingSettingDetail.actImagePath,
                  url: actMeetingSettingDetail.actImageUrl
                }
              ];
            }
            if (actMeetingSettingDetail.meetingData) {
              this.fileList = actMeetingSettingDetail.meetingData.map(item => {
                return {
                  name: item.imagePath,
                  url: item.imageUrl
                };
              });
            }
            // this.Commoditygai = actMeetingSettingDetail
            this.Commoditygai = {
              actImageUrl: actMeetingSettingDetail.actImageUrl,
              meetingName: actMeetingSettingDetail.meetingName,
              meetingPlace: actMeetingSettingDetail.meetingPlace,
              meetingEnlistFlag: actMeetingSettingDetail.meetingEnlistFlag
                ? true
                : false,
              meetingAuditFlag: actMeetingSettingDetail.meetingAuditFlag
                ? true
                : false,
              meetingEnlistDeadLine:
                actMeetingSettingDetail.meetingEnlistDeadLine ==
                "1970-01-01 00:00:00"
                  ? ""
                  : actMeetingSettingDetail.meetingEnlistDeadLine,
              meetingEnterId:
                actMeetingSettingDetail.meetingEnterId === 0
                  ? ""
                  : actMeetingSettingDetail.meetingEnterId,
              actMeetingCouponDTOS: actMeetingSettingDetail.actMeetingCouponDTOS.map(
                item => {
                  return {
                    couponType: item.couponType,
                    couponList: [],
                    couponId: item.couponId,
                    couponCount: item.couponCount,
                    couponSort: item.couponSort
                  };
                }
              ),
              meetingData: actMeetingSettingDetail.meetingData.map(item => {
                return item.imagePath;
              }),
              actMeetingImageDTOS: actMeetingSettingDetail.actMeetingImageDTOS.map(
                item => {
                  return {
                    name: item.imagePath,
                    url: item.imageUrl,
                    path: item.imagePath,
                    sort: item.imageSort
                  };
                }
              ),
              actImagePath: actMeetingSettingDetail.actImagePath,
              couponFlag: actMeetingSettingDetail.couponFlag ? true : false
            };
            this.getActCouponList(
              response.data.data.actBegin,
              response.data.data.actEnd
            );
            this.getActVouList(this.hotelId);
          } else {
            this.$alert(response.data.data.msg, "警告", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取活动列表
    getActList(type) {
      this.$api
        .basicDataItems({ key: "ACTTYPE", orgId: 0 })
        .then(response => {
          if (response.data.code == 0) {
            this.actType = response.data.data.find(item => {
              return item.dictValue == type;
            }).dictName;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },

    //删除确认
    beforeRemove1(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //图片上传成功
    handleSuccess1(res, file, fileList) {
      console.log(res, file, fileList);
      this.Commoditygai.meetingData.push(res.data);
    },
    //移除图片
    handleRemove1(file, fileList) {
      this.Commoditygai.meetingData = fileList.map(item => {
        return item.name;
      });
    },
    //文件超出个数限制时
    handleExceed1(file, fileList) {
      this.$message.error("图片只能上传1张！");
    },
    //图片上传失败
    imgUploadError1(file, fileList) {
      this.$message.error("上传图片失败！");
    },

    //删除确认
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //图片上传成功
    handleSuccess2(res, file, fileList) {
      console.log(res, file, fileList);
      this.Commoditygai.actImagePath = res.data;
    },
    //移除图片
    handleRemove2(file, fileList) {
      this.Commoditygai.actImagePath = "";
    },
    //文件超出个数限制时
    handleExceed2(file, fileList) {
      this.$message.error("图片只能上传1张！");
    },
    //图片上传失败
    imgUploadError2(file, fileList) {
      this.$message.error("上传图片失败！");
    }
  }
};
</script>

<style lang="less" scoped>
.hoteladd {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .detail {
    width: 30%;
    font-size: 14px;
    .parts {
      .content {
        color: #999999;
      }
    }
    .el-divider {
      margin: 10px 0;
    }
  }
  .operate {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .wrapper {
    color: #333;
  }
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.searchHotel {
  text-align: left;
}
.hotelform {
  width: 960px;
  .el-input,
  .el-select {
    width: 225px;
  }
}
.code {
  display: flex;
  .code1 {
    margin-right: 60px;
    .code1_1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ccc;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
