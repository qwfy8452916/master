<template>
    <div class="commoditylist">
        <p class="title">酒店商品管理</p>
        <el-table :data="HotelCommodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="" label="格子" width="100px" align=center></el-table-column>
            <el-table-column prop="" label="商品名称" align=center></el-table-column>
            <el-table-column prop="" label="安全库存" width="150px" align=center></el-table-column>
            <el-table-column prop="" label="最高采购价" width="140px" align=center></el-table-column>
            <el-table-column prop="" label="建议零售价" width="140px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="ModifyHotelCommodity(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="ClearHotelCommodity(scope.row.id)">清除</el-button>
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
    name: 'LonganHotelCommodityList',
    data(){
        return{
            HotelCommodityDataList: [],
            hotelId: '',
            dialogVisibleClear: false,
        }
    },
    mounted(){
        this.hotelId = this.$route.query.id;
        console.log(this.hotelId);
    },
    methods: {
        //酒店商品列表
        hotelCommodityList(){
            const params = {};
            // console.log(params);
            this.$api.hotelCommodityList(params)
                .then(response => {
                    console.log(response);
                    // if(response.data.code == '0'){
                    //     this.HotelCommodityDataList = response.data.data.records;
                    // }else{
                    //     this.$message.error('酒店商品列表获取失败！');
                    // }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //修改
        ModifyHotelCommodity(id){
            this.$router.push({name: 'LonganHotelCommodityModify', query: {id}});
        },
        //清除
        ClearHotelCommodity(id){
            this.hotelId = id;
            this.dialogVisibleClear = true;
        },
        EnsureClear(){
            const id = this.hotelId;
            const params = {};
            this.$api.ClearHotelCommodity(params,id)
                .then(response => {
                    console.log(response);
                    // if(response.data.code == '0'){
                    //     this.$message.success('清除酒店商品成功！');
                    //     this.dialogVisibleClear = false;
                    //     this.hotelList();

                    // }else{
                    //     this.$message.error('清除酒店商品失败！');
                    //     this.dialogVisibleClear = false;
                    // }
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
