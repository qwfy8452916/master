<template>
  <div class="CardticketAdd">
    <p class="title">修改卡券</p>
    <el-form align="left" :model="carddata" label-width="140px" ref="carddata" :rules="rules">

      <el-form-item label="卡券名称" prop="vouName">
        <el-input v-model="carddata.vouName" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="基础价格" prop="vouBasicPrice">
        <el-input
          v-model="carddata.vouBasicPrice"
          maxlength="12"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>元
      </el-form-item>
      <el-form-item label="允许转赠" prop="canGive">
        <el-switch
          v-model="carddata.canGive"
          :active-value="1"
          :inactive-value="0"
          @change="updateStatus()"
        ></el-switch>
      </el-form-item>
      <el-form-item label="卡券说明" prop="vouInstruction">
        <el-input v-model="carddata.vouInstruction" type="textarea" :rows="5" maxlength="250"></el-input>
      </el-form-item>
      <el-form-item label="卡券图片" class="cardpicbox">
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :file-list="bannerList"
          :headers="headers"
          name="fileContent"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-error="imgUploadError"
        >
          <el-button size="small" type="primary">上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传1张</label>
        </el-upload>
      </el-form-item>
      <el-form-item label="使用有效期" prop="vouTermType">
        <div>
          <el-radio @change="changecouponTermType" v-model="carddata.vouTermType" :label="0">领取后天数</el-radio>
          <el-form-item class="vouTermType" v-if="carddata.vouTermType===0" prop="vouTermDays">
            <el-input v-model.number="carddata.vouTermDays" maxlength="4"></el-input>天
          </el-form-item>
        </div>
        <div style="margin-top:10px;">
          <el-radio @change="changecouponTermType" v-model="carddata.vouTermType" :label="1">固定日期</el-radio>
          <el-form-item class="vouTermType" v-if="carddata.vouTermType=='1'" prop="cardTermDate">
            <el-date-picker
              @input="cardTermDate"
              v-model="carddata.cardTermDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="过期日期"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="使用场景" prop="vouUseScene">
        <el-select v-model="carddata.vouUseScene" @change="useScene">
          <el-option
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictName"
            v-for="item in UseSceneData"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="核销地点" prop="vouVerifiedAddress" v-if="carddata.vouUseScene==1">
        <el-input v-model="carddata.vouVerifiedAddress" :rows="3" type="textarea" maxlength="250"></el-input>
      </el-form-item>
      <el-form-item label="核销次数" prop="vouVerifiedTotalType" v-if="carddata.vouUseScene==1">
        <el-radio
          v-model="carddata.vouVerifiedTotalType"
          :label="1"
          @change="vouVerifiedTotalType"
        >一次</el-radio>
        <el-radio
          v-model="carddata.vouVerifiedTotalType"
          :label="2"
          @change="vouVerifiedTotalType"
        >多次</el-radio>
        <span v-if="carddata.vouVerifiedTotalType==2">
          <el-form-item prop="vouVerifiedTotal" style="display:inline-block;">
            <el-input class="vouVerifiedTotal" v-model.number="carddata.vouVerifiedTotal"></el-input>次
          </el-form-item>
        </span>
      </el-form-item>
      <el-form-item label="抵扣设置" prop="vouDeductibleType" v-if="carddata.vouUseScene==2">
        <el-radio v-model="carddata.vouDeductibleType" :label="0" @change="setdikou">现金</el-radio>
        <el-form-item
          prop="vouDeductibleMoney"
          v-if="carddata.vouDeductibleType===0"
          class="Moneywrap"
        >
          金额:
          <el-input
            v-model="carddata.vouDeductibleMoney"
            class="vouDeductibleType"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            maxlength="12"
          ></el-input>元
        </el-form-item>
        <div>
          <el-radio v-model="carddata.vouDeductibleType" :label="1" @change="setdikou">商品</el-radio>
          <span v-if="carddata.vouDeductibleType==1">
            <!-- <span style="margin-right:5px">{{carddata.vouDeductibleHotelProd.prodName}}
            </span>-->
            <el-form-item prop="vouDeductibleHotelProdId" style="display:inline-block;">
              <el-select
                v-model="carddata.vouDeductibleHotelProd"
                class="vouDeductibleHotelProd"
                @change="vouDeductibleHotelProd"
                value-key="id"
              >
                <el-option
                  :label="item.prodName"
                  :value="item"
                  v-for="item in prodData"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              prop="vouDeductibleHotelProdSpecId"
              v-if="carddata.vouDeductibleHotelProd.isSupportSpec>0"
              style="display:inline-block;"
            >
              <el-select
                v-model="carddata.vouDeductibleHotelProdSpecId"
                class="specguige"
                value-key="id"
              >
                <el-option
                  :label="item.specName"
                  :value="item.id"
                  v-for="item in specDara"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelBtn">取消</el-button>
        <el-button
          v-if="authzData['F:BH_VOU_CARDTICKET_MODIFY_SUBMIT']"
          type="primary"
          @click="sureBtn('carddata')"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotelCardticketEdit",
  data() {
    var validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error());
      } else {
        callback();
      }
    };

    var validateProd = (rule, value, callback) => {
      if (!value) {
        callback(new Error());
      } else {
        callback();
      }
    };
    return {
      authzData: "",
      hotelId: "",
      hotelName: "",
      editId: "",
      uploadUrl: this.$api.upload_file_url,
      UseSceneData: [],
      headers: {},
      specDara: [], //规格数据
      prodData: [],
      bannerList: [],
      carddata: {
        vouName: "",
        vouBasicPrice: "",
        canGive: "",
        vouInstruction: "",
        vouImagePath: "",
        vouTermType: "",
        cardTermDate: [],
        vouTermDays: "",
        vouUseScene: "",
        vouVerifiedAddress: "",
        vouVerifiedTotalType: "",
        vouVerifiedTotal: "",
        vouDeductibleType: "",
        vouDeductibleMoney: 0,
        deductHotelProdName: "", //规格名
        vouDeductibleHotelProdId: "", //抵扣商品id
        vouDeductibleHotelProd: {
          prodName: "",
          id: "",
          isSupportSpec: "",
        }, //选择商品对象
        vouDeductibleHotelProdSpecId: "", //规格id
        selectprodName: "",
      },
      rules: {
        vouName: { required: true, message: "请填写卡券名称", trigger: "blur" },
        vouTermType: {
          required: true,
          message: "请选择使用有效期",
          trigger: "change",
        },
        vouTermDays: [
          { required: true, message: "请填写使用的天数", trigger: "blur" },
          {
            required: true,
            type: "number",
            min: 1,
            message: "请填写正确的天数",
            trigger: "blur",
          },
        ],
        cardTermDate: {
          required: true,
          message: "请选择固定的日期",
          trigger: "change",
        },
        vouUseScene: {
          required: true,
          message: "请选择使用场景",
          trigger: "change",
        },
        vouVerifiedAddress: {
          required: true,
          message: "请填写核销地点",
          trigger: "blur",
        },
        vouVerifiedTotalType: {
          required: true,
          message: "请选择核销次数",
          trigger: "change",
        },
        vouVerifiedTotal: [
          { required: true, message: "请填写核销次数", trigger: "blur" },
          {
            min: 2,
            type: "number",
            max: 99999,
            message: "核销次数最小1最大99999",
            trigger: "blur",
          },
        ],
        vouDeductibleType: {
          required: true,
          message: "请选择抵扣设置",
          trigger: ["blur", "change"],
        },
        vouDeductibleMoney: {
          required: true,
          validator: validateMoney,
          message: "请填写现金金额",
          trigger: ["blur", "change"],
        },
        vouDeductibleHotelProdId: {
          required: true,
          validator: validateProd,
          message: "请选择商品",
          trigger: ["blur", "change"],
        },
        vouDeductibleHotelProdSpecId: {
          required: true,
          message: "请选择商品规格",
          trigger: "change",
        },
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
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

    this.editId = this.$route.query.id;
    this.hotelId = localStorage.hotelId;
    const token = localStorage.getItem("Authorization");
    this.headers = { Authorization: token };
    this.hotelName = localStorage.hotelName;
    this.getUseScene();

    this.CardticketDetail();
  },
  mounted() {
    this.getCardticketProd();
  },
  methods: {
    updateStatus() {},

    //获取详情
    CardticketDetail() {
      let that = this;
      let params = {};
      this.$api
        .CardticketDetail(params, this.editId)
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.carddata = result.data;
            that.bannerList.push({
              path: result.data.vouImagePath,
              name: result.data.vouImagePath,
              url: result.data.vouImageUrl,
            });
            //获取选中商品名称id，名称，是否支持规格
            that.carddata.vouDeductibleHotelProd = {
              prodName: result.data.deductHotelProdName,
              id: result.data.vouDeductibleHotelProdId,
              isSupportSpec: result.data.isSupportSpec,
            };
            that.carddata.cardTermDate = [];
            if (
              result.data.vouTermStartDate !== null ||
              result.data.vouTermEndDate !== null
            ) {
              that.carddata.cardTermDate[0] = result.data.vouTermStartDate;
              that.carddata.cardTermDate[1] = result.data.vouTermEndDate;
            }
            that.getCardticketProdspec();
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取商品
    getCardticketProd() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
      };
      this.$api
        .getCardticketProd({ params })
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.prodData = result.data;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //选择商品
    vouDeductibleHotelProd(e) {
      let that = this;
      that.carddata.vouDeductibleHotelProdSpecId = "";
      that.carddata.deductHotelProdName = "";
      that.specDara = [];
      that.carddata.vouDeductibleHotelProd = e;
      that.$set(that.carddata, "vouDeductibleHotelProd", e);
      that.$forceUpdate();
      that.carddata.vouDeductibleHotelProdId = e.id;
      that.getCardticketProdspec();
    },

    //获取规格
    getCardticketProdspec() {
      let that = this;
      let params = {
        hotelProdId: this.carddata.vouDeductibleHotelProdId,
      };
      this.$api
        .getCardticketProdspec({ params })
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            if (result.data.length > 1) {
              that.specDara = result.data;
            }
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取场景
    getUseScene() {
      let that = this;
      let params = {
        key: "VOU_USE_SCENE",
        orgId: "0",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            that.UseSceneData = result.data.map((item) => {
              return {
                dictName: item.dictName,
                dictValue: parseInt(item.dictValue),
              };
            });
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    selectprod(e) {
      if (e == 2) {
        this.carddata.selectprodName = "蓝色经典";
      }
    },

    //核销次数判断
    vouVerifiedTotalType(e) {
      if (e == 1) {
        this.carddata.vouVerifiedTotal = 1;
      }
    },

    //抵扣设置
    setdikou(e) {
      let that = this;
      if (e == 0) {
        that.carddata.vouDeductibleHotelProdId = "";
        that.carddata.vouDeductibleHotelProdSpecId = "";
        that.carddata.deductHotelProdName = "";
        that.carddata.vouDeductibleHotelProd = {
          prodName: "",
          id: "",
          isSupportSpec: "",
        };
        that.specDara = [];
      } else if (e == 1) {
        this.carddata.vouDeductibleMoney = 0;
      }
    },

    //使用到店核销场景
    useScene(e) {
      if (e == 1) {
        this.carddata.vouVerifiedTotalType = "";
        this.carddata.vouDeductibleType = "";
        this.carddata.vouDeductibleMoney = 0;
      } else if (e == 2) {
        this.carddata.vouVerifiedAddress = "";
        this.carddata.vouVerifiedTotalType = "";
        this.carddata.vouVerifiedTotal = "";
      }
    },

    cancelBtn() {
      this.$router.push({ name: "HotelCardticketList" });
    },

    //确定修改
    sureBtn(carddata) {
      let that = this;

      this.$refs[carddata].validate((valid, model) => {
        if (valid) {
          if (that.bannerList.length <= 0) {
            this.$message.error("请上传卡片图片");
            return false;
          }
          let nowbannerList = that.bannerList[0].path;
          if (that.carddata.cardTermDate == null) {
            that.carddata.cardTermDate = [];
          }
          let params = {
            vouName: that.carddata.vouName,
            vouBasicPrice:parseFloat(
              that.carddata.vouBasicPrice
            ).toFixed(2),
            canGive: that.carddata.canGive,
            vouInstruction: that.carddata.vouInstruction,
            vouImagePath: nowbannerList,
            vouTermType: that.carddata.vouTermType,
            vouTermDays: that.carddata.vouTermDays,
            vouTermStartDate: that.carddata.cardTermDate[0],
            vouTermEndDate: that.carddata.cardTermDate[1],
            vouUseScene: that.carddata.vouUseScene,
            vouVerifiedAddress: that.carddata.vouVerifiedAddress,
            vouVerifiedTotalType: that.carddata.vouVerifiedTotalType,
            vouVerifiedTotal: that.carddata.vouVerifiedTotal,
            vouDeductibleType: that.carddata.vouDeductibleType,
            vouDeductibleMoney: parseFloat(
              that.carddata.vouDeductibleMoney
            ).toFixed(2),
            vouDeductibleHotelProdId: that.carddata.vouDeductibleHotelProdId,
            vouDeductibleHotelProdSpecId:
              that.carddata.vouDeductibleHotelProdSpecId,
            vouOwnerOrgKind: 3,
          };
          that.$api
            .cardticketEdit(params, this.editId)
            .then((response) => {
              let result = response.data;
              if (result.code == 0) {
                that.$message.success("操作成功");
                that.$router.push({ name: "HotelCardticketList" });
              } else {
                that.$message.error(result.msg);
              }
            })
            .catch((error) => {
              that.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error!");
        }
      });
    },

    //选择使用有效期
    changecouponTermType(e) {
      if (e == "0") {
        this.carddata.cardTermDate = [];
      } else if (e == "1") {
        this.carddata.vouTermDays = "";
      }
    },

    //处理日期时间

    cardTermDate(e) {
      this.changetime2(e);
    },

    changetime2(e) {
      let d = new Date(e[0]);

      let times =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();

      let d2 = new Date(e[1]);

      let times2 =
        d2.getFullYear() +
        "-" +
        (d2.getMonth() + 1) +
        "-" +
        d2.getDate() +
        " " +
        d2.getHours() +
        ":" +
        d2.getMinutes() +
        ":" +
        d2.getSeconds();
      this.carddata.cardTermDate[0] = times;
      this.carddata.cardTermDate[1] = times2;
      this.$forceUpdate();
    },

    //图片上传成功
    handleSuccess(res, file, fileList) {
      if (res.code == 0) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data,
        };
        this.bannerList.push(image);
      }
    },
    //图片移除
    handleRemove(file, fileList) {
      if (fileList.length > 0) {
        this.bannerList = fileList.map((item, index) => {
          return {
            name: item.name,
            url: item.url,
            path: item.response.data,
          };
        });
      } else {
        this.bannerList = [];
      }
    },

    //点击文件列表中已上传的文件时
    handlePreview(file) {
      // console.log(file);
    },
    //效果图片上传之前调用 做一些拦截限制
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传的图片只能是jpg、jpeg、png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传商品图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //效果图片文件超出个数限制时
    handleExceed(file, fileList) {
      this.$message.error("上传图片不能超过1张！");
    },

    //图片上传失败
    imgUploadError(file, fileList) {
      this.$message.error("上传图片失败！");
    },
  },
};
</script>

<style lang="less" scope>
.CardticketAdd {
   text-align: left;
  .title{font-weight: bold;}
  .el-input,
  .el-select,
  .el-textarea {
    width: 300px;
  }
  .vouTermType {
    display: inline-block;
  }
  .vouTermType .el-input {
    width: 100px;
  }
  .frequency.el-input {
    width: 100px;
  }
  .vouDeductibleType.el-input {
    width: 100px;
  }
  .vouVerifiedTotal.el-input {
    width: 200px;
  }
  .vouDeductibleHotelProdId.el-select {
    width: 230px;
    .el-input {
      width: 230px;
    }
  }
  .Moneywrap {
    display: inline-block;
  }
  .cardpicbox {
    width: 50%;
  }
  .specguige.el-select {
    width: 150px;
    .el-input {
      width: 150px;
    }
  }
}
</style>



