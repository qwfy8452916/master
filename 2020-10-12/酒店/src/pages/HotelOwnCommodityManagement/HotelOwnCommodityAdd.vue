<template>
    <div class="commodityadd">
        <p class="title">新增自营商品</p>
        <el-form
            :model="CommodityDataAdd"
            :rules="rules"
            ref="CommodityDataAdd"
            label-width="140px"
            class="commodityform"
        >
            <!-- <el-form-item prop="marketType">
                <span slot="label"><label class="required-icon">*</label> 市场分类</span>
                <el-input type="textarea" autosize :readonly="true" v-model="selectMarketData" placeholder="请选择" @focus="showMarketTree"></el-input>
                <div v-if="isShowTree" class="treestyle">
                    <el-button type="text" @click="hideMarketTree" class="closetree">关闭</el-button>
                    <el-tree 
                        :data = "typeDataDetail"
                        :props="defaultProps"
                        show-checkbox
                        :check-strictly = 'true'
                        :check-on-click-node = 'true'
                        :default-checked-keys="selectMarketIdList"
                        node-key = 'id'
                        ref="tree"
                        @check-change = "selectMarket"
                        default-expand-all
                        :expand-on-click-node = "false">
                    </el-tree>
            </div>-->

            <!-- <el-tree
                    :data = "typeDataDetail"
                    :props="defaultProps"
                    show-checkbox
                    :check-strictly = 'true'
                    :check-on-click-node = 'true'
                    node-key = 'id'
                    ref="tree"
                    default-expand-all
                    :expand-on-click-node = "false">
            </el-tree>-->
            <!-- <el-select v-model="CommodityDataAdd.marketType" placeholder="请选择" @change="categorySelect">
                    <el-option v-for="item in marketList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                </el-select>
                <el-tag 
                    v-for="tag in tagsList" 
                    :key="tag.id" 
                    closable
                    @close="tagClose(tag)">
                    {{tag.categoryName}}
            </el-tag>-->
            <!-- </el-form-item> -->
            <el-form-item label="商品" prop="prodName">
                <el-input v-model="CommodityDataAdd.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
                <el-input v-model="CommodityDataAdd.showName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品形式" prop="prodType">
                <el-select v-model="CommodityDataAdd.prodType" placeholder="请选择" @change="selectProdType">
                    <el-option label="实物" value="1"></el-option>
                    <el-option label="电子" value="2"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="商品形式" prop="prodType">
                <el-select
                    v-model="CommodityDataAdd.prodType"
                    @change="selectProdType"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in pTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDataAdd.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select v-model="CommodityDataAdd.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>-->

            <el-form-item v-if="CommodityDataAdd.prodType == 2">
                <span slot="label">
                    <label class="required-icon">*</label>电子券选择
                </span>
                <el-button type="primary" class="addbtn" size="small" @click="couponAddLine">添加</el-button>
            </el-form-item>
            <el-table
                v-if="CommodityDataAdd.prodType == 2"
                :data="CommodityDataAdd.EleCouponsData"
                style="margin: -20px 0px 0px 130px;"
            >
                <el-table-column label="类型" min-width="150px" align="center">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'EleCouponsData.'+scope.$index+'.couponType'"
                            :rules="rules.couponType"
                            class="marginstyle"
                        >
                            <el-select
                                v-model="scope.row.couponType"
                                @change="selectCouponT(scope.$index, scope.row.couponType)"
                                placeholder="请选择类型"
                            >
                                <el-option label="卡券" :value="1"></el-option>
                                <el-option label="优惠券" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="名称" min-width="240px" align="center">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'EleCouponsData.'+scope.$index+'.couponId'"
                            :rules="rules.couponId"
                            class="marginstyle"
                        >
                            <el-select v-model="scope.row.couponId" placeholder="请选择名称">
                                <el-option
                                    v-for="item in scope.row.couponList"
                                    :key="item.id"
                                    :label="item.couponName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="80px" align="center">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'EleCouponsData.'+scope.$index+'.couponCount'"
                            :rules="rules.couponCount"
                            class="marginstyle"
                        >
                            <el-input v-model.number="scope.row.couponCount" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="80px" align="center">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'EleCouponsData.'+scope.$index+'.couponSort'"
                            :rules="rules.couponSort"
                            class="marginstyle"
                        >
                            <el-input v-model.number="scope.row.couponSort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="60px" align="center">
                    <template slot-scope="scope">
                        <el-form-item class="marginstyle">
                            <el-button
                                type="text"
                                size="small"
                                @click="giftDeleteLine(scope.$index)"
                            >移除</el-button>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <el-form-item label="保质期" prop="qualityTime">
                <el-input class="inputtime" v-model.number="CommodityDataAdd.qualityTime"></el-input>
                <el-select class="selecttime" v-model="CommodityDataAdd.timeType">
                    <el-option label="天" value="天"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input v-model="CommodityDataAdd.prodUnitMeasure"></el-input>
            </el-form-item>
            <!-- <el-form-item label="供应商名称" prop="supplierName">
                <el-input  v-model="CommodityDataAdd.supplierName"></el-input>
            </el-form-item>-->
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input v-model.trim="CommodityDataAdd.prodSupplyPrice" maxlength="10"></el-input>元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input v-model.trim="CommodityDataAdd.prodRetailPrice" maxlength="10"></el-input>元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input v-model.trim="CommodityDataAdd.prodMarketPrice" maxlength="10"></el-input>元
            </el-form-item>
            <el-form-item label="配送方式" prop="delivWays">
                <!-- <el-checkbox-group v-model="CommodityDataAdd.delivWays" @change="selectDelivType">
                    <el-checkbox label="0">现场送</el-checkbox>
                    <el-checkbox label="1">快递送</el-checkbox>
                </el-checkbox-group>-->
                <el-select
                    v-model="CommodityDataAdd.delivWays"
                    multiple
                    placeholder="请选择"
                    @change="selectDelivType"
                >
                    <el-option
                        v-for="item in delivWayList"
                        :key="item.id"
                        :label="item.delivWayName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isInvShow" prop="isNeedInv">
                <span slot="label">
                    <label class="required-icon">*</label>酒店库存
                </span>
                <!-- <el-radio-group v-model="CommodityDataAdd.isNeedInv" @change="selectIsInv">
                    <el-radio :label="1">需要</el-radio>
                    <el-radio :label="0">不需要</el-radio>
                </el-radio-group>-->
                <el-switch
                    v-model="CommodityDataAdd.isNeedInv"
                    :disabled="CommodityDataAdd.delivWays.indexOf('3')!=-1"
                    @change="selectIsInv"
                ></el-switch>
            </el-form-item>
            <el-form-item v-if="isInvShow && isSafeInv" prop="prodSafeCount">
                <span slot="label">
                    <label class="required-icon">*</label>安全库存
                </span>
                <el-input v-model.number="CommodityDataAdd.prodSafeCount"></el-input>
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input v-model.number="CommodityDataAdd.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item v-if="isFreeShip" prop="isFreeShipping">
                <span slot="label">
                    <label class="required-icon">*</label>快递费包邮
                </span>
                <!-- <el-radio-group v-model="CommodityDataAdd.isFreeShipping">
                    <el-radio :label="1">包邮</el-radio>
                    <el-radio :label="0">不包邮</el-radio>
                </el-radio-group>-->
                <el-switch v-model="CommodityDataAdd.isFreeShipping"></el-switch>
                <span v-if="!CommodityDataAdd.isFreeShipping">&nbsp;&nbsp;
                    <el-select
                        v-model="CommodityDataAdd.expressFeeId"
                        placeholder="请选择快递费模板"
                        style="width:48%;"
                    >
                        <el-option
                            v-for="item in expressFeeList"
                            :key="item.id"
                            :label="item.exFeeName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </span>
            </el-form-item>
            <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
                <el-select v-model="CommodityDataAdd.pickUpPointIds" multiple placeholder="请选择">
                    <el-option
                        v-for="item in pickUpPointList"
                        :key="item.id"
                        :label="item.pickUpPointName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div class="functionadd">
                <span class="funspan">
                    <label class="required-icon">*</label>功能区选择
                </span>
                <el-button type="primary" class="addbtn" size="small" @click="functionAddLine">添加</el-button>
                <span class="hint">提示：功能区不可重复选择</span>
                <el-table :data="CommodityDataAdd.functionData" :show-header="false">
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-form-item
                                :prop="'functionData.'+scope.$index+'.funcId'"
                                :rules="rules.funcId"
                            >
                                <el-select
                                    v-model="scope.row.funcId"
                                    @change="selectFunction(scope.$index, scope.row.funcId)"
                                    placeholder="请选择商品功能区"
                                    style="width:76%;"
                                >
                                    <el-option
                                        v-for="item in functionList"
                                        :key="item.funcId"
                                        :label="item.funcCnName"
                                        :value="item.funcId"
                                    ></el-option>
                                </el-select>&nbsp;&nbsp;&nbsp;
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="functionDeleteLine(scope.$index)"
                                >删除</el-button>
                            </el-form-item>
                            <el-form-item
                                :prop="'functionData.'+scope.$index+'.classifyIds'"
                                :rules="rules.classifyIds"
                            >
                                <el-select
                                    v-model="scope.row.classifyIds"
                                    @change="selectClassify(scope.$index, scope.row.funcId, scope.row.classifyIds)"
                                    multiple
                                    placeholder="请选择功能区分类"
                                >
                                    <el-option
                                        v-for="item in scope.row.classifyList"
                                        :key="item.categoryId"
                                        :label="item.categoryName"
                                        :value="item.categoryId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <el-form-item label="统计分类" prop="categoryId">
                <el-select v-model="CommodityDataAdd.categoryId" placeholder="请选择">
                    <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="分成协议名称" prop="agreementName">
                <el-select v-model="CommodityDataAdd.agreementName" placeholder="请选择">
                    <el-option 
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.agreementName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="本地特产" prop="isNativeProd">
                <el-switch v-model="isNativeProd"></el-switch>
            </el-form-item>-->
            <el-form-item>
                <span slot="label">
                    <label class="required-icon">*</label>列表图
                </span>
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
                    <label
                        slot="tip"
                        class="el-upload__tip"
                    >&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label">
                    <label class="required-icon">*</label>详情banner
                </span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label
                        slot="tip"
                        class="el-upload__tip"
                    >&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="商品描述" prop="">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 3)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式</label>
                </el-upload>
            </el-form-item>-->
            <uploadpic :isDisabled="isDisabled" :descList="descList" @descListevent="descListevent"></uploadpic>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button
                    v-if="authzlist['F:BH_PROD_HOTELPRODADDSUBMIT']"
                    type="primary"
                    :disabled="isSubmit"
                    @click="submitForm('CommodityDataAdd')"
                >确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic";
