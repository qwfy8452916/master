<template>
    <div class="commoditylist">
        <p class="title">管理柜子商品</p>
        <el-table :data="HotelCommodityDataList" border style="width:100%;" >
            <el-table-column fixed prop="sort" label="商品序号" width="100px" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="格子" width="100px" align=center></el-table-column>
            <el-table-column prop="product.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodCount" label="商品件数" width="140px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_CAB_PROD']" type="text" size="small" @click="ModifyHotelCommodity(scope.row.id)">更换商品</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_HOTEL_CAB_CLEAR'] && scope.row.prodCode" type="text" size="small" @click="ClearHotelCommodity(scope.row.id)">清除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="returnbtn">
            <el-button @click="returnFun">返回</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleClear" width="30%">
            <span>是否确认清除该商品？</span>
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
            authzData: '',
            hotelId: '',
            profileId: '',
            // orgId: '',
            HotelCommodityDataList: [],
            cabinetId: '',
            dialogVisibleClear: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = this.$route.params.orgId;
        this.hotelId = this.$route.query.hotelId;
        this.profileId = this.$route.query.id;
        this.hotelCommodityList();
    },
    methods: {
        //酒店柜子商品列表
        hotelCommodityList(){
            const params = {
                hotelId: this.hotelId,
                profileId: this.profileId,
            };
            // console.log(params);
            this.$api.hotelCabinetList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(response.data.code == '0'){
                        this.HotelCommodityDataList = result.data;
                    }else{
                        this.$message.error('柜子商品列表获取失败！');
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
            const profileId = this.profileId;
            this.$router.push({name: 'LonganHotelCabinetModify', query: {id, profileId}, params: {hotelId: this.hotelId}});
            // console.log(id,this.hotelId);
            // const params = {};
            // this.$api.hotelCabinetLimits(params,id)
            //     .then(response => {
            //         // console.log(response);
            //         if(response.data.data == true){
            //             // this.$router.push({name: 'LonganHotelCabinetModify', query: {id}, params: {orgId: this.orgId, hotelId: this.hotelId}});
            //             this.$router.push({name: 'LonganHotelCabinetModify', query: {id}, params: {hotelId: this.hotelId}});
            //         }else{
            //             this.$message.error('柜子商品不为空，不能修改！');
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        //清除
        ClearHotelCommodity(id){
            this.cabinetId = id;
            this.dialogVisibleClear = true;
            // const params = {};
            // this.$api.hotelCabinetLimits(params, id)
            //     .then(response => {
            //         // console.log(response);
            //         if(response.data.data == true){
            //             this.dialogVisibleClear = true;
            //         }else{
            //             this.$message.error('有柜子正在售卖该商品，不能清除！');
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        EnsureClear(){
            const id = this.cabinetId;
            const params = {};
            this.$api.hotelCabinetClear(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.data == true){
                        this.hotelCommodityList();
                        this.dialogVisibleClear = false;
                        this.$message.success('清除柜子商品成功！');
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleClear = false;
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //返回
        returnFun(){
            this.$router.push({name:'LonganMinibarProdList'});
        },
    }

}
</script>

<style lang="less" scoped>
.commoditylist{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .returnbtn{
        margin-top: 20px;
    }
}
</style>
