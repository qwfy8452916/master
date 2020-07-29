 <template>
    <div class="usermodify">
        <p class="title">修改密码</p>
        <el-form :model="UserDataModify" :rules="rules" ref="UserDataModify" label-width="80px" class="userform">
            <el-form-item label="旧密码" prop="oldPWD">
                <el-input v-model.trim="UserDataModify.oldPWD"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPWD">
                <el-input v-model.trim="UserDataModify.newPWD"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPWD">
                <el-input v-model.trim="UserDataModify.confirmPWD"></el-input>
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
    name: 'PrivilegeUpdatePWD',
    data(){
        return{
            authzData: '',
            userId: '',
            isSubmit: false,
            UserDataModify: {},
            rules: {
                oldPWD: [
                    {required: true, message: '请填写旧密码', trigger: 'blur'},
                    {min: 1, max: 18, message: '密码请保持在18个字符以内', trigger: ['blur','change']}
                ],
                newPWD: [
                    {required: true, message: '请填写新密码', trigger: 'blur'},
                    {min: 6, max: 18, message: '密码请保持在6至18个字符以内', trigger: ['blur','change']}
                ],
                confirmPWD: [
                    {required: true, message: '请填写确认密码', trigger: 'blur'},
                    {min: 6, max: 18, message: '密码请保持在6至18个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.userId = localStorage.getItem('userId');
    },
    methods: {
        //确定-修改密码
        submitForm(UserDataModify) {
            let that = this;
            const params = {
                oldPassword: that.UserDataModify.oldPWD,
                newPassword: that.UserDataModify.newPWD
            };
            const id = this.userId;
            // console.log(params);
            this.$refs[UserDataModify].validate((valid) => {
                if (valid) {
                    if(that.UserDataModify.newPWD != that.UserDataModify.confirmPWD){
                        that.$message.error('密码输入不一致');
                        return false;
                    }
                    this.isSubmit = true;
                    privilegeApi.pwdModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                that.$message.success('密码修改成功！');
                                that.$emit('go-login');
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
            this.$emit('go-index');
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

