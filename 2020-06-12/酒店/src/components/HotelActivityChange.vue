<template>
    <div class="hoteladd">
        <p class="title">修改活动</p>
        <el-form :model="Commoditygai" :rules="rules" ref="Commoditygai" label-width="140px" class="hotelform">
            <el-form-item label="活动名称：" prop="activityName">
                <el-input maxlength="30" v-model="Commoditygai.activityName" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动类型：" prop="activityType">
                <el-select
                    v-model="Commoditygai.activityType"
                    :loading="loadingH"
                    :disabled="true"
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
                        <el-radio-group v-model="dateChooseType">
                            <el-radio :label="1" style="display:flex;margin-top:14px;width: 60px;">每周</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group class="groupFlex" v-model="weekChoose">
                                    <el-checkbox :label="2">周一</el-checkbox>
                                    <el-checkbox :label="3">周二</el-checkbox>
                                    <el-checkbox :label="4">周三</el-checkbox>
                                    <el-checkbox :label="5">周四</el-checkbox>
                                    <el-checkbox :label="6">周五</el-checkbox>
                                    <el-checkbox :label="7">周六</el-checkbox>
                                    <el-checkbox :label="1">周日</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <el-radio :label="2" style="display:flex;margin-top:14px;width: 60px;">每月</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group class="groupFlex" v-model="monthChoose">
                                    <el-checkbox :label="index" v-for="(item,index) in 12" :key="index">{{index+1}}月</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <el-radio :label="3" style="display:flex;margin-top:14px;width: 60px;">每天</el-radio>
                            <div class="chooseList">
                                <el-checkbox-group class="groupFlex" style="width:600px;" v-model="dayChoose">
                                    <el-checkbox :label="index" v-for="(item,index) in 31" :key="index">{{index+1}}</el-checkbox>
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
                                    end: '23:59',
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
                                    end: '23:59',
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
                <el-radio-group :disabled="true" class="radio-group" v-model="Commoditygai.joinTimesType">
                    <el-radio class="radioItem" :label="0">不限制</el-radio>
                    <el-radio class="radioItem" :label="1">每类型
                        <el-input style="width:100px" :disabled="true" v-model="joinTimes1"></el-input>次
                    </el-radio>
                    <el-radio class="radioItem" :label="2">每活动
                        <el-input style="width:100px" :disabled="true" v-model="joinTimes2"></el-input>次
                    </el-radio>
                    <el-radio class="radioItem" :label="3">每隔
                        <el-input style="width:100px" :disabled="true" v-model="joinTimes3"></el-input>
                        <el-select
                            style="width:100px"
                            v-model="dateType"
                            :loading="loadingH" 
                            :disabled="true">
                            <el-option
                                v-for="item in dateTypeList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="酒店名称：" prop="hotelList">
                <div class="choose">
                    <el-button type="primary" @click="chooseHotel">选择酒店</el-button>
                </div>
                <div class="hotelTable">
                    <el-table border stripe style="width:100%;" :data="Commoditygai.hotelList">
                      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
                      <el-table-column label="禁/启用状态" align="center">
                        <template slot-scope="scope">
                            <el-switch :disabled="true" v-model="scope.row.status"></el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="hotelCancel(scope.$index)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </div>
            </el-form-item> -->
            <el-form-item>
                <el-button @click="resetForm('Commoditygai')">取消</el-button>
                <el-button type="primary" @click="submitForm('Commoditygai')">确定</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-dialog 
        :visible.sync="dialogVisible"
         title="请选择酒店"
         width="25%">
            <div class="searchHotel">
                <el-input style="width:75%" placeholder="请输入酒店名称" v-model="searckKey"></el-input>
                <el-button type="primary" @click="searchHotel">搜索</el-button>
            </div>
            <div class="chooseTable">
                <el-table border stripe 
                style="width:100%;" 
                :data="searchHotelList"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        width="55">
                    </el-table-column>
                    <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next, jumper"
                        :pager-count="5"
                        :page-size="pageSize"
                        :total="pageTotal"
                        :current-page.sync="pageNum"
                        @current-change = "current"
                        @prev-click="prev"
                        @next-click="next">
                    </el-pagination>
                </div>
            </div>
            <div class="operate">
                <el-button type="none" @click="toggleSelection1()">取消</el-button>
                <el-button type="primary" @click="toggleSelection2()">确定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    name: 'LaunchCabinetAdd',
    data(){
        var validateTimes = (rule, value, callback) => {
            if (value == 1 && this.joinTimes1 == '') {
                callback(new Error('请填写参与次数'));
            } else if (value == 2 && this.joinTimes2 == ''){
                callback(new Error('请填写参与次数'));
            } else if (value == 3 && this.joinTimes3 == ''){
                callback(new Error('请填写参与次数'));
            } else {
                callback();
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
            Commoditygai: {},
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
            hotelList:[],
            dateChooseType:0,
            timeList:[],
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
                    {required: true, message: '请选择参与类型', trigger: 'change'},
                    {validator: validateTimes,trigger: 'blur'},
                ],
                activityTime: [
                    {required: true, message: '请选择活动时间', trigger: 'change'},
                    {validator: validateTime,trigger: 'blur'},
                ],
                // hotelList: [
                //     {required: true, message: '请选择至少一个酒店', trigger: 'change'},
                // ],
                grade: [
                    {required: true, message: '请选择级别', trigger: 'change'},
                ],
                hotelId: [
                    {required: true, message: '请选择酒店', trigger: 'change'},
                ],
            },
            actID:'',

            pageSize:6,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    watch:{
        ifDateChoose(val){
            if(!val){
                this.dateChooseType = 0
            }
        },
    },
    computed:{
        ifWeek(){
            return this.dateChooseType == 1?false:true
        },
        ifMonth(){
            return this.dateChooseType == 2?false:true
        },
        ifDay(){
            return this.dateChooseType == 3?false:true
        }
    },
    created() {
        this.actID = this.$route.query.modifyid;
        // this.hotelId = localStorage.getItem('hotelId');
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.getFillbackData();
    },
    mounted(){
        this.getActList()
    },
    methods: {
        remoteCabType(val){
            this.getHotelList(val);
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
        getActList(){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.actTypeList = response.data.data.map(item => {
                        return {
                            id: Number(item.dictValue),
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
        //获取回填数据
        getFillbackData(){
            let that = this;
            this.$api.selectActivityOne(this.actID).then(response => {
                if(response.data.code == 0){
                    that.Commoditygai = {
                        activityName: response.data.data.actName,
                        activityType: response.data.data.actType,
                        activityTime: [response.data.data.actBegin,response.data.data.actEnd],
                        joinTimesType:response.data.data.actPartInCountType,
                        hotelId:response.data.data.actHotelDTOS[0].hotelId,
                        grade:response.data.data.actScopeLevel.toString()
                    }
                    if(this.Commoditygai.joinTimesType == 1){
                        this.joinTimes1 = response.data.data.actPartInCount
                    }else if(this.Commoditygai.joinTimesType == 2){
                        this.joinTimes2 = response.data.data.actPartInCount
                    }else if(this.Commoditygai.joinTimesType == 3){
                        this.joinTimes3 = response.data.data.actPartInCount
                        this.dateType = 0
                    }else if(this.Commoditygai.joinTimesType == 4){
                        this.joinTimes3 = response.data.data.actPartInCount
                        this.dateType = 1;
                        this.Commoditygai.joinTimesType = 3
                    }else if(this.Commoditygai.joinTimesType == 5){
                        this.joinTimes3 = response.data.data.actPartInCount
                        this.dateType = 2
                        this.Commoditygai.joinTimesType = 3
                    }
                    this.ifDateChoose = response.data.data.actPartInDateType?true:false;
                    this.dateChooseType = response.data.data.actPartInDateType;
                    if(this.ifDateChoose){
                        if(response.data.data.actPartInDateType == 1){
                            this.weekChoose = JSON.parse(response.data.data.actPartInDate)
                        }else if(response.data.data.actPartInDateType == 2){
                            this.monthChoose = JSON.parse(response.data.data.actPartInDate).map(item =>{ return item-1})
                        }else if(response.data.data.actPartInDateType == 3){
                            this.dayChoose = JSON.parse(response.data.data.actPartInDate).map(item =>{ return item-1})
                        }
                    }
                    if(response.data.data.actPartInTime){
                        let timeList = JSON.parse(response.data.data.actPartInTime)
                        this.timeList = timeList.map(item => {
                            return {
                                startTime: item.split('-')[0],
                                endTime: item.split('-')[1]
                            }
                        })
                    }
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
        //确定-修改活动
        submitForm(Commoditygai) {
            let params = {
                actName: this.Commoditygai.activityName,
                actBegin: this.Commoditygai.activityTime[0],
                actEnd: this.Commoditygai.activityTime[1],
                actType: this.Commoditygai.activityType,
                actPartInCountType: this.Commoditygai.joinTimesType,
                actPartInDateType: this.dateChooseType,
                actScopeLevel: this.Commoditygai.grade,
                actHotelCreateBeans: [{hotelId:this.Commoditygai.hotelId}]
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
                if(this.dateChooseType == '1'){
                    if(!this.weekChoose[0]){
                        this.weekChoose = this.getAllData(7)
                    }
                    params.actPartInDate = this.weekChoose
                }else if(this.dateChooseType == '2'){
                    if(!this.monthChoose[0]){
                        this.monthChoose = this.getAllData(12)
                    }
                    params.actPartInDate = this.monthChoose
                }else if(this.dateChooseType == '3'){
                    if(!this.dayChoose[0]){
                        this.dayChoose = this.getAllData(31)
                    }
                    params.actPartInDate = this.dayChoose
                }
            }
            this.$refs[Commoditygai].validate((valid) => {
                if (valid) {
                    this.$api.changeActivityOne(params,this.actID)
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
        //添加酒店
        chooseHotel(){
            this.dialogVisible = true;
            this.getHotelList();
        },
        //确认酒店
        ensure(){
            let hotelSelections = this.hotelSelection.map(item => {
                return {
                    id:item.id,
                    hotelId:item.hotelId,
                    hotelName:item.hotelName,
                    status: false
                }
            })
            hotelSelections = this.Commoditygai.hotelList.concat(hotelSelections)
            this.$set(this.Commoditygai,'hotelList',hotelSelections)
            this.dialogVisible = false;
        },
        //搜索酒店
        searchHotel(){
            this.getHotelList(this.searckKey)
        },
        //检查是否已选中
        checkSelectable(row,index){
            let flag = true;
            this.Commoditygai.hotelList.forEach(item => {
                if(item.hotelId == row.id){
                    flag = false
                }
            })
            return flag
        },
        handleSelectionChange(val) {
            this.hotelSelection = val;
        },
        //清楚选中状态
        toggleSelection1(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
            this.dialogVisible = false;
        },
        //清楚选中状态
        toggleSelection2(rows) {
            this.ensure()
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        //删除酒店
        hotelCancel(index){
            this.Commoditygai.hotelList.splice(index,1);
        },
        //取消
        resetForm(Commoditygai) {
            this.$router.push({name:'HotelActivityList'});
        },
        // //获取酒店列表
        // getHotelList(val){
        //     let params = {
        //         actBegin: this.Commoditygai.activityTime[0],
        //         actEnd: this.Commoditygai.activityTime[1],
        //         actType: this.Commoditygai.activityType,
        //         pageNo: this.pageNum,
        //         pageSize: this.pageSize,
        //         hotelName: val,
        //     }
        //     this.$api.hotelList(params).then(response => {
        //         if(response.data.code == 0){
        //             this.searchHotelList = response.data.data.records.map(item => {
        //                 return {
        //                     hotelName: item.hotelName,
        //                     id: item.id
        //                 }
        //             })
        //             this.pageTotal = response.data.data.total
        //         }else{
        //             this.$alert(response.data.data.msg,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         this.$alert(error,"警告",{
        //             confirmButtonText: "确定"
        //         })
        //     })
        // },
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

        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getHotelList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getHotelList();
        },
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
            this.getHotelList();
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

