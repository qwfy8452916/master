<template>
    <div class="hoteladd">
        <p class="title">新增活动</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="活动名称：" prop="activityName">
                <el-input maxlength="30" v-model="Commoditygai.activityName" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动类型：" prop="activityType">
                <el-select
                    v-model="Commoditygai.activityType"
                    :loading="loadingH"
                    placeholder="请选择">
                    <el-option
                        v-for="item in actTypeList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间：" prop="activityTime">
                <el-date-picker
                    v-model="Commoditygai.activityTime"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <div class="dataChoose">
                    <el-checkbox v-model="ifDateChoose" style="height:40px;">日期选择</el-checkbox>
                    <div class="dataList">
                        <el-radio-group :disabled="!ifDateChoose" v-model="dateChooseType">
                            <el-radio label="1" style="display:flex;margin-top:14px;width: 60px;">每周</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group :disabled="ifWeek" class="groupFlex" v-model="weekChoose">
                                    <el-checkbox label="2">周一</el-checkbox>
                                    <el-checkbox label="3">周二</el-checkbox>
                                    <el-checkbox label="4">周三</el-checkbox>
                                    <el-checkbox label="5">周四</el-checkbox>
                                    <el-checkbox label="6">周五</el-checkbox>
                                    <el-checkbox label="7">周六</el-checkbox>
                                    <el-checkbox label="1">周日</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <el-radio label="2" style="display:flex;margin-top:14px;width: 60px;">每月</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group :disabled="ifMonth" class="groupFlex" v-model="monthChoose">
                                    <el-checkbox :label="index+1" v-for="(item,index) in 12" :key="index">{{index+1}}月</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <el-radio label="3" style="display:flex;margin-top:14px;width: 60px;">每天</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group :disabled="ifDay" class="groupFlex" style="width:600px;" v-model="dayChoose">
                                    <el-checkbox :label="index+1" v-for="(item,index) in 31" :key="index">{{index+1}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dataChoose">
                    <div style="width:">时间选择</div>
                    <div class="dataList">
                        <el-button type="primary" size="small" @click="addTimes">添加</el-button>
                        <div class="timesList">
                            <div class="timePicker"
                                v-for="(item,index) in timeList"
                                :key="index">
                                <el-time-select
                                    style="width:200px;"
                                    placeholder="起始时间"
                                    v-model="item.startTime"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '24:00',
                                    maxTime: item.endTime
                                    }">
                                </el-time-select>
                                <span>至</span>
                                <el-time-select
                                    style="width:200px;"
                                    placeholder="结束时间"
                                    v-model="item.endTime"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '24:00',
                                    minTime: item.startTime
                                    }">
                                </el-time-select>
                                <i class="el-icon-delete delete" @click="timeList.splice(index,1)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="参与次数：" prop="joinTimesType">
                <el-radio-group class="radio-group" v-model="Commoditygai.joinTimesType">
                    <el-radio class="radioItem" :label="0">不限制</el-radio>
                    <el-radio class="radioItem" :label="2">每活动
                        <el-input style="width:100px" :disabled="Commoditygai.joinTimesType != 2" v-model="joinTimes2"></el-input>次
                        <el-popover
                            placement="right-start"
                            title="提示"
                            width="200"
                            trigger="hover"
                            content="当设置为“每活动”时，指用户参加同一个活动的次数。">
                            <el-button style="border:none;padding:0;vertical-align:middle;" slot="reference">
                                <i class="el-icon-warning-outline" style="font-size:18px"></i>
                            </el-button>
                        </el-popover>
                    </el-radio>
                    <el-radio class="radioItem" :label="1">每类型
                        <el-input style="width:100px" :disabled="Commoditygai.joinTimesType != 1" v-model="joinTimes1"></el-input>次
                        <el-popover
                            placement="right-start"
                            title="提示"
                            width="200"
                            trigger="hover"
                            content="当设置为“每类型”时，要判断用户之前有没有参加过同类型的活动，例：设置当前活动为每类型1次，如果用户已经参加过同类型活动，则该类型的活动用户无法再次参与。">
                            <el-button style="border:none;padding:0;vertical-align:middle;" slot="reference">
                                <i class="el-icon-warning-outline" style="font-size:18px"></i>
                            </el-button>
                        </el-popover>
                    </el-radio>
                    <el-radio class="radioItem" :label="3">每
                        <el-input style="width:100px" :disabled="Commoditygai.joinTimesType != 3" v-model="joinTimes3"></el-input>
                        <el-select
                            style="width:100px"
                            v-model="dateType"
                            :loading="loadingH" 
                            :disabled="Commoditygai.joinTimesType != 3">
                            <el-option
                                v-for="item in dateTypeList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-popover
                            placement="right-start"
                            title="提示"
                            width="200"
                            trigger="hover"
                            content="当设置为“每X天”时，指用户每X天可以参与；当设置为“每X周”时，例如 每1周，指周一至周日任何时间都可以参加，到第二周仍从周一至周日计算活动参与时间。
