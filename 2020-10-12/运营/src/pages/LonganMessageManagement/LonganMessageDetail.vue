
<template>
  <div class="messageTest">
    <el-form :model="tempData" ref="tempData" align="left">
      <el-form-item label="code" label-width="80px" prop="tpCode">
        <el-input :disabled="checkProhibit" v-model="tempData.tpCode" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="名称" label-width="80px" prop="tpTitle">
        <el-input :disabled="checkProhibit" v-model="tempData.tpTitle" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item class label="接收人" label-width="80px" prop="receiverUserIds">
        <el-input
          :disabled="checkProhibit"
          v-model="tempData.receiverUserIds"
          :rows="3"
          type="textarea"
        ></el-input>
      </el-form-item>
      <div class="channeltext">途径</div>
      <el-form-item class="switchstyle" label="控制优先级开关" label-width="120px" prop="isPrioritySend">
        <el-switch
          :disabled="switchjudge || checkProhibit"
          v-model="tempData.isPrioritySend"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>

      <div v-for="(item,index) in tempData.templateDetail" :key="index">
        <el-form-item class="dingyue" label-width="120px">
          <el-checkbox
            :disabled="checkProhibit"
            :label="item.title"
            v-model="item.ctpType"
            :true-label="item.selectType"
            :false-label="item.noselectType"
          ></el-checkbox>
        </el-form-item>
        <div class="channeltext">
          <el-form-item class="selecttemp" label="选择模板" label-width="100px">
            <el-select
              :disabled="checkProhibit"
              v-model="item.ctpCode"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="itemchild in item.msgtempdata"
                :key="itemchild.ctpCode"
                :label="itemchild.ctpTitle"
                :value="itemchild.ctpCode"
              ></el-option>
            </el-select>
            <el-form-item
              style="display:inline-block;"
              v-if="item.ctpCode!='' && channeldata.length>=2 && tempData.isPrioritySend=='1'"
            >
              <el-input :disabled="checkProhibit" v-model="item.sort"></el-input>
            </el-form-item>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="ownerMessageType" label="所有者类型" label-width="120px" prop="ownerType">
          <el-select
              :disabled="checkProhibit"
              v-model="tempData.ownerType"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in ownerMessageTypedata"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
      </el-form-item>
      <div class="channeltext">订阅消息设置</div>
      <el-form-item class="switchstyle" label="是否支持订阅" label-width="120px">
        <el-switch
          v-model="tempData.isSubscriptionSupported"
          :disabled="checkProhibit"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>

    <div v-if="tempData.isSubscriptionSupported=='1'">
      <el-form-item class="ownerMessageType" label="订阅终端" label-width="120px" prop="subTerminal">
          <el-select
              :disabled="checkProhibit"
              v-model="tempData.subTerminal"
              filterable
              multiple collapse-tags
              value-key="dictValue"
              placeholder="请选择"
              @change="selectTerminal"
            >
              <el-option
                v-for="item in terminalListdata"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item"
              ></el-option>
            </el-select>
      </el-form-item>
      <div class="terminalbox">
          <span v-for="(item,index) in tempData.subTerminal" :key="index" class="terminalItem">{{item.dictName}}</span>
      </div>

      <el-form-item class="ownerMessageType" label="订阅类型" label-width="120px" prop="subscriptionType">
          <el-select
              v-model="tempData.subscriptionType"
              :disabled="checkProhibit"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in subscribeTypeData"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
      </el-form-item>
     <div v-if="tempData.subscriptionType=='2'">
      <div class="typetitlebox">指定分类</div>
      <el-table
      :data="tempData.specifyClassify"
      border
      stripe>
         <el-table-column prop="name" label="显示名称" align="center"></el-table-column>
         <el-table-column prop="key" label="key" align="center"></el-table-column>
       </el-table>
      </div>

