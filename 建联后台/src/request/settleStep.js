export default {
    curStep: 4,
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
          STATUS_SLAVE_ORDER_CREATED: "已发布",
          STATUS_SLAVE_ORDER_CREATED: "待重新发布"
        },
        description: "分公司",
        icon: "step-icon iconfont icon-ziyuan",
        id: 1,
        process_desc: "已提交",
        status: "STATUS_SLAVE_ORDER_CREATED",
        title: "分公司"
      },
      {
        all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "已确认" },
        description: "供应商",
        icon: "step-icon iconfont icon-renyuanguanli",
        id: 2,
        process_desc: "已通过",
        status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
        title: "供应商"
      },
      {
        all_status: {
          STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "已确认",
          STATUS_BRANCH_CONFIRM_REJECT: "已驳回"
        },
        description: "",
        icon: "step-icon iconfont icon-Shapecopy",
        id: 8,
        process_desc: "已完成",
        status: "",
        title: "已完成"
      }
    ]
}