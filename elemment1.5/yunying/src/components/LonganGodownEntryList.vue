<template>
    <div class="inventorylist">
        <el-form :inline="true" align=left>
            <el-form-item label="入库单id">
                <el-input v-model="inquireGodownEntryId"></el-input>
            </el-form-item>
            <el-form-item label="收货日期">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireState">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="待审核" value="1"></el-option>
                    <el-option label="驳回" value="2"></el-option>
                    <el-option label="通过" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-input v-model="inquireHotelName"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称">
                <el-input v-model="inquireSupplierName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="godownEntryDataList" 
            border 
            style="width:100%;">
            <el-table-column fixed prop="invInCode" label="入库单id" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="supplName" label="供应商名称" align=center></el-table-column>
            <el-table-column prop="receiveAt" label="收货日期" width="160px" align=center></el-table-column>
            <el-table-column prop="empName" label="操作人姓名" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="isApproved" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isApproved == '0'">待审核</span>
                    <span v-else>{{scope.row.isApproved == '2' ?'通过':'驳回'}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isApproved == '0'" type="text" size="small" @click="godownEntryAudit(scope.row.id)">审核</el-button>
                    <el-button v-else type="text" size="small" @click="godownEntryDetail(scope.row.id)">查看</el-button>
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
export default {
    name: 'LonganGodownEntryList',
    data(){
        return{
            encryptedOrgId: '',
            inquireGodownEntryId: '',
            inquireTime: [],
            inquireHotelName: '',
            inquireSupplierName: '',
            inquireState: '',
            godownEntryDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        this.encryptedOrgId = localStorage.getItem('orgId');
        this.godownEntryList();
    },
    methods: {
        //入库单列表
        godownEntryList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.encryptedOrgId,
                invInCode: this.inquireGodownEntryId,
                purchaseAtStart: this.inquireTime[0],
                purchaseAtEnd: this.inquireTime[1],
                hotelName: this.inquireHotelName,
                supplName: this.inquireSupplierName,
                approvedStatus: this.inquireState,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.godownEntryList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDataList = result.data.list;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('入库单列表获取失败！');
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
            this.godownEntryList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.godownEntryList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.godownEntryList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.godownEntryList();
        },
        //审核
        godownEntryAudit(id){
            this.$router.push({name: 'LonganGodownEntryAudit', query: {id}});
        },
        //查看
        godownEntryDetail(id){
            this.$router.push({name: 'LonganGodownEntryDetail', query: {id}});
        }
    },
}
</script>

<style lang="less" scoped>
.inventorylist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

