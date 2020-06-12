<template>
    <div class="commodityadd">
        <p class="title">修改商品</p>
        <el-form :model="CommodityDataModify" :rules="rules" ref="CommodityDataModify" label-width="130px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input  v-model="CommodityDataModify.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input  v-model="CommodityDataModify.prodShowName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="供应商名称" prop="prodSupplName">
                <el-input  v-model="CommodityDataModify.prodSupplName"></el-input>
            </el-form-item> -->
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="CommodityDataModify.prodCode"></el-input>
            </el-form-item>
            <el-form-item label="商品形式" prop="prodType">
                <el-select v-model="CommodityDataModify.prodType" placeholder="请选择">
                    <el-option label="实物" :value="1"></el-option>
                    <!-- <el-option label="电子" :value="2"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item v-if="CommodityDataModify.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select v-model="CommodityDataModify.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保质期" prop="prodWarrantyPeriod">
                <el-input class="inputtime" v-model.number="CommodityDataModify.prodWarrantyPeriod"></el-input>
                <el-select class="selecttime" v-model="selectTimeType">
                    <el-option label="天" value="天"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input  v-model="CommodityDataModify.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input v-model.trim="CommodityDataModify.prodSupplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input v-model.trim="CommodityDataModify.prodRetailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input v-model.trim="CommodityDataModify.prodMarketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="配送方式" prop="delivWays">
                <!-- <el-checkbox-group v-model="CommodityDataModify.delivWays" @change="selectDelivType">
                    <el-checkbox label="1">店内送</el-checkbox>
                    <el-checkbox label="2">快递送</el-checkbox>
                </el-checkbox-group> -->
                <el-select v-model="CommodityDataModify.delivWays" multiple placeholder="请选择" @change="selectDelivType">
                    <el-option v-for="item in delivWayList" :key="item.id" :label="item.delivWayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isInvShow" label="酒店库存" prop="isNeedInv">
                <!-- <span slot="label"><label class="required-icon">*</label> 是否需要库存</span>
                <el-radio-group v-model="CommodityDataModify.isNeedInv" @change="selectIsInv">
                    <el-radio :label="1">需要</el-radio>
                    <el-radio :label="0">不需要</el-radio>
                </el-radio-group> -->
                <el-switch v-model="CommodityDataModify.isNeedInv" @change="selectIsInv"></el-switch>
            </el-form-item>
            <el-form-item v-if="isInvShow && isSafeInv" prop="prodSafeCount">
                <span slot="label"><label class="required-icon">*</label> 安全库存</span>
                <el-input  v-model.number="CommodityDataModify.prodSafeCount" placeholder="请输入安全库存"></el-input>
            </el-form-item>
            <el-form-item v-if="isFreeShip" prop="isFreeShipping">
                <span slot="label"><label class="required-icon">*</label> 快递费包邮</span>
                <!-- <span slot="label"><label class="required-icon">*</label> 快递费</span>
                <el-radio-group v-model="CommodityDataModify.isFreeShipping">
                    <el-radio :label="1">包邮</el-radio>
                    <el-radio :label="0">不包邮</el-radio>
                </el-radio-group> -->
                <el-switch v-model="CommodityDataModify.isFreeShipping"></el-switch>
                <span v-if="!CommodityDataModify.isFreeShipping">&nbsp;&nbsp;
                    <el-select v-model="CommodityDataModify.expressFeeId" placeholder="请选择快递费模板" style="width:48%;">
                        <el-option
                            v-for="item in expressFeeList"
                            :key="item.id"
                            :label="item.prodName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </el-form-item>
            <!-- <el-form-item label="统计分类" prop="statisticsCategoryId">
                <el-select v-model="categoryId" placeholder="请选择">
                    <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 商品列表图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="imgList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 商品详情banner</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="bannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="商品描述" prop="">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="descList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 3)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式</label>
                </el-upload>
            </el-form-item> -->
            <uploadpic :isDisabled="isDisabled" :descList="descList" @descListevent="descListevent"></uploadpic>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BM_PROD_PRODUCTEDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic"
