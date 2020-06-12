<template>
    <div class="commodityadd">
        <p class="title">添加商品</p>
        <el-form :model="CommodityDataAdd" :rules="rules" ref="CommodityDataAdd" label-width="120px" class="commodityform">
            <el-form-item label="酒店名称" prop="hotelName">
                <el-select 
                    v-model="CommodityDataAdd.hotelName" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择" 
                    @change="hotelSelect">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="marketType">
                <span slot="label"><label class="required-icon">*</label> 市场分类</span>
                <el-select v-model="CommodityDataAdd.marketType" placeholder="请选择" @change="categorySelect">
                    <el-option v-for="item in marketList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                </el-select>
                <el-tag
                    v-for="tag in tagsList"
                    :key="tag.id"
                    closable
                    @close="tagClose(tag)">
                    {{tag.categoryName}}
                </el-tag>
            </el-form-item>
            <el-form-item prop="prodName">
                <span slot="label"><label class="required-icon">*</label> 商品名称</span>
                <el-select 
                    v-model="prodId" 
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    placeholder="请选择">
                    <el-option
                        v-for="item in prodList"
                        :key="item.id"
                        :label="item.prodName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="安全库存" prop="safeStock">
                <el-input  v-model.number="CommodityDataAdd.safeStock"></el-input>
            </el-form-item>
            <el-form-item label="零售价" prop="retailPrice">
                <el-input v-model.trim="CommodityDataAdd.retailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="配送方式" prop="distributionType">
                <el-checkbox-group v-model="CommodityDataAdd.distributionType">
                    <el-checkbox label="0">客房配送</el-checkbox>
                    <el-checkbox label="1">快递配送</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="客服电话" prop="servicePhone">
                <el-input v-model.trim="CommodityDataAdd.servicePhone"></el-input>
            </el-form-item>
            <el-form-item label="本地特产" prop="isNativeProd">
                <el-switch v-model="isNativeProd"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BM_PROD_HOTELPRODUCTADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'MerchantHotelCommodityAdd',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            // orgId: '',
            authzData:'',
            hotelId: '',
            hotelList: [],
            marketList: [],
            tagsList: [],
            prodList: [],
            // protocolList: [],
            prodId: '',
            prodN: '',
            CommodityDataAdd: {
                distributionType: ["0","1"]
            },
            isNativeProd: false,
            isSubmit: false,
            rules: {
                hotelName: [
                    {required: true, message: '请选择酒店名称', trigger: 'blur'},
                ],
                // prodName: [
                //     {required: true, message: '请选择商品名称', trigger: 'blur'},
                // ],
                safeStock: [
                    {required: true, message: '请输入安全库存', trigger: 'blur'},
                    {min: 1, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                retailPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                distributionType: [
                    {required: true, message: '请选择配送方式', trigger: 'blur'},
                ],
                servicePhone: [
                    {required: true, message: '请填写客服电话', trigger: 'blur'},
                    {min: 1, max: 20, message: '客服电话请保持在20个字符以内', trigger: ['blur','change']}
                ],
            },
            loadingH: false,
            loadingP: false
        }
    },
    created(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.getHotelList();
    },
    methods: {
        //获取市场分类列表
        getMarketList(value){
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 5,
                hotelId: value
            };
            // console.log(params);
            this.$api.hotelCommodityMarketListM(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.marketList = result.data.map(item => {
                            return {
                                id: item.id,
                                categoryName: item.categoryName
                            }
                        });
                    }else{
                        this.$message.error('市场分类获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //添加市场分类
        categorySelect(value){
            const category = this.marketList.find(item => item.id === value);
            // console.log(category);
            this.tagsList.push(category);
            // console.log(this.tagsList);
            this.marketList.splice(this.marketList.indexOf(category), 1);
            // console.log(this.marketList);
            this.CommodityDataAdd.marketType = '';
        },
        //取消添加的市场分类
        tagClose(tag){
            // console.log(tag);
            this.tagsList.splice(this.tagsList.indexOf(tag), 1);
            this.marketList.push(tag);
            // console.log(this.marketList);
        },
        //获取酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 5,
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
        //修改酒店列表
        hotelSelect(value){
            this.CommodityDataAdd.marketType = '';
            this.tagsList = [];
            this.prodId = '',
            this.hotelId = value,
            this.getMarketList(value);   //市场分类
            this.getProdList();   //商品
        },
        //获取商品列表
        getProdList(val){
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 5,
                hotelId: this.hotelId,
                prodName: val
            };
            // console.log(params);
            this.$api.hotelCommodityUnused(params)
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
                    }else{
                        this.$message.error('商品列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteProd(val){
            this.getProdList(val);
        },
        //确定 - 添加
        submitForm(CommodityDataAdd){
            const marketIdList = this.tagsList.map(item => {
               return item.id
            });
            let isNative;
            if(this.isNativeProd){
                isNative = 1
            }else{
                isNative = 0
            }
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 5,
                hotelId: this.CommodityDataAdd.hotelName,
                marketCategoryList: marketIdList,
                prodCode: this.prodId,
                prodSafeCount: this.CommodityDataAdd.safeStock,
                prodRetailPrice: this.CommodityDataAdd.retailPrice,
                delivWayList: this.CommodityDataAdd.distributionType,
                // agreementId: this.CommodityDataAdd.agreementName
                servicePhone: this.CommodityDataAdd.servicePhone,
                isLocalSpecialty: isNative
            };
            // console.log(params);
            this.$refs[CommodityDataAdd].validate((valid) => {
                if (valid) {
                    if(marketIdList.length == 0){
                        this.$message.error('请选择市场分类！');
                        return
                    }
                    if(this.prodId == ''){
                        this.$message.error('请选择商品名称！');
                        return
                    }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.hotelCommodityAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('酒店入驻商品添加成功！');
                                this.$router.push({name: 'MerchantHotelCommodityList'});
                            }else{
                                this.$message.error(result.msg);
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
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
            this.$router.push({name: 'MerchantHotelCommodityList'});
        },
    }
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
        .lookhistoryprice{
            float: right;
            margin-right: -82px;
        }
        .required-icon{
            color: #F56C6C;
        }
    }
}
</style>
