<template>
    <div class="commodityadd">
        <p class="title">新增平台商品</p>
        <el-form :model="CommodityDataAdd" :rules="rules" ref="CommodityDataAdd" label-width="130px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input  v-model="CommodityDataAdd.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input  v-model="CommodityDataAdd.prodShowName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="供应商名称" prop="supplierName">
                <el-input  v-model="CommodityDataAdd.supplierName"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="商品编码" prop="prodCode">
                <el-input  v-model="CommodityDataAdd.prodCode"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="最高采购价" prop="purchasePrice">
                <el-input  v-model.trim="CommodityDataAdd.purchasePrice" maxlength="18"></el-input> 元
            </el-form-item> -->
            <el-form-item label="商品形式" prop="prodType">
                <el-select v-model="CommodityDataAdd.prodType" @change="selectProdType" placeholder="请选择">
                    <el-option 
                        v-for="item in pTypeList" 
                        :key="item.id" 
                        :label="item.name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDataAdd.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select v-model="CommodityDataAdd.vouBatchId" placeholder="请选择">
                    <el-option 
                        v-for="item in couponList" 
                        :key="item.id" 
                        :label="item.couponName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item v-if="CommodityDataAdd.prodType == 2">
                <span slot="label"><label class="required-icon">*</label> 电子券选择</span>
                <el-button type="primary" class="addbtn" size="small" @click="couponAddLine">添加</el-button>
            </el-form-item>
            <el-table v-if="CommodityDataAdd.prodType == 2" :data="CommodityDataAdd.EleCouponsData" style="margin: -20px 0px 0px 130px;">
                <el-table-column label="类型" min-width="150px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponType'" :rules="rules.couponType" class="marginstyle">
                            <el-select
                                v-model="scope.row.couponType"
                                @change="selectCouponT(scope.$index, scope.row.couponType)"
                                placeholder="请选择类型">
                                <el-option label="卡券" :value="1"></el-option>
                                <el-option label="优惠券" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="名称" min-width="240px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponId'" :rules="rules.couponId" class="marginstyle">
                            <el-select
                                v-model="scope.row.couponId"
                                placeholder="请选择名称">
                                <el-option
                                    v-for="item in scope.row.couponList"
                                    :key="item.id"
                                    :label="item.couponName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponCount'" :rules="rules.couponCount" class="marginstyle">
                            <el-input v-model.number="scope.row.couponCount" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponSort'" :rules="rules.couponSort" class="marginstyle">
                            <el-input v-model.number="scope.row.couponSort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="60px" align=center>
                    <template slot-scope="scope">
                        <el-form-item class="marginstyle">
                            <el-button type="text" size="small" @click="giftDeleteLine(scope.$index)">移除</el-button>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
            <br/>
            <el-form-item label="保质期" prop="qualityTime">
                <el-input class="inputtime" v-model.number="CommodityDataAdd.qualityTime"></el-input>
                <el-select class="selecttime" v-model="CommodityDataAdd.timeType">
                    <el-option label="天" value="天"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input  v-model="CommodityDataAdd.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input  v-model.trim="CommodityDataAdd.prodSupplyPrice" maxlength="18"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input  v-model.trim="CommodityDataAdd.prodRetailPrice" maxlength="18"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input  v-model.trim="CommodityDataAdd.prodMarketPrice" maxlength="18"></el-input> 元
            </el-form-item>
            <!-- <el-form-item label="统计分类" prop="statisticsCategoryId">
                <el-select v-model="CommodityDataAdd.statisticsCategoryId" placeholder="请选择">
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
                <el-button v-if="authzData['F:BO_PROD_OPRPROD_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic"
