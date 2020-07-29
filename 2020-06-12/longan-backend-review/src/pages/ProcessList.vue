<template>
    <div class="ProcessList">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="业务类型">
                <el-select v-model="bizType">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in businesstypeList"
                        :key="item.index"
                        :label="item.dictName"
                        :value="item.dictValue"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务id">
                <el-input v-model="bizId"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="reviewStatus">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="0" label="待审核"></el-option>
                    <el-option value="1" label="已审核"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="完成时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="ProcessDataList" border stripe style="width:100%;" >
            <el-table-column prop="bizId" label="业务id" width="80px" align=center></el-table-column>
            <el-table-column prop="bizType" label="业务类型" align=center></el-table-column>
            <el-table-column prop="createdAt" label="提交时间" width="160px" align=center></el-table-column>
            <el-table-column prop="isComplete" label="审核状态" width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isComplete == '0'">待审核</span>
                    <span v-else-if="scope.row.isComplete == '1'">已审核</span>
                </template>
            </el-table-column>
            <el-table-column prop="reviewResult" label="审核结果" width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.reviewResult == '0'">驳回</span>
                    <span v-else-if="scope.row.reviewResult == '1'">通过</span>
                    <span v-else-if="scope.row.reviewResult == '2'"></span>
                </template>
            </el-table-column>
            <el-table-column prop="completeTime" label="完成时间" width="160px" align=center></el-table-column>
            <el-table-column label="操作" width="120px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:CM_REV_START_VIEW']" type="text" size="small" @click="lookDetail(scope.row.procInstId)">查看详情</el-button>
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
    name: 'ProcessList',
    data() {
        return{
            authzlist: {}, //权限数据
            orgId: '',
            orgAs: '',
            
            bizType:'',
            businesstypeList: [],
            bizId: '',
            reviewStatus: '0',
            inquireTime: [],

            ProcessDataList: [],

            pageTotal: 1,
            currentPage: 1,
            pageNum: 1
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.orgAs = localStorage.getItem('orgAs');
        (privilegeJur.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.getbusinessty();
        this.ProcessList();
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
        //发起的流程
        ProcessList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                // encryOrgId: this.orgId,

                bizType: this.bizType,
                bizId: this.bizId,
                reviewStatus: this.reviewStatus,
                startTime: this.inquireTime[0],
                endTime: this.inquireTime[1],
            };
            privilegeApi.getProcessList(params).then(response=>{
                if(response.data.code==0){
                    this.ProcessDataList = response.data.data.records;
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
            this.ProcessList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.ProcessList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.ProcessList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.ProcessList();
        },
        //查看详情
        lookDetail(id){
            // this.$router.push({name: 'HotelRevenueDetail', query: {id}});
            this.$emit('process-details', id);
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
.ProcessList{
    .pagination{
        margin-top: 20px;
    }
}
</style>

