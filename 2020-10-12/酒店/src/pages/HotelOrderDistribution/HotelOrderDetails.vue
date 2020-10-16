<template>
  <div class="platdeliverydetail">
    <p class="title">订单详情</p>
    <table
      cellpadding="0"
      cellspacing="0"
      class="deliveryTable"
    >
      <tr>
        <td class="subTitle">订单状态</td>
        <td class="subcont">
          <span v-if="orderProdDataDetail.orderStatus == 0">待支付</span>
          <span v-else-if="orderProdDataDetail.orderStatus == 1">已支付</span>
          <span v-else-if="orderProdDataDetail.orderStatus == 2">已取消</span>
          <span v-else-if="orderProdDataDetail.orderStatus == 3">部分退款</span>
          <span v-else-if="orderProdDataDetail.orderStatus == 4">全部退款</span>
        </td>
      </tr>
      <tr>
        <td class="subTitle">订单号</td>
        <td class="subcont">{{orderProdDataDetail.orderCode}}</td>
      </tr>
      <tr>
        <td class="subTitle">流水号</td>
        <td class="subcont">{{orderProdDataDetail.serialNumber}}</td>
      </tr>
      <tr>
        <td class="subTitle">区域</td>
        <td class="subcont">{{orderProdDataDetail.roomFloor}}</td>
      </tr>
      <tr>
        <td class="subTitle">地点</td>
        <td class="subcont">{{orderProdDataDetail.roomCode}}</td>
      </tr>
      <tr>
        <td class="subTitle">商品总数</td>
        <td class="subcont">{{orderProdDataDetail.prodCount}}</td>
      </tr>
      <tr>
        <td class="subTitle">商品金额</td>
        <td class="subcont">{{orderProdDataDetail.totalAmount}}</td>
      </tr>
      <tr>
        <td class="subTitle">优惠金额</td>
        <td class="subcont">{{orderProdDataDetail.couponAmount}}</td>
      </tr>
      <tr>
        <td class="subTitle">优惠券数量</td>
        <td class="subcont">{{orderProdDataDetail.allCouUseCount}}</td>
      </tr>
      <tr>
        <td class="subTitle">抵扣金额</td>
        <td class="subcont">{{orderProdDataDetail.allVouDeductAmount}}</td>
      </tr>
      <tr>
        <td class="subTitle">减免金额</td>
        <td class="subcont">{{orderProdDataDetail.discountAmount}}</td>
      </tr>
      <tr>
        <td class="subTitle">实付金额</td>
        <td class="subcont">{{orderProdDataDetail.actualPay}}</td>
      </tr>
      <!-- <tr>
                <td class="subTitle">使用数量</td>
                <td class="subcont">{{orderProdDataDetail.vouUserCount}}</td>
            </tr> -->
      <tr>
        <td class="subTitle">用户ID</td>
        <td class="subcont">{{orderProdDataDetail.customerId}}</td>
      </tr>
      <tr>
        <td class="subTitle">用户昵称</td>
        <td class="subcont">{{orderProdDataDetail.nickName}}</td>
      </tr>
      <tr>
        <td class="subTitle">联系人</td>
        <td class="subcont">{{orderProdDataDetail.contactName}}</td>
      </tr>
      <tr>
        <td class="subTitle">手机号</td>
        <td class="subcont">{{orderProdDataDetail.contactPhone}}</td>
      </tr>
      <tr>
        <td class="subTitle">下单时间</td>
        <td class="subcont">{{orderProdDataDetail.payTime=='1970-01-01 00:00:00'?"":orderProdDataDetail.payTime}}</td>
      </tr>
      <tr>
        <td class="subTitle">支付时间</td>
        <td class="subcont">{{orderProdDataDetail.payCompleteTime=='1970-01-01 00:00:00'?"":orderProdDataDetail.payCompleteTime}}</td>
      </tr>
      <tr v-if="(orderProdDataDetail.delivWay>6||orderProdDataDetail.delivWay==6||orderProdDataDetail.delivWay==1)&&orderProdDataDetail.roomDeliveryRemark!=''">
        <td
          class="subTitle"
          v-if="orderProdDataDetail.delivWay==7"
        >外卖送留言</td>
        <td
          class="subTitle"
          v-else
        >现场送留言</td>
        <td class="subcont">{{orderProdDataDetail.roomDeliveryRemark}}</td>
      </tr>
      <tr v-if="orderProdDataDetail.delivWay==2&&orderProdDataDetail.expressRemark!=''">
        <td class="subTitle">快递送留言</td>
        <td class="subcont">{{orderProdDataDetail.expressRemark}}</td>
      </tr>
      <tr v-if="orderProdDataDetail.orderStatus == 2">
        <td class="subTitle">取消类型</td>
        <td class="subcont">
          <span v-if="orderProdDataDetail.cancelType == 1">用户取消</span>
          <span v-else>自动取消</span>
        </td>
      </tr>
      <tr v-if="orderProdDataDetail.orderStatus == 2">
        <td class="subTitle">取消时间</td>
        <td class="subcont">{{orderProdDataDetail.cancelTime}}</td>
      </tr>
    </table>
    <br /><br />
    <!-- <el-button type="primary" @click="couponUseDetails">查看使用的卡券</el-button> -->
    <p class="title">商品详情</p>
    <el-table
      :data="orderProdDataDetail.orderDetailDTOList"
      border
      style="width:100%;"
    >
      <el-table-column
        prop="funcName"
        label="功能区"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        prop="prodProductDTO.prodName"
        label="商品名称"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        prop="prodProductDTO.prodShowName"
        label="显示名称"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        prop="prodGenre"
        label="商品形式"
        min-width="80px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="prodSpecs"
        label="商品规格"
        min-width="80px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="prodCount"
        label="商品数量"
        min-width="80px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="prodPrice"
        label="商品单价"
        min-width="80px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="discountWay"
        label="优惠方式"
        min-width="100px"
        align=center
      >
        <template slot-scope="scope">
          <span v-if="scope.row.discountWay == 1&&scope.row.deliveryWay!=6">商品满减券</span>
          <span v-else-if="scope.row.discountWay == 2&&scope.row.deliveryWay!=6">商品折扣券</span>
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
      <!-- <el-table-column prop="vouUserCount" label="使用数量" min-width="80px" align=center></el-table-column> -->
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
        prop="deliveryWay"
        label="配送方式"
        align=center
      >
        <template slot-scope="scope">
          <span v-if="scope.row.deliveryWay == 1">店内送</span>
          <span v-else-if="scope.row.deliveryWay == 2">快递送</span>
          <span v-else-if="scope.row.deliveryWay == 3">迷你吧</span>
          <span v-else-if="scope.row.deliveryWay == 4">自提</span>
          <span v-else-if="scope.row.deliveryWay == 5">电子商品</span>
          <span v-else-if="scope.row.deliveryWay == 6">堂食</span>
          <span v-else-if="scope.row.deliveryWay == 7">外卖</span>
          <span v-else-if="scope.row.deliveryWay == 8">外带</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expressPerson"
        label="收件人"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        prop="expressPhone"
        label="手机号"
        min-width="120px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="expressAddress"
        label="地址"
        min-width="140px"
      ></el-table-column>
      <el-table-column
        prop="roomCode"
        label="地点"
        min-width="80px"
        align=center
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="100px"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">正常</span>
          <span v-else-if="scope.row.status == 1">已退款</span>
          <span v-else-if="scope.row.status == 2">已退货退款</span>
          <span v-else-if="scope.row.status == 3">已申请售后</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="refundTime"
        label="退款时间"
        min-width="120px"
        align=center
      >
        <template slot-scope="scope">
          <span>{{scope.row.refundTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="returnTime"
        label="退货时间"
        min-width="120px"
        align=center
      >
        <template slot-scope="scope">
          <span>{{scope.row.returnTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tipFee"
        label="配送服务费"
        min-width="100px"
        align=center
      >
        <template slot-scope="scope">
          <span v-if="scope.row.deliveryWay == 1 || scope.row.deliveryWay == 2">{{scope.row.tipFee}}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tipFee"
        label="补货费"
        min-width="80px"
        align=center
      >
        <template slot-scope="scope">
          <span v-if="scope.row.deliveryWay == 3">{{scope.row.tipFee}}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expressFee"
        label="快递费"
        min-width="80px"
        align=center
      >
        <template slot-scope="scope">
          <span>{{scope.row.expressFee}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payChannelFee"
        label="支付通道费用"
        min-width="120px"
        align=center
      >
        <template slot-scope="scope">
          <span>{{scope.row.payChannelFee.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140px"
        align=center
      >
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="couponUserDetails(scope.row.id)">卡券详情</el-button> -->
          <el-button
            type="text"
            size="small"
            :disabled="orderProdDataDetail.orderStatus==0?true:false"
            @click="divideDetail(scope.row.id)"
          >分成详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br /><br />
    <el-button @click="returnList">返回</el-button>
    <el-button
      v-if="orderProdDataDetail.orderStatus == 0 && orderProdDataDetail.isSupportManyTimesOrder == 1"
      @click="cancelOrder"
    >取消订单</el-button>
    <el-button
      v-if="orderProdDataDetail.orderStatus == 0 && orderProdDataDetail.isSupportManyTimesOrder == 1"
      type="primary"
      @click="modifyOrderProd"
    >修改订单商品</el-button>
    <el-dialog
      title="新增"
      :visible.sync="dialogFunProdVisible"
      width="30%"
    >
      <el-form
        :model="FunProdData"
        :rules="funRules"
        ref="FunProdData"
        label-width="100px"
        class="formclass"
      >
        <el-form-item
          label="功能区名称"
          prop="funcName"
        >
          <!-- <el-input :disabled="true" v-model="funcName"></el-input> -->
          <el-select
            :disabled="true"
            v-model="funcId"
            placeholder="请选择"
          >
            <el-option
              :label="funcName"
              :value="funcId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="市场分类"
          prop="prodCategoryId"
        >
          <el-select
            v-model="FunProdData.prodCategoryId"
            @change="selectCategory"
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品"
          prop="prodCode"
        >
          <el-select
            v-model="FunProdData.prodCode"
            @change="selectProd"
            placeholder="请选择"
          >
            <el-option
              v-for="item in prodList"
              :key="item.id"
              :label="item.prodName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span
            slot="label"
            v-if="isSpec"
          ><label class="required-icon">*</label> 规格</span>
          <span
            slot="label"
            v-else
          >规格</span>
          <el-select
            v-model="FunProdData.funcProdSpecId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFunProdVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="EnsureAdd('FunProdData')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogProdVisible"
      :close-on-click-modal="false"
      width="86%"
    >
      <div>
        <el-button
          class="addbutton"
          @click="functionProdAdd"
        >新增</el-button>
      </div>
      <el-form
        :model="prodFormData"
        :rules="prodFormData.rules"
        ref="prodFormData"
      >
        <el-table
          :data="prodFormData.functionProdList"
          border
          stripe
          style="width:100%;"
        >
          <el-table-column
            fixed
            prop="prodCode"
            label="商品编码"
            min-width="140px"
            align=center
          ></el-table-column>
          <el-table-column
            prop="prodName"
            label="商品名称"
            min-width="200px"
          ></el-table-column>
          <el-table-column
            prop="prodShowName"
            label="显示名称"
            min-width="200px"
          ></el-table-column>
          <el-table-column
            prop="prodCount"
            label="商品数量"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'functionProdList.'+scope.$index+'.prodCount'"
                :rules="prodFormData.rules.prodCount"
              >
                <el-input v-model="scope.row.prodCount"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="prodPrice"
            label="商品单价"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'functionProdList.'+scope.$index+'.prodPrice'"
                :rules="prodFormData.rules.prodPrice"
              >
                <el-input v-model="scope.row.prodPrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="80px"
            align=center
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="functionProdDelete(scope.$index)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table><br /><br />
        <el-form-item>
          <div style="text-align:center;">
            <el-button @click="dialogProdVisible=false">取消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="EnsureModify('prodFormData')"
            >确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleCancel"
      width="30%"
    >
      <span>是否确认取消该订单？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleCancel=false">取消</el-button>
        <el-button
          type="primary"
          @click="EnsureCancel"
        >确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分成详情"
      :visible.sync="divideDetaildialog"
      v-if="divideDetaildialog"
      class="dividedialog"
    >
      <el-form
        align="left"
        label-width="125px"
        :model="divideDetailData"
        ref="LogisticsEditData"
      >
        <div v-if="divideDetailData.orderType==1">
          <p class="InfoTitle">商品信息</p>
          <el-form-item label="商品名称">
            <span>{{divideDetailData.orderDetailAllocBean.prodName}}</span>
          </el-form-item>
          <el-form-item label="显示名称">
            <span>{{divideDetailData.orderDetailAllocBean.prodShowName}}</span>
          </el-form-item>
          <el-form-item label="规格">
            <span>{{divideDetailData.orderDetailAllocBean.prodSpecs}}</span>
          </el-form-item>
          <el-form-item label="商品数量">
            <span>{{divideDetailData.orderDetailAllocBean.prodCount}}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>￥{{divideDetailData.orderDetailAllocBean.prodPrice}}</span>
          </el-form-item>
          <el-form-item label="优惠券金额">
            <span>￥{{divideDetailData.orderDetailAllocBean.couponAmount}}</span>
          </el-form-item>
          <el-form-item label="抵扣金额">
            <span>￥{{divideDetailData.orderDetailAllocBean.deductAmount}}</span>
          </el-form-item>
          <el-form-item label="实付金额">
            <span>￥{{divideDetailData.orderDetailAllocBean.actualPay}}</span>
          </el-form-item>
        </div>

        <p class="InfoTitle">费用信息</p>
        <el-form-item label="支付通道费">
          <span>￥{{divideDetailData.orderDetailAllocBean.prodPayChannel.toFixed(2)}}</span>
        </el-form-item>

        <el-form-item label="红包">
          <span>￥{{divideDetailData.orderDetailAllocBean.redPacketAmount}}</span>
        </el-form-item>
        <template v-for="(item,key) in divideDetailData.orderDetailAllocDetailDTOS">
          <el-form-item
            :label="item.deductObj"
            :key="key"
            v-if="item.deductObj==='分享奖励' || item.deductObj==='管理奖励'"
          >
            <span>￥{{item.deductAmount}}</span>
          </el-form-item>
        </template>
        <p class="InfoTitle">成本信息</p>
        <div v-if="divideDetailData.allocType===0">
          <el-form-item label="供货价">
            <span>￥{{divideDetailData.prodSupplyPrice}}</span>
          </el-form-item>
          <el-form-item label="零售价">
            <span>￥{{divideDetailData.prodPrice}}</span>
          </el-form-item>
        </div>
        <div v-if="divideDetailData.allocType===1">
          <el-form-item label="零售价">
            <span>￥{{divideDetailData.prodPrice}}</span>
          </el-form-item>
          <el-form-item label="佣金比例">
            <span>{{divideDetailData.commissionRate}}%</span>
          </el-form-item>
        </div>

        <p class="InfoTitle">利润信息</p>
        <template v-for="(item,key) in divideDetailData.orderDetailAllocDetailDTOS">
          <!-- <el-form-item :label=item.deductObj :key="key" v-if="item.deductObj!='分享奖励' || item.deductObj!='管理奖励'">
                        <span>￥{{item.deductAmount}}</span><span class="dividebli">({{item.revenueRate}}%)</span>
                    </el-form-item> -->
          <div
            :key="key"
            v-if="item.deductObj=='酒店' || item.deductObj=='供应商'"
            style="margin-bottom:5px"
          >
            <span
              style="margin-right:30px"
              class="leftitle"
            >{{item.deductObj}}({{item.orgOrUserName}})</span>
            <span>￥{{item.deductAmount}}</span><span class="dividebli">({{item.revenueRate}}%)</span>
          </div>
        </template>
        <div v-if="divideDetailData.refundAmount>0">
          <p class="InfoTitle">退款信息</p>
          <el-form-item label="退款金额">
            <span>{{divideDetailData.refundAmount}}</span>
          </el-form-item>
          <el-form-item label="支付通道费">
            <span>{{divideDetailData.refundPayChannelAmount.toFixed(2)}}</span>
          </el-form-item>
          <template v-for="(item,key) in divideDetailData.orderDetailAllocRefundList">
            <!-- <el-form-item :label=item.deductObj :key="key">
                          <span>￥{{item.deductAmount}}</span>
                      </el-form-item> -->
            <div
              :key="key"
              style="margin-bottom:5px"
              v-if="item.deductObj=='酒店' || item.deductObj =='供应商'"
            >
              <span style="margin-right:30px">{{item.deductObj}}({{item.orgOrUserName}})</span>
              <span>￥{{item.deductAmount}}</span>
            </div>
          </template>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HotelOrderDetails",
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
      authzlist: {}, //权限数据
      hotelId: "",
      opId: "",
      orderProdDataDetail: [],
      divideDetailData: {},
      divideDetaildialog: false,
      dialogVisibleCancel: false, //取消订单dialog
      dialogProdVisible: false, //订单商品
      isSubmit: false,
      prodFormData: {
        functionProdList: [],
        rules: {
          prodCount: [
            {
              required: true,
              validator: validatePrice,
              trigger: ["blur", "change"]
            }
          ],
          prodPrice: [
            {
              required: true,
              validator: validatePrice,
              trigger: ["blur", "change"]
            }
          ]
        }
      },
      dialogFunProdVisible: false, //功能区商品
      FunProdData: {
        funcProdSpecId: ""
      },
      funcId: "",
      funcName: "",
      categoryList: [], //市场分类
      prodList: [], //商品
      specList: [], //规格
      isSpec: false,
      funRules: {
        prodCategoryId: [
          { required: true, message: "请选择市场分类", trigger: ["change"] }
        ],
        prodCode: [
          { required: true, message: "请选择商品", trigger: ["change"] }
        ]
      }
    };
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
    this.hotelId = localStorage.getItem("hotelId");
    this.opId = this.$route.query.id;
    this.HotelOrderDetails();
  },
  methods: {
    //订单商品详情
    HotelOrderDetails() {
      const params = {};
      const id = this.opId;
      this.$api
        .HotelOrderDetails(params, id)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.orderProdDataDetail = result.data;
            this.orderProdDataDetail.orderDetailDTOList.map(item => {
              item.roomCode = result.data.roomCode;
              return item;
            });
            if (result.data.orderDetailDTOList.length != 0) {
              this.prodFormData.functionProdList = result.data.orderDetailDTOList.map(
                item => {
                  return {
                    id: item.id,
                    prodCode: item.prodCode,
                    prodName: item.prodProductDTO.prodName,
                    prodShowName: item.prodProductDTO.prodShowName,
                    prodCount: item.prodCount,
                    prodPrice: item.prodPrice,
                    funcProdId: item.funcProdId,
                    funcProdSpecId: item.funcProdSpecId,
                    hotelProdId: item.hotelProdId,
                    prodCategoryId: item.prodCategoryId
                  };
                }
              );
              this.funcId = result.data.orderDetailDTOList[0].funcId;
              this.funcName = result.data.orderDetailDTOList[0].funcName;
            }
          } else {
            this.$message.error("订单详情获取失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //卡券详情-查看使用的卡券
    couponUseDetails() {
      const id = this.orderProdDataDetail.id;
      this.$router.push({ name: "HotelOrderCouponDetails", query: { id } });
    },
    //卡券详情-查看用户卡券详情
    couponUserDetails(id) {
      //跳 ‘ 查看用户卡券详情 ’
      // this.$router.push({name: 'HotelOrderCouponDetails', query: {id}});
    },
    //分成详情
    divideDetail(id) {
      this.getDiveideDetail(id);
    },
    //订单信息---分成详情
    getDiveideDetail(id) {
      let that = this;
      let params = {
        orderDetailId: id,
        orderType: 1
      };
      this.$api
        .getDiveideDetail({ params })
        .then(response => {
          if (response.data.code == 0) {
            that.divideDetailData = response.data.data;
            that.$nextTick(() => {
              that.divideDetaildialog = true;
            });
          } else {
            that.$message.error(response.data.msg);
          }
        })
        .catch(error => {
          that.$alert(response.data.msg, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //返回
    returnList() {
      // this.$router.push({name: 'HotelOrderList'});
      this.$router.go(-1);
    },
    //取消订单
    cancelOrder() {
      this.dialogVisibleCancel = true;
    },
    EnsureCancel() {
      const params = {};
      const id = this.opId;
      this.$api
        .HotelEatinOrderCancel(params, id)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("取消订单成功！");
            this.HotelOrderDetails();
          } else {
            this.$message.error(result.msg);
          }
          this.dialogVisibleCancel = false;
        })
        .catch(error => {
          this.dialogVisibleCancel = false;
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //修改订单商品
    modifyOrderProd() {
      if (this.orderProdDataDetail.orderDetailDTOList.length != 0) {
        this.prodFormData.functionProdList = this.orderProdDataDetail.orderDetailDTOList.map(
          item => {
            return {
              id: item.id,
              prodCode: item.prodCode,
              prodName: item.prodProductDTO.prodName,
              prodShowName: item.prodProductDTO.prodShowName,
              prodCount: item.prodCount,
              prodPrice: item.prodPrice,
              funcProdId: item.funcProdId,
              funcProdSpecId: item.funcProdSpecId,
              hotelProdId: item.hotelProdId,
              prodCategoryId: item.prodCategoryId
            };
          }
        );
      }
      this.dialogProdVisible = true;
    },
    //新增
    functionProdAdd() {
      this.getCategoryList();
      this.FunProdData = {};
      this.dialogFunProdVisible = true;
    },
    EnsureAdd(FunProdData) {
      this.$refs[FunProdData].validate((valid, model) => {
        if (valid) {
          if (this.isSpec) {
            if (this.FunProdData.funcProdSpecId == "") {
              this.$message.error("请选择规格");
              return false;
            }
          }
          let prodAdd = {
            id: "",
            prodCode: this.FunProdData.prodCode,
            prodName: this.FunProdData.prodName,
            prodShowName: this.FunProdData.prodShowName,
            prodCount: this.FunProdData.prodCount,
            prodPrice: this.FunProdData.prodPrice,
            funcProdId: this.FunProdData.funcProdId,
            funcProdSpecId: this.FunProdData.funcProdSpecId,
            hotelProdId: this.FunProdData.hotelProdId,
            prodCategoryId: this.FunProdData.prodCategoryId
          };
          this.prodFormData.functionProdList.push(prodAdd);
          this.dialogFunProdVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    //获取市场分类
    getCategoryList() {
      const params = {
        funcId: this.funcId,
        hotelId: this.hotelId
      };
      this.$api
        .functionClassifyTree(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.categoryList = result.data.map(item => {
                return {
                  id: item.id,
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
    //选择市场分类
    selectCategory(val) {
      this.getProdList();
    },
    //获取商品
    getProdList() {
      const params = {
        categoryId: this.FunProdData.prodCategoryId,
        hotelId: this.hotelId
      };
      this.$api
        .getFuncProdList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.prodList = result.data.map(item => {
                return {
                  id: item.prodCode,
                  prodName: item.prodName,
                  prodShowName: item.prodShowName,
                  prodCount: 1,
                  prodPrice: item.prodRetailPrice,
                  funcProdId: item.funcProdId,
                  hotelProdId: item.hotelProdId
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
    //选择商品
    selectProd(val) {
      let prodInfo = this.prodList.find(item => item.id == val);
      this.FunProdData.prodName = prodInfo.prodName;
      this.FunProdData.prodShowName = prodInfo.prodShowName;
      this.FunProdData.prodCount = prodInfo.prodCount;
      this.FunProdData.prodPrice = prodInfo.prodPrice;
      this.FunProdData.funcProdId = prodInfo.funcProdId;
      this.FunProdData.hotelProdId = prodInfo.hotelProdId;
      this.getProdSpecList(prodInfo.funcProdId);
    },
    //获取商品规格
    getProdSpecList(funcProdId) {
      const params = {
        funcProdId: funcProdId
      };
      this.$api
        .funcProdSpecsList(params)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.length != 0) {
              this.specList = result.data.map(item => {
                return {
                  id: item.id,
                  specName: item.specName
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
    //移除
    functionProdDelete(val) {
      this.prodFormData.functionProdList.splice(val, 1);
    },
    //确认修改
    EnsureModify(prodFormData) {
      if (this.prodFormData.functionProdList.length == 0) {
        this.$message.error("商品列表不能为空！");
        return false;
      }
      let modifyProdData = this.prodFormData.functionProdList.map(item => {
        return {
          id: item.id,
          prodCode: item.prodCode,
          prodCount: item.prodCount,
          prodPrice: item.prodPrice,
          funcProdId: item.funcProdId,
          funcProdSpecId: item.funcProdSpecId,
          hotelProdId: item.hotelProdId,
          prodCategoryId: item.prodCategoryId,
          funcId: this.funcId,
          hotelId: this.hotelId
        };
      });
      const params = {
        id: this.opId,
        orderDetailDTOList: modifyProdData
      };
      this.$refs[prodFormData].validate((valid, model) => {
        if (valid) {
          for (let i = 0; i < modifyProdData.length; i++) {
            if (modifyProdData[i].prodCount == 0) {
              this.$message.error("商品数量不能为0");
              return false;
            }
          }
          this.$api
            .HotelEatinOrderModify(params)
            .then(response => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("修改订单商品成功！");
                this.HotelOrderDetails();
                this.dialogProdVisible = false;
              } else {
                this.$message.error(result.msg);
                this.dialogProdVisible = false;
              }
            })
            .catch(error => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定"
              });
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__footer {
  text-align: center;
}
.el-date-editor.el-input {
  width: 100%;
}
.dividedialog {
  .el-dialog {
    height: 70%;
    overflow-y: scroll;
  }
  .InfoTitle {
    padding: 10px 0;
    border-bottom: 1px solid #d7d7d7;
  }
  .el-form-item__label {
    text-align: left;
  }
  .leftitle {
    width: 245px;
    display: inline-block;
    text-align: left;
  }
}
</style>

<style lang="less" scoped>
.platdeliverydetail {
  text-align: left;
  .title {
    font-weight: bold;
    clear: both;
  }
  .deliveryTable {
    font-size: 14px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    margin-right: 80px;
    margin-bottom: 50px;
    float: left;
    td {
      height: 30px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 0px 10px;
    }
    .subTitle {
      width: 80px;
      text-align: right;
      color: #909399;
    }
    .subcont {
      width: 260px;
    }
  }
  .formclass {
    text-align: left;
  }
  .required-icon {
    color: #ff3030;
  }
}
</style>


<!-- 旧版
<template>
    <div class="HotelOrderDetails">
        <div class="font-bt">订单商品详情</div>
        <ul class="HotelRevenueDetail-ul">
            <li>
                <div class="table-font1">订单状态</div>
                <div class="table-font2" v-if="detailList.orderStatus == 0">待支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 1">已支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 2">已取消</div>
            </li>
            <li>
                <div class="table-font1">订单编号</div>
                <div class="table-font2">{{detailList.orderCode}}</div>
            </li>
            <li>
                <div class="table-font1">商品总数</div>
                <div class="table-font2">{{detailList.prodCount}}</div>
            </li>
            <li>
                <div class="table-font1">商品金额</div>
                <div class="table-font2">{{detailList.totalAmount}}</div>
            </li>
            <li>
                <div class="table-font1">实付金额</div>
                <div class="table-font2">{{detailList.actualPay}}</div>
            </li>
            <li>
                <div class="table-font1">用户ID</div>
                <div class="table-font2">{{detailList.customerId}}</div>
            </li>
            <li>
                <div class="table-font1">用户昵称</div>
                <div class="table-font2">{{detailList.nickName}}</div>
            </li>
            <li>
                <div class="table-font1">联系人</div>
                <div class="table-font2">{{detailList.contactName}}</div>
            </li>
            <li>
                <div class="table-font1">手机号</div>
                <div class="table-font2">{{detailList.contactPhone}}</div>
            </li>
            <li>
                <div class="table-font1">下单时间</div>
                <div class="table-font2">{{detailList.createdAt}}</div>
            </li>
            <li>
                <div class="table-font1">客房配送留言</div>
                <div class="table-font2">{{detailList.roomDeliveryRemark}}</div>
            </li>
            <li>
                <div class="table-font1">快递到家留言</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li v-if="detailList.cancelType != 0">
                <div class="table-font1">取消类型</div>
                <div class="table-font2" v-if="detailList.cancelType == 1">手动取消</div>
                <div class="table-font2" v-else-if="detailList.cancelType == 2">自动取消</div>
            </li>
            <li v-if="detailList.orderStatus != 0">
                <div class="table-font1">取消时间</div>
                <div class="table-font2">{{detailList.cancelTime}}</div>
            </li>
        </ul>

        <el-table :data="orderProdDTOS" border style="width:100%;margin-bottom: 30px;" >
            <el-table-column prop="hotelProductDTO.prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="deliveryWay" label="配送方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == '1'">客房配送</span>
                    <span v-else-if="scope.row.deliveryWay == '2'">快递</span>
                </template>
            </el-table-column>
            <el-table-column prop="expressPerson" label="收件人" align=center></el-table-column>
            <el-table-column prop="expressPhone" label="手机号" align=center></el-table-column>
            <el-table-column prop="addressAll" label="地址" align=center></el-table-column>
            <el-table-column prop="" label="房间号" align=center>{{detailList.roomCode}}</el-table-column>
            <el-table-column prop="status" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">正常</span>
                    <span v-else-if="scope.row.status == 1">退款申请中</span>
                    <span v-else-if="scope.row.status == 2">已退款</span>
                    <span v-else-if="scope.row.status == 3">已申请售后</span>
                </template>
            </el-table-column>
            <el-table-column prop="refundTime" label="退款时间" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" align=center></el-table-column>
        </el-table>

        <div class="btnbox">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelOrderDetails',
    data(){
        return{
            detailList: {},
            orderProdDTOS: [],
            id: '',
            oprId: ''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        // this.oprId=localStorage.getItem('orgId');
        this.oprId = this.$route.params.orgId;
        this.HotelOrderDetails();
    },
    methods: {
        //订单商品详情
        HotelOrderDetails(){
            this.$api.HotelOrderDetails(this.id).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    this.detailList = result.data;
                    this.orderProdDTOS = result.data.orderProdDTOS;
                }else{
                    this.$message.error('酒店商城订单商品详情获取失败');
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //返回
        returnList(){
            this.$router.push({name: 'HotelOrderList'});
        }
    }
}
</script>

<style lang="less" scoped>
.HotelRevenueDetail-ul{
    width: 300px;
    border:1px solid #ccc;
    padding-left: 0;
    margin-bottom: 30px;
}
.HotelRevenueDetail-ul li{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
}
.HotelRevenueDetail-ul li:last-child{
    border-bottom: none;
}
.HotelRevenueDetail-ul li div{
    flex-grow: 1;
    width: 45%;
    line-height: 50px;
    padding-left: 5%;
    text-align: left;
    font-size: 14px;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #909399;
    font-weight: bold;
    border-right: 1px solid #ccc;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #606266;
}
.btnbox{
    text-align: left;
}
.font-bt{
    text-align: left;
    font-size: 25px;
    color: #000;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>
-->
