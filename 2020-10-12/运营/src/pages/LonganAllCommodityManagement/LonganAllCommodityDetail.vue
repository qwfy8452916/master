<template>
    <div class="commoditydetail">
        <p class="title">商品详情</p>
        <el-form v-model="CommodityDetailData" :model="CommodityDetailData" label-width="140px" class="commodityform">
            <el-form-item label="商品名称" prop="prodName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="CommodityDetailData.prodCode"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="prodKindName">
                <el-input :disabled="true" v-model="CommodityDetailData.prodKindName"></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDetailData.prodOwnerOrgKind != 2">
                <span v-if="CommodityDetailData.prodOwnerOrgKind == '3'" slot="label">酒店名称</span>
                <span v-else slot="label">入驻商名称</span>
                <el-input v-if="CommodityDetailData.prodOwnerOrgKind == '3'" :disabled="true" v-model="CommodityDetailData.hotelName"></el-input>
                <el-input v-else :disabled="true" v-model="CommodityDetailData.merName"></el-input>
            </el-form-item> -->
            <el-form-item label="供应商" prop="prodSupplName">
            <!-- <el-form-item label="商品所有人组织名称" prop="prodSupplName"> -->
                <el-input :disabled="true" v-model="CommodityDetailData.prodSupplName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="最高采购价" prop="prodPurMaxPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodPurMaxPrice"></el-input> 元
            </el-form-item> -->
            <!-- <el-form-item label="商品形式" prop="prodType">
                <el-input :disabled="true" v-model="CommodityDetailData.prodTypeName"></el-input>
            </el-form-item> -->
            <el-form-item label="商品形式" prop="prodType">
                <el-select :disabled="true" v-model="CommodityDetailData.prodType" @change="selectProdType" placeholder="请选择">
                    <el-option 
                        v-for="item in pTypeList" 
                        :key="item.id" 
                        :label="item.name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="CommodityDetailData.prodType==2" label="卡券选择" prop="prodWarrantyPeriod">
                <el-input :disabled="true" v-model="CommodityDetailData.prodWarrantyPeriod"></el-input>
            </el-form-item> -->
            <el-form-item v-if="CommodityDetailData.prodType == 2">
                <span slot="label"><label class="required-icon">*</label> 电子券选择</span>
                <el-button :disabled="true" type="primary" class="addbtn" size="small" @click="couponAddLine">添加</el-button>
            </el-form-item>
            <el-table v-if="CommodityDetailData.prodType == 2" :data="CommodityDetailData.EleCouponsData" style="margin: -20px 0px 0px 130px;">
                <el-table-column label="类型" min-width="150px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponType'" :rules="rules.couponType" class="marginstyle">
                            <el-select
                                :disabled="true"
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
                                :disabled="true"
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
                            <el-input :disabled="true" v-model.number="scope.row.couponCount" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="80px" align=center>
                    <template slot-scope="scope">
                        <el-form-item :prop="'EleCouponsData.'+scope.$index+'.couponSort'" :rules="rules.couponSort" class="marginstyle">
                            <el-input :disabled="true" v-model.number="scope.row.couponSort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="60px" align=center>
                    <template slot-scope="scope">
                        <el-form-item class="marginstyle">
                            <el-button :disabled="true" type="text" size="small" @click="giftDeleteLine(scope.$index)">移除</el-button>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
            <br/>
            <el-form-item label="保质期" prop="prodWarrantyPeriod">
                <el-input :disabled="true" v-model="CommodityDetailData.prodWarrantyPeriod"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="prodUnitMeasure">
                <el-input :disabled="true" v-model="CommodityDetailData.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="prodSupplyPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodSupplyPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="prodRetailPrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodRetailPrice"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="">
                <el-input :disabled="true" v-model="CommodityDetailData.prodAdvisePrice"></el-input> 元
            </el-form-item>
            <!-- <el-form-item label="建议零售价" prop="prodAdvisePrice">
                <el-input :disabled="true" v-model="CommodityDetailData.prodAdvisePrice"></el-input> 元
            </el-form-item> -->
            <el-form-item label="统计分类" prop="statisticsCategoryId">
                <el-input v-if="CommodityDetailData.statisticsCategoryId == 0" :disabled="true" value="无"></el-input>
                <el-input v-else :disabled="true" v-model="categoryName"></el-input>
            </el-form-item>
            <el-form-item label="商品列表图" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    name="fileContent"
                    :file-list="imgList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情banner" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="bannerList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="商品描述图" prop="">
                <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="descList">
                    <el-button :disabled="true" size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式</label>
                </el-upload>
            </el-form-item> -->
            <uploadpic :isDisabled="isDisabled" :descList="descList" @descListevent="descListevent"></uploadpic>
            <el-form-item>
                <el-button @click="returnList">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import uploadpic from "@/components/uploadpic"