export default {
    name: 'MerchantOwnCommodityModify',
    components:{
        uploadpic,
    },
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
            // orgId: '',
            authzData:'',
            ocId: '',
            expressFeeList: [],
            couponList: [],
            delivWayList: [],
            CommodityDataModify: {
                delivWays: [],
                prodMarketPrice: '',
                isFreeShipping: '',
                expressFeeId: '',
            },
            selectTimeType: '',
            categoryId: '',
            isInvShow: false,
            isSafeInv: true,
            isFreeShip: false,
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imgList: [],
            bannerList: [],
            isDisabled: false,
            descList: [],
            isSubmit: false,
            categoryList: [],
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
                prodSupplName: [
                    {required: true, message: '请输入供应商名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '供应商名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                // prodCode: [
                //     {required: true, message: '请输入商品编码', trigger: 'blur'},
                //     {min: 1, max: 10, message: '商品编码请保持在10个字符以内', trigger: ['blur','change']}
                // ],
                prodWarrantyPeriod: [
                    {required: true, message: '请输入保质期', trigger: 'blur'},
                    {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                prodUnitMeasure: [
                    {required: true, message: '请输入单位', trigger: 'blur'},
                    {min: 1, max: 10, message: '单位请保持在10个字符以内', trigger: ['blur','change']}
                ],
                prodSupplyPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodRetailPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                prodMarketPrice: [
                    {validator: validatePriceReq, trigger: ['blur','change']}
                ],
                // isNeedInv: [
                //     {required: true, message: '请选择是否需要库存', trigger: 'change'},
                // ],
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
            },
        }
    },
    created(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.ocId = this.$route.query.id;
        this.getCategoryList();
        this.getExpFeeList();
        this.basicDataItems();
        this.ownCommodityDetail();
    },
    methods: {
        //商品描述图
        descListevent(e){
            this.descList = e.fileList;
        },
        //transform 转换
        transformFunc(val){
            if(val == 1){ return true }else{ return false }
        },
        //获取商品详情
        ownCommodityDetail(){
            const params = {};
            const id = this.ocId;
            this.$api.ownCommodityDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataModify = result.data;
                        this.CommodityDataModify.isNeedInv = this.transformFunc(result.data.isNeedInv);
                        this.CommodityDataModify.isFreeShipping = this.transformFunc(result.data.isFreeShipping);
                        //店内送
                        let dnsIndex = result.data.delivWays.indexOf("1");
                        //迷你吧
                        let mnbIndex = result.data.delivWays.indexOf("3");
                        if(dnsIndex == -1 && mnbIndex == -1){
                            this.isInvShow = false;
                        }else{
                            this.isInvShow = true;
                            if(result.data.isNeedInv == 1){
                                this.isSafeInv = true;
                            }else{
                                this.isSafeInv = false;
                            }
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
                        // if(result.data.delivWay == 1){
                        //     this.isInvShow = true;
                        //     this.isFreeShip = false;
                        //     if(result.data.isNeedInv == 1){
                        //         this.isSafeInv = true;
                        //     }else{
                        //         this.isSafeInv = false;
                        //     }
                        // }else if(result.data.delivWay == 2){
                        //     this.isInvShow = false;
                        //     this.isFreeShip = true;
                        // }else if(result.data.delivWay == 3){
                        //     this.isInvShow = true;
                        //     this.isFreeShip = true;
                        //     if(result.data.isNeedInv == 1){
                        //         this.isSafeInv = true;
                        //     }else{
                        //         this.isSafeInv = false;
                        //     }
                        // }
                        this.imgList = [{
                            name: result.data.prodLogoPath,
                            url:  result.data.prodLogoUrl,
                            path: result.data.prodLogoPath
                        }];
                        this.bannerList = result.data.bannerImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
                        this.descList = result.data.descImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath,
                                sort: item.sort,
                            }
                        });
                        const qualityType = result.data.prodWarrantyPeriod;
                        // this.CommodityDataModify.timeType = qualityType.substr(-1,1);
                        this.selectTimeType = qualityType.substr(-1,1);
                        this.CommodityDataModify.prodWarrantyPeriod = parseInt(qualityType.substr(0,qualityType.length-1));
                        if(result.data.statisticsCategoryId != 0){
                            this.categoryId = result.data.statisticsCategoryId;
                        }
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
        //获取统计分类列表
        getCategoryList(){
            const params = {
                // entryOprOrgId: this.orgId
                orgAs: 5
            };
            // console.log(params);
            this.$api.commodityStatisticsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.categoryList = result.data;
                    }else{
                        this.$message.error('商品统计分类获取失败！');
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
        //选择配送方式
        selectDelivType(value){
            if(this.CommodityDataModify.prodType == 2){
                this.CommodityDataModify.delivWays = ["5"];
            }else{
                if(value.length != 0){
                    //店内送
                    let dnsIndex = this.CommodityDataModify.delivWays.indexOf("1");
                    //迷你吧
                    let mnbIndex = this.CommodityDataModify.delivWays.indexOf("3");
                    if(dnsIndex == -1 && mnbIndex == -1){
                        this.isInvShow = false;
                        this.CommodityDataModify.isNeedInv = false;
                    }else{
                        this.isInvShow = true;
                        this.CommodityDataModify.isNeedInv = true;
                    }
                    //快递送
                    let kdIndex = this.CommodityDataModify.delivWays.indexOf("2");
                    if(kdIndex != -1){
                        this.isFreeShip = true;
                    }else{
                        this.isFreeShip = false;
                    }
                    //自提区
                    let ztIndex = this.CommodityDataModify.delivWays.indexOf("4");
                    if(ztIndex != -1){
                        this.isPickUp = true;
                    }else{
                        this.isPickUp = false;
                    }
                    //电子商品
                    let zzIndex = this.CommodityDataModify.delivWays.indexOf("5");
                    if(zzIndex != -1){
                        this.CommodityDataModify.delivWays.splice(zzIndex, 1);
                    }
                }else{
                    this.isInvShow = false;
                    this.isFreeShip = false;
                    this.isPickUp = false;
                    this.functionList = [];
                }
            }
            // if(value.length == 0){
            //     this.isInvShow = false;
            //     this.isFreeShip = false;
            // }else if(value.length == 1){
            //     if(value[0] == 1){
            //         this.isInvShow = true;
            //         this.isFreeShip = false;
            //         // this.CommodityDataModify.isFreeShipping = '';
            //     }else{
            //         this.isInvShow = false;
            //         this.isFreeShip = true;
            //     }
            // }else if(value.length == 2){
            //     this.isInvShow = true;
            //     this.isFreeShip = true;
            // }
        },
        //选择是否需要库存
        selectIsInv(value){
            if(value){
                this.isSafeInv = true;
            }else{
                this.isSafeInv = false;
                // this.CommodityDataModify.prodSafeCount = '';
            }
        },
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //确定 - 修改
        submitForm(CommodityDataModify){
            const id = this.ocId;
            let pMarketPrice;
            if(this.CommodityDataModify.prodMarketPrice == ''){
                pMarketPrice = '';
            }else{
                pMarketPrice = parseFloat(this.CommodityDataModify.prodMarketPrice).toFixed(2);
            }
            // console.log(this.imgList);
            const logoPathArr = JSON.stringify(this.imgList.map(item => item.path));
            const logoPathStr = logoPathArr.substr(2,logoPathArr.length-4);
            const bannerPath = this.bannerList.map(item => item.path);
            // const descPath = this.descList.map(item => item.path);
            let descPath = this.descList.map(item => {
                return{
                    imagePath: item.path,
                    sort: item.sort,
                }
            });
            const params = {
                prodName: this.CommodityDataModify.prodName,
                prodShowName: this.CommodityDataModify.prodShowName,
                prodSupplName: this.CommodityDataModify.prodSupplName,
                prodCode: this.CommodityDataModify.prodCode,
                prodType: this.CommodityDataModify.prodType,
                vouBatchId: this.CommodityDataModify.vouBatchId,
                prodWarrantyPeriod:  this.CommodityDataModify.prodWarrantyPeriod + this.selectTimeType,
                prodUnitMeasure: this.CommodityDataModify.prodUnitMeasure,
                prodSupplyPrice: parseFloat(this.CommodityDataModify.prodSupplyPrice).toFixed(2),
                prodRetailPrice: parseFloat(this.CommodityDataModify.prodRetailPrice).toFixed(2),
                prodMarketPrice: pMarketPrice,
                delivWays: this.CommodityDataModify.delivWays,
                isNeedInv: this.switchFunc(this.CommodityDataModify.isNeedInv),
                prodSafeCount: this.CommodityDataModify.prodSafeCount,
                isFreeShipping: this.switchFunc(this.CommodityDataModify.isFreeShipping),
                expressFeeId: this.CommodityDataModify.expressFeeId,
                statisticsCategoryId: this.categoryId,
                prodLogoPath: logoPathStr,
                bannerImages: bannerPath,
                descImageList: descPath,

            };
            // console.log(params);
            this.$refs[CommodityDataModify].validate((valid) => {
                if (valid) {
                    if(this.CommodityDataModify.prodType == 2){
                        if(this.CommodityDataModify.vouBatchId == ''){
                            this.$message.error('请选择卡券!');
                            return false
                        }
                    }
                    //店内送、迷你吧
                    let dnsIndex = this.CommodityDataModify.delivWays.indexOf("1");
                    let mnbIndex = this.CommodityDataModify.delivWays.indexOf("3");
                    if(dnsIndex != -1 || mnbIndex != -1){
                        if(this.CommodityDataModify.isNeedInv){
                            if(this.CommodityDataModify.prodSafeCount == ''){
                                this.$message.error('请输入安全库存!');
                                return false
                            }
                        }
                    }
                    //快递送
                    let kdIndex = this.CommodityDataModify.delivWays.indexOf("2");
                    if(kdIndex != -1){
                        if(!this.CommodityDataModify.isFreeShipping){
                            if(this.CommodityDataModify.expressFeeId == ''){
                                this.$message.error('请选择快递费模板!');
                                return false
                            }
                        }
                    }
                    /*if(this.CommodityDataModify.delivWays.length == 1){
                        if(this.CommodityDataModify.delivWays[0] == 1){
                            if(this.CommodityDataModify.isNeedInv == 1){
                                if(this.CommodityDataModify.prodSafeCount == ''){
                                    this.$message.error('请输入安全库存!');
                                    return false
                                }
                            }
                        }
                        if(this.CommodityDataModify.delivWays[0] == 2){
                            if(this.CommodityDataModify.isFreeShipping === ''){
                                this.$message.error('请选择快递费!');
                                return false
                            }else{
                                if(this.CommodityDataModify.isFreeShipping == 0){
                                    if(this.CommodityDataModify.expressFeeId == ''){
                                        this.$message.error('请选择快递费模板!');
                                            return false
                                    }
                                }
                            }
                        }
                    }
                    if(this.CommodityDataModify.delivWays.length == 2){
                        if(this.CommodityDataModify.isNeedInv == 1){
                                if(this.CommodityDataModify.prodSafeCount == ''){
                                    this.$message.error('请输入安全库存!');
                                    return false
                                }
                            }
                        if(this.CommodityDataModify.isFreeShipping === ''){
                            this.$message.error('请选择快递费!');
                            return false
                        }else{
                            if(this.CommodityDataModify.isFreeShipping == 0){
                                if(this.CommodityDataModify.expressFeeId == ''){
                                    this.$message.error('请选择快递费模板!');
                                        return false
                                }
                            }
                        }
                    }*/
                    if(this.imgList == ''){
                        this.$message.error('请上传商品列表图!');
                        return false
                    }
                    if(this.bannerList == ''){
                        this.$message.error('请上传商品详情banner!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.ownCommodityModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('修改成功，请等待审核！');
                                this.$router.push({name: 'MerchantOwnCommodityList'});
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'MerchantOwnCommodityList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.imgList.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.bannerList.push(image);
            }else if(index == 3){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.descList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.imgList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 2){
                this.bannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 3){
                this.descList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
            if(index == 1 || index == 2){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传商品图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }else if(index == 3){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                return isJPG;
            }
        },
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1){
                this.$message.error('商品列表图只能上传1张！');
            }else if(index == 2){
                this.$message.error('商品详情banner图不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    },
}
</script>

<style scoped>
.el-input{
    width: 92%;
}
.el-select{
    width: 92%;
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
        .inputtime{
            width: 40%;
        }
        .selecttime{
            width: 30%;
        }
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>
