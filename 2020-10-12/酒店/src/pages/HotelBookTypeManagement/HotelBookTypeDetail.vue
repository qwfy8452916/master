<template>
  <div class="booktypeadd">
    <p class="title">查看详情</p>
    <el-form
      :model="BookTypeData"
      :rules="rules"
      ref="BookTypeData"
      label-width="120px"
      class="bookform"
    >
      <el-form-item>
        <span slot="label">
          <label class="titlebar">基础信息&nbsp;&nbsp;</label>
        </span>
      </el-form-item>
      <hr class="line" />
      <el-form-item label="房型名称" prop="typeName">
        <el-input :disabled="true" v-model="BookTypeData.typeName"></el-input>
      </el-form-item>
      <el-form-item label="床型" prop="bedType">
        <el-select :disabled="true" v-model="BookTypeData.bedType" placeholder="请选择">
          <el-option
            v-for="item in bedTypeList"
            :key="item.id"
            :label="item.bedName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="床宽" prop="bedWidth">
        <el-input :disabled="true" v-model.trim="BookTypeData.bedWidth" maxlength="10"></el-input>米
      </el-form-item>
      <el-form-item label="面积" prop="roomSize">
        <el-input :disabled="true" v-model.trim="BookTypeData.roomSize" maxlength="10"></el-input>平方米
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input :disabled="true" v-model.trim="BookTypeData.floor"></el-input>
      </el-form-item>
      <!-- <el-form-item label="基础价格" prop="basicPrice">
                <el-input :disabled="true" v-model.trim="BookTypeData.basicPrice" maxlength="10"></el-input> 元
      </el-form-item>-->
      <el-form-item label="钟点房状态">
        <el-switch :disabled="true" v-model="BookTypeData.hourRoomFlag" active-color="#1ABC9C" inactive-color="#ccc"></el-switch>
      </el-form-item>
      <el-form-item label="加床服务" prop="bedAddFlag">
        <el-radio-group :disabled="true" v-model="BookTypeData.bedAddFlag">
          <el-radio :label="0">不可加床</el-radio>
          <el-radio :label="1">无偿加床</el-radio>
          <el-radio :label="2">有偿加床</el-radio>
        </el-radio-group>
        <span v-if="BookTypeData.bedAddFlag == 2" style="margin-left: -15px;">
          <el-input
            :disabled="true"
            v-model.trim="addbedPrice"
            maxlength="6"
            placeholder="请输入"
            class="addbed"
          ></el-input>元
        </span>
      </el-form-item>
      <el-form-item label="是否有浴缸" prop="bathtubFlag">
        <el-radio-group :disabled="true" v-model="BookTypeData.bathtubFlag">
          <el-radio :label="1">有浴缸</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有洗衣服务" prop="laundryServiceFlag">
        <el-radio-group :disabled="true" v-model="BookTypeData.laundryServiceFlag">
          <el-radio :label="1">有洗衣服务</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="早餐可送入房" prop="breakfastInRoom">
        <el-radio-group :disabled="true" v-model="BookTypeData.breakfastInRoom">
          <el-radio :label="1">早餐可送入房</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否禁烟" prop="smokingFlag">
        <el-radio-group :disabled="true" v-model="BookTypeData.smokingFlag">
          <el-radio :label="1">禁烟</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input :disabled="true" v-model.number="BookTypeData.sort"></el-input>
      </el-form-item>
      <el-form-item label="支持的页面布局" prop="layoutType">
        <el-checkbox-group v-model="BookTypeData.layoutType">
          <el-checkbox label="传统" :disabled="true"></el-checkbox>
          <el-checkbox label="横幅" :disabled="true"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="showStreamerList">
        <span slot="label">
          <label class="required-icon">*</label> 横幅列表图
        </span>
        <el-upload
          :disabled="true"
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="descList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;支持1张图片，图片为jpg、jpeg、png格式</label>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="showTraditionList">
        <span slot="label">
          <label class="required-icon">*</label> 传统列表图
        </span>
        <el-upload
          :disabled="true"
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="imgList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;支持1张图片，图片为jpg、jpeg、png格式</label>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <label class="required-icon">*</label> 详情图
        </span>
        <el-upload
          :disabled="true"
          :action="uploadUrl"
          list-type="picture"
          :limit="5"
          :headers="headers"
          name="fileContent"
          :file-list="bannerList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;最多选择5张图片，图片为jpg、jpeg、png格式</label>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <label class="titlebar">客房设施&nbsp;&nbsp;</label>
        </span>
      </el-form-item>
      <hr class="line" />
      <div class="facilityadd">
        <span class="facspan">
          <label class="required-icon">*</label> 客房设施
        </span>
        <el-button :disabled="true" type="primary" class="addbtn" size="small">添加设施</el-button>
        <el-table :data="BookTypeData.facilityDTOS" :show-header="false" class="facilitytable">
          <el-table-column prop="facilityType">
            <template slot-scope="scope">
              <el-form-item
                class="facilityOrderBy"
                :prop="'facilityDTOS.'+scope.$index+'.orderBy'"
                :rules="rules.orderBy"
              >
                <el-input :disabled="true" placeholder="设施排序" v-model.number="scope.row.orderBy"></el-input>
              </el-form-item>
              <el-form-item
                class="facilityType"
                :prop="'facilityDTOS.'+scope.$index+'.facilityType'"
                :rules="rules.facilityType"
              >
                <el-input
                  class="facilityname"
                  :disabled="true"
                  placeholder="设施名称"
                  v-model="scope.row.facilityType"
                ></el-input>&nbsp;&nbsp;&nbsp;
                <el-button :disabled="true" type="text" size="small">删除</el-button>
              </el-form-item>
              <el-form-item
                :prop="'facilityDTOS.'+scope.$index+'.facilityContent'"
                :rules="rules.facilityContent"
              >
                <el-input
                  :disabled="true"
                  type="textarea"
                  :rows="2"
                  placeholder="设施内容"
                  v-model="scope.row.facilityContent"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form-item>
        <span slot="label">
          <label class="titlebar">客房特色&nbsp;&nbsp;</label>
        </span>
      </el-form-item>
      <hr class="line" />
      <div class="facilityadd">
        <span class="facspan">
          <label class="required-icon"></label> 客房特色
        </span>
        <el-button :disabled="true" type="primary" class="addbtn" size="small">添加特色</el-button>
        <el-table :data="BookTypeData.featureDTOS" :show-header="false" class="facilitytable">
          <el-table-column prop="orderFeature">
            <template slot-scope="scope">
              <el-form-item :prop="'featureDTOS.'+scope.$index+'.sort'" :rules="rules.orderFeature">
                <el-input
                  class="featureOrderBy"
                  :disabled="true"
                  placeholder="特色排序"
                  v-model.number="scope.row.sort"
                ></el-input>
                <el-button :disabled="true" type="text" size="small">删除</el-button>
              </el-form-item>
              <el-form-item
                :prop="'featureDTOS.'+scope.$index+'.featureContent'"
                :rules="rules.featureContent"
              >
                <el-input
                  :disabled="true"
                  type="textarea"
                  :rows="2"
                  placeholder="特色内容"
                  v-model="scope.row.featureContent"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form-item>
        <el-button @click="resetForm">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotelBookTypeDetail",
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
      authzlist: {}, //权限数据
      hotelId: "",
      btId: "",
      uploadUrl: this.$api.upload_file_url,
      headers: {},
      imgList: [], //传统列表图
      descList: [], //横幅列表图
      bannerList: [], //详情图
      showTraditionList: false,
      showStreamerList: false,
      bedTypeList: [],
      isSubmit: false,
      BookTypeData: { layoutType: [] },
      facilityMedia: "",
      facilityShower: "",
      facilityFood: "",
      facilityFast: "",
      facilityElse: "",
      addbedPrice: "",
      rules: {
        layoutType: [
          {
            required: true,
            message: "请勾选支持的页面布局",
            trigger: "change",
          },
        ],
        typeName: [
          { required: true, message: "请输入房型名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "房型名称请保持在20个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        bedType: [{ required: true, message: "请选择床型", trigger: "change" }],
        bedWidth: [
          {
            required: true,
            validator: validateDecimals,
            trigger: ["blur", "change"],
          },
        ],
        roomSize: [
          {
            required: true,
            validator: validateDecimals,
            trigger: ["blur", "change"],
          },
        ],
        floor: [
          { required: true, message: "请填写楼层", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "楼层请保持在10个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        // basicPrice: [
        //     {required: true, validator: validateDecimals, trigger: ['blur','change']}
        // ],
        bedAddFlag: [
          { required: true, message: "请选择是否可加床", trigger: "change" },
        ],
        bathtubFlag: [
          { required: true, message: "请选择是否有浴缸", trigger: "change" },
        ],
        laundryServiceFlag: [
          {
            required: true,
            message: "请选择是否有洗衣服务",
            trigger: "change",
          },
        ],
        breakfastInRoom: [
          {
            required: true,
            message: "请选择早餐是否可送入房",
            trigger: "change",
          },
        ],
        smokingFlag: [
          { required: true, message: "请选择是否禁烟", trigger: "change" },
        ],
        sort: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
        orderBy: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
        facilityType: [
          { required: true, message: "请填写设施名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "设施名称请保持在10个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        facilityContent: [
          { required: true, message: "请填写设施内容", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "设施内容请保持在255个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        // orderFeature: [
        //   {
        //     type: "number",
        //     message: "请输入数字",
        //     trigger: ["blur", "change"],
        //   },
        // ],
        // featureContent: [
        //   { required: true, message: "请填写特色内容", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 255,
        //     message: "t特色内容请保持在255个字符以内",
        //     trigger: ["blur", "change"],
        //   },
        // ],
      },
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    this.hotelId = localStorage.getItem("hotelId");
    const token = localStorage.getItem("Authorization");
    this.headers = { Authorization: token };
    this.btId = this.$route.query.id;
    this.getBedList();
    this.bookTypeDetail();
  },
  methods: {
    //获取床型列表
    getBedList() {
      const params = {
        key: "BED_TYPE",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.bedTypeList = result.data.map((item) => {
              return {
                id: parseInt(item.dictValue),
                bedName: item.dictName,
              };
            });
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
    //获取房型详情
    bookTypeDetail() {
      const params = {};
      const id = this.btId;
      this.$api
        .bookTypeDetail(params, id)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.BookTypeData = result.data;
            if (this.BookTypeData.hourRoomFlag == 0) {
              this.BookTypeData.hourRoomFlag = false;
            } else {
              this.BookTypeData.hourRoomFlag = true;
            }
            this.addbedPrice = result.data.bedAddPrice;
            if (result.data.layoutType.length == 1) {
              if (result.data.layoutType[0] == 0) {
                this.showTraditionList = true;
                this.showStreamerList = false;
              } else if (result.data.layoutType[0] == 1) {
                this.showStreamerList = true;
                this.showTraditionList = false;
              }
            } else if (result.data.layoutType.length == 2) {
              this.showStreamerList = true;
              this.showTraditionList = true;
            }
            let layoutTypeDat = [];
            this.BookTypeData.layoutType.forEach((element) => {
              if (element == 0) {
                layoutTypeDat.push("传统");
              } else {
                layoutTypeDat.push("横幅");
              }
            });
            this.BookTypeData.layoutType = layoutTypeDat;
            this.imgList = [
              {
                name: result.data.layoutTraditionImage,
                url: result.data.layoutTraditionImageUrl,
                path: result.data.layoutTraditionImage,
              },
            ];
            this.descList = [
              {
                name: result.data.layoutBannerImage,
                url: result.data.layoutBannerImageUrl,
                path: result.data.layoutBannerImage,
              },
            ];
            this.bannerList = result.data.imageDetailDTOS.map((item) => {
              return {
                id: item.id,
                name: item.imagePath,
                url: item.url,
                path: item.imagePath,
              };
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
    //取消
    resetForm() {
      this.$router.push({ name: "HotelBookTypeList" });
    },
  },
};
</script>

<style>
.el-input--suffix .el-input__inner {
  padding-right: 8px;
}
</style>

<style scoped>
.el-input {
  width: 86%;
}
.el-select {
  width: 86%;
}
.el-radio {
  margin-right: 20px;
}
/* .el-textarea{
    width: 86%;
} */
.booktypeadd >>> .el-table::before {
  height: 0px;
}
.booktypeadd >>> .el-table td {
  border-bottom: 0px;
  padding: 0px 0px;
}
.booktypeadd >>> .el-table .cell {
  padding-left: 0px;
}
</style>

<style lang="less" scoped>
.booktypeadd {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .bookform {
    width: 45%;
    .titlebar {
      font-weight: bold;
      font-size: 16px;
      color: #444;
    }
    .line {
      width: 200%;
      border: 0px;
      border-bottom: 1px dashed #ccc;
      margin: -15px 0px 20px 0px;
    }
    .timeWidth {
      width: 21%;
    }
    .required-icon {
      color: #ff3030;
    }
    .facilitytitle {
      margin: 0px 0px;
    }
    .addbed {
      width: 18%;
    }
    .hourwidth {
      width: 12%;
    }
    .facilityadd {
      .facspan {
        display: inline-block;
        width: 108px;
        font-size: 14px;
        color: #666;
        text-align: right;
        padding-right: 12px;
      }
      .addbtn {
        margin-bottom: 10px;
        background: #ffa522;
        border: #dda522;
        color: #fff;
        display: inline-block;
      }
      .facilityOrderBy {
        width: 240px;
      }
      .featureOrderBy {
        width: 104px;
        margin-right: 12px;
      }
      .facilityType {
        margin: -62px 0px 20px 120px;
      }
      .facilityname {
        width: 80%;
      }
    }
  }
}
</style>

