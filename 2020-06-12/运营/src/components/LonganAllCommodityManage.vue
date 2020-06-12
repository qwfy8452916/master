<template>
    <div class="commoditymanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-input v-model="inquireCommodityName"></el-input>
            </el-form-item>
            <el-form-item label="形式">
                <el-select v-model="inquireCommodityForm" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="实物" value="1"></el-option>
                    <el-option label="电子" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="inquireCommodityType" placeholder="请选择">
                    <el-option label="全部商品" value=""></el-option>
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
        <el-table :data="CommodityDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="商品id" width="80px" align=center></el-table-column>
            <el-table-column label="商品图片" min-width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.prodLogoUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="prodName" label="商品名称" min-width="240px"></el-table-column>
            <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
            <el-table-column prop="prodCode" label="商品编码" min-width="140px" align=center></el-table-column>
            <el-table-column label="商品形式" min-width="100px">
                <template slot-scope="scope">
                    <span v-if="scope.row.prodType == 1">实物</span>
                    <span v-if="scope.row.prodType == 2">电子</span>
                </template>
            </el-table-column>
            <el-table-column prop="prodKindName" label="类型" min-width="100px" align=center></el-table-column>
            <el-table-column label="供应商名称" min-width="160px">
                <template slot-scope="scope">
                    <span v-if="scope.row.hotelName == null">{{scope.row.merName}}</span>
                    <span v-else>{{scope.row.hotelName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="merName" label="入驻商名称" width="100px"></el-table-column>
            <el-table-column prop="prodSupplName" label="供应商名称" width="100px"></el-table-column> -->
            <!-- <el-table-column prop="prodPurMaxPrice" label="最高采购价" width="100px" align=center></el-table-column>
            <el-table-column prop="prodAdvisePrice" label="建议零售价" width="100px" align=center></el-table-column> -->
            <el-table-column prop="prodWarrantyPeriod" label="保质期" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodUnitMeasure" label="单位" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column label="规格数量" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isSupportSpec == 0">0</span>
                    <span v-if="scope.row.isSupportSpec == 1">{{scope.row.specQty}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="prodUnitMeasure" label="规格" min-width="80px" align=center></el-table-column> -->
            <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == '0'">驳回</span>
                    <span v-if="scope.row.reviewStatus == '1'">通过</span>
                    <span v-if="scope.row.reviewStatus == '2'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="lastUpdatedByName" label="创建人" min-width="100px"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_PROD_ALLPROD_REVIEWPROGRESS'] && scope.row.reviewStatus == 2" type="text" size="small" @click="lookReviewProcess(scope.row.wfId)">审核进度</el-button>
                    <!-- <el-button :disabled="true" type="text" size="small" @click="allCommodityAudit(scope.row.id)">审核</el-button> -->
                    <el-button v-if="authzData['F:BO_PROD_ALLPROD_VIEW']" type="text" size="small" @click="allCommodityDetail(scope.row.id)">详情</el-button>
                    <el-button :disabled="scope.row.specQty>0?false:true" type="text" size="small" @click="prodSpecsDetail(scope.row.id)">规格</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleAudit" width="30%">
            <span>是否确定审核通过？</span>
            <span slot="footer">
                <el-button type="primary" @click="commodityReject">驳回</el-button>
                <el-button type="primary" @click="commodityPass">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dislogVisibleReject" width="30%">
            <el-form :model="RejectForm" :rules="rules" ref="RejectForm">
                <el-form-item prop="causeReject">
                    <el-input
                        type="textarea"
                        :row="2"
                        placeholder="请输入驳回原因"
                        v-model="RejectForm.causeReject">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleReject = false">取 消</el-button>
                <el-button type="primary" @click="ensureReject('RejectForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganAllCommodityManage',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return {
            authzData: '',
            // orgId: '',
            acId: '',
            inquireCommodityName: '',
            inquireCommodityForm: '',
            inquireCommodityType: '',
            CommodityDataList: [],
            dialogVisibleAudit: false,
            dislogVisibleReject: false,
            RejectForm: {},
            rules: {
                causeReject: [
                    {required: true, message: '请输入驳回原因', trigger: 'blur'},
                    {min: 1, max: 32, message: '驳回原因请保持在32个字符以内', trigger: ['blur','change']}
                ]
            },
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.allCommodityList();
    },
    methods: {
        resetFunc(){
            this.inquireCommodityName = ''
            this.inquireCommodityForm = ''
            this.inquireCommodityType = ''
            this.allCommodityList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.allCommodityList();
        },
        //商品列表
        allCommodityList(){
           const params = {
                // encryptedOprOrgId: this.orgId,
                orgAs: '',
                prodName: this.inquireCommodityName,
                prodType: this.inquireCommodityForm,
                prodOwnerOrgKind: this.inquireCommodityType,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.platformCommodityList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataList = result.data.records;
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
        //审核
        allCommodityAudit(id){
            this.acId = id;
            this.dialogVisibleAudit = true;
        },
        //驳回
        commodityReject(){
            this.dialogVisibleAudit = false;
            this.dislogVisibleReject = true;
        },
        //驳回 - 确定
        ensureReject(RejectForm){
            const params = {
                id: this.acId,
                causeReject: this.RejectForm.causeReject,
            };
            this.$refs[RejectForm].validate((valid) => {
                if(valid){
                    console.log(params);
                    // this.$api.allCommodityAudit(params)
                    //     .then(response => {
                    //         // console.log(response);
                    //         const result = response.data;
                    //         if(result.data == true){
                    //             this.dislogVisibleReject = false;
                    //             this.allCommodityList();
                    //         }else{
                    //             this.dislogVisibleReject = false;
                    //             this.$message.error('驳回失败！');
                    //         }
                    //     })
                    //     .catch(error => {
                    //         this.$alert(error,"警告",{
                    //             confirmButtonText: "确定"
                    //         })
                    //     })
                }else{
                    console.log('error submit!');
                    return false;
                }
            });
        },
        //通过
        commodityPass(){
            const params = {
                id: this.acId,
            };
            console.log(params);
            // this.$api.allCommodityAudit(params)
            //     .then(response => {
            //         // console.log(response);
            //         const result = response.data;
            //         if(result.data == true){
            //             this.dialogVisibleAudit = false;
            //             this.allCommodityList();
            //         }else{
            //             this.dialogVisibleAudit = false;
            //             this.$message.error('通过失败！');
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        //详情
        allCommodityDetail(id){
            this.$router.push({name: 'LonganAllCommodityDetail', query: {id}});
        },
        //规格
        prodSpecsDetail(id){
            this.$router.push({name: 'LonganProdSpecsList', query: {id}});
        },
        //查询
        inquire(){
            this.allCommodityList();
            this.$store.commit('setSearchList',{
                inquireCommodityName: this.inquireCommodityName,
                inquireCommodityForm: this.inquireCommodityForm,
                inquireCommodityType:this.inquireCommodityType
            })
        },
        //查看审核进度
        lookReviewProcess(id){
            this.$router.push({name: 'LonganProcessDetails', query: {id}});
        }
    }
}
</script>

<style lang="less" scoped>
.commoditymanage{
    .pagination{
        margin-top: 20px;
    }
}
</style>
