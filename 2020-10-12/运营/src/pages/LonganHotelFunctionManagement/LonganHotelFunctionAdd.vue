<template>
  <div class="functionadd">
    <p class="title">新增功能区</p>
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
      <el-form-item label="酒店名称" prop="hotelId">
        <el-select
          v-model="HotelFunctionData.hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          @change="hotelChange"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,i) in hotelList"
            :key="i"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能区名称" prop="funcCnName">
        <el-input v-model.trim="HotelFunctionData.funcCnName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="funcEnName">
        <el-input v-model.trim="HotelFunctionData.funcEnName"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <span slot="label"><label class="required-icon">*</label> 图标</span> -->
        <span slot="label">图标</span>
        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
          :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
          :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
          :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
          :before-upload="(file, index) => {return beforeUpload(file, 1)}"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="类型" prop="funcType">
        <el-select
          v-model="HotelFunctionData.funcType"
          placeholder="请选择"
          @change="selectFuncType(HotelFunctionData.funcType)"
        >
          <el-option
            v-for="(item,i) in funcTypeList"
            :key="i"
            :label="item.funcTypeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成协议" prop="allocId">
        <el-select v-model="HotelFunctionData.allocId" placeholder="请选择">
          <el-option
            v-for="(item,i) in protocolList"
            :key="i"
            :label="item.allocName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代码" prop="funcCode">
        <el-input v-model.trim="HotelFunctionData.funcCode"></el-input>
      </el-form-item>
      <el-form-item label="默认开放" prop="isShow">
        <el-switch v-model="HotelFunctionData.isShow"></el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="HotelFunctionData.sort" maxlength="9"></el-input>
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
      <el-form-item label="默认开放" prop="isShowTop	">
        <el-switch v-model="HotelFunctionData.isShowTop	"></el-switch>
      </el-form-item>
      <div v-if="HotelFunctionData.isShowTop	">
        <LonganUploadPicCommen
          :uploadType="uploadType='banner'"
          :isDisabled="isDisabled"
          :bannerList="bannerList"
          :bannerType="bannerType"
          @bannerListEvent="bannerListEvent"
        ></LonganUploadPicCommen>
        <el-form-item label="标题开关" prop="isShowTitle">
          <el-switch v-model="HotelFunctionData.isShowTitle"></el-switch>
        </el-form-item>
        <div v-if="HotelFunctionData.isShowTitle">
          <el-form-item label prop="titlePosition">
            <span slot="label">
              <label class="required-icon">*</label> 标题位置
            </span>
            <el-select
              @change="titlePositionChange(HotelFunctionData.titlePosition)"
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
              @blur="titleBlur(HotelFunctionData.title)"
              v-model="HotelFunctionData.title"
              maxlength="30"
              placeholder="请输入标题内容"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label="电话" prop="servicePhone">
          <el-input
            @blur="servicePhoneBlur(HotelFunctionData.servicePhone)"
            v-model.number="HotelFunctionData.servicePhone"
            maxlength="13"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="一键Wifi开关" prop="isShowWifi">
          <el-switch v-model="HotelFunctionData.isShowWifi"></el-switch>
        </el-form-item>
        <el-form-item label="文化故事" prop="isShowCulture">
          <el-switch v-model="HotelFunctionData.isShowCulture"></el-switch>
        </el-form-item>
      </div>
      <el-form-item>
        <span slot="label">
          <label class="titlebar">内容</label>
        </span>
      </el-form-item>
      <div v-if="HotelFunctionData.funcType==1">
        <el-form-item label="迷你吧开关" prop="isSupportCab">
          <el-switch v-model="HotelFunctionData.isSupportCab"></el-switch>
        </el-form-item>
        <el-form-item label prop="empReplFee" v-if="HotelFunctionData.isSupportCab">
          <span slot="label">
            <label class="required-icon">*</label> 迷你吧补货费
          </span>
          <el-input
            @blur="empReplFeeBlur(HotelFunctionData.empReplFee)"
            v-model="HotelFunctionData.empReplFee"
            placeholder="请输入迷你吧补货费"
          ></el-input>&nbsp;
        </el-form-item>
        <el-form-item label="便利店开关" prop="isSupportStore ">
          <el-switch v-model="HotelFunctionData.isSupportStore"></el-switch>
        </el-form-item>
        <el-form-item label prop="storeDelivFee" v-if="HotelFunctionData.isSupportStore">
          <span slot="label">
            <label class="required-icon">*</label> 便利店补货费
          </span>
          <el-input
            @blur="storeDelivFeeBlur(HotelFunctionData.storeDelivFee)"
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
          <el-radio v-model="HotelFunctionData.bookPageLayout" label="0">传统</el-radio>
          <el-radio v-model="HotelFunctionData.bookPageLayout" label="1">横幅</el-radio>
        </el-form-item>
        <el-form-item label="所有可用房源" prop="roomResourcesFlag">
          <el-switch v-model="HotelFunctionData.roomResourcesFlag"></el-switch>
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
            @change="changeBookFuncResources(HotelFunctionData.bookFuncResources)"
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
          <el-select
            v-model="HotelFunctionData.pageLayout"
            @change="selectLayout"
            placeholder="请选择"
          >
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
            placeholder="请选择"
            @change="selectDelivType"
            value-key="i"
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
                <el-checkbox-group v-model="HotelFunctionData.lgcChooseWays" @change="selectLgcWay">
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
          <el-switch v-model="HotelFunctionData.isTimeLimited"></el-switch>
        </el-form-item>
        <el-form-item v-if="isTakeout && HotelFunctionData.isTimeLimited">
          <span slot="label">
            <label class="required-icon">*</label> 时间范围
          </span>
          <el-time-picker
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
          <el-switch v-model="HotelFunctionData.isTimeLimitedDeliv"></el-switch>
        </el-form-item>
        <el-form-item v-if="isTakeout && HotelFunctionData.isTimeLimitedDeliv">
          <span slot="label">
            <label class="required-icon">*</label> 时间间隔
          </span>
          <el-input v-model.number="HotelFunctionData.delivLimitDuration" maxlength="9"></el-input>分钟
        </el-form-item>
        <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
          <el-select
            v-model="HotelFunctionData.pickUpPointIds"
            value-key="i"
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
            <el-switch
              v-model="HotelFunctionData.isSupportManyTimesOrder"
              @change="selectManytimesOrder"
            ></el-switch>
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
        <el-button @click="resetForm">取消</el-button>
        <el-button
          v-if="authzData['F:BO_HOTEL_FUNCTION_ADD_SUBMIT']"
          type="primary"
          :disabled="isSubmit"
          @click="submitForm('HotelFunctionData')"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LonganUploadPicCommen from "@/components/LonganUploadPicCommen";
