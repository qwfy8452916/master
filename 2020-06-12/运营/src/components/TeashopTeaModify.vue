<template>
    <div class="commodityadd">
        <p class="title">修改商品</p>
        <el-form :model="CommodityDataModify" :rules="rules" ref="CommodityDataModify" label-width="130px" class="commodityform">
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 商品列表图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="imgList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 商品banner</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    :headers="headers"
                    name="fileContent"
                    :file-list="bannerList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 2)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 2)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 2)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 2)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 2)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持5张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input  v-model="CommodityDataModify.name"></el-input>
            </el-form-item>
            <el-form-item label="商品显示名称" prop="showName">
                <el-input  v-model="CommodityDataModify.showName"></el-input>
            </el-form-item>
             <el-form-item label="市场价" prop="marketPrice">
                <el-input  v-model.trim="CommodityDataModify.marketPrice" maxlength="18"></el-input> 元
            </el-form-item>
            <el-form-item label="会员价" prop="memberPrice">
                <el-input  v-model.trim="CommodityDataModify.memberPrice" maxlength="18"></el-input> 元
            </el-form-item>
            <el-form-item label="规格" prop="specification">
                <el-input  v-model="CommodityDataModify.specification"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input  v-model="CommodityDataModify.unit"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 商品描述</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :headers="headers"
                    name="fileContent"
                    :file-list="descList"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 3)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 3)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 3)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 3)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 3)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('CommodityDataModify')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'TeashopTeaModify',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            ttId: '',
            CommodityDataModify: {},
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            imgList: [],
            bannerList: [],
            descList: [],
            isSubmit: false,
            rules: {
                name: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'},
                    {min: 1, max: 30, message: '商品名称请保持在30个字符以内', trigger: ['blur','change']}
                ],
                showName: [
                    {required: true, message: '请输入商品显示名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '商品显示名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                marketPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                memberPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                specification: [
                    {min: 1, max: 10, message: '规格请保持在10个字符以内', trigger: ['blur','change']}
                ],
                unit: [
                    {min: 1, max: 10, message: '单位请保持在10个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.ttId = this.$route.query.id;
        this.teashopTeaDetail();
    },
    methods: {
        //获取商品详情
        teashopTeaDetail(){
            const params = {};
            const id = this.ttId;
            this.$api.teashopTeaDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.CommodityDataModify = result.data;
                        this.imgList = [{
                            name: result.data.logoPath,
                            url:  result.data.logoUrl,
                            path: result.data.logoPath
                        }];
                        this.bannerList = result.data.bannerImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
                        this.descList = result.data.descImageList.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
                    }else{
                        this.$message.error('商品详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //确定 - 修改
        submitForm(CommodityDataModify){
            const id = this.ttId;
            const logoPathArr = JSON.stringify(this.imgList.map(item => item.path));
            const logoPathStr = logoPathArr.substr(2,logoPathArr.length-4);
            const bannerPath = this.bannerList.map(item => item.path);
            const descPath = this.descList.map(item => item.path);
            const params = {
                logoPath: logoPathStr,
                bannerImages: JSON.stringify(bannerPath),
                name: this.CommodityDataModify.name,
                showName: this.CommodityDataModify.showName,
                marketPrice: parseFloat(this.CommodityDataModify.marketPrice).toFixed(2),
                memberPrice: parseFloat(this.CommodityDataModify.memberPrice).toFixed(2),
                specification: this.CommodityDataModify.specification,
                unit: this.CommodityDataModify.unit,
                descImages: JSON.stringify(descPath),
            };
            // console.log(params, id);
            this.$refs[CommodityDataModify].validate((valid) => {
                if (valid) {
                    if(this.imgList == ''){
                        this.$message.error('请上传商品列表图!');
                        return false
                    }
                    if(this.bannerList == ''){
                        this.$message.error('请上传商品banner图!');
                        return false
                    }
                    if(this.descList == ''){
                        this.$message.error('请上传商品描述图!');
                        return false
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.teashopTeaModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('商品修改成功！');
                                this.$router.push({name: 'TeashopTeaList'});
                            }else{
                                this.$message.error('商品修改失败！');
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            this.$router.push({name: 'TeashopTeaList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.imgList.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.bannerList.push(image);
            }else if(index == 3){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.descList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.imgList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 2){
                this.bannerList = fileList.map(item => {
                    return {
                        name: item.name,
                        url: item.url,
                        path: item.path
                    }
                });
            }else if(index == 3){
                this.descList = fileList.map(item => {
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
            }else if(index == 3){
                const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
                if (!isJPG) {
                    this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                return isJPG;
            }
        },
        //文件超出个数限制时
        handleExceed(file, fileList, index){
            if(index == 1){
                this.$message.error('商品列表图只能上传1张！');
            }else if(index == 2){
                this.$message.error('商品banner图不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }
    },
}
</script>

<style scoped>
.el-input{
    width: 92%;
}
.el-select{
    width: 92%;
}
</style>

<style lang="less" scoped>
.commodityadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .commodityform{
        width: 42%;
        .inputtime{
            width: 40%;
        }
        .selecttime{
            width: 30%;
        }
        .required-icon{
            color: #F56C6C;
        }
    }
}
</style>
