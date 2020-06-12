 <template>
    <div class="hoteladd">
        <p class="title">新增业务员</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="openid：" prop="openId">
                <el-input maxlength="28" @input="inputOpenId" v-model="Commoditygai.openId" placeholder="请输入openid"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="fullName">
                <el-input maxlength="10" v-model="Commoditygai.fullName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                <el-input maxlength="11" v-model="Commoditygai.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="是否可以分享：" prop="isShare">
                <el-switch
                active-text="是"
                inactive-text="否"
                v-model="Commoditygai.isShare">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_MEMBER_ADD_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LaunchCabinetAdd',
    data(){
        return{
            authzData: '',
            Commoditygai: {
                openId: '',
                fullName: '',
                mobile:'',
                isShare:true
            },
            loadingH: false,
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
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        inputOpenId(value){
            this.Getdata(value)
        },
        Getdata(value){ 
            let that=this;
            let params = {
                openId: value
            }
            this.$api.FsMemberAll({params}).then(response => {
                if(response.data.code == 0){
                    console.log(response.data);
                    if(response.data.data.records.length){
                        let records = response.data.data.records
                        this.Commoditygai.fullName = records[0].fullName
                        this.Commoditygai.mobile = records[0].mobile
                    }
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确定-添加柜子
        submitForm(Commoditygai) {
            let params = {
                openId: this.Commoditygai.openId,
                fullName: this.Commoditygai.fullName,
                mobile: this.Commoditygai.mobile,
                shareFlag: this.Commoditygai.isShare?1:0
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsMemberAdd(params)
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

