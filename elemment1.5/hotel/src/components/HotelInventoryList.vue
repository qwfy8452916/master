<template>
    <div class="inventorylist">
        <el-form :inline="true" align=left>
            <el-form-item label="商品名称">
                <el-input v-model="inquireCommodityName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="HotelInventoryDataList" border style="width:100%;" >
            <el-table-column fixed prop="hotelProdCode" label="id" width="80px" align=center></el-table-column>
            <el-table-column prop="productName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodAmount" label="库存数量" align=center></el-table-column>
            <el-table-column prop="cabInvAmt" label="柜子商品数量" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="warehousingDetail(scope.row.prodId)">入库明细</el-button>
                    <el-button type="text" size="small" @click="salesDetail(scope.row.prodId)">销售明细</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'HotelInventoryList',
    data(){
        return{
            encryptedOrgId: '',
            inquireCommodityName: '',
            HotelInventoryDataList: [],
        }
    },
    mounted(){
        this.encryptedOrgId = localStorage.getItem('orgId');
        this.inventoryList();
    },
    methods: {
        //库存列表
        inventoryList(){
            const params = {
                encryptedOrgId: this.encryptedOrgId,
                prodName: this.inquireCommodityName
            };
            // console.log(params);
            this.$api.inventoryList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelInventoryDataList = result.data.list;
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
            this.inventoryList();
        },
        //入库明细
        warehousingDetail(id){
            this.$router.push({name: 'HotelInventoryWarehousing', query: {id}});
        },
        //销售明细
        salesDetail(id){
            this.$router.push({name: 'HotelInventorySales', query: {id}});
        }
    }
}
</script>

<style lang="less" scoped>

</style>

