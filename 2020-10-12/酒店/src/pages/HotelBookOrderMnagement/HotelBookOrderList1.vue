<template>
    <div class="orderlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="订单状态">
                <!-- <el-select v-model="inquireStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待处理" value="0"></el-option>
                    <el-option label="已接单" value="1"></el-option>
                    <el-option label="已拒单" value="2"></el-option>
                    <el-option label="申请退订" value="3"></el-option>
                    <el-option label="已退订" value="4"></el-option>
                    <el-option label="已拒绝" value="5"></el-option>
                    <el-option label="已消费" value="6"></el-option>
                </el-select> -->
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.id"
                        :label="item.statusVal"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="inquireOrderCode"></el-input>
            </el-form-item>
            <el-form-item label="客人姓名">
                <el-input v-model="inquireUserName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquireUserPhone"></el-input>
            </el-form-item>
            <el-form-item label="房源名称">
                <el-select v-model="inquireResource" placeholder="请选择">
                    <el-option
                        v-for="item in resourceDataList"
                        :key="item.id"
                        :label="item.resourceName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入住日期">
                <el-date-picker
                    v-model="inquireCheckIn"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="核销状态">
                <el-select v-model="inquireIsVerification">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未核销" value="0"></el-option>
                    <el-option label="已核销" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="orderDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="orderCode" label="订单号" width="180px" align=center></el-table-column>
            <el-table-column prop="dealStatusName" label="状态" width="80px">
                <template slot-scope="scope">
                    <span :class="scope.row.dealStatusName == '待处理' || scope.row.dealStatusName == '申请退订'?'fontcolor':''">{{scope.row.dealStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="resourceName" label="房源名称" width="150px"></el-table-column>
            <el-table-column prop="cusName" label="联系人"></el-table-column>
            <el-table-column prop="cusPhone" label="联系电话" width="120px" align=center></el-table-column>
            <el-table-column prop="arrivalDate" label="入住日期" width="100px" align=center></el-table-column>
            <el-table-column prop="leaveDate" label="离店日期" width="100px" align=center></el-table-column>
            <el-table-column prop="roomCount" label="房间数" width="80px" align=center></el-table-column>
            <el-table-column prop="payTime" label="下单时间" width="160px" align=center></el-table-column>
            <el-table-column prop="writeOffStatus" label="核销状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.writeOffStatus == 1">已核销</span>
                    <span v-else>未核销</span>
                </template>
            </el-table-column>
            <el-table-column prop="writeOffRemark" label="核销备注" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="120px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="(scope.row.dealStatus == 0 || scope.row.dealStatus == 3) && authzlist['F:BH_BOOK_ORDER_VIEW']" type="text" size="small" class="fontcolor" @click="bookOrderDetail(scope.row.id)">处理</el-button>
                    <el-button v-else-if="authzlist['F:BH_BOOK_ORDER_VIEW']" type="text" size="small" @click="bookOrderDetail(scope.row.id)">查看详情</el-button>
                    <el-button v-if="scope.row.dealStatus != 0 && scope.row.dealStatus != 3 && scope.row.writeOffStatus == 0 && scope.row.dealStatus != 4" type="text" size="small" class="fontcolor" @click="bookOrderWriteOff(scope.row.id)">核销</el-button>
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
        <audio class="success" ref="audio" loop="loop" :src="url"></audio>
        <el-dialog :visible.sync="dislogVisibleWriteOff" width="30%">
            <span slot="title">是否确定核销？</span>
            <el-form :model="writeoffForm" label-width="80px">
                <el-form-item label="核销备注" prop="writeoffRemark">
                    <el-input type="textarea" :rows="3" v-model.trim="writeoffForm.writeoffRemark" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleWriteOff = false">取 消</el-button>
                <el-button type="primary" @click="writeoffEnsure('writeoffForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'HotelBookOrderList',
    components:{
        resetButton
    },
    data(){
        return {
            authzlist: {}, //权限数据
            hotelId: '',
            statusList: [],
            resourceDataList: [],
            inquireStatus: '',
            inquireOrderCode: '',
            inquireUserName: '',
            inquireUserPhone: '',
            inquireResource: '',
            inquireCheckIn: [],
            inquireIsVerification: '',
            orderDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
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
            dislogVisibleWriteOff: false,
            orderId: '',
            writeoffForm: {
                writeoffRemark: ''
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getOrderStatusList();
        this.getResourceList();
        this.bookOrderList();
    },
    destroyed(){
        let that=this;
        clearTimeout(that.dingshi)
        that.dingshi="leave"
    },
    methods: {
        resetFunc(){
            this.inquireStatus = ''
            this.inquireOrderCode = ''
            this.inquireUserName = ''
            this.inquireUserPhone = ''
            this.inquireResource = ''
            this.inquireCheckIn = []
            this.inquireIsVerification = ''
            this.bookOrderList();
        },
        //获取订单状态
        getOrderStatusList(){
            const params = {
                key: 'ROOM_ORDER_STATUS',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.statusList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                statusVal: item.dictName
                            }
                        })
                        const statusAll = {
                            id: '',
                            statusVal: '全部'
                        };
                        this.statusList.push(statusAll);
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
        //获取房源列表
        getResourceList(){
            const params = {
                hotelId: this.hotelId
            };
            // console.log(params);
            this.$api.getBookResourceList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.resourceDataList = result.data.map(item => {
                            return {
                                id: item.id,
                                resourceName: item.resourceName
                            }
                        });
                        const resourceAll = {
                            id: '',
                            resourceName: '全部'
                        };
                        this.resourceDataList.push(resourceAll);
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
        //订单列表
        bookOrderList(){
            let that=this;
            if(that.inquireCheckIn==null){
                that.inquireCheckIn=[];
            }
            let params={
                hotelId: this.hotelId,
                dealStatus: this.inquireStatus,
                orderCode: this.inquireOrderCode,
                cusName: this.inquireUserName,
                cusPhone: this.inquireUserPhone,
                resourceId: this.inquireResource,
                arrivalStartDate: this.inquireCheckIn[0],
                arrivalEndDate: this.inquireCheckIn[1],
                writeOffStatus: this.inquireIsVerification,
                pageNo: this.pageNum,
                pageSize: 10
            }
            if(that.flag==true){
                that.falg=false;
                that.$api.bookOrderList(params)
                    .then(response=>{
                        that.flag=true;
                        if(response.data.code==0){
                            that.orderDataList=response.data.data.records;
                            that.pageTotal=response.data.data.total
                            let countnum=0;
                            response.data.data.records.map(item=>{
                                  if(item.dealStatus==0 || item.dealStatus==3){
                                      ++countnum
                                  }
                                })
                            if(that.loadjudge==true){
                                that.totaldate=localStorage.bookOrdertotal || 0;
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
                                        if(that.windowjudge!=null){
                                           setTimeout(function(){
                                                that.windowjudge.close()
                                            },2000)
                                        }
                                        setTimeout(function(){
                                            if(that.$refs.audio.play){
                                                that.$refs.audio.pause();
                                            }
                                        },10000)
                                    }
                                    localStorage.setItem('bookOrdertotal', response.data.data.total);
                                }
                                if(that.dingshi!="leave"){
                                    that.dingshi=setTimeout(function(){
                                        that.bookOrderList(that.oprOgrId)
                                    },that.requesttime)
                                }
                            }
                        }else{
                            that.$alert(response.data.msg,"警告",{
                                confirmButtonText: "确定"
                            })
                        }
                    })
                    .catch(err=>{
                        that.flag=true;
                        that.$alert(err,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
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
        },

        //查询
        inquire(){
            this.loadjudge = false
            this.pageNum = 1;
            this.bookOrderList();
            this.$store.commit('setSearchList',{
                inquireStatus: this.inquireStatus,
                inquireOrderCode: this.inquireOrderCode,
                inquireUserName: this.inquireUserName,
                inquireUserPhone: this.inquireUserPhone,
                inquireResource: this.inquireResource,
                inquireCheckIn: this.inquireCheckIn,
                inquireIsVerification:this.inquireIsVerification
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.bookOrderList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.bookOrderList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.bookOrderList();
        },
        //处理、查看详情
        bookOrderDetail(id){
            this.$router.push({name: 'HotelBookOrderDetail', query: {id}});
        },
        //核销
        bookOrderWriteOff(id){
            this.orderId = id;
            this.dislogVisibleWriteOff = true;
        },
        writeoffEnsure(writeoffForm){
            const params = {
                remark: this.writeoffForm.writeoffRemark
            };
            const id = this.orderId
            this.$api.bookOrderWriteOff(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('核销成功！');
                        this.dislogVisibleWriteOff = false;
                        this.bookOrderList();
                    }else{
                        this.dislogVisibleWriteOff = false;
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
    }
}
</script>

<style lang="less" scoped>
.orderlist{
    .fontcolor{
        color: #d81e06;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>
