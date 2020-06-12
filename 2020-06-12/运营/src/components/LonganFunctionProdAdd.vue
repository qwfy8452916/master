<template>
    <div class="functionadd">
        <p class="title">添加功能区商品</p>
        <el-form :model="FunctionProdData" :rules="rules" ref="FunctionProdData" label-width="100px" class="functionform">
            <el-form-item label="酒店" prop="hotelId">
                <el-select
                    v-model="FunctionProdData.hotelId"
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
            <el-form-item label="功能区" prop="funcId">
                <!-- <el-select
                    v-model="FunctionProdData.funcId"
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    @change="functionChange"
                    placeholder="请选择">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select> -->
                <el-select v-model="FunctionProdData.funcId" placeholder="请选择" @change="functionChange">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品" prop="hotelProdId">
                <el-select v-model="FunctionProdData.hotelProdId" placeholder="请选择" @change="selectProd">
                    <el-option
                        v-for="item in prodList"
                        :key="item.id"
                        :label="item.prodName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <!-- <span slot="label"><label class="required-icon">*</label> 分类</span> -->
                <el-input type="textarea" autosize :readonly="true" v-model="selectMarketData" placeholder="请选择" @focus="showMarketTree"></el-input>
                <div v-if="isShowTree" class="treestyle">
                    <el-button type="text" @click="hideMarketTree" class="closetree">关闭</el-button>
                    <el-tree
                        :data = "typeDataDetail"
                        :props="defaultProps"
                        show-checkbox
                        :check-strictly = 'true'
                        :check-on-click-node = 'true'
                        :default-checked-keys="selectMarketIdList"
                        node-key = 'id'
                        ref="tree"
                        @check-change = "selectMarket"
                        default-expand-all
                        :expand-on-click-node = "false">
                    </el-tree>
                </div>
            </el-form-item>
            <el-form-item prop="prodType">
                <span slot="label"><label class="required-icon">*</label> 商品形式</span>
                <el-select :disabled="true" v-model="FunctionProdData.prodType" placeholder="请选择">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="电子" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="FunctionProdData.prodType == 2" prop="vouBatchName">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <!-- <el-select :disabled="true" v-model="FunctionProdData.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select> -->
                <el-input :disabled="true" v-model="FunctionProdData.vouBatchName"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="prodKindName">
                <el-input :disabled="true" v-model="FunctionProdData.prodKindName"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="prodSupplName">
                <el-input :disabled="true" v-model="FunctionProdData.prodSupplName"></el-input>
            </el-form-item>
            <el-form-item prop="prodWarrantyPeriod">
                <span slot="label"><label class="required-icon">*</label> 保质期</span>
                <!-- <el-input class="inputtime" v-model.number="FunctionProdData.qualityTime"></el-input>
                <el-select class="selecttime" v-model="FunctionProdData.timeType">
                    <el-option label="天" value="天"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                </el-select> -->
                <el-input :disabled="true" v-model="FunctionProdData.prodWarrantyPeriod"></el-input>
            </el-form-item>
            <el-form-item prop="prodUnitMeasure">
                <span slot="label"><label class="required-icon">*</label> 单位</span>
                <el-input :disabled="true" v-model="FunctionProdData.prodUnitMeasure"></el-input>
            </el-form-item>
            <el-form-item prop="prodSupplyPrice">
                <span slot="label"><label class="required-icon">*</label> 供货价</span>
                <el-input :disabled="true" v-model.trim="FunctionProdData.prodSupplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item prop="prodRetailPrice">
                <span slot="label"><label class="required-icon">*</label> 零售价</span>
                <el-input :disabled="true" v-model.trim="FunctionProdData.prodRetailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="prodMarketPrice">
                <el-input :disabled="true" v-model.trim="FunctionProdData.prodMarketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item prop="delivWays">
                <span slot="label"><label class="required-icon">*</label> 配送方式</span>
                <el-select :disabled="true" v-model="FunctionProdData.delivWays" multiple placeholder="请选择">
                    <el-option v-for="item in delivWayList" :key="item.id" :label="item.delivWayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="availableSaleQty">
                <span slot="label"><label class="required-icon">*</label> 可售数量</span>
                <el-input :disabled="true" v-model.number="FunctionProdData.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
                <el-select :disabled="true" v-model="FunctionProdData.pickUpPointIds" multiple placeholder="请选择">
                    <el-option v-for="item in pickUpPointList" :key="item.id" :label="item.pickUpPointName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="FunctionProdData.sort"></el-input>
                </el-form-item>
            <el-form-item label="分成协议" prop="allocId">
                <el-select v-model="FunctionProdData.allocId" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList"
                        :key="item.id"
                        :label="item.allocName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_FUNCPROD_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('FunctionProdData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganFunctionProdAdd',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        const typeDataDetail = [];
        return {
            authzData: '',
            hotelList: [],
            loadingH: false,
            functionList: [],
            loadingF: false,
            isShowTree: false,
            selectMarketData: '',
            selectMarketIdList: [],
            typeDataDetail: JSON.parse(JSON.stringify(typeDataDetail)),
            defaultProps: {
                children: 'childDtoList',
                label: 'categoryName'
            },
            marketIdData: [],
            isPickUp: false,
            prodList: [],
            protocolList: [],
            couponList: [],
            delivWayList: [],
            pickUpPointList: [],
            FunctionProdData: {
                hotelId: '',
                funcId: '',
                hotelProdId: '',
                sort: 0,
            },
            isSubmit: false,
            rules: {
                hotelId: [
                    { required: true, message: '请选择酒店', trigger: 'change' }
                ],
                funcId: [
                    { required: true, message: '请选择功能区', trigger: 'change' }
                ],
                hotelProdId: [
                    { required: true, message: '请选择商品', trigger: 'change' }
                ],
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.getHotelList();
        this.basicDataItems();
        this.getprotocolList();
    },
    methods: {
        //酒店列表
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
            if(this.FunctionProdData.hotelId == ''){
                this.FunctionProdData.funcId = '';
                this.functionList = [];
                this.FunctionProdData.hotelProdId = '';
                this.prodList = [];
            }else{
                this.getFunctionList();
                this.getHotelPickUpPointList();
            }
        },
        //功能区列表
        getFunctionList(fName){
            if(this.FunctionProdData.hotelId == ''){
                return false;
            }
            const params = {
                hotelId: this.FunctionProdData.hotelId,
            };
            // console.log(params);
            this.$api.getHotelFunctionList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.functionList = result.data.map(item => {
                            return{
                                id: item.id,
                                funcCnName: item.funcCnName,
                                hotelName:item.hotelName
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
            // this.loadingF = true;
            // const params = {
            //     hotelId: this.FunctionProdData.hotelId,
            //     funcName: fName,
            //     pageNo: 1,
            //     pageSize: 50
            // };
            // // console.log(params);
            // this.$api.hotelFunctionList(params)
            //     .then(response => {
            //         this.loadingF = false;
            //         // console.log(response);
            //         const result = response.data;
            //         if(result.code == '0'){
            //             this.functionList = result.data.records.map(item => {
            //                 return{
            //                     id: item.id,
            //                     funcCnName: item.funcCnName
            //                 }
            //             });
            //         }else{
            //             this.$message.error(result.msg);
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        remoteFunction(val){
            this.getFunctionList(val);
        },
        functionChange(){
            if(this.FunctionProdData.funcId == ''){
                this.selectMarketData = '';
                this.typeDataDetail = [];
            }else{
                this.getFunctionClassify();
                this.getProdList();
            }
        },
        //分类
        showMarketTree(){
            this.isShowTree = true;
        },
        hideMarketTree(){
            this.isShowTree = false;
        },
        selectMarket(){
            let treeNodes = this.$refs.tree.getCheckedNodes();
            let treeKeys = this.$refs.tree.getCheckedKeys();
            this.selectMarketIdList = treeKeys;
            let treeNameArr = '';
            for(let i = 0; i < treeNodes.length; i++){
                treeNameArr += treeNodes[i].categoryName + '、'
            }
            this.selectMarketData = treeNameArr;
        },
        //获取功能区分类 - 树
        getFunctionClassify(){
            if(this.FunctionProdData.hotelId == '' || this.FunctionProdData.funcId == ''){
                return false;
            }
            const params = {
                hotelId: this.FunctionProdData.hotelId,
                funcId: this.FunctionProdData.funcId,
            };
            this.$api.functionClassifyTree(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.typeDataDetail = result.data;
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
        //商品列表
        getProdList(){
            if(this.FunctionProdData.hotelId == '' || this.FunctionProdData.funcId == ''){
                return false;
            }
            const params = {
                hotelId: this.FunctionProdData.hotelId,
                funcId: this.FunctionProdData.funcId
            };
            this.$api.getFunctionProdList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.map(item => {
                            return{
                                id: item.id,
                                prodName: item.prodProductDTO.prodName,
                                prodType: item.prodType,
                                vouBatchId: item.vouBatchId,
                                vouBatchName: item.vouBatchName,
                                prodKindName: item.prodKindName,
                                prodSupplName: item.prodProductDTO.prodSupplName,
                                prodWarrantyPeriod: item.prodProductDTO.prodWarrantyPeriod,
                                prodUnitMeasure: item.prodProductDTO.prodUnitMeasure,
                                prodSupplyPrice: item.prodSupplyPrice,
                                prodRetailPrice: item.prodRetailPrice,
                                prodMarketPrice: item.prodMarketPrice,
                                delivWays: item.delivWays,
                                availableSaleQty: item.availableSaleQty,
                                pickUpPointIds: item.pickUpPointIds,
                            }
                        })
                        // this.getHotelCouponList();
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
        //选择商品
        selectProd(value){
            let prodInfo = this.prodList.find(item => item.id == value);
            //自提区
            let ztIndex = prodInfo.delivWays.indexOf("4");
            if(ztIndex != -1){
                this.isPickUp = true;
            }else{
                this.isPickUp = false;
            }
            this.FunctionProdData.prodType = prodInfo.prodType;
            this.FunctionProdData.vouBatchId = prodInfo.vouBatchId;
            this.FunctionProdData.vouBatchName = prodInfo.vouBatchName;
            this.FunctionProdData.prodKindName = prodInfo.prodKindName;
            this.FunctionProdData.prodSupplName = prodInfo.prodSupplName;
            this.FunctionProdData.prodWarrantyPeriod = prodInfo.prodWarrantyPeriod;
            this.FunctionProdData.prodUnitMeasure = prodInfo.prodUnitMeasure;
            this.FunctionProdData.prodSupplyPrice = prodInfo.prodSupplyPrice;
            this.FunctionProdData.prodRetailPrice = prodInfo.prodRetailPrice;
            this.FunctionProdData.prodMarketPrice = prodInfo.prodMarketPrice;
            this.FunctionProdData.delivWays = prodInfo.delivWays;
            this.FunctionProdData.availableSaleQty = prodInfo.availableSaleQty;
            this.FunctionProdData.pickUpPointIds = prodInfo.pickUpPointIds;
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
        //获取酒店自提点列表
        getHotelPickUpPointList(){
            const params = {
                hotelId: this.FunctionProdData.hotelId
            };
            // console.log(params);
            this.$api.getHotelPickUpPointList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.pickUpPointList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    pickUpPointName: item.pointName
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
        //获取分成协议列表
        getprotocolList(){
            const params = {};
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                allocName: item.allocName,
                                id: item.id
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
        //确定 - 新增
        submitForm(FunctionProdData){
            if(this.FunctionProdData.sort == ''){
                this.FunctionProdData.sort = 0;
            }
            const params = {
                hotelId: this.FunctionProdData.hotelId,
                funcId: this.FunctionProdData.funcId,
                hotelProdId: this.FunctionProdData.hotelProdId,
                marketCategoryIds: this.selectMarketIdList,
                sort: this.FunctionProdData.sort,
                allocId: this.FunctionProdData.allocId
            };
            this.$refs[FunctionProdData].validate((valid) => {
                if (valid) {
                    // if(this.selectMarketIdList.length == 0){
                    //     this.$message.error('请选择分类！');
                    //     return false;
                    // }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.functionProdAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('添加商品成功！');
                                this.$router.push({name: 'LonganFunctionProdList'});
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
            this.$router.push({name: 'LonganFunctionProdList'});
        }
    },
}
</script>

<style>
.el-checkbox:last-of-type{
    margin-right: 6px;
}
</style>

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
.functionadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .functionform{
        width: 42%;
        .required-icon{
            color: #F56C6C;
        }
        .treestyle{
            background: #fff;
            border: 1px solid #444;
            position: absolute;
            z-index: 10;
            width: 82%;
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
    }
}
</style>
