<template>
    <div class="menbercardadd">
        <p class="title">新增会员卡</p>
        <el-form :model="MembercardDataAdd" :rules="rules" ref="MembercardDataAdd" label-width="130px" class="membercardform">
            <el-form-item label="会员卡名称" prop="membercardName">
                <el-input  v-model.trim="MembercardDataAdd.membercardName"></el-input>
            </el-form-item>
            <el-form-item label="金额(元)" prop="moneyNum">
                <el-input  v-model.trim="MembercardDataAdd.moneyNum" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="会员卡有效期" prop="timeIndate">
                <el-date-picker class="datepicker"
                    v-model="MembercardDataAdd.timeIndate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="会员期限" prop="memberTime">
                <el-input class="inputtime" v-model.number="MembercardDataAdd.memberTime"></el-input>&nbsp;&nbsp;天
            </el-form-item>
            <el-form-item label="新增数量" prop="addNum">
                <el-input  v-model.number="MembercardDataAdd.addNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('MembercardDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'TeashopMembercardAdd',
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
            MembercardDataAdd: {
                membercardName: '',
                moneyNum: 0,
                timeIndate: [],
                memberTime: '',
                addNum: '',
            },
            isSubmit: false,
            rules: {
                membercardName: [
                    {required: true, message: '请输入会员卡名称', trigger: 'blur'},
                    {min: 1, max: 20, message: '会员卡名称请保持在20个字符以内', trigger: ['blur','change']}
                ],
                moneyNum: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                timeIndate: [
                    {required: true, message: '请选择有效期', trigger: 'change'},
                ],
                memberTime: [
                    {required: true, message: '请输入会员期限', trigger: 'blur'},
                    {min: 1, max: 999999999, type: 'number', message: '会员期限格式有误', trigger: ['blur','change']}
                ],
                addNum: [
                    {required: true, message: '请输入新增数量', trigger: 'blur'},
                    {min: 1, max: 500, type: 'number', message: '单次添加不能大于500张', trigger: ['blur','change']}
                ]
            },
        }
    },
    methods: {
        //确定 - 新增
        submitForm(MembercardDataAdd){
            const params = {
                name: this.MembercardDataAdd.membercardName,
                amount: parseFloat(this.MembercardDataAdd.moneyNum).toFixed(2),
                validStartDate: this.MembercardDataAdd.timeIndate[0],
                validEndDate: this.MembercardDataAdd.timeIndate[1],
                membershipPeriod:  this.MembercardDataAdd.memberTime,
                count: this.MembercardDataAdd.addNum
            };
            // console.log(params);
            this.$refs[MembercardDataAdd].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    this.$api.memberCardAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('会员卡新增成功！');
                                this.$router.push({name: 'TeashopMembercardList'});
                            }else{
                                this.$message.error('会员卡新增失败！');
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
.menbercardadd{
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
    }
}
</style>
