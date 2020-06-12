<template>
    <div class="functionlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店">
                <el-select 
                    v-model="inquireHotelName"
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
            <el-form-item label="功能区">
                <el-select 
                    v-model="inquireFunctionName" 
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    placeholder="请选择">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品">
                <el-select 
                    v-model="inquireProdName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上下架">
                <el-select v-model="inquireProdStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上架" value="1"></el-option>
                    <el-option label="下架" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_PROD_FUNCPROD_ADD']"><el-button class="addbutton" @click="functionProdAdd">添&nbsp;&nbsp;加</el-button></div>
        <el-table :data="functionProdDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="sort" label="排序" min-width="80px" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店" min-width="200px"></el-table-column>
            <el-table-column prop="funcName" label="功能区" min-width="120px"></el-table-column>
            <el-table-column prop="funcProdUrl" label="商品图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.funcProdUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="categoryNames" label="分类" min-width="120px"></el-table-column>
            <el-table-column prop="hotelProduct.prodProductDTO.prodName" label="商品" min-width="240px"></el-table-column>
            <el-table-column prop="funcProdShowName" label="显示名称" min-width="240px"></el-table-column>
            <el-table-column v-if="authzData['F:BO_PROD_FUNCPROD_USING']" prop="onShelfProd" label="上下架" min-width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="hotelProduct.prodSupplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="hotelProduct.prodRetailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="specQty" label="规格数量" min-width="80px" align=center></el-table-column>
            <el-table-column prop="delivWayNames" label="配送方式" min-width="140px"></el-table-column>
            <el-table-column prop="hotelProduct.availableSaleQty" label="可售数量" min-width="80px" align=center></el-table-column>
            <el-table-column prop="hotelProduct.reviewStatus" label="审核状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.hotelProduct.reviewStatus == 0">驳回</span>
                    <span v-if="scope.row.hotelProduct.reviewStatus == 1">通过</span>
                    <span v-if="scope.row.hotelProduct.reviewStatus == 2">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="hotelProduct.isActive" label="是否有效" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.hotelProduct.isActive == 0">否</span>
                    <span v-if="scope.row.hotelProduct.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="funcProdDetail(scope.row.id)">详情</el-button>
                    <el-button v-if="authzData['F:BO_PROD_FUNCPROD_EDIT']" type="text" size="small" @click="funcProdModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_PROD_FUNCPROD_DELETE']" type="text" size="small" @click="funcProdDelete(scope.row.id)">移除</el-button>
                    <el-button v-if="scope.row.hotelProduct.isSupportSpec == 1" type="text" size="small" @click="funcProdSpecs(scope.row.id)">规格管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认移除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDelete">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganFunctionProdList2',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return{
            authzData: '',
            fpId: '',
            hotelList: [],
            loadingH: false,
            inquireHotelName: '',
            functionList: [],
            loadingF: false,
            inquireFunctionName: '',
            prodList: [],
            loadingP: false,
            inquireProdName: '',
            inquireProdStatus: '',
            functionProdDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getFunctionList();
        this.getProdList();
        this.functionProdList();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = ''
            this.inquireFunctionName = ''
            this.inquireProdName = ''
            this.inquireProdStatus = ''
            this.functionProdList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.functionProdList();
        },
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
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
            if(this.inquireHotelName == ''){
                this.inquireFunctionName = '';
                this.functionList = [];
            }else{
                this.getFunctionList();
            }
        },
        //功能区列表
        getFunctionList(fName){
            if(this.inquireHotelName == ''){
                return false;
            }
            this.loadingF = true;
            const params = {
                hotelId: this.inquireHotelName,
                funcName: fName,
                pageNo: 1,
                pageSize: 50
            };
            // console.log(params);
            this.$api.hotelFunctionList(params)
                .then(response => {
                    this.loadingF = false;
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.functionList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                funcCnName: item.funcCnName
                            }
                        });
                        const functionAll = {
                            id: '',
                            funcCnName: '全部'
                        };
                        this.functionList.unshift(functionAll);
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
        remoteFunction(val){
            this.getFunctionList(val);
        },
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: '',
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.prodCode,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            prodName: '全部'
                        };
                        this.prodList.unshift(prodAll);
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
        remoteProd(val){
            this.getProdList(val);
        },
        //功能区商品列表
        functionProdList(){
            const params = {
                hotelId: this.inquireHotelName,
                funcId: this.inquireFunctionName,
                prodCode: this.inquireProdName,
                isOnShelf: this.inquireProdStatus,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.functionProdList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.functionProdDataList = result.data.records.map(item => {
                            if(item.isOnShelf == 1){
                                item.onShelfProd = true;
                            }else{
                                item.onShelfProd = false;
                            }
                            return item;
                        });
                        this.pageTotal = result.data.total;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.functionProdList();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                inquireFunctionName:this.inquireFunctionName,
                inquireProdName:this.inquireProdName,
                inquireProdStatus:this.inquireProdStatus
            })
        },
        //修改上架状态
        updateStatus(id, value){
            // console.log(value);
            const params = {};
            this.$api.functionProdStatus(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(value){
                            this.$message.success('商品上架成功！');
                        }else{
                            this.$message.success('商品下架成功！');
                        }
                    }else{
                        this.$message.error(result.msg);
                        let selectFD;
                        selectFD = this.functionProdDataList.find(item => id == item.id);
                        if(value){
                            selectFD.onShelfProd = false;
                        }else{
                            selectFD.onShelfProd = true;
                        }
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增
        functionProdAdd(){
            this.$router.push({name:'LonganFunctionProdAdd'});
        },
        //详情
        funcProdDetail(id){
            this.$router.push({name:'LonganFunctionProdDetail', query: {id}});
        },
        //修改
        funcProdModify(id){
            this.$router.push({name:'LonganFunctionProdModify', query: {id}});
        },
        //移除
        funcProdDelete(id){
            this.fpId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDelete(){
            const id = this.fpId;
            const params = {};
            // console.log(id);
            this.$api.functionProdDelete(params,id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.dialogVisibleDelete = false;
                        this.$message.success('移除商品成功！');
                        this.functionProdList();
                    }else{
                        this.dialogVisibleDelete = false;
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //规格管理
        funcProdSpecs(id){
            this.$router.push({name:'LonganFunctionSpecsList', query: {id}});
        },
    },
}
</script>

<style lang="less" scoped>
.functionlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

