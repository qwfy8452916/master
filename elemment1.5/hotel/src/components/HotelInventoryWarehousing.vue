<template>
    <div class="warehousingdetail">
        <p class="title">入库明细</p>
        <el-form :inline="true" align=left>
            <el-form-item label="添加时间">
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
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="InventoryWarehousingDataList" border style="width:100%;" >
            <el-table-column fixed prop="detailCode" label="id" width="80px" align=center></el-table-column>
            <el-table-column prop="productName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column prop="prodRemark" label="备注" align=center></el-table-column>
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
    name: 'HotelInventoryWarehousing',
    data(){
        return{
            encryptedHotelOrgId: '',
            id: '',      //商品id
            inquireTime: [],
            InventoryWarehousingDataList: [],
            pageTotal: 1,     //总条目数
            currentPage: 1,   //当前页数
            pageNum: 1,
        }
    },
    mounted(){
        this.encryptedHotelOrgId = localStorage.getItem('orgId');
        this.id = this.$route.query.id;
        this.warehousingList();
    },
    methods: {
        //列表
        warehousingList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedHotelOrgId: this.encryptedHotelOrgId,
                prodId: this.id,
                createAtStart: this.inquireTime[0],
                createAtEnd: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10,
            };
            this.$api.warehousingList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.InventoryWarehousingDataList = result.data.list;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('入库明细获取失败！');
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
            this.warehousingList();
        },
        //跳转
        current(){
            this.pageNum = this.currentPage;
            this.warehousingList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.warehousingList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.warehousingList();
        }
    },
}
</script>

<style lang="less" scoped>
.warehousingdetail{
    .title{
        font-weight: bold;
        text-align: left;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>
