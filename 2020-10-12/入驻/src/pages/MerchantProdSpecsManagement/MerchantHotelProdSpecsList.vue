<template>
    <div class="prodspecs">
        <el-form v-model="ProdDetailData" label-width="100px" class="commodityform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    :disabled="true"
                    v-model="ProdDetailData.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="hotelChange"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品" prop="prodCode">
                <el-select :disabled="true" v-model="ProdDetailData.prodCode" placeholder="请选择">
                    <el-option
                        v-for="item in prodList"
                        :key="item.id"
                        :label="item.prodName"
                        :value="item.id">
                    </el-option>
                </el-select>
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
            <el-form-item label="配送方式" prop="delivWayCodeList">
                <el-select :disabled="true" v-model="ProdDetailData.delivWays" multiple placeholder="请选择">
                    <el-option 
                        v-for="item in delivWayList" 
                        :key="item.id" 
                        :label="item.delivWayName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input :disabled="true" v-model="ProdDetailData.availableSaleQty"></el-input>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="hotelProdSpecsAdd">添加规格</el-button></div>
        <div><el-button class="addbutton" @click="hotelProdSpecsAllAdd">添加全部规格</el-button></div>
        <el-table :data="ProdSpecsDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="sort" label="排序" min-width="80px" align=center></el-table-column>
            <el-table-column label="规格图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.bannerImageUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="specName" label="规格" min-width="120px"></el-table-column>
            <el-table-column prop="showName" label="显示名称" min-width="120px"></el-table-column>
            <el-table-column prop="supplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="retailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="marketPrice" label="划线价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="hotelProdSpecsDetail(scope.row.id)">详情</el-button>
                    <el-button type="text" size="small" @click="hotelProdSpecsModify(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="hotelProdSpecsDelete(scope.row.id)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定要移除此商品规格吗？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="deleteConfirm">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisibleAllAdd" width="30%">
            <span>确定要添加全部商品规格吗？<br/>确定后将清除此酒店商品所有的规格并且复制商品规格</span>
            <span slot="footer">
                <el-button @click="dialogVisibleAllAdd=false">取消</el-button>
                <el-button type="primary" @click="allAddConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'MerchantHotelProdSpecsList',
    data(){
        return {
            authzData: '',
            hpId: '',
            loadingH: false,
            hotelList: [],
            commodityName: '',
            commodityCode: '',
            prodList: [],
            delivWayList: [],
            ProdDetailData: {},
            ProdSpecsDataList: [],
            hpsId: '',
            dialogVisibleDelete: false,
            dialogVisibleAllAdd: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hpId = this.$route.query.id;
        this.hotelCommodityDetail();
        this.getHotelList();
        this.basicDataItems();
        this.hotelProdSpecsList();
    },
    methods: {
        //获取配送方式 - 字典表
        basicDataItems(){
             const params = {
                key: 'DEVI',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.delivWayList = result.data.map(item => {
                                return{
                                    id: item.dictValue,
                                    delivWayName: item.dictName
                                }
                            })
                        }
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
        //获取酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
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
        remoteHotel(val){
            this.getHotelList(val);
        },
        hotelChange(){
            if(this.ProdDetailData.hotelId == ''){
                this.prodList = [];
            }else{
                this.ProdDetailData.prodName = '';
                this.getProdList(this.ProdDetailData.hotelId);
            }
        },
        //商品信息
        hotelCommodityDetail(){
            const params = {};
            this.$api.hotelCommodityDetail(params, this.hpId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ProdDetailData = result.data;
                        this.ProdDetailData.prodShowName = result.data.prodProductDTO.prodShowName;
                        this.ProdDetailData.prodKindName = result.data.prodProductDTO.prodKindName;
                        this.ProdDetailData.prodSupplName = result.data.prodProductDTO.prodSupplName;
                        this.ProdDetailData.prodWarrantyPeriod = result.data.prodProductDTO.prodWarrantyPeriod;
                        this.ProdDetailData.prodUnitMeasure = result.data.prodProductDTO.prodUnitMeasure;
                        this.ProdDetailData.prodSupplyPrice = result.data.prodProductDTO.prodSupplyPrice;
                        this.ProdDetailData.prodRetailPrice = result.data.prodProductDTO.prodRetailPrice;
                        this.ProdDetailData.prodAdvisePrice = result.data.prodProductDTO.prodAdvisePrice;
                        this.commodityName = result.data.prodProductDTO.prodName;
                        this.commodityCode = result.data.prodProductDTO.prodCode;
                        this.getProdList(result.data.hotelId);
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
        //获取商品列表
        getProdList(value){
            const params = {
                hotelId: value
            };
            // console.log(params);
            this.$api.hotelPlatCommodityUnused(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.prodList = result.data.map(item => {
                            return {
                                id: item.prodCode,
                                prodName: item.prodName
                            }
                        });
                        const prodAdd = {
                            id: this.commodityCode,
                            prodName: this.commodityName
                        };
                        this.prodList.push(prodAdd);
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
        //酒店商品规格列表
        hotelProdSpecsList(){
           const params = {
                hotelProdId: this.hpId
            };
            // console.log(params);
            this.$api.hotelProdSpecsList(params)
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
        //添加
        hotelProdSpecsAdd(){
            const hotelProdId = this.hpId;
            this.$router.push({name: 'MerchantHotelProdSpecsAdd', query: {hotelProdId}});
        },
        //添加全部
        hotelProdSpecsAllAdd(){
            this.dialogVisibleAllAdd = true;
        },
        //添加全部-确定
        allAddConfirm(){
            const params = {};
            this.$api.hotelProdSpecsAllAdd(params, this.hpId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('添加全部商品规格成功！');
                        this.dialogVisibleAllAdd = false;
                        this.hotelProdSpecsList();
                    }else{
                        this.$message.error(result.msg);
                        this.dialogVisibleAllAdd = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //详情
        hotelProdSpecsDetail(id){
            const hotelProdId = this.hpId;
            this.$router.push({name: 'MerchantHotelProdSpecsDetail', query: {id, hotelProdId}});
        },
        //修改
        hotelProdSpecsModify(id){
            const hotelProdId = this.hpId;
            this.$router.push({name: 'MerchantHotelProdSpecsModify', query: {id, hotelProdId}});
        },
        //移除
        hotelProdSpecsDelete(id){
            this.hpsId = id;
            this.dialogVisibleDelete = true;
        },
        //移除-确定
        deleteConfirm(){
            const params = {};
            this.$api.hotelProdSpecsDelete(params, this.hpsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('移除商品规格成功！');
                        this.dialogVisibleDelete = false;
                        this.hotelProdSpecsList();
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
