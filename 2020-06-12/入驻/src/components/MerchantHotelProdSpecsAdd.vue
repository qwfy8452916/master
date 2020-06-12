<template>
    <div class="prodspecs">
        <p class="title">添加商品规格</p>
        <el-form v-model="ProdSpecsData" :model="ProdSpecsData" :rules="rules" ref="ProdSpecsData" label-width="100px" class="specsform">
            <el-form-item label="规格" prop="prodSpecId">
                <el-select v-model="ProdSpecsData.prodSpecId" placeholder="请选择" @change="selectSpecs">
                    <el-option 
                        v-for="item in specsList" 
                        :key="item.id" 
                        :label="item.specName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
                <el-input v-model="ProdSpecsData.showName"></el-input>
            </el-form-item>
            <el-form-item label="供货价" prop="supplyPrice">
                <el-input v-model.trim="ProdSpecsData.supplyPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="零售价" prop="retailPrice">
                <el-input  v-model.trim="ProdSpecsData.retailPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="划线价" prop="marketPrice">
                <el-input v-model.trim="ProdSpecsData.marketPrice" maxlength="10"></el-input> 元
            </el-form-item>
            <el-form-item label="可售数量" prop="availableSaleQty">
                <el-input  v-model.number="ProdSpecsData.availableSaleQty"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="ProdSpecsData.sort"></el-input>
            </el-form-item>
            <el-form-item label="规格说明" prop="specInstruction">
                <el-input type="textarea" autosize v-model="ProdSpecsData.specInstruction"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 详情banner</span>
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
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ProdSpecsData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'MerchantHotelProdSpecsAdd',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var isValidatePrice = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            authzData: '',
            prodId: '',
            specsList: [],
            ProdSpecsData: {
                prodSpecId: '',
                showName: '',
                supplyPrice: '',
                retailPrice: '',
                marketPrice: '',
                availableSaleQty: -999,
                sort: 0,
                specInstruction: '',
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            bannerList: [],
            isSubmit: false,
            rules: {
                prodSpecId: [
                    {required: true, message: '请选择规格', trigger: 'change'}
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
                    {validator: isValidatePrice, trigger: ['blur','change']}
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
        this.hotelProdId  = this.$route.query.hotelProdId ;
        this.unusedProdSpecsList();
    },
    methods: {
        //未被使用的规格列表
        unusedProdSpecsList(){
           const params = {
                hotelProdId : this.hotelProdId 
            };
            // console.log(params);
            this.$api.unusedProdSpecsList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.specsList = result.data;
                        // this.specsList = result.data.map(item => {
                        //     return{
                        //         id: item.id,
                        //         specName: item.specName
                        //     }
                        // });
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
        //选择规格
        selectSpecs(value){
            let specsInfo = this.specsList.find(item => item.id == value)
            this.ProdSpecsData.supplyPrice = specsInfo.supplyPrice;
            this.ProdSpecsData.retailPrice = specsInfo.retailPrice;
            this.ProdSpecsData.marketPrice = specsInfo.marketPrice;
            this.ProdSpecsData.sort = specsInfo.sort;
            this.ProdSpecsData.specInstruction = specsInfo.specInstruction;
            this.bannerList = specsInfo.bannerImageList.map(item => {
                return {
                    name: item.imagePath,
                    url: item.imageUrl,
                    path: item.imagePath
                }
            });
        },
        //确定 - 新增
        submitForm(ProdSpecsData){
            if(this.ProdSpecsData.sort == ''){
                this.ProdSpecsData.sort = 0;
            }
            const bannerPath = this.bannerList.map(item => item.path);
            const params = {
                hotelProdId: this.hotelProdId,
                prodSpecId: this.ProdSpecsData.prodSpecId,
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
                    this.$api.hotelProdSpecsAdd(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('酒店商品规格添加成功！');
                                const id = this.hotelProdId;
                                this.$router.push({name: 'MerchantHotelProdSpecsList', query: {id}});
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
            this.$router.push({name: 'MerchantHotelProdSpecsList', query: {id}});
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
