<template>
  <div class="purorderdetail">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
            <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
            <el-tab-pane label="供货单列表" name="supplyList" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_DELIVERY']"></el-tab-pane>
            <el-tab-pane label="结算单列表" name="settleList" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_SETTLE']"></el-tab-pane>
            <el-tab-pane label="付款单列表" name="paylist" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_PAYMENT']"></el-tab-pane>
    </el-tabs>
    <ul class="align-left orderxq">
      <li>
        <span>状态：</span>
        <span
        style="color:#FF9700 !important"
        >{{tableData.status===1?"履约中":(tableData.status===2?"关闭中":"已关闭")}}</span>
      </li>
      <li>
        <span>订单号：</span>
        <span>{{tableData.id}}</span>
      </li>
      <li>
        <span>订单生成时间：</span>
        <span>{{dateToString(tableData.createdAt)}}</span>
      </li>
      <li>
        <span>申请关闭原因：</span>
        <span>{{tableData.closeReason}}</span>
      </li>
      <li>
        <span>项目名称：</span>
        <span>{{tableData.projectName}}</span>
      </li>
      <li>
        <span>项目编码：</span>
        <span>{{tableData.projectNo}}</span>
      </li>
    </ul>

    <h3 class="align-left">产品信息</h3>
    <ul class="align-left orderxq">
      <li>
        <div class="hanginline">
          <span>产品名：</span>
          <span>{{tableData.productName}}</span>
        </div>
        <div class="hanginline inlineleft">
          <span>单位：</span>
          <span>{{tableData.purchaseUnit}}</span>
        </div>
      </li>
      <li>
        <div class="hanginline">
          <span>品牌：</span>
          <span>{{tableData.productBrand}}</span>
        </div>
        <div class="hanginline inlineleft">
          <span>规格：</span>
          <span>{{tableData.productSpec}}</span>
        </div>
      </li>
      <li>
        <div class="hanginline">
          <span>数量：</span>
          <span>{{tableData.purchaseNum}}</span>
        </div>
      </li>
    </ul>
    <h3 class="align-left">收货信息</h3>
    <ul class="align-left orderxq">
      <li>
        <span>收货人：</span>
        <span>{{tableData.shippingInspector}}</span>
      </li>
      <li>
        <span>收货人手机号：</span>
        <span>{{tableData.shippingInspectorMobile}}</span>
      </li>
      <li>
        <span>收货人身份证：</span>
        <span>{{tableData.shippingInspectorIdentityCard}}</span>
      </li>
      <li>
        <span>收货地址：</span>
        <span>{{tableData.shippingAddr}}</span>
      </li>
    </ul>
    <h4 class="align-left">报价信息</h4>
    <table class="baojiatable" width="600" style="background-color:#FAFAFA">
      <thead>
        <th style="width:25%">供应商名</th>
        <th style="width:25%">报价时间</th>
        <th style="width:25%;border-bottom:0 !important;">结算方式</th>
        <th style="width:25%;border-bottom:0 !important;">价格</th>
      </thead>
      <tbody>
        <tr>
          <td>{{tableData.supplierEntName}}</td>
          <td>{{dateToString(tableData.tenderTime)}}</td>
          <td colspan="2" style="border:0 !important;vertical-align:text-top;">
            <table class="tableqian" style="width:100%;">
              <tbody>
                <tr v-for="(item,key) in baojiadata" :key="key">
                  <td
                    class="jiesuantd"
                    style="width:50%;border-left:0 !important;"
                  >{{item.settleTypeName}}</td>
                  <td class="baojiatd" style="width:50%;border-right:0 !important;">{{item.offer}}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Purorderdetail",
  data() {
    return {
      tableData: {}, //数据
      baojiadata: [], //报价信息
      title: "查看详情",
      judge: true,
      checkid: "",
      dataAuth:{
          
      },
       activeName: 'Purorderdetail'
    };
  },
  created() {
    this.dataAuth = this.$store.state.authData;

    if (this.$route.params) {
      this.checkid = this.$route.params.id;
    }
    this.Getdata();
  },
  methods: {
     //导航栏切换
    handleClick(tab, event) {
      switch(tab.index){
      case '1':
      this.delivlist();
      break;
      case '2':
      this.settlelist();
      break;
      case '3':
      this.paylist();
      break;
      default:
      }
    },
   //供货单跳转
    delivlist() {
      let id = this.checkid;
      this.$router.push({path:"/group/delivlist/"+id})
    },
    // 付款单列表跳转
    paylist() {
      let id = this.checkid;
      this.$router.push({path:"/group/paylist/"+id})
    },
    settlelist() {
      let id = this.checkid;
      this.$router.push({path:"/group/settlelist/"+id})
    },
    //获取数据
    Getdata: function() {
      let that = this;
      let params = {};
      that.$api
        .purorderdetail({ params }, that.checkid)
        .then(response => {
          let result = response.data;
          if (result.code == 0) {
            that.tableData = result.data;
            that.baojiadata = result.data.offerSettleDTO;
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(function(error) {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
            callback: action => {
              // that.canClick = !that.canClick;
            }
          });
        });
    }
  }
};
</script>

