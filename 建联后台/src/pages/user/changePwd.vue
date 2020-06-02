 <template>
    <div class="deptadd">
        <h2 class="align-left">用户管理</h2>
        <el-form :model="DeptDataAdd" :rules="rules" ref="DeptDataAdd" label-width="80px" class="deptform">
            <el-form-item label="旧密码" prop="deptName">
                <el-input type="password" v-model="DeptDataAdd.deptName"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="deptDesc">
                <el-input type="password" v-model="DeptDataAdd.deptDesc"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="deptRole">
                <el-input type="password" v-model="DeptDataAdd.deptRole"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()" class="cancel-btn">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm()" class="btn-mid">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'changePwd',
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
                callback(new Error('请输入密码'));
            } else {
            if (this.DeptDataAdd.deptDesc !== '') {
                this.$refs.DeptDataAdd.validateField('deptRole');
            }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.DeptDataAdd.deptDesc) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            isSubmit: false,
            DeptDataAdd: {
                deptName: '',
                deptDesc: '',
                deptRole: '',
               
            },
            dataAuth:{
               
            },
            rules: {
                deptName: [
                    {required: true, message: '请填写旧密码', trigger: 'blur'},
                    {min: 6, max: 18, message: '密码长度请保持在6~18个字符之间', trigger: 'blur'}
                ],
                deptDesc: [
                    {required: true, message: '请填写新密码', trigger: 'blur'},
                    {min: 6, max: 18, message: '密码长度请保持在6~18个字符之间', trigger: 'blur'},
                    { validator: validatePass, trigger: 'blur' }
                ],
                deptRole: [
                    {required: true, message: '请填写确认的密码', trigger: 'blur'},
                    {min: 6, max: 18, message: '密码长度请保持在6~18个字符之间', trigger: 'blur'},
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        
    },
    methods: {
        //确定修改密码
        submitForm() {
            let that = this;
            let userid = localStorage.getItem('userID');
            const params = {
                newPassword: that.DeptDataAdd.deptRole,
                password: that.DeptDataAdd.deptName,
            }

            this.$refs['DeptDataAdd'].validate((valid) => {
                if (valid) {
                    if(this.DeptDataAdd.deptName === this.DeptDataAdd.deptDesc){
                        this.$message('新密码不能与旧密码一致');
                        return false;
                    }
                    that.$api.changePWD(params,userid).then(response=>{
                        const result = response.data;
                        if(result.code == '0'){
                            that.$message.success('修改密码成功！');
                            // that.$router.push({name: 'department'});
                        }else{
                            that.$message.error('修改密码失败！');
                        }
                    }).catch(error => {
                        that.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
                    
                }else {
                    that.$message.error('密码填写不规范！');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm() {
        }
    },
}
</script>

<style lang="less" scoped>
.deptadd{
    text-align: left;
    .title{
        font-weight: bold;
        font-size:26px;
    }
    .deptform{
        width: 42%;
    }
}
</style>