export default {
  name: "LonganHotelFunctionAdd",
  components: {
    LonganUploadPicCommen,
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
      hotelList: [],
      loadingH: false,
      isPickUp: false,
      funcTypeList: [], //类型
      delivWayList: [], //配送方式
      pickUpPointList: [],
      protocolList: [],
      pageLayoutList: [],
      isExpress: false, //是否支持快递
      isWlgs: false, //是否支持外部物流
      isTakeout: false, //是否支持外卖
      // isPrintByProd: false,   //是否支持小票打印
      lgcList: [],
      manyTimesOrderHint:
        "如果开关打开，表示多人扫码，进入的是同一个订单，并可以多人多次点单。如果开关关闭，表示用户扫码下单，每个人都会生成一个新的订单。",
      // printedByProdHint: "如果开关打开，表示一个订单里的每一个商品都单独打印。如果开关关闭，表示一个订单里面的菜品打印在一个小票上。",
      HotelFunctionData: {
        hotelId: "",
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
        isSupportManyTimesOrder: false,
        // isKitchenReceiptPrintedByProd: false,
        // delivFee: '',
        allocId: "",
        funcCode: "",
        isShow: true,
        pageLayout: "",
        sort: 0,
        //功能区结构--顶部信息
        isShowTop: true, //顶部信息开关
        isShowTitle: false, //标题开关
        titlePosition: "", //标题位置
        title: "", //标题内容
        servicePhone: "", //电话号码
        isShowWifi: true, //wifi开关
        isShowCulture: false, //文化故事开关
        //功能区结构--内容
        isSupportCab: false, //迷你吧开关
        isSupportStore: false, //便利店开关
        empReplFee: "", //迷你吧补货费
        storeDelivFee: "", //便利店补货费
        bookPageLayout: "", //页面布局
        roomResourcesFlag: false, //所有可用房源开关
        bookFuncResources: [], //所有可用房源
      },
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
      bookFuncResourcesOptions: [], //所有可用房源
      uploadUrl: this.$api.upload_file_url,
      headers: {},
      funcLogoPath: "",
      bannerList: [],
      isDisabled: false,
      bannerType: 1,
      isSubmit: false,
      rules: {
        hotelId: [
          { required: true, message: "请选择酒店名称", trigger: "change" },
        ],
        funcCnName: [
          { required: true, message: "请输入功能区名称", trigger: "blur" },
          {
            min: 1,
            max: 5,
            message: "功能区名称请保持在5个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        funcEnName: [
          {
            min: 0,
            max: 10,
            message: "英文名称请保持在10个字符以内",
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
        //   { required: true, message: "请选择配送方式", trigger: "change" },
        // ],
        // delivFee: [
        //     {required: true, validator: validatePrice, trigger: ['blur','change']}
        // ],
        allocId: [
          { required: true, message: "请选择分成协议", trigger: "change" },
        ],
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
        //   { required: true, message: "请选择页面布局", trigger: "change" },
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
      },
      hotelServicePhone: "",
      hotelNameTitle: "",
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
    this.getHotelList();
    this.getprotocolList();
    this.basicDataItems_ft();
    this.basicDataItems_dw();
    this.basicDataItems_pl();
    this.getBookFuncResourcesList();
  },
  methods: {
    changeBookFuncResources(bookFuncResources) {
      if (this.HotelFunctionData.bookFuncResources.length == 0) {
        this.$message.error("请选择房源！");
      }
    },
    getBookFuncResourcesList() {
      const params = {
        orgAs: 2,
        hotelId: this.HotelFunctionData.hotelId || "",
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
    storeDelivFeeBlur(storeDelivFee) {
      if (this.HotelFunctionData.storeDelivFee == "") {
        this.$message.error("请输入便利店补货费");
      } else {
        let money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!money.test(this.HotelFunctionData.storeDelivFee)) {
          this.$message.error("金钱格式输入有误！");
        }
      }
    },
    empReplFeeBlur(empReplFee) {
      if (this.HotelFunctionData.empReplFee == "") {
        this.$message.error("请输入迷你吧补货费");
      } else {
        let money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!money.test(this.HotelFunctionData.empReplFee)) {
          this.$message.error("金钱格式输入有误！");
        }
      }
    },
    titleBlur(title) {
      if (title == "") {
        this.HotelFunctionData.title = this.HotelFunctionData.hotelId;
      }
    },
    servicePhoneBlur(servicePhone) {},
    titlePositionChange(titlePosition) {
      if (titlePosition == "") {
        this.$message.error("请选择标题位置！");
      }
    },
    selectFuncType(typeCode) {
      // console.log(typeCode, "typeCode");
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
    getLgcList(hotelId) {
      const params = {
        hotelId: hotelId,
      };
      this.$api
        .getLgcList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.lgcList = result.data.map((item) => {
                return {
                  id: item.id,
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
                isSupportTakeOutOrder: item.isSupportTakeOutOrder,
                hotelServicePhone: item.hotelServicePhone,
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    hotelChange() {
      if (this.HotelFunctionData.hotelId == "") {
        this.pickUpPointList = [];
        this.lgcList = [];
      } else {
        this.HotelFunctionData.pickUpPointIds = [];
        this.getHotelPickUpPointList(this.HotelFunctionData.hotelId);
        this.HotelFunctionData.hotelLgcIds = [];
        this.getLgcList(this.HotelFunctionData.hotelId);
        this.hotelList.forEach((element) => {
          if (element.id == this.HotelFunctionData.hotelId) {
            this.HotelFunctionData.servicePhone = element.hotelServicePhone;
            this.HotelFunctionData.title = element.hotelName;
            this.hotelServicePhone = element.hotelServicePhone;
            this.hotelNameTitle = element.hotelName;
          }
        });
      }
      this.HotelFunctionData.delivWays = [];
      this.HotelFunctionData.pageLayout = "";
      this.HotelFunctionData.isSupportManyTimesOrder = false;
      // this.isPrintByProd = false;
      this.isTakeout = false;
      this.getBookFuncResourcesList();
    },
    //选择页面布局
    selectLayout(val) {
      this.HotelFunctionData.delivWays = [];
      this.HotelFunctionData.isSupportManyTimesOrder = false;
      // this.isPrintByProd = false;
      this.isTakeout = false;
    },
    //选择配送方式
    selectDelivType(value) {
      if (this.HotelFunctionData.hotelId == "") {
        this.$message.error("请选择酒店名称");
        this.HotelFunctionData.delivWays = [];
        return false;
      }
      //店内送
      let dnsIndex = this.HotelFunctionData.delivWays.indexOf("1");
      //快递送
      let kdIndex = this.HotelFunctionData.delivWays.indexOf("2");
      //迷你吧
      let mnbIndex = this.HotelFunctionData.delivWays.indexOf("3");
      //自提区
      let ztIndex = this.HotelFunctionData.delivWays.indexOf("4");
      //电子商品
      let zzIndex = this.HotelFunctionData.delivWays.indexOf("5");
      //堂食
      let tsIndex = this.HotelFunctionData.delivWays.indexOf("6");
      //外卖
      let wmIndex = this.HotelFunctionData.delivWays.indexOf("7");
      //外带
      let wdIndex = this.HotelFunctionData.delivWays.indexOf("8");
      if (value.length != 0) {
        if (this.HotelFunctionData.pageLayout == "1") {
          //布局 - 商品
          // this.isPrintByProd = false;
          if (mnbIndex != -1) {
            this.$message.warning("商品-布局不支持迷你吧/堂食/外卖/外带！");
            this.HotelFunctionData.delivWays.splice(mnbIndex, 1);
          } else if (tsIndex != -1) {
            this.$message.warning("商品-布局不支持迷你吧/堂食/外卖/外带！");
            this.HotelFunctionData.delivWays.splice(tsIndex, 1);
          } else if (wmIndex != -1) {
            this.$message.warning("商品-布局不支持迷你吧/堂食/外卖/外带！");
            this.HotelFunctionData.delivWays.splice(wmIndex, 1);
          } else if (wdIndex != -1) {
            this.$message.warning("商品-布局不支持迷你吧/堂食/外卖/外带！");
            this.HotelFunctionData.delivWays.splice(wdIndex, 1);
          } else {
            // //快递送
            // if(kdIndex != -1){
            //     this.isExpress = true;
            //     this.HotelFunctionData.lgcChooseWays = ['1'];
            // }else{
            //     this.isExpress = false;
            // }
            //自提区
            if (ztIndex != -1) {
              this.isPickUp = true;
            } else {
              this.isPickUp = false;
            }
          }
        } else if (this.HotelFunctionData.pageLayout == "2") {
          //布局 - 餐饮
          // this.isPrintByProd = true;
          // if(dnsIndex != -1){
          //     this.$message.warning("餐饮-布局不支持店内送/快递送/迷你吧/自提区/电子商品！");
          //     this.HotelFunctionData.delivWays.splice(dnsIndex, 1);
          // }else if(kdIndex != -1){
          //     this.$message.warning("餐饮-布局不支持店内送/快递送/迷你吧/自提区/电子商品！");
          //     this.HotelFunctionData.delivWays.splice(kdIndex, 1);
          // }else
          if (mnbIndex != -1) {
            this.$message.warning("餐饮-布局不支持迷你吧/电子商品！");
            this.HotelFunctionData.delivWays.splice(mnbIndex, 1);
          }
          // else if(ztIndex != -1){
          //     this.$message.warning("餐饮-布局不支持店内送/快递送/迷你吧/自提区/电子商品！");
          //     this.HotelFunctionData.delivWays.splice(ztIndex, 1);
          // }
          else if (zzIndex != -1) {
            this.$message.warning("餐饮-布局不支持迷你吧/电子商品！");
            this.HotelFunctionData.delivWays.splice(zzIndex, 1);
          } else {
            //自提区
            if (ztIndex != -1) {
              this.isPickUp = true;
            } else {
              this.isPickUp = false;
            }
            //外卖
            if (wmIndex != -1) {
              let hotelInfo = this.hotelList.find(
                (item) => item.id == this.HotelFunctionData.hotelId
              );
              if (hotelInfo.isSupportTakeOutOrder == 0) {
                this.$message.error("选中的酒店不支持外卖！");
                this.HotelFunctionData.delivWays.splice(wmIndex, 1);
                return false;
              }
              this.isTakeout = true;
            } else {
              this.isTakeout = false;
            }
          }
        } else if (this.HotelFunctionData.pageLayout == "3") {
          //布局 - 卡券
          this.HotelFunctionData.delivWays = ["5"];
          // this.isPrintByProd = false;
        } else {
          this.$message.error("请选择页面布局");
          this.HotelFunctionData.delivWays = [];
          // this.isPrintByProd = false;
        }
      } else {
        this.isExpress = false;
        this.isTakeout = false;
        // this.isPrintByProd = false;
        this.isPickUp = false;
      }
      //堂食
      if (tsIndex == -1) {
        if (this.HotelFunctionData.isSupportManyTimesOrder) {
          this.HotelFunctionData.delivWays.push("6");
          // this.isPrintByProd = true;
        }
      }
    },
    //选择是否支持多次下单
    selectManytimesOrder(val) {
      if (this.HotelFunctionData.hotelId == "") {
        this.$message.error("请选择酒店名称");
        this.HotelFunctionData.isSupportManyTimesOrder = false;
        return false;
      }
      if (this.HotelFunctionData.pageLayout == "") {
        this.$message.error("请选择页面布局");
        this.HotelFunctionData.isSupportManyTimesOrder = false;
        return false;
      }
      if (val) {
        let tsIndex = this.HotelFunctionData.delivWays.indexOf("6");
        if (this.HotelFunctionData.pageLayout == "2") {
          if (tsIndex == -1) {
            this.HotelFunctionData.delivWays.push("6");
            // this.isPrintByProd = true;
          }
        } else {
          this.$message.error("仅餐饮-布局支持多次下单");
          this.HotelFunctionData.isSupportManyTimesOrder = false;
        }
      }
    },
    //选择物流
    selectLgcWay(value) {
      //外部物流
      let wbIndex = this.HotelFunctionData.lgcChooseWays.indexOf("2");
      if (wbIndex != -1) {
        this.isWlgs = true;
        this.HotelFunctionData.isTimeLimited = true;
        this.HotelFunctionData.isTimeLimitedDeliv = true;
      } else {
        this.isWlgs = false;
      }
    },
    //获取酒店自提点列表
    getHotelPickUpPointList(value) {
      const params = {
        hotelId: value,
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
    //获取分成协议列表
    getprotocolList() {
      const params = {};
      this.$api
        .getprotocolList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.protocolList = result.data.map((item) => {
              return {
                allocName: item.allocName,
                id: item.id,
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
    //switch转换
    switchFunc(val) {
      if (val) {
        return 1;
      } else {
        return 0;
      }
    },
    //确定 - 新增
    submitForm(HotelFunctionData) {
      let bannerPath = this.bannerList.map((item) => {
        return {
          imagePath: item.path,
          linkId: item.linkId,
          linkParamList: item.paramsData,
        };
      });
      // console.log(bannerPath);
      // return
      if (this.HotelFunctionData.sort == "") {
        this.HotelFunctionData.sort = 0;
      }
      if (this.HotelFunctionData.horizonTime == null) {
        this.HotelFunctionData.horizonTime = [];
      }
      if (this.HotelFunctionData.delivLimitDuration == "") {
        this.HotelFunctionData.delivLimitDuration = 60;
      }
      this.$refs[HotelFunctionData].validate((valid) => {
        if (valid) {
          // if(this.funcLogoPath == ''){
          //     this.$message.error('请上传图标!');
          //     return false
          // }

          /*//快递送
                    let kdIndex = this.HotelFunctionData.delivWays.indexOf("2");
                    if(kdIndex != -1){
                        if(this.HotelFunctionData.lgcChooseWays.length == 0){
                            this.$message.error('请选择物流!');
                            return false
                        }
                        //外部物流
                        let wbIndex = this.HotelFunctionData.lgcChooseWays.indexOf("2");
                        if(wbIndex != -1){
                            if(!this.HotelFunctionData.isTimeLimited || !this.HotelFunctionData.isTimeLimitedDeliv){
                                this.$message.error('请选择限时开放和限时送达!');
                                return false
                            }else{
                                if(this.HotelFunctionData.horizonTime.length == 0){
                                    this.$message.error('请选择时间范围!');
                                    return false
                                }
                                if(this.HotelFunctionData.delivLimitDuration == ''){
                                    this.$message.error('请输入时间间隔!');
                                    return false
                                }
                            }
                        }
                    }*/
          //外卖
          let wmIndex = this.HotelFunctionData.delivWays.indexOf("7");
          if (wmIndex != -1) {
            if (
              !this.HotelFunctionData.isTimeLimited ||
              !this.HotelFunctionData.isTimeLimitedDeliv
            ) {
              this.$message.error("请选择限时开放和限时送达!");
              return false;
            } else {
              if (this.HotelFunctionData.horizonTime.length == 0) {
                this.$message.error("请选择时间范围!");
                return false;
              }
              if (this.HotelFunctionData.delivLimitDuration == "") {
                this.$message.error("请输入时间间隔!");
                return false;
              }
            }
          }
          //配送方式-电子商品
          let zzIndex = this.HotelFunctionData.delivWays.indexOf("5");
          if (zzIndex != -1 && this.HotelFunctionData.pageLayout == 2) {
            this.$message.error("餐饮布局不支持电子商品!");
            return false;
          }
          //顶部功能区结构开放
          if (this.HotelFunctionData.isShowTop) {
            if (this.bannerList.length == 0) {
              this.$message.error("请上传banner图!");
              return false;
            }
            for (let i = 0; i < this.bannerList.length; i++) {
              for (let j = 0; j < this.bannerList[i].paramsLD.length; j++) {
                if (
                  this.bannerList[i].paramsData == null ||
                  this.bannerList[i].paramsData.length == 0
                ) {
                  if (
                    this.bannerList[i].paramsLD[j].isNecessary == 1 &&
                    (this.bannerList[i].paramsLD[j].value == "" ||
                      this.bannerList[i].paramsLD[j].value == undefined)
                  ) {
                    this.$message.error("请填写链接参数的必填参数!");
                    return false;
                  }
                }
              }
            }
            if (this.HotelFunctionData.isShowTitle) {
              if (this.HotelFunctionData.titlePosition == "") {
                this.$message.error("请选择标题位置!");
                return false;
              }
              if (this.HotelFunctionData.title == "") {
                this.$message.error("请输入标题!");
                return false;
              }
            } else {
              this.HotelFunctionData.titlePosition == "";
              this.HotelFunctionData.title == "";
            }
          } else {
          }
          //订房
          let bookFuncResourcesData = [];

          if (this.HotelFunctionData.funcType == 2) {
            if (this.HotelFunctionData.bookPageLayout == "") {
              this.$message.error("请选择页面布局!");
              return false;
            } else {
              this.HotelFunctionData.bookPageLayout = this.HotelFunctionData.bookPageLayout;
            }
            if (!this.HotelFunctionData.roomResourcesFlag) {
              if (this.HotelFunctionData.bookFuncResources.length == 0) {
                this.HotelFunctionData.bookFuncResources = [];
                this.$message.error("请选择可用房源!");
                return false;
              } else {
                this.bookFuncResourcesOptions.forEach((element) => {
                  this.HotelFunctionData.bookFuncResources.forEach((i) => {
                    if (element.id === i) {
                      bookFuncResourcesData.push(element);
                    }
                  });
                });
                // this.HotelFunctionData.bookFuncResources = bookFuncResourcesData;
              }
            }
          } else {
            this.HotelFunctionData.bookPageLayout = "";
            this.HotelFunctionData.roomResourcesFlag = false;
            this.HotelFunctionData.bookFuncResources = [];
          }
          //商城
          if (this.HotelFunctionData.funcType == 4) {
            if (this.HotelFunctionData.pageLayout == "") {
              this.$message.error("请选择页面布局!");
              return false;
            }
            if (this.HotelFunctionData.delivWays == "") {
              this.$message.error("请选择配送方式!");
              return false;
            }
          }
          //迷你吧便利店
          if (this.HotelFunctionData.funcType == 1) {
            if (this.HotelFunctionData.isSupportCab) {
              if (
                this.HotelFunctionData.empReplFee == ""
              ) {
                this.$message.error("请输入迷你吧补货费");
              } else {
                let money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if (!money.test(this.HotelFunctionData.empReplFee)) {
                  this.$message.error("金钱格式输入有误！");
                }
              }
            }
            if (this.HotelFunctionData.isSupportStore) {
              if (
                this.HotelFunctionData.storeDelivFee == ""
              ) {
                this.$message.error("请输入便利店补货费");
              } else {
                let money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if (!money.test(this.HotelFunctionData.storeDelivFee)) {
                  this.$message.error("金钱格式输入有误！");
                }
              }
            }
          }
          // if (bannerPath.length > 0) {
          //   bannerPath = bannerPath[0].imagePath;
          // }
          const params = {
            //新加
            bookPageLayout: Number(this.HotelFunctionData.bookPageLayout),
            roomResourcesFlag: this.switchFunc(
              this.HotelFunctionData.roomResourcesFlag
            ),
            bookFuncResources: bookFuncResourcesData,
            isShowTop: this.switchFunc(this.HotelFunctionData.isShowTop),
            isShowTitle: this.switchFunc(this.HotelFunctionData.isShowTitle),
            titlePosition: Number(this.HotelFunctionData.titlePosition),
            title: this.HotelFunctionData.title,
            servicePhone: this.HotelFunctionData.servicePhone,
            isShowWifi: this.switchFunc(this.HotelFunctionData.isShowWifi),
            isShowCulture: this.switchFunc(
              this.HotelFunctionData.isShowCulture
            ),
            // topBanners: bannerPath,
            isSupportCab: this.switchFunc(this.HotelFunctionData.isSupportCab),
            empReplFee: this.HotelFunctionData.empReplFee,
            isSupportStore: this.switchFunc(
              this.HotelFunctionData.isSupportStore
            ),
            storeDelivFee: this.HotelFunctionData.storeDelivFee,

            hotelId: this.HotelFunctionData.hotelId,
            funcCnName: this.HotelFunctionData.funcCnName,
            funcEnName: this.HotelFunctionData.funcEnName,
            funcLogoPath: this.funcLogoPath,
            funcType: this.HotelFunctionData.funcType,
            delivWays: this.HotelFunctionData.delivWays,
            lgcChooseWays: this.HotelFunctionData.lgcChooseWays,
            hotelLgcIds: this.HotelFunctionData.hotelLgcIds,
            isTimeLimited: this.switchFunc(
              this.HotelFunctionData.isTimeLimited
            ),
            openStartTime: this.HotelFunctionData.horizonTime[0],
            openEndTime: this.HotelFunctionData.horizonTime[1],
            isTimeLimitedDeliv: this.switchFunc(
              this.HotelFunctionData.isTimeLimitedDeliv
            ),
            delivLimitDuration: this.HotelFunctionData.delivLimitDuration,
            pickUpPointIds: this.HotelFunctionData.pickUpPointIds,
            // delivFee: parseFloat(this.HotelFunctionData.delivFee).toFixed(2),
            isSupportManyTimesOrder: this.switchFunc(
              this.HotelFunctionData.isSupportManyTimesOrder
            ),
            // isKitchenReceiptPrintedByProd: this.switchFunc(this.HotelFunctionData.isKitchenReceiptPrintedByProd),
            allocId: this.HotelFunctionData.allocId,
            funcCode: this.HotelFunctionData.funcCode,
            isShow: this.switchFunc(this.HotelFunctionData.isShow),
            pageLayout: this.HotelFunctionData.pageLayout,
            sort: this.HotelFunctionData.sort,
            funcBannerImages: bannerPath,
          };
          // console.log(params);
          // return false
          this.isSubmit = true;
          this.$api
            .hotelFunctionAdd(params)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("功能区新增成功！");
                this.$router.push({ name: "LonganHotelFunctionList" });
              } else {
                this.$message.error(result.msg);
                this.isSubmit = false;
              }
            })
            .catch((error) => {
              this.isSubmit = false;
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
    //取消
    resetForm() {
      this.$router.push({ name: "LonganHotelFunctionList" });
    },
    //图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (index == 1) {
        this.funcLogoPath = res.data;
      } else if (index == 2) {
        this.bannerList.push({
          name: file.name,
          url: file.url,
          path: res.data,
          link: "",
          id: "",
        });
      }
    },
    //移除图片
    handleRemove(file, fileList, index) {
      if (index == 1) {
        this.funcLogoPath = "";
      } else if (index == 2) {
        this.bannerList = fileList.map((item) => {
          return {
            name: item.name,
            url: item.url,
            path: item.path,
            link: "",
            id: "",
          };
        });
      }
    },
    //文件上传之前调用 做一些拦截限制
    beforeUpload(file, index) {
      if (index == 1 || index == 2) {
        const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传的图片只能是jpg、jpeg、png格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传商品图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    },
    //文件超出个数限制时
    handleExceed(file, fileList, index) {
      if (index == 1) {
        this.$message.error("图标只能上传1张！");
      } else if (index == 2) {
        this.$message.error("banner图不能超过5张！");
      }
      // console.log(file,fileList);
    },
    //图片上传失败
    imgUploadError(file, fileList, index) {
      this.$message.error("上传图片失败！");
      // console.log(file,fileList);
    },
    //transform 转换
    transformFunc(val) {
      if (val == 1) {
        return true;
      } else {
        return false;
      }
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
      color: #999;
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
