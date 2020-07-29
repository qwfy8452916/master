 <template>
    <div class="useradd">
        <p class="title">新增角色</p>
        <el-form :model="RoleDataAdd" :rules="rules" ref="RoleDataAdd" label-width="80px" class="userform">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model.trim="RoleDataAdd.roleName"  @blur="isRole()"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="roleDescribe">
                <el-input v-model="RoleDataAdd.roleDescribe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('RoleDataAdd')">取消</el-button>
                <el-button v-if="authzData['F:CM_AUTHZ_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('RoleDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeRoleAdd',
    data(){
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            isSubmit: false,
            RoleDataAdd: {
                roleName: '',
                roleDescribe: ''
            },
            rules: {
                roleName: [
                    {required: true, message: '请填写角色名称', trigger: 'blur'},
                    {min: 1, max: 18, message: '角色名称请保持在18个字符以内', trigger: 'blur'}
                ]
            },
        }
    },
    mounted(){
        (privilegeJuris.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        // this.orgType = localStorage.getItem('orgType');
    },
    methods: {
        //判断角色是否存在
        isRole(){
            const params = {
                roleName: this.RoleDataAdd.roleName
            };
            // console.log(params);
            if(this.RoleDataAdd.roleName){
                privilegeApi.isRole(params)
                    .then(response => {
                        // console.log(response);
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
            // var params;
            // if(this.orgType == 2){
            //     params = {
            //         roleName: that.RoleDataAdd.roleName,
            //         roleDesc: that.RoleDataAdd.roleDescribe,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     params = {
            //         roleName: that.RoleDataAdd.roleName,
            //         roleDesc: that.RoleDataAdd.roleDescribe,
            //         encryOtherId: this.orgId
            //     };
            // }
            const params = {
                roleName: that.RoleDataAdd.roleName,
                roleDesc: that.RoleDataAdd.roleDescribe
            };
            //console.log(params);
            this.$refs[RoleDataAdd].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.roleAdd(params)
                        .then(response => {
                            //console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('新增角色成功！');
                                that.$emit('role-list');
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
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(RoleDataAdd) {
            this.$emit('role-list');
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

