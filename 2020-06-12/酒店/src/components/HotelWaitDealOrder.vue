<template>
    <div class="waitdealorder">
        <el-form :inline="true" align=left class="searchform">
            <!-- <el-form-item label="配送类型" prop="delId">
                <el-select v-model="delId">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="迷你吧" value="1"></el-option>
                    <el-option label="客房服务" value="2"></el-option>
                    <el-option label="酒店商城" value="3"></el-option>
                </el-select>
            </el-form-item> -->
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
        <el-table :data="waitdealorder" border stripe style="width:100%;">
            <!-- <el-table-column prop="delivTypeName" label="配送类型" align=center></el-table-column> -->
            <el-table-column prop="funcName" label="功能区" min-width="120px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.funcId == 0">客房服务</span>
                    <span v-else>{{scope.row.funcName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="roomFloor" label="楼层" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
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
            <el-table-column fixed="right" label="操作" min-width="100px" align=center is-center>
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.status == 0 && authzData['F:BH_DELIV_WAITDEALORDER_CONFIRM']" size="small" @click="Seeorder(scope.row.id)">确认</el-button>
                    <el-button type="text" v-if="scope.row.status != 0 && authzData['F:BH_DELIV_WAITDEALORDER_CHECKDETAIL']" size="small" @click="Seeorder(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="pagination">
            <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
       <audio class="success" ref="audio" loop="loop"
              :src="url">
      </audio>
    </div>

</template>

<script>
import resetButton from './resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'HotelWaitDealOrder',
    components:{
        HotelPagination,
        resetButton
    },
    data() {
        return{
            authzData: '',
            hotelId: '',
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            currentPage: 1, //默认当前页码
            // delId:'',     //配送类型
            inquireFunctionName: '',
            functionList: [],
            loadingF: false,
            mobile:'',  //手机号
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            waitdealorder: [],
            dialogVisibleDelete: false,
            inquireTime:[],  //提交时间
            url:"static/tips.mp3",
            audio: {
              currentTime: 0,
              maxTime: 0,
              playing: false,  //是否自动播放
              muted: false,   //是否静音
              speed: 1,
              waiting: true,
              preload: 'auto'
            },
            totaldate:[],  //缓存数据
            flag:true,    //加载判断
            dingshi:null,  //定时器赋值
            windowjudge:null,   //窗口判断
            requesttime:10000,    //请求时间
            loadjudge:true,      //加载执行
        }
    },
    created(){
        this.getsettingval()
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getFunctionList();
        this.Getdata()
    },
    destroyed(){
        let that=this;
        clearTimeout(that.dingshi)
        that.dingshi="leave"
    },
    methods: {
        resetFunc(){
            this.inquireFunctionName = ''
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
        //功能区列表
        getFunctionList(fName){
            this.loadingF = true;
            const params = {
                isNeedRmsv: 1,
                funcName: fName,
                hotelId: this.hotelId,
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
        Getdata(){
            let that=this;
            if(that.inquireTime==null){
                that.inquireTime=[];
            }
            let params={
                orgAs: 3,
                hotelId: that.hotelId,
                funcId: that.inquireFunctionName,
                status: 0,
                contactPhone: that.mobile,
                payStartTime: that.inquireTime[0],
                payEndTime: that.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
                if(that.flag==true){
                  that.falg=false;
                that.$api.AllDeliverylist(params).then(response=>{
                  that.flag=true;
                if(response.data.code==0){
                  that.waitdealorder=response.data.data.records;
                  that.pageTotal=response.data.data.total
                  let countnum=0;
                   response.data.data.records.map(item=>{
                        if(item.status==0){
                            ++countnum
                        }
                      })
                  if(that.loadjudge==true){

                    that.totaldate=localStorage.total || 0;
                    if(that.totaldate<response.data.data.total && countnum>0){
                        if(that.$refs.audio!==null){
                            if(window.longanJsObject){
                                if(window.longanJsObject.playOrderTip){
                                    window.longanJsObject.playOrderTip()
                                }else{
                                    that.openWin()
                                    if(that.$refs.audio.paused){
                                        that.$refs.audio.play();
                                    }
                                }
                            }else{
                                that.openWin()
                                if(that.$refs.audio.paused){
                                    that.$refs.audio.play();
                                }
                            }
                            setTimeout(function(){
                                that.windowjudge.close()
                            },2000)
                            setTimeout(function(){
                                if(that.$refs.audio.play){
                                    that.$refs.audio.pause();
                                }
                            },10000)
                        }
                        localStorage.setItem('total', response.data.data.total);
                    }
                    if(that.dingshi!="leave"){
                      that.dingshi=setTimeout(function(){
                            that.Getdata(that.oprOgrId)
                        },that.requesttime)
                    }
                 }
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.flag=true;
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
            }
        },
        //查看详情
        Seeorder(id){
            this.$router.push({name: 'HotelWaitOrderdetail', query: {id}});
        },
        //查询
        inquire(){
            this.loadjudge = false
            this.pageNum = 1;
            this.Getdata();
            this.$store.commit('setSearchList',{
                inquireFunctionName: this.inquireFunctionName,
                mobile: this.mobile,
                inquireTime:this.inquireTime
            })
        },

        openWin(){
            let that=this;
            let urladdress=window.location.href;
            that.windowjudge=window.open(urladdress,"_blank");
        },

        getsettingval(){
          let that=this;
          let params={
            key:"rmsvc.hotel.list.refresh.interval",
            // orgId:that.oprOgrId,
          }
          that.$api.getsettingval({params}).then(response=>{
            if(response.data.code==0){
              that.requesttime=parseInt(response.data.data)*1000
            }
          }).catch(err=>{
             that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
          })
        }

    }
}
</script>

<style lang="less" scoped>
.waitdealorder{
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

