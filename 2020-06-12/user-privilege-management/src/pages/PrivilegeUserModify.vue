 <template>
    <div class="usermodify">
        <p class="title">修改用户信息</p>
        <el-form v-model="UserDataModify" :model="UserDataModify" :rules="rules" ref="UserDataModify" label-width="80px" class="userform">
            <el-form-item label="员工账号" prop="account">
                <el-input placeholder="建议使用手机号" v-model.trim="UserDataModify.account" @blur="isAccount"></el-input>
            </el-form-item>
            <!-- <el-form-item label="登录密码" prop="password">
                <el-input :disabled="true" v-model="UserDataModify.password"></el-input>
            </el-form-item> -->
            <el-form-item label="工号" prop="empNo">
                <el-input v-model.trim="UserDataModify.empNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="empName">
                <el-input v-model="UserDataModify.empName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="empMobile">
                <el-input v-model="UserDataModify.empMobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="empEmail">
                <el-input v-model.trim="UserDataModify.empEmail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('UserDataModify')">取消</el-button>
                <el-button v-if="authzData['F:CM_USER_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('UserDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeUserModify',
    data(){
        var validatePhone = (rule,value,callback) => {
            if(!value){
                return callback(new Error('手机号码不能为空！'))
            }else{
                const phoneReg = /^1\d{10}$/
                if(!phoneReg.test(value)){
                    return callback(new Error('格式有误'))
                }else{
                    callback()
                }
            }
        }
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            isSubmit: false,
            UserDataModify: {},
            rules: {
                account: [
                    {required: true, message: '请填写账号名称', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '账号名称请保持在32个字符以内', trigger: ['blur','change']}
                ],
                // password: [
                //     {required: true, message: '请填写密码', trigger: 'blur'},
                //     {min: 6, max: 32, message: '登录密码请保持在6位以上', trigger: ['blur','change']}
                // ],
                empNo: [
                    {min: 1, max: 32, message: '工号请保持在32个字符以内', trigger: ['blur','change']}
                ],
                empName: [
                    {required: true, message: '请填写姓名', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '姓名请保持在32个字符以内', trigger: ['blur','change']}
                ],
                empMobile: [
                    {required: true, validator: validatePhone, trigger: ['blur','change']}
                ],
                empEmail: [
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // console.log(this.$route.params.id);
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        // this.orgType = localStorage.getItem('orgType');
        this.getUserInfo();
    },
    methods: {
        //获取用户信息
        getUserInfo(){
            // const params = {id: this.$route.params.id};
            const params = {};
            const id = this.$route.params.id;
            privilegeApi.userDetail(params, id)
                .then(response => {
                    if(response.data.code == 0){
                        this.UserDataModify = response.data.data;
                    }else{
                        that.$message.error('获取用户信息失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //判断账号是否存在
        isAccount(){
            const params = {
                account: this.UserDataModify.account,
                id: this.$route.params.id
            };
            // console.log(params);
            if(this.UserDataModify.account){
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
        //确定-修改用户信息
        submitForm(UserDataModify) {
            let that = this;
            // var params;
            // if(this.orgType == 2){
            //     params = {
            //         account: that.UserDataModify.account,
            //         password: that.UserDataModify.password,
            //         empNo: that.UserDataModify.empNo,
            //         empName: that.UserDataModify.empName,
            //         empMobile: that.UserDataModify.empMobile,
            //         empEmail: that.UserDataModify.empEmail,
            //         id: that.$route.params.id,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     params = {
            //         account: that.UserDataModify.account,
            //         password: that.UserDataModify.password,
            //         empNo: that.UserDataModify.empNo,
            //         empName: that.UserDataModify.empName,
            //         empMobile: that.UserDataModify.empMobile,
            //         empEmail: that.UserDataModify.empEmail,
            //         id: that.$route.params.id,
            //         encryOtherId: this.orgId
            //     };
            // }
            const params = {
                account: that.UserDataModify.account,
                // password: that.UserDataModify.password,
                empNo: that.UserDataModify.empNo,
                empName: that.UserDataModify.empName,
                empMobile: that.UserDataModify.empMobile,
                empEmail: that.UserDataModify.empEmail,
                id: that.$route.params.id
            };
            // console.log(params);
            this.$refs[UserDataModify].validate((valid) => {
                if (valid) {
                    //  console.log('submit!!');
                    this.isSubmit = true;
                    privilegeApi.userModify(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                that.$message.success('修改用户信息成功！');
                                that.$emit('user-list');
                            }else{
                                this.isSubmit = false;
                                that.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
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
        resetForm(UserDataModify) {
            // this.$refs[UserDataModify].resetFields();
            // this.getUserInfo();
            this.$emit('user-list');
        }
    },
}
</script>

<style lang="less" scoped>
.usermodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .userform{
        width: 42%;
    }
}
</style>

