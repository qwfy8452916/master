<template>
    <div class="LonganOperator">
        <p class="title">信息维护</p>
        <el-form :model="Operator" :rules="rules" ref="Operator" label-width="160px" align=left class="Merchantform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基本信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="统一社会信用代码">
                <el-input v-model="Operator.oprUscc" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="oprName">
                <el-input v-model.trim="Operator.oprName"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="oprContactName">
                <el-input v-model.trim="Operator.oprContactName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="oprContactPhone">
                <el-input v-model="Operator.oprContactPhone"></el-input>
            </el-form-item>
            <!-- <el-form-item label="区域选择" prop="selectProvince">
                <el-select v-model="Operator.selectProvince" placeholder="省级地区" @change="selectProvinceFun">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectCity">
                <el-select v-model="Operator.selectCity" placeholder="市级地区" @change="selectCityFun">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectDistrict">
               <el-select v-model="Operator.selectDistrict" placeholder="区级地区" @change="selectArea">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 区域选择</span>
                <el-select v-model="Operator.selectProvince" placeholder="省级地区" @change="selectProvinceFun" style="width: 26%;">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="Operator.selectCity" placeholder="市级地区" @change="selectCityFun" style="width: 26%;">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="Operator.selectDistrict" placeholder="区级地区" @change="selectArea" style="width: 28%;">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="oprAddress">
                <el-input v-model.trim="Operator.oprAddress"></el-input>
            </el-form-item>
             <el-form-item label="客房服务" prop="hotelService">
                <el-switch v-model="isService"></el-switch>
            </el-form-item>
            <el-form-item label="酒店商城配送" prop="oprMallSup">
                <el-radio-group v-model="Operator.oprMallSup">
                    <el-radio :label="1">支持</el-radio>
                    <el-radio :label="0">不支持</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="Operator.oprMallSup == '1'">
                <span slot="label"><label class="required-icon">*</label> 配送方式</span>
                <el-checkbox-group v-model="oprDistribution">
                    <el-checkbox label="1">客服配送</el-checkbox>
                    <el-checkbox label="2">快递配送</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="hotelBanner">
                <span slot="label"><label class="required-icon">*</label>上传banner图</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="10"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :file-list="bannerList"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    >
                    <!-- :on-preview="handlePreview"
                    :before-upload="beforeUpload" -->
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,</label>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">开票设置&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="是否显示房费发票提醒" prop="oprInvoiceSup">
                <!-- <span class="ticketlabel"><label class="required-icon">*</label> 是否支持开具含商品金额的发票</span> -->
                <!-- <span class="ticketlabel">是否显示房费发票提醒</span> -->
                <el-radio name="ticket" v-model="Operator.oprInvoiceSup" :label="1">是</el-radio>
                <el-radio name="ticket" v-model="Operator.oprInvoiceSup" :label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="商品销售发票" prop="isHprodTicket">
                <el-switch v-model="isHprodTicket"></el-switch>
            </el-form-item>
            <el-form-item v-if="isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 发票方式</span>
                <el-checkbox-group v-model="invoiceType">
                    <el-checkbox label="1">电子普通发票</el-checkbox>
                    <el-checkbox label="2">增值税专用发票</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 商品销售发票税率</span>
                <el-select
                    v-model="Operator.invoiceTaxRate" 
                    filterable
                    remote
                    :remote-method="remoteInvoiceRate"
                    :loading="loadingR"
                    @focus="getInvoiceRateList()"
                    placeholder="请选择">
                    <el-option 
                        v-for="item in invoiceRateList" 
                        :key="item.id" 
                        :label="item.taxRateName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="authzData['F:BO_OPR_OPRINFO_SUBMIT']">
                <el-button type="primary" :disabled="isSubmit" @click="subbtn('Operator')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganOperator',
    data(){
        var validateCMPhone = (rule,value,callback) => {
            if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        var mPhoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/
        return {
            authzData: '',
            oprId: '',
            // orgId: '',
            Operatorid: '',
            uploadUrl: this.$api.upload_file_url,
            bannerList: [],
            bannerAddList: [],
            bannerDeleteList: [],
            province: [],
            city: [],
            area: [],
            isSubmit: false,
            isService: '',
            oprDistribution: [],//配送方式
            invoiceRateList: [],
            loadingR: false,
            Operator: {
                oprUscc: '',//运营商统一社会信用代码
                oprName: '',//运营商名称
                oprContactName: '',//运营商联系人称呼
                oprContactPhone: '',//运营商联系人电话
                oprAddress: '',//运营商地址
                selectProvince: '',//省
                oprProvince: '',//省
                selectCity: '',//市
                oprCity: '',//市
                oprArea: '',//区
                selectDistrict: '',//区
                oprMallSup: '1',//支持配送
                invoiceTaxRate: ''
            },
            isHprodTicket: false,
            invoiceType: [],
            rules: {
                oprName: [
                    {required: true, message: '请填写入公司名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '请保持在50个字符以内', trigger: ['blur','change']}
                ],
                oprContactName: [
                    {required: true, message: '请填写入联系人', trigger: 'blur'},
                    {min: 1, max: 10, message: '请保持在10个字符以内', trigger: ['blur','change']}
                ],
                oprContactPhone: [
                    {required: true, validator: validateCMPhone, trigger: 'blur'}
                ],
                oprAddress: [
                    {required: true, message: '请填写运营商地址', trigger: 'blur'},
                    {min: 1,max: 30, message: '请保持在30个字符以内', trigger: ['blur','change']}
                ],
                selectProvince: [
                    {required: true, message: '请选择省', trigger: ['blur','change']}
                ],
                selectCity: [
                    {required: true, message: '请选择市', trigger: ['blur','change']}
                ],
                selectDistrict: [
                    {required: true, message: '请选择区', trigger: ['blur','change']}
                ],
                oprMallSup: [
                    {required: true, message: '请选择酒店商城配送', trigger: ['blur','change']}
                ],
                // oprInvoiceSup: [
                //     {required: true, message: '请选择是否支持开具发票', trigger: 'blur'}
                // ]
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.oprId = localStorage.getItem('oprId');
        // this.provinceGet();
        this.getInvoiceRateList();
        this.getOperatorInfo();
    },
    methods: {
        getOperatorInfo(){
            const params = {
                // encryptedOprOrgId: this.orgId
                orgAs: 2
            };
            this.$api.getOperatorInfo(params).then(response => {
                const result = response.data;
                const resultdata = response.data.data;
                if(result.code == 0){
                    const imageList = resultdata.imageDTO;
                    this.Operator = result.data;
                    this.Operatorid = resultdata.id,
                    this.Operator.oprUscc = resultdata.oprUscc,//运营商统一社会信用代码
                    this.Operator.oprName = resultdata.oprName,//运营商名称
                    this.Operator.oprContactName = resultdata.oprContactName,//运营商联系人称呼
                    this.Operator.oprContactPhone = resultdata.oprContactPhone,//运营商联系人电话
                    this.Operator.selectProvince = resultdata.oprProvince,//省
                     this.Operator.selectCity = resultdata.oprCity;//市
                    this.Operator.selectDistrict = resultdata.oprArea;//区
                    this.Operator.oprProvince = resultdata.oprProvince;//省
                    this.Operator.oprCity = resultdata.oprCity;//市
                    this.Operator.oprArea = resultdata.oprArea;//区
                    // if(resultdata.city != null){
                    //     this.Operator.selectCity = resultdata.city.dictName;//市
                    // }
                    // if(resultdata.area != null){
                    //     this.Operator.selectDistrict = resultdata.area.dictName;//区
                    // }
                    this.Operator.oprAddress = resultdata.oprAddress;//运营商地址
                    //客房服务
                    if(result.data.oprRmsvcSup == 1){
                        this.isService = true;
                    }else{
                        this.isService = false;
                    }
                    //开票
                    // this.Operator.oprInvoiceSup = resultdata.oprInvoiceSup;
                    this.Operator.oprMallSup = resultdata.oprMallSup;//支持配送
                    if(resultdata.oprDistribution != ''){
                        this.oprDistribution = JSON.parse(resultdata.oprDistribution);//配送方式
                    }
                    this.bannerList = imageList.map((item, index) => {
                        return {
                            id: item.id,
                            name: item.imagePath,
                            url: item.url,
                            path: item.imagePath
                        }
                    });
                    if(resultdata.oprInvoiceSup == 1){
                        this.isHprodTicket = true;
                    }else{
                        this.isHprodTicket = false;
                    }
                    this.invoiceType = JSON.parse(resultdata.invoiceStyle);
                    this.Operator.invoiceTaxRate = resultdata.invoiceTaxRate;
                    this.provinceGet();
                    this.cityGet();
                    this.areaGet();
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                   })
                }
            }).catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //获取商品销售发票税率列表
        getInvoiceRateList(rateName){
            this.loadingR = true;
            const params = {
                oprId: this.oprId,
                taxRateName : rateName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.invoiceRateList(params)
                .then(response => {
                    this.loadingR = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.invoiceRateList = result.data.records.map(item => {
                            return{
                                taxRateName: item.taxRateName,
                                id: item.id
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
        remoteInvoiceRate(val){
            this.getInvoiceRateList(val);
        },
        //省
        provinceGet(){
            const params = {
                key: 'PROVINCE',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.province = response.data.data;
                    }else{
                        this.$message.error('获取省份失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //市
        cityGet(){
            const params = {
                key: 'CITY',
                orgId: '0',
                parentKey: 'PROVINCE',
                parentValue: this.Operator.selectProvince
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.city = response.data.data;
                    }else{
                        this.$message.error('获取城市失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //区
        areaGet(){
            const params = {
                key: 'AREA',
                orgId: '0',
                parentKey: 'CITY',
                parentValue: this.Operator.selectCity
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        this.area = response.data.data;
                    }else{
                        this.$message.error('获取区域失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //选择-省
        selectProvinceFun(){
            this.Operator.selectCity = '';
            this.Operator.selectDistrict = '';
            this.Operator.oprProvince = this.Operator.selectProvince;
            this.cityGet();
        },
        //选择-市
        selectCityFun(){
            this.Operator.selectDistrict = '';
            this.Operator.oprCity = this.Operator.selectCity;
            this.areaGet();
        },
        //选择-区
        selectArea(){
            this.Operator.oprArea = this.Operator.selectDistrict;
            this.areaGet();
        },
        //确定
        subbtn(Operator){
            const imageList = this.bannerList.map(item => item.path);
            const oprDistribution = this.oprDistribution;
            const oprMallSupval = this.Operator.oprMallSup;
            var isSupportService;
            if(this.isService){isSupportService = '1'}else{isSupportService = '0'}
            let isInvoiceFlag;
            if(this.isHprodTicket){isInvoiceFlag = 1;}else{isInvoiceFlag = 0;}
            this.$refs[Operator].validate((valid) => {
                if (valid) {
                    if(this.Operator.selectProvince == '' || this.Operator.selectCity == '' || this.Operator.selectDistrict == ''){
                        this.$message.error('请选择入驻商区域');
                        return false
                    }
                    if(oprMallSupval == "1" && oprDistribution.length == 0){
                        this.$message.error('请至少选择一个酒店配送方式!');
                        return false
                    }
                    if(imageList == ''){
                        this.$message.error('请上传酒店banner图!');
                        return false
                    }
                    if(this.isHprodTicket){
                        if(this.invoiceType.length == '0'){
                            this.$message.error('请选择发票方式!');
                            return false
                        }
                        if(this.Operator.invoiceTaxRate == ''){
                            this.$message.error('请选择商品销售发票税率!');
                            return false
                        }
                    }
                    let params = {
                        oprUscc: this.Operator.oprUscc,//社会信用代码
                        oprName: this.Operator.oprName,//运营商名称
                        oprContactName: this.Operator.oprContactName,//运营商联系人称呼
                        oprContactPhone: this.Operator.oprContactPhone,//运营商联系人电话
                        oprProvince:  this.Operator.oprProvince,//省
                        oprCity:  this.Operator.oprCity,//市
                        oprArea:  this.Operator.oprArea,//区
                        oprAddress:  this.Operator.oprAddress,//运营商地址
                        oprMallSup: this.Operator.oprMallSup,//支持配送
                        oprDistribution: JSON.stringify(this.oprDistribution),//配送方式
                        operatorAddImages: JSON.stringify(imageList),
                        oprRmsvcSup: isSupportService,
                        oprInvoiceSup: this.Operator.oprInvoiceSup,
                        oprInvoiceSup: isInvoiceFlag,   //是否支持开票
                        invoiceStyle: JSON.stringify(this.invoiceType),   //发票方式
                        invoiceTaxRate: this.Operator.invoiceTaxRate,   //发票税率
                    }
                    this.$api.changeOperator(this.Operatorid,params).then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            if(result.data){
                                this.$message.success("修改运营商信息成功！");
                                this.getOperatorInfo();
                            }
                        }else{
                            this.$alert(response.data.msg,"警告",{
                                confirmButtonText: "确定"
                        })
                        }
                    }).catch(error => {
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
        //图片上传成功
        handleSuccess(res, file, fileList) {
            // console.log(file);
            const image = {
                name: file.name,
                url: file.url,
                path: res.data
            }
            // this.bannerAddList.push(image);
            this.bannerList.push(image);
        },
        //移除图片
        handleRemove(file, fileList) {
            // console.log(fileList);
            this.bannerList = fileList.map((item, index)=>{
               return {
                  name: item.name,
                  url: item.url,
                  path: item.path
               }
            })
        },
        //文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('上传图片不能超过10张！');
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
.el-input{
    width: 87%;
}
.el-select{
    width: 87%;
}
.el-textarea{
    width: 87%;
}
</style>

<style lang="less" scoped>
.LonganOperator{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .Merchantform{
        width: 500px;
        .titlebar{
            font-weight: bold;
            font-size: 16px;
            color: #444;
        }
        .starclass{
            padding-top: 10px;
        }
        .imgskin{
            width: 100%;
            display: inline-block;
            margin: 15px 0px -22px 0px;
        }
        .mapposition{
            width: 100%;
            height: 100px;
            background: #9f9;
        }
        .ticketlabel{
            margin: 0px 12px 0px -84px;
        }
        .required-icon{
            color: #ff3030;
        }
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }
    }
}
</style>
