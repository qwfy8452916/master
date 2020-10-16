<template>
    <div class="bookorderdetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="ordertable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont">
                    <!-- 开票状态（0：未开票，1：已申请，2：已处理，3：已撤销） -->
                    <span v-if="orderDataDetail.status == 0">待处理</span>    
                    <span v-else-if="orderDataDetail.status == 1">待处理</span>    
                    <span v-else-if="orderDataDetail.status == 2">已处理</span>    
                    <span v-else-if="orderDataDetail.status == 3">已撤销</span>    
                </td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderDataDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">发票类别</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.invCategory == 1">酒店房费发票</span>    
                    <span v-else-if="orderDataDetail.invCategory == 2">商品销售发票</span>
                </td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2">
                <td class="subTitle">发票类型</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.invType == 1">电子普通发票</span>    
                    <span v-else-if="orderDataDetail.invType == 2">增值税专用发票</span>
                </td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 1">
                <td class="subTitle">抬头类型</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.invHeadType == 1">企业</span>    
                    <span v-else-if="orderDataDetail.invHeadType == 2">个人</span>    
                </td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && (orderDataDetail.invHeadType == 1 || orderDataDetail.invType == 2)">
                <td class="subTitle">单位名称</td>
                <td class="subcont">{{orderDataDetail.invHead}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && (orderDataDetail.invHeadType == 1 || orderDataDetail.invType == 2)">
                <td class="subTitle">纳税人识别号</td>
                <td class="subcont">{{orderDataDetail.taxpayerId}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">注册地址</td>
                <td class="subcont">{{orderDataDetail.registrationAddr}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">注册电话</td>
                <td class="subcont">{{orderDataDetail.registrationMobile}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">开户银行</td>
                <td class="subcont">{{orderDataDetail.bank}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">银行账号</td>
                <td class="subcont">{{orderDataDetail.bankAccount}}</td>
            </tr>
            <!-- <tr v-if="orderDataDetail.invCategory == 1">
                <td class="subTitle">税率</td>
                <td class="subcont">{{orderDataDetail.roomInvoiceTaxRate}}</td>
            </tr> -->
            <tr>
                <td class="subTitle">发票金额(元)</td>
                <td class="subcont">{{orderDataDetail.amount}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户备注</td>
                <td class="subcont">{{orderDataDetail.remark}}</td>
            </tr>
            <!-- <tr v-if="orderDataDetail.invCategory == 1">
                <td class="subTitle">申请人</td>
                <td class="subcont">{{orderDataDetail.createdBy}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 1">
                <td class="subTitle">申请时间</td>
                <td class="subcont">{{orderDataDetail.createdAt}}</td>
            </tr> -->
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">用户姓名</td>
                <td class="subcont">{{orderDataDetail.addresseeName}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2">
                <td class="subTitle">用户手机</td>
                <td class="subcont">{{orderDataDetail.mobile}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType != 2">
                <td class="subTitle">电子邮箱</td>
                <td class="subcont">{{orderDataDetail.email}}</td>
            </tr>
            <tr v-if="orderDataDetail.invCategory == 2 && orderDataDetail.invType == 2">
                <td class="subTitle">发票地址</td>
                <td class="subcont">{{orderDataDetail.addresseeAddr}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 2">
                <td class="subTitle">处理人</td>
                <td class="subcont">{{orderDataDetail.handleBy}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 2">
                <td class="subTitle">处理时间</td>
                <td class="subcont">{{orderDataDetail.lastUpdatedAt}}</td>
            </tr>
            <tr v-if="orderDataDetail.status == 2">
                <td class="subTitle">处理备注</td>
                <td class="subcont">{{orderDataDetail.handleRemark}}</td>
            </tr>
        </table>
        <br/>
        <br/>
        <el-table :data="orderDataDetail.prodList" border style="width:88%;">
            <el-table-column prop="orderCode" label="订单号" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称"></el-table-column>
            <el-table-column prop="quantity" label="商品数量" align=center></el-table-column>
            <el-table-column prop="amount" label="实付金额" align=center></el-table-column>
            <el-table-column prop="taxRate" label="税率" align=center></el-table-column>
            <el-table-column prop="createdAt" label="支付时间" width="120px" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
        <el-button v-if="orderStatus == 1 && authzlist['F:BM_FIN_INVOICE_DEAL_SUBMIT']" type="primary" @click="waitInvoiceProdDeal">处理</el-button>
        <el-dialog title="是否确认已开票？" :visible.sync="dialogVisibleDeal" width="30%">
            <el-form :model="dealForm" :rules="dealRules" ref="dealForm" label-width="60px">
                <el-form-item label="备注" prop="dealRemark">
                    <el-input type="textarea" :rows="3" v-model.trim="dealForm.dealRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisibleDeal = false">取 消</el-button>
                <el-button type="primary" @click="ensureDeal('dealForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'MerchantAllInvoiceDetail',
    data(){
        return {
            authzlist: {}, //权限数据
            ipId: '',
            orderDataDetail: [],
            orderStatus: '0',
            dialogVisibleDeal: false,
            dealForm: {},
            dealRules: {
                dealRemark: [
                    {min: 1, max: 50, message: '备注请保持在50个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.ipId = this.$route.query.id;
        this.waitInvoiceProdDetail();
    },
    methods: {
        //获取订单详情
        waitInvoiceProdDetail(){
            const params = {};
            const id = this.ipId;
            this.$api.waitInvoiceProdDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderDataDetail = result.data;
                        this.orderStatus = result.data.status;
                    }else{
                        this.$message.error('待开票商品详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //处理
        waitInvoiceProdDeal(){
            this.dialogVisibleDeal = true;
        },
        ensureDeal(dealForm){
            const params = {
                handle_remark: this.dealForm.dealRemark
            };
            const id = this.ipId;
            this.$refs[dealForm].validate((valid) => {
                if(valid){
                    this.$api.waitInvoiceProdDeal(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('处理成功！');
                                this.dialogVisibleDeal = false;
                                this.waitInvoiceProdDetail();
                            }else{
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //返回
        returnList(){
            this.$router.push({name: 'MerchantAllInvoiceList'});
        }
    }
}
</script>

<style lang="less" scoped>
.bookorderdetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .ordertable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        td{
            height: 30px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0px 10px;
        }
        .subTitle{
            width: 100px;
            text-align: right;
            color: #909399;
        }
        .subcont{
            width: 360px;
        }
        .subspan{
            font-size: 12px;
            line-height: 24px;
            color: #909399;
        }
    }
}
</style>

