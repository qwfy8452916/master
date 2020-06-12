<template>
    <div class="aftersaleapplylist">
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
                    <el-option v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
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
            <el-form-item label="服务单号">
                <el-input v-model="orderId"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userMobile"></el-input>
            </el-form-item>
            <el-form-item label="处理状态">
                <el-select v-model="handlestatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待处理" value="1"></el-option>
                    <el-option label="已通过" value="2"></el-option>
                    <el-option label="已拒绝" value="3"></el-option>
                    <el-option label="已撤销" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间">
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
        <el-table :data="aftersaleapplylistDataList" border stripe style="width:100%;" >
            <el-table-column prop="csCode" label="服务单号" width="80px" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="funcName" label="功能区"></el-table-column>
            <el-table-column prop="orderContactName" label="订单联系人" width="120px" align=center></el-table-column>
            <el-table-column prop="orderContactPhone" label="手机号" width="120px" align=center></el-table-column>
            <el-table-column prop="productName" label="商品名称" width="120px" align=center></el-table-column>
            <el-table-column prop="csType" label="售后类型" width="80px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.csType=='1'">换货</span>
                   <span v-if="scope.row.csType=='2'">退货退款</span>
                   <span v-if="scope.row.csType=='3'">迷你吧</span>
                   <span v-if="scope.row.csType=='4'">退款</span>
                   <span v-if="scope.row.csType=='5'">确认前退款</span>
               </template>
            </el-table-column>
            <el-table-column prop="prodCount" label="申请数量" align=center></el-table-column>
            <el-table-column prop="refoundAmount" label="退款金额" width="120px" align=center>
               <template slot-scope="scope">
                    <span v-if="scope.row.csType!='1'">{{scope.row.refoundAmount}}</span>
                    <span v-if="scope.row.csType=='1'"></span>
               </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="申请时间" width="120px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.createdAt==='1970-01-01 00:00:00'"></span>
                   <span v-if="scope.row.createdAt!='1970-01-01 00:00:00'">{{scope.row.createdAt}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="处理状态" width="120px" align=center>
                <template slot-scope="scope">
                   <span v-if="scope.row.status=='1'">待处理</span>
                   <span v-if="scope.row.status=='2'">已通过</span>
                   <span v-if="scope.row.status=='3'">已拒绝</span>
                   <span v-if="scope.row.status=='4'">已撤销</span>
               </template>
            </el-table-column>
            <el-table-column prop="handleTime" label="处理时间" width="120px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.handleTime==='1970-01-01 00:00:00'"></span>
                   <span v-if="scope.row.handleTime!='1970-01-01 00:00:00'">{{scope.row.handleTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120px" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.status==1 && authzData['F:BM_CS_AFTERSALEDEAL']" size="small" @click="handle(scope.$index, aftersaleapplylistDataList)">处理</el-button>
                    <el-button v-if="authzData['F:BM_CS_AFTERSALECHECK']" type="text" size="small" @click="lookdetail(scope.$index, aftersaleapplylistDataList)">查看详情</el-button>
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

        <!-- 处理弹窗 -->
          <el-dialog title="处理售后申请" :visible.sync='dialogVisibleDelete1' center width="30%" class="hanginput">
             <el-form>
                <el-form-item v-if='aftersaletype!=1' label="退款金额" label-width="130px">
                  <el-input v-model="money" :disabled="jinejudge"></el-input>
                </el-form-item>

                <el-form-item v-if='aftersaletype==1' label="商家发货物流公司" label-width="130px" maxlength="20">
                  <el-input v-model="logisticsgs"></el-input>
                </el-form-item>
                <el-form-item v-if='aftersaletype==1' label="商家发货物流单号" label-width="130px" maxlength="20">
                  <el-input v-model="businessnumber"></el-input>
                </el-form-item>

                <el-form-item label="备注" label-width="130px">
                  <el-input v-model="retreatremark" type="textarea" rows="3" maxlength="50"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button v-if="authzData['F:BM_CS_AFTERSALEDEALREFUSE']" type="primary" @click="retreatrefuse">拒 绝</el-button>
                <el-button v-if="authzData['F:BM_CS_AFTERSALEDEALPASS']" type="primary" @click="retreatadopt">通 过</el-button>
              </div>
          </el-dialog>
        <!-- 处理弹窗 -->


    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'selfaftersalelist',
    components:{
        resetButton
    },
    data(){
        return{
            authzData:'',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: '',
            inquireTime: [],
            aftersaleapplylistDataList: [],
            hotelId: '',
            handlestatus:'',
            loadingF:false,
            inquireFunctionName:'',
            functionList:[],
            hotelList: [],
            orderId: '',
            userRoomCode: '',
            userMobile: '',
            requestReason: '',
            requestReasonlist: [],
            dialogVisibleDelete1:false,
            jinejudge:true,
            aftersaletype:'',//售后处理类型判断
            refundmoney:'',  //用户申请的退款金额
            money:'',  //退款金额
            payment:'',  //实付金额
            retreatremark:'',  //备注
            logisticsgs:'',  //商家发货物流公司
            businessnumber:'',  //商家发货物流单号
             //处理事件
            aftersaleId:'',  //售后id
            loadingH: false,
        }
    },
    created(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        // this.oprId=this.$route.params.orgId
        this.getHotelList();
        this.aftersaleapplylist();
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.handlestatus = ''
            this.inquireFunctionName = ''
            this.orderId = ''
            this.userMobile = ''
            this.inquireTime = []
            this.aftersaleapplylist();
        },
         //查看详情
         lookdetail(index,row){
            let id=row[index].id
            this.$router.push({name:'selfaftersaledetail',query:{id}})
         },

         //处理
         handle(index,row){
          let that=this;
           this.aftersaletype=row[index].csType;
           this.refundmoney=row[index].refoundAmount;
           this.money=row[index].refoundAmount;
           this.payment=row[index].payAmount;
           this.aftersaleId=row[index].id;
           this.retreatremark='';
           that.dialogVisibleDelete1=true
           if(this.aftersaletype==4){
             that.logisticsgs='';
             that.businessnumber='';
             that.jinejudge=false
           }else if(this.aftersaletype==1){
             that.money='';
           }else if(this.aftersaletype==2){
             that.logisticsgs='';
             that.businessnumber='';
             that.jinejudge=true
           }
         },


        //拒绝
        retreatrefuse(){
          let that=this;
          that.handleaftersale(this.aftersaletype,3)
        },

        //通过
        retreatadopt(){
          let that=this;
          that.handleaftersale(this.aftersaletype,2)
        },

        //处理事件
        handleaftersale(csType,status){
            let that=this;
            if(csType==1){
              if(that.logisticsgs=='' && status==2){
                this.$message.error('请填写商家发货物流公司!')
                return false
              }
              if(that.businessnumber=='' && status==2){
                this.$message.error('请填写商家发货物流单号!')
                return false
              }
            }
            // if(csType==4){
            //   if(that.money>that.payment){
            //      this.$message.error('退款金额小于等于实付金额!')
            //      return false
            //   }
            //   if(that.money<that.refundmoney){
            //      this.$message.error('退款金额不能小于用户申请的金额!')
            //      return false
            //   }
            // }
            if(status==3 && that.retreatremark==''){
                 this.$message.error('请填写备注!')
                 return false
              }
              if(this.money!=''){
                this.money=parseFloat(this.money);
                this.money=this.money.toFixed(2);
              }

            const params = {
                supplierLogisticsInfo: this.logisticsgs,
                supplierLogisticsCode: this.businessnumber,
                autualRefoundAmount:this.money,
                handleRemark:this.retreatremark,
                result:status, //售后状态
            };
            this.$api.handleSaleApply(params,that.aftersaleId).then(response=>{
                that.dialogVisibleDelete1=false
                if(response.data.code==0){
                    this.$message.success('操作成功！');
                    that.aftersaleapplylist();
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.dialogVisibleDelete1=false
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

        },

        //功能区列表
        getFunctionList(fName){
            this.loadingF = true;
            const params = {
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

        //售后申请列表
        aftersaleapplylist(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                orgAs: 5,
                hotelId: this.hotelId,
                funcId:this.inquireFunctionName,
                csCode: this.orderId,
                mobile: this.userMobile,
                status: this.handlestatus,
                applTimeFrom: this.inquireTime[0],
                applTimeTo: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.PlatformAfterSale({params}).then(response=>{
                if(response.data.code==0){
                    this.aftersaleapplylistDataList = response.data.data.records;
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
            this.aftersaleapplylist();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                inquireFunctionName: this.inquireFunctionName,
                orderId: this.orderId,
                userMobile: this.userMobile,
                handlestatus: this.handlestatus,
                inquireTime:this.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.aftersaleapplylist();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.aftersaleapplylist();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.aftersaleapplylist();
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
</style>

