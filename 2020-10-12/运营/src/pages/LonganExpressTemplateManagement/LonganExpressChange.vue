<template>
    <div class="expressAdd">
        <p class="title">修改运费模板</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="模板名称：" prop="modelName">
                <el-input v-model="Commoditygai.modelName" maxlength="15" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="地址：" prop="provinces">
                <el-cascader
                :disabled="true"
                 @change='getdata'
                  :options="options"
                   v-model="Commoditygai.provinces"
                    clearable></el-cascader>
            </el-form-item> -->
            <el-form-item label="是否包邮：">
                <el-radio-group v-model="ifFree">
                    <el-radio :label="0">自定义运费</el-radio>
                    <el-radio :label="1">卖家承担运费</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="计价方式：" v-show="!ifFree" prop="pricingMode">
                <el-radio-group v-model="Commoditygai.pricingMode">
                    <el-radio :label="1">按件数</el-radio>
                    <el-radio :label="2" :disabled="true">按重量</el-radio>
                    <el-radio :label="3" :disabled="true">按体积</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="运费设置：" v-show="!ifFree">
                <div class="expressFee">
                    <div class="defaultFee">默认运费
                        <el-input v-model="Commoditygai.firstFeeCount"></el-input>件内
                        <el-input v-model="Commoditygai.firstFee"></el-input>元，每增加
                        <el-input v-model="Commoditygai.moreFeeCount"></el-input>件，增加运费
                        <el-input v-model="Commoditygai.moreFee"></el-input>元
                    </div>
                    <el-table class="feeTable" :data="CabinetList" border style="width:100%;" >
                        <el-table-column fixed label="运送到" align=center>
                            <template slot-scope="scope">
                                <span>{{scope.row.showData?scope.row.showData:'未添加地区'}}</span>
                                <el-button type="text" size="medium" @click="editRegion(scope.$index,1)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="首件数（件）" align=center>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.firstFeeCount"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="首费（元）" align=center>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.firstFee"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="续件数（件）" align=center>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.moreFeeCount"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="续费（元）" align=center>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.moreFee"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="80px" align=center>
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button v-if="authzData['F:BO_PROD_EXPRESSTPL_EDIT_ASSIGN']" type="primary" @click="addNewModel">为指定地区城市设置运费</el-button>
                </div>
                <div class="freeFee">
                    <el-checkbox v-model="ifSetting" label="指定地区包邮可选"></el-checkbox>
                    <el-table v-show="ifSetting" class="tableData" :data="freeFeeList" border style="width:100%;" >
                        <el-table-column fixed label="运送到" align=center>
                            <template slot-scope="scope">
                                <span>{{scope.row.showData?scope.row.showData:'未添加地区'}}</span>
                                <el-button type="text" size="medium" @click="editRegion(scope.$index,2)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="设置包邮条件" align=center>
                            <template slot-scope="scope">
                                满&nbsp;&nbsp;<el-input v-model="scope.row.freeReq"></el-input>&nbsp;&nbsp;元包邮
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120px" align=center>
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" style="font-size:24px;" @click="addNewFree(scope.$index)">+</el-button>
                                <el-button v-if="freeFeeList.length != 1 || scope.$index != 0" type="text" size="medium" style="font-size:24px;" @click="cancelFree(scope.$index)">-</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button v-if="authzData['F:BO_PROD_EXPRESSTPL_EDIT_SUBMIT']" type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
        <el-dialog 
        :visible.sync="dialogVisible"
         title="请选择地区（省）"
         width="35%">
            <el-checkbox-group v-model="checkPro">
              <el-checkbox
              v-for="item in options"
               :label="item.value"
                :key="item.value"
                style="margin-right:20px;margin-bottom:20px;"
                >{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <div class="operate">
                <el-button type="none" @click="cancel('Commoditygai')">取消</el-button>
                <el-button type="primary" @click="ensure('Commoditygai')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import options from '../../../static/json/map.json'
export default {
    name:'LonganExpressAdd',
    data(){
        return {
            authzData: '',
            Commoditygai:{
                modelName:'',
                // provinces:[],
                pricingMode:1,
                firstFee:'',
                firstFeeCount:'',
                moreFee:'',
                moreFeeCount:'',
            },
            ifFree: 0,
            ifSetting:false,
            checkPro:[],
            CabinetList:[],
            dialogVisible:false,
            currentType:'',
            freeFeeList:[
                {
                    provinces:[],
                    showData:'',
                    freeReq:''
                }
            ],
            options: options,
            currentIdx:'',
            expressId:'',
            rules: {
                modelName: [
                    {required: true, message: '请填写模板名称', trigger: 'blur'},
                ],
                // provinces: [
                //     {required: true, message: '请填写地址', trigger: 'change'},
                // ],
                // firstFee:[
                //     {required: true, message: '请填写地址', trigger: 'blur'},
                // ],
                // numRule: [
                //     {required: true, message: '请填写最大红包数量', trigger: 'blur'},
                //     { pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数' }
                // ],
                // shareprise: [
                //     {required: true, message: '请填写分享奖励金额', trigger: 'blur'},
                //     {type:'number', min: 0, message: '金额不能小于0', trigger: 'blur'}
                // ],
            },
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.expressId = this.$route.query.modifyid;
        this.getFillback()
        console.log(this.expressId);
    },
    methods:{
        getdata(value,ele,item){
            console.log(value,ele,item);
        },
        getFillback(){
            this.$api.getExpressFeeOne(this.expressId).then(response => {
                if(response.data.code == 0){
                    console.log(response.data.data);
                    let resData = response.data.data
                    this.Commoditygai = resData
                    this.ifFree = resData.isFree
                    if(resData.prodExpressFeeFreeDTOS[0]){
                        this.ifSetting = true
                        this.freeFeeList = resData.prodExpressFeeFreeDTOS.map(item=>{
                            item.showData = ''
                            item.provinceNames.forEach(ele=>{
                                item.showData += ele+' '
                            })
                            return item
                        })
                    }
                    if(resData.prodExpressSettingDTOS[0]){
                        this.CabinetList = resData.prodExpressSettingDTOS.map(item=>{
                            item.showData = ''
                            item.provinceNames.forEach(ele=>{
                                item.showData += ele+' '
                            })
                            return item
                        })
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
        addNewModel(){
            this.CabinetList.push({
                provinces:[],
                showData:'',
                firstFee:'',
                firstFeeCount:'',
                moreFee:'',
                moreFeeCount:''
            })
        },
        editRegion(index,type){
            this.dialogVisible = true
            switch (type) {
                case 1:
                    this.checkPro = this.CabinetList[index].provinces
                    break;
                case 2:
                    this.checkPro = this.freeFeeList[index].provinces
                    break;
                default:
                    break;
            }
            this.currentType = type
            this.currentIdx = index
        },
        Cabinetglcancel(index){
            this.CabinetList.splice(index,1)
        },
        addNewFree(index){
            this.freeFeeList.splice(index+1,0,{
                provinces:[],
                showData:'',
                freeReq:''
            })
        },
        validateData(params){
            var reg = /^[+]{0,1}(\d+)$/
            var regPlus = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/
            let ifReady = true
            if(params['prodExpressFeeFreeDTOS']){
                params['prodExpressFeeFreeDTOS'].forEach(res => {
                    console.log(res['showData']);
                    if(!regPlus.test(res['freeReq'])){
                        ifReady = false
                    }else if(!res['showData']){
                        ifReady = false
                    }
                })
            }
            if(params['prodExpressSettingDTOS']){
                params['prodExpressSettingDTOS'].forEach(res => {
                    console.log(res['firstFeeCount'],reg.test(res['firstFeeCount']));
                    if(!reg.test(res['firstFeeCount'])){
                        ifReady = false
                    }else if(!regPlus.test(res['firstFee'])){
                        ifReady = false
                    }else if(!reg.test(res['moreFeeCount'])){
                        ifReady = false
                    }else if(!regPlus.test(res['moreFee'])){
                        ifReady = false
                    }else if(!res['showData']){
                        ifReady = false
                    }
                })
            }
            if(!reg.test(params['firstFeeCount'])){
                ifReady = false
            }else if(!regPlus.test(params['firstFee'])){
                ifReady = false
            }else if(!reg.test(params['moreFeeCount'])){
                ifReady = false
            }else if(!regPlus.test(params['moreFee'])){
                ifReady = false
            }
            console.log(ifReady);
            return ifReady
        },   
        //提交
        submitForm(Commoditygai) {
           if(this.ifFree){
                var params = {
                    modelName: this.Commoditygai.modelName,
                    isFree: this.ifFree
                }
            }else{
                var params = {
                    modelName: this.Commoditygai.modelName,
                    isFree: this.ifFree,
                    pricingMode:1,
                    firstFee:this.Commoditygai.firstFee,
                    firstFeeCount:this.Commoditygai.firstFeeCount,
                    moreFee:this.Commoditygai.moreFee,
                    moreFeeCount:this.Commoditygai.moreFeeCount,
                }
                if(this.CabinetList[0]){
                    params.prodExpressSettingDTOS = this.CabinetList
                }
                if(this.ifSetting && this.freeFeeList[0]){
                    params.prodExpressFeeFreeDTOS = this.freeFeeList
                }
                if(!this.validateData(params)){
                    this.$alert('输入内容不可为空或格式有误！', '警告', {
                        confirmButtonText: '确定',
                        type:'warning'
                    })
                    return;
                }
                if(params.prodExpressFeeFreeDTOS){
                    params.prodExpressFeeFreeDTOS = this.freeFeeList.map(item => {
                        return {
                            provinces:item.provinces,
                            freeReq: item.freeReq
                        }
                    })
                }
                if(params.prodExpressSettingDTOS){
                    params.prodExpressSettingDTOS =  this.CabinetList.map(item => {
                        return {
                            provinces:item.provinces,
                            firstFee:item.firstFee,
                            firstFeeCount:item.firstFeeCount,
                            moreFee:item.moreFee,
                            moreFeeCount:item.moreFeeCount
                        }
                    })
                }
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.changeExpressFee(params,this.expressId)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'LonganExpressTemplate'});
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
        cancelFree(index){
            this.freeFeeList.splice(index,1)
        },
        cancel(){
            this.dialogVisible = false;
        },
        ensure(){
            console.log(this.checkPro)
            let showData = ''
            this.checkPro.forEach(item => {
                this.options.forEach(ele => {
                    if(ele.value == item){
                        showData += ele.label+' '
                    }
                })
            })
            switch (this.currentType) {
                case 1:
                    this.CabinetList[this.currentIdx].provinces = this.checkPro
                    this.$set(this.CabinetList[this.currentIdx],'showData',showData)
                    break;
                case 2:
                    this.freeFeeList[this.currentIdx].provinces = this.checkPro
                    this.$set(this.freeFeeList[this.currentIdx],'showData',showData)
                    break;
                default:
                    break;
            }
            this.checkPro = []
            this.dialogVisible = false
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'LonganExpressTemplate'});
        },
    }
}
</script>

<style lang='less' scoped>
.expressAdd{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 76%;
        .el-input,.el-select{width: 225px;}
        .expressFee{
            padding: 20px;
            background: rgb(246,246,246);
            .defaultFee{
                .el-input{
                    width: 70px;
                }
            }
            .feeTable{
                margin: 15px 0;
                .el-input{
                    width: 92px;
                }
            }
        }
        .freeFee{
            padding: 20px;
            background: rgb(246,246,246);
            margin-top: 20px;
            .tableData{
                .el-input{
                    width: 100px;
                }
            }
        }
    }
    .operate{
        display: flex;
        justify-content: center
    }
}

</style>