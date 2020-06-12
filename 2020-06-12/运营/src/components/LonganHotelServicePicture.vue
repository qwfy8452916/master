<template>
    <div class="servicetypeadd">
        <p class="title">修改图片明细</p>
        <el-form v-model="ServicePictureData" :model="ServicePictureData" :rules="rules" ref="ServicePictureData" label-width="100px" class="servicefrom">
            <el-form-item prop="imageUrl">
                <span slot="label"><label class="required-icon">*</label> 图片</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="imgList"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="联系方式" prop="contacts">
                <el-input v-model.trim="ServicePictureData.contacts"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ServicePictureData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServicePicture',
    data(){
        var phoneReg = /^[0-9]{1,20}$/
        var validatePhone = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!phoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            hsId: '',
            ServicePictureData: {},
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imagePath: '',
            imgList: [],
            isSubmit: false,
            rules: {
                contacts: [
                    {validator: validatePhone, trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hsId = this.$route.query.id;
        this.servicePictureDetail();
    },
    methods: {
        //获取服务类型图片明细
        servicePictureDetail(){
            const hsId = this.hsId;
            const params = {};
            this.$api.HotelServiceTypeDetail(params, hsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.ServicePictureData = result.data;
                        if(result.data.picPath != ''){
                            this.imgList = [{name: result.data.picPath, url: result.data.picUrl}];
                            this.imagePath = result.data.picPath;
                        }
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确定-修改服务类型图片明细
        submitForm(ServicePictureData){
            const hsId = this.hsId;
            const params = {
                picPath: this.imagePath,
                contacts: this.ServicePictureData.contacts
            };
            this.$refs[ServicePictureData].validate((valid) => {
                if(valid){
                    if(this.imagePath == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    this.isSubmit = true;
                    // console.log(params, hsId);
                    this.$api.HotelServiceTypeModify(params, hsId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('服务类型图片明细修改成功！');
                                this.$router.push({name: 'LonganHotelServiceList'});
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
            this.$router.push({name: 'LonganHotelServiceList'});
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
