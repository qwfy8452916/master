<template>
    <div class="commodityadd">
        <el-form :model="CommodityDataModify" :rules="rules" ref="CommodityDataModify" label-width="120px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input :disabled="true" v-model="CommodityDataModify.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input :disabled="true" v-model="CommodityDataModify.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true"  v-model="CommodityDataModify.prodCode"></el-input>
            </el-form-item>
            <el-form-item label="商品形式" prop="prodType">
                <el-select :disabled="true" v-model="CommodityDataModify.prodType" placeholder="请选择">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="电子" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="CommodityDataModify.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select :disabled="true" v-model="CommodityDataModify.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保质期" prop="prodWarrantyPeriod">
                <el-input :disabled="true" class="inputtime" v-model.number="CommodityDataModify.prodWarrantyPeriod"></el-input>
                <el-select :disabled="true" class="selecttime" v-model="selectTimeType">
                    <el-option label="天" value="天"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input :disabled="true" v-model="CommodityDataModify.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input :disabled="true" v-model.trim="CommodityDataModify.prodSupplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input :disabled="true" v-model.trim="CommodityDataModify.prodRetailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input :disabled="true" v-model.trim="CommodityDataModify.prodMarketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="配送方式" prop="delivWays">
                <!-- <el-checkbox-group :disabled="isAbleModify" v-model="CommodityDataModify.delivWays" @change="selectDelivType">
                    <el-checkbox label="0">现场送</el-checkbox>
                    <el-checkbox label="1">快递送</el-checkbox>
                </el-checkbox-group> -->
                <el-select :disabled="true" v-model="CommodityDataModify.delivWays" multiple placeholder="请选择">
                    <el-option v-for="item in delivWayList" :key="item.id" :label="item.delivWayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isInvShow" prop="isNeedInv">
                <span slot="label"><label class="required-icon">*</label> 酒店库存</span>
                <!-- <el-radio-group v-model="CommodityDataModify.isNeedInv" @change="selectIsInv">
                    <el-radio :label="1">需要</el-radio>
                    <el-radio :label="0">不需要</el-radio>
                </el-radio-group> -->
                <el-switch :disabled="true" v-model="CommodityDataModify.isNeedInv"></el-switch>
            </el-form-item>
            <el-form-item v-if="isInvShow && isSafeInv" prop="prodSafeCount">
                <span slot="label"><label class="required-icon">*</label> 安全库存</span>
                <el-input :disabled="true" v-model.number="CommodityDataModify.prodSafeCount"></el-input>
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input :disabled="true" v-model.number="CommodityDataModify.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item v-if="isFreeShip" prop="isFreeShipping">
                <span slot="label"><label class="required-icon">*</label> 快递费</span>
                <!-- <el-radio-group v-model="CommodityDataModify.isFreeShipping">
                    <el-radio :label="1">包邮</el-radio>
                    <el-radio :label="0">不包邮</el-radio>
                </el-radio-group> -->
                <el-switch :disabled="true" v-model="CommodityDataModify.isFreeShipping"></el-switch>
                <span v-if="!CommodityDataModify.isFreeShipping">&nbsp;&nbsp;
                    <el-select :disabled="true" v-model="CommodityDataModify.expressFeeId" placeholder="请选择快递费模板" style="width:48%;">
                        <el-option 
                            v-for="item in expressFeeList" 
                            :key="item.id" 
                            :label="item.exFeeName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="hotelProdSpecsAdd">添加规格</el-button></div>
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
    </div>
</template>

