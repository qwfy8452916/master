<template>
  <div class="actdetailmanage">
    <p class="title">活动明细</p>
    <div class="detail">
      <p style="color:#ccc;">活动信息</p>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动名称：</span
        ><span class="content">{{ ActDetailDataManage.actName }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动类型：</span><span class="content">{{ actTypeName }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>活动时间：</span
        ><span class="content">{{ ActDetailDataManage.actTime }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>参与次数：</span
        ><span class="content">{{ ActDetailDataManage.actInNum }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>级别：</span
        ><span class="content">{{ ActDetailDataManage.actLevel }}</span>
      </div>
      <el-divider></el-divider>
      <div class="parts">
        <span>酒店名称：</span
        ><span class="content">{{ ActDetailDataManage.hotelName }}</span>
      </div>
      <el-divider></el-divider>
    </div>
    <!-- <el-form :model="ActDetailDataManage" ref="ActDetailDataManage" label-width="120px" class="actdetailform">
            <el-form-item label="活动名称">{{ActDetailDataManage.actName}}</el-form-item>
            <el-form-item label="活动类型">{{actTypeName}}</el-form-item>
            <el-form-item label="活动时间">{{ActDetailDataManage.actTime}}</el-form-item>
            <el-form-item label="参与次数">{{ActDetailDataManage.actInNum}}</el-form-item>
            <el-form-item label="级别">{{ActDetailDataManage.actLevel}}</el-form-item>
            <el-form-item label="酒店名称">{{ActDetailDataManage.hotelName}}</el-form-item>
        </el-form> -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="cancelGoods"
      title="请选择二维码"
      width="800px"
    >
      <div class="searchHotel">
        <div class="searchHotel1">
          <div>类型</div>
          <el-select
            class="termput"
            v-model="query.cabinetType"
            placeholder="请选择"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="实体柜" value="0"></el-option>
            <el-option label="虚拟码" value="1"></el-option>
          </el-select>
        </div>
        <div class="searchHotel1">
          <div>进场配置</div>
          <el-select
            @focus="getEnterSettings()"
            v-model="query.meetingEnterId"
            placeholder="选择进场配置"
          >
            <el-option
              v-for="item in enterSettings"
              :value="item.id"
              :label="item.settingName"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="searchHotel1">
          <div>绑定类型</div>
          <el-select
            class="termput"
            v-model="query.bindAreaFlag"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in funcTypeList"
              :key="i"
              :label="item.funcTypeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button
          style="float:left;margin-top: 10px;"
          type="primary"
          @click="searchFuncPro"
          >查询</el-button
        >
        <el-button
          style="float:left;margin-top: 10px;background:#71a8e0"
          type="primary"
          @click="resetButton"
          >重置</el-button
        >
      </div>
      <div class="chooseTable">
        <el-table
          border
          stripe
          style="width:100%;"
          :data="searchGoodsList"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :selectable="checkSelectable"
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="id"
            label="ID"
            min-width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isVisual"
            label="类型"
            min-width="80px"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isVisual == '0'">实体柜</span>
              <span v-if="scope.row.isVisual == '1'">虚拟码</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="enterSettingName"
            label="进场配置"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cabinetQrcode"
            label="编码"
            min-width="140px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bindAreaFlagName"
            label="绑定类型"
            min-width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="roomFloor"
            label="区域"
            min-width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="roomCode"
            label="地点"
            min-width="80px"
            align="center"
          ></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :pager-count="5"
            :page-size="pageSize"
            :total="pageTotal"
            :current-page.sync="pageNum"
            @current-change="current"
            @prev-click="prev"
            @next-click="next"
          >
          </el-pagination>
        </div>
      </div>
      <div class="operate">
        <el-button type="none" @click="cancelGoods()">取消</el-button>
        <el-button type="primary" @click="ensureGoods()">确定</el-button>
      </div>
    </el-dialog>
    <p class="title">活动设置</p>
    <el-form
      :model="ActDetailGift"
      label-width="120px"
      ref="ActDetailGift"
      class="actdetailform"
    >
      <el-form-item label="适用场景" prop="sort" :rules="rules.sort">
        <el-radio-group v-model="ActDetailGift.sort" style="margin-top:12px;">
          <div>
            <el-radio :label="0" style="margin-right:10px">全部</el-radio>
          </div>
          <div style="margin-bottom:20px;margin-top:10px;">
            <el-radio :label="1">可用</el-radio>
            <el-button
              v-if="ActDetailGift.sort == 1"
              type="text"
              size="small"
              @click="chooseGood(1)"
              >选择二维码</el-button
            >
            <el-popover
              placement="right-start"
              title="提示"
              width="200"
              trigger="hover"
              content="如果设置为可用，分享和红包等方式进入将不可领券。"
            >
              <el-button
                style="border:none;padding:0;vertical-align:middle;margin-bottom:10px"
                slot="reference"
              >
                <i class="el-icon-warning-outline" style="font-size:18px"></i>
              </el-button>
            </el-popover>
            <el-table
              v-if="ActDetailGift.sort == 1"
              :data="goodsChooseList1"
              border
            >
              <el-table-column
                fixed
                prop="id"
                label="ID"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="isVisual"
                label="类型"
                min-width="80px"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isVisual == '0'">实体柜</span>
                  <span v-if="scope.row.isVisual == '1'">虚拟码</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="enterSettingName"
                label="进场配置"
                min-width="120px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="cabinetQrcode"
                label="编码"
                min-width="140px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="bindAreaFlagName"
                label="绑定类型"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="roomFloor"
                label="区域"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="roomCode"
                label="地点"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteGoods(scope.$index, 1)"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-bottom:20px;margin-top:10px;">
            <el-radio :label="2">不可用</el-radio>
            <el-button
              v-if="ActDetailGift.sort == 2"
              type="text"
              size="small"
              @click="chooseGood(2)"
              >选择二维码</el-button
            >
            <el-popover
              placement="right-start"
              title="提示"
              width="200"
              trigger="hover"
              content="如果设置为不可用，分享和红包等方式进入将不可领券。"
            >
              <el-button
                style="border:none;padding:0;vertical-align:middle;margin-bottom:10px"
                slot="reference"
              >
                <i class="el-icon-warning-outline" style="font-size:18px"></i>
              </el-button>
            </el-popover>
            <el-table
              v-if="ActDetailGift.sort == 2"
              :data="goodsChooseList2"
              border
            >
              <el-table-column
                fixed
                prop="id"
                label="ID"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="isVisual"
                label="类型"
                min-width="80px"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isVisual == '0'">实体柜</span>
                  <span v-if="scope.row.isVisual == '1'">虚拟码</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="enterSettingName"
                label="进场配置"
                min-width="120px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="cabinetQrcode"
                label="编码"
                min-width="140px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="bindAreaFlagName"
                label="绑定类型"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="roomFloor"
                label="区域"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="roomCode"
                label="地点"
                min-width="80px"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteGoods(scope.$index, 2)"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="卡包管理" :rules="[{ required: true }]">
        <!-- <span slot="label"><label class="titlebar">设置礼包</label></span> -->
        <el-button
          type="primary"
          class="addbtn"
          size="small"
          @click="giftAddLine"
          >添加</el-button
        >
        <el-table :data="ActDetailGift.ActGiftData" style="width:700px;">
          <el-table-column label="类型" min-width="80px" align="center">
            <template slot-scope="scope">
              <el-form-item
                :prop="'ActGiftData.' + scope.$index + '.couponType'"
                :rules="rules.couponType"
              >
                <el-select
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
          <el-table-column label="优惠券/卡券" min-width="100px" align="center">
            <template slot-scope="scope">
              <el-form-item
                :prop="'ActGiftData.' + scope.$index + '.couponBatchId'"
                :rules="rules.couponBatchId"
              >
                <el-select
                  v-model="scope.row.couponBatchId"
                  @focus="getCurrents(scope.$index, scope.row.couponType)"
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
                :prop="'ActGiftData.' + scope.$index + '.couponCount'"
                :rules="rules.couponCount"
              >
                <el-input
                  v-model.number="scope.row.couponCount"
                  placeholder="请输入数量"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="80px" align="center">
            <template slot-scope="scope">
              <el-form-item
                :prop="'ActGiftData.' + scope.$index + '.couponSort'"
                :rules="rules.couponSort"
              >
                <el-input
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
    </el-form>
    <p class="title">设置图片</p>
    <el-form label-width="120px" class="actdetailform">
      <!-- <el-form-item>
                <span slot="label"><label class="titlebar">设置图片</label></span>
            </el-form-item> -->
      <el-form-item>
        <span slot="label"
          ><label class="required-icon">*</label> 活动图片</span
        >
        <el-upload
          style="width:700px"
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="ActImgList"
          :on-success="
            (res, file, fileList, index) => {
              return handleSuccess(res, file, fileList, 1);
            }
          "
          :on-remove="
            (file, fileList, index) => {
              return handleRemove(file, fileList, 1);
            }
          "
          :on-exceed="
            (file, fileList, index) => {
              return handleExceed(file, fileList, 1);
            }
          "
          :on-error="
            (file, fileList, index) => {
              return imgUploadError(file, fileList, 1);
            }
          "
          :before-upload="
            (file, index) => {
              return beforeUpload(file, 1);
            }
          "
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip"
            >&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="领券页广告图">
        <el-upload
          style="width:700px"
          :action="uploadUrl"
          list-type="picture"
          :limit="1"
          :headers="headers"
          name="fileContent"
          :file-list="ActADImgList"
          :on-success="
            (res, file, fileList, index) => {
              return handleSuccess(res, file, fileList, 2);
            }
          "
          :on-remove="
            (file, fileList, index) => {
              return handleRemove(file, fileList, 2);
            }
          "
          :on-exceed="
            (file, fileList, index) => {
              return handleExceed(file, fileList, 2);
            }
          "
          :on-error="
            (file, fileList, index) => {
              return imgUploadError(file, fileList, 2);
            }
          "
          :before-upload="
            (file, index) => {
              return beforeUpload(file, 2);
            }
          "
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <label slot="tip" class="el-upload__tip"
            >&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label
          >
        </el-upload>
      </el-form-item>
      <br />
      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button
          type="primary"
          :disabled="isSubmit"
          @click="submitForm('ActDetailGift')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LonganActivityScanCode",
  data() {
    var validate = (rule, value, callback) => {
      if (value == 1 && this.goodsChooseList1.length == 0) {
        callback(new Error("二维码列表不可为空"));
      } else if (value == 2 && this.goodsChooseList2.length == 0) {
        callback(new Error("二维码列表不可为空"));
      } else {
        callback();
      }
    };
    return {
      authzlist: {}, //权限数据
      actID: "",
      ActDetailDataManage: {},
      actTypeName: "",
      actHotelId: "",
      actHotelId1: "",
      yCouponList: [],
      cCouponList: [],
      ActDetailGift: {
        ActGiftData: [
          {
            couponType: "",
            couponList: [],
            couponBatchId: "",
            couponCount: 1,
            couponSort: 0
          }
        ],
        sort: ""
      },
      uploadUrl: this.$api.upload_file_url,
      headers: {},
      ActImgList: [],
      ActADImgList: [],
      isSubmit: false,

      loadingP: false,
      chooseGoods: "",
      dialogVisible: false,
      funcTypeList: [],
      enterSettings: [],
      goodsChooseList1: [],
      goodsChooseList2: [],
      searchGoodsList: [],
      hotelSelection: [],
      pageSize: 10, //每页显示条数
      pageTotal: 1, //默认总条数
      pageNum: 1, //当前页码
      query: {
        cabinetType: "",
        meetingEnterId: "",
        bindAreaFlag: ""
      },

      rules: {
        couponType: [
          { required: true, message: "请选择礼包类型", trigger: "blur" }
        ],
        couponBatchId: [
          { required: true, message: "请选择礼包名称", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请选择适用场景", trigger: "blur" },
          { validator: validate }
        ],
        couponCount: [
          { required: true, message: "请输入数量", trigger: "blur" },
          {
            min: 1,
            max: 999999999,
            type: "number",
            message: "格式有误",
            trigger: "blur"
          }
        ],
        couponSort: [
          { required: true, message: "请输入排序", trigger: "blur" },
          {
            min: -999999999,
            max: 999999999,
            type: "number",
            message: "格式有误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    goodsChooseList1(value) {
      if (value.length) {
        this.$refs["ActDetailGift"].validate();
      }
    },
    goodsChooseList2(value) {
      if (value.length) {
        this.$refs["ActDetailGift"].validate();
      }
    }
  },
  mounted() {
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
    this.actID = this.$route.query.modifyid;
    this.getActDetail();
    this.basicDataItems_bindType();
  },
  methods: {
    chooseGood(type) {
      this.chooseGoods = type;
      this.dialogVisible = true;
      this.functionProdList();
    },
    //获取类型 - 字典表
    basicDataItems_bindType() {
      const params = {
        key: "BIND_AREA_FLAG",
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
              this.funcTypeList = result.data.map(item => {
                return {
                  id: item.dictValue,
                  funcTypeName: item.dictName
                };
              });
              const hotelAll = {
                id: "",
                funcTypeName: "全部"
              };
              this.funcTypeList.unshift(hotelAll);
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
    getEnterSettings() {
      let params = {
        all: 1,
        hotelId: this.actHotelId
      };
      this.$api
        .getCabinetConfig(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            this.enterSettings = result.data;
            const hotelAll = {
              id: "",
              settingName: "全部"
            };
            this.enterSettings.unshift(hotelAll);
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
    //功能区商品列表
    functionProdList() {
      let that = this;
      let params = {
        // encryptedOrgId:that.oprOgrId,
        orgAs: 2,
        pageNo: that.pageNum,
        pageSize: that.pageSize,

        hotelId: that.actHotelId,
        enterSettingId: that.query.meetingEnterId,
        isVisual: that.query.cabinetType,
        bindAreaFlag: that.query.bindAreaFlag
      };

      this.$api
        .CabinetGl({ params })
        .then(response => {
          if (response.data.code == 0) {
            that.pageTotal = response.data.data.total;
            that.searchGoodsList = response.data.data.records;
          } else {
            that.$alert(response.data.data.msg, "警告", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //检查是否已选中
    checkSelectable(row, index) {
      let flag = true;
      if (this.chooseGoods == 1) {
        this.goodsChooseList1.forEach(item => {
          if (item.id == row.id) {
            flag = false;
          }
        });
      } else if (this.chooseGoods == 2) {
        this.goodsChooseList2.forEach(item => {
          if (item.id == row.id) {
            flag = false;
          }
        });
      }
      return flag;
    },
    handleSelectionChange(val) {
      this.hotelSelection = val;
    },
    //确认商品
    ensureGoods() {
      let hotelSelections = this.hotelSelection;
      if (this.chooseGoods == 1) {
        // this.goodsChooseList1 = hotelSelections
        this.goodsChooseList1 = this.goodsChooseList1.concat(hotelSelections);
      } else if (this.chooseGoods == 2) {
        this.goodsChooseList2 = this.goodsChooseList2.concat(hotelSelections);
      }
      // this.$refs['modelTypeObj'].validate();
      this.cancelGoods();
    },
    cancelGoods() {
      this.dialogVisible = false;
      this.query = {
        cabinetType: "",
        meetingEnterId: "",
        bindAreaFlag: ""
      };
      this.searchGoodsList = [];
    },
    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: "",
        prodName: pName,
        // hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50
      };
      this.$api
        .platformCommodityList(params)
        .then(response => {
          this.loadingP = false;
          const result = response.data;
          if (result.code == 0) {
            this.prodList = result.data.records.map(item => {
              return {
                id: item.prodCode,
                prodName: item.prodName
              };
            });
            const prodAll = {
              id: "",
              prodName: "全部"
            };
            this.prodList.unshift(prodAll);
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
    searchFuncPro() {
      this.functionProdList();
    },
    //上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.functionProdList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.functionProdList();
    },
    //当前页码
    current() {
      this.functionProdList();
    },
    resetButton() {
      this.query = {
        cabinetType: "",
        meetingEnterId: "",
        bindAreaFlag: ""
      };
      this.functionProdList();
    },
    deleteGoods(index, type) {
      if (type == 1) {
        this.goodsChooseList1.splice(index, 1);
      } else if (type == 2) {
        this.goodsChooseList2.splice(index, 1);
      }
    },

    //获取活动明细
    getActDetail() {
      let that = this;
      this.$api
        .selectActivityOne(this.actID)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            let actInNum;
            if (result.data.actPartInCountType == 0) {
              actInNum = "不限制";
            } else if (result.data.actPartInCountType == 1) {
              actInNum = "次/每类型";
            } else if (result.data.actPartInCountType == 2) {
              actInNum = "次/每活动";
            } else if (result.data.actPartInCountType == 3) {
              actInNum = "次/每天";
            } else if (result.data.actPartInCountType == 4) {
              actInNum = "次/每周";
            } else if (result.data.actPartInCountType == 5) {
              actInNum = "次/每月";
            }
            let hotelName = "";
            if (result.data.actHotelDTOS.length != 0) {
              hotelName = result.data.actHotelDTOS[0].hotelName;
              this.actHotelId1 = result.data.actCouponSettingDetail.id;
              this.actHotelId = result.data.actHotelDTOS[0].hotelId;
              if (
                result.data.actCouponSettingDetail.actCouponSettingDetailDTOS
              ) {
                this.ActDetailGift.ActGiftData = result.data.actCouponSettingDetail.actCouponSettingDetailDTOS.map(
                  item => {
                    return {
                      couponType: item.couponType,
                      couponList: [],
                      couponBatchId: item.couponBatchId,
                      couponCount: item.couponCount,
                      couponSort: item.couponSort
                    };
                  }
                );
              }
              this.getActCouponList(result.data.actBegin, result.data.actEnd);
              this.getActVouList(this.actHotelId);
              if (
                result.data.actCouponSettingDetail.actCouponSettingScopeDTOS
              ) {
                this.ActDetailGift.sort =
                  result.data.actCouponSettingDetail.codeScopeType;
                if (this.ActDetailGift.sort == 1) {
                  this.goodsChooseList1 = result.data.actCouponSettingDetail.actCouponSettingScopeDTOS.map(
                    item => {
                      return item.cabinetDTO;
                    }
                  );
                } else if (this.ActDetailGift.sort == 2) {
                  this.goodsChooseList2 = result.data.actCouponSettingDetail.actCouponSettingScopeDTOS.map(
                    item => {
                      return item.cabinetDTO;
                    }
                  );
                }
              }

              if (result.data.actCouponSettingDetail.actImageUrl) {
                this.ActImgList = [
                  {
                    name: result.data.actCouponSettingDetail.actImage,
                    url: result.data.actCouponSettingDetail.actImageUrl,
                    path: result.data.actCouponSettingDetail.actImage
                  }
                ];
              }
              if (result.data.actCouponSettingDetail.actAdImageUrl) {
                this.ActADImgList = [
                  {
                    name: result.data.actCouponSettingDetail.actAdImage,
                    url: result.data.actCouponSettingDetail.actAdImageUrl,
                    path: result.data.actCouponSettingDetail.actAdImage
                  }
                ];
              }
            }
            this.ActDetailDataManage = {
              actName: result.data.actName,
              actTime:
                result.data.actBegin.split(" ")[0] +
                " 至 " +
                result.data.actEnd.split(" ")[0],
              actInNum:
                result.data.actPartInCount == 0
                  ? "" + actInNum
                  : result.data.actPartInCount + actInNum,
              actLevel: result.data.actScopeLevel == 0 ? "平台" : "单店",
              hotelName: hotelName
            };
            that.getActList(result.data.actType);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取活动类型列表
    getActList(actType) {
      let params = {
        key: "ACTTYPE",
        orgId: 0
      };
      this.$api
        .basicDataItems(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            let actTypeList = result.data.map(item => {
              return {
                id: item.dictValue,
                label: item.dictName
              };
            });
            this.actTypeName = actTypeList.find(
              item => item.id == actType
            ).label;
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
        couponBatchId: "",
        couponCount: 1,
        couponSort: 0
      };
      this.ActDetailGift.ActGiftData.push(newLine);
    },
    //移除
    giftDeleteLine(index) {
      this.ActDetailGift.ActGiftData.splice(index, 1);
    },
    //选择礼包类型 1：优惠券 2：卡券
    selectCouponT(index, cType) {
      this.ActDetailGift.ActGiftData[index].couponBatchId = "";
      this.ActDetailGift.ActGiftData[index].couponList = [];
      this.ActDetailGift.ActGiftData = [...this.ActDetailGift.ActGiftData];
    },
    getCurrents(index, cType) {
      if (cType == 1) {
        let couponBatchIds = [];
        this.ActDetailGift.ActGiftData.forEach(item => {
          if (item.couponType == 1 && item.couponBatchId) {
            couponBatchIds.push(item.couponBatchId);
          }
        });
        let couponList = [];
        this.ActDetailGift.ActGiftData[
          index
        ].couponList = this.yCouponList.forEach(item => {
          if (couponBatchIds.indexOf(item.id) == -1) {
            couponList.push(item);
          }
        });
        if (this.ActDetailGift.ActGiftData[index].couponBatchId) {
          let currentID = this.ActDetailGift.ActGiftData[index].couponBatchId;
          couponList.push(
            this.yCouponList.find(item => {
              return item.id == currentID;
            })
          );
        }
        this.ActDetailGift.ActGiftData[index].couponList = couponList;
        this.ActDetailGift.ActGiftData = [...this.ActDetailGift.ActGiftData];
      } else if (cType == 2) {
        let couponBatchIds = [];
        this.ActDetailGift.ActGiftData.forEach(item => {
          if (item.couponType == 2 && item.couponBatchId) {
            couponBatchIds.push(item.couponBatchId);
          }
        });
        let couponList = [];
        this.ActDetailGift.ActGiftData[
          index
        ].couponList = this.cCouponList.forEach(item => {
          if (couponBatchIds.indexOf(item.id) == -1) {
            couponList.push(item);
          }
        });
        if (this.ActDetailGift.ActGiftData[index].couponBatchId) {
          let currentID = this.ActDetailGift.ActGiftData[index].couponBatchId;
          couponList.push(
            this.cCouponList.find(item => {
              return item.id == currentID;
            })
          );
        }
        this.ActDetailGift.ActGiftData[index].couponList = couponList;
        this.ActDetailGift.ActGiftData = [...this.ActDetailGift.ActGiftData];
      }
    },
    //优惠券列表
    getActCouponList(actStartDate, actEndDate) {
      const that = this;
      let params = {
        actStartDate: actStartDate,
        hotelId: this.actHotelId,
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
            this.ActDetailGift.ActGiftData = this.ActDetailGift.ActGiftData.map(
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
                  couponBatchId: item.couponBatchId,
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
            this.ActDetailGift.ActGiftData = this.ActDetailGift.ActGiftData.map(
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
                  couponBatchId: item.couponBatchId,
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

    //确定
    submitForm(ActDetailGift) {
      let actImgArr = JSON.stringify(this.ActImgList.map(item => item.path));
      let actImgStr = actImgArr.substr(2, actImgArr.length - 4);
      let actAdImgArr = JSON.stringify(
        this.ActADImgList.map(item => item.path)
      );
      let actAdImgStr = actAdImgArr.substr(2, actAdImgArr.length - 4);
      if (this.ActDetailGift.ActGiftData.length < 1) {
        this.$message.error("请设置礼包!");
        return false;
      }
      let couponIds = this.ActDetailGift.ActGiftData.map(item => {
        return {
          couponType: item.couponType,
          couponBatchId: item.couponBatchId,
          couponCount: item.couponCount,
          couponSort: item.couponSort
        };
      });
      const params = {
        actCouponSettingDetailDTOS: couponIds,
        codeScopeType: this.ActDetailGift.sort,
        actImage: actImgStr,
        actAdImage: actAdImgStr
      };
      if (this.ActDetailGift.sort == 1) {
        params.actCouponSettingScopeDTOS = this.goodsChooseList1.map(item => {
          return {
            cabId: item.id
          };
        });
      } else {
        params.actCouponSettingScopeDTOS = this.goodsChooseList2.map(item => {
          return {
            cabId: item.id
          };
        });
      }
      this.$refs[ActDetailGift].validate(valid => {
        if (valid) {
          this.$api
            .checkCode(params, this.actHotelId1)
            .then(response => {
              const result = response.data;
              if (result.code == "0") {
                if (this.ActImgList.length == 0) {
                  this.$message.error("请上传活动图片!");
                  return false;
                }
                this.isSubmit = true;
                this.$api
                  .sancodeSetting(params, this.actHotelId1)
                  .then(response => {
                    const result = response.data;
                    if (result.code == "0") {
                      this.$message.success("活动明细设置成功！");
                      this.$router.push({ name: "LonganActivityList" });
                    } else {
                      this.isSubmit = false;
                      this.$message.error(result.msg);
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
                      if (this.ActImgList.length == 0) {
                        this.$message.error("请上传活动图片!");
                        return false;
                      }
                      this.isSubmit = true;
                      this.$api
                        .sancodeSetting(params, this.actHotelId1)
                        .then(response => {
                          const result = response.data;
                          if (result.code == "0") {
                            this.$message.success("活动明细设置成功！");
                            this.$router.push({ name: "LonganActivityList" });
                          } else {
                            this.isSubmit = false;
                            this.$alert(result.msg, "警告", {
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    resetForm() {
      this.$router.push({ name: "LonganActivityList" });
    },
    //图片上传成功
    handleSuccess(res, file, fileList, index) {
      if (index == 1) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data
        };
        this.ActImgList.push(image);
      } else if (index == 2) {
        const image = {
          name: file.name,
          url: file.url,
          path: res.data
        };
        this.ActADImgList.push(image);
      }
    },
    //移除图片
    handleRemove(file, fileList, index) {
      if (index == 1) {
        this.ActImgList = fileList.map(item => {
          return {
            name: item.name,
            url: item.url,
            path: item.path
          };
        });
      } else if (index == 2) {
        this.ActADImgList = fileList.map(item => {
          return {
            name: item.name,
            url: item.url,
            path: item.path
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
      this.$message.error("图片只能上传1张！");
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

<style lang="less" scoped>
.actdetailmanage {
  text-align: left;
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
  .title {
    font-weight: bold;
  }
  .actdetailform {
    width: 1000px;
    .titlebar {
      width: 100px;
      font-size: 16px;
      color: #999;
      text-align: right;
      display: inline-block;
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
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .operate {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .searchHotel {
    // display: flex;
    // align-items: center;
    .searchHotel1 {
      float: left;
      margin-right: 10px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      div {
        margin-right: 10px;
        // text-align: right;
      }
    }
  }
}
</style>
