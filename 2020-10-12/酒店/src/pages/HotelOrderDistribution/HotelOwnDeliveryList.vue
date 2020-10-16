<template>
    <div class="plateeliverylist">
        <el-form
            :inline="true"
            align=left
            class="searchform"
        >
            <el-form-item label="配送单号">
                <el-input v-model="inquireDeliveryCode"></el-input>
            </el-form-item>
            <el-form-item label="功能区">
                <el-select
                    v-model="inquireFunctionName"
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in functionList"
                        :key="item.id"
                        :label="item.funcCnName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select
                    v-model="inquireStatus"
                    placeholder="请选择"
                >
                    <el-option
                        label="全部"
                        value=""
                    ></el-option>
                    <el-option
                        label="待确认"
                        value="0"
                    ></el-option>
                    <el-option
                        label="已确认"
                        value="1"
                    ></el-option>
                    <el-option
                        label="已发货"
                        value="2"
                    ></el-option>
                    <!-- <el-option label="已配送" value="2"></el-option>
                    <el-option label="部分退款" value="3"></el-option>
                    <el-option label="全部退款" value="4"></el-option>
                    <el-option label="已收货" value="5"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="支付时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="外部配送状态">
                <el-select
                    v-model="inquireDeliveryStatus"
                    placeholder="请选择"
                >
                    <el-option
                        label="全部"
                        value=""
                    ></el-option>
                    <el-option
                        label="待接单"
                        value="1"
                    ></el-option>
                    <el-option
                        label="待取货"
                        value="2"
                    ></el-option>
                    <el-option
                        label="配送中"
                        value="3"
                    ></el-option>
                    <el-option
                        label="已完成"
                        value="4"
                    ></el-option>
                    <el-option
                        label="已取消"
                        value="5"
                    ></el-option>
                    <el-option
                        label="异常"
                        value="6"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="inquire"
                >查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc' />
            </el-form-item>
        </el-form>
        <el-table
            :data="DeliveryDataList"
            border
            stripe
            style="width:100%;"
        >
            <el-table-column
                fixed
                prop="delivCode"
                label="配送单号"
                min-width="180px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="serialNumber"
                label="流水号"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="delivWay"
                label="配送方式"
                min-width="80px"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.delivWay == 1">店内送</span>
                    <span v-else-if="scope.row.delivWay == 2">快递送</span>
                    <span v-else-if="scope.row.delivWay == 3">迷你吧</span>
                    <span v-else-if="scope.row.delivWay == 4">自提</span>
                    <span v-else-if="scope.row.delivWay == 5">电子商品</span>
                    <span v-else-if="scope.row.delivWay == 6">堂食</span>
                    <span v-else-if="scope.row.delivWay == 7">外卖</span>
                    <span v-else-if="scope.row.delivWay == 8">外带</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="lgcName"
                label="外卖配送"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomFloor"
                label="区域"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomCode"
                label="地点"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="funcName"
                label="功能区"
                min-width="120px"
            ></el-table-column>
            <el-table-column
                prop="prodCount"
                label="商品总数"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="totalAmount"
                label="商品金额"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="discountWay"
                label="优惠方式"
                align=center
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.discountWay == 1">商品满减券</span>
                    <span v-else-if="scope.row.discountWay == 2">商品折扣券</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="couponAmount"
                label="优惠金额"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span>{{scope.row.couponAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="allVouDeductAmount"
                label="抵扣金额"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span>{{scope.row.allVouDeductAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="discountAmount"
                label="减免金额"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span>{{scope.row.discountAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="actualPay"
                label="实付金额"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span>{{scope.row.actualPay}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="lgcDeductFee"
                label="运费"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span>{{scope.row.lgcDeductFee}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="customerId"
                label="用户ID"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="contactPeople"
                label="订单联系人"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                prop="contactPhone"
                label="手机号"
                min-width="120px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="payCompleteTime"
                label="支付时间"
                min-width="160px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align=center
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待确认</span>
                    <span v-else-if="scope.row.status == 1">已确认</span>
                    <span v-else-if="scope.row.status == 2">已发货</span>
                    <span v-else-if="scope.row.status == 3">部分退款</span>
                    <span v-else-if="scope.row.status == 4">全部退款</span>
                    <span v-else-if="scope.row.status == 5">已售后</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="lgcStatus"
                label="外卖状态"
                min-width="80px"
                align=center
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.lgcStatus == 1">待接单</span>
                    <span v-else-if="scope.row.lgcStatus == 2">待取货</span>
                    <span v-else-if="scope.row.lgcStatus == 3">配送中</span>
                    <span v-else-if="scope.row.lgcStatus == 4">已完成</span>
                    <span v-else-if="scope.row.lgcStatus == 5">已取消</span>
                    <span v-else-if="scope.row.lgcStatus == 6">异常</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                min-width="200px"
                align=center
            >
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        v-if="scope.row.status == 0 && authzlist['F:BH_DELIV_OWNDELIVERYLISTSUBMIT']"
                        @click="ensurePlatDelivery(scope.row.id)"
                    >确认</el-button>
                    <el-button
                        type="text"
                        size="small"
                        v-if="(scope.row.delivWay == 2 || scope.row.delivWay == 7) && scope.row.status == 1 && authzlist['F:BH_DELIV_OWNDELIVERYLISTSHIP']"
                        @click="shipmentsPlatDelivery(scope.row.id, scope.row.delivWay)"
                    >发货</el-button>
                    <el-button
                        type="text"
                        size="small"
                        v-if="scope.row.status == 2 && scope.row.lgcStatus == 5"
                        @click="againShipmentsDelivery(scope.row.delivCode)"
                    >重新发单</el-button>
                    <el-button
                        type="text"
                        size="small"
                        v-if="scope.row.lgcHotelId != 0 && scope.row.lgcStatus != 4 && scope.row.status != 0 && scope.row.status != 1"
                        @click="updateLgcStatus(scope.row.delivCode)"
                    >更新状态</el-button>
                    <el-button
                        v-if="authzlist['F:BH_DELIV_OWNDELIVERYLIST_DETAIL']"
                        type="text"
                        size="small"
                        @click="deliveryDetail(scope.row.id)"
                    >详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisibleOrder"
            width="30%"
        >
            <span>是否确认该订单？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleOrder=false">取消</el-button>
                <el-button
                    type="primary"
                    @click="ensureOrder"
                >确认</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="发货"
            :visible.sync="dislogVisibleShipments"
            width="30%"
        >
            <el-form
                :model="shipmentsForm"
                :rules="rules"
                ref="shipmentsForm"
                label-width="80px"
            >
                <el-form-item
                    label="物流公司"
                    prop="logistics"
                >
                    <el-input v-model.trim="shipmentsForm.logistics"></el-input>
                </el-form-item>
                <el-form-item
                    label="快递单号"
                    prop="logisticsCode"
                >
                    <el-input v-model="shipmentsForm.logisticsCode"></el-input>
                </el-form-item>
                <el-form-item
                    label="发货时间"
                    prop="shipmentsTime"
                >
                    <el-date-picker
                        v-model="shipmentsForm.shipmentsTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleShipments = false">取 消</el-button>
                <el-button
                    type="primary"
                    :disabled="isSubmit"
                    @click="EnsureReset('shipmentsForm')"
                >发 货</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="是否确认发货？"
            :visible.sync="dialogVisibleLgcShipments"
            width="30%"
        >
            <!-- <span>是否确认发货？</span> -->
            <div style="text-align:left;">
                <el-radio-group
                    v-model="shipmentsType"
                    @change="selectShipments"
                >
                    <el-radio :label="2">商家自送</el-radio>
                    <el-radio :label="1">外部物流配送</el-radio>
                </el-radio-group>
                <div style="width:43%;margin-left:10px;display:inline-block;">
                    <el-select
                        v-model="logisticsId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in logisticsList"
                            :key="item.id"
                            :label="item.logisticsName"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="text-align:center;padding-top:40px;">
                <span slot="footer">
                    <el-button @click="dialogVisibleLgcShipments=false">取消</el-button>
                    <el-button
                        type="primary"
                        :disabled="isLgcSubmit"
                        @click="ensureLgcShipments"
                    >确认</el-button>
                </span>
            </div>
        </el-dialog>
        <HotelPagination
            :pageTotal="pageTotal"
            @pageFunc="pageFunc"
        />
        <audio
            class="success"
            ref="audio"
            loop="loop"
            :src="url"
        ></audio>
    </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelOwnDeliveryList",
  components: {
    HotelPagination,
    resetButton
  },
  data() {
    return {
      // orgId: '',
      authzlist: {}, //权限数据
      hotelId: "",
      pdId: "",
      inquireDeliveryCode: "",
      inquireFunctionName: "",
      functionList: [],
      loadingF: false,
      inquirePhone: "",
      inquireStatus: "",
      inquireTime: [],
      inquireDeliveryStatus: "",
      DeliveryDataList: [],
      dialogVisibleOrder: false,
      isEnsureOnce: false,
      dislogVisibleShipments: false,
      dialogVisibleLgcShipments: false,
      shipmentsType: "",
      logisticsId: "",
      logisticsList: [],
      firstOrder: true,
      nowDelivCode: "",
      shipmentsForm: {
        logistics: "",
        logisticsCode: "",
        shipmentsTime: ""
      },
      rules: {
        logistics: [
          { required: true, message: "请填写物流公司", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "物流公司请保持在20个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        logisticsCode: [
          { required: true, message: "请填写快递单号", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "快递单号请保持在30个字符以内",
            trigger: ["blur", "change"]
          }
        ],
        shipmentsTime: [
          { required: true, message: "请选择发货时间", trigger: "blur" }
        ]
      },
      isSubmit: false,
      isLgcSubmit: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      url: "tipsDelivery.mp3",
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false, //是否自动播放
        muted: false, //是否静音
        speed: 1,
        waiting: true,
        preload: "auto"
      },
      totaldate: [], //缓存数据
      flag: true, //加载判断
      dingshi: null, //定时器赋值
      windowjudge: null, //窗口判断
      requesttime: 10000, //请求时间
      loadjudge: true //加载执行
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
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getFunctionList();
    this.platDeliveryList();
    this.getLgcList();
  },
  destroyed() {
    let that = this;
    clearTimeout(that.dingshi);
    that.dingshi = "leave";
  },
  methods: {
    resetFunc() {
      this.inquireDeliveryCode = "";
      this.inquireFunctionName = "";
      this.inquirePhone = "";
      this.inquireTime = [];
      this.inquireStatus = "";
      this.inquireDeliveryStatus = "";
      this.platDeliveryList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.platDeliveryList();
    },
    //功能区列表
    getFunctionList(fName) {
      this.loadingF = true;
      const params = {
        funcName: fName,
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50
      };
      this.$api
        .hotelFunctionList(params)
        .then(response => {
          this.loadingF = false;
          const result = response.data;
          if (result.code == 0) {
            this.functionList = result.data.records.map(item => {
              return {
                id: item.id,
                funcCnName: item.funcCnName
              };
            });
            const functionAll = {
              id: "",
              funcCnName: "全部"
            };
            this.functionList.unshift(functionAll);
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
    remoteFunction(val) {
      this.getFunctionList(val);
    },

    //订单列表
    platDeliveryList() {
      let that = this;
      if (that.inquireCheckIn == null) {
        that.inquireCheckIn = [];
      }
      let params = {
        chooseAs: 1,
        deliveryCode: this.inquireDeliveryCode,
        contactPhone: this.inquirePhone,
        funcId: this.inquireFunctionName,
        status: this.inquireStatus,
        payStartTime: this.inquireTime[0],
        payEndTime: this.inquireTime[1],
        lgcStatus: this.inquireDeliveryStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      if (that.flag == true) {
        that.falg = false;
        that.$api
          .platDeliveryList(params)
          .then(response => {
            that.flag = true;
            const result = response.data;
            if (response.data.code == 0) {
              that.DeliveryDataList = result.data.records;
              that.pageTotal = result.data.total;
              let countnum = 0;
              result.data.records.map(item => {
                if (item.status == 0) {
                  ++countnum;
                }
              });
              if (that.loadjudge == true) {
                that.totaldate = localStorage.OwnDeliverytotal || 0;
                if (that.totaldate < response.data.data.total && countnum > 0) {
                  if (that.$refs.audio !== null) {
                    if (window.longanJsObject) {
                      if (window.longanJsObject.playOrderTip) {
                        window.longanJsObject.playOrderTip();
                      } else {
                        that.openWin();
                        if (that.$refs.audio.paused) {
                          that.$refs.audio.play();
                        }
                      }
                    } else {
                      that.openWin();
                      if (that.$refs.audio.paused) {
                        that.$refs.audio.play();
                      }
                    }
                    if (that.windowjudge != null) {
                      setTimeout(function() {
                        that.windowjudge.close();
                      }, 2000);
                    }
                    setTimeout(function() {
                      if (that.$refs.audio.play) {
                        that.$refs.audio.pause();
                      }
                    }, 10000);
                  }
                  localStorage.setItem(
                    "OwnDeliverytotal",
                    response.data.data.total
                  );
                }
                if (that.dingshi != "leave") {
                  that.dingshi = setTimeout(function() {
                    that.platDeliveryList();
                  }, that.requesttime);
                }
              }
            } else {
              that.$alert(response.data.msg, "警告", {
                confirmButtonText: "确定"
              });
            }
          })
          .catch(err => {
            that.flag = true;
            that.$alert(err, "警告", {
              confirmButtonText: "确定"
            });
          });
      }
    },

    openWin() {
      let that = this;
      let urladdress = window.location.href;
      that.windowjudge = window.open(urladdress, "_blank");
    },

    //确认
    ensurePlatDelivery(id) {
      this.pdId = id;
      this.dialogVisibleOrder = true;
    },
    ensureOrder() {
      if (!this.isEnsureOnce) {
        this.isEnsureOnce = true;
        const params = {};
        const id = this.pdId;
        // console.log(params);
        this.$api
          .ensurePlatDelivery(params, id)
          .then(response => {
            // console.log(response);
            const result = response.data;
            if (result.code == "0") {
              this.$message.success("配送单确认成功！");
              this.dialogVisibleOrder = false;
              this.platDeliveryList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleOrder = false;
            }
            this.isEnsureOnce = false;
          })
          .catch(error => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定"
            });
            this.isEnsureOnce = false;
          });
      }
    },
    //发货
    shipmentsPlatDelivery(id, delivWay) {
      this.shipmentsForm.logistics = "";
      this.shipmentsForm.logisticsCode = "";
      this.shipmentsForm.shipmentsTime = "";
      this.pdId = id;
      if (delivWay == 7) {
        //外卖-外部物流
        this.firstOrder = true;
        this.dialogVisibleLgcShipments = true;
      } else {
        this.dislogVisibleShipments = true;
      }
    },
    EnsureReset(shipmentsForm) {
      const params = {
        deliveryId: this.pdId,
        logistics: this.shipmentsForm.logistics,
        logisticsCode: this.shipmentsForm.logisticsCode,
        shipmentsTime: this.shipmentsForm.shipmentsTime
      };
      // const id = this.pdId;
      // console.log(params);
      this.$refs[shipmentsForm].validate(valid => {
        if (valid) {
          this.isSubmit = true;
          this.$api
            .shipmentsPlatDelivery(params)
            .then(response => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("配送单发货成功！");
                this.dislogVisibleShipments = false;
                this.isSubmit = false;
                this.platDeliveryList();
              } else {
                this.$message.error(result.msg);
                this.dislogVisibleShipments = false;
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
    selectShipments() {
      this.logisticsId = "";
    },
    //外部物流-发货-重新下单
    ensureLgcShipments() {
      if (this.shipmentsType == "") {
        this.$message.error("请选择配送方式");
        return false;
      }
      if (this.shipmentsType == 2) {
        this.logisticsId = -99;
      } else {
        if (this.logisticsId == "") {
          this.$message.error("请选择物流");
          return false;
        }
      }
      if (this.firstOrder) {
        const params = {
          deliveryId: this.pdId,
          lgcHotelId: this.logisticsId
        };
        // const id = this.pdId;
        // console.log(params);
        this.isLgcSubmit = true;
        this.$api
          .shipmentsPlatDelivery(params)
          .then(response => {
            // console.log(response);
            const result = response.data;
            if (result.code == "0") {
              this.$message.success("配送单发货成功！");
              this.dialogVisibleLgcShipments = false;
              this.isLgcSubmit = false;
              this.platDeliveryList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleLgcShipments = false;
              this.isLgcSubmit = false;
            }
          })
          .catch(error => {
            this.isLgcSubmit = false;
            this.$alert(error, "警告", {
              confirmButtonText: "确定"
            });
          });
      } else {
        const params = {
          orderDelivId: this.nowDelivCode,
          hotelLgcId: this.logisticsId
        };
        // const id = this.pdId;
        // console.log(params);
        this.isLgcSubmit = true;
        this.$api
          .againShipmentsDelivery(params)
          .then(response => {
            // console.log(response);
            const result = response.data;
            if (result.code == "0") {
              this.$message.success("重新发单成功！");
              this.dialogVisibleLgcShipments = false;
              this.isLgcSubmit = false;
              this.platDeliveryList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleLgcShipments = false;
              this.isLgcSubmit = false;
            }
          })
          .catch(error => {
            this.isLgcSubmit = false;
            this.$alert(error, "警告", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    //获取指定酒店的全部外部物流
    getLgcList() {
      const params = {
        hotelId: this.hotelId
      };
      this.$api
        .getLgcList(params)
        .then(response => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.logisticsList = result.data.map(item => {
                return {
                  id: item.id,
                  logisticsName: item.lgcName
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
    //重新发单
    againShipmentsDelivery(delivCode) {
      this.nowDelivCode = delivCode;
      this.firstOrder = false;
      this.dialogVisibleLgcShipments = true;
    },
    //更新状态
    updateLgcStatus(delivCode) {
      const params = {
        delivCode: delivCode
      };
      this.$api
        .updateLgcStatus(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("更新状态成功！");
            this.platDeliveryList();
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
    //查看详情
    deliveryDetail(id) {
      this.$router.push({ name: "HotelOwnDeliveryDetail", query: { id } });
    },
    //查询
    inquire() {
      this.loadjudge = false;
      this.pageNum = 1;
      this.platDeliveryList();
      this.$store.commit("setSearchList", {
        inquireDeliveryCode: this.inquireDeliveryCode,
        inquireFunctionName: this.inquireFunctionName,
        inquirePhone: this.inquirePhone,
        inquireStatus: this.inquireStatus,
        inquireTime: this.inquireTime,
        inquireDeliveryStatus: this.inquireDeliveryStatus
      });
    }
  }
};
</script>

<style scoped>
.el-dialog__footer {
  text-align: center;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>

<style lang="less" scoped>
.plateeliverylist {
}
</style>
