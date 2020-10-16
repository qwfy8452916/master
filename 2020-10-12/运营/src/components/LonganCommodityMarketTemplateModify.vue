<template>
    <div class="commoditymarketadd">
        <p class="title">修改市场分类</p>
        <el-form v-model="CommodityMarketDataModify" :model="CommodityMarketDataModify" :rules="rules" ref="CommodityMarketDataModify" label-width="100px" class="marketfrom">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model.trim="CommodityMarketDataModify.categoryName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_MARKETTPL_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityMarketDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommodityMarketTemplateModify',
    data(){
        return {
            authzData: '',
            cmId: '',
            CommodityMarketDataModify: {},
            isSubmit: false,
            rules: {
                categoryName: [
                    {required: true, message: '请填写市场分类', trigger: 'blur'},
                    {max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.cmId = this.$route.query.id;
        this.commodityMarketDetail();
    },
    methods: {
        //获取市场分类模板
        commodityMarketDetail(){
            const id = this.cmId;
            const params = {};
            this.$api.commodityMarketDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.CommodityMarketDataModify = result.data;
                    }else{
                        this.$message.error('获取市场分类失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改统计分类
        submitForm(CommodityMarketDataModify){
            const params = {
                categoryName: this.CommodityMarketDataModify.categoryName
            };
            const id = this.cmId;
            this.$refs[CommodityMarketDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commodityMarketModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('市场分类模板修改成功！');
                                this.isSubmit = true;
                                this.$router.push({name: 'LonganCommodityMarketTemplateList'});
                            }else{
                                this.$message.error('市场分类模板修改失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
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
