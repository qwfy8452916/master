<template>
    <div class="customerWaitIn">
        <el-form :inline="true" :model="query" ref="query" align=left class="searchform">
            <el-form-item label="ID">
               <el-input v-model="query.id"></el-input>
            </el-form-item>
            <el-form-item label="openid">
               <el-input v-model="query.openId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
               <el-input v-model="query.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
               <el-input v-model="query.phone"></el-input>
            </el-form-item>
            <el-form-item label="收入类型">
              <el-select
              v-model="query.incomeType"
              >
                  <el-option v-for="item in incomeTypedata"
                  :label="item.dictName"
                  :value="item.dictValue"
                  :key="item.id"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-select
                    v-model="query.hotelId"
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
            <el-form-item label="订单类型">
                <el-select
                    v-model="query.funId"
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
            <el-form-item label="楼层房间号">
               <el-input v-model="query.roomFloorAndCode"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="inquireTime">
                <el-date-picker
                    v-model="query.inquireTime"
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
        <el-table :data="customerWaitInDataList" border stripe style="width:100%;" >
            <el-table-column prop="id" label="ID" align=center></el-table-column>
            <el-table-column prop="openId" label="openid" align=center></el-table-column>
            <el-table-column prop="empOrCusName" label="昵称" align=center></el-table-column>
            <el-table-column prop="empOrCusPhone" label="手机号" align=center></el-table-column>
            <el-table-column prop="incomeType" label="收入类型" align=center>
               <template slot-scope="scope">
                  <span v-if="scope.row.incomeType==1">分享奖励</span>
                  <span v-if="scope.row.incomeType==2">管理奖励</span>
               </template>
            </el-table-column>
            <el-table-column prop="hotelName" label="酒店" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="楼层房间号" align=center>
               <template slot-scope="scope">
                  <span>{{scope.row.roomFloor}}-{{scope.row.roomCode}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="funcName" label="订单类型" align=center></el-table-column>
            <el-table-column prop="orderCode" label="订单号" align=center></el-table-column>
            <el-table-column prop="delivCode" label="配送单号" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodShowName" label="商品显示名称" align=center></el-table-column>
            <el-table-column prop="prodAmount" label="商品金额" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="pendingAmount" label="待入账金额" align=center></el-table-column>
            <el-table-column prop="payCompleteTime" label="下单时间" align=center></el-table-column>
            <el-table-column label="操作" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_FIN_CUSTWAITINCOM_DETAIL']" type="text" size="small" @click="lookdetail(scope.row.id)">详情</el-button>
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
    name: 'LonganCustomerWaitIn',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            oprId:'',
            customerWaitInDataList: [],
            hotelList:[],
            orderTypeData:[], //订单类型
            incomeTypedata:[],
            query:{
              id: '',
              openId:'',
              name:'',
              phone:'',
              incomeType:'',
              hotelId:'',
              funId:'',
              roomFloorAndCode:'',
              inquireTime:[],
              userId:'',
            },
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            loadingH:false,
        }
    },
    created(){

         (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
         this.query.userId=this.$route.query.id

    },

    mounted(){
        this.oprId = localStorage.oprId;
        this.query.organId=this.$route.query.organId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.query[item] = this.$store.state.searchList[item]
            }
        }

        this.getIncomeType();
        this.HotelFuncList();
        this.getHotelList();
        this.customerWaitIn();
    },
    methods: {
        resetFunc(){
            this.query.id = ''
            this.query.openId=''
            this.query.name=''
            this.query.phone=''
            this.query.incomeType=''
            this.query.hotelId = ''
            this.query.funId=''
            this.query.roomFloorAndCode=''
            this.query.userId=''
            this.query.inquireTime = []
            this.customerWaitIn();
        },
          //查看详情
         lookdetail(id,orgId){
            this.$router.push({name:'LonganCustomerWaitInDetail',query:{id}})
         },

         //重置
         resetbtn(query){
            this.$refs[query].resetFields();
         },


         //用户待入账收入
         customerWaitIn(){
            if(this.query.inquireTime==null){
              this.query.inquireTime=[];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                id:this.query.id,
                openId:this.query.openId,
                name:this.query.name,
                phone:this.query.phone,
                incomeType:this.query.incomeType,
                hotelId:this.query.hotelId,
                funId:this.query.funId,
                roomFloorAndCode:this.query.roomFloorAndCode,
                startTime:this.query.inquireTime[0],
                endTime:this.query.inquireTime[1],
                userId:this.query.userId
            };
            this.$api.waitInlist({params},2).then(response=>{
                if(response.data.code==0){
                    this.customerWaitInDataList = response.data.data.records;
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


         //获取所有酒店名称
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

        selectHotel(){
          this.query.funId=""
          this.HotelFuncList()
        },

        //获取订单类型
         HotelFuncList(){
           let that=this;
           let params={
             isNeedBookRoom:1,
             isNotNeedDef:1,
             hotelId:that.query.hotelId
           }
           this.$api.HotelFuncList(params).then(response=>{
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

         //获取收入类型
        getIncomeType(){
          let that=this;
          let params={
             key:'INCOME_TYPE',
             orgId:0,
             parentKey:'',
             parentValue:'',
          }
          this.$api.basicDataItems(params).then(response=>{
             if(response.data.code=='0'){
                that.incomeTypedata=response.data.data.map(item=>{
                   return {
                     dictName:item.dictName,
                     dictValue:parseInt(item.dictValue)
                   }
                })
                let allObject={
                  dictName:"全部",
                  dictValue:""
                }
                that.incomeTypedata.unshift(allObject)
             }else{
               that.$alert(response.data.msg,"警告",{
                 confirmButtonText:"确定"
               })
             }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },



        //查询
        inquire(){
            this.pageNum = 1;
            this.customerWaitIn();
            this.$store.commit('setSearchList',{
                id: this.query.id,
                openId: this.query.openId,
                name: this.query.name,
                phone: this.query.phone,
                incomeType:this.query.incomeType,
                hotelId: this.query.hotelId,
                funId: this.query.funId,
                roomFloorAndCode: this.query.roomFloorAndCode,
                inquireTime:this.query.inquireTime,
                userId:this.query.userId
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.customerWaitIn();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.customerWaitIn();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.customerWaitIn();
        }
    }
}
</script>

<style lang="less" scoped>
.customerWaitIn{
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
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
}

</style>

