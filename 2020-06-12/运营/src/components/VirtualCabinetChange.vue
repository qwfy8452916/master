<template>
    <div class="hoteladd">
        <p class="title">修改进场配置</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="柜子类型：" prop="cabTypeId">
                <el-select
                    :disabled="true"
                    v-model="Commoditygai.cabTypeId"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in cabTypeList"
                        :key="item.id"
                        :label="item.cabTypeName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="适用范围：">
                <el-select :disabled="true" v-model="isAll" placeholder="请选择适用范围">
                  <el-option :value="1" label="全局"></el-option>
                  <el-option :value="2" label="酒店"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店名称：" prop="hotelId">
                <el-select
                    v-model="Commoditygai.hotelId"
                    filterable
                    :disabled="true"
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change='getSelectedHotel'
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型默认配置：">
                <el-switch :disabled="true" v-model="isDefault"></el-switch>
            </el-form-item>
            <el-form-item label="进场配置名称：" prop="cabinetName">
                <el-input v-model.trim="Commoditygai.cabinetName"></el-input>
            </el-form-item>
            <el-form-item label="是否支持迷你吧：" prop="supportMinibar">
                <el-radio-group v-model="Commoditygai.supportMinibar">
                    <el-radio label="不支持" name="supportMinibar"></el-radio>
                    <el-radio label="显示" name="supportMinibar"></el-radio>
                    <el-radio label="显示+下单" name="supportMinibar"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持便利店：" prop="supportShop">
                <el-radio-group v-model="Commoditygai.supportShop">
                    <el-radio label="不支持" name="supportMinibar"></el-radio>
                    <el-radio label="显示" name="supportMinibar"></el-radio>
                    <el-radio label="显示+下单" name="supportMinibar"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持客房服务：" prop="supportService">
                <el-radio-group v-model="Commoditygai.supportService">
                    <el-radio label="不支持" name="supportMinibar"></el-radio>
                    <el-radio label="显示" name="supportMinibar"></el-radio>
                    <el-radio label="显示+下单" name="supportMinibar"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label-width="200" label="是否支持客房协议价：" prop="supportRoomBook">
                <el-radio-group v-model="Commoditygai.supportRoomBook">
                    <el-radio label="不支持" name="supportMinibar"></el-radio>
                    <el-radio label="显示+下单" name="supportMinibar"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="默认进场：" prop="commonEnterDeviList">
                <el-checkbox-group v-model="Commoditygai.commonEnterDeviList">
                    <el-checkbox v-for="item in deviData" :key="item.id" :label="item.dictValue">{{item.dictName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="分享进场：" prop="shareEnterDeviList">
                <el-checkbox-group v-model="Commoditygai.shareEnterDeviList">
                    <el-checkbox v-for="item in deviData" :key="item.id" :label="item.dictValue">{{item.dictName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="isAll != 1" label-width="200" label="支持默认开放功能区：" prop="availableFuncSupport">
                <el-switch v-model="Commoditygai.availableFuncSupport"></el-switch>
            </el-form-item>
            <el-form-item v-if="!Commoditygai.availableFuncSupport" label="功能区：">
                <div
                v-for="(item,index) in Commoditygai.areaList"
                :key="item.id"
                 class="oneArea">
                    <span style="margin-right:10px;">{{item.areaName}}</span>
                    <el-radio-group v-model="item.defaultValue">
                        <el-radio label="不支持" name="supportMinibar"></el-radio>
                        <el-radio label="显示" name="supportMinibar"></el-radio>
                        <el-radio label="显示+下单" name="supportMinibar"></el-radio>
                    </el-radio-group>
                    <el-form-item style="height:60px" v-if="item.defaultValue == '显示+下单'" :prop="'areaList.'+index+'.commonEnterDeviList'" label="默认进场：" :rules="[
                        { required: true, message: '请选择至少一个默认进场配置',trigger:'change'}]">
                        <el-checkbox-group v-model="item.commonEnterDeviList">
                            <el-checkbox v-for="item in deviData" :key="item.id" :label="item.dictValue">{{item.dictName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item style="height:60px" v-if="item.defaultValue == '显示+下单'" label="分享进场：" :prop="'areaList.'+index+'.shareEnterDeviList'" :rules="[
                        { required: true, message: '请选择至少一个分享进场配置',trigger:'change'}]">
                        <el-checkbox-group v-model="item.shareEnterDeviList">
                            <el-checkbox v-for="item in deviData" :key="item.id" :label="item.dictValue">{{item.dictName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div style="color:orange" v-if="!Commoditygai.hotelId">选择酒店后展示功能区!</div>
            </el-form-item>
            <el-form-item label="默认首页：" prop="defaultHomePage">
                <el-radio-group v-model="Commoditygai.defaultHomePage">
                    <el-radio style="line-height:35px;" :disabled="isMinibarSupported" label="迷你吧"></el-radio>
                    <el-radio style="line-height:35px;" :disabled="isServiceSupported" label="客房服务"></el-radio>
                    <el-radio style="line-height:35px;" :disabled="isRoomBookSupported" label="客房协议价"></el-radio>
                    <el-radio style="line-height:35px;" label="我的"></el-radio>
                    <el-radio
                    v-for="item in isAreaSupported"
                    :key="item.id"
                    style="line-height:35px;"
                    :disabled="item.isAble"
                      :label="item.areaName"
                       name="defaultHomePage"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_CAB_CAB_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'VirtualCabinetChange',
    data(){
        var validater1 = (rule,value,callback) => {
            if(this.isAll != 1){
                if(!value){
                    callback(new Error("请选择酒店"))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        return{
            authzData: '',
            Commoditygai: {
                hotelId: '',
                availableFuncSupport:true,
                cabinetName: '',
                cabTypeId:'',
                supportMinibar: '显示+下单',
                supportShop: '显示+下单',
                supportService: '显示+下单',
                supportRoomBook: '显示+下单',
                defaultHomePage: '迷你吧',
                commonEnterDeviList:[],
                shareEnterDeviList:[],
                areaList:[]
            },
            cabinetID:'',
            isDefault:false,
            deviData:[],
            isAll:'',
            loadingH: false,
            hotelList:[],  //酒店数据
            cabTypeList:[],  //酒店数据
            rules: {
                hotelId: [
                    {validator:validater1, trigger: 'change'},
                ],
                cabinetName: [
                    {required: true, message: '请填写进场配置名称', trigger: 'blur'},
                    {min: 1, max: 20, message: '进场配置名称请保持在20个字符以内', trigger: 'blur'}
                ],
                commonEnterDeviList: [
                    {required: true, message: '请选择至少一个默认进场配置', trigger: 'change'},
                ],
                shareEnterDeviList: [
                    {required: true, message: '请选择至少一个分享进场配置', trigger: 'change'},
                ],
            },
            defaultHomePageList:[
                {
                    name:'迷你吧',
                    isAble: false
                },
                {
                    name:'客房服务',
                    isAble: false
                },
                {
                    name:'客房协议价',
                    isAble: false
                },
                {
                    name:'我的',
                    isAble: false
                }]
        }
    },
    computed: {
        isMinibarSupported(){
            if(this.Commoditygai.supportMinibar == '不支持'){
                return true;
            }else{
                return false;
            }
        },
        isServiceSupported(){
            if(this.Commoditygai.supportService == '不支持'){
                return true;
            }else{
                return false;
            }
        },
        isRoomBookSupported(){
            if(this.Commoditygai.supportRoomBook == '不支持'){
                return true;
            }else{
                return false;
            }
        },
        isAreaSupported(){
            this.Commoditygai.areaList.forEach(item => {
                if(item.defaultValue == '不支持'){
                    item.isAble = true;
                }else{
                    item.isAble = false;
                }
            })
            return this.Commoditygai.areaList
        },
        defaultHomePage(){
            this.defaultHomePageList[0].isAble = this.isMinibarSupported;
            this.defaultHomePageList[1].isAble = this.isServiceSupported;
            this.defaultHomePageList[2].isAble = this.isRoomBookSupported;
            this.defaultHomePageList.forEach((item, index) => {
                if(index > 3){
                    this.defaultHomePageList[index].isAble = this.isAreaSupported[index-4].isAble
                }
            })
            return this.defaultHomePageList
        }
    },
    watch:{
        defaultHomePage(){
            this.defaultHomePageList.forEach(item => {
                if(item.isAble == true && this.Commoditygai.defaultHomePage == item.name){
                    for(var i=0;i<this.defaultHomePageList.length;i++){
                        if(this.defaultHomePageList[i].isAble == false){
                            this.Commoditygai.defaultHomePage = this.defaultHomePageList[i].name;
                            return false;
                        }
                    }
                }
            })
        }
    },
    created() {
        this.getDictData()
        this.getHotelList();
        this.getCabTypeList();
        this.cabinetID = this.$route.query.modifyid;
        this.getVirtualCabinet(this.$route.query.modifyid);
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        getDictData(){
            let params = {
                key: 'DEVI',
                orgId: 0
            }
            this.$api.basicDataItems(params).then(response => {
                if(response.data.code==0){
                    this.deviData = response.data.data
                    this.deviData.forEach(item => {
                        item.dictValue = parseInt(item.dictValue)
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
        getVirtualCabinet(CabinetId){
            this.$api.selOneenterCabConf(CabinetId).then(response => {
                let rule1 = {
                    0:'不支持',
                    1:'显示',
                    2:'显示+下单',
                }
                let rule2 = {
                    1:'迷你吧',
                    2:'客房服务',
                    4:'客房协议价',
                    5:'我的',
                }
                if(response.data.code==0){
                    let fillBackData = response.data.data;
                    this.Commoditygai.hotelId = fillBackData.hotelId?fillBackData.hotelId:'';
                    this.Commoditygai.commonEnterDeviList = fillBackData.commonEnterDeviList;
                    this.Commoditygai.shareEnterDeviList = fillBackData.shareEnterDeviList;
                    this.Commoditygai.cabTypeId = fillBackData.cabTypeId;
                    this.isDefault = fillBackData.isDefault;
                    this.isAll = fillBackData.hotelId?2:1;
                    this.Commoditygai.cabinetName = fillBackData.settingName;
                    this.Commoditygai.availableFuncSupport = fillBackData.availableFuncSupport?true:false;
                    this.Commoditygai.supportMinibar = rule1[fillBackData.minibar];
                    this.Commoditygai.supportRoomBook = rule1[fillBackData.roomBook];
                    this.Commoditygai.supportShop = rule1[fillBackData.converienceStore];
                    this.Commoditygai.areaList = fillBackData.cabEnterSettingFuncAreaDTOS.map(item=>{
                         this.defaultHomePageList.push({
                            name: item.funcAreaName,
                            isAble: true
                        })
                        return {
                            areaName: item.funcAreaName,
                            id: item.funcAreaId,
                            mainID: item.id,
                            defaultValue: rule1[item.flag],
                            shareEnterDeviList: item.shareEnterDeviList,
                            commonEnterDeviList: item.commonEnterDeviList
                        }
                    })
                    if(fillBackData.hotelId != 0){
                        fillBackData.cabEnterSettingFuncAreaDTOS2.forEach(item => {
                            this.defaultHomePageList.push({
                                name: item.funcAreaName,
                                isAble: true
                            })
                            this.Commoditygai.areaList.push({
                                areaName: item.funcAreaName,
                                id: item.funcAreaId,
                                mainID: item.id,
                                defaultValue: '不支持',
                                shareEnterDeviList: [],
                                commonEnterDeviList: []
                            })
                        })
                    }
                    
                    this.Commoditygai.supportService = rule1[fillBackData.roomService];
                    if(fillBackData.homePage != 3){
                        this.Commoditygai.defaultHomePage = rule2[fillBackData.homePage];
                    }else{
                        this.Commoditygai.defaultHomePage = fillBackData.cabEnterSettingFuncAreaDTOS.filter(item=>{
                            return item.funcAreaId == fillBackData.funcAreaId
                        })[0].funcAreaName;
                    }
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
        getSelectedHotel(item){
            const params = {
                hotelId: item,
            }
            this.$api.HotelFuncList(params).then(response => {
                if(response.data.code==0){
                    let recordsData = response.data.data.records;
                    let needsData = recordsData.filter(item => {
                        return item.id != 13 && item.id != 14
                    })
                    let fixDefaultHomePageList = [{
                        name:'迷你吧',
                        isAble: false
                    },{
                        name:'客房服务',
                        isAble: false
                    },{
                        name:'客房协议价',
                        isAble: false
                    },{
                        name:'我的',
                        isAble: false
                    }]
                    this.Commoditygai.areaList = needsData.map(item=>{
                        fixDefaultHomePageList.push({
                            name: item.funcCnName,
                            isAble: true
                        })
                        return {
                            areaName: item.funcCnName,
                            id: item.id,
                            defaultValue:'显示+下单'
                        }
                    })
                    this.defaultHomePageList = fixDefaultHomePageList
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
       
        //确定-柜子
        submitForm(Commoditygai) {
            let ruleSupport = {
                '不支持': 0,
                '显示': 1,
                '显示+下单':2
            }
            let ruleDefault = {
                '迷你吧': 1,
                '客房服务': 2,
                '客房协议价': 4,
                '我的': 5,
            }
             let params = {
                hotelId: this.Commoditygai.hotelId?this.Commoditygai.hotelId:0,
                shareEnterDeviList: this.Commoditygai.shareEnterDeviList,
                commonEnterDeviList: this.Commoditygai.commonEnterDeviList,
                settingName: this.Commoditygai.cabinetName,
                cabTypeId: this.Commoditygai.cabTypeId,
                converienceStore: ruleSupport[this.Commoditygai.supportShop],
                minibar: ruleSupport[this.Commoditygai.supportMinibar],
                roomService: ruleSupport[this.Commoditygai.supportService],
                roomBook: ruleSupport[this.Commoditygai.supportRoomBook],
                homePage: ruleDefault[this.Commoditygai.defaultHomePage],
                availableFuncSupport: this.Commoditygai.availableFuncSupport?1:0
            }
            if(!this.Commoditygai.availableFuncSupport){
                params.cabEnterSettingFuncAreaDTOS = this.Commoditygai.areaList.map(res=>{
                    return {
                        flag: ruleSupport[res.defaultValue],
                        funcAreaId: res.id,
                        shareEnterDeviList: res.shareEnterDeviList,
                        commonEnterDeviList: res.commonEnterDeviList
                    }
                })
            }
            if(ruleDefault[this.Commoditygai.defaultHomePage] == undefined){
                let areaID = this.Commoditygai.areaList.filter(res => res.areaName == this.Commoditygai.defaultHomePage);
                params.homePage = 3;
                params.funcAreaId = areaID[0].id;
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.changeenterCabConf(params,this.cabinetID)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'VirtualCabinetConfiguration'});
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
            this.$router.push({name:'VirtualCabinetConfiguration'});
        },
        //柜子列表
        getCabTypeList(hName){
            this.loadingH = true;
            const params = {
                pageNo:1,
                pageSize:50,
                cabTypeName:hName,
            };
            this.$api.CabinetType(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.cabTypeList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                cabTypeName: item.cabTypeName
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
        width: 50%;

        .btnwrap{margin-left: 35px;}
        .el-input,.el-select{width: 225px;}
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
        // .oneArea{
        //     display: flex;
        //     align-items: center;

        // }
    }
}

</style>

