<template>
  <div class="marketingDetail">
    <div class="title">短信详情</div>
    <div class="libox">
      <div class="name">消息状态</div>
      <div class="val">
        <span v-if="detailData.status == 0">待发送</span>
        <span v-if="detailData.status == 1">发送中</span>
        <span v-if="detailData.status == 2">已发送</span>
      </div>
    </div>
    <div class="libox">
      <div class="name">组织</div>
      <div class="val">{{detailData.orgName}}</div>
    </div>
    <div class="libox">
      <div class="name">消息模板</div>
      <div class="val">{{detailData.ctpName}}</div>
    </div>
    <div class="libox">
      <div class="name">内容</div>
      <div class="val">{{detailData.finalContent}}</div>
    </div>
    <div class="libox">
      <div class="name">短信内容</div>
      <div>
        <div class="libox libox2" v-for="item in parameter" :key="item.seq">
          <div class="name">{{item.title}}</div>
          <div class="val">{{item.val}}</div>
        </div>
      </div>
    </div>
    <div class="libox">
      <div class="name">用户来源</div>
      <div class="val">{{detailData.userSourceText}}</div>
    </div>
    <div class="libox">
      <div class="name">用户</div>
      <el-button type="primary" @click="showuser">查看用户列表</el-button>
    </div>
    <div class="libox">
      <div class="name"></div>
      <div class="val fontcolor">用户总数量 {{detailData.totalCount}}；成功数量 {{detailData.successCount}}；失败数量 {{detailData.failedCount}}</div>
    </div>
    <div class="libox">
      <div class="name">结算状态</div>
      <div class="val">{{detailData.settleStatusText}}</div>
    </div>
    <div class="libox">
      <div class="name">结算费用</div>
      <div class="val">￥{{detailData.totalFee}}</div>
    </div>
    <div class="libox">
      <div class="name">操作人</div>
      <div class="val">{{detailData.empName}}</div>
    </div>
    <div class="libox">
      <div class="name">发送时间</div>
      <div class="val">{{detailData.createdAt}}</div>
    </div>



    <div class="alignleft">
      <el-button @click="cancelBtn">返 回</el-button>
    </div>

    <el-dialog title="查看用户列表" :visible.sync="dialogTableVisible">
      <el-form align="left" :inline="true">
          <el-form-item label="接收人手机号">
              <el-input v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item label="消息状态">
            <el-select v-model="messageStatus">
                <el-option
                v-for="item in messageStatusData"
                :key="item.dictValue"
                :value="item.dictValue"
                :label="item.dictName"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="get_userlist" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
              <resetButton @resetFunc='resetFunc'/>
          </el-form-item>
      </el-form>
      <el-table :data="userlist" stripe style="width:100%">
        <el-table-column fixed prop="smsRecId" label="短信发送记录id" align="center"></el-table-column>
        <el-table-column prop="mobile" label="接收人手机号" align="center"></el-table-column>
        <el-table-column prop="statusText" label="状态" align="center"></el-table-column>
        <el-table-column prop="failedReason" label="发送失败原因" align="center"></el-table-column>
        <el-table-column prop="sentTime" label="发送完成时间" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <div class="selebox">
          <div>每页显示条数</div>
          <el-select v-model="pageSize" placeholder="请选择" @change="get_userlist">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
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
    </el-dialog>

  </div>
</template>

<script>
import resetButton from '@/components/resetButton'
export default {
  name: "LonganMarketingDetail",
  components:{
    resetButton
  },
  data() {
    return {
      authzData: '',
      detailid: '',
      detailData: '',
      dialogTableVisible: false,
      pageSize:10,   //每页显示条数
      pageTotal: 1,   //默认总条数
      currentPage: 1, //默认当前页码
      pageNum: 1,   //实际当前页码
      userlist: [],
      mobile: '',
      messageStatus: '',
      messageStatusData: [],
      hotelId: '',
      parameter: '',
      options: [10,20,50]
    };
  },
  mounted() {
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    this.detailid=this.$route.query.id;
    this.hotelId=localStorage.hotelId;
    this.getDetaildata();
    this.get_userlist();
    this.getType();
  },
  methods: {
      resetFunc(){
          this.mobile = '';
          this.messageStatus = '';
          this.get_userlist();
      },
      //返回
      cancelBtn(){
        this.$router.push({name:"LonganMarketingSMS"})
      },
      getDetaildata(){
        const that = this;
        this.$api.smsrecordDetail(that.detailid).then(response=>{
          if(response.data.code=='0'){
              that.detailData = response.data.data;
              that.get_contentTempDetail(response.data.data.ctpCode, response.data.data.paramsValueActual);
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
      get_contentTempDetail(ctpCode, paramsValueActual){
        const that = this;
        const params="";
        that.$api.contentTempDetail(params, ctpCode).then(response => {
          const result = response.data;
          if(result.code == '0'){
              let parameterlist = JSON.parse(result.data.platformParamsTransRule);
              let paramsValueActuallist = JSON.parse(paramsValueActual);
              for(let i=0;i<parameterlist.length;i++) {
                parameterlist[i].val = paramsValueActuallist[i+1];
              }
              that.parameter = parameterlist;
          }else{
              that.$message.error('消息内容模板详情获取失败！');
          }
        })
        .catch(error => {
            that.$alert(error,"警告",{
                confirmButtonText: "确定"
            })
        })
      },
      get_userlist(){
        let that=this;
        console.log(that.pageSize);
        let params={
          mobile: that.mobile,
          status: that.messageStatus,
          pageNo: that.pageNum,
          pageSize: that.pageSize,
        }
        this.$api.getsmsrecorditem(that.detailid, {params}).then(response=>{
            if(response.data.code=='0'){
              that.userlist = response.data.data.records;
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
      //消息状态
      getType(){
        let that=this;
        let params={
            key:'MSG_SMS_ITEM_STATUS',
            orgId:0
        }
        this.$api.basicDataItems(params).then(response=>{
            if(response.data.code=='0'){
                that.messageStatusData=response.data.data
                const allType={
                    dictName:"全部",
                    dictValue:""
                }
                that.messageStatusData.unshift(allType)
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
      showuser(){
        this.dialogTableVisible = true;
      },
      //页面跳转
      current(){
          this.pageNum = this.currentPage;
          this.get_userlist();
      },
      //上一页
      prev(){
          this.pageNum = this.pageNum - 1;
          this.get_userlist();
      },
      //下一页
      next(){
          this.pageNum = this.pageNum + 1;
          this.get_userlist();
      },
  }
};
</script>
<style lang="less" scoped>
  .marketingDetail{
      text-align: left;
      .pagination{
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
      }
      .title{
          font-weight: bold;
          margin-bottom: 20px;
      }
      .libox{
        width: 100%;
        font-size: 16px;
        margin-bottom: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 20px;
        .name{
          margin-right: 15px;
          width: 70px;
          text-align: right;
          color: #808080;
        }
        .fontcolor{
          color: red;
        }
        .el-textarea{
          width: 400px;
        }
        .libox2{
          align-items: center;
        }
      }
      .selebox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .el-select{
          width: 80px;
          margin-left: 10px;
        }
      }
  }
</style>