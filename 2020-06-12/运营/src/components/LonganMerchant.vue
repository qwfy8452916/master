<template>
    <div class="LonganMerchant">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="入驻商名称">
                <el-input v-model="Merchantname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div v-if="authzData['F:BO_MER_MER_ADD']"><el-button class="addbutton" @click="addMerchant">新&nbsp;&nbsp;增</el-button></div>
        <el-table :data="LonganMerchantDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="入驻商id" min-width="80px" align=center></el-table-column>
            <el-table-column prop="merchantType" label="类型" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.merchantType == 'c'">企业</span>
                    <span v-else>个人</span>
                </template>
            </el-table-column>
            <el-table-column prop="merchantType" label="企业信用代码/身份证" min-width="170px">
                <template slot-scope="scope">
                    <span v-if="scope.row.merchantType == 'c'">{{scope.row.merchantUscc}}</span>
                    <span v-else>{{scope.row.merchantIdno}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="merchantName" label="入驻商名称" min-width="120px"></el-table-column>
            <el-table-column prop="merchantContact" label="联系人" min-width="100px"></el-table-column>
            <el-table-column prop="merchantContactPhone" label="手机号" min-width="120px" align=center></el-table-column>
            <el-table-column prop="" label="区域" min-width="180px">
                <template slot-scope="scope">
                    <span v-if="scope.row.province != null">{{scope.row.province.dictName}}</span>
                    <span v-if="scope.row.city != null">{{scope.row.city.dictName}}</span>
                    <span v-if="scope.row.area != null">{{scope.row.area.dictName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="merchantLoginAddress" label="登录地址"></el-table-column> -->
            <el-table-column prop="createdAt" label="添加时间" min-width="160px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="160px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_MER_MER_EDIT']" type="text" size="small" @click="changeMerchant(scope.row.id)">修改</el-button>
                    <el-button v-if="authzData['F:BO_MER_MER_DELETE']" type="text" size="small" @click="deleteshow(scope.row.id)">删除</el-button>
                    <el-button v-if="authzData['F:BO_MER_MER_RESETPWD']" type="text" size="small" @click="changepwdshow(scope.row.id)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>确认删除该入驻商？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="deleteMerchant">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dislogVisibleResetPWD" width="30%">
            <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="80px">
                <el-form-item label="新密码" prop="newpwd">
                    <el-input type="password" v-model.trim="resetForm.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="ensurepwd">
                    <el-input type="password" v-model.trim="resetForm.ensurepwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleResetPWD = false">取 消</el-button>
                <el-button type="primary" @click="changepwd('resetForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganMerchant',
    components:{
        LonganPagination,
        resetButton
    },
    data(){
        var validateNewPwd = (rule,value,callback) =>{
            if(!value){
                callback(new Error('请输入新密码'));
            }else if(value.toString().length < 6 || value.toString().length > 18){
                callback(new Error('密码长度为6 ~ 18个字符'));
            }else{
                callback();
            }
        };
        var validateEnsurePwd = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.resetForm.newpwd){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        };
        return {
            authzData: '',
            // orgId: '',

            Merchantid: '',
            Merchantname: '',
            LonganMerchantDataList: [],

            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,

            dialogVisibleDelete: false,
            dislogVisibleResetPWD: false,
            //重置密码
            resetForm: {
                newpwd: '',
                ensurepwd: ''
            },
            resetRules: {
                newpwd: [
                    {required: true, validator: validateNewPwd, trigger: 'blur'}
                ],
                ensurepwd: [
                    {required: true, validator: validateEnsurePwd, trigger: 'blur'}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getLonganMerchant();
    },
    methods: {
        resetFunc(){
            this.Merchantname = ''
            this.getLonganMerchant();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getLonganMerchant();
        },
        //入驻商
        getLonganMerchant(){
            const params = {
                // oprOrgId: this.orgId,
                orgAs: 2,
                name: this.Merchantname,

                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            this.$api.getLonganMerchant(params).then(response => {
                const result = response.data;
                if(result.code == 0){
                    this.LonganMerchantDataList = result.data.records;
                    this.pageTotal = result.data.total;
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                   })
                }
            }).catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.getLonganMerchant();
            this.$store.commit('setSearchList',{
                Merchantname: this.Merchantname
            })
        },
        //新增入驻商
        addMerchant(){
            this.$router.push({name:'LonganMerchantadd'});
        },
        //修改入驻商
        changeMerchant(id){
            this.$router.push({name:'LonganMerchantchange', query: {id}});
        },
        //删除入驻商
        deleteshow(id){
            this.Merchantid = id;
            this.dialogVisibleDelete = true;
        },
        deleteMerchant(){
            this.$api.deleteMerchant(this.Merchantid).then(response => {
                const result = response.data;
                if(result.code == 0){
                    if(result.data){
                        this.dialogVisibleDelete = false;
                        this.getLonganMerchant();
                    }
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                   })
                }
            }).catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //重置密码
        changepwdshow(id){
            this.resetForm.newpwd = '';
            this.resetForm.ensurepwd = '';
            this.Merchantid = id;
            this.dislogVisibleResetPWD = true;
        },
        changepwd(resetForm){
            const id = this.Merchantid;
            const params = {
                id: this.Merchantid,
                newPassword: this.resetForm.newpwd
            };
            this.$refs[resetForm].validate((valid) => {
                if (valid) {
                    this.$api.changepwd(id,params).then(response => {
                        if(response.data.code == 0){
                            this.$message.success('重置密码成功！');
                            this.dislogVisibleResetPWD = false;
                        }else{
                            this.$message.error('重置密码失败！');
                            this.dislogVisibleResetPWD = false;
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                        this.dislogVisibleResetPWD = false;
                    })
                }else{
                    // console.log('error!');
                    return false
                }
            })
        },
    }
}
</script>

<style scoped>
.el-dialog__footer{
    text-align: center;
}
.el-date-editor.el-input{
    width: 100%;
}
</style>

<style lang="less" scoped>
.LonganMerchant{
    .pagination{
        margin-top: 20px;
    }
}
</style>
