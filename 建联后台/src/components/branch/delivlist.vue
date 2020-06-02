<template>
  <div class="purorderdetail">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
      <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
      <el-tab-pane
        label="供货单列表"
        name="supplyList"
        v-if="authzData['F:CM_BORDER_BORDER_DETAIL_DELIVERY']"
      ></el-tab-pane>
      <el-tab-pane
        label="结算单列表"
        name="settleList"
        v-if="authzData['F:CM_BORDER_BORDER_DETAIL_SETTLE']"
      ></el-tab-pane>
      <el-tab-pane label="付款单列表" name="paylist" v-if="authzData['F:CM_BORDER_BORDER_DETAIL_PAYMENT']"></el-tab-pane>
    </el-tabs>
    <div class="left" v-if="status!=3">
      <el-button
        type="primary"
        @click="supplyList()"
        v-if="authzData['F:CM_BDELIVERY_BDELIVERY_CREATE']"
        class="btn-bg top"
      >创建供货单</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width:100%;">
      <el-table-column fixed prop="delivNum" label="供货号" align="center"></el-table-column>
      <el-table-column prop label="产品名" align="center">
        <template slot-scope="{row}">
          <p v-for="(item, index) in row.delivDetailDTOList" :key="index">{{item.productName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="delivDetailDTOList[0].productNum" label="数量" align="center">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.delivDetailDTOList" :key="index">{{item.productNum}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sendAt" label="发货日期" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.sendAt==='1970-01-01 00:00:00' ? '-' : scope.row.sendAt }}</template>
      </el-table-column>
      <el-table-column prop="receiveAt" label="收货日期" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.receiveAt==='1970-01-01 00:00:00' ? '-' : scope.row.receiveAt }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.status===1 ? "待发货":(scope.row.status===2?"待收货":"已完成") }}</template>
      </el-table-column>
      <el-table-column fixed="right" prop label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==2">
            <el-button
              type="text"
              size="small"
              @click="confirmdeliv(scope.row.delivDetailDTOList[0].delivId)"
              v-if="authzData['F:CM_BDELIVERY_BDELIVERY_ACCEPT']"
              class="edit-text"
            >确认收货</el-button>
            <el-button
              type="text"
              size="small"
              @click="checkdetail(scope.row.delivDetailDTOList[0].delivId)"
              v-if="authzData['F:CM_BDELIVERY_BDELIVERY_DETAIL']"
              class="check-text"
            >查看详情</el-button>
          </div>
          <div v-else>
            <el-button
              type="text"
              size="small"
              @click="checkdetail(scope.row.delivDetailDTOList[0].delivId)"
              v-if="authzData['F:CM_BDELIVERY_BDELIVERY_DETAIL']"
              class="check-text"
            >查看详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination top">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="11"
        :page-size="pageSize"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="current"
        @prev-click="prev"
        @next-click="next"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible1" width="55%">
      <h2 class="align-left">报价参考</h2>
      <div class="align-left hangitem">
        <span>报价参考方式:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏,苏州市</span>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">*计划收货时间：（须当前时间两日后）</span>
        <el-date-picker
          v-model="receiveTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="align-left">
        <h5 class="align-left inline-block">参数详情</h5>
        <el-button
          class="btn-bg"
          type="primary"
          @click.prevent="AddLine"
          style="display:block;width:120px;height:32px;line-height:10px;"
        >新增一栏</el-button>
      </div>
      <el-table
        :data="tableData1"
        border
        stripe
        style="width:1000px;margin-bottom:30px;margin-top:30px"
      >
        <el-table-column fixed prop="productName" label="产品名" align="center">
          <template slot-scope="scope" style="border:none;background-color:#fff;">
            <el-input v-model="scope.row.productName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productNum" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productUnit"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productSpec"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productDesc"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productRemark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData1)"
              type="text"
              size="small"
              class="check-text"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="cancel">取消</el-button>
      <el-button
        class="marginleft15 btn-mid"
        type="primary"
        @click="ensureCreate()"
        v-if="authzData['F:CM_BDELIVERY_BDELIVERY_CREATE_APPROVE']"
      >确定</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogCreate" width="20%" top="30vh">
      <span>是否确认发布？</span>
      <span slot="footer">
        <el-button @click="dialogCreate=false">取消</el-button>
        <el-button
          type="primary"
          @click.native.prevent="createSupList()"
          v-if="authzData['F:CM_BDELIVERY_BDELIVERY_CREATE_APPROVE_SUBMIT']"
        >确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="dialogVisible" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <h2 class="align-left">报价参考</h2>
      <div class="align-left hangitem">
        <span>报价参考方式:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏,苏州市</span>
      </div>

      <div class="align-left hangitem">
        <span class="hangitemtitle">*计划收货时间：</span>
        <el-date-picker
          v-model="detailData.scheduledReceiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :disabled="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem" v-if="detailData.logisticsInfo!=''">
        <span class="hangitemtitle">物流信息：</span>
        <input class="inputshuru" type="text" v-model="detailData.logisticsInfo" :disabled="true" />
      </div>
      <div class="align-left hangitem" v-if="detailData.logisticsVoucher!=''">
        <span class="hangitemtitle">物流凭证：</span>
        <div class="filese">{{detailData.logisticsVoucher}}</div>
      </div>
      <div class="align-left hangitem" v-if="detailData.receiveAt!=''">
        <span class="hangitemtitle">*收货时间：</span>
        <el-date-picker
          v-model="detailData.receiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :disabled="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem" v-if="detailData.receiveVoucher!=''">
        <span class="hangitemtitle">*收货凭证：</span>
        <!-- <div v-for="item in attachments" :key="item.path" v-if="attachments.length > 0 ">
                    <a target="_blank" :href="item.path" download="download" class="downloadA">{{item.original_name}}</a>
        </div>-->
        <div class="filese">{{detailData.receiveVoucher}}</div>
      </div>

      <h5 class="align-left">参数详情</h5>
      <el-table
        :data="tableData2"
        border
        stripe
        style="width:100%; margin-bottom:30px;"
        :row-style="{height:'40px'}"
      >
        <el-table-column fixed prop="productName" label="产品名" align="center"></el-table-column>
        <el-table-column prop="productNum" label="数量" align="center"></el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center"></el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center"></el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center"></el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center"></el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="detailback">返回</el-button>
    </el-dialog>
    <el-dialog title="确认收货" :visible.sync="dialogVisible2" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <div class="align-left hangitem">
        <span>报价参考:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏省,苏州市</span>
      </div>

      <div class="align-left hangitem">
        <span class="hangitemtitle">*计划收货时间：</span>
        <el-date-picker
          v-model="detailData.scheduledReceiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :disabled="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">物流信息：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.logisticsInfo" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">物流凭证：</span>
        <div class="filese">{{detailData.logisticsVoucher}}</div>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">*收货时间：</span>
        <el-date-picker
          v-model="detailData.receiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <!-- <div v-for="item in attachments" :key="item.path" v-if="attachments.length > 0 ">
                    <a target="_blank" :href="item.path" download="download" class="downloadA">{{item.original_name}}</a>
        </div>-->
        <el-upload
          class="upload-demo"
          :action="this.$api.upload_file_url"
          name="fileContent"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          multiple
          list-type="picture"
          :file-list="fileList"
        >
          <span class="hangitemtitle">*上传收货凭证：</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <h5 class="align-left">参数详情</h5>
      <el-table :data="tableData2" border stripe style="width:100%;margin-bottom:30px;">
        <el-table-column fixed prop="productName" label="产品名" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productName" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productNum" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productUnit" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productSpec" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productDesc" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productRemark" :readonly="true"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="back">返回</el-button>
      <el-button
        class="marginleft15 btn-mid"
        type="primary"
        @click="ensuredeliv()"
        v-if="authzData['F:CM_BDELIVERY_BDELIVERY_ACCEPT_APPROVE']"
      >确认收货</el-button>
    </el-dialog>
    <!-- 图片弹框预览 -->
    <el-dialog title="查看图片" :visible.sync="imgVisible" width="60%">
      <div>
        <img :src="imgurl" style="margin: 0 auto;display: inherit;width: 100%" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import stepBar from "@/components/public/stepBar";
