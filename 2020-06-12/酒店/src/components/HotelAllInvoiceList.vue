<template>
    <div class="commoditymanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="发票类别">
                <el-select v-model="inquireInvoiceSort" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="酒店房费发票" value="1"></el-option>
                    <el-option label="商品销售发票" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发票类型">
                <el-select v-model="inquireInvoiceType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="电子普通发票" value="1"></el-option>
                    <el-option label="增值税专用发票" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未开票" value="0"></el-option>
                    <el-option label="已申请" value="1"></el-option>
                    <el-option label="已处理" value="2"></el-option>
                    <el-option label="已撤销" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input v-model="inquireUserPhone"></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
                <el-date-picker
                    v-model="inquireSubmitTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="InvoiceDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="invCategory" label="发票类别">
                <template slot-scope="scope">
                    <span v-if="scope.row.invCategory == 1">酒店房费发票</span>
                    <span v-else-if="scope.row.invCategory == 2">商品销售发票</span>
                </template>
            </el-table-column>
            <el-table-column prop="invType" label="发票类型" width="120px">
                <template slot-scope="scope">
                    <span v-if="scope.row.invType == 1">电子普通发票</span>
                    <span v-else-if="scope.row.invType == 2">增值税专用发票</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="发票金额(元)" width="110px" align=center></el-table-column>
            <el-table-column prop="mobile" label="用户手机号" width="110px" align=center></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">未开票</span>
                    <span v-else-if="scope.row.status == 1">已申请</span>
                    <span v-else-if="scope.row.status == 2">已处理</span>
                    <span v-else-if="scope.row.status == 3">已撤销</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="提交时间" width="160px" align=center></el-table-column>
            <!-- <el-table-column prop="lastUpdatedAt" label="处理时间" width="160px" align=center></el-table-column>
            <el-table-column prop="invHead" label="开票单位" width="120px" align=center></el-table-column> -->
            <el-table-column fixed="right" label="操作" width="140px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 1 && authzData['F:BH_FIN_INVOICE_DEAL']" type="text" size="small" @click="allInvoiceProdDetail(scope.row.id)">处理</el-button>
                    <el-button v-if="scope.row.status != 1 && authzData['F:BH_FIN_INVOICE_VIEW']" type="text" size="small" @click="allInvoiceProdDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
import resetButton from './resetButton'
export default {
    name: 'HotelAllInvoiceList',
    components:{
        resetButton
    },
    data(){
        return {
            authzData: '',
            hotelId: '',
            inquireInvoiceSort: '',
            inquireInvoiceType: '',
            inquireStatus: '',
            inquireUserPhone: '',
            inquireSubmitTime: [],
            InvoiceDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.allInvoiceProdList();
    },
    methods: {
        resetFunc(){
            this.inquireInvoiceSort = ''
            this.inquireInvoiceType = ''
            this.inquireStatus = ''
            this.inquireUserPhone = ''
            this.inquireSubmitTime = []
            this.allInvoiceProdList();
        },
        //全部商品销售发票
        allInvoiceProdList(){
            if(this.inquireSubmitTime == null){
                this.inquireSubmitTime = [];
            }
            const params = {
                hotelId: this.hotelId,
                invCategory: this.inquireInvoiceSort,
                invType: this.inquireInvoiceType,
                status: this.inquireStatus,
                mobile: this.inquireUserPhone,
                createAtFrom: this.inquireSubmitTime[0],
                createAtTo: this.inquireSubmitTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.allInvoiceProdList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.InvoiceDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.allInvoiceProdList();
            this.$store.commit('setSearchList',{
                inquireInvoiceSort: this.inquireInvoiceSort,
                inquireInvoiceType: this.inquireInvoiceType,
                inquireStatus: this.inquireStatus,
                inquireUserPhone: this.inquireUserPhone,
                inquireSubmitTime:this.inquireSubmitTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.allInvoiceProdList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.allInvoiceProdList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.allInvoiceProdList();
        },
        //查看详情
        allInvoiceProdDetail(id){
            this.$router.push({name: 'HotelAllInvoiceDetail', query: {id}});
        }
    }
}
</script>

<style lang="less" scoped>
.commoditymanage{
    .pagination{
        margin-top: 20px;
    }
}
</style>