export default {
    name: 'LonganAllCommodityDetail',
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
        return {
            acId: '',
            yCouponList: [],   //优惠券列表
            cCouponList: [],   //卡券列表
            CommodityDetailData: {
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
            categoryName: '',
            uploadUrl: this.$api.upload_file_url,
            imgList: [],
            bannerList: [],
            categoryList: [],
            isDisabled: true,
            descList: [],
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
                // prodSupplName: [
                //     {required: true, message: '请输入供应商名称', trigger: 'blur'},
                //     {min: 1, max: 50, message: '供应商名称请保持在50个字符以内', trigger: ['blur','change']}
                // ],
                // prodCode: [
                //     {required: true, message: '请输入商品编码', trigger: 'blur'},
                //     {min: 1, max: 10, message: '商品编码请保持在10个字符以内', trigger: ['blur','change']}
                // ],
                // prodPurMaxPrice: [
                //     {required: true, validator: validatePrice, trigger: ['blur','change']}
                // ],
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
        this.acId = this.$route.query.id;
        this.basicDataItems();
        this.allCommodityDetail();
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
                this.CommodityDetailData.prodType = "";
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
            this.CommodityDetailData.EleCouponsData.push(newLine);
        },
        //移除
        giftDeleteLine(index){
            this.CommodityDetailData.EleCouponsData.splice(index, 1);
        },
        //选择礼包类型 1：卡券 2：优惠券
        selectCouponT(index, cType){
            if(cType == 1){
                this.CommodityDetailData.EleCouponsData[index].couponList = this.cCouponList;
            }else if(cType == 2){
                this.CommodityDetailData.EleCouponsData[index].couponList = this.yCouponList;
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
                        this.CommodityDetailData.EleCouponsData = this.CommodityDetailData.EleCouponsData.map(item => {
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
                            this.CommodityDetailData.EleCouponsData = this.CommodityDetailData.EleCouponsData.map(item => {
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
        //商品详情
        allCommodityDetail(){
            const params = {};
            const id = this.acId;
            this.$api.PlatformCommodityDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        // this.CommodityDetailData = result.data;
                        // if(result.data.prodType == 1){
                        //     this.CommodityDetailData.prodTypeName = '实物';
                        // }else{
                        //     this.CommodityDetailData.prodTypeName = '电子';
                        // }
                        this.CommodityDetailData = {
                            prodName: result.data.prodName,
                            prodShowName: result.data.prodShowName,
                            prodCode: result.data.prodCode,
                            prodKindName: result.data.prodKindName,
                            prodSupplName: result.data.prodSupplName,
                            prodType: result.data.prodType,
                            EleCouponsData: result.data.elecBatchList.map(item => {
                                                return {
                                                    couponType: item.batchType,
                                                    couponList: [],
                                                    couponId: item.batchId,
                                                    couponCount: item.count,
                                                    couponSort: item.sort,
                                                }
                                            }),
                            prodWarrantyPeriod: result.data.prodWarrantyPeriod,
                            prodUnitMeasure: result.data.prodUnitMeasure,
                            prodSupplyPrice: result.data.prodSupplyPrice,
                            prodRetailPrice: result.data.prodRetailPrice,
                            prodMarketPrice: result.data.prodMarketPrice,
                        },
                        this.getHotelCouponList();
                        this.getProdCouponList();
                        // console.log(this.CommodityDetailData);
                        if(result.data.statisticsCategoryId != 0){
                            this.categoryName = result.data.prodStatCategoryDTO.categoryName;
                        }
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
        //返回
        returnList(){
            this.$router.push({name: 'LonganAllCommodityManage'});
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
.commoditydetail{
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
            margin-left: -140px;
        }
    }
}
</style>
