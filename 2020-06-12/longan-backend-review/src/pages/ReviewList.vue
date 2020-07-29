<template>
    <div class="ReviewList">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="业务类型">
                <el-select v-model="businesstype">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in businesstypeList"
                        :key="item.index"
                        :label="item.dictName"
                        :value="item.dictValue"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务id">
                <el-input v-model="businessid"></el-input>
            </el-form-item>
            <el-form-item label="提交人id">
                <el-input v-model="bizInitiator"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
                <el-input v-model="nameLike"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="ReviewListDataList" border stripe style="width:100%;" >
            <el-table-column prop="bizType" label="业务类型" align=center></el-table-column>
            <el-table-column prop="bizId" label="业务id" align=center></el-table-column>
            <el-table-column prop="bizInitiator" label="提交人" align=center></el-table-column>
            <el-table-column prop="bizInitiatorTime" label="提交时间" width="160px" align=center></el-table-column>
            <el-table-column prop="name" label="任务名称" align=center></el-table-column>
            <el-table-column prop="createTime" label="开始时间" width="160px" align=center></el-table-column>
            <el-table-column prop="endTime" label="完成时间" width="160px" align=center></el-table-column>
            <el-table-column prop="reviewResult" label="审核结果" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewResult == '1'">通过</span>
                    <span v-else-if="scope.row.reviewResult == '0'">驳回</span>
                </template>
            </el-table-column>
            <el-table-column prop="comments" label="备注" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:CM_REV_REVED_VIEW']" type="text" size="small" @click="lookDetail(scope.row.processInstanceId)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
import privilegeApi from '../request/api.js'
import privilegeJur from '../request/jurisdiction.js'
export default {
    name: 'ReviewList',
    data() {
        return{
            authzlist: {}, //权限数据
            orgId: '',
            orgAs: '',

            businesstype: '',
            businesstypeList: [],
            businessid: '',
            bizInitiator: '',
            nameLike: '',

            ReviewListDataList: [],

            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.orgAs = localStorage.getItem('orgAs');
        (privilegeJur.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.getbusinessty();
        this.ReviewList();
    },
    methods: {
        //获取业务类型
        getbusinessty(){
            const params = {
                orgAs: this.orgAs,
                key: "REVIEW_BIZ_TYPE",
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            privilegeApi.getbusinessty(params).then(response=>{
                if(response.data.code==0){
                    this.businesstypeList = response.data.data;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //已审核
        ReviewList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                // encryptedOprOrgId: this.orgId,

                processDefinitionKeyLike: this.businesstype,
                processInstanceBusinessKeyLike: this.businessid,
                bizInitiator: this.bizInitiator,
                nameLike: this.nameLike
            };
            privilegeApi.getReviewList(params).then(response=>{
                let result = response.data;
                if(result.code==0){
                    this.ReviewListDataList = result.data.data.map(item => {
                        for(let i in item.variables){
                            if(item.variables[i].name == "bizInitiator"){
                                item.bizInitiator = item.variables[i].value;
                            }else if(item.variables[i].name == "bizId"){
                                item.bizId = item.variables[i].value;
                            }else if(item.variables[i].name == "bizType"){
                                item.bizType = item.variables[i].value;
                            }else if(item.variables[i].name == "bizInitiatorTime"){
                                item.bizInitiatorTime = item.variables[i].value;
                            }else if(item.variables[i].name == "reviewResult"){
                                item.reviewResult = item.variables[i].value;
                            }else if(item.variables[i].name == "comments"){
                                item.comments = item.variables[i].value;
                            }
                        }
                        return item;
                    });
                    this.pageTotal = response.data.data.total;
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.ReviewList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.ReviewList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.ReviewList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.ReviewList();
        },
        //查看详情
        lookDetail(id){
            // this.$router.push({name: 'HotelRevenueDetail', query: {id}});
            this.$emit('review-details', id);
        }
    }
}
</script>

<style>
.el-transfer-panel{
    text-align: left;
}
</style>

<style lang="less" scoped>
.ReviewList{
    .pagination{
        margin-top: 20px;
    }
}
</style>

