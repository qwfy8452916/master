 <template>
    <div class="rolemodify">
        <p class="title">修改角色信息</p>
        <el-form :model="RoleDataModify" :rules="rules" ref="RoleDataModify" label-width="80px" class="roleform">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model.trim="RoleDataModify.roleName"  @blur="isRole()"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="roleDesc">
                <el-input v-model="RoleDataModify.roleDesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('RoleDataModify')">取消</el-button>
                <el-button v-if="authzData['F:CM_AUTHZ_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('RoleDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../request/api.js'
import privilegeJuris from '../request/jurisdiction.js'
export default {
    name: 'PrivilegeRoleModify',
    data(){
        return{
            authzData: '',
            // orgType: '',
            // orgId: '',
            roleId: '',
            isSubmit: false,
            RoleDataModify: {},
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
        // this.orgType = localStorage.getItem('orgType');
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.roleId = this.$route.params.id;
        this.getRoleInfo();
    },
    methods: {
        //获取角色信息
        getRoleInfo(){
            const params = {};
            const id = this.roleId;
            privilegeApi.roleDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.RoleDataModify = result.data;
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
        //判断角色是否存在
        isRole(){
            const params = {
                id: this.roleId,
                roleName: this.RoleDataModify.roleName
            };
            // console.log(params);
            if(this.RoleDataModify.roleName){
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
        //确定-修改角色信息
        submitForm(RoleDataModify) {
            let that = this;
            // var params;
            // if(this.orgType == 2){
            //     params = {
            //         roleName: that.RoleDataModify.roleName,
            //         roleDesc: that.RoleDataModify.roleDesc,
            //         id: that.roleId,
            //         encryOrgId: this.orgId
            //     };
            // }else{
            //     params = {
            //         roleName: that.RoleDataModify.roleName,
            //         roleDesc: that.RoleDataModify.roleDesc,
            //         id: that.roleId,
            //         encryOtherId: this.orgId
            //     };
            // }
            const params = {
                    roleName: that.RoleDataModify.roleName,
                    roleDesc: that.RoleDataModify.roleDesc,
                    id: that.roleId
                };
            // console.log(params);
            this.$refs[RoleDataModify].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.roleModify(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('修改角色信息成功！');
                                that.$emit('role-list');
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
        resetForm(RoleDataModify) {
            this.$emit('role-list');
        }
    },
}
</script>

<style lang="less" scoped>
.rolemodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .roleform{
        width: 42%;
    }
}
</style>

