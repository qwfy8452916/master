<template>
    <div class="commoditymanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-input v-model="inquireCommodityName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="供应商名称">
                <el-input v-model="inquireSupplierName"></el-input>
            </el-form-item> -->
            <el-form-item label="形式">
                <el-select v-model="inquireCommodityForm" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="实物" value="1"></el-option>
                    <el-option label="电子" value="2"></el-option>
                    <el-option label="菜品" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="驳回" value="0"></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="待审核" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div><el-button v-if="authzlist['F:BH_PROD_HOTELPRODADD']" class="addbutton" @click="platformCommodityAdd">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="CommodityDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="ID" min-width="80px" align=center></el-table-column>
            <!-- <el-table-column prop="marketList" label="市场分类" width="120px"></el-table-column> -->
            <el-table-column prop="logoUrl" label="商品图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.logoUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" min-width="240px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称" min-width="240px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodCode" label="商品编码" min-width="140px" align=center></el-table-column>
            <el-table-column prop="prodTypeName" label="商品形式" min-width="100px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodWarrantyPeriod" label="保质期" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodUnitMeasure" label="单位" min-width="80px" align=center></el-table-column>
            <!-- <el-table-column prop="prodProductDTO.prodSupplName" label="供应商名称" width="100px"></el-table-column> -->
            <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="specQty" label="规格数量" min-width="80px" align=center></el-table-column>
            <el-table-column prop="delivWayNames" label="配送方式" min-width="140px">
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.delivWay == 0">无</span>
                    <span v-else-if="scope.row.delivWay == 1">现场送</span>
                    <span v-else-if="scope.row.delivWay == 2">快递送</span>
                    <span v-else-if="scope.row.delivWay == 3">现场送、快递送</span>
                </template> -->
            </el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align=center></el-table-column>
            <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align=center></el-table-column>
            <!-- <el-table-column prop="prodRetailPrice" label="零售价(元)" width="90px" align=center></el-table-column>
            <el-table-column prop="prodMarketPrice" label="划线价(元)" width="90px" align=center></el-table-column>
            <el-table-column prop="onShelfProd" label="商城上架" width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
            </el-table-column> -->
            <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == 0">驳回</span>
                    <span v-if="scope.row.reviewStatus == 1">通过</span>
                    <span v-if="scope.row.reviewStatus == 2">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160px" align=center></el-table-column>
            <!-- <el-table-column prop="prodProductDTO.reviewStatus" label="状态" width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.prodProductDTO.reviewStatus == 0">驳回</span>
                    <span v-else-if="scope.row.prodProductDTO.reviewStatus == 1">通过</span>
                    <span v-else-if="scope.row.prodProductDTO.reviewStatus == 2">待审核</span>
                </template>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="220px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.reviewStatus == 2 && authzlist['F:BH_PROD_HOTELPROD_SCHEDULE']" type="text" size="small" @click="lookReviewProcess(scope.row.wfId)">审核进度</el-button>
                    <el-button type="text" size="small" @click="ownCommodityDetail(scope.row.id)">详情</el-button>
                    <el-button v-if="scope.row.reviewStatus != 2 && authzlist['F:BH_PROD_HOTELPRODALTER']" type="text" size="small" @click="ownCommodityModify(scope.row.id)">修改</el-button>
                    <el-button v-if="authzlist['F:BH_PROD_HOTELPRODDELETE']" type="text" size="small" @click="ownCommodityDelete(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="ownCommoditySpecs(scope.row.id)">规格管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'HotelOwnCommodityList',
    data(){
        return {
            authzlist: {}, //权限数据
            orgId: '',
            ocId: '',
            inquireCommodityName: '',
            inquireSupplierName: '',
            inquireCommodityForm: '',
            inquireStatus: '',
            CommodityDataList: [],
            dialogVisibleDelete: false,
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    components:{
        resetButton,
        HotelPagination
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.ownCommodityList();
    },
    methods: {
        resetFunc(){
            this.inquireCommodityName = ''
            this.inquireSupplierName = ''
            this.inquireCommodityForm = ''
            this.inquireStatus = ''
            this.ownCommodityList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.ownCommodityList();
        },
        //商品列表
        ownCommodityList(){
            const params = {
                // encryptedOrgId: this.orgId,
                orgAs: 3,
                prodName: this.inquireCommodityName,
                // supplName: this.inquireSupplierName,
                prodType: this.inquireCommodityForm,
                reviewStatus: this.inquireStatus,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.ownCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataList = result.data.records.map(item => {
                            // item.marketList = item.hotelMarketCategoryDTOList.map(subItem => {
                            //     return subItem.categoryName + '、'
                            // });
                            if(item.prodProductDTO){
                                item.logoUrl = item.prodProductDTO.prodLogoUrl;
                            }else{
                                item.logoUrl = '';
                            }
                            if(item.onShelf == 0){
                                item.onShelfProd = false
                            }else{
                                item.onShelfProd = true
                            }
                            return item
                        });
                        this.pageTotal = result.data.total;
                        // console.log(this.CommodityDataList);
                    }else{
                        this.$message.error('酒店列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //修改上架状态
        updateStatus(id,value){
            const params = {};
            this.$api.ownCommodityStatus(params, id)
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
                        if(value){
                            this.$message.error('商品上架失败！');
                            this.CommodityDataList.onShelfProd = false;
                        }else{
                            this.$message.error('商品下架失败！');
                            this.CommodityDataList.onShelfProd = true;
                        }
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
            this.ownCommodityList();
            this.$store.commit('setSearchList',{
                inquireCommodityName: this.inquireCommodityName,
                inquireSupplierName: this.inquireSupplierName,
                inquireCommodityForm: this.inquireCommodityForm,
                inquireStatus: this.inquireStatus
            })
        },
        //新增
        platformCommodityAdd(){
            this.$router.push({name: 'HotelOwnCommodityAdd'});
        },
        //详情
        ownCommodityDetail(id){
            this.$router.push({name: 'HotelOwnCommodityDetail', query: {id}});
        },
        //修改
        ownCommodityModify(id){
            this.$router.push({name: 'HotelOwnCommodityModify', query: {id}});
        },
        //删除
        ownCommodityDelete(id){
            this.ocId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.ocId;
            const params = {};
            this.$api.ownCommodityDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('删除商品成功！');
                        this.dialogVisibleDelete = false;
                        this.ownCommodityList();
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
        //查看审核进度
        lookReviewProcess(id){
            this.$router.push({name: 'HotelProcessDetails', query: {id}});
        },
        //规格管理
        ownCommoditySpecs(id){
            this.$router.push({name: 'HotelOwnProdSpecsList', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.commoditymanage{
   
}
</style>
