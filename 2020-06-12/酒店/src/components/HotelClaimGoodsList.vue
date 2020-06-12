<template>
    <div class="claimgoodslist">
        <el-form :inline="true" align=left>
            <el-form-item label="房间号">
                <el-input v-model="inquireRoomNumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="HotelClaimGoodsDataList"
            border 
            style="width:100%;" >
            <el-table-column prop="roomFloor" label="楼层" width="120px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" width="120px" align=center></el-table-column>
            <el-table-column prop="prodTotal" label="柜子商品统计" align=center></el-table-column>
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
    name: 'HotelClaimGoodsList',
    data(){
        return {
            orgId: '',
            inquireRoomNumber: '',
            inquireCabinetId: '',
            HotelClaimGoodsDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        this.orgId = this.$route.params.orgId;
        this.getClaimGoodsList();
    },
    methods: {
        //获取取货单列表
        getClaimGoodsList(){
            const params = {
                encryptedOrgId: this.orgId,
                roomCode: this.inquireRoomNumber,
                cabReplaceStatus: '2',
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.getClaimGoodsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        // this.HotelClaimGoodsDataList = result.data.records;
                        this.HotelClaimGoodsDataList = result.data.records.map(item => {
                            item.prodTotal = item.cabLatticeDTOS.map(subitem => {
                                return subitem.originalProdName + '、'
                            })
                            return item
                        });
                        this.pageTotal = result.data.total;
                    }else{
                        that.$message.error('获取取货单列表失败！');
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
            this.getClaimGoodsList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.getClaimGoodsList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getClaimGoodsList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getClaimGoodsList();
        }
    }
}
</script>

<style lang="less" scoped>
.claimgoodslist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
