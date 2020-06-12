<template>
    <div class="pricemanage">
        <div v-if="authzData['F:BH_BOOK_PRICE_EDIT_BATCH'] && isHaveResource" class="batchmbtn"><el-button @click="batchModifyPrice">批量修改</el-button></div>
        <el-tabs v-model="typeNameTab" @tab-click="typeActiveFun">
            <el-tab-pane v-for="item in typeDataList" :key="item.id" :label="item.typeName" :name="item.id"></el-tab-pane>
        </el-tabs> 
        <el-tabs v-model="resourceNameTab" @tab-click="activeTabFun">
            <el-tab-pane v-for="item in resourceDataList" :key="item.id" :label="item.resourceName" :name="item.id">
                <el-calendar>
                    <template
                        slot="dateCell"
                        slot-scope="{date, data}">
                        <span v-for="item in priceDataInfo" :key="item.id">
                            <p class="calday" v-if="item.priceDateS == data.day" :class="data.isSelected ? 'is-selected' : ''" @click="selectDate(data)">
                                {{ data.day.split('-').slice(2).join('-') }}
                                <br/><br/><span :class="data.isSelected ? 'is-selected' : 'spancolor'">{{item.price}}</span>
                            </p>
                        </span>
                    </template>
                </el-calendar>
            </el-tab-pane>
        </el-tabs>
        <el-dialog :visible.sync="dislogVisibleModify" width="30%">
            <span slot="title">修改<span class="mstyle">{{mDate}}</span><span class="mstyle">{{mWeek}}</span></span>
            <el-form :model="modifyForm" :rules="modifyRules" ref="modifyForm" label-width="80px">
                <el-form-item label="房价：" prop="roomPrice">
                    <el-input v-model.trim="modifyForm.roomPrice" maxlength="10"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleModify = false">取 消</el-button>
                <el-button v-if="authzData['F:BH_BOOK_PRICE_EDIT']" type="primary" @click="modifyEnsure('modifyForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量修改" :visible.sync="dislogVisibleBatchModify" width="35%">
            <el-form :model="batchMForm" :rules="batchMRules" ref="batchMForm" label-width="120px" class="batchmform">
                <el-form-item label="选择房源：" prop="resourceId">
                    <el-select v-model="batchMForm.resourceId" placeholder="请选择">
                        <el-option
                            v-for="item in resourceDataList" 
                            :key="item.id" 
                            :label="item.resourceName" 
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="变价日期范围：" prop="rangeDate">
                    <el-date-picker
                        v-model="batchMForm.rangeDate"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="适用日期：" prop="useWeek">
                    <el-checkbox-group v-model="batchMForm.useWeek">
                        <el-checkbox label="2">一</el-checkbox>
                        <el-checkbox label="3">二</el-checkbox>
                        <el-checkbox label="4">三</el-checkbox>
                        <el-checkbox label="5">四</el-checkbox>
                        <el-checkbox label="6">五</el-checkbox>
                        <el-checkbox label="7">六</el-checkbox>
                        <el-checkbox label="1">日</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="房价：" prop="roomPrice">
                    <el-input v-model.trim="batchMForm.roomPrice" maxlength="10"></el-input> 元
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleBatchModify = false">取 消</el-button>
                <el-button type="primary" @click="batchMEnsure('batchMForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelBookPriceManage',
    data(){
        var decimalsReg = /^\d+(\.\d+)?$/
        var validateDecimals = (rule,value,callback) => {
            if(!decimalsReg.test(value)){
                callback(new Error('格式有误'))
            }else{
                callback()
            }
        }
        return {
            // calendarClickButton: document.getElementsByTagName('button'),
            authzData: '',
            hotelId: '',
            typeNameTab: '',
            typeDataList: [],
            resourceNameTab: '',
            resourceDataList: [],
            priceDataInfo: [],
            calDefaultVal: '',
            //修改
            dislogVisibleModify: false,
            mDate: '',
            mWeek: '',
            modifyForm: {
                roomPrice: ''
            },
            modifyRules: {
                roomPrice: [
                    {required: true, validator: validateDecimals, trigger: ['blur','change']}
                ],
            },
            //批量修改
            dislogVisibleBatchModify: false,
            pickerOptions: {
                disabledDate(time){
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            batchMForm: {
                rangeDate: [],
                useWeek: [],
                roomPrice: ''
            },
            batchMRules: {
                resourceId: [
                    {required: true, message: '请选择房源', trigger: 'change'}
                ],
                rangeDate: [
                    {required: true, message: '请选择变价日期范围', trigger: 'change'}
                ],
                // useWeek: [
                //     { type: 'array', required: true, message: '请选择适用日期', trigger: 'change' }
                // ],
                roomPrice: [
                    {required: true, validator: validateDecimals, trigger: ['blur','change']}
                ]
            },
            //切换 - 月
            // calendarMonth: document.getElementsByClassName("el-calendar__title")[0].innerHTML,
            nowDate: new Date(),
            nowYear: '',
            nowMonth: '',
            nowDay: '',
            activeMonth: '',
            resourceIndex: '0',
            isHaveType: false,
            isHaveResource: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        this.getTypeList();
        this.bindingClick();
        this.nowYear = this.nowDate.getFullYear();
        this.nowMonth = this.nowDate.getMonth() + 1;
        this.nowDay = this.nowDate.getDate();
    },
    methods: {
        //获取房型列表
        getTypeList(){
            const params = {
                orgAs: 3,
                hotelId: this.hotelId
            };
            this.$api.getBookTypeList(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        if(result.data.length != 0){
                            this.isHaveType = true;
                            this.typeNameTab = result.data[0].id.toString();
                            this.typeDataList = result.data.map(item => {
                                return {
                                    id: item.id.toString(),
                                    typeName: item.typeName
                                }
                            });
                            this.getResourceList();
                        }else{
                            this.isHaveType = false;
                            this.$message.warning('请先添加房型信息！');
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
        //切换房型
        typeActiveFun(){
            this.getResourceList();
        },
        //获取房源列表
        getResourceList(){
            const params = {
                hotelId: this.hotelId,
                roomType: this.typeNameTab
            };
            // console.log(params);
            this.$api.getBookResourceList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.isHaveResource = true;
                            this.resourceNameTab = result.data[0].id.toString();
                            this.resourceDataList = result.data.map(item => {
                                return {
                                    id: item.id.toString(),
                                    resourceName: item.resourceName
                                }
                            });
                            this.bookPriceInfo();
                        }else{
                            this.isHaveResource = false;
                            this.$message.warning('此房型下暂无对应的房源！');
                            this.resourceDataList = [];
                            this.priceDataInfo = [];
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
        //切换房源
        activeTabFun(tab, event){
            this.resourceIndex = tab.index;
            // console.log(tab);
            // console.log(event);
            this.bookPriceInfo();
        },
        //房价数据信息
        bookPriceInfo(){
            const params = {
                resource: parseInt(this.resourceNameTab),
                year: this.nowYear,
                month: this.nowMonth
            };
            // console.log(params);
            this.$api.bookPriceInfo(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.priceDataInfo = result.data.map(item => {
                            let priceStr = '￥ ' + item.price;
                            return {
                                price: priceStr,
                                priceDateS: item.priceDateS,
                                roomResourceId: item.roomResourceId
                            }
                        });
                        this.bindingClick();
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
        getYearMonth(){
            let nowYM = document.getElementsByClassName('el-calendar__title');
            // console.log(nowYM);
            let nowYMArr = nowYM[this.resourceIndex].innerText.split(' ').slice(0).join('');
            // console.log(nowYMArr);
            // let nowMArr = nowYMArr.slice(5,nowYMArr.length-1);
            let nowYMArr3 = nowYMArr;
            let nowYMArr1 = nowYMArr3.replace('年','-');
            let nowYMArr2 = nowYMArr1.replace('月','');
            // console.log(nowYMArr2);
            let nowYArr = nowYMArr2.split('-')[0];
            let nowMArr = nowYMArr2.split('-')[1];
            // console.log(nowMArr);
            if(nowMArr < 10){
                nowMArr = '0' + nowMArr;
            }
            this.nowYear = nowYArr;
            this.nowMonth = nowMArr;
            let nowYMData = nowYMArr.split('年')[0] + '-' + nowMArr;
            // console.log(nowYMData);
            return nowYMData
        },
        bindingClick(){
            // console.log(this.calendarClickButton);
            const that = this;
            // this.calendarMonth = document.getElementsByClassName("el-calendar__title")[0].innerHTML;
            // console.log(this.calendarMonth);
            let activeButton = document.getElementsByTagName('button');
            for(let i = 0; i < activeButton.length; i++){
                let btnText = activeButton[i].innerText.replace(/\s+/g,"");
                if(btnText == '上个月'){
                    activeButton[i].onclick = function(){
                        that.activeMonth = that.getYearMonth();
                        that.selectMonth(that.activeMonth);
                    }
                }else if(btnText == '今天'){
                    activeButton[i].onclick = function(){
                        that.activeMonth = that.getYearMonth();
                        that.selectMonth(that.activeMonth);
                    }
                }else if(btnText == '下个月'){
                    activeButton[i].onclick = function(){
                        that.activeMonth = that.getYearMonth();
                        that.selectMonth(that.activeMonth);
                    }
                }
            }
        },
        selectMonth(val){
            // console.log(val);
            this.nowYear = val.substr(0,4);
            this.nowMonth = val.substr(5,2);
            this.bookPriceInfo();
        },
        //修改房价
        selectDate(val){
            this.modifyForm.roomPrice = '';
            let modifyDate = new Date(Date.parse(val.day));
            const ndateM = new Date();
            let nowDateArr = ndateM.getFullYear() + '-' + (ndateM.getMonth() + 1) + '-' + ndateM.getDate();
            let nowDateData = new Date(Date.parse(nowDateArr));
            if(modifyDate < nowDateData){
                return false
            }else{
                this.mDate = val.day;
                this.mWeek = this.getWeekDay(new Date(val.day));
                this.dislogVisibleModify = true;
            }
        },
        modifyEnsure(modifyForm){
            const that = this;
            const params = {
                modifyResource: this.resourceNameTab.split(),
                modifyStartDate: this.mDate,
                modifyEndDate: this.mDate,
                price: this.modifyForm.roomPrice
            };
            this.$refs[modifyForm].validate((valid) => {
                if(valid){
                    this.$api.bookPriceModify(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('房价修改成功！');
                                this.dislogVisibleModify = false;
                                // this.modifyForm.roomPrice = ''; 
                                this.priceDataInfo = [];
                                this.bookPriceInfo();
                            }else{
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        getWeekDay(date){
            let week;
            if(date.getDay()==0) week="周日"
            if(date.getDay()==1) week="周一"
            if(date.getDay()==2) week="周二"
            if(date.getDay()==3) week="周三"
            if(date.getDay()==4) week="周四"
            if(date.getDay()==5) week="周五"
            if(date.getDay()==6) week="周六"
            return week;
        },
        //批量修改
        batchModifyPrice(){
            // this.batchMForm.resourceId = this.resourceNameTab;
            this.batchMForm.rangeDate = [];
            this.batchMForm.useWeek = [];
            this.batchMForm.roomPrice = '';
            this.dislogVisibleBatchModify = true;
        },
        batchMEnsure(batchMForm){
            const that = this;
            this.$refs[batchMForm].validate((valid) => {
                if(valid){
                    if(this.batchMForm.useWeek.length == 0){
                        this.batchMForm.useWeek = ["2", "3", "4", "5", "6", "7", "1"];
                    }
                    const params = {
                        modifyResource: this.batchMForm.resourceId.split(),
                        modifyStartDate: this.batchMForm.rangeDate[0],
                        modifyEndDate: this.batchMForm.rangeDate[1],
                        modifyWeek: this.batchMForm.useWeek,
                        price: this.batchMForm.roomPrice
                    };
                    this.$api.bookPriceModify(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('批量房价修改成功！');
                                this.dislogVisibleBatchModify = false;
                                this.priceDataInfo = [];
                                this.bookPriceInfo();
                            }else{
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
    }
}
</script>

<style>
.el-calendar__header{
    display: flex !important;
    justify-content: flex-start !important;
}
.el-calendar__title{
    margin-right: 30px;
}
</style>

<style lang="less" scoped>
.batchmbtn{
    position: absolute;
    right: 40px;
    margin-top: 110px;
    z-index: 1;
}
.calday{
    margin: -8px;
    padding: 16px 0px;
}
.is-selected {
    color: #409eff;
}
.spancolor{
    color: #bbb;
    font-size: 14px;
}
.mstyle{
    font-size: 14px;
    margin-left: 10px;
}
.batchmform{
    text-align: left;
    .el-checkbox{
        margin-right: 15px;
    }
    .el-input{
        width: 42%;
    }
}
</style>