import attachmentList from "@/components/public/attachmentList";
export default {
  name: "delivlist",
  data() {
    return {
      authzData: {},
      id: "",
      pageSize: 10,
      pageTotal: 1, //默认总条数
      pageNum: 1, //实际当前页码
      currentPage: 1, //默认当前页码
      tableData: null,
      checkid: "",
      dialogVisible: false,
      title: "确认收货",
      judge: true,
      tableData2: [],
      tableData1: [],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogCreate: false,
      receiveTime: "",
      detailData: {},
      stepData: {
        curStep: 1,
        operateData: [
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:34:15",
          //   approver: "",
          //   demand_status: "STATUS_SLAVE_ORDER_CREATED",
          //   demander: "test1991",
          //   duration: "--",
          //   log: "分公司创建批次订单",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:34:14"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:36:11",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
          //   demander: "test1991",
          //   duration: "0天0时1分",
          //   log: "供应商确认批次订单货价量",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:36:11"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:39:15",
          //   approver: "test1991",
          //   demand_status: "STATUS_BRANCH_CONFIRM",
          //   demander: "test713",
          //   duration: "0天0时3分",
          //   log: "分公司确认批次订单价量",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:39:15"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:40:01",
          //   approver: "test913",
          //   demand_status: "STATUS_PAID_TO_ZHUNIU",
          //   demander: "test1991",
          //   duration: "0天0时0分",
          //   log: "集团财务部成功支付批次订单到筑牛",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:40:01"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:40:51",
          //   approver: "筑牛",
          //   demand_status: "STATUS_PAID_TO_SUPPLIER",
          //   demander: "test913",
          //   duration: "0天0时0分",
          //   log: "筑牛支付到供应商",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:40:51"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:41:37",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_CONFIRM_RECEIVER_MONEY",
          //   demander: "筑牛",
          //   duration: "0天0时0分",
          //   log: "供应商确认收款",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:41:37"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:41:57",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_SEND_GOODS",
          //   demander: "test713",
          //   duration: "0天0时0分",
          //   log: "供应商发货",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:41:57"
          // },
          // {
          //   approveStatus: "已完成",
          //   approveTime: "2019-04-18 13:42:47",
          //   approver: "test1991",
          //   demand_status: "STATUS_BRANCH_SIGN",
          //   demander: "test713",
          //   duration: "0天0时0分",
          //   log: "分公司确认收货",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:42:47"
          // }
        ],
        steps: [
          {
            all_status: {
              STATUS_SLAVE_ORDER_CREATED: "已提交"
            },
            icon: "step-icon iconfont icon-ziyuan",
            id: 1,
            process_desc: "已提交",
            status: "STATUS_SLAVE_ORDER_CREATED",
            title: "分公司"
          },
          {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待发货" },
            icon: "step-icon iconfont icon-renyuanguanli",
            id: 2,
            process_desc: "待发货",
            status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
            title: "供应商"
          },

          {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待收货" },
            icon: "step-icon iconfont icon-ziyuan",
            id: 7,
            process_desc: "待收货",
            status: "FINISHED",
            title: "分公司"
          },
          {
            all_status: {
              STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "订单完成"
            },
            description: "",
            icon: "step-icon iconfont icon-Shapecopy",
            id: 8,
            process_desc: "订单完成",
            status: "",
            title: "订单完成"
          }
        ]
      },
      receiveAt: "",
      fileList: [],
      reciveUrl: "",
      //图片弹窗
      imgVisible: false,
      imgurl: "",
      exampleFold: true,
      unfoldBtnDiv: false,
      uploadPercentage: 0,
      uploadProgressVisible: false,
      attachments: [
        // {
        //     business_id: 635,
        //     business_type: "SLAVE_ORDER_SIGN_PROOF",
        //     created_at: "2019-04-18 13:42:45",
        //     id: 1757,
        //     original_name: "19273_dowater.doc",
        //     path: "http://src.zhuniu.com/zhuniu/purchasers/order/0398da6805ecc0e6e1eea59d72f8015b.doc",
        //     updated_at: "2019-04-18 13:42:45"
        // }
      ],
      confirmGoods: [],
      status: "",
      activeName: "supplyList"
    };
  },
  created() {
    if (this.$route.params) {
      this.checkid = this.$route.params.id;
      this.status = this.$route.params.status;
    }
    this.getSupList();
    this.authzData = this.$store.state.authData;
  },
  components: {
    stepBar,
    attachmentList
  },
  methods: {
    // 导航栏跳转
    handleClick(tab, event) {
      switch (tab.index) {
        case "0":
          this.orderdetail();
          break;
        case "1":
          this.delivlist();
          break;
        case "2":
          this.settlelist();
          break;
        case "3":
          this.paylist();
          break;
        default:
      }
    },
    detailback() {
      this.dialogVisible = false;
    },
    // 导航切换
    settlelist() {
      let id = this.checkid;
      this.$router.push({ name: "settlelist", params: { id: id } });
    },
    // 付款单
    paylist() {
      let id = this.checkid;
      this.$router.push({ name: "paylist", params: { id: id } });
    },
    //取消创建供货单
    cancel() {
      this.tableData1 = [];
      this.dialogVisible1 = false;
    },
    //取消确认收货
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
    //确认发布
    ensureCreate() {
      this.dialogCreate = true;
    },
    //创建供货单
    supplyList() {
      this.dialogVisible1 = true;
    },
    //确定创建供货单
    createSupList() {
      let that = this;
      const params = {
        orderId: that.checkid,
        scheduledReceiveAt: that.receiveTime,
        delivDetailDTOList: that.tableData1
      };
      // if (that.newLine.productName == "") {
      //   this.$message("请输入产品名");
      //   return false;
      // }
      // if (that.newLine.productNum == "") {
      //   this.$message("请输入产品数量");
      //   return false;
      // }
      // if (that.newLine.productUnit == "") {
      //   this.$message("请输入单位");
      //   return false;
      // }
      // if (that.newLine.productSpec == "") {
      //   this.$message("请输入规格");
      //   return false;
      // }
      // if (that.newLine.productDesc == "") {
      //   this.$message("请输入产品说明");
      //   return false;
      // }
      // if (that.newLine.productRemark == "") {
      //   this.$message("请输入备注");
      //   return false;
      // }

      that.$api
        .createSupList(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogCreate = false;
            that.dialogVisible1 = false;
            this.tableData1 = [];
            this.$message.success("新增供货单成功！");
            this.getSupList();
          } else {
            this.dialogCreate = false;
            that.dialogVisible1 = false;
            0;
            this.$message.error("新增供货单失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //删除行
    deleteRow(index, rows) {
      if (rows.length == 1) {
        return;
      }
      rows.splice(index, 1);
      console.log(this.tableData1);
    },
    //新增行
    AddLine() {
      let newLine = {
        productName: "",
        productSpec: "",
        productNum: "",
        productUnit: "",
        productRemark: "",
        productDesc: ""
      };
      this.tableData1.push(newLine);
    },
    //导航栏切换
    orderdetail() {
      let id = this.checkid;
      this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
    },
    //确认收货
    confirmdeliv(delivId) {
      this.id = delivId;
      const params = {};
      const id = this.id;
      this.$api.getDetail(params, id).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.dialogVisible2 = true;
          this.detailData = result.data;
          this.stepData.curStep = this.detailData.status + 2;
          this.tableData2 = result.data.delivDetailDTOList;
          if (this.detailData.logisticsVoucher != "") {
            this.detailData.logisticsVoucher =
              this.$api.img_url + this.detailData.logisticsVoucher;
          }
          if (this.detailData.receiveVoucher != "") {
            this.detailData.receiveVoucher =
              this.$api.img_url + this.detailData.receiveVoucher;
          }
          if (this.detailData.receiveAt == "1970-01-01 00:00:00") {
            this.detailData.receiveAt = "";
          }
        }
      });
    },
    //确定确认收货
    ensuredeliv() {
      const id = this.id;
      const params = {
        delivNum: this.detailData.delivNum,
        delivOrderNum: this.detailData.delivOrderNum,
        isReceived: this.detailData.isReceived,
        isSended: this.detailData.isSended,
        logisticsInfo: this.detailData.logisticsInfo,
        logisticsVoucher: this.detailData.logisticsVoucher,
        orderId: this.detailData.orderId,
        receiveAt: this.detailData.receiveAt,
        receiveVoucher: this.reciveUrl,
        scheduledReceiveAt: this.detailData.scheduledReceiveAt,
        sendAt: this.detailData.sendAt,
        settStatus: this.detailData.settStatus,
        status: this.detailData.status,
        delivDetailDTOList: this.tableData2
      };
      if(this.reciveUrl.length<0){
        this.$message('请上传收货凭证');
        return false;
      }
      this.$api
        .confirmdeliv(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogVisible2 = false;
            this.tableData = [];
            this.$message.success("确认收货成功！");
            this.getSupList();
          } else {
            this.$alert(result.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //上传图片
    handleSuccess(response, file, fileList) {
      const image = {
        name: response.data,
        url: file.url
      };
      this.fileList.push(image);
      this.fileList.map(item => {
        this.reciveUrl = item.name;
      });
    },
    handleRemove(file, fileList) {
      this.fileList = fileList.map((item, index) => {
        return {
          name: item.name,
          url: item.url
        };
      });
    },
    handlePreview(file) {
      let that = this;
      that.imgVisible = true;
      that.imgurl = file.url;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //查看详情
    checkdetail(delivId) {
      const params = {};
      const id = delivId;
      let that = this;
      this.$api
        .getDetail(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogVisible = true;
            this.detailData = result.data;
            that.stepData.curStep = this.detailData.status + 2;
            if (this.detailData.logisticsVoucher != "") {
              this.detailData.logisticsVoucher =
                this.$api.img_url + this.detailData.logisticsVoucher;
            }
            if (this.detailData.receiveVoucher != "") {
              this.detailData.receiveVoucher =
                this.$api.img_url + this.detailData.receiveVoucher;
            }

            this.tableData2 = result.data.delivDetailDTOList;
            if (this.detailData.receiveAt == "1970-01-01 00:00:00") {
              this.detailData.receiveAt = "";
            }
          } else {
            this.$alert(result.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取数据
    getSupList() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        orderId: that.checkid
      };
      this.$api
        .getSupList(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.tableData = result.data.records;
            // console.log(that.tableData2);
            that.pageTotal = result.data.total;
          } else {
            that.$message.error("获取供货单失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    current() {
      this.pageNum = this.currentPage;
      this.getSupList();
    },
    //上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.getSupList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.getSupList();
    }
  }
};
</script>

<style lang="less">
.purorderdetail {
  .navtab {
    text-align: left;
    overflow: hidden;
    margin-bottom: 35px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .left {
    text-align: left;
    margin-bottom: 10px;
  }
  .wrapniu {
    overflow: hidden;
    text-align: right;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__header {
    background: #2793f4;
    text-align: left !important;
    display: none;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-collapse-item__header {
    text-align: left;
  }

  .marginleft15 {
    margin-left: 15px;
  }
  .returnwrap {
    .el-dialog--center .el-dialog__body {
      padding-bottom: 0 !important;
    }
  }
  // .el-table__body td {
  //   padding: 0;
  //   .cell {
  //     padding: 0;
  //   }
  // }

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

