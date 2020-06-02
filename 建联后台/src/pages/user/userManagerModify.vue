 <template>
    <div class="usermodify">
        <h2 class="align-left">修改用户信息</h2>
        <el-form v-model="UserDataModify" :model="UserDataModify" :rules="rules" ref="UserDataModify" label-width="80px" class="userform">
            <el-form-item label="员工账号" prop="account">
                <el-input v-model="UserDataModify.account" @blur="isAccount"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="UserDataModify.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="userMobile">
                <el-input v-model="UserDataModify.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model.trim="UserDataModify.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="userDeptId">
                <el-select v-model="UserDataModify.userDeptId" placeholder="请选择所属部门">
                    <el-option :label="item.deptName" v-for="item in deptDataList" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="userPosition">
                <el-input v-model.trim="UserDataModify.userPosition"></el-input>
            </el-form-item>
                <el-button @click="resetForm('UserDataModify')" class="cancel-btn">取消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_USER_UPDATE_APPROVE']" :disabled="isSubmit" @click="submitForm('UserDataModify')">确定</el-button>
            
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userManagerModify',
    data(){
        var validatePhone = (rule,value,callback) => {
            if(!value){
                return callback(new Error('手机号码不能为空！'))
            }else{
                const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
                if(!phoneReg.test(value)){
                    return callback(new Error('格式有误'))
                }else{
                    callback()
                }
            }
        }
        return{
            isSubmit: false,
            accountName:'',
            deptDataList: [],
            UserDataModify: {},
            rules: {
                account: [
                    {required: true, message: '请填写账号名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '账号名称请保持在30个字符以内', trigger: 'blur'}
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
            dataAuth:{
               
            },
        }
    },
    mounted(){
        this.getUserInfo();
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
        //获取用户信息
        getUserInfo(){
            // const params = {id: this.$route.params.id};
            const params = {};
            const id = this.$route.params.id;
            privilegeApi.userDetail(params, id)
                .then(response => {
                    if(response.data.code == 0){
                        this.UserDataModify = response.data.data;
                        this.accountName = response.data.data.account;

                    }else{
                        this.$message.error('获取用户信息失败！');
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
            const account = this.UserDataModify.account;
            if(this.UserDataModify.account == this.accountName){
                this.isSubmit = false;
            }else{
                if(this.UserDataModify.account){
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
            }
        },
        //确定-修改用户信息
        submitForm(UserDataModify) {
            let that = this;
            const params = {
                account: that.UserDataModify.account,
                password: that.UserDataModify.password,
                empNo: that.UserDataModify.empNo,
                userName: that.UserDataModify.userName,
                userDeptId: that.UserDataModify.userDeptId,
                userMobile: that.UserDataModify.userMobile,
                userEmail: that.UserDataModify.userEmail,
                userPosition:that.UserDataModify.userPosition
            };
            const id = that.$route.params.id
            this.$refs[UserDataModify].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.userModify(params,id)
                        .then(response => {
                            if(response.data.code == 0){
                                that.$message.success('修改用户信息成功！');
                                that.$router.push({name: 'userManager'});
                            }else{
                                this.isSubmit = false;
                                that.$message.error('修改用户信息失败！');
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                }else {
                    return false;
                }
            });
        },
        //取消
        resetForm(UserDataModify) {
            this.$router.push({name: 'userManager'});
        }
    },
}
</script>

<style lang="less" scoped>
.usermodify{
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

