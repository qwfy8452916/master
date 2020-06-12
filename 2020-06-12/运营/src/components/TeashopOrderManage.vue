<template>
    <div class="plateeliverylist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待支付" value="0"></el-option>
                    <el-option label="已支付" value="1"></el-option>
                    <el-option label="已取消" value="2"></el-option>
                    <el-option label="已发货" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="下单时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="OrderDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="orderCode" label="订单编号" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="实付金额" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户id" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户昵称"></el-table-column>
            <el-table-column prop="contactorPhone" label="手机号" width="120px" align=center></el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus == 0">待支付</span>
                    <span v-else-if="scope.row.orderStatus == 1">已支付</span>
                    <span v-else-if="scope.row.orderStatus == 2">已取消</span>
                    <span v-else-if="scope.row.orderStatus == 3">已发货</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="下单时间" width="160px" align=center></el-table-column>
            <el-table-column prop="payTime" label="支付时间" width="160px" align=center></el-table-column>
            <el-table-column prop="cancelTime" label="取消时间" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="140px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="scope.row.orderStatus == 1" @click="shipmentsOrder(scope.row.id)">发货</el-button>
                    <el-button type="text" size="small" @click="orderDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeashopOrderManage',
    data(){
        return {
            toId: '',
            inquirePhone: '',
            inquireStatus: '',
            inquireTime: [],
            OrderDataList: [],
            dislogVisibleShipments: false,
            shipmentsForm: {
                shipmentsTime: ''
            },
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
            isSubmit: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.teaOrderList();
    },
    methods: {
        //订单列表
        teaOrderList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                phone: this.inquirePhone,
                orderStatus: this.inquireStatus,
                startTime: this.inquireTime[0],
                endTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.teaOrderList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.OrderDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('订单列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //发货
        shipmentsOrder(id){
            this.toId = id;
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
                                this.teaOrderList();
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
        //查看详情
        orderDetail(id){
            this.$router.push({name: 'TeashopOrderDetail', query: {id}});
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.teaOrderList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.teaOrderList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.teaOrderList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.teaOrderList();
        },
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
.plateeliverylist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