当设置为“每X月”时，例如每1月，指这个月的月初到月末任何时间都可以参加。下个月仍旧是从月初到月末计算参与时间。">
                            <el-button style="border:none;padding:0;vertical-align:middle;" slot="reference">
                                <i class="el-icon-warning-outline" style="font-size:18px"></i>
                            </el-button>
                        </el-popover>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="级别：" prop="grade">
                <el-select v-model="Commoditygai.grade" :disabled="ifGrade" placeholder="选择活动类型后显示">
                  <el-option label="平台" value="0"></el-option>
                  <el-option label="单店" value="1"></el-option>
                  <el-option label="供应商" value="2"></el-option>
                </el-select>
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
    name: 'HotelActivityAdd',
    data(){
        var validateTimes = (rule, value, callback) => {
            switch (value) {
                case 1:
                    if(this.joinTimes1 == ''){
                        callback(new Error('请填写参与次数'));
                    }else if(!(/^[1-9]\d*$/.test(this.joinTimes1))){
                        callback(new Error('请填写正整数'));
                    }else{
                        callback();
                    }
                    break;
                case 2:
                    if(this.joinTimes2 == ''){
                        callback(new Error('请填写参与次数'));
                    }else if(!(/^[1-9]\d*$/.test(this.joinTimes2))){
                        callback(new Error('请填写正整数'));
                    }else{
                        callback();
                    }
                    break;
                case 3:
                    if(this.joinTimes3 == ''){
                        callback(new Error('请填写参与次数'));
                    }else if(!(/^[1-9]\d*$/.test(this.joinTimes3))){
                        callback(new Error('请填写正整数'));
                    }else{
                        callback();
                    }
                    break;
                default:
                    callback();
                    break;
            }
        };
        var validateTime = (rule, value, callback) => {
            this.timeList.forEach(item => {
                if(item.startTime == '' || item.endTime == ''){
                    callback(new Error('请填写时间范围'));
                }
            })
            callback();
        };
        return{
            authzData: '',
            Commoditygai: {
                activityName: '',
                activityType: '',
                activityTime: [],
                joinTimesType:0,
                grade:""
            },
            hotelId:'',
            uploadUrl: this.$api.upload_file_url,
            headers:{},
            loadingH: false,
            joinTimes1:'',
            joinTimes2:'',
            joinTimes3:'',
            dateType:0,
            dialogVisible:false,
            searckKey:'',
            ifDateChoose:false,
            hotelSelection: [],
            searchHotelList:[],
            dateTypeList:[
                {
                    id: 0,
                    label: '天'
                },
                {
                    id: 1,
                    label: '周'
                },
                {
                    id: 2,
                    label: '月'
                },
            ],
            actTypeList:[],
            weekChoose:[],
            monthChoose:[],
            dayChoose:[],
            dateChooseType:0,
            timeList:[{startTime:"",endTime:""}],
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() < (Date.now()-24*60*60*1000);
                }
            },
            rules: {
                activityName: [
                    {required: true, message: '请填写活动名称', trigger: 'blur'},
                ],
                activityType: [
                    {required: true, message: '请选择活动类型', trigger: 'change'}
                ],
                joinTimesType: [
                    {required: true, message: '请选择参与次数', trigger: 'change'},
                    {validator: validateTimes,trigger: 'blur'},
                ],
                activityTime: [
                    {required: true, message: '请选择活动时间', trigger: 'change'},
                    {validator: validateTime,trigger: 'blur'},
                ],
                grade: [
                    {required: true, message: '请选择级别', trigger: 'change'},
                ]
            },
        }
    },
    computed:{
        ifWeek(){
            return this.dateChooseType === '1'?false:true
        },
        ifMonth(){
            return this.dateChooseType === '2'?false:true
        },
        ifDay(){
            return this.dateChooseType === '3'?false:true
        },
        ifGrade(){
            if(this.Commoditygai.activityType == 1 ||this.Commoditygai.activityType == 2 || this.Commoditygai.activityType == 4|| this.Commoditygai.activityType == 6){
                this.Commoditygai.grade = '1'
                return true
            }else if(this.Commoditygai.activityType == 5){
                this.Commoditygai.grade = '2'
                return true
            }else{
                return false
            }
        }
    },
    created() {
        const token = localStorage.getItem('Authorization');
        this.hotelId = localStorage.getItem('hotelId');
        this.headers = {"Authorization": token};
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        this.getActList()
    },
    methods: {
        getActList(){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.actTypeList = response.data.data.map(item => {
                        return {
                            id: item.dictValue,
                            label: item.dictName
                        }
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
        //确定-添加活动
        submitForm(Commoditygai) {
            let params = {
                actName: this.Commoditygai.activityName,
                actBegin: this.Commoditygai.activityTime[0],
                actEnd: this.Commoditygai.activityTime[1],
                actType: this.Commoditygai.activityType,
                actPartInCountType: this.Commoditygai.joinTimesType,
                actPartInDateType: this.dateChooseType,
                actScopeLevel: this.Commoditygai.grade,
                actHotelCreateBeans: [{hotelId:this.hotelId}]
            }
            if(this.Commoditygai.joinTimesType == 1){
                params.actPartInCount = this.joinTimes1;
            }else if(this.Commoditygai.joinTimesType == 2){
                params.actPartInCount = this.joinTimes2;
            }else if(this.Commoditygai.joinTimesType == 3){
                params.actPartInCount = this.joinTimes3;
                if(this.dateType == 1){
                    params.actPartInCountType = 4
                }else if(this.dateType == 2){
                    params.actPartInCountType = 5
                }
            }
            if(this.timeList[0]){
                params.actPartInTime = this.timeList.map(item => {
                    return `${item.startTime}-${item.endTime}`
                })
            }
            if(this.ifDateChoose){
                if(this.dateChooseType === '1'){
                    if(!this.weekChoose[0]){
                        this.weekChoose = this.getAllData(7)
                    }
                    params.actPartInDate = this.weekChoose
                }else if(this.dateChooseType === '2'){
                    if(!this.monthChoose[0]){
                        this.monthChoose = this.getAllData(12)
                    }
                    params.actPartInDate = this.monthChoose
                }else if(this.dateChooseType === '3'){
                    if(!this.dayChoose[0]){
                        this.dayChoose = this.getAllData(31)
                    }
                    params.actPartInDate = this.dayChoose
                }
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.addActivity(params)
                        .then(response => {
                            if(response.data.code==0){
                               this.$message.success("操作成功")
                               this.$router.push({name:'HotelActivityList'});
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
        getAllData(num){
            let arr = []
            for(var i=0;i<num;i++){
                arr.push(i+1)
            }
            return arr
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'HotelActivityList'});
        },
        //添加时间
        addTimes(){
            if(this.timeList.length == 5){
                this.$alert('时间列表最多不可超过5个！',"警告",{
                    confirmButtonText: "确定"
                })
                return;
            }
            this.timeList.push({startTime:"",endTime:""})
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
    .operate{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .searchHotel{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .pagination{
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .el-pagination{
            display: flex;
            align-items: center;
        }
    }
    .hotelform{
        width: 42%;

        .btnwrap{margin-left: 35px;}
        .el-input,.el-select{width: 225px;}
        .termput{width: 80px;display: inline-block;
            margin-right: 10px;}
        .radio-group{
            display: flex;
            flex-direction: column;
            .radioItem{
                width: 280px;
                margin-top: 10px;
            }
        }
        .groupFlex{
            width:600px;
            display:flex;
            flex-wrap:wrap;
        }
        .dataChoose{
            display: flex;
            .dataList{
                margin-left: 20px;
                .chooseList{
                    padding: 5px 25px;
                }
                .delete{
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>

