<template>
    <div class="hoteladd">
        <p class="title">修改酒店分销板块</p>
        <el-form :model="Commoditygai" ref="Commoditygai" label-width="140px" class="hotelform">
            <p style="color:#ccc;padding-left:50px;">基本信息</p>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'VirtualCabinetAdd',
    data(){
        
        return{
            Commoditygai:{}
        }
    },
    created() {
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
                    if(this.Commoditygai.modelId == -1){
                        this.modelList = [{id:-1,label:this.Commoditygai.modelName}]
                    }else{
                        this.getFunction()
                    }
                    this.imagList = [{
                        name:this.Commoditygai.posterImgPath,
                        url:this.Commoditygai.posterImgUrl
                    }]
                    this.imagList1 = [{
                        name:this.Commoditygai.shareImgCustomPath,
                        url:this.Commoditygai.shareImgCustomUrl
                    }]
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
        
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'LonganShareBonus'});
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