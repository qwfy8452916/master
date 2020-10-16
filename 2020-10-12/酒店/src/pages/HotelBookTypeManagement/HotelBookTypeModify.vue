<template>
  <div class="booktypeadd">
    <p class="title">修改房型</p>
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
        <el-input v-model="BookTypeData.typeName"></el-input>
      </el-form-item>
      <el-form-item label="床型" prop="bedType">
        <el-select v-model="BookTypeData.bedType" placeholder="请选择">
          <el-option
            v-for="item in bedTypeList"
            :key="item.id"
            :label="item.bedName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="床宽" prop="bedWidth">
        <el-input v-model.trim="BookTypeData.bedWidth" maxlength="10"></el-input>米
      </el-form-item>
      <el-form-item label="面积" prop="roomSize">
        <el-input v-model.trim="BookTypeData.roomSize" maxlength="10"></el-input>平方米
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input v-model.trim="BookTypeData.floor"></el-input>
      </el-form-item>
      <!-- <el-form-item label="基础价格" prop="basicPrice">
                <el-input v-model.trim="BookTypeData.basicPrice" maxlength="10"></el-input> 元
      </el-form-item>-->
      <el-form-item label="钟点房状态">
        <el-switch v-model="BookTypeData.hourRoomFlag" active-color="#1ABC9C" inactive-color="#ccc"></el-switch>
      </el-form-item>
      <el-form-item label="加床服务" prop="bedAddFlag">
        <el-radio-group v-model="BookTypeData.bedAddFlag">
          <el-radio :label="0">不可加床</el-radio>
          <el-radio :label="1">无偿加床</el-radio>
          <el-radio :label="2">有偿加床</el-radio>
        </el-radio-group>
        <span v-if="BookTypeData.bedAddFlag == 2">
          <el-input v-model.trim="addbedPrice" maxlength="6" placeholder="请输入" class="addbed"></el-input>元
        </span>
      </el-form-item>
      <el-form-item label="是否有浴缸" prop="bathtubFlag">
        <el-radio-group v-model="BookTypeData.bathtubFlag">
          <el-radio :label="1">有浴缸</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有洗衣服务" prop="laundryServiceFlag">
        <el-radio-group v-model="BookTypeData.laundryServiceFlag">
          <el-radio :label="1">有洗衣服务</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="早餐可送入房" prop="breakfastInRoom">
        <el-radio-group v-model="BookTypeData.breakfastInRoom">
          <el-radio :label="1">早餐可送入房</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否禁烟" prop="smokingFlag">
        <el-radio-group v-model="BookTypeData.smokingFlag">
          <el-radio :label="1">禁烟</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="BookTypeData.sort"></el-input>
      </el-form-item>
      <el-form-item label="支持的页面布局" prop="layoutType">
        <el-checkbox-group v-model="BookTypeData.layoutType" @change="changeSupportedLayout">
          <el-checkbox :disabled="hasTradition" label="传统"></el-checkbox>
          <el-checkbox :disabled="hasStreamer" label="横幅"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="showTraditionList">
        <span slot="label">
          <label class="required-icon">*</label> 传统列表图
        </span>
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="imgList"
          :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
          :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
          :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
          :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
          :before-upload="(file, index) => {return beforeUpload(file, 1)}"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;支持1张图片，图片为jpg、jpeg、png、gif格式</label>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="showStreamerList">
        <span slot="label">
          <label class="required-icon">*</label> 横幅列表图
        </span>
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="descList"
          :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
          :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
          :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
          :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
          :before-upload="(file, index) => {return beforeUpload(file, 3)}"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;支持1张图片，图片为jpg、jpeg、png、gif格式</label>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <label class="required-icon">*</label> 详情图
        </span>
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :limit="5"
          :headers="headers"
          name="fileContent"
          :file-list="bannerList"
          :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
          :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
          :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
          :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
          :before-upload="(file, index) => {return beforeUpload(file, 2)}"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;最多选择5张图片，图片为jpg、jpeg、png、gif格式</label>
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
        <el-button type="primary" class="addbtn" size="small" @click="facilityAddLine">添加设施</el-button>
        <el-table :data="BookTypeData.facilityDTOS" :show-header="false" class="facilitytable">
          <el-table-column prop="facilityType">
            <template slot-scope="scope">
              <el-form-item
                class="facilityOrderBy"
                :prop="'facilityDTOS.'+scope.$index+'.orderBy'"
                :rules="rules.orderBy"
              >
                <el-input placeholder="设施排序" v-model.number="scope.row.orderBy"></el-input>
              </el-form-item>
              <el-form-item
                class="facilityType"
                :prop="'facilityDTOS.'+scope.$index+'.facilityType'"
                :rules="rules.facilityType"
              >
                <el-input class="facilityname" placeholder="设施名称" v-model="scope.row.facilityType"></el-input>&nbsp;&nbsp;&nbsp;
                <el-button type="text" size="small" @click="facilityDeleteLine(scope.$index)">删除</el-button>
              </el-form-item>
              <el-form-item
                :prop="'facilityDTOS.'+scope.$index+'.facilityContent'"
                :rules="rules.facilityContent"
              >
                <el-input
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
        <el-button type="primary" class="addbtn" size="small" @click="featureAddLine">添加特色</el-button>
        <el-table :data="BookTypeData.featureDTOS" :show-header="false" class="facilitytable">
          <el-table-column prop="orderFeature">
            <template slot-scope="scope">
              <el-form-item
                :prop="'featureDTOS.'+scope.$index+'.orderFeature'"
                :rules="rules.orderFeature"
              >
                <el-input
                  class="featureOrderBy"
                  placeholder="特色排序"
                  v-model.number="scope.row.orderFeature"
                ></el-input>
                <el-button type="text" size="small" @click="featureDeleteLine(scope.$index)">删除</el-button>
              </el-form-item>
              <el-form-item
                :prop="'featureDTOS.'+scope.$index+'.featureContent'"
                :rules="rules.featureContent"
              >
                <el-input
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
        <el-button @click="resetForm">取消</el-button>
        <el-button
          v-if="authzlist['F:BH_BOOK_TYPE_EDIT_SUBMIT']"
          type="primary"
          :disabled="isSubmit"
          @click="submitForm('BookTypeData')"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotelBookTypeModify",
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
      bedTypeList: [],
      isSubmit: false,
      BookTypeData: { layoutType: [] },
      facilityMedia: "",
      facilityShower: "",
      facilityFood: "",
      facilityFast: "",
      facilityElse: "",
      hourTimeSlot: "",
      addbedPrice: "",
      rules: {
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
        layoutType: [
          {
            required: true,
            message: "请勾选支持的页面布局",
            trigger: "change",
          },
        ],
        orderFeature: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
        featureContent: [
          { message: "请填写特色内容", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "t特色内容请保持在255个字符以内",
            trigger: ["blur", "change"],
          },
        ],
      },
      showTraditionList: false,
      showStreamerList: false,
      hasStreamer: false,
      hasTradition: false,
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
    changeSupportedLayout(val) {
      if (val.length != 0) {
        val.forEach((element) => {
          if (val.length == 1) {
            if (element == "传统") {
              this.showTraditionList = true;
              this.showStreamerList = false;
              this.descList = [];
            } else if (element == "横幅") {
              this.showStreamerList = true;
              this.showTraditionList = false;
              this.imgList = [];
            }
          } else if (val.length == 2) {
            this.showTraditionList = true;
            this.showStreamerList = true;
          }
        });
      } else {
        this.showTraditionList = false;
        this.showStreamerList = false;
        this.descList = [];
        this.imgList = [];
      }
    },
    //添加-客房设施-行
    facilityAddLine() {
      const facData = this.BookTypeData.facilityDTOS;
      // if(facData.length < 5){
      let newLine = {
        orderBy: "",
        facilityType: "",
        facilityContent: "",
      };
      this.BookTypeData.facilityDTOS.push(newLine);
      // }else{
      //     this.$message.error('客房设施最多5个!');
      // }
    },
    //删除-客房设施-行
    facilityDeleteLine(index) {
      this.BookTypeData.facilityDTOS.splice(index, 1);
    },
    //添加-特色设施-行
    featureAddLine() {
      const facData = this.BookTypeData.featureDTOS;
      let newLine = {
        order: "",
        featureContent: "",
      };
      this.BookTypeData.featureDTOS.push(newLine);
    },
    //删除-特色设施-行
    featureDeleteLine(index) {
      this.BookTypeData.featureDTOS.splice(index, 1);
    },
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
          });
        });
    },
    //获取房型详情
    bookTypeDetail() {
      const params = {};
      const id = this.btId;
      this.$api
        .bookTypeDetail(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.BookTypeData = result.data;
            this.addbedPrice = result.data.bedAddPrice;
            if (this.BookTypeData.hourRoomFlag == 0) {
              this.BookTypeData.hourRoomFlag = false;
            } else {
              this.BookTypeData.hourRoomFlag = true;
            }
            let featureDTOS = [];
            this.BookTypeData.featureDTOS.forEach((element) => {
              featureDTOS.push({
                orderFeature: element.sort,
                featureContent: element.featureContent,
              });
            });
            this.BookTypeData.featureDTOS = featureDTOS;
            if (result.data.layoutType.length == 1) {
              if (result.data.layoutType[0] == 0) {
                this.showTraditionList = true;
                this.showStreamerList = false;
                this.hasTradition = true;
              } else if (result.data.layoutType[0] == 1) {
                this.showStreamerList = true;
                this.hasStreamer = true;
                this.showTraditionList = false;
              }
            } else if (result.data.layoutType.length == 2) {
              this.showStreamerList = true;
              this.hasTradition = true;
              this.hasStreamer = true;
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
            if (result.data.layoutTraditionImage) {
              this.imgList = [
                {
                  name: result.data.layoutTraditionImage,
                  url: result.data.layoutTraditionImageUrl,
                  path: result.data.layoutTraditionImage,
                },
              ];
            } else {
              this.imgList = [];
            }
            if (result.data.layoutBannerImage) {
              this.descList = [
                {
                  name: result.data.layoutBannerImage,
                  url: result.data.layoutBannerImageUrl,
                  path: result.data.layoutBannerImage,
                },
              ];
            } else {
              this.descList = [];
            }
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
    //确定 - 修改房型
    submitForm(BookTypeData) {
      const that = this;
      if (this.BookTypeData.sort == "") {
        this.BookTypeData.sort = 0;
      }
      //   const logoPath = this.imgList.map((item) => item.path);
      //   const bannerPath = this.bannerList.map((item) => item.path);

      let layoutType = [];
      this.BookTypeData.layoutType.forEach((element) => {
        if (element == "传统") {
          layoutType.push("0");
        } else if (element == "横幅") {
          layoutType.push("1");
        }
      });
      let featureDTOS = [];
      this.BookTypeData.featureDTOS.forEach((element) => {
        featureDTOS.push({
          sort: element.orderFeature,
          featureContent: element.featureContent,
        });
      });
      let bannerData = [];
      this.bannerList.forEach((element) => {
        bannerData.push(element.path);
      });
      if (this.BookTypeData.hourRoomFlag == true) {
        this.BookTypeData.hourRoomFlag = 1;
      } else {
        this.BookTypeData.hourRoomFlag = 0;
      }

      // console.log(params);
      // return;
      const id = this.btId;
      this.$refs[BookTypeData].validate((valid) => {
        if (valid) {
          if (this.BookTypeData.facilityDTOS.length == 0) {
            this.$message.error("请填写客房设施");
            return false;
          }
          if (this.BookTypeData.layoutType.length == 0) {
            this.$message.error("请填勾选支持的页面布局");
            return false;
          }

          // if (this.BookTypeData.featureDTOS.length == 0) {
          //   this.$message.error("请填写特色设施");
          //   return false;
          // }
          // if(!this.facilityMedia && !this.facilityShower && !this.facilityFood && !this.facilityFast && !this.facilityElse){
          //     this.$message.error('请输入设施');
          //     return false
          // }
          if (this.BookTypeData.bedAddFlag == 2) {
            let validateFloat = /^\d+(\.\d+)?$/;
            if (!validateFloat.test(this.addbedPrice)) {
              this.$message.error("加床金额格式错误");
              return false;
            }
          }
          let imageNumber = this.BookTypeData.layoutType.length;
          if (imageNumber == 1) {
            this.BookTypeData.layoutType.forEach((element) => {
              if (element == "传统") {
                if (this.imgList.length == 0) {
                  this.$message.error("请上传传统列表图!");
                  return false;
                }
              } else if (element == "横幅") {
                if (this.descList.length == 0) {
                  this.$message.error("请上传横幅列表图!");
                  return false;
                }
              }
            });
          } else if (imageNumber == 2) {
            if (this.imgList.length == 0) {
              this.$message.error("请上传传统列表图!");
              return false;
            }
            if (this.descList.length == 0) {
              this.$message.error("请上传横幅列表图!");
              return false;
            }
          }
          if (this.bannerList.length == 0) {
            this.$message.error("请上传详情图");
            return false;
          }

          let descListPath = "";
          let imgListPath = "";
          if (this.descList.length == 0) {
            descListPath = "";
          } else {
            descListPath = this.descList[0].path;
          }
          if (this.imgList.length == 0) {
            imgListPath = "";
          } else {
            imgListPath = this.imgList[0].path;
          }
          const params = {
            hotelId: this.hotelId,
            typeName: this.BookTypeData.typeName,
            bedType: this.BookTypeData.bedType,
            bedWidth: this.BookTypeData.bedWidth,
            roomSize: this.BookTypeData.roomSize,
            floor: this.BookTypeData.floor,
            // basicPrice: this.BookTypeData.basicPrice,
            hourRoomFlag: this.BookTypeData.hourRoomFlag,
            // facilityDTOS: facilityList,
            bedAddFlag: this.BookTypeData.bedAddFlag,
            bedAddPrice: this.addbedPrice,
            // uploadImagePathList: JSON.stringify(logoPath),
            // uploadImagePathDetail: JSON.stringify(bannerPath),
            layoutBannerImage: descListPath,
            layoutTraditionImage: imgListPath,
            uploadImagePathDetail: JSON.stringify(bannerData),
            bathtubFlag: this.BookTypeData.bathtubFlag,
            laundryServiceFlag: this.BookTypeData.laundryServiceFlag,
            breakfastInRoom: this.BookTypeData.breakfastInRoom,
            smokingFlag: this.BookTypeData.smokingFlag,
            sort: this.BookTypeData.sort,
            facilityDTOS: this.BookTypeData.facilityDTOS,
            featureDTOS: featureDTOS,
            layoutType: layoutType,
          };

          this.isSubmit = true;
          this.$api
            .bookTypeModify(params, id)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("房型修改成功！");
                this.$router.push({ name: "HotelBookTypeList" });
              } else {
                this.$message.error(result.msg);
                this.isSubmit = false;
              }
            })
            .catch((error) => {
              this.isSubmit = false;
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              })
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    resetForm() {
      this.$router.push({ name: "HotelBookTypeList" });
    },
    //图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (index == 1) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data,
        };
        this.imgList.push(image);
      } else if (index == 2) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data,
        };
        this.bannerList.push(image);
      } else if (index == 3) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data,
        };
        this.descList.push(image);
      }
    },
    //移除图片
    handleRemove(file, fileList, index) {
      if (index == 1) {
        this.imgList = fileList.map((item) => {
          return {
            name: item.name,
            url: item.url,
            path: item.path,
          };
        });
      } else if (index == 2) {
        this.bannerList = fileList.map((item) => {
          return {
            name: item.name,
            url: item.url,
            path: item.path,
          };
        });
      } else if (index == 3) {
        this.descList = fileList.map((item) => {
          return {
            name: item.name,
            url: item.url,
            path: item.path,
          };
        });
      }
    },
    //文件上传之前调用 做一些拦截限制
    beforeUpload(file, index) {
      if (index == 1 || index == 2 || index == 3) {
        const isJPG =
          file.type === "image/jpeg" ||
          "image/jpg" ||
          "image/png" ||
          "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传的图片只能是jpg、jpeg、png、gif格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      } else if (index == 4) {
        const isJPG =
          file.type === "image/jpeg" ||
          "image/jpg" ||
          "image/png" ||
          "image/gif";
        if (!isJPG) {
          this.$message.error("上传的图片只能是jpg、jpeg、png、gif格式!");
        }
        return isJPG;
      }
    },
    //文件超出个数限制时
    handleExceed(file, fileList, index) {
      if (index == 1) {
        this.$message.error("传统列表图只能上传1张！");
      } else if (index == 2) {
        this.$message.error("详情图不能超过5张！");
      } else if (index == 3) {
        this.$message.error("横幅列表图只能上传1张！");
      }
      // console.log(file,fileList);
    },
    //图片上传失败
    imgUploadError(file, fileList, index) {
      this.$message.error("上传图片失败！");
      // console.log(file,fileList);
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

