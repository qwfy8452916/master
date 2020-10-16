<template>
    <div class="featuredetaillist">
        <el-form :inline="true" align=left>
            <el-form-item label="标题">
                <el-input v-model="inquireTitle"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_HOTEL_FEATURE_DETAIL_ADD']"><el-button class="addbutton" @click="featureDetailAdd">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="FeatureDetailDataList" border style="width:100%;" >
            <el-table-column prop="imgUrl" label="商品图片" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt="" style="width:45px;height:35px">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewStatus == '0'">驳回</span>
                    <span v-if="scope.row.reviewStatus == '1'">通过</span>
                    <span v-if="scope.row.reviewStatus == '2'">待审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="isActive" label="是否有效" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isActive == 0">否</span>
                    <span v-if="scope.row.isActive == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_HOTEL_FEATURE_REVIEWPROGRESS'] && scope.row.reviewStatus == 2" type="text" size="small" @click="lookReviewProcess(scope.row.wfId)">审核进度</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_FEATURE_DETAIL_EDIT']" type="text" size="small" @click="modifyFeatureDetail(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_HOTEL_FEATURE_DETAIL_DELETE']" type="text" size="small" @click="deleteFeatureDetail(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该酒店客房设施明细？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="EnsureDetail">确定</el-button>
            </span>
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
    </div>
</template>

<script>
export default {
    name: 'LonganHotelFeatureDetail',
    data(){
        return{
            authzData: '',
            hfId: '',
            inquireTitle: '',
            fdId: '',
            FeatureDetailDataList: [],
            dialogVisibleDelete: false,
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hfId = this.$route.query.id;
        this.featureDetailList();
    },
    methods: {
        //客房设施明细列表
        featureDetailList(){
            const params = {
                featureHotelId: this.hfId,
                title: this.inquireTitle,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.hotelFeatureDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        // this.FeatureDetailDataList = result.data.records;
                        this.FeatureDetailDataList = result.data.records.map(item => {
                            item.imgUrl = item.imageDTOS[0].url
                            // console.log(item.imgUrl);
                            return item
                        });
                        // console.log(this.FeatureDetailDataList);
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('酒店客房设施明细列表获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //新增
        featureDetailAdd(){
            const id = this.hfId;
            this.$router.push({name: 'LonganHotelFeatureDetailAdd', query: {id}});
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.featureDetailList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.featureDetailList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.featureDetailList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.featureDetailList();
        },
        //修改
        modifyFeatureDetail(id){
            const hfDetailId = id;
            const hfId = this.hfId;
            this.$router.push({name:'LonganHotelFeatureDetailModify', query: {hfDetailId, hfId}});
        },
        //删除
        deleteFeatureDetail(id){
            this.fdId = id;
            this.dialogVisibleDelete = true;
        },
        EnsureDetail(){
            const id = this.fdId;
            const params = {};
            this.$api.hotelFeatureDetailDelete(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data){
                            this.$message.success('删除酒店客房设施明细成功！');
                            this.dialogVisibleDelete = false;
                            this.featureDetailList();
                        }else{
                            this.$message.error('删除酒店客房设施明细失败！');
                            this.dialogVisibleDelete = false;
                        }
                    }else{
                        this.$message.error('删除酒店客房设施明细失败！');
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
            this.$router.push({name: 'LonganProcessDetails', query: {id}});
        }
    },
}
</script>

<style>
.el-dialog__header{
    text-align: left;
}
</style>

<style lang="less" scoped>
.featuredetaillist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

