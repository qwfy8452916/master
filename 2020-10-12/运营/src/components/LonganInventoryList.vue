<template>
    <div class="inventorylist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-input v-model="inquireHotelName"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="inquireCommodityName"></el-input>
            </el-form-item>
            <el-form-item label="是否低于安全库存">
                <el-select v-model="inquireState">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="inventoryDataList" 
            border
            stripe 
            style="width:100%;"
            :row-class-name="noSafeClass">
            <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存数量" align=center></el-table-column>
            <el-table-column prop="prodAmount" label="实际库存数量" align=center></el-table-column>
            <el-table-column fixed="right" prop="isSafe" label="是否低于安全库存" align=center>
                <template slot-scope="scope">{{scope.row.isSafe >= '0' ?'否':'是'}}</template>
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
    name: 'LonganInventoryList',
    data(){
        return{
            encryptedOrgId: '',
            inquireHotelName: '',
            inquireCommodityName: '',
            inquireState: '0',
            inventoryDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        // this.encryptedOrgId = localStorage.getItem('orgId');
        this.encryptedOrgId = this.$route.params.orgId;
        this.inventoryList();
    },
    methods: {
        //库存列表
        inventoryList(){
            const params = {
                encryptedOrgId: this.encryptedOrgId,
                hotelName: this.inquireHotelName,
                prodName: this.inquireCommodityName,
                isSafe: this.inquireState,
                pageNo: this.pageNum,
                pageSize: 10,
            };
            // console.log(params);
            this.$api.inventoryList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.inventoryDataList = result.data.list;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('库存列表获取失败！');
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
            this.inventoryList();
        },
        //低库存状态-样式
        noSafeClass({row, rowIndex}){
            const noSafeState = row.isSafe; 
            if(noSafeState < 0){
                return 'noSafe'
            }else{
                return ''
            }
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.inventoryList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.inventoryList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.inventoryList();
        },
    },
}
</script>

<style>
.el-table .noSafe{
    color: #f00;
}
</style>

<style lang="less" scoped>
.inventorylist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

