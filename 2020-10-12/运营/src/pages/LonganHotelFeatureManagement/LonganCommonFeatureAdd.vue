<template>
    <div class="commonfeatureadd">
        <p class="title">添加客房设施分类</p>
        <el-form v-model="CommonFeatureDataAdd" :model="CommonFeatureDataAdd" :rules="rules" ref="CommonFeatureDataAdd" label-width="110px" class="featurefrom">
            <el-form-item label="客房设施分类" prop="featureType">
                <el-input v-model.trim="CommonFeatureDataAdd.featureType"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_CFEATURE_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommonFeatureDataAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommonFeatureAdd',
    data(){
        return {
            authzData: '',
            // orgId: '',
            CommonFeatureDataAdd: {},
            isSubmit: false,
            rules: {
                featureType: [
                    {required: true, message: '请填写客房设施分类', trigger: 'blur'},
                    {max: 12, message: '请保持在12个字符以内', trigger: ['blur','change']}
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
        //添加特色类型
        submitForm(CommonFeatureDataAdd){
            const params = {
                // encryptedOprOrgId: this.orgId,
                orgAs: 2,
                feName: this.CommonFeatureDataAdd.featureType
            };
            this.$refs[CommonFeatureDataAdd].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commonFeatureAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                if(result.data){
                                    this.$message.success('客房设施分类添加成功！');
                                    this.isSubmit = true;
                                    this.$router.push({name: 'LonganCommonFeature'});
                                }
                                else{
                                    this.$message.error('客房设施分类添加失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error(result.msg);
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
            this.$router.push({name: 'LonganCommonFeature'});
        }
    }
}
</script>

<style lang="less" scoped>
.commonfeatureadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .featurefrom{
        width: 42%;
    }
}
</style>
