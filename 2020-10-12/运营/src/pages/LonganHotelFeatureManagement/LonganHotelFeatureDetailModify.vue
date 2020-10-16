<template>
    <div class="featuredetailadd">
        <p class="title">修改客房设施明细</p>
        <el-form :model="FeatureDetailData" :rules="rules" ref="FeatureDetailData" label-width="120px" class="hotelfeatureform">
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="FeatureDetailData.title"></el-input>
            </el-form-item>
            <el-form-item prop="featureImg">
                <span slot="label"><label class="required-icon">*</label>图片</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :headers="headers"
                    :limit="5"
                    name="fileContent"
                    :file-list="imgList"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;最多支持5张,图片小于2M</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="描述" prop="detailDesc">
                <el-input v-model="FeatureDetailData.detailDesc" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <!-- <el-form-item label="文字注释"> -->
                <div class="annotationadd">
                    <span class="annspan">标签</span>
                    <div class="addbtn"><el-button type="primary" size="small" @click="annotationAddLine">添加</el-button></div>
                    <el-table
                        :data="FeatureDetailData.tagData"
                        :show-header="false"
                        class="annotationtable">
                        <el-table-column prop="tagVal">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tagData.'+scope.$index+'.tagVal'" :rules="rules.tagVal">
                                    <el-input v-model="scope.row.tagVal"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column width="30px">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="annotationDeleteLine(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            <!-- </el-form-item> -->
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_FEATURE_DETAIL_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('FeatureDetailData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelFeatureDetailModify',
    data(){
        return {
            authzData: '',
            // orgId: '',
            hfDetailId: '',
            hfId: '',
            imgList: [],
            FeatureDetailData: {},
            rules: {
                title: [
                    {required: true, message: '请填写标题', trigger: 'blur'},
                    {min: 1, max: 32, message: '标题请保持在32个字符以内', trigger: ['blur','change']}
                ],
                tagVal: [
                    {min: 1, max: 18, message: '标签请保持在18个字符以内', trigger: ['blur','change']}
                ]
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            isSubmit: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.hfDetailId = this.$route.query.hfDetailId;
        this.hfId = this.$route.query.hfId;
        this.getHotelFeatureDetail();
        // console.log(this.hfId);
    },
    methods: {
        //获取客房设施明细详情
        getHotelFeatureDetail(){
            const params = {
                featureHotelId: this.hfId,
                id: this.hfDetailId
            };
            // console.log(params);
            this.$api.getHotelFeatureDetail(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        const imageData = result.data.records[0].imageDTOS;
                        this.FeatureDetailData = result.data.records[0];
                        this.imgList = imageData.map((item, index) => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.url,
                                path: item.imagePath
                            }
                        })
                        const tagList = result.data.records[0].tagStr;
                        this.FeatureDetailData.tagData = tagList.map((item, index) => {
                            return {
                                tagVal: item
                            }
                        })
                        // console.log(this.FeatureDetailData.tagData);
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
        //添加-文字注释-行
        annotationAddLine(){
            const annData = this.FeatureDetailData.tagData;
            if(annData.length < 5){
                let newLine = {
                    tagVal: ''
                };
                this.FeatureDetailData.tagData.push(newLine);
            }else{
                this.$message.error('标签最多5个!');
            }  
        },
        //删除-文字注释-行
        annotationDeleteLine(index){
            this.FeatureDetailData.tagData.splice(index, 1);
        },
        //确定-修改
        submitForm(FeatureDetailData){
            const imgDTOS = this.imgList.map(item => item.path);
            const tagJSON = this.FeatureDetailData.tagData.map(item => item.tagVal);
            const params = {
                // oprOrgId: this.orgId,
                featureHotelId: this.hfId,
                title: this.FeatureDetailData.title,
                featureAddImages: JSON.stringify(imgDTOS),
                detailDesc: this.FeatureDetailData.detailDesc,
                tag: JSON.stringify(tagJSON),
            };
            const id = this.hfDetailId;
            this.$refs[FeatureDetailData].validate((valid, model) => {
                if(valid){
                    if(imgDTOS == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.HotelFeatureDetailModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data){
                                    this.$message.success('修改成功，请等待审核！');
                                    const id = this.hfId;
                                    this.$router.push({name: 'LonganHotelFeatureDetail', query: {id}});
                                }else{
                                    this.$message.error('修改客房设施明细失败！');
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
                    console.log('error submit!');
                    return false
                }
            })
        },
        //取消
        resetForm(){
            const id = this.hfId;
            this.$router.push({name: 'LonganHotelFeatureDetail', query: {id}});
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            const image = {
                name: file.name,
                url: file.url,
                path: res.data
            }
            this.imgList.push(image);
        },
        //移除图片
        handleRemove(file, fileList) {
            // console.log(file);
            // console.log(fileList);
            this.imgList = fileList.map((item, index)=>{
               return {
                  name: item.name,
                  url: item.url,
                  path: item.path
               }
            })
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
            this.$message.error('上传图片不能超过5张！');
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    }
}
</script>

<style scoped>
.featuredetailadd >>> .el-table::before{
    height: 0px; 
}
.featuredetailadd >>> .el-table td{
    border-bottom: 0px;
    padding: 0px 0px;
}
.featuredetailadd >>> .el-table .cell{
    padding-left: 0px;
}
</style>

<style lang="less" scoped>
.featuredetailadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelfeatureform{
        width: 42%;
        .required-icon{
            color: #ff3030;
        }
        .annotationadd{
            .annspan{
                display: inline-block;
                width: 108px;
                font-size: 14px;
                color: #666;
                text-align: right;
                padding-right: 12px;
            }
            .addbtn{
                margin-bottom: 15px;
                display: inline-block;
            }
        }
    }
}
</style>
