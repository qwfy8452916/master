<template>
    <div class="hoteladd">
        <p class="title">修改柜子信息</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="酒店楼层" prop="roomFloor">
                <el-input maxlength="32" v-model.trim="Commoditygai.roomFloor"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="roomCode">
                <el-input disabled v-model.trim="Commoditygai.roomCode"></el-input>
            </el-form-item>
            <el-form-item label="柜子id" prop="cabinetCode">
                <el-input disabled v-model.trim="Commoditygai.cabinetCode"></el-input>
            </el-form-item>
            <el-form-item label="物联卡" prop="cabinetIot">
                <el-input disabled v-model.trim="Commoditygai.cabinetIot"></el-input>
            </el-form-item>
            <el-form-item label="物理编码" prop="cabinetQrcode">
                <el-input disabled v-model.trim="Commoditygai.cabinetQrcode"></el-input>
            </el-form-item>
            <el-form-item label="柜子类型" prop="isVisual">
              <el-radio-group v-model="Commoditygai.isVisual">
                <el-radio v-if="Commoditygai.isVisual=='0'"  :label="0">实体柜</el-radio>
                <el-radio v-if="Commoditygai.isVisual=='1'"  :label="1">虚拟柜</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="不间断电源" prop="isPowerFailure">
                <el-switch v-model="Commoditygai.isPowerFailure" :active-value="1" :inactive-value="0"  @change="updateStatus(Commoditygai.id, Commoditygai.roomCode)"></el-switch>
            </el-form-item>
            <el-form-item label="进场配置名称">
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
            <el-form-item label="WiFi名称" prop="wifiSsid">
                <el-input v-model.trim="Commoditygai.wifiSsid"></el-input>
            </el-form-item>
            <el-form-item label="WiFi密码" prop="wifiPassword">
                <el-input v-model.trim="Commoditygai.wifiPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzlist['F:BH_CAB_CABINETGLALTERSUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

// import $api from '@/request/api'

export default {
    name: 'Cabinetchange',
    data(){
        return{
            authzlist: {}, //权限数据
            Commoditygai: {},
            Cabinetid:'',   //柜子id
            hotelid:'',
            cabType:'',
            fictitiousdata:[],  //虚拟柜子配置数据
            rules: {
                roomCode: [
                    {required: true, message: '请填写房间号', trigger: 'blur'},
                    {min: 1, max: 32, message: '房间号请保持在32个字符以内', trigger: 'blur'}
                ],
                roomFloor: [
                    {required: true, message: '请填写酒店楼层', trigger: 'blur'},
                    // {message: '酒店楼层请输入数字', trigger: 'blur',type:"number"},
                    // {min: 1,max: 32, message: '酒店楼层请输入在32层以内', trigger: 'blur',type:"number"}
                ],
            },
        }
    },
    created() {
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelid = localStorage.getItem('hotelId');
        this.Cabinetid=this.$route.query.modifyid.id;
        this.cabType=this.$route.query.modifyid.cabType;
        this.Getdata();
        this.getCabinetConfig();
    },
    mounted(){

    },
    methods: {

        //确定-添加酒店
        submitForm(Commoditygai) {
            let that = this;
            let Cabinetid=that.Cabinetid;
            let params = {
                hotelId:this.hotelid,
                cabinetIot:that.Commoditygai.cabinetIot,
                cabinetQrcode:that.Commoditygai.cabinetQrcode,
                roomFloor:that.Commoditygai.roomFloor,
                roomCode:that.Commoditygai.roomCode,
                lastUpdatedAt:"",
                lastUpdatedBy:"",
                wifiSsid:that.Commoditygai.wifiSsid,
                wifiPassword:that.Commoditygai.wifiPassword,
                isNeedRepair:0,
                isVisual:that.Commoditygai.isVisual,
                isPowerFailure:that.Commoditygai.isPowerFailure,
                visualSettingId:that.Commoditygai.visualSettingId,
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
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
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'Cabinetgl'});
            // this.$refs[Commoditygai].resetFields();
        },

        //是否断电
        updateStatus(){

        },


        //获取虚拟柜子数据
        getCabinetConfig(){
            let that=this;
            let Cabinetid=that.Cabinetid
            const params={
                hotelId:this.hotelid,
                all:1,
                cabType: this.cabType,
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
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
    }
}

</style>

