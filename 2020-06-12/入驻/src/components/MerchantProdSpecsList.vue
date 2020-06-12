<template>
    <div class="prodspecs">
        <el-form v-model="ProdDetailData" label-width="100px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input :disabled="true" v-model="ProdDetailData.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input :disabled="true" v-model="ProdDetailData.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="ProdDetailData.prodCode"></el-input>
            </el-form-item>
            <el-form-item label="商品形式" prop="prodType">
                <el-select :disabled="true" v-model="ProdDetailData.prodType" placeholder="请选择">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="电子" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="ProdDetailData.prodType==2" label="卡券选择" prop="vouBatchName">
                <el-input :disabled="true" v-model="ProdDetailData.vouBatchName"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="prodWarrantyPeriod">
                <el-input :disabled="true" v-model="ProdDetailData.prodWarrantyPeriod"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input :disabled="true" v-model="ProdDetailData.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input :disabled="true" v-model="ProdDetailData.prodSupplyPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input :disabled="true" v-model="ProdDetailData.prodRetailPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="">
                <el-input :disabled="true" v-model="ProdDetailData.prodAdvisePrice"></el-input> 元
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="prodSpecsAdd">新增规格</el-button></div>
        <el-table :data="ProdSpecsDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="sort" label="排序" min-width="80px" align=center></el-table-column>
            <el-table-column label="规格图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.bannerImageUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="specName" label="规格名称" min-width="120px"></el-table-column>
            <el-table-column prop="supplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="retailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="marketPrice" label="划线价" min-width="80px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="prodSpecsDetail(scope.row.id)">详情</el-button>
                    <el-button type="text" size="small" @click="prodSpecsModify(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="prodSpecsDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定要删除此规格吗？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="deleteConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'MerchantProdSpecsList',
    data(){
        return {
            authzData: '',
            pId: '',
            ProdDetailData: {},
            ProdSpecsDataList: [],
            psId: '',
            dialogVisibleDelete: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.pId = this.$route.query.id;
        this.ownCommodityDetail();
        this.prodSpecsList();
    },
    methods: {
        //商品信息
        ownCommodityDetail(){
            const params = {};
            this.$api.ownCommodityDetail(params, this.pId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ProdDetailData = result.data;
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
        //规格列表
        prodSpecsList(){
           const params = {
                prodId: this.pId
            };
            // console.log(params);
            this.$api.prodSpecsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ProdSpecsDataList = result.data;
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
        //新增
        prodSpecsAdd(){
            const prodId = this.pId;
            this.$router.push({name: 'MerchantProdSpecsAdd', query: {prodId}});
        },
        //详情
        prodSpecsDetail(id){
            this.$router.push({name: 'MerchantProdSpecsDetail', query: {id}});
        },
        //修改
        prodSpecsModify(id){
            this.$router.push({name: 'MerchantProdSpecsModify', query: {id}});
        },
        //删除
        prodSpecsDelete(id){
            this.psId = id;
            this.dialogVisibleDelete = true;
        },
        //删除-确定
        deleteConfirm(){
            const params = {};
            this.$api.prodSpecsDelete(params, this.psId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('规格删除成功！');
                        this.dialogVisibleDelete = false;
                        this.prodSpecsList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
    }
}
</script>

<style scoped>
.el-input{
    width: 82%;
}
.el-select{
    width: 82%;
}
.el-textarea{
    width: 82%;
}
</style>

<style lang="less" scoped>
.prodspecs{
    text-align: left;
    .commodityform{
        width: 45%;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>
