<template>
    <div class="hoteladd">
        <p class="title">修改酒店分销板块</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <p style="color:#ccc;padding-left:50px;">基本信息</p>
            <el-form-item label="酒店名称：" prop="hotelId">
                <el-select
                    v-model="Commoditygai.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @change="getSelectedHotel"
                    @focus="getHotelList()"
                    placeholder="请选择酒店">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="板块类型：" prop="modelType">
                <el-select @change="changeModel" v-model="Commoditygai.modelType" placeholder="请选择板块类型">
                    <el-option v-for="item in modelTypeList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="板块：" prop="modelId">
                <el-select @change="clearShareObj" :disabled="!ifSelect" v-model="Commoditygai.modelId" placeholder="请选择板块">
                    <el-option v-for="item in modelList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享类型：" prop="shareType">
                <el-select @change="clearShareObj" v-model="Commoditygai.shareType" placeholder="请选择分享类型">
                    <el-option v-for="item in shareTypeList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="进场配置：" prop="enterSetting">
                <el-select
                    v-model="Commoditygai.enterSettingId"
                    placeholder="请选择进场配置">
                    <el-option
                        v-for="item in enterSettingList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享对象：" v-if="Commoditygai.shareType == 2 || Commoditygai.shareType == 3" prop="shareObj">
                <el-select
                v-model="Commoditygai.shareObj" 
                multiple
                filterable
                remote
                reserve-keyword
                collapse-tags 
                placeholder="请选择分享对象"
                :remote-method="remoteMethod"
                @focus="getCouponsList()"
                :loading="loading">
                    <div v-if="Commoditygai.shareType == 2 && Commoditygai.modelType == 1">
                        <el-option v-for="item in batchData" :key="item.id" :value="item.id" :label="item.funcProdShowName"></el-option>
                    </div>
                    <div v-if="Commoditygai.shareType == 3 && Commoditygai.modelType == 1">
                        <el-option v-for="item in batchData" :key="item.categoryId" :value="item.categoryId" :label="item.categoryName"></el-option>
                    </div>
                    <div v-if="Commoditygai.modelType == 2">
                        <el-option v-for="item in batchData" :key="item.id" :value="item.id" :label="item.resourceName"></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">分享奖励</p>
            <el-form-item label="指定奖励：" prop="bonusSettingType">
                <el-radio-group v-model="Commoditygai.bonusSettingType">
                  <el-radio :label="0">无分享奖励</el-radio>
                  <el-radio :label="1">指定分享奖励</el-radio>
                  <el-radio v-if="Commoditygai.shareType != 1" :label="2">默认分享奖励</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="Commoditygai.bonusSettingType == 1" label="分享奖励来源：" prop="bonusAmountFrom">
                <el-select v-model="Commoditygai.bonusAmountFrom" placeholder="请选择分享类型">
                    <el-option v-for="item in bonusAmountList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="Commoditygai.bonusSettingType == 1" label="分享奖励类型" prop="bonusType">
                <el-radio-group @change="Commoditygai.firstBonus='';Commoditygai.secBounus='';" v-model="Commoditygai.bonusType">
                    <div style="margin-bottom:20px;margin-top:10px;">
                        <el-radio :label="1">比例</el-radio>
                        <el-form-item v-if="Commoditygai.bonusType == 1" style="height:60px;" label="计算基准" prop="bonusBaselineType">
                            <el-select v-model="Commoditygai.bonusBaselineType" placeholder="请选择计算基准">
                                <el-option v-for="item in BaselineList" :key="item.id" :value="item.id" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="Commoditygai.bonusType == 1" style="height:60px;" label="分享奖励" prop="firstBonus">
                            <el-input style="width:140px;" v-model.trim="Commoditygai.firstBonus"></el-input><span>&nbsp;%</span>
                        </el-form-item>
                        <el-form-item v-if="Commoditygai.bonusType == 1" style="height:60px;" label="管理奖励" prop="secBounus">
                            <el-input style="width:140px;" v-model.trim="Commoditygai.secBounus"></el-input><span>&nbsp;%</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-radio :label="2" style="margin-right:10px">固定金额/件商品</el-radio>
                        <el-popover
                            placement="top-start"
                            title="提示"
                            width="200"
                            trigger="hover"
                            content="如果订单商品可以分配的金额小于奖励金额，则奖励金额为可分配金额。">
                            <el-button style="border:none;padding:0;" slot="reference">
                                <i class="el-icon-warning-outline" style="font-size:16px;"></i>
                            </el-button>
                        </el-popover>
                        <el-form-item v-if="Commoditygai.bonusType == 2" style="height:60px;" label="分享奖励" prop="firstBonus">
                            <el-input style="width:140px;" v-model.trim="Commoditygai.firstBonus"></el-input><span>&nbsp;元</span>
                        </el-form-item>
                        <el-form-item v-if="Commoditygai.bonusType == 2" style="height:60px;" label="管理奖励" prop="secBounus">
                            <el-input style="width:140px;" v-model.trim="Commoditygai.secBounus"></el-input><span>&nbsp;元</span>
                        </el-form-item>
                    </div>
                </el-radio-group>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">转发信息</p>
            <el-form-item label="转发开关：" prop="shareFlag">
                <el-switch v-model="Commoditygai.shareFlag"></el-switch>
            </el-form-item>
            <el-form-item label="转发提示：" prop="shareMsg">
                <el-input :disabled="!Commoditygai.shareFlag" style="width:300px" maxlength="50" v-model="Commoditygai.shareMsg" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="转发预览：" v-if="Commoditygai.shareFlag" prop="shareImgType">
                <el-radio-group v-model="Commoditygai.shareImgType">
                  <el-radio :label="0">使用默认</el-radio>
                  <el-radio :label="1">自定义</el-radio>
                </el-radio-group>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    v-show="Commoditygai.shareImgType"
                    :limit="1"
                    :headers="headers"
                    :file-list="imagList1"
                    name="fileContent"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError"
                    :before-remove="beforeRemove">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <p style="color:#ccc;padding-left:50px;">海报信息</p>
            <el-form-item label="海报开关：" prop="posterFlag">
                <el-switch v-model="Commoditygai.posterFlag"></el-switch>
            </el-form-item>
            <el-form-item label="海报模板：" prop="posterImgPath">
                <el-upload
                    :disabled="!Commoditygai.posterFlag"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    :file-list="imagList"
                    name="fileContent"
                    :on-success="handleSuccess1"
                    :on-remove="handleRemove1"
                    :on-exceed="handleExceed1"
                    :on-error="imgUploadError1"
                    :before-remove="beforeRemove1">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="二维码：" prop="posterQr">
                <div>
                    <span>位置：</span>
                    <span>X轴：<el-input style="width:120px" v-model="Commoditygai.posterQrX" placeholder="请填写二维码X轴位置"></el-input></span>
                    <span>Y轴：<el-input style="width:120px" v-model="Commoditygai.posterQrY" placeholder="请填写二维码Y轴位置"></el-input></span>
                </div>
                <div>
                    <span>尺寸：<el-input style="width:120px" v-model="Commoditygai.posterQrPx" placeholder="请填写二维码尺寸"></el-input></span>
                </div>
                <el-checkbox v-model="Commoditygai.posterQrBtFlag" label="二维码区域覆盖图片背景"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'VirtualCabinetAdd',
    data(){
        var validator = (rule, value, callback) => {
            if(this.Commoditygai.bonusType == 1){
                if(value === ''){
                    callback(new Error('请填写比例'));
                }else if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
                    callback(new Error('请规范填写比例'));
                }else{
                    callback();
                }
            }else if(this.Commoditygai.bonusType == 2){
                if(value === ''){
                    callback(new Error('请填写金额'));
                }else if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
                    callback(new Error('请规范填写金额'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var posterRule = (rule, value, callback) => {
            if(!this.Commoditygai.posterQrX){
                callback(new Error('请填写二维码X轴位置'));
            }else if(!this.Commoditygai.posterQrY){
                callback(new Error('请填写二维码Y轴位置'));
            }else if(!this.Commoditygai.posterQrPx){
                callback(new Error('请填写二维码尺寸'));
            }else{
                callback();
            }
        }
        var bonusBaselineType = (rule, value, callback) => {
            if(this.Commoditygai.bonusType == 1 && !this.Commoditygai.bonusBaselineType){
                callback(new Error('请选择计算基准'));
            }else{
                callback();
            }
        }
        var shareImgType = (rule, value, callback) => {
            if(this.Commoditygai.shareImgType == 1 && !this.Commoditygai.shareImgCustomPath){
                callback(new Error('请上传自定义转发图片'));
            }else{
                callback();
            }
        }
        var posterImgPath = (rule, value, callback) => {
            if(this.Commoditygai.posterFlag && !this.Commoditygai.posterImgPath){
                callback(new Error('请上传海报模板'));
            }else{
                callback();
            }
        }
        return{
            authzData: '',
            Commoditygai: {
                hotelId: '',
                modelType: '',
                modelId:'',
                shareType:'',
                bonusType:'',
                bonusAmountFrom:'',
                bonusSettingType: 0,
                firstBonus:"",
                secBounus:"",
                shareFlag: true,
                shareMsg: '',
                bonusBaselineType:"",
                shareImgType: 0,
                shareImgCustomPath:"",
                posterQrX:'',
                posterQrY:'',
                shareObj:'',
                posterQrBtFlag:false,
                posterFlag:false,
                posterImgPath:'',
                posterQrPx:'',
                enterSettingId:''
            },
            uploadUrl: this.$api.upload_file_url,
            modelList:'',
            loading: false,
            BaselineList:'',
            shareGoodsList:'',
            imagList:[],
            imagList1:[],
            batchData:[],
            shareTypeList:[
                {
                    id:1,
                    label:'列表'
                },
                {
                    id:2,
                    label:'单项'
                },
                {
                    id:3,
                    label:'分类'
                },
            ],
            modelTypeList:[
                {
                    id:1,
                    label:'功能区'
                },
                {
                    id:2,
                    label:'客房协议价'
                },
                {
                    id:3,
                    label:'预售券'
                },
            ],
            bonusAmountList:"",
            loadingH: false,
            headers:'',
            modelID:'',
            hotelList:[],  //酒店数据
            enterSettingList:[],  //酒店数据
            rules: {
                hotelId: [{required: true, message: '请选择酒店', trigger: 'change'}],
                modelType: [{required: true, message: '请选择板块类型', trigger: 'change'}],
                modelId: [{required: true, message: '请选择板块', trigger: 'change'}],
                shareType: [ {required: true, message: '请选择分享类型', trigger: 'change'}],
                bonusAmountFrom: [{required: true, message: '请选择分享奖励来源', trigger: 'change'}],
                bonusType: [{required: true, message: '请选择分享奖励类型', trigger: 'change'}],
                shareObj: [{required: true, message: '请选择分享对象', trigger: 'change'}],
                posterQr: [{validator:posterRule,trigger:"blur"}],
                firstBonus: [{validator:validator,trigger:"blur"}],
                secBounus: [{validator:validator,trigger:"blur"}],
                bonusBaselineType: [{validator:bonusBaselineType,trigger:"blur"}],
                shareImgType: [{validator:shareImgType,trigger:"blur"}],
                posterImgPath: [{validator:posterImgPath,trigger:"blur"}],
            },
        }
    },
    computed:{
        ifSelect(){
            if(!(!this.Commoditygai.hotelId && this.Commoditygai.modelType == 1) && this.Commoditygai.modelType){
                return true
            }else{
                return false
            }
        }
    },
    created() {
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.modelID = this.$route.query.modifyid;
        this.getBaselineList()
        this.getHotelList()
        this.getbonusAmountList()
        this.getenterSettingList()
        this.getFillBackData()
    },
    methods: {
        //获取回填数据
        getFillBackData(){
            let that = this;
            this.$api.selHotelShareArea(this.modelID).then(response => {
                if(response.data.code == 0){
                    this.Commoditygai = response.data.data;
                    this.Commoditygai.shareFlag = response.data.data.shareFlag?true:false;
                    this.Commoditygai.posterQrBtFlag = response.data.data.posterQrBtFlag?true:false;
                    this.Commoditygai.posterFlag = response.data.data.posterFlag?true:false;
                    this.Commoditygai.bonusBaselineType = response.data.data.bonusBaselineType?response.data.data.bonusBaselineType:'';
                    if(this.Commoditygai.modelId == -1){
                        this.modelList = [{id:-1,label:this.Commoditygai.modelName}]
                    }else{
                        this.getFunction()
                    }
                    this.imagList = [{
                        name:this.Commoditygai.posterImgPath,
                        url:this.Commoditygai.posterImgUrl
                    }]
                    if(this.Commoditygai.shareImgCustomPath){
                        this.imagList1 = [{
                            name:this.Commoditygai.shareImgCustomPath,
                            url:this.Commoditygai.shareImgCustomUrl
                        }]
                    }
                    this.getCouponsList()
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        clearShareObj(){
            this.Commoditygai.shareObj = ''
            if(this.Commoditygai.shareType == 1){
                this.Commoditygai.bonusSettingType = 0;
            }
        },
        getenterSettingList(){
            let that=this;
            let params = {
                pageNo: 1,
                pageSize: 50,
            }
            this.$api.selenterCabConf({params}).then(response => {
                if(response.data.code == 0){
                    let recordsData = response.data.data.records;
                    this.enterSettingList = recordsData.map(item=>{
                        return {
                            label: item.settingName,
                            id: item.id,
                        }
                    })
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                } 
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        getBaselineList(){
            this.$api.basicDataItems({key:'SHARE_BONUS_BASE ',orgId: 0}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    this.BaselineList = recordsData.map(item=>{
                        return {
                            label: item.dictName,
                            id: parseInt(item.dictValue),
                        }
                    })
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        getCouponsList(){
            let that=this;
            if(this.Commoditygai.modelType == 1){
                let params={
                    hotelId: this.Commoditygai.hotelId,
                    funcId: this.Commoditygai.modelId,
                };
                if(this.Commoditygai.shareType == 2){
                    this.$api.getAllProduct({params}).then(response=>{
                        this.loading = false;
                        if(response.data.code=='0'){
                            this.batchData = response.data.data
                        }else{
                            this.$alert(response.data.msg,"警告",{
                                confirmButtonText:"确定"
                            })
                        }
                    }).catch(error=>{
                            that.$alert(error,"警告",{
                            confirmButtonText:"确定"
                        })
                    })
                }else if(this.Commoditygai.shareType == 3){
                    this.$api.getAllCatGoods({params}).then(response=>{
                        this.loading = false;
                        if(response.data.code=='0'){
                            this.batchData = response.data.data
                        }else{
                            this.$alert(response.data.msg,"警告",{
                                confirmButtonText:"确定"
                            })
                        }
                    }).catch(error=>{
                            that.$alert(error,"警告",{
                            confirmButtonText:"确定"
                        })
                    })
                }
            }else if(this.Commoditygai.modelType == 2){
                if(this.Commoditygai.shareType != 3){
                    let params={
                        hotelId: this.Commoditygai.hotelId,
                    };
                    this.$api.getAllroomInfo(params).then(response=>{
                        if(response.data.code=='0'){
                            this.batchData = response.data.data
                        }else{
                            this.$alert(response.data.msg,"警告",{
                                confirmButtonText:"确定"
                            })
                        }
                    }).catch(error=>{
                            that.$alert(error,"警告",{
                            confirmButtonText:"确定"
                        })
                    })
                }else{
                    this.batchData = []
                }
            }
        },
        //远程搜索
        remoteMethod(val){
            this.getCouponsList(val)
        },
        getbonusAmountList(){
            this.$api.basicDataItems({key:'SHARE_BONUS_FROM',orgId: 0}).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    this.bonusAmountList = recordsData.map(item=>{
                        return {
                            label: item.dictName,
                            id: parseInt(item.dictValue),
                        }
                    })
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        changeModel(){
            this.Commoditygai.modelId = ''
            this.Commoditygai.shareObj = ''
            if(this.Commoditygai.modelType){
                if(this.Commoditygai.modelType == 1){
                    if(this.Commoditygai.hotelId){
                        this.getSelectedHotel()
                    }
                }else if(this.Commoditygai.modelType == 2){
                    this.modelList = [{id:-1,label:"客房协议价"}]
                }else if(this.Commoditygai.modelType == 3){
                    this.modelList = [{id:-1,label:"预售券"}]
                }
            }
        },
        getSelectedHotel(){
            this.Commoditygai.shareObj = ''
            this.Commoditygai.modelId = ''
            if(this.Commoditygai.modelType == 1){
                this.getFunction()
            }
        },
        getFunction(){
            const params = {
                hotelId: this.Commoditygai.hotelId,
            }
            this.$api.getCouponFunctionList(params).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data;
                    let areaList = recordsData.map(item=>{
                        return {
                            label: item.funcCnName,
                            id: item.id,
                        }
                    })
                    this.modelList = areaList;
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //确定-添加板块
        submitForm(Commoditygai) {
            let params = {
                hotelId: this.Commoditygai.hotelId,
                modelType: this.Commoditygai.modelType,
                modelId:this.Commoditygai.modelId,
                shareType:this.Commoditygai.shareType,
                bonusSettingType: this.Commoditygai.bonusSettingType,
                shareFlag: this.Commoditygai.shareFlag?1:0,
                posterImgPath:this.Commoditygai.posterImgPath,
                posterQrX:this.Commoditygai.posterQrX,
                posterQrY:this.Commoditygai.posterQrY,
                posterQrBtFlag:this.Commoditygai.posterQrBtFlag?1:0,
                posterFlag:this.Commoditygai.posterFlag?1:0,
                posterQrPx:this.Commoditygai.posterQrPx,
            }
            if(params.shareFlag){
                params.shareMsg = this.Commoditygai.shareMsg
                params.shareImgType = this.Commoditygai.shareImgType
                if(params.shareImgType){
                    params.shareImgCustomPath = this.Commoditygai.shareImgCustomPath
                }
            }
            if(params.shareFlag){
                params.shareMsg = this.Commoditygai.shareMsg
            }
            if(params.posterFlag){
                params.posterImgPath = this.Commoditygai.posterImgPath
            }
            if(params.bonusSettingType == 1){
                params.bonusAmountFrom = this.Commoditygai.bonusAmountFrom
                params.bonusType = this.Commoditygai.bonusType
                params.bonusBaselineType = this.Commoditygai.bonusBaselineType
                params.firstBonus = this.Commoditygai.firstBonus
                params.secBounus = this.Commoditygai.secBounus
            }
            if(params.shareType != 1){
                params.shareObj = this.Commoditygai.shareObj
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.changeHotelShareArea(params,this.modelID)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LonganShareBonus'});
                            }else{
                               this.$alert(response.data.msg,"警告",{
                                    confirmButtonText: "确定"
                               })
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    return false;
                }
            });
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'LonganShareBonus'});
        },

        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                pageNo:1,
                hotelName: hName,
                pageSize:50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
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

        //删除确认
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //图片上传成功
        handleSuccess(res, file, fileList){
            this.Commoditygai.shareImgCustomPath = res.data
        },
        //移除图片
        handleRemove(file, fileList){
            this.Commoditygai.shareImgCustomPath = ''
        },
        //文件超出个数限制时
        handleExceed(file, fileList){
            this.$message.error('图片只能上传1张！')
        },
        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
        },

        //删除确认
        beforeRemove1(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //图片上传成功
        handleSuccess1(res, file, fileList){
            this.Commoditygai.posterImgPath = res.data
        },
        //移除图片
        handleRemove1(file, fileList){
            this.Commoditygai.posterImgPath = ''
        },
        //文件超出个数限制时
        handleExceed1(file, fileList){
            this.$message.error('图片只能上传1张！')
        },
        //图片上传失败
        imgUploadError1(file,fileList){
            this.$message.error('上传图片失败！');
        }

    },
}
</script>


<style lang="less" scoped>
.el-select{
    width: 32%;
  }
.hoteladd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 42%;
        .btnwrap{margin-left: 35px;}
        .el-input,.el-select{width: 225px;}
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
        .oneArea{
            display: flex;
            align-items: center;

        }
    }
}
</style>