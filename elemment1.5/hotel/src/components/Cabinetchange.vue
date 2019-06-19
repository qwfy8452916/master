<template>
    <div class="hoteladd">
        <p class="title">修改柜子信息</p>
        <el-form :inline="true" :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="柜子id" prop="cabinetCode">
                <el-input disabled v-model.trim="Commoditygai.cabinetCode"></el-input>
            </el-form-item>
            <el-form-item label="物联卡" prop="cabinetIot">
                <el-input disabled v-model.trim="Commoditygai.cabinetIot"></el-input>
            </el-form-item>
            <el-form-item label="二维码id" prop="cabinetQrcode">
                <el-input disabled v-model.trim="Commoditygai.cabinetQrcode"></el-input>
            </el-form-item>
            <el-form-item label="酒店楼层" prop="roomFloor">
                <el-input maxlength="32" v-model.trim="Commoditygai.roomFloor"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="roomCode">
                <el-input v-model.trim="Commoditygai.roomCode"></el-input>
            </el-form-item>
            <el-form-item label="WiFi名称" prop="wifiSsid">
                <el-input v-model.trim="Commoditygai.wifiSsid"></el-input>
            </el-form-item>
            <el-form-item label="WiFi密码" prop="wifiPassword">
                <el-input v-model.trim="Commoditygai.wifiPassword"></el-input>
            </el-form-item>

            <el-form-item class="btnwrap">
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button type="primary" @click="submitForm('Commoditygai')">确定</el-button>
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
            Commoditygai: {},
            Cabinetid:'',   //柜子id

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
        this.Cabinetid=this.$route.params.modifyid;
        this.Getdata();
    },
    mounted(){

    },
    methods: {

        //确定-添加酒店
        submitForm(Commoditygai) {
            let that = this;
            let Cabinetid=that.Cabinetid;
            let params = {
                cabinetIot:that.Commoditygai.cabinetIot,
                cabinetQrcode:that.Commoditygai.cabinetQrcode,
                roomFloor:that.Commoditygai.roomFloor,
                roomCode:that.Commoditygai.roomCode,
                lastUpdatedAt:"",
                lastUpdatedBy:"",
                wifiSsid:that.Commoditygai.wifiSsid,
                wifiPassword:that.Commoditygai.wifiPassword,
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.CabinetUpdate(params,Cabinetid)
                        .then(response => {
                            if(response.data.code==0){
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
        .el-input{width: 225px;}
        .termput{width: 80px;display: inline-block;float: left;
            margin-right: 10px;}
    }
}

</style>

