<template>
    <div>
        <p class="title">添加结算方式</p>
        <el-container class="container">
            <el-aside width="60%" align="left">
                <p class="subtitle">结算方式描述</p>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="content">
                </el-input>
                <div class="dateRadioDiv">
                    <p class="subtitle">时间选择</p>
                    <el-row class="dateRadioItem">
                        <el-col :span="4">
                            <el-radio v-model="dateRadio" label="PAY_IN_DAYS">
                                货到工地日
                            </el-radio>
                        </el-col>
                        <el-col :span="6">
                            <input class="dateInput" type="number" v-model="delayDays"/>天付款
                        </el-col>
                    </el-row>
                    <el-row class="dateRadioItem">
                        <el-col :span="4">
                            <el-radio v-model="dateRadio" label="DAY_IN_MONTH">每月付款日期</el-radio>
                        </el-col>
                        <el-col :span="6">
                            <input class="dateInput" type="number" v-model="payDate"/>日
                        </el-col>
                    </el-row>
                    <el-row class="dateRadioItem">
                        <el-col :span="12">
                            <el-radio v-model="dateRadio" label="OTHERS">其他（先发货后付款，支付日期不定）</el-radio>
                        </el-col>
                    </el-row>
                </div>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">添加</el-button>
            </el-aside>
        </el-container>

    </div>
</template>

<script>
let data1 = {"content":"1234"};
    export default{
        data(){
            return {
                token: '',
                content: '',
                dateRadio: 'PAY_IN_DAYS',
                delayDays: '',
                payDate: '',
                exampleFold: true,
                unfoldBtnDiv: false,
                url: '/api/frontend/joint_purchase/normal'
            }
        },
        methods: {
            cancel(){
                this.content = '';
                this.$router.push({name: 'settle'});
            },
            submit(){
                let that = this;
                const params = {
                    content:this.content
                };
               this.$api.addSettle(params).then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        that.$message.success('新增结算方式成功！');
                        that.$router.push({name: 'settle'});
                    }else{
                        that.$message.error('新增结算方式失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
            },
            showExample(){
                this.exampleFold = !this.exampleFold;
                this.unfoldBtnDiv = !this.unfoldBtnDiv;
            }
        },
        created(){
        }
    }
</script>

<style>
.el-radio__label {
    font-size: 16px !important;
}
.el-radio{
    line-height: initial !important;
}
</style>

<style lang="less" scoped>
.title{
    font-weight: bold;
    font-size:26px;
    text-align: left;
}
.container{
    margin-left:30px;
    font-size: 16px;
    
    .subtitle{
        
        color: #333;
        font-weight: bold;
    }
    .dateRadioDiv{
        margin-bottom: 30px;
    }
    .dateRadioItem{
        padding-bottom: 15px;
    }
    .dateInput{
        width: 60px;
        border-radius: 5px;
        outline: 0;
        border: 1px solid #999;
        margin-right: 10px;
    }
}
    
</style>