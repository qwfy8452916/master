<template>
    <div class="protocoladd">
        <p class="title">新增商品销售发票税率</p>
        <el-form :model="invoiceRateDataAdd" :rules="rules" ref="invoiceRateDataAdd" label-width="180px" class="protocolform">
            <el-form-item label="商品销售发票税率名称" prop="invoiceName">
                <el-input v-model.trim="invoiceRateDataAdd.invoiceName"></el-input>
            </el-form-item>
            <el-form-item label="商品销售发票税率" prop="invoiceRate">
                <el-input v-model.trim="invoiceRateDataAdd.invoiceRate" maxlength="10" ></el-input> %
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="5" v-model.trim="invoiceRateDataAdd.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_FIN_PRODRATE_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('invoiceRateDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganInvoiceRateAdd',
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
            oprId: '',
            invoiceRateDataAdd: {},
            isSubmit: false,
            rules: {
                invoiceName: [
                    {required: true, message: '请填写商品销售发票税率名称', trigger: 'blur'},
                    {min: 1, max: 15, message: '商品销售发票税率名称请保持在15个字符以内', trigger: ['blur','change']}
                ],
                invoiceRate: [
                    {required: true, validator: validateRate, trigger: ['blur','change']}
                ],
                remark:[
                    {min: 1, max: 50, message: '备注请保持在50个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.oprId = localStorage.getItem('oprId');
    },
    methods: {
        //确定-新增商品销售税率
        submitForm(invoiceRateDataAdd) {
            let params = {
                oprId: this.oprId,
                taxRateName: this.invoiceRateDataAdd.invoiceName,
                taxRate: parseFloat(this.invoiceRateDataAdd.invoiceRate).toFixed(4),
                remark: this.invoiceRateDataAdd.remark,
            }
            // console.log(params);
            this.$refs[invoiceRateDataAdd].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    if(this.invoiceRateDataAdd.invoiceRate > 100){
                        this.$message.error('商品销售发票税率不能大于100%！');
                        return false;
                    }
                    this.isSubmit = true;
                    this.$api.invoiceRateAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('商品销售发票税率新增成功！');
                                this.$router.push({name: 'LonganInvoiceRateList'});
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
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm() {
            this.$router.push({name: 'LonganInvoiceRateList'});
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
    }
}
</style>

