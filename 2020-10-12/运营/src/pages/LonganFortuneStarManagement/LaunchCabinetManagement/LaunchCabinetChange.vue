<template>
    <div class="hoteladd">
        <p class="title">修改柜子</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    v-model="Commoditygai.hotelName"
                    :loading="loadingH"
                    :disabled="true"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型名称" prop="typeName">
                <el-select
                    v-model="Commoditygai.cabTypeName"
                    :disabled="true"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="柜子编号：" prop="hotelCabNum">
                <el-input type="number" :disabled="true" v-model.number="Commoditygai.hotelCabNum"></el-input>
            </el-form-item>
            <el-form-item label="抽中概率：" prop="hitRate">
                <el-input type="number" v-model.number="Commoditygai.hitRate" placeholder="请输入投中概率"></el-input>
            </el-form-item>
            <el-form-item label="首发时间：" prop="launchTime">
                <el-date-picker
                    v-model="Commoditygai.launchTime"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_CAB_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LaunchCabinetChange',
    data(){
        return{
            authzData: '',
            Commoditygai: {
                hotelId: '',
                typeName: '',
                hotelCabNum:'',
                launchTime: '',
                hitRate: '',
            },
            cabinetID:'',
            loadingH: false,
            hotelList:[],
            typeList:[],
            rules: {
                hitRate: [
                    {required: true, message: '请填写抽中概率', trigger: 'blur'},
                    {type:'number', min: 0, max: 999999, message: '投中概率请保持在0-999999之间', trigger: 'blur'}
                ],
                launchTime: [
                    {required: true, message: '请选择首发时间', trigger: 'change'},
                ]
            },
        }
    },
   
    created() {
        this.cabinetID = this.$route.query.modifyid;
        this.getFillbackData();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        getFillbackData(){
            let that = this;
            this.$api.FsCabinetSearchSingle(this.cabinetID).then(response => {
                if(response.data.code == 0){
                    that.Commoditygai = response.data.data;
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
        //确定-修改柜子
        submitForm(Commoditygai) {
            let params = {
                hotelId: this.Commoditygai.hotelId,
                typeName: this.Commoditygai.typeName,
                hotelCabNum: this.Commoditygai.hotelCabNum,
                hitRate: this.Commoditygai.hitRate,
                launchTime: this.Commoditygai.launchTime
            }
            console.log(params);
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsCabinetChange(this.cabinetID,params)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LaunchCabinetManagement'});
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
            this.$router.push({name:'LaunchCabinetManagement'});
        },
    },
}
</script>


<style lang="less" scoped>
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

