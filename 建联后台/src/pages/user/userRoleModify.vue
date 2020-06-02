 <template>
    <div class="rolemodify">
        <h2 class="align-left">修改角色信息</h2>
        <el-form :model="RoleDataModify" :rules="rules" ref="RoleDataModify" label-width="80px" class="roleform">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="RoleDataModify.roleName"  @blur="isRole()"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="roleDesc">
                <el-input v-model="RoleDataModify.roleDesc"></el-input>
            </el-form-item>
                <el-button @click="resetForm('RoleDataModify')" class="cancel-btn">取消</el-button>
                <el-button class="btn-mid" type="primary" v-if="dataAuth['F:BJ_AUTHZ_UPDATE_APPROVE']" :disabled="isSubmit" @click="submitForm('RoleDataModify')">确定</el-button>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'userRoleModify',
    data(){
        return{
            roleId: '',
            isSubmit: false,
            RoleDataModify: {},
            rules: {
                roleName: [
                    {required: true, message: '请填写角色名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '角色名称请保持在10个字符以内', trigger: 'blur'}
                ]
            },
            dataAuth:{
               
            }
        }
    },
     mounted(){
        this.roleId = this.$route.params.id;
        this.getRoleInfo();
        this.dataAuth = this.$store.state.authData;

    },
    methods: {
        //获取角色信息
        getRoleInfo(){
            const params = {};
            const id = this.roleId;
            privilegeApi.roleDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.RoleDataModify = result.data;
                    }else{
                        this.$message.error('获取角色信息失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
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
            if(this.RoleDataModify.roleName){
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
        //确定-修改角色信息
        submitForm(RoleDataModify) {
            let that = this;
            const params = {
                roleName: that.RoleDataModify.roleName,
                roleDesc: that.RoleDataModify.roleDesc,
                id: that.roleId
            };
            this.$refs[RoleDataModify].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    privilegeApi.roleModify(params)
                        .then(response => {
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('修改角色信息成功！');
                                that.$router.push({name: 'userRole'});
                            }else{
                                this.isSubmit = false;
                                that.$message.error('修改角色信息失败！');
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
            this.$router.push({name: 'userRole'});
        }
    },
}
</script>

<style lang="less" scoped>
.rolemodify{
    text-align: left;
    .title{
        font-weight: bold;
        font-size:26px;
    }
    .roleform{
        width: 42%;
    }
}
</style>

