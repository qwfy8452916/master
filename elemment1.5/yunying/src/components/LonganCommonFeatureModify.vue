<template>
    <div class="commonfeaturemodify">
        <p class="title">修改类型</p>
        <el-form v-model="CommonFeatureDataModify" :model="CommonFeatureDataModify" :rules="rules" ref="CommonFeatureDataModify" label-width="100px" class="featurefrom">
            <el-form-item label="特色类型" prop="featureType">
                <el-input v-model.trim="CommonFeatureDataModify.featureType"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('CommonFeatureDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommonFeatureModify',
    data(){
        return{
            CommonFeatureDataModify: {},
            isSubmit: false,
            rules: {
                featureType: [
                    {required: true, message: '请填写特色类型', trigger: 'blur'},
                    {max: 12, message: '请保持在12个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){

    },
    methods: {
        //获取特色类型
        getCommonFeature(){
            const params = {

            };
            // this.$api.commonFeatureAdd(params)
            //     .then(response => {
            //         // console.log(response);
            //         const result = response.data; 
            //         if(result.code == '0'){
            //             this.$message.success('特色类型添加成功！');
            //             this.isSubmit = true;
            //             this.$router.push({name: 'LonganCommonFeature'});
            //         }else{
            //             this.$message.error('特色类型添加失败！');
            //             this.isSubmit = false;
            //         }
            //     })
            //     .catch(error => {
            //         this.$alert(error,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
        },
        //确定-修改
        submitForm(CommonFeatureDataModify){
            const params = {

            };
            this.$refs[CommonFeatureDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    // this.$api.commonFeatureAdd(params)
                    //     .then(response => {
                    //         // console.log(response);
                    //         const result = response.data; 
                    //         if(result.code == '0'){
                    //             this.$message.success('特色类型添加成功！');
                    //             this.isSubmit = true;
                    //             this.$router.push({name: 'LonganCommonFeature'});
                    //         }else{
                    //             this.$message.error('特色类型添加失败！');
                    //             this.isSubmit = false;
                    //         }
                    //     })
                    //     .catch(error => {
                    //         this.$alert(error,"警告",{
                    //             confirmButtonText: "确定"
                    //         })
                    //     })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'LonganCommonFeature'});
        }
    }
}
</script>

<style lang="less" scoped>
.commonfeaturemodify{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .featurefrom{
        width: 42%;
    }
}
</style>