<style lang="less">
.purorderdetail {
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__header {
    background: #2793f4;
    text-align: left !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-collapse-item__header {
    text-align: left;
  }
}
</style>


<style lang="less" scoped>
.purorderdetail {
  .navtab {
    text-align: left;
    overflow: hidden;
    margin-bottom: 35px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .orderxq {
    font-size: 14px;
    li {
      margin-bottom: 10px;
      overflow: hidden;
      .hanginline {
        display: inline-block;
        float: left;
      }
      .inlineleft {
        margin-left: 100px;
      }
    }
  }
  .baojiatable,
  .baojiatable th,
  .baojiatable tr td {
    border: 1px solid #797979 !important;
    border-collapse: collapse;
    padding: 0 !important;
  }
  .baojiatable th {
    background: #409eff !important;
    color: #fff;
  }
  .tableqian {
    border-collapse: collapse;
    padding: 0;
  }
  .tableqian th,
  .tableqian tr td {
    border: 1px solid #797979 !important;
    border-collapse: collapse;
    padding: 0 !important;
  }
  .tableqian tr td.jiesuantd {
    border-bottom: 0 !important;
  }
  .tableqian tr td.baojiatd {
    border-bottom: 0 !important;
  }

  .colorful {
    height: 30px;
    line-height: 30px;
    padding: 0 1%;
    text-align: center;
    margin-top: -20px;
    .color {
      float: right;
      width: 80px;
      color: #333;
      font-size: 8px;
      .colorful1 {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: #aaa;
        margin-right: 5%;
        border-radius: 20%;
      }
      .colorful2 {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: #d82a2a;
        margin-right: 5%;
        border-radius: 20%;
      }
      .colorful3 {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: #1482e5;
        margin-right: 5%;
        border-radius: 20%;
      }
      .colorful4 {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: #78c04c;
        margin-right: 5%;
        border-radius: 20%;
      }
    }
  }
  .zn-steps {
    position: relative;
    list-style: none;
    display: flex;
    padding-left: 0;
    color: #999;
    width: 100%;
    margin-top: 0;
    li {
      display: inline-block;
      overflow: hidden;
      float: left;
      list-style: none;
      .parentdiv {
        display: inline-block;
        float: left;
        .step-icon-wrapper {
          width: 50px;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 50%;
          display: inline-block;
          .step-icon-div {
            padding-top: 5px;
          }
        }
        .step-title {
          padding-top: 5px;
          color: #333;
        }
        .step-icon-content {
          .step-icon-div {
            padding-top: 5px;
          }
        }
      }
      .stepxianwrap {
        display: inline-block;
        width: 100px;
        float: left;
        height: 76px;
        padding: 0 5px;
        box-sizing: border-box;
        .release {
          font-size: 12px;
          padding-top: 8px;
          padding-bottom: 5px;
          height: 12px;
        }
        .xiantiao {
          height: 1px;
          width: 100%;
          background: #5ab225;
        }
      }

      .step-success {
        color: #5ab225 !important;
        border-color: #5ab225 !important;
      }
    }
  }
  .inputshuru {
    height: 30px;
    line-height: 30px;
    outline: none;
    width: 270px;
    border: 1px solid #d7d7d7;
    text-indent: 5px;
  }
  .hangitem {
    margin-bottom: 25px;
  }
  .hangitemtitle {
    display: inline-block;
    text-align: left;
  }
  .filese {
    color: #0000ff;
    margin-top: 5px;
  }
}
</style>
