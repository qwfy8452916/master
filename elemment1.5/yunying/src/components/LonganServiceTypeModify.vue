<template>
    <div class="servicetypeadd">
        <p class="title">修改服务类型</p>
        <el-form v-model="ServiceTypeDataModify" :model="ServiceTypeDataModify" :rules="rules" ref="ServiceTypeDataModify" label-width="100px" class="servicefrom">
            <el-form-item prop="imageUrl">
                <span slot="label"><label class="required-icon">*</label> 图片</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :file-list="imgList"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张图片（建议尺寸：45*35px）</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="服务类型" prop="name">
                <el-input v-model.trim="ServiceTypeDataModify.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ServiceTypeDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganServiceTypeModify',
    data(){
        return{
            stId: '',
            ServiceTypeDataModify: {},
            uploadUrl: this.$api.upload_file_url,
            imagePath: '',
            imgList: [],
            isSubmit: false,
            rules: {
                name: [
                    {required: true, message: '请填写服务类型', trigger: 'blur'},
                    {max: 12, message: '请保持在12个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        this.stId = this.$route.query.id;
        this.getServiceType();
    },
    methods: {
        //获取服务类型
        getServiceType(){
            const id = this.stId;
            const params = {};
            this.$api.getServiceType(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.ServiceTypeDataModify = result.data;
                        this.imgList = [{name: result.data.iconPath, url: result.data.iconUrl}];
                        this.imagePath = result.data.iconPath;
                    }else{
                        this.$message.error('获取服务类型添加失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改服务类型
        submitForm(ServiceTypeDataModify){
            const id = this.stId;
            const params = {
                iconPath: this.imagePath,
                name: this.ServiceTypeDataModify.name
            };
            this.$refs[ServiceTypeDataModify].validate((valid) => {
                if(valid){
                    if(this.imagePath == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    this.isSubmit = true;
                    // console.log(params, id);
                    this.$api.serviceTypeModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('服务类型修改成功！');
                                this.isSubmit = true;
                                this.$router.push({name: 'LonganServiceTypeList'});
                            }else{
                                this.$message.error('服务类型修改失败！');
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
            this.$router.push({name: 'LonganServiceTypeList'});
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
