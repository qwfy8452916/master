<template>
  <div class="functionadd">
    <p class="title">功能区详情</p>
    <el-form
      :model="HotelFunctionData"
      :rules="rules"
      ref="HotelFunctionData"
      label-width="140px"
      class="functionform"
    >
      <el-form-item>
        <span slot="label">
          <label class="titlebar">基础信息</label>
        </span>
      </el-form-item>
      <hr class="line" />
      <el-form-item label="功能区名称" prop="funcCnName">
        <el-input :disabled="true" v-model.trim="HotelFunctionData.funcCnName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="funcEnName">
        <el-input :disabled="true" v-model.trim="HotelFunctionData.funcEnName"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <span slot="label"><label class="required-icon">*</label> 图标</span> -->
        <span slot="label">图标</span>
        <el-upload
          :disabled="true"
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="funcLogoPath"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="类型" prop="funcType">
        <el-select :disabled="true" v-model="HotelFunctionData.funcType" placeholder="请选择">
          <el-option
            v-for="item in funcTypeList"
            :key="item.id"
            :label="item.funcTypeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代码" prop="funcCode">
        <el-input :disabled="true" v-model.trim="HotelFunctionData.funcCode"></el-input>
      </el-form-item>
      <el-form-item label="默认开放" prop="isShow">
        <el-switch :disabled="true" v-model="HotelFunctionData.isShow"></el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input :disabled="true" v-model.number="HotelFunctionData.sort" maxlength="9"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <label class="titlebar">功能区结构</label>
        </span>
      </el-form-item>
      <hr class="line" />
      <el-form-item>
        <span slot="label">
          <label class="titlebar">顶部</label>
        </span>
      </el-form-item>
      <el-form-item label="默认开放" prop="isShowTop">
        <el-switch :disabled="true" v-model="HotelFunctionData.isShowTop"></el-switch>
      </el-form-item>
      <div v-if="HotelFunctionData.isShowTop">
        <BannerPicLinkParams
          :bannerType="bannerType"
          :isDisabled="true"
          :bannerList="bannerList"
          @bannerListEvent="bannerListEvent"
        ></BannerPicLinkParams>
        <el-form-item label="标题开关" prop="isShowTitle">
          <el-switch :disabled="true" v-model="HotelFunctionData.isShowTitle"></el-switch>
        </el-form-item>
        <div v-if="HotelFunctionData.isShowTitle">
          <el-form-item label prop="titlePosition">
            <span slot="label">
              <label class="required-icon">*</label> 标题位置
            </span>
            <el-select
              :disabled="true"
              v-model="HotelFunctionData.titlePosition"
              placeholder="请选择标题位置"
            >
              <el-option
                v-for="(item,i) in titlePositionOption"
                :key="i"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="HotelFunctionData.title"
              :disabled="true"
              maxlength="30"
              placeholder="请输入标题内容"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label="电话" prop="servicePhone">
          <el-input
            v-model.number="HotelFunctionData.servicePhone"
            :disabled="true"
            maxlength="13"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="一键Wifi开关" prop="isShowWifi">
          <el-switch :disabled="true" v-model="HotelFunctionData.isShowWifi"></el-switch>
        </el-form-item>
        <el-form-item label="文化故事" prop="isShowCulture">
          <el-switch :disabled="true" v-model="HotelFunctionData.isShowCulture"></el-switch>
        </el-form-item>
      </div>
      <el-form-item>
        <span slot="label">
          <label class="titlebar">内容</label>
        </span>
      </el-form-item>
      <div v-if="HotelFunctionData.funcType==1">
        <el-form-item label="迷你吧开关" prop="isSupportCab">
          <el-switch :disabled="true" v-model="HotelFunctionData.isSupportCab"></el-switch>
        </el-form-item>
        <el-form-item label prop="empReplFee" v-if="HotelFunctionData.isSupportCab">
          <span slot="label">
            <label class="required-icon">*</label> 迷你吧补货费
          </span>
          <el-input :disabled="true" v-model="HotelFunctionData.empReplFee" placeholder="请输入迷你吧补货费"></el-input>&nbsp;
        </el-form-item>
        <el-form-item label="便利店开关" prop="isSupportStore ">
          <el-switch :disabled="true" v-model="HotelFunctionData.isSupportStore"></el-switch>
        </el-form-item>
        <el-form-item label prop="storeDelivFee" v-if="HotelFunctionData.isSupportStore">
          <span slot="label">
            <label class="required-icon">*</label> 便利店补货费
          </span>
          <el-input
            :disabled="true"
            v-model="HotelFunctionData.storeDelivFee"
            placeholder="请输入便利店补货费"
          ></el-input>&nbsp;
        </el-form-item>
      </div>
      <div v-if="HotelFunctionData.funcType==2">
        <el-form-item prop="bookPageLayout">
          <span slot="label">
            <label class="required-icon">*</label> 页面布局
          </span>
          <el-radio :disabled="true" v-model="HotelFunctionData.bookPageLayout" label="0">传统</el-radio>
          <el-radio :disabled="true" v-model="HotelFunctionData.bookPageLayout" label="1">横幅</el-radio>
        </el-form-item>
        <el-form-item label="所有可用房源" prop="roomResourcesFlag">
          <el-switch :disabled="true" v-model="HotelFunctionData.roomResourcesFlag"></el-switch>
        </el-form-item>
        <el-form-item
          label="部分房源房源"
          prop="bookFuncResources"
          v-if="!HotelFunctionData.roomResourcesFlag"
        >
          <span slot="label">
            <label class="required-icon">*</label> 可用房源
          </span>
          <el-select
            v-model="HotelFunctionData.bookFuncResources"
            :disabled="true"
            multiple
            value-key="item.id"
            placeholder="请选择可用房源"
          >
            <el-option
              v-for="item in bookFuncResourcesOptions"
              :key="item.id"
              :label="item.resourceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div v-if="HotelFunctionData.funcType==3">
        <el-form-item label="暂无内容"></el-form-item>
      </div>
      <div v-if="HotelFunctionData.funcType==4">
        <el-form-item label prop="pageLayout">
          <span slot="label">
            <label class="required-icon">*</label> 页面布局
          </span>
          <el-select v-model="HotelFunctionData.pageLayout" :disabled="true" placeholder="请选择">
            <el-option
              v-for="(item,i) in pageLayoutList"
              :key="i"
              :label="item.pageLayoutName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop="delivWays">
          <span slot="label">
            <label class="required-icon">*</label> 配送方式
          </span>
          <!-- <el-checkbox-group v-model="HotelFunctionData.delivWays">
                    <el-checkbox label="0">现场送</el-checkbox>
                    <el-checkbox label="1">快递送</el-checkbox>
          </el-checkbox-group>-->
          <el-select
            v-model="HotelFunctionData.delivWays"
            multiple
            :disabled="true"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,i) in delivWayList"
              :key="i"
              :label="item.delivWayName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="isExpress" prop="lgcChooseWays">
                <span slot="label"><label class="required-icon">*</label> 物流选择</span>
                <el-checkbox-group v-model="HotelFunctionData.lgcChooseWays" >
                    <el-checkbox label="1">由商家选择</el-checkbox>
                    <el-checkbox label="2">外部物流</el-checkbox>
                </el-checkbox-group>
                <span v-if="isWlgs" class="lgcstyle">
                    <el-select v-model="HotelFunctionData.hotelLgcIds" multiple placeholder="请选择外部物流" style="width:92%;">
                        <el-option 
                            v-for="item in lgcList" 
                            :key="item.id" 
                            :label="item.lgcName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
        </el-form-item>-->
        <el-form-item v-if="isTakeout" label="限时开放" prop="isTimeLimited">
          <el-switch :disabled="true" v-model="HotelFunctionData.isTimeLimited"></el-switch>
        </el-form-item>
        <el-form-item v-if="isTakeout && HotelFunctionData.isTimeLimited">
          <span slot="label">
            <label class="required-icon">*</label> 时间范围
          </span>
          <el-time-picker
            :disabled="true"
            is-range
            v-model="HotelFunctionData.horizonTime"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item v-if="isTakeout" label="限时送达" prop="isTimeLimitedDeliv">
          <el-switch :disabled="true" v-model="HotelFunctionData.isTimeLimitedDeliv"></el-switch>
        </el-form-item>
        <el-form-item v-if="isTakeout && HotelFunctionData.isTimeLimitedDeliv">
          <span slot="label">
            <label class="required-icon">*</label> 时间间隔
          </span>
          <el-input
            :disabled="true"
            v-model.number="HotelFunctionData.delivLimitDuration"
            maxlength="9"
          ></el-input>分钟
        </el-form-item>
        <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
          <el-select
            :disabled="true"
            v-model="HotelFunctionData.pickUpPointIds"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="(item,i) in pickUpPointList"
              :key="i"
              :label="item.pickUpPointName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多次下单" prop="isSupportManyTimesOrder">
          <el-tooltip class="item" effect="dark" :content="manyTimesOrderHint" placement="right">
            <el-switch v-model="HotelFunctionData.isSupportManyTimesOrder" :disabled="true"></el-switch>
          </el-tooltip>
        </el-form-item>
        <!-- <el-form-item v-if="isPrintByProd" label="厨房小票分商品打印" prop="isKitchenReceiptPrintedByProd">
                <el-tooltip class="item" effect="dark" :content="printedByProdHint" placement="right">
                    <el-switch v-model="HotelFunctionData.isKitchenReceiptPrintedByProd"></el-switch>
                </el-tooltip>
        </el-form-item>-->
        <!-- <el-form-item label="配送服务费" prop="delivFee">
                <el-input  v-model.trim="HotelFunctionData.delivFee" maxlength="10"></el-input> 元/件
        </el-form-item>-->
      </div>
      <div v-if="HotelFunctionData.funcType==5">
        <el-form-item label="暂无内容"></el-form-item>
      </div>
      <div v-if="HotelFunctionData.funcType==6">
        <el-form-item label="暂无内容"></el-form-item>
      </div>
      <div v-if="HotelFunctionData.funcType==7">
        <el-form-item label="暂无内容"></el-form-item>
      </div>
      <el-form-item>
        <el-button @click="resetForm">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BannerPicLinkParams from "@/components/BannerPicLinkParams";
