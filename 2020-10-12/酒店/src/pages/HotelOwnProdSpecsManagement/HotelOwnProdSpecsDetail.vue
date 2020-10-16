<template>
    <div class="prodspecs">
        <p class="title">商品规格详情</p>
        <el-form v-model="ProdSpecsData" :model="ProdSpecsData" :rules="rules" ref="ProdSpecsData" label-width="100px" class="specsform">
            <el-form-item label="规格名称" prop="specName">
                <el-input :disabled="true" v-model="ProdSpecsData.specName"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
                <el-input :disabled="true" v-model="ProdSpecsData.showName"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="supplyPrice">
                <el-input :disabled="true" v-model.trim="ProdSpecsData.supplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="retailPrice">
                <el-input :disabled="true" v-model.trim="ProdSpecsData.retailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="marketPrice">
                <el-input :disabled="true" v-model.trim="ProdSpecsData.marketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input :disabled="true" v-model.number="ProdSpecsData.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input :disabled="true" v-model.number="ProdSpecsData.sort"></el-input>
            </el-form-item>
            <el-form-item label="规格说明" prop="specInstruction">
                <el-input :disabled="true" type="textarea" autosize v-model="ProdSpecsData.specInstruction"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 详情banner</span>
                <el-upload
                    :disabled="true"
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
            <el-form-item>
                <el-button @click="resetForm">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'HotelOwnProdSpecsDetail',
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
            authzData: '',
            hpsId: '',
            ProdSpecsData: {},
            hotelProdId: '',
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            bannerList: [],
            isSubmit: false,
            rules: {
                specName: [
                    {required: true, message: '请输入规格名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '规格名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                showName: [
                    {required: true, message: '请输入显示名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '显示名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                supplyPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                retailPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                marketPrice: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                availableSaleQty: [
                    {required: true, message: '请输入可售数量', trigger: 'blur'},
                    {min: -999, max: 9999999999, type: 'number', message: '格式有误', trigger: ['blur','change']}
                ],
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                specInstruction: [
                    {max: 250, message: '请保持在250个字符以内', trigger: ['blur','change']}
                ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hpsId = this.$route.query.id;
        this.hotelProdId = this.$route.query.hotelProdId;
        this.hotelProdSpecsDetail();
    },
    methods: {
        //获取商品详情
        hotelProdSpecsDetail(){
            const params = {};
            this.$api.hotelProdSpecsDetail(params, this.hpsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.ProdSpecsData = result.data;
                        this.bannerList = result.data.bannerImageList.map(item => {
                            return {
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
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
        //确定 - 修改
        submitForm(ProdSpecsData){
            if(this.ProdSpecsData.sort == ''){
                this.ProdSpecsData.sort = 0;
            }
            const bannerPath = this.bannerList.map(item => item.path);
            const params = {
                specName: this.ProdSpecsData.specName,
                showName: this.ProdSpecsData.showName,
                supplyPrice: this.ProdSpecsData.supplyPrice,
                retailPrice: this.ProdSpecsData.retailPrice,
                marketPrice: this.ProdSpecsData.marketPrice,
                availableSaleQty: this.ProdSpecsData.availableSaleQty,
                sort: this.ProdSpecsData.sort,
                specInstruction: this.ProdSpecsData.specInstruction,
                bannerImages: bannerPath,
            };
            // console.log(params);
            this.$refs[ProdSpecsData].validate((valid) => {
                if (valid) {
                    if(this.bannerList == ''){
                        this.$message.error('请上传详情banner!');
                        return false
                    }
                    this.isSubmit = true;
                    this.$api.hotelProdSpecsModify(params, this.hpsId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('商品规格修改成功！');
                                const id = this.hotelProdId;
                                this.$router.push({name: 'HotelOwnProdSpecsList', query: {id}});
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //取消
        resetForm(){
            const id = this.hotelProdId;
            this.$router.push({name: 'HotelOwnProdSpecsList', query: {id}});
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
                this.$message.error('详情banner图不能超过5张！');
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
    width: 82%;
}
.el-select{
    width: 82%;
}
.el-textarea{
    width: 82%;
}
</style>

<style lang="less" scoped>
.prodspecs{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .specsform{
        width: 45%;
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
