 <template>
    <div class="hoteladd">
        <p class="title">修改业务员</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="openid：" prop="openId">
                <el-input maxlength="28" :disabled="true" v-model="Commoditygai.openId" placeholder="请输入openid"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="fullName">
                <el-input maxlength="10" v-model="Commoditygai.fullName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                <el-input maxlength="11" v-model="Commoditygai.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="isSalesman">
                <el-input maxlength="100" :disabled="true" v-model="isSalesman"></el-input>
            </el-form-item>
            <el-form-item label="财富合伙人：" prop="fullName">
                <el-input maxlength="10" :disabled="true" v-model="isFortunePartner"></el-input>
            </el-form-item>
            <el-form-item label="等级：" prop="mobile">
                <el-input maxlength="11" :disabled="true" v-model="specialEnvoyLevel"></el-input>
            </el-form-item>
            <el-form-item label="是否可以分享：">
                <el-switch
                active-text="是"
                inactive-text="否"
                :disabled="true"
                v-model="isShare">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_MEMBER_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LonganMemberChange',
    data(){
        return{
            authzData: '',
            memberID:'',
            Commoditygai: {
                openId: '',
                fullName: '',
                mobile:'',
            },
            isSalesman:'',
            isFortunePartner:'',
            specialEnvoyLevel:'',
            loadingH: false,
            isShare: false,
            rules: {
                openId: [
                    {required: true, message: '请填写openid', trigger: 'blur'},
                ],
                fullName: [
                    {required: true, message: '请填写姓名', trigger: 'blur'},
                ],
                mobile: [
                    {required: true, message: '请填写手机号', trigger: 'blur'},
                    {pattern: /^1[3456789]\d{9}$/, message: '输入正确的手机号',trigger: 'blur'},
                ]
            },
           
        }
    },
   
    created() {
        this.memberID = this.$route.query.modifyid;
        this.getOneinfo();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        getOneinfo(){
            this.$api.FsMemberOne(this.memberID).then(response => {
                if(response.data.code==0){
                    this.Commoditygai = response.data.data;
                    this.isSalesman = this.Commoditygai.isSalesman?'业务员':"会员"
                    this.isFortunePartner = this.Commoditygai.isFortunePartner?'是':"否"
                    this.specialEnvoyLevel = this.Commoditygai.specialEnvoyLevel?'财富特使':"普通会员"
                    this.isShare = this.Commoditygai.shareFlag?true:false
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            }).catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确定-修改
        submitForm(Commoditygai) {
            let params = {
                fullName: this.Commoditygai.fullName,
                mobile: this.Commoditygai.mobile
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsMemberChange(params,this.memberID)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LonganMemberList'});
                            }else{
                               this.$alert(response.data.msg,"警告",{
                                    confirmButtonText: "确定"
                               })
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    return false;
                }
            });
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'LonganMemberList'});
        }
    },
}
</script>


<style lang="less" scoped>
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 42%;

        .btnwrap{margin-left: 35px;}
        .el-input,.el-select{width: 225px;}
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
    }
}

</style>

