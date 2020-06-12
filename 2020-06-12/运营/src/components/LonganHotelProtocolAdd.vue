<template>
    <div class="protocoladd">
        <p class="title">新增分成协议</p>
        <el-form :model="ProtocolDataAdd" :rules="rules" ref="ProtocolDataAdd" label-width="140px" class="protocolform">
            <el-form-item label="分成协议名称" prop="protocolName">
                <el-input v-model.trim="ProtocolDataAdd.protocolName" @blur="validationName"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="protocolType">
                <el-radio-group v-model="ProtocolDataAdd.protocolType" @change="selectAllocType">
                    <el-radio :label="0">按利润计算</el-radio>
                    <el-radio :label="1">按销售额计算</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="isShowComm" prop="brokerageRatio">
                <span slot="label"><label class="required-icon">*</label> 佣金比例</span>
                <el-input v-model.trim="ProtocolDataAdd.brokerageRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.brokerageRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="酒店比例" prop="hotelRatio">
                <el-input v-model.trim="ProtocolDataAdd.hotelRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.hotelRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="合伙人比例" prop="partnerRatio">
                <el-input v-model.trim="ProtocolDataAdd.partnerRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.partnerRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="加盟商比例" prop="allyRatio">
                <el-input v-model.trim="ProtocolDataAdd.allyRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.allyRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="城市运营商比例" prop="cityOprRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.cityOprRatio" maxlength="6"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例" prop="zcRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.zcRatio" maxlength="6"></el-input> %
            </el-form-item>
            <!-- <el-form-item label="押金型加盟商比例" prop="depAllyRatio">
                <el-input v-model.trim="ProtocolDataAdd.depAllyRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.depAllyRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="投资型加盟商比例" prop="invAllyRatio">
                <el-input v-model.trim="ProtocolDataAdd.invAllyRatio" maxlength="6" @blur="verifyRatio(ProtocolDataAdd.invAllyRatio)"></el-input> %
            </el-form-item>
            <el-form-item label="押金型城市运营商比例" prop="depCityOprRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.depCityOprRatio" maxlength="6"></el-input> %
            </el-form-item>
            <el-form-item label="投资型城市运营商比例" prop="invCityOprRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.invCityOprRatio" maxlength="6"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例(押金型)" prop="depZcRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.depZcRatio" maxlength="6"></el-input> %
            </el-form-item>
            <el-form-item label="住橙比例(投资型)" prop="invZcRatio">
                <el-input :disabled="true" v-model.trim="ProtocolDataAdd.invZcRatio" maxlength="6"></el-input> %
            </el-form-item> -->
            
            <!-- <el-form-item>
                <span slot="label"><label class="titlebar">额外扣除&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="分享奖励来源" prop="shareRewardFrom">
                <el-select v-model="ProtocolDataAdd.shareRewardFrom" placeholder="请选择">
                    <el-option 
                        v-for="item in shareRewardList" 
                        :key="item.id" 
                        :label="item.shareRewardName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享奖励类型" prop="shareRewardType">
                <el-radio-group v-model="ProtocolDataAdd.shareRewardType">
                    <el-radio :label="0">比例</el-radio>
                    <el-radio :label="1">金额/件商品</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ProtocolDataAdd.shareRewardType == 0 || ProtocolDataAdd.shareRewardType == 1" label="分享奖励（员工）" prop="empShareReward">
                <el-input v-model.trim="ProtocolDataAdd.empShareReward" maxlength="6"></el-input> {{ProtocolDataAdd.shareRewardType == 0? '%':'元'}}
            </el-form-item>
            <el-form-item v-if="ProtocolDataAdd.shareRewardType == 0 || ProtocolDataAdd.shareRewardType == 1" label="分享奖励（顾客）" prop="cusShareReward">
                <el-input v-model.trim="ProtocolDataAdd.cusShareReward" maxlength="6"></el-input> {{ProtocolDataAdd.shareRewardType == 0? '%':'元'}}
            </el-form-item> -->
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_FIN_DIVIDE_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('ProtocolDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelProtocolAdd',
    data(){
        var rateReg = /^\d+(\.\d+)?$/
        var validateRate = (rule,value,callback) => {
            if(!rateReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            isShowComm: false,
            shareRewardList: [],
            ProtocolDataAdd: {
                brokerageRatio: '',
                hotelRatio: '',
                partnerRatio: '',
                allyRatio: '',
                cityOprRatio: 0,
                zcRatio: 0,
                // depCityOprRatio: 0,
                // invCityOprRatio: 0,
                // depZcRatio: 0,
                // invZcRatio: 0
            },
            isSubmit: false,
            rules: {
                protocolName: [
                    {required: true, message: '请填写分成协议名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '分成协议名称请保持在30个字符以内', trigger: ['blur','change']}
                ],
                protocolType: [
                    {required: true, message: '请选择类型', trigger: 'change'}
                ],
                // brokerageRatio: [
                //     {required: true, validator: validateRate, trigger: ['blur','change']}
                // ],
                hotelRatio:[
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                partnerRatio: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                allyRatio: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                // depAllyRatio: [
                //     {required: true, validator: validateRate, trigger: ['blur','change']}
                // ],
                // invAllyRatio: [
                //     {required: true, validator: validateRate, trigger: ['blur','change']}
                // ],
                shareRewardFrom: [
                    {required: true, message: '请选择分享奖励来源', trigger: 'change'}
                ],
                shareRewardType: [
                    {required: true, message: '请选择分享奖励类型', trigger: 'change'}
                ],
                empShareReward: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                cusShareReward: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.getShareRewardList();
    },
    methods: {
        //获取分享奖励来源列表
        getShareRewardList(){
            const params = {
                key: 'SHARE_REWARD_FROM',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.shareRewardList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                shareRewardName: item.dictName
                            }
                        })
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //验证分成协议名称不能重复
        validationName(){
            const params = {
                allocName : this.ProtocolDataAdd.protocolName
            };
            // console.log(params);
            if(this.ProtocolDataAdd.protocolName){
                this.$api.isValidationName(params)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0' ){
                            if(result.data){
                                this.isSubmit = false;
                            }else{
                                this.$message.error('分成协议名称已存在！');
                                this.isSubmit = true;
                            }
                        }else{
                            this.$message.error(result.msg);
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
        //选择类型
        selectAllocType(value){
            if(value == 0){
                this.isShowComm = false;
            }else{
                this.isShowComm = true;
            }
            this.ProtocolDataAdd.brokerageRatio = "";
            this.ProtocolDataAdd.hotelRatio = "";
            this.ProtocolDataAdd.partnerRatio = "";
            this.ProtocolDataAdd.allyRatio = "";
            this.ProtocolDataAdd.cityOprRatio = 0;
            this.ProtocolDataAdd.zcRatio = 0;
        },
        //验证分成比例
        verifyRatio(val){
            if(val < 0 || val > 100){
                this.$message.error('分成比例不能小于0 或 大于100');
                this.isSubmit = true;
                return false
            }
            if(this.ProtocolDataAdd.protocolType == 0){
                //按利润计算
                if(this.ProtocolDataAdd.hotelRatio && this.ProtocolDataAdd.partnerRatio && this.ProtocolDataAdd.allyRatio){
                    let ratioTotalL = parseFloat(this.ProtocolDataAdd.hotelRatio) + parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.allyRatio);
                    if(ratioTotalL > 100){
                        this.$message.error('酒店 + 合伙人 + 加盟商 => 分成比例不能大于100%');
                        this.isSubmit = true;
                        return false
                    }
                    this.ProtocolDataAdd.cityOprRatio = (parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.allyRatio)).toFixed(2);
                    this.ProtocolDataAdd.zcRatio = parseFloat(100 - ratioTotalL).toFixed(2);
                }
            }else{
                //按销售额计算
                if(this.ProtocolDataAdd.brokerageRatio && this.ProtocolDataAdd.hotelRatio && this.ProtocolDataAdd.partnerRatio && this.ProtocolDataAdd.allyRatio){
                    let ratioTotalX = parseFloat(this.ProtocolDataAdd.hotelRatio) + parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.allyRatio);
                    if(ratioTotalX > this.ProtocolDataAdd.brokerageRatio){
                        this.$message.error('酒店 + 合伙人 + 加盟商 => 分成比例不能大于佣金比例');
                        this.isSubmit = true;
                        return false
                    }
                    this.ProtocolDataAdd.cityOprRatio = (parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.allyRatio)).toFixed(2);
                    this.ProtocolDataAdd.zcRatio = parseFloat(this.ProtocolDataAdd.brokerageRatio - ratioTotalX).toFixed(2);
                }
            }
            // if(this.ProtocolDataAdd.hotelRatio && this.ProtocolDataAdd.partnerRatio && this.ProtocolDataAdd.depAllyRatio && this.ProtocolDataAdd.invAllyRatio){
            //     //押金型
            //     let depTotal = parseFloat(this.ProtocolDataAdd.hotelRatio) + parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.depAllyRatio);
            //     //投资型
            //     let invTotal = parseFloat(this.ProtocolDataAdd.hotelRatio) + parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.invAllyRatio);
            //     if(depTotal > this.ProtocolDataAdd.brokerageRatio || invTotal > this.ProtocolDataAdd.brokerageRatio){
            //         this.$message.error('酒店 + 合伙人 + 加盟商 => 分成比例不能大于佣金比例');
            //         this.isSubmit = true;
            //         return false
            //     }
            //     this.ProtocolDataAdd.depCityOprRatio = (parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.depAllyRatio)).toFixed(2);
            //     this.ProtocolDataAdd.invCityOprRatio = (parseFloat(this.ProtocolDataAdd.partnerRatio) + parseFloat(this.ProtocolDataAdd.invAllyRatio)).toFixed(2);
            //     // this.ProtocolDataAdd.depZcRatio = parseFloat(100 - depTotal).toFixed(2);
            //     // this.ProtocolDataAdd.invZcRatio = parseFloat(100 - invTotal).toFixed(2);
            //     this.ProtocolDataAdd.depZcRatio = parseFloat(this.ProtocolDataAdd.brokerageRatio - depTotal).toFixed(2);
            //     this.ProtocolDataAdd.invZcRatio = parseFloat(this.ProtocolDataAdd.brokerageRatio - invTotal).toFixed(2);
            // }
            this.isSubmit = false;
        },
        //确定-新增分成协议
        submitForm(ProtocolDataAdd) {
            let params = {
                allocName: this.ProtocolDataAdd.protocolName,
                allocType: this.ProtocolDataAdd.protocolType,
                commissionRate: this.ProtocolDataAdd.brokerageRatio,
                hotelRate: this.ProtocolDataAdd.hotelRatio,
                partnerRate: this.ProtocolDataAdd.partnerRatio,
                contributorRate: this.ProtocolDataAdd.allyRatio,
                cityOprRate: this.ProtocolDataAdd.cityOprRatio,
                zcRate: this.ProtocolDataAdd.zcRatio,
                // depositContributorRate: this.ProtocolDataAdd.depAllyRatio,
                // investContributorRate: this.ProtocolDataAdd.invAllyRatio,
                // depositCityOprRate: this.ProtocolDataAdd.depCityOprRatio,
                // investCityOprRate: this.ProtocolDataAdd.invCityOprRatio,
                // depositZcRate: this.ProtocolDataAdd.depZcRatio,
                // investZcRate: this.ProtocolDataAdd.invZcRatio

                // shareRewardFrom: this.ProtocolDataAdd.shareRewardFrom,
                // shareRewardType: this.ProtocolDataAdd.shareRewardType,
                // empShareReward: parseFloat(this.ProtocolDataAdd.empShareReward).toFixed(2),
                // cusShareReward: parseFloat(this.ProtocolDataAdd.cusShareReward).toFixed(2),
            }
            // console.log(params);
            this.$refs[ProtocolDataAdd].validate((valid) => {
                if (valid) {
                    if(this.ProtocolDataAdd.protocolType == 1){
                        if(this.ProtocolDataAdd.brokerageRatio == ''){
                            this.$message.error('请填写佣金比例！');
                            return false
                        }
                    }
                    this.isSubmit = true;
                    this.$api.hotelProtocolAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('分成协议新增成功！');
                                this.$router.push({name: 'LonganHotelProtocolList'});
                            }else{
                                this.isSubmit = false;
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm() {
            this.$router.push({name: 'LonganHotelProtocolList'});
        },
    },
}
</script>

<style scoped>
.el-input{
    width: 87%;
}
.el-select{
    width: 87%;
}
</style>

<style lang="less" scoped>
.protocoladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .protocolform{
        width: 45%;
        .titlebar{
            font-weight: bold;
            font-size: 16px;
            color: #444;
        }
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>

