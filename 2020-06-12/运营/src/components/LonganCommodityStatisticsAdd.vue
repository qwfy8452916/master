<template>
    <div class="commoditystatisticsadd">
        <p class="title">新增统计分类</p>
        <el-form v-model="CommodityStatisticsDataAdd" :model="CommodityStatisticsDataAdd" :rules="rules" ref="CommodityStatisticsDataAdd" label-width="100px" class="statisticsfrom">
            <el-form-item label="分类名称" prop="classifyName">
                <el-input v-model.trim="CommodityStatisticsDataAdd.classifyName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_CATEGORY_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityStatisticsDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommodityStatisticsAdd',
    data(){
        return {
            authzData: '',
            // orgId: '',
            CommodityStatisticsDataAdd: {},
            isSubmit: false,
            rules: {
                classifyName: [
                    {required: true, message: '请填写统计分类', trigger: 'blur'},
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
        submitForm(CommodityStatisticsDataAdd){
            const params = {
                // entryOprOrgId: this.orgId,
                orgAs: 2,
                categoryName: this.CommodityStatisticsDataAdd.classifyName
            };
            this.$refs[CommodityStatisticsDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commodityStatisticsAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data){
                                    this.$message.success('统计分类新增成功！');
                                    this.isSubmit = true;
                                    this.$router.push({name: 'LonganCommodityStatisticsList'});
                                }else{
                                    this.$message.error('统计分类新增失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error('统计分类新增失败！');
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
            this.$router.push({name: 'LonganCommodityStatisticsList'});
        },
    }
}
</script>

<style lang="less" scoped>
.commoditystatisticsadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .statisticsfrom{
        width: 42%;
    }
}
</style>
