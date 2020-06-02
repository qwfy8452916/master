 <template>
    <div class="deptadd">
        <h2 class="align-left">新增部门</h2>
        <el-form :model="DeptDataAdd" :rules="rules" ref="DeptDataAdd" label-width="80px" class="deptform">
            <el-form-item label="上级部门" prop="parentId">
                <el-select v-model="DeptDataAdd.parentId" placeholder="请选择">
                    <el-option :label="item.deptName" v-for="item in deptDataList" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门名称" prop="deptName">
                <el-input v-model="DeptDataAdd.deptName"></el-input>
            </el-form-item>
            <el-form-item label="部门描述" prop="deptDesc">
                <el-input v-model="DeptDataAdd.deptDesc"></el-input>
            </el-form-item>
            <el-form-item label="部门角色" prop="deptRole">
                <el-checkbox-group v-model="DeptDataAdd.deptRole" :min="1">
                    <el-checkbox :label="item.id" :value="item.id" v-for="item in roleDataList" :key="item.roleName" >{{item.roleName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="部门类型" prop="deptType">
                <el-select v-model="DeptDataAdd.deptType" placeholder="请选择">
                    <el-option label="分公司" value="1"></el-option>
                    <el-option label="职能部门" value="2"></el-option>
                </el-select>
            </el-form-item>
                <el-button @click="resetForm('DeptDataAdd')" class="cancel-btn">取消</el-button>
                <el-button class="btn-mid" type="primary" :disabled="isSubmit" v-if="dataAuth['F:BJ_USERDEPART_CREATE_APPROVE']" @click="submitForm('DeptDataAdd')">确定</el-button>
        </el-form>
    </div>
</template>

<script>
import privilegeApi from '../../request/api.js'
export default {
    name: 'departmentAdd',
    data(){
        return{
            isSubmit: false,
            deptDataList: [],
            roleDataList: [],                
            DeptDataAdd: {
                parentId:'',
                deptName: '',
                deptDesc: '',
                deptType:'1',
                deptRole: [],
               
            },
            dataAuth:{
               
            },
            checkedCities: [],
            rules: {
                parentId: [
                    {required: true, message: '请填写上级部门', trigger: 'blur'},
                ],
                deptName: [
                    {required: true, message: '请填写部门名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '部门名称请保持在10个字符以内', trigger: 'blur'}
                ],
                deptRole: [
                    {required: true, message: '请填写部门角色', trigger: 'blur'}
                ],
                deptType: [
                    {required: true, message: '请填写部门类型', trigger: 'blur'}
                ]
            }
        }
    },
    mounted(){
        this.deptList();
        this.roleList();
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
        //获取角色列表
        roleList(){
            privilegeApi.roleList()
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.roleDataList = result.data.records;
                    }else{
                        this.$message.error('获取角色列表失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-添加部门
        submitForm(DeptDataAdd) {
            let that = this;
            const params = {
                parentId: that.DeptDataAdd.parentId,
                deptName: that.DeptDataAdd.deptName,
                deptDesc: that.DeptDataAdd.deptDesc,
                deptRole: JSON.stringify(that.DeptDataAdd.deptRole),
                deptType: that.DeptDataAdd.deptType
            };
            this.$refs[DeptDataAdd].validate((valid) => {
                if (valid) {
                    privilegeApi.deptAdd(params)
                        .then(response => {
                            const result = response.data;
                            if(result.code == '0'){
                                that.$message.success('新增部门成功！');
                                that.$router.push({name: 'department'});
                            }else{
                                that.$message.error('新增部门失败！');
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
        resetForm(DeptDataAdd) {
            this.$router.push({name: 'department'});
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