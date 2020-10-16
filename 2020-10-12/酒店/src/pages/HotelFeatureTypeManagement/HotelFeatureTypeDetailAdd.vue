<template>
    <div class="featuredetailadd">
        <p class="title">添加客房设施明细</p>
        <el-form :model="FeatureDetailData" :rules="FeatureDetailData.rules" ref="FeatureDetailData" label-width="120px" class="hotelfeatureform">
            <el-form-item label="标题" prop="titleName">
                <el-input v-model.trim="FeatureDetailData.titleName"></el-input>
            </el-form-item>
            <el-form-item prop="featureImg">
                <span slot="label"><label class="required-icon">*</label> 图片</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-upload="beforeUpload">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;最多支持5张,图片小于2M</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="描述" prop="describeFeature">
                <el-input v-model="FeatureDetailData.describeFeature" maxlength="255" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <!-- <el-form-item label="文字注释"> -->
                <div class="annotationadd">
                    <span class="annspan">标签</span>
                    <div class="addbtn"><el-button type="primary" size="small" @click="annotationAddLine">添加</el-button></div>
                    <el-table
                        :data="FeatureDetailData.AnnotationData"
                        :show-header="false"
                        class="annotationtable">
                        <el-table-column prop="annotationTxt">
                            <template slot-scope="scope">
                                <el-form-item :prop="'AnnotationData.'+scope.$index+'.annotationTxt'" :rules="FeatureDetailData.rules.annotation">
                                <el-input v-model="scope.row.annotationTxt"></el-input>
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
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('FeatureDetailData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelFeatureTypeDetailAdd',
    data(){
        return {
            hfId: '',
            imgList: [],
            FeatureDetailData: {
                rules: {
                    titleName: [
                        {required: true, message: '请填写特色产品标题', trigger: 'blur'},
                        {min: 1, max: 32, message: '特色产品标题请保持在32个字符以内', trigger: ['blur','change']}
                    ],
                    annotation: [
                        {min: 1, max: 18, message: '标签内容请保持在18个字符以内', trigger: ['blur','change']}
                    ]
                },
                AnnotationData: [{
                    annotationTxt: ''
                }]
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            isSubmit: false
        }
    },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hfId = this.$route.query.id;
        // console.log(this.hfId);
    },
    methods: {
        //添加-文字注释-行
        annotationAddLine(){
            const annData = this.FeatureDetailData.AnnotationData;
            if(annData.length < 5){
                let newLine = {
                    annotationTxt: ''
                };
                this.FeatureDetailData.AnnotationData.push(newLine);
            }else{
                this.$message.error('标签最多5个!');
            }
        },
        //删除-文字注释-行
        annotationDeleteLine(index){
            this.FeatureDetailData.AnnotationData.splice(index, 1);
        },
        //确定-添加
        submitForm(FeatureDetailData){
            const imgDTOS = this.imgList.map(item => item.path);
            const tagJSON = this.FeatureDetailData.AnnotationData.map(item => item.annotationTxt);
            const params = {
                orgAs: 3,
                featureHotelId: this.hfId,
                title: this.FeatureDetailData.titleName,
                featureAddImages: JSON.stringify(imgDTOS),
                detailDesc: this.FeatureDetailData.describeFeature,
                tag: JSON.stringify(tagJSON),
            };
            this.$refs[FeatureDetailData].validate((valid, model) => {
                if(valid){
                    if(imgDTOS == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.HotelFeatureDetailAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == 0){
                                if(result.data){
                                    this.$message.success('添加酒店特色成功！');
                                    const id = this.hfId;
                                    this.$router.push({name: 'HotelFeatureTypeDetail', query: {id}});
                                }else{
                                    this.$message.error('添加酒店特色失败！');
                                    this.isSubmit = false;
                                }
                            }else{
                                this.$message.error('添加酒店特色失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
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
            this.$router.push({name: 'HotelFeatureTypeDetail', query: {id}});
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
            this.imgList = fileList.map((item, index)=>{
                return {
                    name: item.name,
                    url: item.url,
                    path: item.response.data
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
