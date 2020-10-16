<template>
    <div class="hoteladd">
        <p class="title">新增柜子类型</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="类型名称" prop="typeName">
                <el-input v-model="Commoditygai.typeName" maxlength="10" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="格子数：" prop="latticeCount">
                <el-input type="number" v-model.number="Commoditygai.latticeCount" placeholder="请输入格子数"></el-input>
            </el-form-item>
            <el-form-item label="红包金额：" prop="redPacketAmout">
                <el-input v-model="Commoditygai.redPacketAmout" placeholder="请输入红包金额"></el-input>
            </el-form-item>
            <el-form-item label="最小红包数量：" prop="redPacketMinCount">
                <el-input type="number" v-model.number="Commoditygai.redPacketMinCount" placeholder="请输入最小红包数量"></el-input>
            </el-form-item>
            <el-form-item label="最大红包数量：" prop="redPacketMaxCount">
                <el-input type="number" v-model.number="Commoditygai.redPacketMaxCount" placeholder="请输入最大红包数量"></el-input>
            </el-form-item>
            <el-form-item label="分享奖励金额：" prop="shareBonus">
                <el-input v-model="Commoditygai.shareBonus" placeholder="请输入分享奖励金额"></el-input>
            </el-form-item>
            <el-form-item label="特使奖励金额：" prop="specialEnvoyBonus">
                <el-input v-model="Commoditygai.specialEnvoyBonus" placeholder="请输入特使奖励金额"></el-input>
            </el-form-item>
            <el-form-item label="租金：" prop="rent">
                <el-input v-model="Commoditygai.rent" placeholder="租金"></el-input>
            </el-form-item>
            <el-form-item label="技术服务费：" prop="serviceFee">
                <el-input v-model="Commoditygai.serviceFee" placeholder="技术服务费"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_CABTYPE_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LonganCabinetTypeChange',
    data(){
        var validate1 = (rule,value,callback) => {
            if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                callback(new Error('请规范填写金额'));
            }else{
                callback();
            }
        }
        var validateMin = (rule,value,callback) => {
            if(this.Commoditygai.redPacketMaxCount){
                if(this.Commoditygai.redPacketMaxCount<value){
                    callback(new Error('最小红包数不可大于最大红包数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        var validateMax = (rule,value,callback) => {
            if(this.Commoditygai.redPacketMinCount){
                if(value<this.Commoditygai.redPacketMinCount){
                    callback(new Error('最大红包数不可小于最小红包数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            cabinetId:'',
            Commoditygai: {
                typeName: '',
                latticeCount:'',
                redPacketAmout:'',
                redPacketMaxCount:'',
                redPacketMinCount:'',
                shareBonus:'',
                specialEnvoyBonus:'',
                rent:'',
                serviceFee: '',
            },
            loadingH: false,
            rules: {
                typeName: [
                    {required: true, message: '请填写类型名称', trigger: 'blur'},
                ],
                latticeCount: [
                    {required: true, message: '请填写格子数', trigger: 'blur'},
                    { pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数' },
                    {type:'number', max: 10, message: '请输入不大于10的数字', trigger: 'blur'}
                ],
                redPacketAmout: [
                    {required: true, message: '请填写红包金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                redPacketMinCount: [
                    {required: true, message: '请填写最小红包数量', trigger: 'blur'},
                    { type:'number', min:1, message: '请输入大于0的整数' },
                    { validator:validateMin, trigger: 'blur' }
                ],
                redPacketMaxCount: [
                    {required: true, message: '请填写最大红包数量', trigger: 'blur'},
                    { type:'number', min:1, message: '请输入大于0的整数'},
                    { validator:validateMax,trigger: 'blur' }
                ],
                shareBonus: [
                    {required: true, message: '请填写分享奖励金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                specialEnvoyBonus: [
                    {required: true, message: '请填写特使奖励金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                rent: [
                    {required: true, message: '请填写租金', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                serviceFee: [
                    {required: true, message: '请填写技术服务费', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
            },
           
        }
    },
   
    created() {
        this.cabinetId = this.$route.query.modifyid;
        this.getfillback();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        getfillback(){
            this.$api.FsCabinetTypeGetone(this.cabinetId).then(response => {
                if(response.data.code==0){
                    this.Commoditygai = response.data.data;
                    delete this.Commoditygai['id'];
                    console.log(this.Commoditygai);
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
        //确定-修改柜子类型
        submitForm(Commoditygai) {
            let params = this.Commoditygai;
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsCabinetTypeChange(params,this.cabinetId)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LonganCabinetType'});
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
            this.$router.push({name:'LonganCabinetType'});
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

