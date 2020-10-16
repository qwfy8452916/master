<template>
    <div class="hoteladd">
        <p class="title">新增柜子类型</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="类型名称" prop="typeName">
                <el-input v-model="Commoditygai.typeName" maxlength="10" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="格子数：" prop="cellNum">
                <el-input type="number" v-model.number="Commoditygai.cellNum" placeholder="请输入格子数"></el-input>
            </el-form-item>
            <el-form-item label="红包金额：" prop="redpackNum">
                <el-input v-model="Commoditygai.redpackNum" placeholder="请输入红包金额"></el-input>
            </el-form-item>
            <el-form-item label="最小红包数量：" prop="redpackMin">
                <el-input type="number" v-model.number="Commoditygai.redpackMin" placeholder="请输入最小红包数量"></el-input>
            </el-form-item>
            <el-form-item label="最大红包数量：" prop="redpackMax">
                <el-input type="number" v-model.number="Commoditygai.redpackMax" placeholder="请输入最大红包数量"></el-input>
            </el-form-item>
            <el-form-item label="分享奖励金额：" prop="shareprise">
                <el-input v-model="Commoditygai.shareprise" placeholder="请输入分享奖励金额"></el-input>
            </el-form-item>
            <el-form-item label="特使奖励金额：" prop="specialprise">
                <el-input v-model="Commoditygai.specialprise" placeholder="请输入特使奖励金额"></el-input>
            </el-form-item>
            <el-form-item label="租金：" prop="reprises">
                <el-input v-model="Commoditygai.reprises" placeholder="租金"></el-input>
            </el-form-item>
            <el-form-item label="技术服务费：" prop="techcost">
                <el-input v-model="Commoditygai.techcost" placeholder="技术服务费"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_CABTYPE_ADD_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name: 'LonganCabinetTypeAdd',
    data(){
        var validate1 = (rule,value,callback) => {
            if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                callback(new Error('请规范填写金额'));
            }else{
                callback();
            }
        }
        var validateMin = (rule,value,callback) => {
            if(this.Commoditygai.redpackMax){
                if(this.Commoditygai.redpackMax<value){
                    callback(new Error('最小红包数不可大于最大红包数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        var validateMax = (rule,value,callback) => {
            if(this.Commoditygai.redpackMin){
                if(value<this.Commoditygai.redpackMin){
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
            Commoditygai: {
                typeName: '',
                cellNum:'',
                redpackNum:'',
                redpackMin:'',
                redpackMax:'',
                shareprise:'',
                specialprise:'',
                reprises:'',
                techcost: '',
            },
            loadingH: false,
            rules: {
                typeName: [
                    {required: true, message: '请填写类型名称', trigger: 'blur'},
                ],
                cellNum: [
                    {required: true, message: '请填写格子数', trigger: 'blur'},
                    { pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数' },
                    {type:'number', max: 10, message: '请输入不大于10的数字', trigger: 'blur'}
                ],
                redpackNum: [
                    {required: true, message: '请填写红包金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                redpackMin: [
                    {required: true, message: '请填写最小红包数量', trigger: 'blur'},
                    { type:'number', min:1, message: '请输入大于0的整数' },
                    { validator:validateMin, trigger: 'blur' }
                ],
                redpackMax: [
                    {required: true, message: '请填写最大红包数量', trigger: 'blur'},
                    { type:'number', min:1, message: '请输入大于0的整数'},
                    { validator:validateMax,trigger: 'blur' }
                ],
                shareprise: [
                    {required: true, message: '请填写分享奖励金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                specialprise: [
                    {required: true, message: '请填写特使奖励金额', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                reprises: [
                    {required: true, message: '请填写租金', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
                techcost: [
                    {required: true, message: '请填写技术服务费', trigger: 'blur'},
                    {validator:validate1, trigger: 'blur'},
                ],
            },
           
        }
    },
   
    created() {
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
       
        //确定-添加柜子类型
        submitForm(Commoditygai) {
            let params = {
                latticeCount: this.Commoditygai.cellNum,
                redPacketAmout: this.Commoditygai.redpackNum,
                redPacketMaxCount: this.Commoditygai.redpackMax,
                redPacketMinCount: this.Commoditygai.redpackMin,
                rent: this.Commoditygai.reprises,
                serviceFee: this.Commoditygai.techcost,
                shareBonus: this.Commoditygai.shareprise,
                specialEnvoyBonus: this.Commoditygai.specialprise,
                typeName: this.Commoditygai.typeName,
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsCabinetTypeAdd(params)
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

