<template>
    <div class="commoditylist">
        <p class="title">管理柜子商品</p>
        <el-table :data="HotelCommodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="latticeCode" label="格子" width="100px" align=center></el-table-column>
            <el-table-column prop="oprProductDTO.productName" label="商品名称" align=center></el-table-column>
            <!-- <el-table-column prop="prodSafeCount" label="安全库存" width="140px" align=center></el-table-column> -->
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="ModifyHotelCommodity(scope.row.id)">修改</el-button>
                    <el-button v-if="scope.row.prodId > 0" type="text" size="small" @click="ClearHotelCommodity(scope.row.id)">清除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleClear" width="30%">
            <span>确定清除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleClear=false">取消</el-button>
                <el-button type="primary" @click="EnsureClear">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCabinetList',
    data(){
        return{
            HotelCommodityDataList: [],
            hotelId: '',
            cabinetId: '',
            dialogVisibleClear: false,
        }
    },
    mounted(){
        this.hotelId = this.$route.query.id;
        this.hotelCommodityList();
    },
    methods: {
        //酒店柜子商品列表
        hotelCommodityList(){
            const params = {
                hotelId: this.$route.query.id
            };
            // console.log(params);
            this.$api.hotelCabinetList(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == '0'){
                        this.HotelCommodityDataList = response.data.data;
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
        //修改
        ModifyHotelCommodity(id){
            // console.log(id,this.hotelId);
            const params = {};
            this.$api.hotelCabinetLimits(params,id)
                .then(response => {
                    // console.log(response);
                    if(response.data.data == true){
                        this.$router.push({name: 'LonganHotelCabinetModify', query: {id}, params: {hotelId: this.hotelId}});
                    }else{
                        this.$message.error('柜子商品不为空，不能修改！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //清除
        ClearHotelCommodity(id){
            this.cabinetId = id;
            const params = {};
            this.$api.hotelCabinetLimits(params,id)
                .then(response => {
                    // console.log(response);
                    if(response.data.data == true){
                        this.dialogVisibleClear = true;
                    }else{
                        this.$message.error('柜子商品不为空，不能清除！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })

        },
        EnsureClear(){
            const id = this.cabinetId;
            const params = {};
            this.$api.hotelCabinetClear(params,id)
                .then(response => {
                    // console.log(response);
                    if(response.data.data == true){
                        this.hotelCommodityList();
                        this.dialogVisibleClear = false;
                        this.$message.success('清除酒店商品成功！');
                    }else{
                        this.$message.error('清除酒店商品失败！');
                        this.dialogVisibleClear = false;
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
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
}
</style>
