<template>
    <div class="servicetypeadd">
        <p class="title">新增服务类型目录</p>
        <el-form v-model="ServiceCatalogueData" :model="ServiceCatalogueData" :rules="rules" ref="ServiceCatalogueData" label-width="100px" class="servicefrom">
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="ServiceCatalogueData.sort"></el-input>
            </el-form-item>
            <el-form-item label="目录名称" prop="name">
                <el-input v-model.trim="ServiceCatalogueData.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="imageUrl">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张icon图标（建议尺寸：45*35px）</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ServiceCatalogueData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServiceCatalogueAdd',
    data(){
        return{
            authzData: '',
            hsId: '',
            ServiceCatalogueData: {
                sort: 0
            },
            uploadUrl: this.$api.upload_file_url,
            imagePath: '',
            isSubmit: false,
            headers: {},
            rules: {
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                name: [
                    {required: true, message: '请填写目录名称', trigger: 'blur'},
                    {max: 10, message: '目录名称请保持在10个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hsId = this.$route.query.hsId;
    },
    methods: {
        //确定-添加服务类型目录
        submitForm(ServiceCatalogueData){
            if(this.ServiceCatalogueData.sort == ''){
                this.ServiceCatalogueData.sort = 0;
            }
            const params = {
                sort: this.ServiceCatalogueData.sort,
                name: this.ServiceCatalogueData.name,
                iconPath: this.imagePath,
            };
            const hsId = this.hsId;
            this.$refs[ServiceCatalogueData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.serviceCatalogueAdd(params, hsId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('服务类型目录新增成功！');
                                const id = this.hsId;
                                this.$router.push({name: 'LonganHotelServiceCatalogueList', query: {id}});
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
            const id = this.hsId;
            this.$router.push({name: 'LonganHotelServiceCatalogueList', query: {id}});
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传商品图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('只能上传1张图片！');
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            this.imagePath = res.data;
        },
        //移除图片
        handleRemove(file, fileList) {
            this.imagePath = '';
        },
    }
}
</script>

<style lang="less" scoped>
.servicetypeadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .servicefrom{
        width: 42%;
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>