export default {
  name: "HotelFunctionDetail",
  components: {
    BannerPicLinkParams,
  },
  data() {
    var priceReg = /^\d+(\.\d+)?$/;
    var validatePrice = (rule, value, callback) => {
      if (!priceReg.test(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    return {
      authzData: "",
      hotelId: "",
      hotelIsSupportTakeOutOrder: "",
      hfId: "",
      isPickUp: false,
      isAbleModify: true,
      funcTypeList: [], //类型
      delivWayList: [], //配送方式
      pickUpPointList: [],
      pageLayoutList: [],
      isExpress: false, //是否支持快递
      isWlgs: false, //是否支持外部物流
      isTakeout: false, //是否支持外卖
      // isPrintByProd: false,   //是否支持外卖
      lgcList: [],
      manyTimesOrderHint:
        "如果开关打开，表示多人扫码，进入的是同一个订单，并可以多人多次点单。如果开关关闭，表示用户扫码下单，每个人都会生成一个新的订单。",
      // printedByProdHint: "如果开关打开，表示一个订单里的每一个商品都单独打印。如果开关关闭，表示一个订单里面的菜品打印在一个小票上。",
      HotelFunctionData: {
        funcCnName: "",
        funcEnName: "",
        funcType: "",
        delivWays: [],
        lgcChooseWays: ["1"],
        hotelLgcIds: [],
        isTimeLimited: false,
        horizonTime: ["00:00:00", "23:59:59"],
        // openStartTime: '',
        // openEndTime: '',
        isTimeLimitedDeliv: false,
        delivLimitDuration: 60,
        pickUpPointIds: [],
        // delivFee: '',
        funcCode: "",
        pageLayout: "",
        sort: 0,
      },
      bookFuncResourcesOptions: [],
      titlePositionOption: [
        {
          id: "1",
          title: "上方",
        },
        {
          id: "2",
          title: "下方",
        },
      ], //标题位置参数
      uploadUrl: this.$api.upload_file_url,
      headers: {},
      funcLogoPath: [],
      bannerList: [],
      isDisabled: true,
      bannerType: 1,
      isSubmit: false,
      rules: {
        funcCnName: [
          { required: true, message: "请输入功能区名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "功能区名称请保持在10个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        funcEnName: [
          {
            min: 0,
            max: 50,
            message: "英文名称请保持在50个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        funcType: [
          { required: true, message: "请选择类型", trigger: "change" },
        ],
        // delivWays: [
        //     { type: 'array', required: true, message: '请至少选择一个配送方式', trigger: 'change' }
        // ],
        // delivWays: [
        //     {required: true, message: '请选择配送方式', trigger: 'change'}
        // ],
        // delivFee: [
        //     {required: true, validator: validatePrice, trigger: ['blur','change']}
        // ],
        funcCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "代码请保持在10个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        // pageLayout: [
        //     { required: true, message: '请选择页面布局', trigger: 'change' }
        // ],
        sort: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
        delivLimitDuration: [
          {
            type: "number",
            message: "请输入数字",
            trigger: ["blur", "change"],
          },
        ],
        // openStartTime: [
        //     {required: true, message: '请选择起始时间', trigger: 'change'}
        // ],
        // openEndTime: [
        //     {required: true, message: '请选择结束时间', trigger: 'change'}
        // ]

        param: [
          { required: true, message: "请输入参数", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "参数请保持在50个字符以内",
            trigger: ["blur", "change"],
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
    const token = localStorage.getItem("Authorization");
    this.headers = { Authorization: token };
    this.hotelId = localStorage.getItem("hotelId");
    this.hotelIsSupportTakeOutOrder = localStorage.getItem(
      "hotelIsSupportTakeOutOrder"
    );
    this.hfId = this.$route.query.id;
    this.basicDataItems_ft();
    this.basicDataItems_dw();
    this.basicDataItems_pl();
    this.getHotelPickUpPointList();
    this.getLgcList();
    this.hotelFunctionDetail();
    this.getBookFuncResourcesList();
  },
  methods: {
    getBookFuncResourcesList() {
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 200,
      };
      this.$api
        .bookResourceList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.bookFuncResourcesOptions = result.data.records.map((item) => {
              return {
                id: item.id,
                resourceName: item.resourceName,
                roomTypeId: item.roomTypeId,
              };
            });
            // const resourceNameAll = {
            //   id: "",
            //   resourceName: "全部",
            // };
            // this.bookFuncResourcesOptions.unshift(resourceNameAll);
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
    bannerListEvent(e) {
      this.bannerList = e.fileList;
    },
    //获取类型 - 字典表
    basicDataItems_ft() {
      const params = {
        key: "FUNC_TYPE",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.funcTypeList = result.data.map((item) => {
                return {
                  id: item.dictValue,
                  funcTypeName: item.dictName,
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
    //获取指定酒店的全部外部物流
    getLgcList() {
      const params = {
        hotelId: this.hotelId,
      };
      this.$api
        .getLgcList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.lgcList = result.data.map((item) => {
                return {
                  id: item.lgcId,
                  lgcName: item.lgcName,
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
    //获取配送方式 - 字典表
    basicDataItems_dw() {
      const params = {
        key: "DEVI",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.delivWayList = result.data.map((item) => {
                return {
                  id: item.dictValue,
                  delivWayName: item.dictName,
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
    //获取页面布局 - 字典表
    basicDataItems_pl() {
      const params = {
        key: "PAGE_LAYOUT",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.pageLayoutList = result.data.map((item) => {
                return {
                  id: item.dictValue,
                  pageLayoutName: item.dictName,
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
    //获取酒店自提点列表
    getHotelPickUpPointList() {
      const params = {
        hotelId: this.hotelId,
      };
      // console.log(params);
      this.$api
        .getHotelPickUpPointList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.pickUpPointList = result.data.map((item) => {
                return {
                  id: item.id,
                  pickUpPointName: item.pointName,
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
    //transform 转换
    transformFunc(val) {
      if (val == 1) {
        return true;
      } else {
        return false;
      }
    },
    //获取功能区详情
    hotelFunctionDetail() {
      const params = {};
      const id = this.hfId;
      this.$api
        .hotelFunctionDetail(params, id)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            result.data["horizonTime"] = [
              result.data.openStartTime,
              result.data.openEndTime,
            ];
            this.HotelFunctionData = result.data;
            this.HotelFunctionData.funcType = result.data.funcType.toString();
            if (result.data.lgcChooseWays == null) {
              this.HotelFunctionData.lgcChooseWays = [];
            }
            this.HotelFunctionData.isTimeLimited = this.transformFunc(
              result.data.isTimeLimited
            );
            this.HotelFunctionData.isTimeLimitedDeliv = this.transformFunc(
              result.data.isTimeLimitedDeliv
            );
            this.HotelFunctionData.isShow = this.transformFunc(
              result.data.isShow
            );
            this.HotelFunctionData.isSupportManyTimesOrder = this.transformFunc(
              result.data.isSupportManyTimesOrder
            );
            // this.HotelFunctionData.isKitchenReceiptPrintedByProd = this.transformFunc(result.data.isKitchenReceiptPrintedByProd);
            if (
              result.data.funcLogoPath != "" &&
              result.data.funcLogoUrl != null
            ) {
              this.funcLogoPath = [
                {
                  name: result.data.funcLogoPath,
                  url: result.data.funcLogoUrl,
                  path: result.data.funcLogoPath,
                },
              ];
            }
            this.bannerList = result.data.funcBannerImages.map((item) => {
              return {
                id: item.id,
                name: item.imagePath,
                url: item.imageUrl,
                path: item.imagePath,
                linkId: item.linkId,
                isParam: item.isNeedParameter == 1 ? true : false,
                paramsData: item.params,
                paramsLD: [],
              };
            });
            //快递送
            let kdIndex = result.data.delivWays.indexOf("2");
            if (kdIndex != -1) {
              this.isExpress = true;
            } else {
              this.isExpress = false;
            }
            //外部物流
            let wbIndex = result.data.lgcChooseWays.indexOf("2");
            if (wbIndex != -1) {
              this.isWlgs = true;
            } else {
              this.isWlgs = false;
            }
            //自提区
            let ztIndex = result.data.delivWays.indexOf("4");
            if (ztIndex != -1) {
              this.isPickUp = true;
            } else {
              this.isPickUp = false;
            }
            //堂食
            let tsIndex = result.data.delivWays.indexOf("6");
            //外卖
            let wmIndex = result.data.delivWays.indexOf("7");
            if (wmIndex != -1) {
              this.isTakeout = true;
            } else {
              this.isTakeout = false;
            }
            //外带
            let wdIndex = result.data.delivWays.indexOf("7");
            if (tsIndex != -1 || wmIndex != -1 || wdIndex != -1) {
              // this.isPrintByProd = true;
            } else {
              // this.isPrintByProd = false;
            }
            //新增
            this.HotelFunctionData.bookPageLayout = result.data.bookPageLayout.toString();
            this.HotelFunctionData.roomResourcesFlag = this.transformFunc(
              result.data.roomResourcesFlag
            );

            this.HotelFunctionData.isShowTop = this.transformFunc(
              result.data.isShowTop
            );
            this.HotelFunctionData.isShowTitle = this.transformFunc(
              result.data.isShowTitle
            );
            this.HotelFunctionData.isShowTop = this.transformFunc(
              result.data.isShowTop
            );
            this.HotelFunctionData.titlePosition = result.data.titlePosition.toString();
            if (
              this.HotelFunctionData.isShowTitle &&
              this.HotelFunctionData.title == ""
            ) {
              this.HotelFunctionData.title = localStorage.getItem("hotelName");
            } else {
              this.HotelFunctionData.title = result.data.title;
            }
            if (this.HotelFunctionData.servicePhone == "") {
              this.HotelFunctionData.servicePhone = localStorage.getItem(
                "hotelServicePhone"
              );
            } else {
              this.HotelFunctionData.servicePhone = result.data.servicePhone;
            }
            this.HotelFunctionData.isShowWifi = this.transformFunc(
              result.data.isShowWifi
            );
            this.HotelFunctionData.isShowCulture = this.transformFunc(
              result.data.isShowCulture
            );
            let bookFuncResourcesData = [];
            if (
              result.data.bookFuncResources != null &&
              result.data.bookFuncResources.length > 0
            ) {
              result.data.bookFuncResources.forEach((element) => {
                bookFuncResourcesData.push(element.id);
              });
            }
            this.HotelFunctionData.bookFuncResources = bookFuncResourcesData;
            this.HotelFunctionData.hotelId = result.data.hotelId;
            this.HotelFunctionData.isSupportCab = this.transformFunc(
              result.data.isSupportCab
            );
            this.HotelFunctionData.empReplFee = result.data.empReplFee.toString();
            this.HotelFunctionData.isSupportStore = this.transformFunc(
              result.data.isSupportStore
            );
            this.HotelFunctionData.storeDelivFee = result.data.storeDelivFee.toString();


            this.isDisableDelivWay(result.data.hotelId, result.data.id);
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
    //检验配送方式是否可修改（检验功能区下是否有商品或者酒店商品有没有被功能区使用）
    isDisableDelivWay(hotelId, funcId) {
      const params = {
        hotelId: hotelId,
        funcId: funcId,
      };
      this.$api
        .isDisableDelivWay(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data) {
              this.isAbleModify = false;
            } else {
              this.isAbleModify = true;
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
    //switch转换
    switchFunc(val) {
      if (val) {
        return 1;
      } else {
        return 0;
      }
    },
    //取消
    resetForm() {
      this.$router.push({ name: "HotelFunctionList" });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 90%;
}
.el-select {
  width: 90%;
}
.el-upload-list {
  width: 90%;
}
</style>

<style lang="less" scoped>
.functionadd {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .functionform {
    width: 45%;
    .required-icon {
      color: #f56c6c;
    }
    .titlebar {
      font-size: 16px;
      color: #444;
    }
    .line {
      width: 200%;
      border: 0px;
      border-bottom: 1px dashed #ccc;
      margin: -15px 0px 20px 0px;
    }
    .lgcstyle {
      position: absolute;
      top: 0px;
      left: 230px;
    }
    .bannerstyle {
      position: relative;
      .bannerlink {
        position: absolute;
        z-index: 10;
        top: 76px;
        left: 200px;
        .el-form-item {
          height: 102px;
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
