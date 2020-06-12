<template>
    <div class="functionadd">
        <p class="title">修改功能区</p>
        <el-form :model="HotelFunctionData" :rules="rules" ref="HotelFunctionData" label-width="100px" class="functionform">
            <el-form-item>
                <span slot="label"><label class="titlebar">基础信息</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select 
                    v-model="HotelFunctionData.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="hotelChange"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="功能区名称" prop="funcCnName">
                <el-input  v-model.trim="HotelFunctionData.funcCnName"></el-input>
            </el-form-item>
            <el-form-item label="英文名称" prop="funcEnName">
                <el-input  v-model.trim="HotelFunctionData.funcEnName"></el-input>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="required-icon">*</label> 图标</span>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :file-list="funcLogoPath"
                    :on-success="(res, file, fileList, index) => {return handleSuccess(res, file, fileList, 1)}"
                    :on-remove="(file, fileList, index) => {return handleRemove(file, fileList, 1)}"
                    :on-exceed="(file, fileList, index) => {return handleExceed(file, fileList, 1)}"
                    :on-error="(file, fileList, index) => {return imgUploadError(file, fileList, 1)}"
                    :before-upload="(file, index) => {return beforeUpload(file, 1)}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,图片小于2M,最多支持1张图片</label> -->
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span slot="label"><label class="titlebar">功能区设置</label></span>
            </el-form-item>
            <hr class="line">
            <el-form-item label="配送方式" prop="delivWays">
                <!-- <el-checkbox-group :disabled="isAbleModify" v-model="HotelFunctionData.delivWays">
                    <el-checkbox label="0">现场送</el-checkbox>
                    <el-checkbox label="1">快递送</el-checkbox>
                </el-checkbox-group> -->
                <el-select :disabled="isAbleModify" v-model="HotelFunctionData.delivWays" multiple placeholder="请选择" @change="selectDelivType">
                    <el-option v-for="item in delivWayList" :key="item.id" :label="item.delivWayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isExpress" prop="lgcChooseWays">
                <span slot="label"><label class="required-icon">*</label> 物流选择</span>
                <el-checkbox-group v-model="HotelFunctionData.lgcChooseWays" @change="selectLgcWay">
                    <el-checkbox :label="'1'">由商家选择</el-checkbox>
                    <el-checkbox :label="'2'">外部物流</el-checkbox>
                </el-checkbox-group>
                <span v-if="isWlgs" class="lgcstyle">
                    <el-select v-model="HotelFunctionData.hotelLgcIds" multiple placeholder="请选择外部物流" style="width:92%;">
                        <el-option 
                            v-for="item in lgcList" 
                            :key="item.id" 
                            :label="item.lgcName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </el-form-item>
            <el-form-item v-if="isExpress" label="限时开放" prop="isTimeLimited">
                <el-switch v-model="HotelFunctionData.isTimeLimited"></el-switch>
            </el-form-item>
            <el-form-item v-if="isExpress && HotelFunctionData.isTimeLimited">
                <span slot="label"><label class="required-icon">*</label> 时间范围</span>
                <el-time-picker
                    is-range
                    v-model="HotelFunctionData.horizonTime"
                    :clearable='false'
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format='HH:mm:ss'
                    value-format='HH:mm:ss'
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            <el-form-item v-if="isExpress" label="限时送达" prop="isTimeLimitedDeliv">
                <el-switch v-model="HotelFunctionData.isTimeLimitedDeliv"></el-switch>
            </el-form-item>
            <el-form-item v-if="isExpress && HotelFunctionData.isTimeLimitedDeliv">
                <span slot="label"><label class="required-icon">*</label> 时间间隔</span>
                <el-input v-model.number="HotelFunctionData.delivLimitDuration" maxlength="9"></el-input> 分钟
            </el-form-item>
            <el-form-item v-if="isPickUp" label="自提点" prop="pickUpPointIds">
                <el-select v-model="HotelFunctionData.pickUpPointIds" multiple placeholder="请选择">
                    <el-option v-for="item in pickUpPointList" :key="item.id" :label="item.pickUpPointName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="配送服务费" prop="delivFee">
                <el-input  v-model.trim="HotelFunctionData.delivFee" maxlength="10"></el-input> 元/件
            </el-form-item>
            <el-form-item label="分成协议" prop="allocId">
                <el-select v-model="HotelFunctionData.allocId" placeholder="请选择">
                    <el-option
                        v-for="item in protocolList" 
                        :key="item.id" 
                        :label="item.allocName" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代码" prop="funcCode">
                <el-input  v-model.trim="HotelFunctionData.funcCode"></el-input>
            </el-form-item>
            <el-form-item label="默认开放" prop="isShow">
                <el-switch v-model="HotelFunctionData.isShow"></el-switch>
            </el-form-item>
             <el-form-item label="页面布局" prop="pageLayout">
                <el-select v-model="HotelFunctionData.pageLayout" placeholder="请选择">
                    <el-option v-for="item in pageLayoutList" :key="item.id" :label="item.pageLayoutName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input  v-model.number="HotelFunctionData.sort" maxlength="9"></el-input>
            </el-form-item>
            <BannerPicLinkParams :bannerType="bannerType" :isDisabled="isDisabled" :bannerList="bannerList" @bannerListEvent="bannerListEvent"></BannerPicLinkParams>
            <el-form-item>
                <el-button @click="resetForm">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_FUNCTION_EDIT_SUBMIT']" type="primary" :disabled="isSubmit" @click="submitForm('HotelFunctionData')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import BannerPicLinkParams from "@/components/BannerPicLinkParams"
