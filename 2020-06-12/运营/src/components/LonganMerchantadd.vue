<template>
    <div class="LonganMerchantadd">
        <p class="title">新增入驻商</p>
        <el-form :model="Merchantadd" :rules="rules" ref="Merchantadd" label-width="160px" align=left class="Merchantform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基本信息&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="类型" prop="merchantType">
                <el-radio name="ticket" v-model="Merchantadd.merchantType" label="c">企业</el-radio>
                <el-radio name="ticket" v-model="Merchantadd.merchantType" label="p">个人</el-radio>
            </el-form-item>
            <el-form-item label="社会信用代码" prop="socialCreditCode" v-if="Merchantadd.merchantType=='c'">
                <el-input v-model.trim="Merchantadd.socialCreditCode"></el-input><!--  @blur="isnumber" -->
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDnumber" v-if="Merchantadd.merchantType=='p'">
                <el-input v-model.trim="Merchantadd.IDnumber"></el-input><!--  @blur="isnumber" -->
            </el-form-item>
            <el-form-item label="登录密码" prop="Merchanpwd">
                <el-input v-model="Merchantadd.Merchanpwd" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="入驻商名称" prop="Merchanname">
                <el-input v-model.trim="Merchantadd.Merchanname"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="MerchantContact">
                <el-input v-model.trim="Merchantadd.MerchantContact"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="MerchantContactPhone">
                <el-input v-model="Merchantadd.MerchantContactPhone"></el-input>
            </el-form-item>
            <!-- <el-form-item label="区域选择" prop="selectProvince">
                <el-select v-model="Merchantadd.selectProvince" placeholder="省级地区" @change="selectProvinceFun">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectCity">
                <el-select v-model="Merchantadd.selectCity" placeholder="市级地区" @change="selectCityFun">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="selectDistrict">
               <el-select v-model="Merchantadd.selectDistrict" placeholder="区级地区">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 区域选择</span>
                <el-select v-model="Merchantadd.selectProvince" placeholder="省级地区" @change="selectProvinceFun" style="width: 26%;">
                    <el-option v-for="item in province" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="Merchantadd.selectCity" placeholder="市级地区" @change="selectCityFun" style="width: 26%;">
                    <el-option v-for="item in city" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="Merchantadd.selectDistrict" placeholder="区级地区" style="width: 28%;">
                    <el-option v-for="item in area" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="MerchantlAddress">
                <el-input v-model.trim="Merchantadd.MerchantlAddress"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 供应区域</span>
                <el-select v-model="supplyProvice" placeholder="省级地区" @change="selectSupplyProvice" class="supplyselect">
                    <el-option v-for="item in province" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
                <el-select v-model="supplyCity" placeholder="市级地区" @change="selectSupplyCity" class="supplyselect">
                    <el-option v-for="item in cityList" :key="item.dictValue" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select><br/>
                <el-tag 
                    v-for="tag in tagsList" 
                    :key="tag.dictValue" 
                    closable
                    @close="tagClose(tag)">
                    {{tag.dictName}}
                </el-tag>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">开票设置&nbsp;&nbsp;</label></span>
            </el-form-item>
            <el-form-item label="商品销售发票" prop="isHprodTicket">
                <el-switch v-model="Merchantadd.isHprodTicket"></el-switch>
            </el-form-item>
            <el-form-item v-if="Merchantadd.isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 商品销售发票类型</span>
                <el-checkbox-group v-model="Merchantadd.invoiceType">
                    <el-checkbox label="1">电子普通发票</el-checkbox>
                    <el-checkbox label="2">增值税专用发票</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="Merchantadd.isHprodTicket">
                <span slot="label"><label class="required-icon">*</label> 商品销售发票税率</span>
                <el-input v-model.trim="Merchantadd.invoiceTaxRate" maxlength="10"></el-input> %
                <!-- <el-select
                    v-model="Merchantadd.invoiceTaxRate" 
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
                </el-select> -->
            </el-form-item>
            <el-form-item>
                <el-button @click="backbtn">取消</el-button>
                <el-button v-if="authzData['F:BO_MER_MER_ADD_SUBMIT']" type="primary" :disabled="isSubmit" @click="subbtn('Merchantadd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LonganMerchantadd',
    data(){
        var validateCMPhone = (rule,value,callback) => {
            if(!mPhoneReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        // var mPhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        var mPhoneReg = /^1\d{10}$/
        return {
            authzData: '',
            oprId: '',
            // orgId: '',
            province: [],
            city: [],
            area: [],
            invoiceRateList: [],
            loadingR: false,
            supplyProvice: '',
            supplyCity: '',
            cityList: [],
            tagsList: [],
            isSubmit: false,
            Merchantadd: {
                merchantType: 'c',//类型
                socialCreditCode: '',//社会信用代码
                IDnumber: '',//身份证号码
                Merchanpwd: '123456',//初始密码
                Merchanname: '',//入驻商名称
                MerchantContact: '',//联系人
                MerchantContactPhone: '',//手机号
                selectProvince: '',//省
                selectCity: '',//市
                selectDistrict: '',//区
                MerchantlAddress: '',//详细地址
                isHprodTicket: true,
                invoiceType: [],
                invoiceTaxRate: ''
            },
            rules: {
                merchantType: [
                    {required: true, message: '请选择入驻商类型', trigger: ['blur','change']}
                ],
                socialCreditCode: [
                    {required: true, message: '请填写社会信用代码', trigger: 'blur'},
                    {min: 1, max: 30, message: '社会信用代码请保持在30个字符以内', trigger: ['blur','change']}
                ],
                IDnumber: [
                    {required: true, message: '请填写身份证号码', trigger: 'blur'},
                    {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '证件号码格式有误！',
                        trigger: ['blur','change']
                    }
                ],
                Merchanpwd: [
                    {required: true, message: '请填写登录密码', trigger: ['blur','change']}
                ],
                Merchanname: [
                    {required: true, message: '请填写入驻商名称', trigger: 'blur'},
                    {min: 1, max: 50, message: '驻商名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                MerchantContact: [
                    {required: true, message: '请填写联系人', trigger: 'blur'},
                    {min: 1, max: 10, message: '联系人请保持在10个字符以内', trigger: ['blur','change']}
                ],
                MerchantContactPhone: [
                    {required: true, validator: validateCMPhone, trigger: ['blur','change']}
                ],
                MerchantlAddress: [
                    {required: true, message: '请填写入驻商地址', trigger: 'blur'},
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
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        this.oprId = localStorage.getItem('oprId');
        this.provinceGet();
        // this.getInvoiceRateList();
    },
    methods: {
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
                parentValue: this.Merchantadd.selectProvince
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
                parentValue: this.Merchantadd.selectCity
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
            this.Merchantadd.selectCity = '';
            this.Merchantadd.selectDistrict = '';
            this.cityGet();
        },
        //选择-市
        selectCityFun(){
            this.Merchantadd.selectDistrict = '';
            this.areaGet();
        },
        //供应区域-获取市
        getSupplyCity(){
            const params = {
                key: 'CITY',
                orgId: '0',
                parentKey: 'PROVINCE',
                parentValue: this.supplyProvice
            }
            this.$api.provinceGet(params)
                .then(response => {
                    // console.log(response);
                    if(response.data.code == 0){
                        // this.cityList = response.data.data;
                        let cityData = response.data.data;
                        if(this.tagsList.length != 0){
                            for(let i = 0; i < cityData.length; i ++){
                                for(let j = 0; j < this.tagsList.length; j++){
                                    if(cityData.length != 0){
                                        if(cityData[i].dictValue == this.tagsList[j].dictValue){
                                            cityData.splice(i, 1);
                                        }
                                    }
                                }
                            }
                            this.cityList = cityData;
                        }else{
                            this.cityList = cityData;
                        }
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
        //供应区域-选择省
        selectSupplyProvice(){
            this.supplyCity = '';
            this.getSupplyCity();
        },
        //供应区域-选择市-添加供应区域
        selectSupplyCity(value){
            // console.log(value);
            const cityN = this.cityList.find(item => item.dictValue === value);
            // console.log(cityN);
            this.tagsList.push(cityN);
            this.cityList.splice(this.cityList.indexOf(cityN), 1);
            this.supplyCity = '';
        },
        //取消添加的市场分类
        tagClose(tag){
            // console.log(tag);
            this.tagsList.splice(this.tagsList.indexOf(tag), 1);
            if(tag.dictParentValue == this.supplyProvice){
                this.cityList.push(tag);
            }
        },
        //取消
        backbtn(){
            this.$router.push({name:'LonganMerchant'});
        },
        //确定
        subbtn(Merchantadd){
            let supplyAreaList = this.tagsList.map(item => {
                return item.dictValue
            });
            let isInvoiceFlag;
            if(this.Merchantadd.isHprodTicket){isInvoiceFlag = 1;}else{isInvoiceFlag = 0;}
            this.$refs[Merchantadd].validate((valid) => {
                if (valid) {
                    if(this.Merchantadd.selectProvince == '' || this.Merchantadd.selectCity == '' || this.Merchantadd.selectDistrict == ''){
                        this.$message.error('请选择入驻商区域');
                        return false
                    }
                    let invoiceRateType;
                    if(this.Merchantadd.invoiceTaxRate == ''){
                        invoiceRateType = '';
                    }else{
                        invoiceRateType = parseFloat(this.Merchantadd.invoiceTaxRate).toFixed(2);
                    }
                    if(supplyAreaList.length == 0){
                        this.$message.error('请选择供应区域!');
                        return false
                    }
                    if(this.Merchantadd.isHprodTicket){
                        if(this.Merchantadd.invoiceType.length == '0'){
                            this.$message.error('请选择商品销售发票类型!');
                            return false
                        }
                        // if(this.Merchantadd.invoiceTaxRate == ''){
                        //     this.$message.error('请选择商品销售发票税率!');
                        //     return false
                        // }
                        if(this.Merchantadd.invoiceTaxRate == '' || this.Merchantadd.invoiceTaxRate == undefined){
                            this.$message.error('请输入商品销售发票税率!');
                            return false
                        }
                        if(this.Merchantadd.invoiceTaxRate > 100 || this.Merchantadd.invoiceTaxRate < 0){
                            this.$message.error('商品销售发票税率输入有误！');
                            return false
                        }
                        let hprodrateReg = /^\d+(\.\d+)?$/;
                        if(!hprodrateReg.test(this.Merchantadd.invoiceTaxRate)){
                            this.$message.error('商品销售发票税率输入有误！');
                            return false
                        }
                    }
                    let params = {
                        // encryptedOprOrgId: this.orgId,
                        orgAs: 2,
                        merchantType: this.Merchantadd.merchantType,//类型
                        merchantUscc:  this.Merchantadd.socialCreditCode,//社会信用代码
                        merchantIdno:  this.Merchantadd.IDnumber,//身份证号码
                        merchantPassword:  this.Merchantadd.Merchanpwd,//初始密码
                        merchantName:  this.Merchantadd.Merchanname,//入驻商名称
                        merchantContact:  this.Merchantadd.MerchantContact,//联系人
                        merchantContactPhone:  this.Merchantadd.MerchantContactPhone,//手机号
                        merchantProvince:  this.Merchantadd.selectProvince,//省
                        merchantCity:  this.Merchantadd.selectCity,//市
                        merchantArea:  this.Merchantadd.selectDistrict,//区
                        merchantAddress:  this.Merchantadd.MerchantlAddress,//详细地址
                        supplyArea: JSON.stringify(supplyAreaList),   //供应区域
                        invoiceFlag: isInvoiceFlag,   //是否支持开票
                        invoiceStyle: JSON.stringify(this.Merchantadd.invoiceType),   //商品销售发票类型
                        invoiceTaxRate: invoiceRateType,   //发票税率
                    }
                    this.$api.addmerchant(params).then(response => {
                        const result = response.data;
                        if(result.code == 0){
                            if(result.data){
                                this.$message.success("新增入驻商成功！");
                                this.$router.push({name:'LonganMerchant'});
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
        //社会信用代码/身份证号码是否存在
        isnumber(){
            if(this.Merchantadd.merchantType == 'c'){
                const params = {
                    idNo: this.Merchantadd.socialCreditCode,
                    idType: this.Merchantadd.merchantType
                };
                const msg = '社会信用代码已存在！';
                this.isnumbersub(this.Merchantadd.socialCreditCode,params,msg);
            }else{
                const params = {
                    idNo: this.Merchantadd.IDnumber,
                    idType: this.Merchantadd.merchantType
                };
                const msg = '身份证号码已存在！';
                this.isnumbersub(this.Merchantadd.IDnumber,params,msg);
            }
        },
        isnumbersub(num,params,msg){
            if(num){
                this.$api.isnumber(params).then(response => {
                    const result = response.data;
                    if(result.code == '0' ){
                        if(!result.data){
                            this.isSubmit = false;
                            this.isAccount(this.Merchantadd.socialCreditCode);
                        }else{
                            this.$message.error(msg);
                            this.isSubmit = true;
                        }
                    }else{
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    }
                }).catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
            }
        },
        //账号是否存在
        isAccount(idaccount){
            if(idaccount){
                 const params = {
                    account: idaccount
                };
                this.$api.isAccount(params)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0' ){
                            if(result.data){
                                this.isSubmit = false;
                            }else{
                                this.$message.error('账号已存在！');
                                this.isSubmit = true;
                            }
                        }else{
                            this.$message.error(result.msg);
                            this.isSubmit = true;
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
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
.el-tag{
    margin-right: 5px;
}
</style>

<style lang="less" scoped>
.LonganMerchantadd{
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
        .supplyselect{
            width: 43%;
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
