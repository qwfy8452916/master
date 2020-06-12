<template>
    <div class="hoteladd">
        <p class="title">新增柜子</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    v-model="Commoditygai.hotelId"
                    :loading="loadingH"
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
            <el-form-item label="类型名称" prop="typeId">
                <el-select
                    v-model="Commoditygai.typeId"
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
            <el-form-item label="柜子数量：" prop="hotelCabCount">
                <el-input type="number" v-model.number="Commoditygai.hotelCabCount" placeholder="请输入柜子数量"></el-input>
            </el-form-item>
            <el-form-item label="抽中概率：" prop="hitRate">
                <el-input type="number" v-model.number="Commoditygai.hitRate" placeholder="请输入投中概率"></el-input>
            </el-form-item>
            <el-form-item label="首发时间：" prop="launchTime">
                <el-date-picker
                    v-model="Commoditygai.launchTime"
                    type="datetime"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    placeholder="选择日期时间"
                    :picker-options="pickerOptions0"
                    align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预计下次首发时间：" prop="nextLaunchTime">
                <el-date-picker
                    v-model="Commoditygai.nextLaunchTime"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="选择日期时间"
                    align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_FS_CAB_ADD_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'LaunchCabinetAdd',
    data(){
        return{
            authzData: '',
            Commoditygai: {
                hotelId: '',
                typeId: '',
                hotelCabCount:'',
                hitRate: '',
                launchTime: '',
                nextLaunchTime: ''
            },
            pickerOptions0: {
                disabledDate: (time) => {
                    // console.log(time)
                    if (this.Commoditygai.nextLaunchTime != "") {
                        return time.getTime() < Date.now() || time.getTime() < this.nextlaunchTimeC;
                    } else {
                        return time.getTime() < Date.now();
                    }
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    // console.log(this.Commoditygai.launchTime);
                    if (this.Commoditygai.launchTime != "") {
                        return time.getTime() < Date.now() || time.getTime() < this.launchTimeC;
                    } else {
                        return time.getTime() < Date.now();
                    }
                }
            },
            loadingH: false,
            hotelList:[],
            typeList:[],
            rules: {
                hotelId: [
                    {required: true, message: '请选择酒店名称', trigger: 'change'},
                ],
                typeId: [
                    {required: true, message: '请填写类型名称', trigger: 'change'},
                ],
                hotelCabCount: [
                    {required: true, message: '请填写柜子数量', trigger: 'blur'},
                    { pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数' }
                ],
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
    computed: {
        launchTimeC(){
            let data = new Date(this.Commoditygai.launchTime)
            return data.getTime(data)
        },
        nextlaunchTimeC(){
            let data = new Date(this.Commoditygai.nextLaunchTime)
            return data.getTime(data)
        },
    },
   
    created() {
        this.getHotelList();
        this.getCabList();
        this.getNextTime();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        getNextTime(){
            this.$api.getNextLaunchtime().then(response => {
                if(response.data.code == 0){
                    if(response.data.data.settingsValue!='1970-01-01 00:00:00'){
                        this.Commoditygai.launchTime = response.data.data.settingsValue
                    }
                }else{
                    this.$alert(response.data.data.msg,"警告",{
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
        //确定-添加柜子
        submitForm(Commoditygai) {
            let params = {
                hotelId: this.Commoditygai.hotelId,
                hotelCabCount: this.Commoditygai.hotelCabCount,
                typeId: this.Commoditygai.typeId,
                hitRate: this.Commoditygai.hitRate,
                launchTime: this.Commoditygai.launchTime,
                nextLaunchTime: this.Commoditygai.nextLaunchTime,
            }
            console.log(params);
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.FsCabinetaddNew(params)
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
        getHotelList(){
            this.$api.FsHotelAll({}).then(response => {
                if(response.data.code == 0){
                    this.hotelList = response.data.data.map(item => {
                        return {
                            label: item.hotelName,
                            id: item.id
                        }
                    })
                }else{
                    this.$alert(response.data.data.msg,"警告",{
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
        getCabList(){
            this.$api.FsCabinetTypeAll({}).then(response => {
                if(response.data.code == 0){
                    this.typeList = response.data.data.map(item => {
                        return {
                            label: item.typeName,
                            id: item.id
                        }
                    })
                }else{
                    this.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
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

