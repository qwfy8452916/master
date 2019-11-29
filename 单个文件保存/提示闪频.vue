<template>
    <div class="waitdealorder">
        <el-form :inline="true" align=left class="searchform">

            <el-form-item label="配送类型" prop="delId">
                <el-select v-model="delId">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="迷你吧" value="1"></el-option>
                    <el-option label="客房服务" value="2"></el-option>
                    <el-option label="酒店商城" value="3"></el-option>
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
        </el-form>


        <el-table :data="waitdealorder" border stripe style="width:100%;">
            <el-table-column prop="delivTypeName" label="配送类型" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align=center></el-table-column>
            <el-table-column prop="delivStatus" label="状态" align=center>
              <template slot-scope="scope">
                    <span v-if="scope.row.delivStatus==0">待确认</span>
                    <span v-if="scope.row.delivStatus==1">已确认</span>
                    <span v-if="scope.row.delivStatus==2">已完成</span>
                    <span v-if="scope.row.delivStatus==3">已取消</span>
                </template>
            </el-table-column>
            <el-table-column prop="cusPhone" label="用户手机号" align=center></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" align=center is-center>
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.delivStatus==0 && authzData['F:BH_DELIV_WAITDEALORDER_CONFIRM']" size="small" @click="Seeorder(scope.$index, waitdealorder)">确认</el-button>
                    <el-button type="text" v-if="scope.row.delivStatus!=0 && authzData['F:BH_DELIV_WAITDEALORDER_CHECKDETAIL']" size="small" @click="Seeorder(scope.$index, waitdealorder)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="pagination">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :pager-count = "11"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
       <audio class="success" ref="audio" loop="loop"
              :src="url">
      </audio>
    </div>

</template>

<script>
export default {
    name: 'HotelWaitDealOrder',
    data() {
        return{
            authzData: '',
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            delId:'',     //配送类型
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
        this.Getdata()
    },

    destroyed(){
      let that=this;
         clearTimeout(that.dingshi)
         that.dingshi="leave"
    },
    methods: {
        //查询
        inquire(){
          this.loadjudge=false
          this.Getdata();
        },

        //查看
         Seeorder(index,rows){
            let id=rows[index].id
            this.$router.push({name:'HotelWaitOrderdetail',query:{id}});
         },

        selectdate(e){
           this.status=e
        },


        current(){
            this.pageNum = this.currentPage;
            this.Getdata();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },

        Getdata(){
            let that=this;
             if(that.inquireTime==null){
               that.inquireTime=[];
            }
            let params={
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                delivType:that.delId,
                delivStatus:0,
                cusPhone:that.mobile,
                delivSubmitTimeStart:that.inquireTime[0],
                delivSubmitTimeEnd:that.inquireTime[1],
            }
                if(that.flag==true){
                  that.falg=false;
                that.$api.AllDeliverylist({params}).then(response=>{
                  that.flag=true;
                if(response.data.code==0){
                  that.waitdealorder=response.data.data.records;
                  that.pageTotal=response.data.data.total

                  if(that.loadjudge==true){

                    that.totaldate=localStorage.total || 0;
                    if(that.totaldate<response.data.data.total){
                      if(that.$refs.audio!==null){
                            that.openWin()
                            if(that.$refs.audio.paused){
                                that.$refs.audio.play();
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