<script>
export default {
    name: 'HotelOwnProdSpecsList',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var validatePriceReq = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var countReg = /^(0|\+?[1-9][0-9]*)$/
        var validateCount = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!countReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            authzlist: {}, //权限数据
            hotelId: '',
            hpId: '',
            isInvShow: false,
            isSafeInv: true,
            isFreeShip: false,
            isPickUp: false,
            headers: {},
            expressFeeList: [],
            couponList: [],
            delivWayList: [],
            CommodityDataModify: {
                prodName: '',
                prodMarketPrice: '',
                delivWays: [],
                prodSafeCount: '',
                isFreeShipping: '',
                expressFeeId: '',
                prodSupplyPrice: '',
                pickUpPointIds: []
            },
            isNativeProd: false,
            selectTimeType: '',
            rules: {
                prodName: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '商品名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                prodShowName: [
                    {required: true, message: '请输入显示名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '显示名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                prodType: [
                    {required: true, message: '请选择商品形式', trigger: 'change'}
                ],
                // vouBatchId: [
                //     {required: true, message: '请选择卡券', trigger: 'change'}
                // ],
                prodWarrantyPeriod: [
                    {required: true, message: '请输入保质期', trigger: 'blur'},
                    {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                prodUnitMeasure: [
                    {required: true, message: '请输入单位', trigger: 'blur'},
                    {min: 1, max: 10, message: '单位请保持在10个字符以内', trigger: ['blur','change']}
                ],
                // prodSupplName: [
                //     {required: true, message: '请输入供应商名称', trigger: 'blur'},
                //     {min: 1, max: 50, message: '供应商名称请保持在50个字符以内', trigger: ['blur','change']}
                // ],
                // isNeedInv: [
                //     {required: true, message: '请选择是否需要库存', trigger: 'change'},
                // ],
                prodSupplyPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodRetailPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodMarketPrice: [
                    {validator: validatePriceReq, trigger: ['blur','change']}
                ],
                prodSafeCount: [
                    // {required: true, message: '请输入安全库存', trigger: 'blur'},
                    // {min: 1, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                    {validator: validateCount, trigger: ['blur','change']}
                ],
                delivWays: [
                    {type: 'array', required: true, message: '请选择配送方式', trigger: 'change'},
                ],
                availableSaleQty: [
                    {required: true, message: '请输入可售数量', trigger: 'blur'},
                    {min: -999, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                funcId: [
                    {required: true, message: '请选择功能区', trigger: 'change'},
                ],
                // classifyIds: [
                //     {required: true, message: '请选择功能区分类', trigger: 'change'},
                // ],
            },
            ProdSpecsDataList: [],
            hpsId: '',
            dialogVisibleDelete: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = localStorage.getItem('hotelId');
        this.hpId = this.$route.query.id;
        this.ownCommodityDetail();
        this.getExpFeeList();
        this.getHotelCouponList();
        this.basicDataItems();
        this.hotelProdSpecsList();
    },
    methods: {
        //获取卡券列表
        getHotelCouponList(){
            const params = {};
            // console.log(params);
            this.$api.getHotelCouponList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.couponList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    couponName: item.vouName
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
        //获取快递费模板列表
        getExpFeeList(){
            this.$api.getExpressFee()
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.expressFeeList = result.data.map(item => {
                                return {
                                    id: item.id,
                                    exFeeName: item.modelName
                                }
                            });
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
        //transform 转换
        transformFunc(val) {
            if(val == 1){ return true }else{ return false }
        },
        //获取商品信息
        ownCommodityDetail(){
            const that = this;
            const params = {};
            const id = this.hpId;
            this.$api.ownCommodityDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataModify = {
                            prodName: result.data.prodProductDTO.prodName,
                            prodShowName: result.data.prodProductDTO.prodShowName,
                            prodCode: result.data.prodProductDTO.prodCode,
                            prodType: result.data.prodProductDTO.prodType,
                            vouBatchId: result.data.prodProductDTO.vouBatchId,
                            prodUnitMeasure: result.data.prodProductDTO.prodUnitMeasure,
                            prodSupplName: result.data.prodProductDTO.prodSupplName,
                            prodSupplyPrice: result.data.prodSupplyPrice,
                            prodRetailPrice: result.data.prodRetailPrice,
                            prodMarketPrice: result.data.prodMarketPrice,
                            delivWays: result.data.delivWays,
                            isNeedInv: this.transformFunc(result.data.isNeedInv),
                            prodSafeCount: result.data.prodSafeCount,
                            availableSaleQty: result.data.availableSaleQty,
                            isFreeShipping: this.transformFunc(result.data.isFreeShipping),
                            expressFeeId: result.data.expressFeeId,
                            pickUpPointIds: result.data.pickUpPointIds,
                            prodWarrantyPeriod: ''
                        };
                        //店内送
                        let dnsIndex = result.data.delivWays.indexOf("1");
                        //迷你吧
                        let mnbIndex = result.data.delivWays.indexOf("3");
                        if(dnsIndex == -1 && mnbIndex == -1){
                            this.isInvShow = false;
                        }else{
                            this.isInvShow = true;
                        }
                        //快递送
                        let kdIndex = result.data.delivWays.indexOf("2");
                        if(kdIndex != -1){
                            this.isFreeShip = true;
                        }else{
                            this.isFreeShip = false;
                        }
                        //自提区
                        let ztIndex = result.data.delivWays.indexOf("4");
                        if(ztIndex != -1){
                            this.isPickUp = true;
                        }else{
                            this.isPickUp = false;
                        }
                        /*if(result.data.delivWay == 1){
                            this.isInvShow = true;
                            this.isFreeShip = false;
                            if(result.data.isNeedInv == 1){
                                this.isSafeInv = true;
                            }else{
                                this.isSafeInv = false;
                            }
                        }else if(result.data.delivWay == 2){
                            this.isInvShow = false;
                            this.isFreeShip = true;
                        }else if(result.data.delivWay == 3){
                            this.isInvShow = true;
                            this.isFreeShip = true;
                            if(result.data.isNeedInv == 1){
                                this.isSafeInv = true;
                            }else{
                                this.isSafeInv = false;
                            }
                        }*/

                        if(result.data.isLocalSpecialty == 1){
                            this.isNativeProd = true;
                        }else{
                            this.isNativeProd = false;
                        }
                        const qualityType = result.data.prodProductDTO.prodWarrantyPeriod;
                        this.selectTimeType = qualityType.substr(-1,1);
                        this.CommodityDataModify.prodWarrantyPeriod = parseInt(qualityType.substr(0,qualityType.length-1));
                    }else{
                        this.$message.error('商品详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
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
            this.$router.push({name: 'HotelOwnProdSpecsAdd', query: {hotelProdId}});
        },
        //详情
        hotelProdSpecsDetail(id){
            const hotelProdId = this.hpId;
            this.$router.push({name: 'HotelOwnProdSpecsDetail', query: {id, hotelProdId}});
        },
        //修改
        hotelProdSpecsModify(id){
            const hotelProdId = this.hpId;
            this.$router.push({name: 'HotelOwnProdSpecsModify', query: {id, hotelProdId}});
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

<style>
.el-checkbox:last-of-type{
    margin-right: 6px;
}
</style>

<style scoped>
.el-input{
    width: 92%;
}
.el-select{
    width: 92%;
}
.commodityadd >>> .el-table::before{
    height: 0px; 
}
.commodityadd >>> .el-table td{
    border-bottom: 0px;
    padding: 0px 0px;
}
.commodityadd >>> .el-table .cell{
    padding-left: 0px;
}
</style>

<style lang="less" scoped>
.commodityadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityform{
        width: 42%;
        .treestyle{
            background: #fff;
            border: 1px solid #444;
            position: absolute;
            z-index: 10;
            width: 100%;
            padding: 5px 0px;
            border: 1px solid transparent;
            border-color: rgba(68,68,68,0.1);
            box-shadow: 0px 0px 1px rgba(68,68,68,0.1);
            margin-top: 10px;
            .closetree{
                position: absolute;
                right: 10px;
                top: 0px;
                z-index: 10;
            }
        }
        .inputtime{
            width: 40%;
        }
        .selecttime{
            width: 30%;
        }
        .required-icon{
            color: #F56C6C;
        }
        .functionadd{
            .funspan{
                display: inline-block;
                width: 128px;
                font-size: 14px;
                color: #666;
                text-align: right;
                padding-right: 12px;
            }
            .addbtn{
                margin-bottom: 10px;
                background: #ffa522;
                border: #dda522;
                color: #fff;
                display: inline-block;
            }
            .hint{
                font-size: 12px;
                color: #bbb;
            }
        }
    }
}
</style>