</div>

    <div class="alignleft">
      <el-button @click="cancelBtn">返 回</el-button>
    </div>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "LonganMessageDetail",
  data() {
    return {
      authzData: '',
      detailCode:'', //消息模板code
      addDialogType:false,
      checkProhibit:true, //查看禁用
      switchjudge:true,
      createEditJudge:'创建',
      typeJudege:'',
      channeldata:[],   //选中模板途径
      tempData: {

        isPrioritySend: "", //优先级值
        tpCode: "", //code值
        tpTitle: "", //模板名称
        receiverUserIds: "", //订阅消息接收人
        templateDetail: [
          {
            title: "模板消息",
            ctpTypejudge: "1",
            ctpType: "",
            selectType: 0,
            noselectType: "00",
            ctpCode: "",
            sort: "",
            msgtempdata: []
          },
          {
            title: "订阅消息",
            ctpTypejudge: "2",
            ctpType: "",
            selectType: 1,
            noselectType: "11",
            ctpCode: "",
            sort: "",
            msgtempdata: []
          },
          {
            title: "短消息",
            ctpTypejudge: "3",
            ctpType: "",
            selectType: 2,
            noselectType: "22",
            ctpCode: "",
            sort: "",
            msgtempdata: []
          }
        ],
        ownerType:'',  //所有者类型
        isSubscriptionSupported:'',  //是否支持订阅
        subTerminal:[], //订阅终端选择数据
        terminal:[], //所选终端值
        subscriptionType:'', //订阅类型
        specifyClassify:[], //分类数据
      },
      ownerMessageTypedata:[], //所有者类型
      terminalListdata:[], //终端数据
      subscribeTypeData:[], //订阅类型数据
      typeObject:{
        name:'',
        key:''
      },

    };
  },
  mounted() {
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        this.detailCode=this.$route.query.detailCode;

        this.messageTempData();
        this.tempmessageTempData();
        this.tempmessageShortData();
        this.ownerMessageType();
        this.terminalList();
        this.subscribeType();
        this.editMsgList();

  },
  methods: {




         //编辑获取消息模板详情
         editMsgList(){
            let that=this;
            const params="";
            this.$api.checkMessageTemp(params,that.detailCode).then(response=>{

               if(response.data.code=='0'){
                 that.checktempData=response.data.data.templateDetail;

                 that.tempData.isPrioritySend=response.data.data.isPrioritySend;
                 that.tempData.tpCode=response.data.data.tpCode;
                 that.tempData.tpTitle=response.data.data.tpTitle;
                 that.tempData.receiverUserIds=response.data.data.receiverUserIds;
                 that.tempData.ownerType=JSON.stringify(response.data.data.ownerType);
                 that.tempData.isSubscriptionSupported=response.data.data.isSubscriptionSupported;
                 that.tempData.terminal=JSON.parse(response.data.data.terminal);
                 that.tempData.subscriptionType=JSON.stringify(response.data.data.subscriptionType);
                 that.tempData.specifyClassify=JSON.parse(response.data.data.specifyClassify);


                  for(var i=0;i<that.tempData.templateDetail.length;i++){
                     for(var j=0;j<that.checktempData.length;j++){
                        if(that.tempData.templateDetail[i].ctpTypejudge==that.checktempData[j].msgContentTemplate.ctpType){
                           that.tempData.templateDetail[i].ctpType=i;
                           that.tempData.templateDetail[i].ctpCode=that.checktempData[j].ctpCode;
                           that.tempData.templateDetail[i].sort=that.checktempData[j].sort;
                           that.channeldata.push(i)
                        }
                     }
                  }
                  that.countJudge();

                  if(that.tempData.terminal!=null){
                    that.terminalListdata.map(item=>{
                    that.tempData.terminal.map(childitem=>{
                      if(item.dictValue==childitem){
                         that.tempData.subTerminal.push(item)
                      }
                    })
                  })
                }

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



        //判断消息模板选择的个数
        countJudge(){
          if(this.channeldata.length>=2){
            this.switchjudge=false;
          }else{
            this.tempData.isPrioritySend='0';
            this.switchjudge=true;
          }
        },

      //返回
      cancelBtn(){
        this.$router.push({name:"LonganMessagelist"})
      },


          //模板消息选择列表
          tempmessageTempData(mName){
            let that=this;
            const params = {
                isPage:false,
                ctpTitle: mName,
                ctpType:'1',
            };
            this.$api.messageTempData({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.TempMessageList = result.data;
                        that.tempData.templateDetail[0].msgtempdata=result.data;
                    }else{
                        that.$message.error('订阅消息模板列表获取失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
          },

          remotetempMessage(val){
            this.tempmessageTempData(val);
         },


         //订阅消息模板选择列表
          messageTempData(mName){
            let that=this;
            const params = {
                isPage:false,
                ctpTitle: mName,
                ctpType:'2',
            };
            this.$api.messageTempData({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.MessageList = result.data;
                        that.tempData.templateDetail[1].msgtempdata=result.data;
                    }else{
                        that.$message.error('订阅消息模板列表获取失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
          },


          //短消息选择列表
          tempmessageShortData(mName){
            let that=this;
            const params = {
                isPage:false,
                ctpTitle: mName,
                ctpType:'3',
            };
            this.$api.messageTempData({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.ShortMessageList = result.data;
                        that.tempData.templateDetail[2].msgtempdata=result.data;
                    }else{
                        that.$message.error('订阅消息模板列表获取失败！');
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
          },

          remoteshortMessage(val){
            this.tempmessageShortData(val);
         },


       //接收人类型
       ownerMessageType(){
         let that=this;
         this.$api.ownerMessageType().then(response=>{
           if(response.data.code=='0'){
              that.ownerMessageTypedata=response.data.data;
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

       //终端列表
       terminalList(){
         let that=this;
         this.$api.terminalList().then(response=>{
           if(response.data.code=='0'){
              that.terminalListdata=response.data.data;
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

       //选择订阅终端
       selectTerminal(e){

         this.tempData.terminal=[];
         e.map(item=>{
           if(this.tempData.terminal.indexOf(item.dictValue)==-1){
              this.tempData.terminal.push(parseInt(item.dictValue))
           }
         })

       },

       //订阅类型
       subscribeType(){
         let that=this;
         this.$api.subscribeType().then(response=>{
           if(response.data.code=='0'){
              that.subscribeTypeData=response.data.data;
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




  }
};
</script>

<style lang="less">
 .messageTest{
    .el-dialog__footer{text-align: center !important;}
    .el-select__tags{
      display: none !important;
    }
 }
</style>

<style lang="less" scoped>
.alignleft {
  text-align: left;
  margin-top: 20px;
}
.title {
  font-weight: bold;
}
.messageTest {
  width: 60%;
  text-align: left;
  .el-input,.el-textarea{
    width: 40%;
  }
  .el-select {
    display: block;
  }
  .el-form-item__label{
    text-align: right;
  }
  .selecttemp{
    margin-left: 100px;
      .el-select{
        width: 40%;
        display: inline-block;
      }
    }
    .ownerMessageType{
      .el-select{
        width: 40%;
      }
    }
    .terminalbox{
      margin-left: 120px;
      width: 40%;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      .terminalItem{
        width: 50%;
        background: #fff;
        margin-bottom: 10px;
        color: #c0c4cc;
      }
    }

    .typetitlebox{
      margin-bottom: 20px;
      .el-button{margin-left: 10px;}
    }
    .typedia{
      .el-input{
        width: 80%;
      }
    }

}
</style>



