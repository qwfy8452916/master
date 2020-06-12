<template>
    <div class="statusmanage">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="hotelId" 
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div class="selectdiv">
            <el-button type="text" @click="selectTime(1)">前14天</el-button>
            <el-date-picker
                v-model="activeDay"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                @change="selectTime(3)">
            </el-date-picker>
            <el-button type="text" @click="selectTime(2)">后14天</el-button>
        </div>
        <table class="tablestyle" v-if="isShow">
            <tr>
                <th class="resname">房型名称</th>
                <th class="resname">房源名称</th>
                <th v-for="item in resourceList" :key="item.index">{{item.week}}<br/>{{item.statusDate}}</th>
            </tr>
            <tr v-for="item in statusDataList" :key="item.id">
                <td>{{item.roomTypeName}}</td>
                <td>{{item.resourceName}}</td>
                <td v-for="subitem in item.bookRoomStateDTOS" :key="subitem.id">
                    <span v-if="subitem.status != 0 && subitem.fullFlag == 0">{{subitem.roomBookedCount}}/{{subitem.roomCount}}</span>
                    <span v-if="subitem.status != 0 && subitem.fullFlag == 1" class="bgcolor">{{subitem.roomBookedCount}}/{{subitem.roomCount}}</span>
                    <span v-if="subitem.status == 0"><img src="../assets/images/rooms3.png" class="stateicon" alt="state" /></span>
                </td>
            </tr>
        </table>
        <p v-else>暂无数据</p>
        <div class="explaincolor">
            颜色说明：&nbsp;
            <img src="../assets/images/rooms1.png" class="stateicon" alt="state" />可售&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../assets/images/rooms2.png" class="stateicon" alt="state" />满房不可售&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../assets/images/rooms3.png" class="stateicon" alt="state" />不可订
        </div>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganBookStatus',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            hotelId: '',
            hotelList: [],
            loadingH: false,
            activeDay: new Date(),
            endDay: new Date(new Date().getTime()+24*60*60*1000*14),
            statusDataList: [],
            resourceList: [],
            isShow: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.bookStatusInfo(this.activeDay, this.endDay);
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.getHotelList();
            this.bookStatusInfo(this.activeDay, this.endDay);
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
                        this.hotelId = this.hotelList[0].id;
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
        //房态数据信息
        bookStatusInfo(startDateD, endDateD){
            const params = {
                startDate: this.changeDateType(startDateD),
                endDate: this.changeDateType(endDateD),
                hotelId: this.hotelId
            };
            // console.log(params);
            // return;
            this.$api.bookStatusInfo(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data.length != 0){
                            this.isShow = true;
                            this.statusDataList = result.data;
                            let dateData = result.data[0].bookRoomStateDTOS.map(item => {
                                return item.week +  item.stateDateS
                            });
                            // console.log(dateData);
                            this.resourceList = dateData.map(item => {
                                return {
                                    week: item.substr(0,1),
                                    statusDate: item.substr(6,item.length-1)
                                }
                            });
                        }else{
                            this.isShow = false;
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
        changeDateType(cDate){
            let yearD = cDate.getFullYear();
            let monthD = cDate.getMonth() + 1;
            let dayD = cDate.getDate();
            if(monthD < 10){
                monthD = '0' + monthD;
            }
            if(dayD < 10){
                dayD = '0' + dayD;
            }
            let dateArr = yearD + '-' + monthD + '-' + dayD;
            return dateArr;
        },
        //查询
        inquire(){
            this.statusDataList = [];
            this.resourceList = [];
            let nowDate = new Date();
            let nowEndDate = new Date(new Date().getTime()+24*60*60*1000*14);
            this.bookStatusInfo(nowDate, nowEndDate);
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId
            })
        },
        //前、后14天
        selectTime(timeState){
            if(timeState == 1){
                //前14天
                let endDateD = this.activeDay;
                this.activeDay = new Date(this.activeDay.getTime()-24*60*60*1000*14);
                this.bookStatusInfo(this.activeDay, endDateD);
            }else if(timeState == 2){
                //后14天
                this.activeDay = new Date(this.activeDay.getTime()+24*60*60*1000*14);
                let endDateD = new Date(this.activeDay.getTime()+24*60*60*1000*14);
                this.bookStatusInfo(this.activeDay, endDateD);
            }else if(timeState == 3){
                let endDateD = new Date(this.activeDay.getTime()+24*60*60*1000*14);
                this.bookStatusInfo(this.activeDay, endDateD);
            }
        }
    }
}
</script>

<style scoped>
.el-date-editor.el-input{
    width: 140px;
}
</style>

<style lang="less" scoped>
.statusmanage{
    .selectdiv{
        text-align: left;
        margin-bottom: 10px;
    }
    .batchmbtn{
        float: right;
        margin: -20px 0px 10px 0px;
    }
    .tablestyle{
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-collapse: collapse;
        width: 100%;
        font-size: 14px;
        th{
            height: 40px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            background: #eee;
        }
        td{
            height: 36px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
        .resname{
            background: #fff;
        }
        .bgcolor{
            background: #d81e06;
            display: inline-block;
            width: 100%;
            line-height: 36px;
        }
    }
    .explaincolor{
        font-size: 14px;
        height: 40px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        background: #ddd;
        padding: 0px 20px;
        margin-top: 30px;
    }
    .stateicon{
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
    .mstyle{
        font-size: 14px;
        margin-left: 10px;
    }
    .mform{
        text-align: left;
        padding: 0px 10%;
    }
    .batchmform{
        text-align: left;
        .required-icon{
            color: #ff3030;
        }
        .el-checkbox{
            margin-right: 15px;
        }
        .el-input{
            width: 42%;
        }
    }
}
</style>

