<template>
    <div class="commoditystatisticsadd">
        <p class="title">修改统计分类</p>
        <el-form v-model="CommodityStatisticsDataModify" :model="CommodityStatisticsDataModify" :rules="rules" ref="CommodityStatisticsDataModify" label-width="100px" class="statisticsfrom">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model.trim="CommodityStatisticsDataModify.categoryName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_CATEGORY_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommodityStatisticsDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommodityStatisticsModify',
    data(){
        return {
            authzData: '',
            csId: '',
            CommodityStatisticsDataModify: {},
            isSubmit: false,
            rules: {
                categoryName: [
                    {required: true, message: '请填写统计分类', trigger: 'blur'},
                    {max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.csId = this.$route.query.id;
        this.getCommodityStatistics();
    },
    methods: {
        //获取统计分类
        getCommodityStatistics(){
            const id = this.csId;
            const params = {};
            // console.log(id);
            this.$api.commodityStatisticsDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.CommodityStatisticsDataModify = result.data;
                    }else{
                        this.$message.error('获取统计分类失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改统计分类
        submitForm(CommodityStatisticsDataModify){
            const params = {
                categoryName: this.CommodityStatisticsDataModify.categoryName
            };
            const id = this.csId;
            this.$refs[CommodityStatisticsDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commodityStatisticsModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('统计分类修改成功！');
                                this.isSubmit = true;
                                this.$router.push({name: 'LonganCommodityStatisticsList'});
                            }else{
                                this.$message.error('统计分类修改失败！');
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
