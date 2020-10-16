<template>
    <div class="hotelserviceadd">
        <p class="title">修改动态表单介绍信息</p>
        <el-form :model="HotelServiceTypeData" :rules="rules" ref="HotelServiceTypeData" label-width="100px" class="hotelservicetypeform">
            <el-form-item label="banner图" prop="imageUrl">
                <!-- <span slot="label"><label class="required-icon">*</label> banner图</span> -->
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
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只支持上传1张icon图标（建议尺寸：45*35px）</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="HotelServiceTypeData.title"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="intro">
                <el-input type="textarea" :rows="5" v-model.trim="HotelServiceTypeData.intro"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('HotelServiceTypeData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServiceFormIntroduce',
    data(){
        return{
            authzData: '',
            hsId: '',
            uploadUrl: this.$api.upload_file_url,
            imagePath: '',
            imgList: [],
            headers: {},
            HotelServiceTypeData: {},
            isSubmit: false,
            rules: {
                title: [
                    {min: 1, max: 30, message: '标题请保持在30个字符以内', trigger: ['blur','change']}
                ],
                intro: [
                    {min: 1, max: 255, message: '介绍请保持在255个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hsId = this.$route.query.hsId;
        this.HotelServiceTypeDetail();
    },
    methods: {
        //获取酒店服务类型详情
        HotelServiceTypeDetail(){
            const params = {};
            const hsId = this.hsId;
            // console.log(params);
            this.$api.HotelServiceTypeDetail(params, hsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.HotelServiceTypeData = result.data;
                        if(result.data.picPath != ''){
                            this.imgList = [{name: result.data.picPath, url: result.data.picUrl}];
                            this.imagePath = result.data.picPath;
                        }
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //修改酒店服务类型
        submitForm(HotelServiceTypeData){
            const params = {
                picPath: this.imagePath,
                title: this.HotelServiceTypeData.title,
                intro: this.HotelServiceTypeData.intro
            };
            const hsId = this.hsId;
            this.$refs[HotelServiceTypeData].validate((valid) => {
                if(valid){
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.HotelServiceTypeModify(params, hsId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data == true){
                                    this.$message.success('修改动态表单介绍信息成功！');
                                    const id = this.hsId;
                                    this.$router.push({name: 'LonganHotelServiceFormList', query: {id}});
                                }else{
                                    this.$message.error('修改动态表单介绍信息失败！');
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
            const id = this.hsId;
            this.$router.push({name: 'LonganHotelServiceFormList', query: {id}});
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
.hotelserviceadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelservicetypeform{
        width: 42%;
        .required-icon{
            color: #ff3030;
        }
    }
}
</style>