export default {
    name: 'LonganHotelFunctionModify',
    components:{
        BannerPicLinkParams,
    },
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
            hfId: '',
            hotelList: [],
            loadingH: false,
            isPickUp: false,
            isAbleModify: true,
            delivWayList: [],
            pickUpPointList: [],
            protocolList: [],
            pageLayoutList: [],
            isExpress: false,
            isWlgs: false,
            lgcList: [],
            HotelFunctionData: {
                hotelId: '',
                funcCnName: '',
                funcEnName: '',
                delivWays: [],
                lgcChooseWays: ['1'],
                hotelLgcIds: [],
                isTimeLimited: false,
                horizonTime: ["00:00:00", "23:59:59"],
                // openStartTime: '',
                // openEndTime: '',
                isTimeLimitedDeliv: false,
                delivLimitDuration: 60,
                pickUpPointIds: [],
                delivFee: '',
                allocId: '',
                funcCode: '',
                pageLayout: '',
                sort: 0,
            },
            uploadUrl: this.$api.upload_file_url,
            headers: {},
            funcLogoPath: [],
            bannerList: [],
            isDisabled: false,
            bannerType: 1,
            isSubmit: false,
            rules: {
                hotelId: [
                    { required: true, message: '请选择酒店名称', trigger: 'change' }
                ],
                funcCnName: [
                    {required: true, message: '请输入功能区名称', trigger: 'blur'},
                    {min: 1, max: 10, message: '功能区名称请保持在10个字符以内', trigger: ['blur','change']}
                ],
                funcEnName: [
                    {min: 0, max: 50, message: '英文名称请保持在50个字符以内', trigger: ['blur','change']}
                ],
                // delivWays: [
                //     { type: 'array', required: true, message: '请至少选择一个配送方式', trigger: 'change' }
                // ],
                delivWays: [
                    {required: true, message: '请选择配送方式', trigger: 'change'}
                ],
                delivFee: [
                    {required: true, validator: validatePrice, trigger: ['blur','change']}
                ],
                allocId: [
                    { required: true, message: '请选择分成协议', trigger: 'change' }
                ],
                funcCode: [
                    {required: true, message: '请输入代码', trigger: 'blur'},
                    {min: 1, max: 10, message: '代码请保持在10个字符以内', trigger: ['blur','change']}
                ],
                pageLayout: [
                    { required: true, message: '请选择页面布局', trigger: 'change' }
                ],
                sort: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                delivLimitDuration: [
                    { type: 'number', message: '请输入数字', trigger: ['blur','change']}
                ],
                // openStartTime: [
                //     {required: true, message: '请选择起始时间', trigger: 'change'}
                // ],
                // openEndTime: [
                //     {required: true, message: '请选择结束时间', trigger: 'change'}
                // ]

                param: [
                    {required: true, message: '请输入参数', trigger: 'blur'},
                    {min: 1, max: 50, message: '参数请保持在50个字符以内', trigger: ['blur','change']}
                ]
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hfId = this.$route.query.id;
        this.getHotelList();
        this.getprotocolList();
        this.basicDataItems_dw();
        this.basicDataItems_pl();
        this.hotelFunctionDetail();
    },
    methods: {
        bannerListEvent(e){
            this.bannerList = e.fileList;
        },
        //获取指定酒店的全部外部物流
        getLgcList(hotelId){
            const params = {
                hotelId: hotelId
            };
            this.$api.getLgcList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.lgcList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    lgcName: item.lgcName
                                }
                            })
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
        //获取配送方式 - 字典表
        basicDataItems_dw(){
             const params = {
                key: 'DEVI',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.delivWayList = result.data.map(item => {
                                return{
                                    id: item.dictValue,
                                    delivWayName: item.dictName
                                }
                            })
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
        //获取页面布局 - 字典表
        basicDataItems_pl(){
             const params = {
                key: 'PAGE_LAYOUT',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.pageLayoutList = result.data.map(item => {
                                return{
                                    id: item.dictValue,
                                    pageLayoutName: item.dictName
                                }
                            })
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
        //酒店列表
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
        hotelChange(){
            if(this.HotelFunctionData.hotelId == ''){
                this.pickUpPointList = [];
                this.lgcList = [];
            }else{
                this.HotelFunctionData.pickUpPointIds = [];
                this.getHotelPickUpPointList(this.HotelFunctionData.hotelId);
                this.HotelFunctionData.hotelLgcIds = [];
                this.getLgcList(this.HotelFunctionData.hotelId);
            }
        },
        //选择配送方式
        selectDelivType(value){
            if(value.length != 0){
                // //店内送
                // let dnsIndex = this.HotelFunctionData.delivWays.indexOf("1");
                //快递送
                let kdIndex = this.HotelFunctionData.delivWays.indexOf("2");
                if(kdIndex != -1){
                    this.isExpress = true;
                    this.HotelFunctionData.lgcChooseWays = ['1'];
                }else{
                    this.isExpress = false;
                }
                // //迷你吧
                // let mnbIndex = this.HotelFunctionData.delivWays.indexOf("3");
                //自提区
                let ztIndex = this.HotelFunctionData.delivWays.indexOf("4");
                if(ztIndex != -1){
                    this.isPickUp = true;
                }else{
                    this.isPickUp = false;
                }
                // //电子商品
                // let zzIndex = this.HotelFunctionData.delivWays.indexOf("5");
                // if(zzIndex != -1){
                //     this.HotelFunctionData.delivWays.splice(zzIndex, 1);
                // }
            }else{
                this.isExpress = false;
                this.isPickUp = false;
            }
        },
        //选择物流
        selectLgcWay(value){
            // console.log(value);
            //外部物流
            let wbIndex = this.HotelFunctionData.lgcChooseWays.indexOf("2");
            if(wbIndex != -1){
                this.isWlgs = true;
                this.HotelFunctionData.isTimeLimited = true;
                this.HotelFunctionData.isTimeLimitedDeliv = true;
            }else{
                this.isWlgs = false;
            }
        },
        //获取酒店自提点列表
        getHotelPickUpPointList(value){
            const params = {
                hotelId: value
            };
            // console.log(params);
            this.$api.getHotelPickUpPointList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.pickUpPointList = result.data.map(item => {
                                return{
                                    id: item.id,
                                    pickUpPointName: item.pointName
                                }
                            })
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
        //获取分成协议列表
        getprotocolList(){
            const params = {
            };
            this.$api.getprotocolList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.protocolList = result.data.map(item => {
                            return{
                                allocName: item.allocName,
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
        //transform 转换
        transformFunc(val){
            if(val == 1){ return true }else{ return false }
        },
        //获取功能区详情
        hotelFunctionDetail(){
            const params = {};
            const id = this.hfId;
            this.$api.hotelFunctionDetail(params, id)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        result.data['horizonTime'] = [result.data.openStartTime, result.data.openEndTime],    
                        this.HotelFunctionData = result.data;
                        if(result.data.lgcChooseWays == null){
                            this.HotelFunctionData.lgcChooseWays = [];
                        }
                        this.HotelFunctionData.isTimeLimited = this.transformFunc(result.data.isTimeLimited);
                        this.HotelFunctionData.isTimeLimitedDeliv = this.transformFunc(result.data.isTimeLimitedDeliv);
                        this.HotelFunctionData.isShow = this.transformFunc(result.data.isShow);
                        this.funcLogoPath = [{
                            name: result.data.funcLogoPath,
                            url:  result.data.funcLogoUrl,
                            path: result.data.funcLogoPath
                        }];
                        this.bannerList = result.data.funcBannerImages.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath,
                                linkId: item.linkId,
                                isParam: item.isNeedParameter == 1?true:false,
                                paramsData: item.params,
                                paramsLD: []
                            }
                        });
                        //快递送
                        let kdIndex = result.data.delivWays.indexOf("2");
                        if(kdIndex != -1){
                            this.isExpress = true;
                        }else{
                            this.isExpress = false;
                        }
                        //外部物流
                        let wbIndex = result.data.lgcChooseWays.indexOf("2");
                        if(wbIndex != -1){
                            this.isWlgs = true;
                        }else{
                            this.isWlgs = false;
                        }
                        //自提区
                        let ztIndex = result.data.delivWays.indexOf("4");
                        if(ztIndex != -1){
                            this.isPickUp = true;
                        }else{
                            this.isPickUp = false;
                        }
                        this.isDisableDelivWay(result.data.hotelId, result.data.id);
                        this.getHotelPickUpPointList(result.data.hotelId);
                        this.getLgcList(result.data.hotelId);
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
        //检验配送方式是否可修改（检验功能区下是否有商品或者酒店商品有没有被功能区使用）
        isDisableDelivWay(hotelId, funcId){
            const params = {
                hotelId: hotelId,
                funcId: funcId,
            };
            this.$api.isDisableDelivWay(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data){
                            this.isAbleModify = false;
                        }else{
                            this.isAbleModify = true;
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
        //switch转换
        switchFunc(val){
            if(val){ return 1 }else{ return 0 }
        },
        //确定 - 修改
        submitForm(HotelFunctionData){
            const logoPathArr = JSON.stringify(this.funcLogoPath.map(item => item.path));
            const logoPathStr = logoPathArr.substr(2,logoPathArr.length-4);
            let bannerPath = this.bannerList.map(item => {
                return {
                    imagePath: item.path,
                    linkId: item.linkId,
                    linkParamList: item.paramsData
                }
            });
            if(this.HotelFunctionData.sort == ''){
                this.HotelFunctionData.sort = 0;
            }
            if(this.HotelFunctionData.horizonTime == null){
                this.HotelFunctionData.horizonTime = [];
            }
            if(this.HotelFunctionData.delivLimitDuration == ''){
                this.HotelFunctionData.delivLimitDuration = 60;
            }
            const id = this.hfId;
            this.$refs[HotelFunctionData].validate((valid) => {
                if (valid) {
                    if(this.funcLogoPath == ''){
                        this.$message.error('请上传图标!');
                        return false
                    }
                    if(this.bannerList.length == 0){
                        this.$message.error('请上传banner图!');
                        return false
                    }
                    for(let i=0; i<this.bannerList.length; i++){
                        for(let j=0; j<this.bannerList[i].paramsLD.length; j++){
                            if(this.bannerList[i].paramsData == null || this.bannerList[i].paramsData.length == 0){
                                if(this.bannerList[i].paramsLD[j].isNecessary == 1 && (this.bannerList[i].paramsLD[j].value == '' || this.bannerList[i].paramsLD[j].value == undefined)){
                                    this.$message.error('请填写链接参数的必填参数!');
                                    return false
                                }
                            }
                        }
                    }
                    //快递送
                    let kdIndex = this.HotelFunctionData.delivWays.indexOf("2");
                    if(kdIndex != -1){
                        if(this.HotelFunctionData.lgcChooseWays.length == 0){
                            this.$message.error('请选择物流!');
                            return false
                        }
                        //外部物流
                        let wbIndex = this.HotelFunctionData.lgcChooseWays.indexOf("2");
                        if(wbIndex != -1){
                            if(!this.HotelFunctionData.isTimeLimited || !this.HotelFunctionData.isTimeLimitedDeliv){
                                this.$message.error('请选择限时开放和限时送达!');
                                return false
                            }else{
                                if(this.HotelFunctionData.horizonTime.length == 0){
                                    this.$message.error('请选择时间范围!');
                                    return false
                                }
                                if(this.HotelFunctionData.delivLimitDuration == ''){
                                    this.$message.error('请输入时间间隔!');
                                    return false
                                }
                            }
                        }
                    }
                    //配送方式-电子券
                    let zzIndex = this.HotelFunctionData.delivWays.indexOf("5");
                    if(zzIndex != -1 && this.HotelFunctionData.pageLayout == 2){
                        this.$message.error('餐饮布局不支持电子券!');
                        return false
                    }
                    const params = {
                        hotelId: this.HotelFunctionData.hotelId,
                        funcCnName: this.HotelFunctionData.funcCnName,
                        funcEnName: this.HotelFunctionData.funcEnName,
                        funcLogoPath: logoPathStr,
                        delivWays: this.HotelFunctionData.delivWays,
                        lgcChooseWays: this.HotelFunctionData.lgcChooseWays,
                        hotelLgcIds: this.HotelFunctionData.hotelLgcIds,
                        isTimeLimited: this.switchFunc(this.HotelFunctionData.isTimeLimited),
                        openStartTime: this.HotelFunctionData.horizonTime[0],
                        openEndTime: this.HotelFunctionData.horizonTime[1],
                        isTimeLimitedDeliv: this.switchFunc(this.HotelFunctionData.isTimeLimitedDeliv),
                        delivLimitDuration: this.HotelFunctionData.delivLimitDuration,
                        pickUpPointIds: this.HotelFunctionData.pickUpPointIds,
                        delivFee: parseFloat(this.HotelFunctionData.delivFee).toFixed(2),
                        allocId: this.HotelFunctionData.allocId,
                        funcCode: this.HotelFunctionData.funcCode,
                        isShow: this.switchFunc(this.HotelFunctionData.isShow),
                        pageLayout: this.HotelFunctionData.pageLayout,
                        sort: this.HotelFunctionData.sort,
                        funcBannerImages: bannerPath,
                    };
                    // console.log(params);
                    // return
                    this.isSubmit = true;
                    this.$api.hotelFunctionModify(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('功能区修改成功！');
                                this.$router.push({name: 'LonganHotelFunctionList'});
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
            this.$router.push({name: 'LonganHotelFunctionList'});
        },
        //图片上传成功
        handleSuccess(res, file, fileList, index){
            if(index == 1){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data
                };
                this.funcLogoPath.push(image);
            }else if(index == 2){
                const image = {
                    name: file.name,
                    url: file.url,
                    path: res.data,
                    link: '',
                    id: ''
                };
                this.bannerList.push(image);
            }
        },
        //移除图片
        handleRemove(file, fileList, index){
            if(index == 1){
                this.funcLogoPath = fileList.map(item => {
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
                        path: item.path,
                        link: '',
                        id: ''
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
                this.$message.error('图标只能上传1张！');
            }else if(index == 2){
                this.$message.error('banner图不能超过5张！');
            }
            // console.log(file,fileList);
        },
        //图片上传失败
        imgUploadError(file,fileList, index){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        },
    },
}
</script>

<style scoped>
.el-input{
    width: 90%;
}
.el-select{
    width: 90%;
}
.el-upload-list{
    width: 90%;
}
</style>

<style lang="less" scoped>
.functionadd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .functionform{
        width: 45%;
        .required-icon{
            color: #F56C6C;
        }
        .titlebar{
            font-size: 16px;
            color: #444;
        }
        .line{
            width: 200%;
            border: 0px;
            border-bottom: 1px dashed #ccc;
            margin: -15px 0px 20px 0px;
        }
        .lgcstyle{
            position: absolute;
            top: 0px;
            left: 230px;
        }
        .bannerstyle{
            position: relative;
            .bannerlink{
                position: absolute;
                z-index: 10;
                top: 76px;
                left: 200px;
                .el-form-item{
                    height: 102px;
                    margin-bottom: 0px;
                }
            }
        }
    }
}
</style>
