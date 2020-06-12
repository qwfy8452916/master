<template>
    <div class="WaiteEntryRecord">
        <el-form :model="formdata" ref="formdata" :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    v-model="formdata.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    @change="selectHotel"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="楼层房间号">
               <el-input v-model="formdata.roomFloorAndCode"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select
                    v-model="formdata.funId"
                    filterable
                    remote
                    >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in orderTypeData"
                        :key="item.index"
                        :label="item.funcCnName"
                        :value="item.id"
                    ></el-option>
                 </el-select>
            </el-form-item>

            <el-form-item label="下单时间" prop="inquireTime">
                <el-date-picker
                    v-model="formdata.inquireTime"
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
                <!-- <el-button type="primary" @click="reset('formdata')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="WaiteEntryRecordDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="楼层房间号" align=center>
              <template slot-scope="scope">
                   <span>{{scope.row.roomFloor}}-{{scope.row.roomCode}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="funcName" label="订单类型" align=center></el-table-column>
            <el-table-column prop="delivCode" label="配送单号" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodShowName" label="商品显示名称"></el-table-column>
            <el-table-column prop="prodAmount" label="商品金额" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="revenueAs" label="分成身份" align=center>
               <template slot-scope="scope">
                  <span v-if="scope.row.revenueAs==2">平台</span>
                  <span v-if="scope.row.revenueAs==3">酒店</span>
                  <span v-if="scope.row.revenueAs==4">供应商</span>
                  <span v-if="scope.row.revenueAs==7">合伙人</span>
                  <span v-if="scope.row.revenueAs==8">加盟商</span>
               </template>
            </el-table-column>
            <el-table-column prop="revenueAmount" label="待入账金额" align=center></el-table-column>
            <el-table-column prop="payCompleteTime" label="下单时间" align=center></el-table-column>
            <el-table-column prop="id" label="操作" align=center>
               <template slot-scope="scope">
                  <el-button v-if="authzlist['F:BM_FIN_WAITINCOME_DETAIL']" type="text" @click="lookdetail(scope.row.id)">查看详情</el-button>
               </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'MerchantWaiteEntryRecord',
    components:{
        resetButton
    },
    data(){
        return{
            authzlist: {}, //权限数据
            orgId:'',
            hotelList:[],
            orderTypeData:[],
            formdata:{
              hotelId:'',
              roomFloorAndCode:'',
              funId:'',
              inquireTime: [],
            },
            WaiteEntryRecordDataList: [],

            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: '',
            token:'',
            loadingH:false,
        }
    },
    created(){

    },

    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.token = localStorage.getItem('Authorization');
        this.orgId=localStorage.orgId

        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this.formdata[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.HotelFuncList();
        this.WaiteEntryRecord();
    },
    methods: {
        resetFunc(){
            this.formdata.hotelId = ''
            this.formdata.roomFloorAndCode = ''
            this.formdata.funId = ''
            this.formdata.inquireTime = []
            this.WaiteEntryRecord();
        },
         //查看详情
         lookdetail(id){
            this.$router.push({name:'MerchantWaiteEntryRecordDetail',query:{id}})
         },


        WaiteEntryRecord(){
            if(this.formdata.inquireTime == null){
                this.formdata.inquireTime = [];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                orgId:this.orgId,
                hotelId:this.formdata.hotelId,
                roomFloorAndCode:this.formdata.roomFloorAndCode,
                funId:this.formdata.funId,
                startTime: this.formdata.inquireTime[0],
                endTime: this.formdata.inquireTime[1],
                pendingStatus:0,
            };
            this.$api.getWaitDivide({params}).then(response=>{
                if(response.data.code==0){
                    this.WaiteEntryRecordDataList = response.data.data.records;
                    this.pageTotal = response.data.data.total
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

        },



        //查询
        inquire(){
            this.pageNum = 1;
            this.WaiteEntryRecord();
            this.$store.commit('setSearchList',{
                hotelId: this.formdata.hotelId,
                roomFloorAndCode: this.formdata.roomFloorAndCode,
                funId: this.formdata.funId,
                inquireTime:this.formdata.inquireTime
            })
        },


        //获取所有酒店名称
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 5,
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


        selectHotel(){
          this.formdata.funId = ''
          this.HotelFuncList()
        },


        //获取订单类型
         HotelFuncList(){
           let that=this;
           let params={
             isNeedBookRoom:1,
             isNotNeedDef:1,
             hotelId:that.formdata.hotelId
           }
           this.$api.hotelFunctionList(params).then(response=>{
              let result=response.data;
              if(result.code==0){
                that.orderTypeData=result.data.records
              }else{
                that.$message.error(result.msg)
              }
           }).catch(error=>{
             that.$alert(error,"警告",{
               confirmButtonText:"确定"
             })
           })
         },




        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.WaiteEntryRecord();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.WaiteEntryRecord();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.WaiteEntryRecord();
        }
    }
}
</script>

<style lang="less" scoped>
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
    .cell a{
        display: block;
        margin-bottom: 10px;
    }
    .export{
        float: left;
        margin-bottom: 10px;
    }
</style>

