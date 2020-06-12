<template>
  <div class="WaitSendMessage">
      <el-form align="left" :inline="true">
         <el-form-item label="消息模板code">
              <el-select v-model="codeval">
                  <el-option
                  filterable
                  placeholder="请选择"
                  v-for="item in MessageList"
                  :label="item.tpTitle"
                  :value="item.tpCode"
                  :key="item.tpCode"
                  >
                  </el-option>
              </el-select>
         </el-form-item>
         <el-form-item label="业务代码">
               <el-input v-model="businesscode"></el-input>
         </el-form-item>
         <el-form-item label="业务消息id">
               <el-input v-model="buinessId"></el-input>
         </el-form-item>

         <el-form-item label="发送时间">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
      </el-form>
      <el-table :data="WaitSendData" stripe style="width:100%">
          <el-table-column fixed prop="tpCode" label="消息模板code" align="center"></el-table-column>
          <el-table-column prop="businessCode" label="业务代码" align="center"></el-table-column>
          <el-table-column prop="processId" label="业务消息id" align="center"></el-table-column>
          <el-table-column prop="ctpType" label="消息类型" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.ctpType==='WX_MP_T'">模板消息</span>
                  <span v-if="scope.row.ctpType==='WX_MINI_D'">订阅消息</span>
                  <span v-if="scope.row.ctpType==='PHONE_M'">短信消息</span>
              </template>
          </el-table-column>
          <el-table-column prop="content" label="消息内容" align="center">
              <template slot-scope="scope">
                  <el-button v-if="authzData['F:BO_MSG_WAITEMSG_MSGCONTENT']" @click="checkMessage(scope.row.content)" type="text" size="small">查看</el-button>
              </template>
          </el-table-column>
          <el-table-column prop="scheduleAt" label="发送时间" align="center"></el-table-column>
          <el-table-column prop="receiverVoucher" label="接收人凭证" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
      </div>

      <el-dialog class="messageone" :visible.sync="showhidemsgone">
           <div class="msghang">
              <span class="msg_title">时间：</span><span>2019-05-12 12:25:24</span>
           </div>
           <div class="msghang">
              <span class="msg_title">内容：</span><div class="msgcontent">{{Msgcontent}}</div>
           </div>
        </el-dialog>

        <!-- <el-dialog class="messagetwo" title="酒店预订成功通知" :visible.sync="showhidemsgtwo">
           <div class="msgDate">4月27日 16:16</div>
           <div class="orderbox">
              <div class="ordertitle">订单号</div>
              <div class="ordernumber">339208499</div>
           </div>
           <div class="msgtwohang">
               <span class="msgtwohang_title">时间</span><span>2016年12月05日 12:30</span>
           </div>
           <div class="msgtwohang">
               <span class="msgtwohang_title">酒店</span><span>微信大厦</span>
           </div>
           <div class="msgtwohang">
               <span class="msgtwohang_title">地点</span><span>广州海珠路111号</span>
           </div>
        </el-dialog> -->

  </div>
</template>
<script>
import resetButton from './resetButton'
   export default {
     name:"LonganWaitSendMessage",
     components:{
        resetButton
    },
     data(){
       return {
          authzData:'',
          pageSize:10,   //每页显示条数
          pageTotal: 1,   //默认总条数
          currentPage: 1, //默认当前页码
          pageNum: 1,   //实际当前页码
          MessageList:[], //模板数据
          codeval:'',  //code
          businesscode:'',  //业务代码
          buinessId:'',  //业务消息id
          dateRange:[],  //发送时间
          Msgcontent:'',  //消息内容
          showhidemsgone:false,
          showhidemsgtwo:false,
          WaitSendData:[
            {name:'1',check:"查看"},
            {name:'1',check:"查看"},
          ],  //待发送列表数据

       }
     },
     mounted(){
         (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
         if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
         this.waiteSendMsg();
         this.LonganMessagelist();
     },
     methods:{
       checkMessage(content){
         this.Msgcontent=content
         this.showhidemsgone=true;
       },
       resetFunc(){
            this.codeval = ''
            this.businesscode = ''
            this.buinessId = ''
            this.dateRange = []
            this.waiteSendMsg();
        },
       //消息模板列表
        LonganMessagelist(){
            let that=this;
            const params = {
                isPage:false,
            };
            this.$api.getMessageList({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        that.MessageList = result.data;
                    }else{
                        that.$message.error('消息模板列表获取失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
          },

       search(){
         this.waiteSendMsg();
         this.$store.commit('setSearchList',{
                codeval: this.codeval,
                businesscode: this.businesscode,
                buinessId: this.buinessId,
                dateRange:this.dateRange
            })

       },

       //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganMessagelist();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganMessagelist();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganMessagelist();
        },

       waiteSendMsg(){
         let that=this;
         let params={
              pageNo: this.pageNum,
              pageSize: this.pageSize,
              tpCode:that.codeval,
              businessCode:that.businesscode,
              processId:that.buinessId,
              scheduleStartAt:that.dateRange[0],
              scheduleEndAt:that.dateRange[1],
           }

         this.$api.waiteSendMsg({params}).then(response=>{
            if(response.data.code=='0'){
              that.WaitSendData=response.data.data.records;
              that.pageTotal=response.data.data.total
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
       }

     }
   }
</script>

<style lang="less">
   .WaitSendMessage{
    .el-dialog__header{text-align: left;}
    .el-form-item__content{text-align: left;}
    .el-dialog__footer{text-align: center;}
    .messageone .el-dialog{width: 35%;}
    .messagetwo .el-dialog{width: 40%;}
    .msghang{
       .msgcontent{width: calc(100% - 50px);display: inline-block;}
    }

  }
</style>

<style lang="less" scoped>
.WaitSendMessage{
    .pagination{
        margin-top: 20px;
    }
    .el-dialog__header{
        text-align: left;
      }

    .messageone{
       .msghang{text-align: left;clear: both;
          .msg_title{float: left;display: inline-block;width: 50px;text-align: right;
          .msgcontent{display: inline-block !important;float: left;}
         }
       }

       }
    }
    .messagetwo{
      .msgtwohang{margin-bottom: 20px;text-align: left;
        .msgtwohang_title{margin-right: 10px;}
      }
      .msgDate{text-align: left;position: relative;top: -38px;color: #adadad;}
       .orderbox{text-align: center;
         padding-bottom: 30px;border-bottom:1px solid #f9f9f9;
         .ordertitle{color: #999;}
         .ordernumber{font-size: 36px;}
    }

 }
</style>
