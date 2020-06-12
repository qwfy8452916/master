<template>
    <div class="functionadd">
        <el-form :model="FunctionProdData" :rules="rules" ref="FunctionProdData" label-width="100px" class="functionform">
            <el-form-item label="功能区" prop="funcId">
                <!-- <el-select 
                    :disabled="true"
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
                <el-select :disabled="true" v-model="FunctionProdData.funcId" placeholder="请选择" @change="functionChange">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品" prop="hotelProdId">
                <!-- <el-select 
                    :disabled="true"
                    v-model="FunctionProdData.prodName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select> -->
                <el-select :disabled="true" v-model="FunctionProdData.hotelProdId" placeholder="请选择" @change="selectProd">
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
                <el-input :disabled="true" type="textarea" autosize :readonly="true" v-model="selectMarketData" placeholder="请选择" @focus="showMarketTree"></el-input>
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
            <el-form-item label="显示名称" prop="prodShowName">
                <el-input :disabled="true" v-model="FunctionProdData.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="prodCode">
                <el-input :disabled="true" v-model="FunctionProdData.prodCode"></el-input>
            </el-form-item>
            <el-form-item prop="prodType">
                <span slot="label"><label class="required-icon">*</label> 商品形式</span>
                <el-select :disabled="true" v-model="FunctionProdData.prodType" placeholder="请选择">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="电子" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="FunctionProdData.prodType == 2" prop="vouBatchId">
                <span slot="label"><label class="required-icon">*</label> 卡券选择</span>
                <el-select :disabled="true" v-model="FunctionProdData.vouBatchId" placeholder="请选择">
                    <el-option v-for="item in couponList" :key="item.id" :label="item.couponName" :value="item.id"></el-option>
                </el-select>
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
            <!-- <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
                <el-select :disabled="true" v-model="FunctionProdData.pickUpPointIds" multiple placeholder="请选择">
                    <el-option v-for="item in pickUpPointList" :key="item.id" :label="item.pickUpPointName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input :disabled="true" v-model.number="FunctionProdData.sort" maxlength="9"></el-input>
            </el-form-item> -->
        </el-form>
        <div><el-button class="addbutton" @click="funcProdSpecsAdd">添加规格</el-button></div>
        <div><el-button class="addbutton" @click="funcProdSpecsAllAdd">添加全部规格</el-button></div>
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
                    <el-button type="text" size="small" @click="funcProdSpecsDetail(scope.row.id)">详情</el-button>
                    <el-button type="text" size="small" @click="funcProdSpecsModify(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="funcProdSpecsDelete(scope.row.id)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确定要移除此规格吗？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="deleteConfirm">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisibleAllAdd" width="30%">
            <span>确定要添加全部酒店商品规格吗？<br/>确定后将清除此功能区商品所有的规格并且复制酒店商品规格</span>
            <span slot="footer">
                <el-button @click="dialogVisibleAllAdd=false">取消</el-button>
                <el-button type="primary" @click="allAddConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelFunctionSpecsList',
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
            hotelId: '',
            fpId: '',
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
            loadingP: false,
            protocolList: [],
            couponList: [],
            delivWayList: [],
            pickUpPointList: [],
            FunctionProdData: {
                funcId: '',
                hotelProdId: '',
                sort: 0,
            },
            isSubmit: false,
            rules: {
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

            ProdSpecsDataList: [],
            fpsId: '',
            dialogVisibleDelete: false,
            dialogVisibleAllAdd: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelId = localStorage.getItem('hotelId');
        this.fpId = this.$route.query.id;
        this.getFunctionList();
        this.basicDataItems();
        // this.getHotelPickUpPointList();
        this.functionProdDetail();
        this.funcProdSpecsList();
    },
    methods: {
        //功能区列表
        getFunctionList(fName){
            const params = {
                hotelId: this.hotelId,
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
                                funcCnName: item.funcCnName
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
            // if(this.FunctionProdData.hotelId == ''){
            //     return false;
            // }
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
            if(this.FunctionProdData.funcId == ''){
                return false;
            }
            const params = {
                hotelId: this.hotelId,
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
        getProdList(pName){
            const that = this;
            const params = {
                hotelId: this.hotelId,
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
                        const addProd = {
                            id: that.FunctionProdData.hotelProdId,
                            prodName: that.FunctionProdData.prodName,
                            prodType: that.FunctionProdData.prodType,
                            vouBatchId: that.FunctionProdData.vouBatchId,
                            prodKindName: that.FunctionProdData.prodKindName,
                            prodSupplName: that.FunctionProdData.prodSupplName,
                            prodWarrantyPeriod: that.FunctionProdData.prodWarrantyPeriod,
                            prodUnitMeasure: that.FunctionProdData.prodUnitMeasure,
                            prodSupplyPrice: that.FunctionProdData.prodSupplyPrice,
                            prodRetailPrice: that.FunctionProdData.prodRetailPrice,
                            prodMarketPrice: that.FunctionProdData.prodMarketPrice,
                            delivWays: that.FunctionProdData.delivWays,
                            availableSaleQty: that.FunctionProdData.availableSaleQty,
                            pickUpPointIds: that.FunctionProdData.pickUpPointIds,
                        }
                        this.prodList.unshift(addProd);
                        this.getHotelCouponList();
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
            // if(this.FunctionProdData.hotelId == ''){
            //     return false;
            // }
            // this.loadingP = true;
            // const params = {
            //     orgAs: '',
            //     // hotelId: this.FunctionProdData.hotelId,
            //     prodName: pName,
            //     pageNo: 1,
            //     pageSize: 50
            // };
            // this.$api.platformCommodityList(params)
            //     .then(response => {
            //         this.loadingP = false;
            //         const result = response.data;
            //         if(result.code == 0){
            //             this.prodList = result.data.records.map(item => {
            //                 return{
            //                     id: item.prodCode,
            //                     prodName: item.prodName
            //                 }
            //             })
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
        remoteProd(val){
            this.getProdList(val);
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
                hotelId: this.hotelId
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
        //获取功能区商品详情
        functionProdDetail(){
            const params = {};
            const id = this.fpId;
            this.$api.functionProdDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        // this.FunctionProdData = result.data;
                        this.FunctionProdData = {
                            funcId: result.data.funcId,
                            hotelProdId: result.data.hotelProdId,
                            prodName: result.data.product.prodName,
                            prodShowName: result.data.hotelProduct.prodShowName,
                            prodCode: result.data.prodCode,
                            prodType: result.data.hotelProduct.prodType,
                            vouBatchId: result.data.hotelProduct.vouBatchId,
                            prodKindName: result.data.hotelProduct.prodKindName,
                            prodSupplName: result.data.product.prodSupplName,
                            prodWarrantyPeriod: result.data.product.prodWarrantyPeriod,
                            prodUnitMeasure: result.data.product.prodUnitMeasure,
                            prodSupplyPrice: result.data.hotelProduct.prodSupplyPrice,
                            prodRetailPrice: result.data.hotelProduct.prodRetailPrice,
                            prodMarketPrice: result.data.hotelProduct.prodMarketPrice,
                            delivWays: result.data.delivWays,
                            availableSaleQty: result.data.hotelProduct.availableSaleQty,
                            pickUpPointIds: result.data.hotelProduct.pickUpPointIds,
                            sort: result.data.sort,
                        };
                        if(result.data.marketCategories != null){
                            this.selectMarketIdList = result.data.marketCategories.map(item => {
                                return item.id
                            });
                            let treeNameArr = '';
                            for(let i = 0; i < result.data.marketCategories.length; i++){
                                treeNameArr += result.data.marketCategories[i].categoryName + '、' 
                            }
                            this.selectMarketData = treeNameArr;
                        }
                        this.getFunctionClassify();
                        this.getProdList();
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
        },

        //功能区商品规格列表
        funcProdSpecsList(){
           const params = {
                funcProdId : this.fpId
            };
            // console.log(params);
            this.$api.funcProdSpecsList(params)
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
        funcProdSpecsAdd(){
            const funcProdId = this.fpId;
            this.$router.push({name: 'HotelFunctionSpecsAdd', query: {funcProdId}});
        },
        //添加全部
        funcProdSpecsAllAdd(){
            this.dialogVisibleAllAdd = true;
        },
        //添加全部-确定
        allAddConfirm(){
            const params = {};
            this.$api.funcProdSpecsAllAdd(params, this.fpId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('添加全部规格成功！');
                        this.dialogVisibleAllAdd = false;
                        this.funcProdSpecsList();
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
        funcProdSpecsDetail(id){
            const funcProdId = this.fpId;
            this.$router.push({name: 'HotelFunctionSpecsDetail', query: {id, funcProdId}});
        },
        //修改
        funcProdSpecsModify(id){
            const funcProdId = this.fpId;
            this.$router.push({name: 'HotelFunctionSpecsModify', query: {id, funcProdId}});
        },
        //移除
        funcProdSpecsDelete(id){
            this.fpsId = id;
            this.dialogVisibleDelete = true;
        },
        //移除-确定
        deleteConfirm(){
            const params = {};
            this.$api.funcProdSpecsDelete(params, this.fpsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('移除规格成功！');
                        this.dialogVisibleDelete = false;
                        this.funcProdSpecsList();
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
    width: 92%;
}
.el-select{
    width: 92%;
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
    }
}
</style>
