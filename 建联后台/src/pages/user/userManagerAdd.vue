 <template>
    <div class="useradd">
        <h2 class="align-left">新增用户</h2>
        <el-form :model="UserDataAdd" :rules="rules" ref="UserDataAdd" label-width="80px" class="userform">
            <el-form-item label="员工账号" prop="account">
                <el-input v-model.trim="UserDataAdd.account" @blur="isAccount()"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input type="password" v-model.trim="UserDataAdd.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="ensurepwd">
                <el-input type="password" v-model.trim="UserDataAdd.ensurepwd"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="UserDataAdd.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="userMobile">
                <el-input v-model="UserDataAdd.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model.trim="UserDataAdd.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="userDeptId">
                <el-select v-model="UserDataAdd.userDeptId" placeholder="请选择所属部门">
                    <el-option :label="item.deptName" v-for="item in deptDataList" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="userPosition">
                <el-input v-model.trim="UserDataAdd.userPosition"></el-input>
            </el-form-item>
                <el-button @click="resetForm('UserDataAdd')" class="cancel-btn">取消</el-button>
                <el-button type="primary" v-if="dataAuth['F:BJ_USER_CREATE_APPROVE']" :disabled="isSubmit" @click="submitForm('UserDataAdd')" class="btn-mid">确定</el-button>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userManagerAdd',
    data(){
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var validatePhone = (rule,value,callback) => {
            if(!phoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        };
        var validateEnsurePwd = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.UserDataAdd.password){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        };
        return{
            isSubmit: false,
            deptDataList: [],
            UserDataAdd: {
                account: '',
                password: '',
                userName: '',
                userMobile: '',
                userEmail: '',
                userPosition:'',
                userDeptId:''
            },
            dataAuth:{
                
            },
            rules: {
                account: [
                    {required: true, message: '请填写账号名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '账号名称请保持在30个字符以内', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请填写密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '登录密码请保持在6~20位之间', trigger: ['blur','change']}
                ],
                ensurepwd: [
                    {required: true, validator: validateEnsurePwd, trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请填写姓名', trigger: 'blur'},
                    {min: 1, max: 10, message: '姓名请保持在10个字符以内', trigger: 'blur'}
                ],
                userMobile: [
                    {required: true, validator: validatePhone,trigger: ['blur','change']}
                ],
                userEmail: [
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']}
                ],
                userDeptId: [
                    {required: true, message: '请填写所属部门', trigger: 'blur'},
                ]
            },
        }
    },
    mounted(){
        this.deptList();
        this.dataAuth = this.$store.state.authData;

    },
    methods: {
        //获取部门列表
        deptList(){
            privilegeApi.deptList()
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.deptDataList = result.data;
                    }else{
                        this.$message.error('获取部门列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        // 判断账号是否存在
        isAccount(){
            const account = this.UserDataAdd.account;
            if(this.UserDataAdd.account){
                privilegeApi.isAccount(account)
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
            const params = {
                account: that.UserDataAdd.account,
                password: that.UserDataAdd.password,
                userName: that.UserDataAdd.userName,
                userMobile: that.UserDataAdd.userMobile,
                userEmail: that.UserDataAdd.userEmail,
                userDeptId: that.UserDataAdd.userDeptId,
                userPosition: that.UserDataAdd.userPosition,
            };
            if(params.userDeptId == ''){
                that.$message.error('请选择部门');
                return ;
            }
            // return ;
            this.$refs[UserDataAdd].validate((valid) => {
                if (valid) {                    
                    privilegeApi.userAdd(params)
                        .then(response => {
                            if(response.data.code == 0){
                                that.$message.success('新增用户成功！');
                                that.$router.push({name: 'userManager'});
                            }else{
                                that.$message.error(response.data.msg);
                            }
                        })
                        .catch(error => {
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
        resetForm(UserDataAdd) {
            this.$router.push({name: 'userManager'});
        }
    },
}
</script>

<style lang="less" scoped>
.useradd{
    text-align: left;
    .title{
        font-weight: bold;
        font-size:26px;
    }
    .userform{
        width: 42%;
    }
}
</style>

