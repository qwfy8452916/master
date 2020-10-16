<template>
    <div class="servicetypeadd">
        <p class="title">修改Banner明细</p>
        <el-form v-model="ServiceCommonData" :model="ServiceCommonData" :rules="rules" ref="ServiceCommonData" label-width="100px" class="servicefrom">
            <!-- <el-form-item label="所属目录" prop="hotelCategoryCatalogId">
                <el-select v-model="ServiceCommonData.hotelCategoryCatalogId" placeholder="请选择">
                    <el-option 
                        v-for="item in catalogueList" 
                        :key="item.id" 
                        :label="item.catalogueName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="ServiceCommonData.sort"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="ServiceCommonData.name"></el-input>
            </el-form-item>
            <el-form-item prop="imageUrl">
                <span slot="label"><label class="required-icon">*</label> 图标</span>
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
            <el-form-item label="单价" prop="price">
                <el-input v-model.trim="ServiceCommonData.price" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model.trim="ServiceCommonData.unit"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" :rows="5" v-model.trim="ServiceCommonData.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm()">取消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ServiceCommonData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganHotelServiceBannerModify',
    data(){
        var priceReg = /^\d+(\.\d+)?$/
        var validatePrice = (rule,value,callback) => {
            if(!value){
                callback()
            }else if(!priceReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            hsId: '',
            catalogueList: [],
            ServiceCommonData: {
                sort: 0,
                price: '',
                unit: ''
            },
            ssId: '',
            uploadUrl: this.$api.upload_file_url,
            imagePath: '',
            imgList: [],
            isSubmit: false,
            headers: {},
            rules: {
                // hotelCategoryCatalogId: [
                //     { required: true, message: '请选择所属目录', trigger: 'change' }
                // ],
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                name: [
                    {required: true, message: '请填写名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '名称请保持在32个字符以内', trigger: ['blur','change']}
                ],
                price: [
                    {validator: validatePrice, trigger: ['blur','change']}
                ],
                unit: [
                    {min: 1, max: 10, message: '单位请保持在10个字符以内', trigger: ['blur','change']}
                ],
                description: [
                    {min: 1, max: 255, message: '描述请保持在255个字符以内', trigger: ['blur','change']}
                ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hsId = this.$route.query.hsId;
        this.ssId = this.$route.query.id;
        this.serviceCatalogueList();
        this.serviceCommonDetail();
    },
    methods: {
        //服务类型目录列表
        serviceCatalogueList(){
            const params = {};
            // console.log(params);
            const hsId = this.hsId;
            this.$api.serviceCatalogueList(params, hsId)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.catalogueList = result.data.map(item => {
                            return{
                                id: item.id,
                                catalogueName: item.name
                            }
                        });
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
        //服务类型明细详情
        serviceCommonDetail(){
            const params = {};
            const hsId = this.hsId;
            const ssId = this.ssId;
            this.$api.serviceCommonDetail(params, hsId, ssId)
                .then(response => {
                    // console.log(response);
                    const result = response.data; 
                    if(result.code == '0'){
                        this.ServiceCommonData = result.data;
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
        //确定-修改明细
        submitForm(ServiceCommonData){
            if(this.ServiceCommonData.sort == ''){
                this.ServiceCommonData.sort = 0;
            }
            const params = {
                // hotelCategoryCatalogId: this.ServiceCommonData.hotelCategoryCatalogId,
                sort: this.ServiceCommonData.sort,
                name: this.ServiceCommonData.name,
                picPath: this.imagePath,
                price: this.ServiceCommonData.price,
                unit: this.ServiceCommonData.unit,
                description: this.ServiceCommonData.description
            };
            const hsId = this.hsId;
            const ssId = this.ssId;
            this.$refs[ServiceCommonData].validate((valid) => {
                if(valid){
                    if(this.imagePath == ''){
                        this.$message.error('请上传图片!');
                        return false
                    }
                    if(this.ServiceCommonData.price == ''){
                        if(this.ServiceCommonData.unit != ''){
                            this.$message.error("请输入单价");
                            return false;
                        }
                    }else{
                        if(this.ServiceCommonData.unit == ''){
                            this.$message.error("请输入单位");
                            return false;
                        }
                    }
                    // console.log(params);
                    this.isSubmit = true;
                    this.$api.serviceCommonModify(params, hsId, ssId)
                        .then(response => {
                            // console.log(response);
                            const result = response.data; 
                            if(result.code == '0'){
                                this.$message.success('明细修改成功！');
                                const id = this.hsId;
                                this.$router.push({name: 'LonganHotelServiceBannerList', query: {id}});
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
            this.$router.push({name: 'LonganHotelServiceBannerList', query: {id}});
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
