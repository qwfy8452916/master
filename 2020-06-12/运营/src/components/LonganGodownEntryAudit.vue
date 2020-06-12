<template>
    <div class="godownEntryAudit">
        <p class="title">入库单审核</p>
        <el-form :model="godownEntryInfo" :inline="true" align=left>
            <el-form-item label="入库单编号" prop="invInCode">
                <el-input :disabled="true" v-model="godownEntryInfo.invInCode"></el-input>
            </el-form-item>
            <el-form-item label="收货日期" prop="receiveAt">
                <el-input :disabled="true" v-model="godownEntryInfo.receiveAt"></el-input>
            </el-form-item>
            <el-form-item label="添加时间" prop="createdAt">
                <el-input :disabled="true" v-model="godownEntryInfo.createdAt"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplName">
                <el-input :disabled="true" v-model="godownEntryInfo.supplName"></el-input>
            </el-form-item>
            <el-form-item label="操作人姓名" prop="empName">
                <el-input :disabled="true" v-model="godownEntryInfo.empName"></el-input>
            </el-form-item>
        </el-form>
        <el-table 
            :data="godownEntryDetailList" 
            border 
            style="width:100%;">
            <el-table-column fixed prop="productName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="数量" align=center></el-table-column>
            <el-table-column prop="sqSign" label="商品编码" align=center></el-table-column>
            <el-table-column prop="productiveAt" label="生产日期" width="160px" align=center></el-table-column>
            <el-table-column prop="expPeriod" label="保质期" align=center></el-table-column>
            <!-- <el-table-column prop="prodRemark" label="备注" align=center></el-table-column> -->
        </el-table><br/>
        <el-button type="primary" @click="turnDown">驳回</el-button>
        <el-button type="primary" @click="thePass">通过</el-button>
        <el-dialog title="提示" :visible.sync="dislogVisibleturnDown" width="30%">
            <el-form :model="turnDownForm" :rules="rule1" ref="turnDownForm">
                <el-form-item prop="causeTurnDown">
                    <el-input
                        type="textarea"
                        :row="2"
                        placeholder="请输入驳回原因"
                        v-model="turnDownForm.causeTurnDown">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleturnDown = false">取 消</el-button>
                <el-button type="primary" @click="EnsureTurnDown('turnDownForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dislogVisiblethePass" width="30%">
            <el-form :model="thePassForm" :rules="rule2" ref="thePassForm">
                <el-form-item prop="causeThePass">
                    <el-input
                        type="textarea"
                        :row="2"
                        placeholder="备注"
                        v-model="thePassForm.causeThePass">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisiblethePass = false">取 消</el-button>
                <el-button type="primary" @click="EnsureThePass('thePassForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganGodownEntryAudit',
    data(){
        return{
            encryptedOprOrgId: '',
            id: '',
            godownEntryInfo: {},
            godownEntryDetailList: [],
            dislogVisibleturnDown: false,
            dislogVisiblethePass: false,
            turnDownForm: {
                causeTurnDown: ''
            },
            thePassForm: {
                causeThePass: ''
            },
            rule1: {
                causeTurnDown: [
                    {required: true, message: '请输入驳回原因', trigger: 'blur'},
                    {min: 1, max: 32, message: '驳回原因请保持在32个字符以内', trigger: ['blur','change']}
                ]
            },
            rule2: {
                causeThePass: [
                    {min: 1, max: 32, message: '备注请保持在32个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        // this.encryptedOprOrgId = localStorage.getItem('orgId');
        this.encryptedOprOrgId = this.$route.params.orgId;
        this.id = this.$route.query.id;
        this.godownEntryDetail();
        this.godownEntryList();
    },
    methods: {
        //详情
        godownEntryDetail(){
            const params = {};
            const id = this.id;
            // console.log(params);
            this.$api.godownEntryDetailInfo(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryInfo = result.data;
                    }else{
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //详情-列表
        godownEntryList(){
             const params = {
                invInId: this.id
            };
            // console.log(params);
            this.$api.godownEntryDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.godownEntryDetailList = result.data.list;
                    }else{
                        this.$message.error('入库单详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //驳回
        turnDown(){
            this.dislogVisibleturnDown = true;
        },
        EnsureTurnDown(turnDownForm){
            let that = this;
            const params = {
                encryptedOprOrgId: this.encryptedOprOrgId,
                approvalRemark: this.turnDownForm.causeTurnDown,
                approveFlag: 1,
                approvedBy: '1',    //TODO：登录的运营商Id
                invInId: this.id
            };
            this.$refs[turnDownForm].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.$api.godownEntryAudit(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.data == true){
                                this.dislogVisibleturnDown = false;
                                that.$message.success('已驳回！');
                                that.$router.push({name: 'LonganGodownEntryList'});
                            }else{
                                this.dislogVisibleturnDown = false;
                                that.$message.error('驳回失败！');
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    // console.log('error submit!');
                    return false;
                }
            });
        },
        //通过
        thePass(){
            this.dislogVisiblethePass = true;
        },
        EnsureThePass(thePassForm){
            let that = this;
            const params = {
                encryptedOprOrgId: this.encryptedOprOrgId,
                approvalRemark: this.thePassForm.causeThePass,
                approveFlag: 2,
                approvedBy: '1',    //TODO：登录的运营商Id
                invInId: this.id
            };
            this.$refs[thePassForm].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.$api.godownEntryAudit(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.data == true){
                                this.dislogVisiblethePass = false;
                                that.$message.success('已通过！');
                                that.$router.push({name: 'LonganGodownEntryList'});
                            }else{
                                this.dislogVisiblethePass = false;
                                that.$message.error('通过失败！');
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    // console.log('error submit!');
                    return false;
                }
            });
        },
    },
}
</script>

<style lang="less" scoped>
.godownEntryAudit{
    text-align: left;
    .title{
        font-weight: bold;
    }
}
</style>

