<template>
    <div class="hoteladd">
        <p class="title">修改二维码</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="ID" prop="id">
                <el-input disabled v-model.trim="Commoditygai.id"></el-input>
            </el-form-item>
            <!-- <el-form-item label="酒店">
                <el-select
                    v-model="Commoditygai.hotelId"
                    filterable
                    remote
                    disabled
                    @change="selectHotel"
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="类型" prop="isVisual">
              <el-radio-group disabled v-model="Commoditygai.isVisual">
                <el-radio v-if="Commoditygai.isVisual=='0'"  :label="0">实体柜</el-radio>
                <el-radio v-if="Commoditygai.isVisual=='1'"  :label="1">虚拟码</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="进场配置">
                <el-select
                    v-model="Commoditygai.enterSettingId"
                    filterable
                    remote
                    placeholder="请选择">
                    <el-option
                        v-for="item in fictitiousdata"
                        :key="item.id"
                        :label="item.settingName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编码" prop="cabinetQrcode">
                <el-input disabled v-model.trim="Commoditygai.cabinetQrcode"></el-input>
            </el-form-item>
            <el-form-item label="绑定类型" prop="bindAreaFlag">
                <el-select v-model="Commoditygai.bindAreaFlag" @change="selectArea" placeholder="请选择">
                    <el-option 
                        v-for="item in siteList" 
                        :key="item.id" 
                        :label="item.name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="Commoditygai.bindAreaFlag != 0" prop="roomFloor">
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 1"><label class="required-icon">*</label> 楼层</span>
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 2"><label class="required-icon">*</label> 区域</span>
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 3">区域</span>
                <el-input v-model.trim="Commoditygai.roomFloor" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item v-if="Commoditygai.bindAreaFlag != 0" prop="roomCode">
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 1"><label class="required-icon">*</label> 房间号</span>
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 2"><label class="required-icon">*</label> 桌号</span>
                <span slot="label" v-if="Commoditygai.bindAreaFlag == 3">地点</span>
                <el-input v-if="Commoditygai.isVisual=='0'" v-model.trim="Commoditygai.roomCode" maxlength="10"></el-input>
                <el-input v-else v-model.trim="Commoditygai.roomCode" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="WiFi名称" prop="wifiSsid">
                <el-input maxlength="50" v-model.trim="Commoditygai.wifiSsid"></el-input>
            </el-form-item>
            <el-form-item label="WiFi密码" prop="wifiPassword">
                <el-input maxlength="50" v-model.trim="Commoditygai.wifiPassword"></el-input>
            </el-form-item>
            <el-form-item v-if="Commoditygai.isVisual=='0'" label="物联卡" prop="cabinetIot">
                <el-input disabled v-model.trim="Commoditygai.cabinetIot"></el-input>
            </el-form-item>
            <el-form-item v-if="Commoditygai.isVisual=='0'" label="不间断电源" prop="roomCode">
                <el-switch v-model="Commoditygai.isPowerFailure" :active-value="1" :inactive-value="0"  @change="updateStatus(Commoditygai.id, Commoditygai.roomCode)"></el-switch>
            </el-form-item>
            <el-form-item v-if="Commoditygai.isVisual=='1'" label="备注" prop="remark">
                <el-input type="textarea" maxlength="50" v-model.trim="Commoditygai.remark"></el-input>
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
    name: 'Cabinetchange',
    data(){
        return{
            authzData: '',
            query:'',
            Commoditygai: {},
            Cabinetid:'',   //柜子id
            loadingH: false,
            hotelList:[],  //酒店数据
            fictitiousdata:[],  //虚拟码子配置数据
            cabType:'',
            hotelId:'',
            siteList: [],   //绑定地点
            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店', trigger: 'change'},
                    // {min: 1, max: 32, message: '酒店名称请保持在32个字符以内', trigger: 'blur'}
                ],
                isVisual: [
                    {required: true, message: '请选择类型', trigger: 'change'},
                ],
                bindAreaFlag: [
                    {required: true, message: '请选择绑定类型', trigger: 'change'},
                ],
                enterSettingId: [
                    {required: true, message: '请选择进场配置', trigger: 'change'},
                ],
                // roomCode: [
                //     {required: true, message: '请填写房间号', trigger: 'blur'},
                //     {min: 1, max: 32, message: '房间号请保持在32个字符以内', trigger: 'blur'}
                // ],
                // roomFloor: [
                //     {required: true, message: '请填写酒店楼层', trigger: 'blur'},
                //     // {message: '酒店楼层请输入数字', trigger: 'blur',type:"number"},
                //     // {min: 1,max: 32, message: '酒店楼层请输入在32层以内', trigger: 'blur',type:"number"}
                // ],
            },
        }
    },
    created(){
        this.Cabinetid=this.$route.query.modifyid.id;
        this.hotelId=this.$route.query.modifyid.hotelId;
        this.cabType=this.$route.query.modifyid.cabType;

        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.query=this.$route.query.query
    },
    mounted(){
        // this.getHotelList()
        this.Getdata();
        // this.getCabinetConfig();
        this.basicDataItems();
    },
    methods: {
        //绑定地点 - 字典表
        basicDataItems(){
             const params = {
                key: 'BIND_AREA_FLAG',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.siteList = result.data.map(item => {
                            return{
                                id: parseInt(item.dictValue),
                                name: item.dictName
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
        //选择绑定地点
        selectArea(val){
            if(this.Commoditygai.isVisual == '0'){
                if(val == 0 || val == 2){
                    this.$message.warning("实体柜仅能选择房间、定点");
                    this.Commoditygai.bindAreaFlag = "";
                }
            }
            this.Commoditygai.roomFloor = "";
            this.Commoditygai.roomCode = "";
        },
        //确定-添加酒店
        submitForm(Commoditygai) {
            let that = this;
            let Cabinetid=that.Cabinetid;
            let params = {
                hotelId:that.Commoditygai.hotelId,
                isVisual:that.Commoditygai.isVisual,
                bindAreaFlag:that.Commoditygai.bindAreaFlag,
                roomFloor:that.Commoditygai.roomFloor,
                roomCode:that.Commoditygai.roomCode,
                cabinetQrcode:that.Commoditygai.cabinetQrcode,
                enterSettingId:that.Commoditygai.enterSettingId,
                wifiSsid:that.Commoditygai.wifiSsid,
                wifiPassword:that.Commoditygai.wifiPassword,
                lastUpdatedAt:"",
                lastUpdatedBy:"",
                isNeedRepair:0,
                visualSettingId:that.Commoditygai.visualSettingId,
            }
            if(this.Commoditygai.isVisual){
                params.remark = this.Commoditygai.remark
            }else{
                params.cabinetIot = this.Commoditygai.cabinetIot
                params.isPowerFailure = this.Commoditygai.isPowerFailure
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    if(that.Commoditygai.bindAreaFlag == 1){
                        if(that.Commoditygai.roomFloor == "" || that.Commoditygai.roomCode == ""){
                            this.$message.error("请输入楼层/房间号");
                            return false;
                        }
                    }
                    if(that.Commoditygai.bindAreaFlag == 2){
                        if(that.Commoditygai.roomFloor == "" || that.Commoditygai.roomCode == ""){
                            this.$message.error("请输入区域/桌号");
                            return false;
                        }
                    }
                    this.$api.CabinetUpdate(params,Cabinetid)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'Cabinetgl'});
                            }else{
                               that.$alert(response.data.msg,"警告",{
                                confirmButtonText: "确定"
                               })
                            }
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //是否断电
        updateStatus(){

        },
        //选择酒店
        selectHotel(){
          this.getCabinetConfig();
        },
        //取消
        resetForm(Commoditygai) {
            let query=this.query;
            this.$router.push({name:'Cabinetgl',query:{query}});
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


        //获取虚拟码子数据
        getCabinetConfig(){
            let that=this;
            // let Cabinetid=that.Cabinetid
            const params={
                hotelId:this.Commoditygai.hotelId,
                all: this.Commoditygai.hotelId?1:'',
                cabType: that.Commoditygai.cabinetQrcode.substr(0,2)
            };
            this.$api.getCabinetConfig(params).then(response => {
                 if(response.data.code==0){

                    that.fictitiousdata=response.data.data
                  }else{
                    that.$alert(response.data.msg,"警告",{
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

        //加载数据
        Getdata(){
          let that=this;
            let Cabinetid=that.Cabinetid
            let params="";
            this.$api.CabinetChange({params},Cabinetid).then(response => {
                 if(response.data.code==0){
                    that.Commoditygai=response.data.data
                    that.getCabinetConfig();
                  }else{
                    that.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                  }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
             })
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
        .termput{width: 80px;display: inline-block; margin-right: 10px;}
    }
    .required-icon{
        color: #ff3030;
    }
}

</style>

