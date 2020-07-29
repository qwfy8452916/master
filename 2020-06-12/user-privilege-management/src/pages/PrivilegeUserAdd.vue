 <template>
    <div class="useradd">
        <p class="title">新增用户</p>
        <el-form :model="UserDataAdd" :rules="rules" ref="UserDataAdd" label-width="80px" class="userform">
            <el-form-item label="员工账号" prop="employeesAccount">
                <el-input placeholder="建议使用手机号" v-model.trim="UserDataAdd.employeesAccount" @blur="isAccount()"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="userPWD">
                <el-input type="password" v-model.trim="UserDataAdd.userPWD"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber">
                <el-input v-model.trim="UserDataAdd.jobNumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="UserDataAdd.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobilePhone">
                <el-input v-model="UserDataAdd.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model.trim="UserDataAdd.userEmail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('UserDataAdd')">取&nbsp;&nbsp;消</el-button>
                <el-button v-if="authzData['F:CM_USER_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('UserDataAdd')">确&nbsp;&nbsp;定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeUserAdd',
    data(){
        var phoneReg = /^1\d{10}$/
        var validatePhone = (rule,value,callback) => {
            // if(!value){
            //     return callback(new Error('联系电话不能为空！'))
            // }
            if(!phoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            isSubmit: false,
            UserDataAdd: {
                employeesAccount: '',
                userPWD: '',
                jobNumber: '',
                userName: '',
                mobilePhone: '',
                userEmail: ''
            },
            rules: {
                employeesAccount: [
                    {required: true, message: '请填写账号名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '账号名称请保持在32个字符以内', trigger: 'blur'}
                ],
                userPWD: [
                    {required: true, message: '请填写密码', trigger: 'blur'},
                    {min: 6, max: 32, message: '登录密码请保持在6~32位之间', trigger: ['blur','change']}
                ],
                jobNumber: [
                    {min: 1, max: 32, message: '工号请保持在32个字符以内', trigger: ['blur','change']}
                ],
                userName: [
                    {required: true, message: '请填写姓名', trigger: 'blur'},
                    {min: 1, max: 32, message: '姓名请保持在32个字符以内', trigger: 'blur'}
                ],
                mobilePhone: [
                    {required: true, validator: validatePhone,trigger: ['blur','change']}
                ],
                userEmail: [
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = window.orgId;
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        // this.orgType = localStorage.getItem('orgType');
    },
    methods: {
        //判断账号是否存在
        isAccount(){
            const params = {
                account: this.UserDataAdd.employeesAccount
            };
            if(this.UserDataAdd.employeesAccount){
                privilegeApi.isAccount(params)
                    .then(response => {
                        if(response.data.code == '0'){
                            this.isSubmit = false;
                        }else{
                            this.$message.error('员工账号已存在！');
                            this.isSubmit = true;
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        //确定-添加用户
        submitForm(UserDataAdd) {
            let that = this;
            // var params;
            // if(this.orgType == 2){
            //     params = {
            //         account: that.UserDataAdd.employeesAccount,
            //         password: that.UserDataAdd.userPWD,
            //         empNo: that.UserDataAdd.jobNumber,
            //         empName: that.UserDataAdd.userName,
            //         empMobile: that.UserDataAdd.mobilePhone,
            //         empEmail: that.UserDataAdd.userEmail,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     params = {
            //         account: that.UserDataAdd.employeesAccount,
            //         password: that.UserDataAdd.userPWD,
            //         empNo: that.UserDataAdd.jobNumber,
            //         empName: that.UserDataAdd.userName,
            //         empMobile: that.UserDataAdd.mobilePhone,
            //         empEmail: that.UserDataAdd.userEmail,
            //         encryOtherId: this.orgId
            //     };
            // }
            const params = {
                account: that.UserDataAdd.employeesAccount,
                password: that.UserDataAdd.userPWD,
                empNo: that.UserDataAdd.jobNumber,
                empName: that.UserDataAdd.userName,
                empMobile: that.UserDataAdd.mobilePhone,
                empEmail: that.UserDataAdd.userEmail
            };
            // console.log(params);
            // return
            this.$refs[UserDataAdd].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.userAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                that.$message.success('新增用户成功！');
                                that.$emit('user-list');
                            }else{
                                this.isSubmit = false;
                                that.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            that.isSubmit = false;
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                }else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(UserDataAdd) {
            // this.$refs[UserDataAdd].resetFields();
            this.$emit('user-list');
        }
    },
}
</script>

<style lang="less" scoped>
.useradd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .userform{
        width: 42%;
    }
}
</style>

