 <template>
    <div class="useradd">
        <h2 class="align-left">新增角色</h2>
        <el-form :model="RoleDataAdd" :rules="rules" ref="RoleDataAdd" label-width="80px" class="userform">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="RoleDataAdd.roleName"  @blur="isRole()"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="roleDescribe">
                <el-input v-model="RoleDataAdd.roleDescribe"></el-input>
            </el-form-item>
                <el-button @click="resetForm('RoleDataAdd')" class="cancel-btn">取消</el-button>
                <el-button type="primary" v-if="dataAuth['F:BJ_AUTHZ_CREATE_APPROVE']" :disabled="isSubmit" @click="submitForm('RoleDataAdd')" class="btn-mid">确定</el-button>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userRoleAdd',
    data(){
        return{
            isSubmit: false,
            RoleDataAdd: {
                roleName: '',
                roleDescribe: ''
            },
            rules: {
                roleName: [
                    {required: true, message: '请填写角色名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '角色名称请保持在10个字符以内', trigger: 'blur'}
                ],
                roleDescribe: [
                    {min: 1, max: 50, message: '角色名称请保持在50个字符以内', trigger: 'blur'}
                ]
            },
            dataAuth:{
                
            }
        }
    },
    mounted(){
        this.dataAuth = this.$store.state.authData;

    },
    methods: {
        //判断角色是否存在
        isRole(){
            const params = {
                roleName: this.RoleDataAdd.roleName
            };
            if(this.RoleDataAdd.roleName){
                privilegeApi.isRole(params)
                    .then(response => {
                        const result = response.data;
                        if(result.code == '0'){
                            this.isSubmit = false;
                        }else{
                            this.$message.error('角色名称已存在！');
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
        //确定-添加角色
        submitForm(RoleDataAdd) {
            let that = this;
            const params = {
                roleName: that.RoleDataAdd.roleName,
                roleDesc: that.RoleDataAdd.roleDescribe
            };
            this.$refs[RoleDataAdd].validate((valid) => {
                if (valid) {
                    privilegeApi.roleAdd(params)
                        .then(response => {
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('新增角色成功！');
                                that.$router.push({name: 'userRole'});
                            }else{
                                that.$message.error('新增角色失败！');
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
        resetForm(RoleDataAdd) {
            this.$router.push({name: 'userRole'});
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

