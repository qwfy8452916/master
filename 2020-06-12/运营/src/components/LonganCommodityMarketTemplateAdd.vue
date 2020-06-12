<template>
    <div class="commoditymarketadd">
        <p class="title">新增市场分类</p>
        <el-form v-model="CommodityMarketDataAdd" :model="CommodityMarketDataAdd" :rules="rules" ref="CommodityMarketDataAdd" label-width="100px" class="marketfrom">
            <el-form-item label="分类名称" prop="classifyName">
                <el-input v-model.trim="CommodityMarketDataAdd.classifyName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_MARKETTPL_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityMarketDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommodityMarketTemplateAdd',
    data(){
        return {
            authzData: '',
            // orgId: '',
            CommodityMarketDataAdd: {},
            isSubmit: false,
            rules: {
                classifyName: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
    },
    methods: {
        //确定-添加统计分类
        submitForm(CommodityMarketDataAdd){
            const params = {
                // entryOprOrgId: this.orgId,
                orgAs: 2,
                categoryName: this.CommodityMarketDataAdd.classifyName
            };
            this.$refs[CommodityMarketDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commodityMarketAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('市场分类模板新增成功！');
                                this.isSubmit = true;
                                this.$router.push({name: 'LonganCommodityMarketTemplateList'});
                            }else{
                                this.$message.error('市场分类模板新增失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.isSubmit = false;
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganCommodityMarketTemplateList'});
        },
    }
}
</script>

<style lang="less" scoped>
.commoditymarketadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .marketfrom{
        width: 42%;
    }
}
</style>
