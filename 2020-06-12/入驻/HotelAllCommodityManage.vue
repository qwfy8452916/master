<template>
    <div class="commoditymanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-input v-model="inquireProdName"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称">
                <el-input v-model="inquireSupplName"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="inquireCommodityType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="平台商品" value="2"></el-option>
                    <el-option label="自营商品" value="3"></el-option>
                    <el-option label="入驻商品" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="hotelProdAdd">添加酒店商品</el-button></div>
        <el-table :data="CommodityDataList" border stripe style="width:100%;" >
            <el-table-column prop="id" label="商品id" width="70px" align=center></el-table-column>
            <!-- <el-table-column prop="marketList" label="市场分类"></el-table-column> -->
            <el-table-column prop="prodProductDTO.prodLogoUrl" label="商品图片" width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.prodProductDTO.prodLogoUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodShowName" label="显示名称"></el-table-column>
            <el-table-column prop="prodProductDTO.prodCode" label="商品编码" align=center></el-table-column>
            <el-table-column prop="prodType" label="商品形式" align=center>
               <template slot-scope="scope">
                 <span v-if="scope.row.prodType==1">实物</span>
                 <span v-if="scope.row.prodType==2">电子</span>
               </template>
            </el-table-column>
            <el-table-column prop="prodKindName" label="类型" width="80px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodSupplName" label="供应商名称"></el-table-column>


            <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="90px" align=center></el-table-column> -->
            <el-table-column prop="prodProductDTO.prodWarrantyPeriod" label="保质期" width="80px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodUnitMeasure" label="单位" width="60px" align=center></el-table-column>
            <el-table-column prop="prodSupplyPrice" label="供货价" width="90px" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价(元)" width="90px" align=center></el-table-column>
            <el-table-column prop="delivWayNames" label="配送方式" width="90px" align=center></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" width="90px" align=center></el-table-column>
            <el-table-column prop="availableSaleQty" label="可售数量" width="90px" align=center>
                <template slot-scope="scope">
                 <span v-if="scope.row.availableSaleQty==-999"></span>
                 <span v-else>{{scope.row.availableSaleQty}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态" width="90px" align=center>
                <template slot-scope="scope">
                 <span v-if="scope.row.reviewStatus==0">驳回</span>
                 <span v-if="scope.row.reviewStatus==1">通过</span>
                 <span v-if="scope.row.reviewStatus==2">待审核</span>
               </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效" width="90px" align=center>
                <template slot-scope="scope">
                 <span v-if="scope.row.isActive==0">无效</span>
                 <span v-if="scope.row.isActive==1">有效</span>
               </template>
            </el-table-column>

            <el-table-column prop="createdByName" label="创建人" width="160px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="120px" align=center></el-table-column>
            <!-- <el-table-column prop="onShelfProd" label="商城上架" width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-if="authzlist['F:BH_PROD_ALLPRODSHELF']" v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="80px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.prodKindName == '自营商品'" type="text" size="small" disabled>移除</el-button>
                    <el-button v-else type="text" size="small" @click="hotelProdDelete(scope.row.id)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogProdVisible" :close-on-click-modal="false" width="80%">
            <el-form :inline="true" align=left>
                <el-form-item label="商品名称">
                    <el-input v-model="inquireHotelProd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="inquireProd">查&nbsp;&nbsp;询</el-button>
                </el-form-item>
            </el-form>
            <el-form :model="prodFormData" :rules="prodFormData.rules" ref="prodFormData">
                <el-table
                    :data="prodFormData.unusedHotelProdList"
                    border
                    stripe
                    @selection-change="selectUnusedProdChange"
                    style="width:100%;" >
                    <el-table-column type="selection" width="40px"></el-table-column>
                    <!-- <el-table-column prop="marketType" label="市场分类" width="240px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.marketType'" :rules="prodFormData.rules.marketType">
                                <el-select v-model="scope.row.marketType" multiple placeholder="请选择">
                                    <el-option
                                        v-for="item in marketList"
                                        :key="item.id"
                                        :label="item.categoryName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="prodName" label="商品名称"></el-table-column>
                    <el-table-column prop="prodShowName" label="显示名称" align=center>
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.prodShowName'" :rules="prodFormData.rules.prodShowName">
                                <el-input v-model="scope.row.prodShowName"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prodCode" label="商品编码"></el-table-column>
                    <el-table-column prop="prodType" label="商品形式">
                       <template slot-scope="scope">
                          <span v-if="scope.row.prodType==1">实物</span>
                          <span v-if="scope.row.prodType==2">电子</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prodSupplName" label="供应商名称"></el-table-column>
                    <el-table-column prop="prodWarrantyPeriod" label="保质期"></el-table-column>
                    <el-table-column prop="prodUnitMeasure" label="单位"></el-table-column>
                    <el-table-column prop="prodSupplyPrice" label="供货价"></el-table-column>
                    <el-table-column fixed="right" prop="prodRetailPrice" label="零售价(元)" width="100px" align=center></el-table-column>
                    <el-table-column fixed="right" prop="delivWayNames" label="配送方式">
                        <!-- <template slot-scope="scope">
                            <span v-if="scope.row.delivWay == 0"></span>
                            <span v-else-if="scope.row.delivWay == 1">现场送</span>
                            <span v-else-if="scope.row.delivWay == 2">快递送</span>
                            <span v-else-if="scope.row.delivWay == 3">现场送、快递送</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column fixed="right" prop="prodSafeCount" label="安全库存" width="100px" align=center></el-table-column>

                    <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="100px" align=center></el-table-column> -->

                    <el-table-column fixed="right" prop="prodAdvisePrice" label="建议零售价" width="120px" align=center>
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.prodAdvisePrice'" :rules="prodFormData.rules.prodAdvisePrice">
                                <el-input v-model="scope.row.prodAdvisePrice"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table><br/><br/>
                <el-form-item>
                    <el-button @click="dialogProdVisible=false">取消</el-button>
                    <el-button type="primary" :disabled="isSubmit" @click="EnsureAdd('prodFormData')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
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
export default {
    name: 'HotelAllCommodityManage',
    components:{
        resetButton
    },
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            authzlist: {}, //权限数据
            orgId: '',
            hotelId: '',
            hpId: '',
            inquireProdName: '',
            inquireSupplName: '',
            inquireCommodityType: '',
            CommodityDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogProdVisible: false,
            inquireHotelProd: '',
            prodFormData: {
                rules: {
                    prodShowName: [
                        {required: true, message: '请输入显示名称', trigger: 'blur'},
                        {min: 1, max: 50, message: '显示名称请保持在50个字符以内', trigger: ['blur','change']}
                    ],
                    // marketType: [
                    //     { required: true, message: '请选择市场分类', trigger: 'change' }
                    // ],
                    prodAdvisePrice: [
                        { validator: validatePrice, trigger: ['blur','change'] }
                    ]
                },
                unusedHotelProdList: [
                    {
                        // marketType: []
                    }
                ]
            },
            marketList: [],
            mTreeData: [],
            selectedProdList: [],
            isSubmit: false,
            dialogVisibleDelete: false
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        // this.getHotelMarketDetail();
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        // this.getMarketList();
        this.hotelAllCommodityList();
    },
    methods: {
        resetFunc(){
            this.inquireProdName = ''
            this.inquireSupplName = ''
            this.inquireCommodityType = ''
            this.hotelAllCommodityList();
        },
        //遍历树-递归
        getMarketTreeList(mTreeList, mList){
            mTreeList.map(item => {
                mList.push({
                    id: item.id,
                    categoryName: item.categoryName
                });
                if(item.childrenList != null){
                    this.getMarketTreeList(item.childrenList, mList);
                }
            });
        },
        //获取市场分类 - 树
        getHotelMarketDetail(){
            const params = {
                hotelId: this.hotelId
            };
            this.$api.getHotelMarketDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.mTreeData = result.data;
                        this.getMarketTreeList(this.mTreeData,this.marketList);
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
        selectUnusedProdChange(val) {
            // console.log(val);
            this.selectedProdList = val;
        },
        //获取市场分类列表
        getMarketList(){
            const params = {
                hotelId: this.hotelId
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
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //添加酒店商品
        hotelProdAdd(){
            const params = {
                hotelId: this.hotelId,
                prodName: this.inquireHotelProd
            };
            this.$api.hotelUnusedProdList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.prodFormData.unusedHotelProdList = result.data.map(item => {
                            if(item.prodAdvisePrice == 0){
                                item.prodAdvisePrice = '';
                            }
                            // item.marketType = '';
                            return item;
                        });
                        this.dialogProdVisible = true;
                    }else{
                        this.$message.error(result.msg);
                        this.dialogProdVisible = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        EnsureAdd(prodFormData){
            if(this.selectedProdList.length == 0){
                this.$message.error('请选择要添加的商品！');
                return false;
            }
            const addProdData = this.selectedProdList.map(item => {
                return {
                    prodCode: item.prodCode,
                    // marketCategoryList: JSON.parse('[' + item.marketType + ']'),
                    // marketCategoryList: item.marketType,
                    prodShowName: item.prodShowName,
                    prodAdvisePrice: item.prodAdvisePrice
                }
            });
            const params = {
                hotelId: this.hotelId,
                dtoList: addProdData
            };
            this.$refs[prodFormData].validate((valid, model) => {
                if(valid){
                    // for(let i = 0; i < this.selectedProdList.length; i++){
                    //     if(this.selectedProdList[i].marketType == ''){
                    //         this.$message.error('请选择市场分类！');
                    //         return false;
                    //     }
                    // }
                    // console.log(params);
                    // return
                    this.$api.hotelProdAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('添加酒店商品成功！');
                                this.hotelAllCommodityList();
                                this.dialogProdVisible = false;
                            }else{
                                this.$message.error(result.msg);
                                this.dialogProdVisible = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!');
                    return false
                }
            })
        },
        //查询酒店商品
        inquireProd(){
            this.hotelProdAdd();
        },
        //移除
        hotelProdDelete(id){
            this.hpId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDelete(){
            const params = {};
            const id = this.hpId;
            this.$api.hotelProdDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('酒店商品移除成功！');
                        this.dialogVisibleDelete = false;
                        this.hotelAllCommodityList();
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
        //酒店所有商品列表
        hotelAllCommodityList(){
            const params = {
                // encryptedHotelOrgId: this.orgId,
                prodOwnerOrgKind: 0,
                hotelId: this.hotelId,
                prodName: this.inquireProdName,
                supplName: this.inquireSupplName,
                prodOwnerOrgKind: this.inquireCommodityType,
                pageNo: this.pageNum,
                pageSize: 10
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
                            if(item.onShelf == 0){
                                item.onShelfProd = false
                            }else{
                                item.onShelfProd = true
                            }
                            return item
                        });
                        this.pageTotal = result.data.total;
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
        //修改上架状态
        updateStatus(id,value){
            // console.log(value);
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
            this.hotelAllCommodityList();
            this.$store.commit('setSearchList',{
                inquireProdName: this.inquireProdName,
                inquireSupplName: this.inquireSupplName,
                inquireCommodityType: this.inquireCommodityType
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.hotelAllCommodityList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.hotelAllCommodityList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.hotelAllCommodityList();
        },
    }
}
</script>

<style>
.el-dialog__body{
    padding: 10px 20px 1px 20px;
}
</style>

<style lang="less" scoped>
.commoditymanage{
    .pagination{
        margin-top: 20px;
    }
}
</style>
