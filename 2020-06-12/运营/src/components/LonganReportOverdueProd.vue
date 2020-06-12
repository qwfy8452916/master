<template>
    <div class="prodlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间号">
                <el-input v-model="inquireRoomCode"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-select 
                    v-model="inquireProdName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预计过期时间">
                <el-date-picker
                    v-model="inquireOverdueTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="overdueProdDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="格子" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" min-width="160px"></el-table-column>
            <el-table-column prop="replTime" label="补货时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="prodWarrantyPeriod" label="预计过期时间" min-width="160px" align=center></el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganReportOverdueProd',
    components: {
        LonganPagination,
        resetButton
    },
    data(){
        return{
            authzData: '',
            hotelList: [],
            loadingH: false,
            inquireHotelName: '',
            inquireRoomCode: '',
            prodList: [],
            loadingP: false,
            inquireProdName: '',
            inquireOverdueTime: [],
            overdueProdDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
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
        this.getProdList();
        this.getnowdate();
        this.overdueProdList();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = '';
            this.inquireRoomCode = '';
            this.inquireProdName = '';
            this.inquireOverdueTime = [];
            this.overdueProdList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.overdueProdList();
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
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: '',
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            prodName: '全部'
                        };
                        this.prodList.unshift(prodAll);
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
        remoteProd(val){
            this.getProdList(val);
        },
        //过期商品列表
        overdueProdList(){
            if(this.inquireOverdueTime == null){
                this.inquireOverdueTime = [];
            }
            const params = {
                hotelId: this.inquireHotelName,
                roomCode: this.inquireRoomCode,
                warrantyDateFrom: this.inquireOverdueTime[0],
                warrantyDateTo: this.inquireOverdueTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            // console.log(params);
            this.$api.overdueProdList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.overdueProdDataList = result.data.records;
                        this.pageTotal = result.data.total;
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
        //获取近半个月日期
        getnowdate(){
            let startdate = new Date();
            let enddate = new Date(startdate.getTime() + 24*60*60*1000*15);
            let sYY = startdate.getFullYear();
            let sMM = startdate.getMonth()+1 < 10?'0'+(startdate.getMonth()+1):startdate.getMonth()+1;
            let sDD = startdate.getDate() < 10?'0'+startdate.getDate():startdate.getDate();
            let sData = sYY+'-'+sMM+'-'+sDD;
            let eYY = enddate.getFullYear();
            let eMM = enddate.getMonth()+1 < 10?'0'+(enddate.getMonth()+1):enddate.getMonth()+1;
            let eDD = enddate.getDate() < 10?'0'+enddate.getDate():enddate.getDate();
            let eData = eYY+'-'+eMM+'-'+eDD;
            this.inquireOverdueTime = [sData, eData];
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.overdueProdList();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                inquireRoomCode:this.inquireRoomCode,
                inquireProdName: this.inquireProdName,
                inquireOverdueTime: this.inquireOverdueTime
            })
        },
    }
}
</script>

<style lang="less" scoped>
.prodlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

