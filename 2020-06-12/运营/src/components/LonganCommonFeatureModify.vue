<template>
    <div class="commonfeaturemodify">
        <p class="title">修改客房设施分类</p>
        <el-form v-model="CommonFeatureDataModify" :model="CommonFeatureDataModify" :rules="rules" ref="CommonFeatureDataModify" label-width="110px" class="featurefrom">
            <el-form-item label="客房设施分类" prop="feName">
                <el-input v-model.trim="CommonFeatureDataModify.feName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_CFEATURE_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('CommonFeatureDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganCommonFeatureModify',
    data(){
        return{
            authzData: '',
            // orgId: '',
            cfId: '',
            CommonFeatureDataModify: {},
            isSubmit: false,
            rules: {
                feName: [
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
        this.cfId = this.$route.query.id;
        this.getCommonFeature();
    },
    methods: {
        //获取特色类型
        getCommonFeature(){
            const params = {};
            const id = this.cfId;
            // console.log(id);
            this.$api.getCommonFeature(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.CommonFeatureDataModify = result.data;
                    }else{
                        this.$message.error('客房设施分类获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改
        submitForm(CommonFeatureDataModify){
            const params = {
                // encryptedOprOrgId: this.orgId,
                feName: this.CommonFeatureDataModify.feName
            };
            const id = this.cfId;
            this.$refs[CommonFeatureDataModify].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.commonFeatureModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('修改成功，请等待审核！');
                                this.isSubmit = true;
                                this.$router.push({name: 'LonganCommonFeature'});
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
