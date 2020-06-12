<template>
    <div class="alldelivery">
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
            <el-form-item label="功能区">
                <el-select 
                    v-model="inquireFunctionName" 
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    placeholder="请选择">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="配送类型" prop="delId">
                <el-select v-model="delId">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="迷你吧" value="1"></el-option>
                    <el-option label="客房服务" value="2"></el-option>
                    <el-option label="酒店商城" value="3"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="状态">
                <el-select class="termput" v-model="status" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="状态">
                <el-select v-model="status" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待确认" value="0"></el-option>
                    <el-option label="已确认" value="1"></el-option>
                    <el-option label="已发货" value="2"></el-option>
                    <!-- <el-option label="已配送" value="2"></el-option>
                    <el-option label="部分退款" value="3"></el-option>
                    <el-option label="全部退款" value="4"></el-option>
                    <el-option label="已收货" value="5"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input v-model="mobile"></el-input>
            </el-form-item>
            <el-form-item label="提交时间" prop="inquireTime">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="alldelivery" border stripe style="width:100%;">
            <el-table-column fixed prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
            <el-table-column prop="funcName" label="功能区"  min-width="80px">
                <template slot-scope="scope">
                    <span v-if="scope.row.funcId == 0">客房服务</span>
                    <span v-else>{{scope.row.funcName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="delivTypeName" label="配送类型" align=center></el-table-column> -->
            <el-table-column prop="roomFloor" label="楼层" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户id" min-width="80px" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户昵称" min-width="100px"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="status" label="状态" min-width="80px" align=center>
              <template slot-scope="scope">
                    <span v-if="scope.row.status=='0'">待确认</span>
                    <span v-if="scope.row.status=='1'">已确认</span>
                    <span v-if="scope.row.status=='2'">已配送</span>
                    <span v-if="scope.row.status=='3'">部分退款</span>
                    <span v-if="scope.row.status=='4'">全部退款</span>
                    <span v-if="scope.row.status=='5'">已收货</span>
                </template>
            </el-table-column>
            <el-table-column prop="contactPhone" label="用户手机号" min-width="120px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="80px" align=center>
                <template slot-scope="scope">
                    <!-- <el-button v-if="authzData['F:BO_DELIV_ALLSALEAPPLY_CHECKDETAIL']"  type="text" size="small" @click="Seeorder(scope.$index,alldelivery)">查看详情</el-button> -->
                    <el-button v-if="authzData['F:BO_DELIV_ALLSALEAPPLY_CHECKDETAIL']"  type="text" size="small" @click="Seeorder(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
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
    name: 'LonganAllDelivery',
    components:{
        LonganPagination,
        resetButton
    },
    data() {
        return{
            authzData: '',
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            currentPage: 1, //默认当前页码
            hotelList:[], //酒店数据
            hotelId:'',   //酒店id
            inquireFunctionName: '',
            functionList: [],
            loadingF: false,
            // delId:'',     //配送类型
            mobile:'',  //手机号
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            status:"",    //状态
            alldelivery: [],
            dialogVisibleDelete: false,
            inquireTime:[],  //提交时间
            // oprOgrId:"", //标识
            statusdata:[{"name":"全部","value":""},{"name":"待确认","value":"0"},{"name":"已确认","value":"1"},{"name":"已完成","value":"2"},{"name":"已取消","value":"3"}],
            audio: {
              currentTime: 0,
              maxTime: 0,
              playing: false,  //是否自动播放
              muted: false,   //是否静音
              speed: 1,
              waiting: true,
              preload: 'auto'
            },
        }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        // this.oprOgrId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getFunctionList();
        this.Getdata()
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.inquireFunctionName = ''
            this.status = ''
            this.mobile = ''
            this.inquireTime = []
            this.Getdata();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.Getdata();
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
        //功能区列表
        getFunctionList(fName){
            this.loadingF = true;
            const params = {
                isNeedRmsv: 1,
                funcName: fName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelFunctionList(params)
                .then(response => {
                    this.loadingF = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.functionList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                funcCnName: item.funcCnName
                            }
                        })
                        const functionAll = {
                            id: '',
                            funcCnName: '全部'
                        };
                        this.functionList.unshift(functionAll);
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
        remoteFunction(val){
            this.getFunctionList(val);
        },
        // selectdate(e){
        //    this.status=e
        // },
        //配送单列表
        Getdata(){
            let that=this;
            if(that.inquireTime==null){
               that.inquireTime=[];
            }
            let params = {
                orgAs: 2,
                hotelId: that.hotelId,
                funcId: that.inquireFunctionName,
                status: that.status,
                contactPhone: that.mobile,
                payStartTime: that.inquireTime[0],
                payEndTime: that.inquireTime[1],
                pageNo: that.pageNum,
                pageSize: that.pageSize,
                // hotelId:that.hotelId,
                // delivType:that.delId,
                // delivStatus:that.status,
                // cusPhone:that.mobile,
                // delivSubmitTimeStart:that.inquireTime[0],
                // delivSubmitTimeEnd:that.inquireTime[1],
            }
            this.$api.AllDeliverylist(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        that.alldelivery = result.data.records;
                        that.pageTotal = result.data.total
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
        //查看详情
        Seeorder(id){
            this.$router.push({name: 'LonganALLDelidetail', query: {id}});
        },
        // Seeorder(index,row){
        //     let id=row[index].id;
        //     let delivType=row[index].delivType;
        //     if(delivType==1 || delivType==2){
        //        this.$router.push({name:'LonganGuestMiniDelidetail',query:{id}});
        //     }else if(delivType==3){
        //        this.$router.push({name:'LonganALLDelidetail',query:{id}});
        //     }
        // },
        //查询
        inquire(){
            this.pageNum = 1;
            this.Getdata();
             this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                inquireFunctionName: this.inquireFunctionName,
                status: this.status,
                mobile: this.mobile,
                inquireTime:this.inquireTime
            })
        },
        // Getdata(){
        //     let that=this;
        //     if(that.inquireTime==null){
        //        that.inquireTime=[];
        //     }
        //     let params={
        //         pageNo:that.pageNum,
        //         pageSize:that.pageSize,
        //         hotelId:that.hotelId,
        //         delivType:that.delId,
        //         delivStatus:that.status,
        //         cusPhone:that.mobile,
        //         delivSubmitTimeStart:that.inquireTime[0],
        //         delivSubmitTimeEnd:that.inquireTime[1],
        //     }
        //     this.$api.AllDeliverylist({params}).then(response=>{
        //         if(response.data.code==0){
        //           that.pageTotal=response.data.data.total
        //           that.alldelivery=response.data.data.records
        //         }else{
        //           that.$alert(response.data.msg,"警告",{
        //             confirmButtonText: "确定"
        //            })
        //         }
        //     }).catch(err=>{
        //         that.$alert('asdadas',"警告",{
        //             confirmButtonText: "确定"
        //         })
        //     })
        // }

    }
}
</script>

<style lang="less" scoped>
.alldelivery{
    .pagination{
        margin-top: 20px;
    }
   .addcommodity{text-align:left;margin-bottom: 12px;}
   .adddateone{margin-right: 0px;}
}

</style>

<style lang="less">
.datetwotitle{
       color: #333;
       label.el-form-item__label{padding-left: 2px;}
   }
</style>

