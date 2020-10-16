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
                <td
                    class="subcont"
                    colspan="7"
                >
                    <span v-if="orderDelivDataDetail.orderStatus == 0">待支付</span>
                    <span v-else-if="orderDelivDataDetail.orderStatus == 1">已支付</span>
                    <span v-else-if="orderDelivDataDetail.orderStatus == 2">已取消</span>
                    <span v-else-if="orderDelivDataDetail.orderStatus == 3">部分退款</span>
                    <span v-else-if="orderDelivDataDetail.orderStatus == 4">全部退款</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">订单号</td>
                <td class="subcont">{{orderDelivDataDetail.orderCode}}</td>
                <td class="subTitle">用户ID</td>
                <td class="subcont">{{orderDelivDataDetail.customerId}}</td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{orderDelivDataDetail.payCompleteTime}}</td>
                <!-- <td class="subTitle">补货费</td>
                <td class="subcont"></td> -->
                <!-- <td class="subTitle">外部物流状态</td>
                <td class="subcont"></td> -->
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderDelivDataDetail.hotelName}}</td>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{orderDelivDataDetail.nickName}}</td>
                <td class="subTitle">现场送留言</td>
                <td class="subcont">{{orderDelivDataDetail.roomDeliveryRemark}}</td>
                <!-- <td class="subTitle">配送服务费</td>
                <td class="subcont"></td> -->
                <!-- <td class="subTitle">外部物流</td>
                <td class="subcont"></td> -->
            </tr>
            <tr>
                <td class="subTitle">区域</td>
                <td class="subcont">{{orderDelivDataDetail.roomFloor}}</td>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{orderDelivDataDetail.contactName}}</td>
                <td class="subTitle">快递送留言</td>
                <td class="subcont">{{orderDelivDataDetail.expressRemark}}</td>
                <!-- <td class="subTitle">快递费</td>
                <td class="subcont">{{orderDelivDataDetail.expressFee}}</td> -->
                <!-- <td class="subTitle">实收费用</td>
                <td class="subcont"></td> -->
            </tr>
            <tr>
                <td class="subTitle">地点</td>
                <td class="subcont">{{orderDelivDataDetail.roomCode}}</td>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{orderDelivDataDetail.contactPhone}}</td>
                <td class="subTitle">快递费</td>
                <td class="subcont">{{orderDelivDataDetail.expressFee}}</td>
                <!-- <td class="subTitle">支付通道费</td>
                <td class="subcont">{{orderDelivDataDetail.payChannelFee}}</td> -->
                <!-- <td class="subTitle">实扣费用</td>
                <td class="subcont"></td> -->
            </tr>
            <tr>
                <td class="subTitle">商品总数</td>
                <td class="subcont">{{orderDelivDataDetail.prodCount}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderDelivDataDetail.payTime}}</td>
                <td class="subTitle">支付通道费</td>
                <td
                    class="subcont"
                    v-if="orderDelivDataDetail.payChannelFee"
                >{{orderDelivDataDetail.payChannelFee.toFixed(2)}}</td>
                <!-- <td class="subTitle">送达时间</td>
                <td class="subcont"></td> -->
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{orderDelivDataDetail.totalAmount}}</td>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{orderDelivDataDetail.actualPay}}</td>
                <td class="subTitle"></td>
                <td class="subcont"></td>
                <!-- <td class="subTitle"></td>
                <td class="subcont"></td> -->
            </tr>
        </table>
        <p class="title">配送详情</p>
        <el-table
            :data="orderDelivDataDetail.orderDeliveryDTOS"
            border
            style="width:100%;"
        >
            <el-table-column
                fixed
                prop=""
                label="流水号"
                min-width="100px"
                align=center
            ></el-table-column>
            <el-table-column
                label="配送方式"
                align=center
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
                prop="funcName"
                label="功能区"
                min-width="120px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomFloor"
                label="区域"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomCode"
                label="地点"
                align=center
            ></el-table-column>
            <el-table-column
                prop="prodOrgKindName"
                label="类型"
                align=center
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.prodOwnerOrgKind == 2">平台商品</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 3">自营商品</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 5">入驻商品</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="prodOwner"
                label="商家"
                min-width="180px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="prodCount"
                label="商品总数"
                align=center
            ></el-table-column>
            <el-table-column
                prop="totalAmount"
                label="商品金额"
                align=center
            ></el-table-column>
            <el-table-column
                prop="couponAmount"
                label="优惠金额"
                min-width="100px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="discountAmount"
                label="减免金额"
                min-width="100px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="actualPay"
                label="实付金额"
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
                    <span v-else-if="scope.row.status == 2">已配送</span>
                    <span v-else-if="scope.row.status == 3">部分退款</span>
                    <span v-else-if="scope.row.status == 4">全部退款</span>
                    <span v-else-if="scope.row.status == 5">已收货</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="confirmPeople"
                label="确认人"
                align=center
            ></el-table-column>
            <el-table-column
                prop="confirmTime"
                label="确认时间"
                min-width="160px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="shipmentsTime"
                label="发货时间"
                min-width="160px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="logistics"
                label="物流公司"
            ></el-table-column>
            <el-table-column
                prop="logisticsCode"
                label="物流单号"
                align=center
            ></el-table-column>
            <el-table-column
                prop=""
                label="外卖配送"
                align=center
            ></el-table-column>
            <el-table-column
                prop=""
                label="外卖状态"
                align=center
            ></el-table-column>
            <el-table-column
                v-if="authzlist['F:BO_ORDER_ORDER_DELIV_VIEW']"
                fixed="right"
                label="操作"
                align=center
                width="200px"
            >
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="details(scope.row.id)"
                    >详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br /><br />
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
  name: "LonganOrderDeliveryDetails",
  data() {
    return {
      authzlist: {}, //权限数据
      opId: "",
      orderDelivDataDetail: [],
      divideDetailData: {},
      divideDetaildialog: false
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
    this.opId = this.$route.query.id;
    this.orderDeliveryDetail();
  },
  methods: {
    //订单配送详情
    orderDeliveryDetail() {
      const params = {};
      const id = this.opId;
      this.$api
        .orderDeliveryDetail(params, id)
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.orderDelivDataDetail = result.data;
          } else {
            this.$message.error("商品详情获取失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },

    //返回
    returnList() {
      this.$router.push({ name: "LonganOrderList" });
    },
    //查看详情
    details(id) {
      this.$router.push({
        name: "LonganPlatDeliveryDetail",
        query: { id, source: "1" }
      });
    }
  }
};
</script>

<style lang="less">
.platdeliverydetail {
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
      width: 140px;
      text-align: right;
      color: #909399;
    }
    .subcont {
      width: 240px;
    }
  }
  .dividebli {
    margin-left: 30px;
    color: #999;
  }
}
</style>