export default {
  name: "HotelOwnCommodityAdd",
  components: {
    uploadpic
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
    var validatePriceReq = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!priceReg.test(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    var countReg = /^(0|\+?[1-9][0-9]*)$/;
    var validateCount = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!countReg.test(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    const typeDataDetail = [];
    return {
      authzlist: {}, //权限数据
      isShowTree: false,
      selectMarketData: "",
      selectMarketIdList: [],
      typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
      defaultProps: {
        children: "childrenList",
        label: "categoryName"
      },
      hotelId: "",
      hotelIsSupportTakeOutOrder: "", //酒店是否支持外卖
      orgId: "",
      marketList: [],
      tagsList: [],
      categoryList: [],
      isInvShow: false,
      isSafeInv: true,
      isFreeShip: false,
      isPickUp: false,
      uploadUrl: this.$api.upload_file_url,
      headers: {},
      imgList: "",
      bannerList: [],
      isDisabled: false,
      descList: [],
      expressFeeList: [],
      // protocolList: [],
      couponList: [],
      delivWayList: [],
      pickUpPointList: [],
      functionList: [],
      yCouponList: [], //优惠券列表
      cCouponList: [], //卡券列表
      CommodityDataAdd: {
        prodName: "",
        prodType: "",
        vouBatchId: "",
        timeType: "天",
        delivWays: [],
        isNeedInv: false,
        prodSafeCount: 0,
        isFreeShipping: true,
        expressFeeId: "",
        prodSupplyPrice: "",
        prodRetailPrice: "",
        prodMarketPrice: "",
        categoryId: "0",
        availableSaleQty: -999,
        pickUpPointIds: [],
        functionData: [
          {
            funcId: "",
            classifyList: [],
            classifyIds: []
          }
        ],
        //电子券选择
        EleCouponsData: [
          {
            couponType: "",
            couponList: [],
            couponId: "",
            couponCount: 1,
            couponSort: 0
          }
        ]
      },
      isNativeProd: false,
      isSubmit: false,
      pTypeList: [], //商品形式列表
      rules: {
        prodName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "商品名称请保持在50个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        showName: [
          { required: true, message: "请输入显示名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "显示名称请保持在50个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        prodType: [
          { required: true, message: "请选择商品形式", trigger: "change" }
        ],
        // vouBatchId: [
        //     {required: true, message: '请选择卡券', trigger: 'change'}
        // ],
        qualityTime: [
          { required: true, message: "请输入保质期", trigger: "blur" },
          {
            min: 1,
            max: 9999999999,
            type: "number",
            message: "格式有误",
            trigger: ["blur", "change"]
          }
        ],
        prodUnitMeasure: [
          { required: true, message: "请输入单位", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "单位请保持在10个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        // supplierName: [
        //     {required: true, message: '请输入供应商名称', trigger: 'blur'},
        //     {min: 1, max: 50, message: '供应商名称请保持在50个字符以内', trigger: ['blur','change']}
        // ],
        // isNeedInv: [
        //     {required: true, message: '请选择是否需要库存', trigger: 'change'},
        // ],
        prodSupplyPrice: [
          {
            required: true,
            validator: validatePrice,
            trigger: ["blur", "change"]
          }
        ],
        prodRetailPrice: [
          {
            required: true,
            validator: validatePrice,
            trigger: ["blur", "change"]
          }
        ],
        prodMarketPrice: [
          { validator: validatePriceReq, trigger: ["blur", "change"] }
        ],
        prodSafeCount: [
          // {required: true, message: '请输入安全库存', trigger: 'blur'},
          // {min: 0, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
          { validator: validateCount, trigger: ["blur", "change"] }
        ],
        // delivWays: [
        //     {type: 'array', required: true, message: '请选择配送方式', trigger: 'change'},
        // ],
        delivWays: [
          { required: true, message: "请选择配送方式", trigger: "change" }
        ],
        availableSaleQty: [
          { required: true, message: "请输入可售数量", trigger: "blur" },
          {
            min: -999,
            max: 9999999999,
            type: "number",
            message: "格式有误",
            trigger: ["blur", "change"]
          }
        ],
        funcId: [
          { required: true, message: "请选择功能区", trigger: "change" }
        ],
        // classifyIds: [
        //     {required: true, message: '请选择功能区分类', trigger: 'change'},
        // ],
        //电子券选择
        couponType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        couponId: [
          { required: true, message: "请选择名称", trigger: "change" }
        ],
        couponCount: [
          { required: true, message: "请输入数量", trigger: "blur" },
          {
            min: 1,
            max: 999999999,
            type: "number",
            message: "格式有误",
            trigger: ["blur", "change"]
          }
        ],
        couponSort: [
          { required: true, message: "请输入排序", trigger: "blur" },
          {
            min: -999999999,
            max: 999999999,
            type: "number",
            message: "格式有误",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    this.$control
      .jurisdiction(this, 3)
      .then(response => {
        this.authzlist = response;
      })
      .catch(err => {
        this.datalist = err;
      }); //获取权限数据
    const token = localStorage.getItem("Authorization");
    this.headers = { Authorization: token };
    this.hotelId = localStorage.getItem("hotelId");
    this.hotelIsSupportTakeOutOrder = localStorage.getItem(
      "hotelIsSupportTakeOutOrder"
    );
    // this.getMarketList();
    // this.getHotelMarketDetail();
    this.getCategoryList();
    this.getExpFeeList();
    // this.getprotocolList();
    // this.getFunctionList();
    this.getHotelCouponList();
    this.getProdCouponList();
    this.basicDataItems_PT();
    this.basicDataItems();
    this.getHotelPickUpPointList();
  },
  methods: {
    //商品描述图
    descListevent(e) {
      this.descList = e.fileList;
    },
    //获取商品形式 - 字典表
    basicDataItems_PT() {
      const params = {
        key: "PROD_TYPE",
        orgId: "0",
        parentKey: "",
        parentValue: ""
      };
      this.$api
        .basicDataItems(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.pTypeList = result.data.map(item => {
              return {
                id: parseInt(item.dictValue),
                name: item.dictName
              };
            });
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
    //选择商品形式
    selectProdType(val) {
      if (val == "3") {
        this.$message.warning("平台商品不支持菜品！");
        this.CommodityDataAdd.prodType = "";
      }
    },
    //添加
    couponAddLine() {
      let newLine = {
        couponType: "",
        couponId: "",
        couponCount: 1,
        couponSort: 0
      };
      this.CommodityDataAdd.EleCouponsData.push(newLine);
    },
    //移除
    giftDeleteLine(index) {
      this.CommodityDataAdd.EleCouponsData.splice(index, 1);
    },
    //选择礼包类型 1：卡券 2：优惠券
    selectCouponT(index, cType) {
      if (cType == 1) {
        this.CommodityDataAdd.EleCouponsData[
          index
        ].couponList = this.cCouponList;
      } else if (cType == 2) {
        this.CommodityDataAdd.EleCouponsData[
          index
        ].couponList = this.yCouponList;
      }
    },
    //优惠券列表
    getProdCouponList() {
      const that = this;
      let params = {};
      this.$api
        .getProdCouponList(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.yCouponList = result.data.map(item => {
              return {
                id: item.id,
                couponName: item.couponBatchName
              };
            });
            this.CommodityDataAdd.EleCouponsData = this.CommodityDataAdd.EleCouponsData.map(
              item => {
                let couponList;
                if (item.couponType == 1) {
                  couponList = that.cCouponList;
                } else {
                  couponList = that.yCouponList;
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
    //获取卡券列表
    getHotelCouponList() {
      const that = this;
      const params = {};
      // console.log(params);
      this.$api
        .getHotelCouponList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.cCouponList = result.data.map(item => {
                return {
                  id: item.id,
                  couponName: item.vouName
                };
              });
              this.CommodityDataAdd.EleCouponsData = this.CommodityDataAdd.EleCouponsData.map(
                item => {
                  let couponList;
                  if (item.couponType == 1) {
                    couponList = that.cCouponList;
                  } else {
                    couponList = that.yCouponList;
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
            }
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
    //获取配送方式 - 字典表
    basicDataItems() {
      const params = {
        key: "DEVI",
        orgId: "0",
        parentKey: "",
        parentValue: ""
      };
      this.$api
        .basicDataItems(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.delivWayList = result.data.map(item => {
                return {
                  id: item.dictValue,
                  delivWayName: item.dictName
                };
              });
            }
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
    //获取酒店自提点列表
    getHotelPickUpPointList() {
      const params = {
        hotelId: this.hotelId
      };
      // console.log(params);
      this.$api
        .getHotelPickUpPointList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.pickUpPointList = result.data.map(item => {
                return {
                  id: item.id,
                  pickUpPointName: item.pointName
                };
              });
            }
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
    showMarketTree() {
      this.isShowTree = true;
    },
    hideMarketTree() {
      this.isShowTree = false;
    },
    selectMarket() {
      let treeNodes = this.$refs.tree.getCheckedNodes();
      let treeKeys = this.$refs.tree.getCheckedKeys();
      this.selectMarketIdList = treeKeys;
      let treeNameArr = "";
      for (let i = 0; i < treeNodes.length; i++) {
        treeNameArr += treeNodes[i].categoryName + "、";
      }
      this.selectMarketData = treeNameArr;
    },
    //获取市场分类 - 树
    getHotelMarketDetail() {
      const params = {
        hotelId: this.hotelId
      };
      this.$api
        .getHotelMarketDetail(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.typeDataDetail = result.data;
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
    //获取市场分类列表
    getMarketList() {
      const params = {
        // encryptedOrgId: this.orgId,
        // orgAs: 3
        hotelId: this.hotelId
      };
      // console.log(params);
      this.$api
        .hotelCommodityMarketListM(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.marketList = result.data.map(item => {
              return {
                id: item.id,
                categoryName: item.categoryName
              };
            });
          } else {
            this.$message.error("市场分类获取失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //添加市场分类
    categorySelect(value) {
      const category = this.marketList.find(item => item.id === value);
      // console.log(category);
      this.tagsList.push(category);
      // console.log(this.tagsList);
      this.marketList.splice(this.marketList.indexOf(category), 1);
      // console.log(this.marketList);
      this.CommodityDataAdd.marketType = "";
    },
    //取消添加的市场分类
    tagClose(tag) {
      // console.log(tag);
      this.tagsList.splice(this.tagsList.indexOf(tag), 1);
      this.marketList.push(tag);
      // console.log(this.marketList);
    },
    //获取统计分类列表
    getCategoryList() {
      const params = {
        // entryOprOrgId: result.data.encryptedOprOrgId
        orgAs: 3
      };
      // console.log(params);
      this.$api
        .commodityStatisticsList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.categoryList = result.data;
            let categoryNo = {
              id: "",
              categoryName: "暂不选择"
            };
            this.categoryList.push(categoryNo);
          } else {
            this.$message.error("商品统计分类获取失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取快递费模板列表
    getExpFeeList() {
      this.$api
        .getExpressFee()
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.expressFeeList = result.data.map(item => {
                return {
                  id: item.id,
                  exFeeName: item.modelName
                };
              });
            }
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
    //选择商品形式
    selectProdType(value) {
      this.CommodityDataAdd.delivWays = [];
      this.isInvShow = false;
      this.isFreeShip = false;
      this.isPickUp = false;
      this.functionList = [];
    },
    //选择配送方式
    selectDelivType(value) {
      if (this.CommodityDataAdd.prodType == "") {
        this.$message.error("请选择商品形式!");
        this.CommodityDataAdd.delivWays = [];
        return false;
      }
      if (this.CommodityDataAdd.prodType == 2) {
        this.CommodityDataAdd.delivWays = ["5"];
        this.getFunctionList();
      } else {
        if (value.length != 0) {
          //店内送
          let dnsIndex = this.CommodityDataAdd.delivWays.indexOf("1");
          //快递送
          let kdIndex = this.CommodityDataAdd.delivWays.indexOf("2");
          //迷你吧
          let mnbIndex = this.CommodityDataAdd.delivWays.indexOf("3");
          //自提区
          let ztIndex = this.CommodityDataAdd.delivWays.indexOf("4");
          //电子商品
          let zzIndex = this.CommodityDataAdd.delivWays.indexOf("5");
          //堂食
          let tsIndex = this.CommodityDataAdd.delivWays.indexOf("6");
          //外卖
          let wmIndex = this.CommodityDataAdd.delivWays.indexOf("7");
          //外带
          let wdIndex = this.CommodityDataAdd.delivWays.indexOf("8");
          if (this.CommodityDataAdd.prodType == 1) {
            if (zzIndex != -1) {
              this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
              this.CommodityDataAdd.delivWays.splice(zzIndex, 1);
            } else if (tsIndex != -1) {
              this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
              this.CommodityDataAdd.delivWays.splice(tsIndex, 1);
            } else if (wmIndex != -1) {
              this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
              this.CommodityDataAdd.delivWays.splice(wmIndex, 1);
            } else if (wdIndex != -1) {
              this.$message.warning("实物-商品不支持电子商品/堂食/外卖/外带！");
              this.CommodityDataAdd.delivWays.splice(wdIndex, 1);
            } else {
              //店内送
              if (dnsIndex == -1 && mnbIndex == -1) {
                this.isInvShow = false;
                this.CommodityDataAdd.isNeedInv = false;
              } else {
                this.isInvShow = true;
                this.CommodityDataAdd.isNeedInv = true;
              }
              //快递送
              if (kdIndex != -1) {
                this.isFreeShip = true;
              } else {
                this.isFreeShip = false;
              }
              //自提区
              if (ztIndex != -1) {
                this.isPickUp = true;
              } else {
                this.isPickUp = false;
              }
            }
          } else if (this.CommodityDataAdd.prodType == 3) {
            if (dnsIndex != -1) {
              this.$message.warning(
                "菜品-商品不支持店内送/快递送/迷你吧/自提取/电子商品！"
              );
              this.CommodityDataAdd.delivWays.splice(dnsIndex, 1);
            } else if (kdIndex != -1) {
              this.$message.warning(
                "菜品-商品不支持店内送/快递送/迷你吧/自提取/电子商品！"
              );
              this.CommodityDataAdd.delivWays.splice(kdIndex, 1);
            } else if (mnbIndex != -1) {
              this.$message.warning(
                "菜品-商品不支持店内送/快递送/迷你吧/自提取/电子商品！"
              );
              this.CommodityDataAdd.delivWays.splice(mnbIndex, 1);
            } else if (ztIndex != -1) {
              this.$message.warning(
                "菜品-商品不支持店内送/快递送/迷你吧/自提取/电子商品！"
              );
              this.CommodityDataAdd.delivWays.splice(ztIndex, 1);
            } else if (zzIndex != -1) {
              this.$message.warning(
                "菜品-商品不支持店内送/快递送/迷你吧/自提取/电子商品！"
              );
              this.CommodityDataAdd.delivWays.splice(zzIndex, 1);
            } else {
              //外卖
              if (wmIndex != -1) {
                if (this.hotelIsSupportTakeOutOrder == 0) {
                  this.$message.error("此酒店不支持外卖");
                  this.CommodityDataAdd.delivWays.splice(wmIndex, 1);
                }
              }
            }
          }
          this.getFunctionList();
        } else {
          this.isInvShow = false;
          this.isFreeShip = false;
          this.isPickUp = false;
          this.functionList = [];
        }
      }
      // if(value.length == 0){
      //     this.isInvShow = false;
      //     this.isFreeShip = false;
      //     this.functionList = [];
      // }else if(value.length == 1){
      //     if(value[0] == 0){
      //         this.isInvShow = true;
      //         this.isFreeShip = false;
      //         // this.CommodityDataAdd.isFreeShipping = '';
      //     }else{
      //         this.isInvShow = false;
      //         this.isFreeShip = true;
      //     }
      //     this.getFunctionList();
      // }else if(value.length == 2){
      //     this.isInvShow = true;
      //     this.isFreeShip = true;
      //     this.getFunctionList();
      // }
    },
    //选择是否需要库存
    selectIsInv(value) {
      if (value) {
        this.isSafeInv = true;
      } else {
        this.isSafeInv = false;
        // this.CommodityDataAdd.prodSafeCount = 0;
      }
    },
    //获取酒店商品下未被选用的功能区列表
    getFunctionList() {
      const that = this;
      const params = {
        hotelId: this.hotelId,
        delivWays: this.CommodityDataAdd.delivWays.toString(),
        pointIds: this.CommodityDataAdd.pickUpPointIds.toString()
      };
      this.$api
        .hotelProdUnsedFunctionList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              that.functionList = result.data.map(item => {
                return {
                  funcId: item.id,
                  funcCnName: item.funcCnName
                };
              });
            }
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
    //选择功能区
    selectFunction(index, funcId) {
      this.CommodityDataAdd.functionData[index].classifyList = [];
      this.CommodityDataAdd.functionData[index].classifyIds = [];
      this.getClassifyList(index, funcId);
    },
    //获取功能区市场分类
    getClassifyList(index, funcId) {
      const that = this;
      let funcIndex = index;
      const params = {
        hotelId: this.hotelId,
        funcId: funcId
      };
      this.$api
        .hotelProdUnsedFunctionCategory(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              that.CommodityDataAdd.functionData[
                funcIndex
              ].classifyList = result.data.map(item => {
                return {
                  categoryId: item.id,
                  categoryName: item.categoryName
                };
              });
            }
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
    //选择功能区市场分类
    selectClassify(index, funcId, classifyIds) {
      const that = this;
      let funcIndex = index;
      const params = {
        hotelId: this.hotelId,
        funcId: funcId,
        categoryIds: classifyIds.toString()
      };
      this.$api
        .hotelProdUnsedVerifyAlloc(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code != "0") {
            this.$message.error(result.msg);
            let cIds =
              that.CommodityDataAdd.functionData[funcIndex].classifyIds;
            that.CommodityDataAdd.functionData[funcIndex].classifyIds.splice(
              cIds.length - 1,
              1
            );
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //新增行
    functionAddLine() {
      for (let i = 0; i < this.CommodityDataAdd.functionData.length; i++) {
        if (this.CommodityDataAdd.functionData[i].funcId == "") {
          this.$message.error("请选择功能区");
          return false;
        }
      }
      let newLine = {
        funcId: "",
        classifyList: [],
        classifyIds: []
      };
      this.CommodityDataAdd.functionData.push(newLine);
    },
    //删除行
    functionDeleteLine(index) {
      this.CommodityDataAdd.functionData.splice(index, 1);
    },
    //switch转换
    switchFunc(val) {
      if (val) {
        return 1;
      } else {
        return 0;
      }
    },
    //确定 - 添加
    submitForm(CommodityDataAdd) {
      let descPath = this.descList.map(item => {
        return {
          imagePath: item.path,
          sort: item.sort
        };
      });
      // const marketIdList = this.tagsList.map(item => {
      //    return item.id
      // });
      // let marketIdList = this.$refs.tree.getCheckedKeys();
      let marketIdList = this.selectMarketIdList;
      let isNative, pMarketPrice;
      if (this.isNativeProd) {
        isNative = 1;
      } else {
        isNative = 0;
      }
      if (this.CommodityDataAdd.prodMarketPrice == "") {
        pMarketPrice = "";
      } else {
        pMarketPrice = parseFloat(
          this.CommodityDataAdd.prodMarketPrice
        ).toFixed(2);
      }
      let elecBatchList = this.CommodityDataAdd.EleCouponsData.map(item => {
        return {
          batchType: item.couponType,
          batchId: item.couponId,
          count: item.couponCount,
          sort: item.couponSort
        };
      });
      // console.log(params);
      this.$refs[CommodityDataAdd].validate(valid => {
        if (valid) {
          // if(this.CommodityDataAdd.prodType == 2){
          //     if(this.CommodityDataAdd.vouBatchId == ''){
          //         this.$message.error('请选择卡券!');
          //         return false
          //     }
          // }
          //店内送、迷你吧
          let dnsIndex = this.CommodityDataAdd.delivWays.indexOf("1");
          let mnbIndex = this.CommodityDataAdd.delivWays.indexOf("3");
          if (dnsIndex != -1 || mnbIndex != -1) {
            if (this.CommodityDataAdd.isNeedInv) {
              if (this.CommodityDataAdd.prodSafeCount == "") {
                this.$message.error("请输入安全库存!");
                return false;
              }
            }
          }
          //快递送
          let kdIndex = this.CommodityDataAdd.delivWays.indexOf("2");
          if (kdIndex != -1) {
            if (!this.CommodityDataAdd.isFreeShipping) {
              if (this.CommodityDataAdd.expressFeeId == "") {
                this.$message.error("请选择快递费模板!");
                return false;
              }
            }
          }
          /*if(this.CommodityDataAdd.delivWays.length == 1){
                        if(this.CommodityDataAdd.delivWays[0] == 0){
                            if(this.CommodityDataAdd.isNeedInv){
                                if(this.CommodityDataAdd.prodSafeCount == ''){
                                    this.$message.error('请输入安全库存!');
                                    return false
                                }
                            }
                        }
                        if(this.CommodityDataAdd.delivWays[0] == 1){
                            if(this.CommodityDataAdd.isFreeShipping === ''){
                                this.$message.error('请选择快递费!');
                                return false
                            }else{
                                if(this.CommodityDataAdd.isFreeShipping == 0){
                                    if(this.CommodityDataAdd.expressFeeId == ''){
                                        this.$message.error('请选择快递费模板!');
                                            return false
                                    }
                                }
                            }
                        }
                    }
                    if(this.CommodityDataAdd.delivWays.length == 2){
                        if(this.CommodityDataAdd.isNeedInv){
                            if(this.CommodityDataAdd.prodSafeCount == ''){
                                this.$message.error('请输入安全库存!');
                                return false
                            }
                        }
                        if(this.CommodityDataAdd.isFreeShipping === ''){
                            this.$message.error('请选择快递费!');
                            return false
                        }else{
                            if(this.CommodityDataAdd.isFreeShipping == 0){
                                if(this.CommodityDataAdd.expressFeeId == ''){
                                    this.$message.error('请选择快递费模板!');
                                        return false
                                }
                            }
                        }
                    }*/
          //判断功能区不可重复
          let funcIds = [];
          for (let i = 0; i < this.CommodityDataAdd.functionData.length; i++) {
            funcIds.push(this.CommodityDataAdd.functionData[i].funcId);
          }
          let funcIdsSort = funcIds.sort();
          for (let j = 0; j < funcIds.length; j++) {
            if (funcIdsSort[j] == funcIdsSort[j + 1]) {
              this.$message.error("功能区不可重复选择!");
              return false;
            }
          }
          let funcDataList = this.CommodityDataAdd.functionData.map(item => {
            return {
              funcId: item.funcId,
              marketCategoryIds: item.classifyIds
            };
          });
          // if(marketIdList.length == 0){
          //     this.$message.error('请选择市场分类！');
          //     return
          // }
          if (this.imgList == "") {
            this.$message.error("请上传列表图!");
            return false;
          }
          if (this.bannerList == "") {
            this.$message.error("请上传详情banner!");
            return false;
          }
          const productInfo = {
            prodName: this.CommodityDataAdd.prodName,
            prodShowName: this.CommodityDataAdd.showName,
            prodType: this.CommodityDataAdd.prodType,
            elecBatchList: elecBatchList,
            // vouBatchId: this.CommodityDataAdd.vouBatchId,
            prodWarrantyPeriod:
              this.CommodityDataAdd.qualityTime +
              this.CommodityDataAdd.timeType,
            prodUnitMeasure: this.CommodityDataAdd.prodUnitMeasure,
            prodSupplyPrice: parseFloat(
              this.CommodityDataAdd.prodSupplyPrice
            ).toFixed(2),
            prodRetailPrice: parseFloat(
              this.CommodityDataAdd.prodRetailPrice
            ).toFixed(2),
            prodMarketPrice: pMarketPrice,
            delivWays: this.CommodityDataAdd.delivWays,
            isNeedInv: this.switchFunc(this.CommodityDataAdd.isNeedInv),
            prodSafeCount: this.CommodityDataAdd.prodSafeCount,
            availableSaleQty: this.CommodityDataAdd.availableSaleQty,
            isFreeShipping: this.switchFunc(
              this.CommodityDataAdd.isFreeShipping
            ),
            expressFeeId: this.CommodityDataAdd.expressFeeId,
            pickUpPointIds: this.CommodityDataAdd.pickUpPointIds,
            prodLogoPath: this.imgList,
            bannerImages: this.bannerList,
            // prodSupplName: this.CommodityDataAdd.supplierName,
            statisticsCategoryId: this.CommodityDataAdd.categoryId,
            descImageList: descPath
          };
          const params = {
            prodOwnerOrgKind: 3,
            hotelId: this.hotelId,
            // marketCategoryList: marketIdList,
            prodProductDTO: productInfo,
            prodShowName: this.CommodityDataAdd.showName,
            prodType: this.CommodityDataAdd.prodType,
            elecBatchList: elecBatchList,
            // vouBatchId: this.CommodityDataAdd.vouBatchId,
            prodSupplyPrice: parseFloat(
              this.CommodityDataAdd.prodSupplyPrice
            ).toFixed(2),
            prodRetailPrice: parseFloat(
              this.CommodityDataAdd.prodRetailPrice
            ).toFixed(2),
            prodMarketPrice: pMarketPrice,
            delivWays: this.CommodityDataAdd.delivWays,
            isNeedInv: this.switchFunc(this.CommodityDataAdd.isNeedInv),
            prodSafeCount: this.CommodityDataAdd.prodSafeCount,
            availableSaleQty: this.CommodityDataAdd.availableSaleQty,
            isFreeShipping: this.switchFunc(
              this.CommodityDataAdd.isFreeShipping
            ),
            expressFeeId: this.CommodityDataAdd.expressFeeId,
            pickUpPointIds: this.CommodityDataAdd.pickUpPointIds,
            // agreementId: this.CommodityDataAdd.agreementName,
            isLocalSpecialty: isNative,
            funcParams: funcDataList,
            prodLogoPath: this.imgList,
            bannerImages: this.bannerList,
            descImageList: descPath
          };
          // console.log(params);
          this.isSubmit = true;
          this.$api
            .ownCommodityAdd(params)
            .then(response => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("自营商品新增成功！");
                this.$router.push({ name: "HotelOwnCommodityList" });
              } else {
                this.$message.error(result.msg);
                this.isSubmit = false;
              }
            })
            .catch(error => {
              this.isSubmit = false;
              this.$alert(error, "警告", {
                confirmButtonText: "确定"
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
      this.$router.push({ name: "HotelOwnCommodityList" });
    },
    //图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (index == 1) {
        this.imgList = res.data;
      } else if (index == 2) {
        this.bannerList.push(res.data);
      } else if (index == 3) {
        this.descList.push(res.data);
      }
    },
    //移除图片
    handleRemove(file, fileList, index) {
      if (index == 1) {
        this.imgList = "";
      } else if (index == 2) {
        this.bannerList = fileList.map(item => {
          return item.response.data;
        });
      } else if (index == 3) {
        this.descList = fileList.map(item => {
          return item.response.data;
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
      } else if (index == 3) {
        const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
        if (!isJPG) {
          this.$message.error("上传的图片只能是jpg、jpeg、png格式!");
        }
        return isJPG;
      }
    },
    //文件超出个数限制时
    handleExceed(file, fileList, index) {
      if (index == 1) {
        this.$message.error("商品列表图只能上传1张！");
      } else if (index == 2) {
        this.$message.error("商品详情banner图不能超过5张！");
      }
      // console.log(file,fileList);
    },
    //图片上传失败
    imgUploadError(file, fileList, index) {
      this.$message.error("上传图片失败！");
      // console.log(file,fileList);
    }
  }
};
</script>

<style>
.el-checkbox:last-of-type {
  margin-right: 6px;
}
</style>

<style scoped>
.el-input {
  width: 92%;
}
.el-select {
  width: 92%;
}
.commodityadd >>> .el-table::before {
  height: 0px;
}
.commodityadd >>> .el-table td {
  border-bottom: 0px;
  padding: 0px 0px;
}
.commodityadd >>> .el-table .cell {
  padding-left: 0px;
}
</style>

<style lang="less" scoped>
.commodityadd {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .commodityform {
    width: 42%;
    .treestyle {
      background: #fff;
      border: 1px solid #444;
      position: absolute;
      z-index: 10;
      width: 100%;
      padding: 5px 0px;
      border: 1px solid transparent;
      border-color: rgba(68, 68, 68, 0.1);
      box-shadow: 0px 0px 1px rgba(68, 68, 68, 0.1);
      margin-top: 10px;
      .closetree {
        position: absolute;
        right: 10px;
        top: 0px;
        z-index: 10;
      }
    }
    .inputtime {
      width: 40%;
    }
    .selecttime {
      width: 30%;
    }
    .addbtn {
      margin-bottom: 10px;
      background: #ffa522;
      border: #dda522;
      color: #fff;
      display: inline-block;
    }
    .required-icon {
      color: #ff3030;
    }
    .marginstyle {
      margin-left: -140px;
    }
    .functionadd {
      .funspan {
        display: inline-block;
        width: 128px;
        font-size: 14px;
        color: #666;
        text-align: right;
        padding-right: 12px;
      }
      .hint {
        font-size: 12px;
        color: #bbb;
      }
    }
  }
}
</style>
