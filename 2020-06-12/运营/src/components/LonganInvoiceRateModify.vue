<template>
    <div class="protocoladd">
        <p class="title">修改商品销售发票税率</p>
        <el-form :model="invoiceRateDataAdd" :rules="rules" ref="invoiceRateDataAdd" label-width="180px" class="protocolform">
            <el-form-item label="商品销售发票税率名称" prop="taxRateName">
                <el-input v-model.trim="invoiceRateDataAdd.taxRateName"></el-input>
            </el-form-item>
            <el-form-item label="商品销售发票税率" prop="taxRate">
                <el-input v-model.trim="invoiceRateDataAdd.taxRate" maxlength="10" ></el-input> %
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="5" v-model.trim="invoiceRateDataAdd.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_FIN_PRODRATE_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('invoiceRateDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganInvoiceRateModify',
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
            irId: '',
            invoiceRateDataAdd: {},
            isSubmit: false,
            rules: {
                taxRateName: [
                    {required: true, message: '请填写商品销售发票税率名称', trigger: 'blur'},
                    {min: 1, max: 15, message: '商品销售发票税率名称请保持在15个字符以内', trigger: ['blur','change']}
                ],
                taxRate: [
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
        this.irId = this.$route.query.id;
        this.invoiceRateDetail();
    },
    methods: {
        //获取详情
        invoiceRateDetail(){
            const params = {};
            const id = this.irId;
            this.$api.invoiceRateDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.invoiceRateDataAdd = result.data;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.isSubmit = false;
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改商品销售税率
        submitForm(invoiceRateDataAdd) {
            let params = {
                taxRateName: this.invoiceRateDataAdd.taxRateName,
                taxRate: parseFloat(this.invoiceRateDataAdd.taxRate).toFixed(4),
                remark: this.invoiceRateDataAdd.remark,
            }
            const id = this.irId;
            // console.log(params);
            this.$refs[invoiceRateDataAdd].validate((valid) => {
                if (valid) {
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.invoiceRateModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('商品销售发票税率修改成功！');
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

