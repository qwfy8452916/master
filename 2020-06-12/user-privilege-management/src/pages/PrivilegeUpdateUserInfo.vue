 <template>
    <div class="usermodify">
        <p class="title">个人信息</p>
        <el-form v-model="UserDataModify" :model="UserDataModify" :rules="rules" ref="UserDataModify" label-width="80px" class="userform">
            <el-form-item label="员工账号" prop="account">
                <el-input :disabled="true" v-model.trim="UserDataModify.account"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="empNo">
                <el-input :disabled="true" v-model.trim="UserDataModify.empNo"></el-input>
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
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('UserDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeUpdateUserInfo',
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
            userId: '',
            isSubmit: false,
            UserDataModify: {},
            rules: {
                account: [
                    {required: true, message: '请填写账号名称', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '账号名称请保持在32个字符以内', trigger: ['blur','change']}
                ],
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
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']},
                    {min: 1, max: 32, message: '邮箱请保持在32个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.userId = localStorage.getItem('userId');
        this.getUserInfo();
    },
    methods: {
        //获取用户信息
        getUserInfo(){
            const params = {};
            const id = this.userId;
            privilegeApi.userDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.UserDataModify = result.data;
                    }else{
                        that.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改用户信息
        submitForm(UserDataModify) {
            let that = this;
            const params = {
                account: that.UserDataModify.account,
                empNo: that.UserDataModify.empNo,
                empName: that.UserDataModify.empName,
                empMobile: that.UserDataModify.empMobile,
                empEmail: that.UserDataModify.empEmail,
                id: this.userId
            };
            // console.log(params);
            this.$refs[UserDataModify].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.userModify(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                that.$message.success('修改信息成功！');
                                localStorage.setItem('userName',that.UserDataModify.empName);
                                that.$emit('update-info');
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
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm() {
            this.$emit('update-info');
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

