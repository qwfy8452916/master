<template>
    <div class="commoditylist">
        <p class="title">管理酒店商品</p>
        <div class="commodityadd"><el-button type="primary" @click="commodityAdd">添加商品</el-button></div>
        <el-table :data="HotelCommodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="productName" label="商品名称" width="150px" align=center></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" align=center></el-table-column>
            <el-table-column prop="priceMax" label="最高采购价(元)" align=center></el-table-column>
            <el-table-column prop="prodPurPrice" label="采购单价(元)" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价(元)" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="ModifyHotelCommodity(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="lookHistoryPrice(scope.row.prodId)">查看历史价格</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="" :visible.sync="dialogPriceVisible" width="38%">
            <el-table :data="priceData">
                <el-table-column property="startTime" label="开始时间" align=center></el-table-column>
                <el-table-column property="endTime" label="结束时间" align=center></el-table-column>
                <el-table-column property="purPrice" label="采购单价(元)" align=center></el-table-column>
                <el-table-column property="lastUpdatedByName" label="操作人" width="80px" align=center></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCommodityList',
    data(){
        return{
            encryptedOrgId: '',
            HotelCommodityDataList: [],
            hotelId: '',
            dialogPriceVisible: false,
            priceData: []
        }
    },
    mounted(){
        this.encryptedOrgId = localStorage.getItem('orgId');
        this.hotelId = this.$route.query.id;
        this.hotelCommodityList();
    },
    methods: {
        //酒店商品列表
        hotelCommodityList(){
            const params = {
                encryptedOrgId: this.encryptedOrgId,
                hotelId: this.hotelId
            };
            this.$api.hotelCommodityList(params)
                .then(response => {
                    const result = response.data;
                    // console.log(result);
                    if(result.code == '0'){
                        this.HotelCommodityDataList = result.data.list;
                    }else{
                        this.$message.error('酒店商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增
        commodityAdd(){
            const id = this.hotelId;
            this.$router.push({name: 'LonganHotelCommodityAdd', query: {id}});
        },
        //修改
        ModifyHotelCommodity(id){
            const hotelId = this.hotelId;
            this.$router.push({name: 'LonganHotelCommodityModify', query: {id}, params: {hotelId: hotelId}});
        },
        //查看历史价格
        lookHistoryPrice(id){
            const params = {
                hotelId: this.hotelId,
                prodId: id
            };
            // console.log(params);
            this.$api.lookHistoryPrice(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.priceData = result.data;
                        this.dialogPriceVisible = true;
                    }else{
                        this.$message.error('历史价格获取失败！');
                    }
                })
                .catch(error => {
                     this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        }
    }

}
</script>

<style lang="less" scoped>
.commoditylist{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityadd{
        float: left;
        margin-bottom: 10px;
    }
}
</style>