export default {
    name: 'LonganPlatformCommodityAdd',
    components: {
        uploadpic
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
        return {
            authzData: '',
            // orgId: '',
            yCouponList: [],   //优惠券列表
            cCouponList: [],   //卡券列表
            CommodityDataAdd: {
                prodName: '',
                prodShowName: '',
                // supplierName: '',
                // prodCode: '',
                // purchasePrice: '',
                prodType: '',
                vouBatchId: '',
                prodSupplyPrice: '',
                prodRetailPrice: '',
                prodMarketPrice: '',
                qualityTime: '',
                timeType: '天',
                prodUnitMeasure: '',
                statisticsCategoryId: '',
                //电子券选择
                EleCouponsData: [
                    {
                        couponType: '',
                        couponList: [],
                        couponId: '',
                        couponCount: 1,
                        couponSort: 0,
                    }
                ]
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imgList: '',
            bannerList: [],
            isDisabled: false,
            descList: [],
            isSubmit: false,
            couponList: [],
            categoryList: [],
            pTypeList: [],   //商品形式列表
            rules: {
                prodName: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '商品名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                prodShowName: [
                    {required: true, message: '请输入商品显示名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '商品显示名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                // supplierName: [
                //     {required: true, message: '请输入供应商名称', trigger: 'blur'},
                //     {min: 1, max: 50, message: '供应商名称请保持在50个字符以内', trigger: ['blur','change']}
                // ],
                // prodCode: [
                //     {required: true, message: '请输入商品编码', trigger: 'blur'},
                //     {min: 1, max: 10, message: '商品编码请保持在10个字符以内', trigger: ['blur','change']}
                // ],
                // purchasePrice: [
                //     {required: true, validator: validatePrice, trigger: ['blur','change']}
                // ],
                prodType: [
                    {required: true, message: '请选择商品形式', trigger: 'change'}
                ],
                // vouBatchId: [
                //     {required: true, message: '请选择卡券', trigger: 'change'}
                // ],
                qualityTime: [
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
                //电子券选择
                couponType: [
                    {required: true, message: '请选择类型', trigger: 'change'},
                ],
                couponId: [
                    {required: true, message: '请选择名称', trigger: 'change'},
                ],
                couponCount: [
                    {required: true, message: '请输入数量', trigger: 'blur'},
                    {min: 1, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                couponSort: [
                    {required: true, message: '请输入排序', trigger: 'blur'},
                    {min: -999999999, max: 999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.getHotelCouponList();
        this.getProdCouponList();
        // this.getCategoryList();
        this.basicDataItems();
    },
    methods: {
        //商品描述图
        descListevent(e){
            this.descList = e.fileList;
        },
        //获取商品形式 - 字典表
        basicDataItems() {
            const params = {
                key: 'PROD_TYPE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if (result.code == 0) {
                        this.pTypeList = result.data.map(item => {
                            return {
                                id: parseInt(item.dictValue),
                                name: item.dictName
                            }
                        })
                    } else {
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error, "警告", {
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择商品形式
        selectProdType(val){
            if(val == "3"){
                this.$message.warning("平台商品不支持菜品！");
                this.CommodityDataAdd.prodType = "";
            }
        },
        //添加
        couponAddLine(){
            let newLine = {
                couponType: '',
                couponId: '',
                couponCount: 1,
                couponSort: 0,
            };
            this.CommodityDataAdd.EleCouponsData.push(newLine);
        },
        //移除
        giftDeleteLine(index){
            this.CommodityDataAdd.EleCouponsData.splice(index, 1);
        },
        //选择礼包类型 1：卡券 2：优惠券
        selectCouponT(index, cType){
            if(cType == 1){
                this.CommodityDataAdd.EleCouponsData[index].couponList = this.cCouponList;
            }else if(cType == 2){
                this.CommodityDataAdd.EleCouponsData[index].couponList = this.yCouponList;
            }
        },
        //优惠券列表
        getProdCouponList(){
            const that = this;
            let params = {};
            this.$api.getProdCouponList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.yCouponList = result.data.map(item => {
                            return {
                                id: item.id,
                                couponName: item.couponBatchName
                            }
                        });
                        this.CommodityDataAdd.EleCouponsData = this.CommodityDataAdd.EleCouponsData.map(item => {
                            let couponList;
                            if(item.couponType == 1){
                                couponList = that.cCouponList;
                            }else{
                                couponList = that.yCouponList;
                            }
                            return {
                                couponType: item.couponType,
                                couponList: couponList,
                                couponId: item.couponId,
                                couponCount: item.couponCount,
                                couponSort: item.couponSort,
                            }
                        });
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
        //获取卡券列表
        getHotelCouponList(){
            const that = this;
            const params = {};
            // console.log(params);
            this.$api.getHotelCouponList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.cCouponList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    couponName: item.vouName
                                }
                            })
                            this.CommodityDataAdd.EleCouponsData = this.CommodityDataAdd.EleCouponsData.map(item => {
                                let couponList;
                                if(item.couponType == 1){
                                    couponList = that.cCouponList;
                                }else{
                                    couponList = that.yCouponList;
                                }
                                return {
                                    couponType: item.couponType,
                                    couponList: couponList,
                                    couponId: item.couponId,
                                    couponCount: item.couponCount,
                                    couponSort: item.couponSort,
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
        //获取统计分类列表
        getCategoryList(){
            const params = {
                // entryOprOrgId: this.orgId
                orgAs: 2
            };
            // console.log(params);
            this.$api.commodityStatisticsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.categoryList = result.data;
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
        //确定 - 新增
        submitForm(CommodityDataAdd){
            let descPath = this.descList.map(item => {
                return{
                    imagePath: item.path,
                    sort: item.sort,
                }
            });
            let pMarketPrice;
            if(this.CommodityDataAdd.prodMarketPrice == ''){
                pMarketPrice = '';
            }else{
                pMarketPrice = parseFloat(this.CommodityDataAdd.prodMarketPrice).toFixed(2);
            }
            let elecBatchList = this.CommodityDataAdd.EleCouponsData.map(item => {
                return {
                    batchType: item.couponType,
                    batchId: item.couponId,
                    count: item.couponCount,
                    sort: item.couponSort,
                }
            });
            const params = {
                // encryptedOrgId: this.orgId,
                prodOwnerOrgKind: 2,
                prodName: this.CommodityDataAdd.prodName,
                prodShowName: this.CommodityDataAdd.prodShowName,
                // prodSupplName: this.CommodityDataAdd.supplierName,
                // sqSign: this.CommodityDataAdd.prodCode,
                // prodPurMaxPrice: parseFloat(this.CommodityDataAdd.purchasePrice).toFixed(2),
                // qualityTime: this.CommodityDataAdd.qualityTime,
                // timeType: this.CommodityDataAdd.timeType,
                prodType: this.CommodityDataAdd.prodType,
                elecBatchList: elecBatchList,
                // vouBatchId: this.CommodityDataAdd.vouBatchId,
                prodWarrantyPeriod:  this.CommodityDataAdd.qualityTime + this.CommodityDataAdd.timeType,
                prodUnitMeasure: this.CommodityDataAdd.prodUnitMeasure,
                prodSupplyPrice: parseFloat(this.CommodityDataAdd.prodSupplyPrice).toFixed(2),
                prodRetailPrice: parseFloat(this.CommodityDataAdd.prodRetailPrice).toFixed(2),
                prodMarketPrice: pMarketPrice,
                statisticsCategoryId: this.CommodityDataAdd.statisticsCategoryId,
                prodLogoPath: this.imgList,
                bannerImages: this.bannerList,
                descImageList: descPath,
            };
            // console.log(params);
            this.$refs[CommodityDataAdd].validate((valid) => {
                if (valid) {
                    // if(this.CommodityDataAdd.prodType == 2){
                    //     if(this.CommodityDataAdd.vouBatchId == ''){
                    //         this.$message.error('请选择卡券!');
                    //         return false
                    //     }
                    // }
                    if(this.imgList == ''){
                        this.$message.error('请上传商品列表图!');
                        return false
                    }
                    if(this.bannerList == ''){
                        this.$message.error('请上传商品详情banner!');
                        return false
                    }
                    if(this.CommodityDataAdd.prodType == 2){
                        if(this.CommodityDataAdd.EleCouponsData.length == 0){
                            this.$message.error("请选择电子券");
                            return false
                        }
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.platformCommodityAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('运营商商品新增成功！');
                                this.$router.push({name: 'LonganPlatformCommodityList'});
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
            this.$router.push({name: 'LonganPlatformCommodityList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                this.imgList = res.data;
            }else if(index == 2){
                this.bannerList.push(res.data);
            }else if(index == 3){
                this.descList.push(res.data);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.imgList = '';
            }else if(index == 2){
                this.bannerList = fileList.map(item => {
                    return item.response.data
                });
            }else if(index == 3){
                this.descList = fileList.map(item => {
                    return item.response.data
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
.commodityadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityform{
        width: 45%;
        .inputtime{
            width: 40%;
        }
        .selecttime{
            width: 30%;
        }
        .addbtn{
            margin-bottom: 10px;
            background: #ffa522;
            border: #dda522;
            color: #fff;
            display: inline-block;
        }
        .required-icon{
            color: #ff3030;
        }
        .marginstyle{
            margin-left: -130px;
        }
    }
}
</style>
