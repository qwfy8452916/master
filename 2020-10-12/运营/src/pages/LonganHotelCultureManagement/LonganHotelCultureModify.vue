<template>
    <div class="hotelserviceadd">
        <p class="title">修改文化故事</p>
        <el-form :model="HotelCultureData" :rules="rules" ref="HotelCultureData" label-width="100px" class="hotelservicetypeform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select 
                    v-model="HotelCultureData.hotelId" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择" >
                    <el-option 
                        v-for="item in hotelList" 
                        :key="item.id" 
                        :label="item.hotelName" 
                        :value="item.id"
                        :data-orgId="item.horgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文化故事" prop="cultureStoryName">
                <el-input v-model.trim="HotelCultureData.cultureStoryName"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="bannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_CULTURE_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelCultureData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelCultureModify',
    data(){
        return{
            authzData: '',
            hotelList: [],
            loadingH: false,
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            bannerList: [],
            hcId: '',
            HotelCultureData: {},
            isSubmit: false,
            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店名称', trigger: 'blur'}
                ],
                cultureStoryName: [
                    {required: true, message: '请输入文化故事', trigger: 'blur'},
                    {min: 1, max: 20, message: '文化故事请保持在20个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hcId = this.$route.query.id;
        this.getHotelList();
        this.hotelCultureDetail();
    },
    methods: {
        //获取酒店信息
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName,
                                horgId: item.orgId
                            }
                        })
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
        remoteHotel(val){
            this.getHotelList(val);
        },
        //获取文化故事详情
        hotelCultureDetail(){
            const params = {};
            const id = this.hcId;
            this.$api.hotelCultureDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelCultureData = result.data;
                        this.bannerList = [{
                            name: result.data.cultureStoryPath,
                            url:  result.data.storyPath,
                            path: result.data.cultureStoryPath
                        }];
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //修改文化故事
        submitForm(HotelCultureData){
            const bannerPathArr = JSON.stringify(this.bannerList.map(item => item.path));
            const bannerPathStr = bannerPathArr.substr(2,bannerPathArr.length-4);
            const params = {
                hotelId: this.HotelCultureData.hotelId,
                cultureStoryName: this.HotelCultureData.cultureStoryName,
                cultureStoryPath: bannerPathStr
            };
            const id = this.hcId;
            this.$refs[HotelCultureData].validate((valid) => {
                if(valid){
                    if(this.bannerList.length == '0'){
                        this.$message.error('请上传banner图!');
                        return false
                    }
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.hotelCultureModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                this.$message.success('修改文化故事成功！');
                                this.$router.push({name: 'LonganHotelCultureList'});
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
            this.$router.push({name: 'LonganHotelCultureList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.bannerList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.bannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
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
                this.$message.error('banner图只能上传1张！');
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

