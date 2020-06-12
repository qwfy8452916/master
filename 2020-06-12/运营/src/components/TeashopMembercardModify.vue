<template>
    <div class="menbercardmodify">
        <p class="title">修改会员卡</p>
        <el-form :model="MembercardDataModify" :rules="rules" ref="MembercardDataModify" label-width="130px" class="membercardform">
            <el-form-item label="会员卡名称" prop="name">
                <el-input  v-model.trim="MembercardDataModify.name"></el-input>
            </el-form-item>
            <el-form-item label="金额(元)" prop="amount">
                <el-input v-model.trim="MembercardDataModify.amount" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="timeIndate">
                <span slot="label"><label class="required-icon">*</label> 会员卡有效期</span>
                <el-date-picker class="datepicker"
                    v-model="timeIndate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="会员期限" prop="membershipPeriod">
                <el-input class="inputtime" v-model.number="MembercardDataModify.membershipPeriod"></el-input>&nbsp;&nbsp;天
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('MembercardDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'TeashopMembercardModify',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            tmId: '',
            MembercardDataModify: {},
            timeIndate: [],
            isSubmit: false,
            rules: {
                name: [
                    {required: true, message: '请输入会员卡名称', trigger: 'blur'},
                    {min: 1, max: 20, message: '会员卡名称请保持在20个字符以内', trigger: ['blur','change']}
                ],
                amount: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                // timeIndate: [
                //     {required: true, message: '请选择有效期', trigger: 'change'},
                // ],
                membershipPeriod: [
                    {required: true, message: '请输入会员期限', trigger: 'blur'},
                    {min: 1, max: 999999999, type: 'number', message: '会员期限格式有误', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        this.tmId = this.$route.query.id;
        this.memberCardDetail();
    },
    methods: {
        //获取会员卡信息
        memberCardDetail(){
            const params = {};
            const id = this.tmId;
            this.$api.memberCardDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.MembercardDataModify = result.data;
                        this.timeIndate = [result.data.validStartDate,result.data.validEndDate];
                    }else{
                        this.$message.error('会员卡信息获取失败！');
                        this.isSubmit = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定 - 修改
        submitForm(MembercardDataModify){
             if(this.timeIndate == null){
                this.$message.error('会员有效期不能为空!');
                return false
            }
            const params = {
                name: this.MembercardDataModify.name,
                amount: parseFloat(this.MembercardDataModify.amount).toFixed(2),
                validStartDate: this.timeIndate[0],
                validEndDate: this.timeIndate[1],
                membershipPeriod:  this.MembercardDataModify.membershipPeriod
            };
            const id = this.tmId;
            // console.log(params);
            this.$refs[MembercardDataModify].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.memberCardModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('会员卡修改成功！');
                                this.$router.push({name: 'TeashopMembercardList'});
                            }else{
                                this.$message.error('会员卡修改失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'TeashopMembercardList'});
        },
    },
}
</script>

<style scoped>
.el-input{
    width: 92%;
}
.el-select{
    width: 92%;
}
</style>

<style lang="less" scoped>
.menbercardmodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .membercardform{
        width: 42%;
        .datepicker{
            width: calc(100% - 30px);
        }
        .inputtime{
            width: 40%;
        }
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>
