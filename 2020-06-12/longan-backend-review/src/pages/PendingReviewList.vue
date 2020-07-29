<template>
    <div class="PendingReviewList">
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
        
        <el-table :data="PendingReviewListDataList" border stripe style="width:100%;" >
            <el-table-column prop="bizType" label="业务类型" align=center></el-table-column>
            <el-table-column prop="bizId" label="业务id" align=center></el-table-column>
            <el-table-column prop="bizInitiator" label="提交人" align=center></el-table-column>
            <el-table-column prop="bizInitiatorTime" label="提交时间" width="160px" align=center></el-table-column>
            <el-table-column prop="name" label="任务名称" align=center></el-table-column>
            <el-table-column prop="createTime" label="开始时间" width="160px" align=center></el-table-column>
            <el-table-column label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:CM_REV_UNREV']" type="text" size="small" @click="review(scope.row.id)">审核</el-button>
                    <el-button v-if="authzlist['F:CM_REV_UNREV_VIEW']" type="text" size="small" @click="lookDetail(scope.row.processInstanceId,scope.row.id)">查看详情</el-button>
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
        <el-dialog class="changebox" title="审核" :visible.sync="dialogFormVisible" center>
            <el-form :model="form" :rules="rules" ref="form" class="chengebox">
                <el-form-item label="审核结果" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.reviewResult">
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="0">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" v-model.trim="form.comments" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="authzlist['F:CM_REV_UNREV_SUBMIT']" type="primary" @click="reviewsub()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJur from '../request/jurisdiction.js'
export default {
    name: 'PendingReviewList',
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

            PendingReviewListDataList: [],

            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,

            revieid: '',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
               reviewResult: '',
               comments: ''
            },
            rules: {
                proTaxRate:[
                    {required: true, trigger: ['blur','change']}
                ],
                proLossAmount:[
                    {required: true, trigger: ['blur','change']}
                ],
            }
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.orgAs = localStorage.getItem('orgAs');
        (privilegeJur.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.getbusinessty();
        this.PendingReviewList();
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
        //待审核
        PendingReviewList(){
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                // encryptedOprOrgId: this.orgId,

                processDefinitionKeyLike: this.businesstype,
                processInstanceBusinessKeyLike: this.businessid,
                bizInitiator: this.bizInitiator,
                nameLike: this.nameLike
            };
            privilegeApi.getPendingReviewList(params).then(response=>{
                let result = response.data;
                if(result.code==0){
                    this.PendingReviewListDataList = result.data.data.map(item => {
                        for(let i in item.variables){
                            if(item.variables[i].name == "bizInitiator"){
                                item.bizInitiator = item.variables[i].value;
                            }else if(item.variables[i].name == "bizId"){
                                item.bizId = item.variables[i].value;
                            }else if(item.variables[i].name == "bizType"){
                                item.bizType = item.variables[i].value;
                            }else if(item.variables[i].name == "bizInitiatorTime"){
                                item.bizInitiatorTime = item.variables[i].value;
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
            this.PendingReviewList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.PendingReviewList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.PendingReviewList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.PendingReviewList();
        },
        //查看详情
        lookDetail(id,reviewid){
            // this.$router.push({name: 'HotelRevenueDetail', query: {id}});
            this.$emit('pendingreview-details', {id,reviewid});
        },
        //审核
        review(id){
            this.revieid = id;
            this.dialogFormVisible = true;
        },
        reviewsub(){
            if(this.form.reviewResult == ''){
                this.$message.error('请选择审核结果');
                return false;
            }else if(this.form.reviewResult == '0' && this.form.comments == ''){
                this.$message.error('请填写驳回理由');
                return false;
            }
            const params = {
                comments : this.form.comments,
                // encryptedOprOrgId : this.orgId,
                reviewResult : this.form.reviewResult
            };
            privilegeApi.postreview(this.revieid,params).then(response=>{
                let result = response.data;
                if(result.code==0){
                    this.dialogFormVisible = false;
                    this.PendingReviewList();
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
.PendingReviewList{
    .pagination{
        margin-top: 20px;
    }
}
</style>

