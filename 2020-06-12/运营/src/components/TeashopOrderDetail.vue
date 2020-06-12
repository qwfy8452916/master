<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">订单状态</td>
                <td class="subcont">
                    <span v-if="orderDateDetail.orderStatus == 0">待支付</span>
                    <span v-else-if="orderDateDetail.orderStatus == 1">已支付</span>
                    <span v-else-if="orderDateDetail.orderStatus == 2">已取消</span>
                    <span v-else-if="orderDateDetail.orderStatus == 3">已发货</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">订单编号</td>
                <td class="subcont">{{orderDateDetail.orderCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品总数</td>
                <td class="subcont">{{orderDateDetail.prodCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{orderDateDetail.totalAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户id</td>
                <td class="subcont">{{orderDateDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{orderDateDetail.nickName}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{orderDateDetail.contactorName}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{orderDateDetail.contactorPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">收货地址</td>
                <td class="subcont">{{orderDateDetail.contactorAddress}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderDateDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{orderDateDetail.remark}}</td>
            </tr>
            <tr v-if="orderDateDetail.orderStatus == 1 || orderDateDetail.orderStatus == 3">
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{orderDateDetail.payTime}}</td>
            </tr>
            <tr v-if="orderDateDetail.orderStatus == 2">
                <td class="subTitle">取消时间</td>
                <td class="subcont">{{orderDateDetail.cancelTime}}</td>
            </tr>
            <tr v-if="orderDateDetail.orderStatus == 3">
                <td class="subTitle">物流公司</td>
                <td class="subcont">{{orderDateDetail.logisticCompany}}</td>
            </tr>
            <tr v-if="orderDateDetail.orderStatus == 3">
                <td class="subTitle">物流单号</td>
                <td class="subcont">{{orderDateDetail.logisticCode}}</td>
            </tr>
            <tr v-if="orderDateDetail.orderStatus == 3">
                <td class="subTitle">发货时间</td>
                <td class="subcont">{{orderDateDetail.deliveryTime}}</td>
            </tr>
        </table>
        <el-table :data="orderDateDetail.orderProds" border style="width:76%;">
            <el-table-column prop="prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="prodPrice" label="商品单价(元)" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额(元)" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
        <el-button type="primary" v-if="orderDateDetail.orderStatus == 1" @click="shipmentsOrder">发货</el-button>
        <el-dialog title="发货" :visible.sync="dislogVisibleShipments" width="30%">
            <el-form :model="shipmentsForm" :rules="rules" ref="shipmentsForm" label-width="80px">
                <el-form-item label="物流公司" prop="logisticsCompany">
                    <el-input v-model.trim="shipmentsForm.logisticsCompany"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="trackingCode">
                    <el-input v-model="shipmentsForm.trackingCode"></el-input>
                </el-form-item>
                <el-form-item label="发货时间" prop="shipmentsTime">
                    <el-date-picker
                        v-model="shipmentsForm.shipmentsTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleShipments = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="EnsureReset('shipmentsForm')">发 货</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'TeashopOrderDetail',
    data(){
        return {
            toId: '',
            orderDateDetail: [],
            dislogVisibleShipments: false,
            shipmentsForm: {},
            rules: {
                logisticsCompany: [
                    {required: true, message: '请填写物流公司', trigger: 'blur'},
                    {min: 1, max: 20, message: '物流公司请保持在20个字符以内', trigger: ['blur','change']}
                ],
                trackingCode: [
                    {required: true, message: '请填写快递单号', trigger: 'blur'},
                    {min: 1, max: 30, message: '快递单号请保持在30个字符以内', trigger: ['blur','change']}
                ],
                shipmentsTime: [
                    {required: true, message: '请选择发货时间', trigger: 'change'},
                ]
            },
            isSubmit: false
        }
    },
    mounted(){
        this.toId = this.$route.query.id;
        this.teaOrderDetail();
    },
    methods: {
        //获取订单详情
        teaOrderDetail(){
            const params = {};
            const id = this.toId;
            this.$api.teaOrderDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderDateDetail = result.data;
                    }else{
                        this.$message.error('订单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //发货
        shipmentsOrder(){
            this.dislogVisibleShipments = true;
        },
        EnsureReset(shipmentsForm){
            const params = {
                logisticCompany: this.shipmentsForm.logisticsCompany,
                logisticCode: this.shipmentsForm.trackingCode,
                deliveryTime: this.shipmentsForm.shipmentsTime,
            };
            const id = this.toId;
            // console.log(params);
            this.$refs[shipmentsForm].validate((valid) => {
                if(valid){
                    this.isSubmit = true;
                    this.$api.shipmentsTeaOrder(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('订单发货成功！');
                                this.dislogVisibleShipments = false;
                                this.isSubmit = false;
                                this.teaOrderDetail();
                            }else{
                                this.$message.error('订单发货失败！');
                                this.dislogVisibleShipments = false;
                                this.isSubmit = false;
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
            this.$router.push({name: 'TeashopOrderManage'});
        }
    }
}
</script>

<style scoped>
.el-dialog__footer{
    text-align: center;
}
.el-date-editor.el-input{
    width: 100%;
}
</style>

<style lang="less" scoped>
.platdeliverydetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .deliveryTable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        margin-right: 80px;
        margin-bottom: 50px;
        float: left;
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
            width: 240px;
        }
    }
}
</style>

