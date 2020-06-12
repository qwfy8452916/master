<template>
    <div class="hotelserviceadd">
        <p class="title">新增文化故事条目</p>
        <el-form :model="HotelCultureDetailData" :rules="rules" ref="HotelCultureDetailData" label-width="100px" class="hotelservicetypeform">
            <el-form-item label="图片">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="文本" prop="detailTxt">
                <el-input type="textarea" :rows="12" v-model.trim="HotelCultureDetailData.detailTxt" placeholder="请输入文本"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BH_HOTEL_CULTURE_STORY_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelCultureDetailData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelCultureDetailAdd',
    data(){
        return{
            authzData: '',
            hcdId: '',
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            bannerList: '',
            HotelCultureDetailData: {
                detailTxt: ''
            },
            isSubmit: false,
            rules: {
                detailTxt: [
                    {min: 1, max: 500, message: '文本请保持在500个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hcdId = this.$route.query.cid;
    },
    methods: {
        //新增文化故事条目
        submitForm(HotelCultureDetailData){
            const params = {
                hotelCultureStoryId: this.hcdId,
                cultureStoryDetailsPath: this.bannerList,
                cultureStory: this.HotelCultureDetailData.detailTxt
            };
            const id = this.hcdId;
            if(this.bannerList == '' && this.HotelCultureDetailData.detailTxt == ''){
                this.$message.error('图片和文本请至少填一个!');
                return false
            }
            // console.log(params);
            // return
            this.$refs[HotelCultureDetailData].validate((valid) => {
                if(valid){
                    this.isSubmit = true;
                    this.$api.hotelCultureDetailAdd(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                this.$message.success('新增文化故事条目成功！');
                                this.$router.push({name: 'HotelCultureDetail', query: {id}});
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
            const id = this.hcdId;
            this.$router.push({name: 'HotelCultureDetail', query: {id}});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                this.bannerList = res.data;
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.bannerList = '';
            }
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file, index){
            if(index == 1 || index == 2){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传商品图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1){
                this.$message.error('图片只能上传1张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
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
    }
    .required-icon{
        color: #F56C6C;
    }
}
</style>

