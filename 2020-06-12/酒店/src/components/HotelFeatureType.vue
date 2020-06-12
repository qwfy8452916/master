<template>
    <div class="featuretype">
        <div><el-button class="addbutton" v-if="authzlist['F:BH_HOTEL_FEATURETYPEADD']" @click="hotelFeatureAdd">添加客房设施分类</el-button></div>
        <el-table 
            :data="hotelFeatureDataList" 
            border 
            style="width:100%;">
            <el-table-column prop="feTypeName" label="客房设施分类"></el-table-column>
            <!-- <el-table-column prop="reviewStatus" label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == 0">驳回</span>
                    <span v-if="scope.row.reviewStatus == 1">通过</span>
                    <span v-if="scope.row.reviewStatus == 2">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效">
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <!-- <el-button v-if="scope.row.reviewStatus == 2 && authzlist['F:BH_HOTEL_FEATURETYPE_REVIEW']" type="text" size="small" @click="lookReviewProcess(scope.row.wfId)">审核进度</el-button> -->
                    <el-button v-if="authzlist['F:BH_HOTEL_FEATURETYPEDELETE']" type="text" size="small" @click="deleteHotelFeature(scope.row.id)">移除</el-button>
                    <el-button v-if="authzlist['F:BH_HOTEL_FEATURETYPE_DETAIL']" type="text" size="small" @click="detailHotelFeature(scope.row.id)">客房设施明细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认移除该特色分类？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelFeatureType',
    data(){
        return {
            // orgId: '',
            authzlist: {}, //权限数据
            hotelId: '',
            hotelFeatureDataList: [],
            hfId: '',
            dialogVisibleDelete: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.hotelFeatureList();
    },
    methods: {
        //客房设施列表
        hotelFeatureList(){
            const params = {
                // encryptedhotelOrgId: this.orgId,
                orgAs: 3,
                hotelId: this.hotelId
            };
            // console.log(params);
            this.$api.hotelFeatureList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.hotelFeatureDataList = result.data.records;
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
        //添加特色分类
        hotelFeatureAdd(){
            this.$router.push({name: 'HotelFeatureTypeAdd'});
        },
        //移除
        deleteHotelFeature(id){
            this.hfId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const params = {};
            const id = this.hfId;
            // console.log(params);
            this.$api.deleteHotelFeature(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data){
                            this.$message.success('客房设施移除成功！');
                            this.hotelFeatureList();
                            this.dialogVisibleDelete = false;
                        }else{
                            this.$message.error('客房设施移除失败！');
                            this.dialogVisibleDelete = false;
                        }
                    }else{
                        this.$message.error('客房设施移除失败！');
                        this.dialogVisibleDelete = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //特色分类明细
        detailHotelFeature(id){
            this.$router.push({name: 'HotelFeatureTypeDetail', query: {id}});
        },
        //查看审核进度
        lookReviewProcess(id){
            this.$router.push({name: 'HotelProcessDetails', query: {id}});
        }
    }
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>