<!-- 旧版
<template>
    <div class="LonganOrderDeliveryDetails">
        <div class="font-bt">订单配送详情</div>
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
                <div class="table-font1">酒店名称</div>
                <div class="table-font2">{{detailList.hotelName}}</div>
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
        </ul>

        <el-table :data="orderProdDTOS" border style="width:100%;margin-bottom: 30px;" >
            <el-table-column prop="prodOwnerOrgKind" label="类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.prodOwnerOrgKind == 1">平台</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 2">运营商</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 3">酒店</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 4">供应商</span>
                    <span v-else-if="scope.row.prodOwnerOrgKind == 5">入驻商家</span>
                </template>
            </el-table-column>
            <el-table-column prop="shopName" label="商家" align=center></el-table-column>
            <el-table-column prop="prodQuantity" label="商品总数" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品金额" align=center></el-table-column>
            <el-table-column prop="actualAmount" label="实付金额" align=center></el-table-column>
            <el-table-column prop="delivStatus" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.delivStatus == 0">待确认</span>
                    <span v-else-if="scope.row.delivStatus == 1">已确认</span>
                    <span v-else-if="scope.row.delivStatus == 2">已发货</span>
                    <span v-else-if="scope.row.delivStatus == 3">已退款</span>
                </template>
            </el-table-column>
            <el-table-column prop="confirmPeople" label="确认人" align=center></el-table-column>
            <el-table-column prop="confirmAt" label="确认时间" align=center></el-table-column>
            <el-table-column prop="shipmentsAt" label="发货时间" align=center></el-table-column>
            <el-table-column prop="logistics" label="物流公司" align=center></el-table-column>
            <el-table-column prop="logisticsCode" label="物流单号" align=center></el-table-column>
            <el-table-column v-if="authzData['F:BO_ORDER_ORDER_DELIV_VIEW']" prop="" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="details(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="btnbox">
            <el-button @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganOrderDeliveryDetails',
    data(){
        return{
            authzData: '',
            detailList: {},
            orderProdDTOS: [],
            id: '',
            oprId: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.id = this.$route.query.id;
        // this.oprId=localStorage.getItem('orgId');
        // this.oprId = this.$route.params.orgId;
        this.LonganOrderProductDetails();
        this.LonganOrderDeliveryDetails();
    },
    methods: {
        //订单详情
        LonganOrderProductDetails(){
            this.$api.LonganOrderProductDetails(this.id).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    this.detailList = result.data;
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
        //订单配送详情
        LonganOrderDeliveryDetails(){
            const params = {
                choose : 2,
                // encryptedOrgId : this.oprId,
                orgAs: 2,
                hshopOrderId : this.id
            };
            this.$api.LonganOrderDeliveryDetails(params).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    this.orderProdDTOS = result.data;
                }else{
                    this.$message.error('酒店商城订单配送详情获取失败');
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
            this.$router.push({name: 'LonganOrderList'});
        },
        //查看详情
        details(id){
            this.$router.push({name: 'LonganPlatDeliveryDetail', query: {id,source:'1'}});
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
