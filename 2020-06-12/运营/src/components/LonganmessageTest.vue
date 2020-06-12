
<template>
    <div class="messageTest">
        <div class="alignleft title">测试</div>
        <el-form :model="messagedata" :rules="rules" ref="messagedata" label-width="140px" class="messageForm">
            <el-form-item label="选择模板" prop="selectTemplate">
              <el-select v-model="messagedata.selectTemplate" >
                 <el-option
                      filterable
                      placeholder="请选择"
                      v-for="item in MessageList"
                      :key="item.tpCode"
                      :label="item.tpTitle"
                      :value="item.tpCode">
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参数" prop="parameter">
                <el-input v-model="messagedata.parameter" type="textarea" :rows="5" placeholder="填写参数"></el-input>
            </el-form-item>
            <el-form-item label="接收人类型" prop="recevierType">
                 <el-select v-model="messagedata.recevierType">
                     <el-option label="员工" value="STAFF"></el-option>
                     <el-option label="消费者" value="CUSTOMER"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="接收人">
                <el-input v-model="messagedata.receiver" type="textarea" :rows="3" placeholder="请输入接收人"></el-input>
            </el-form-item>

            <el-form-item>
                 <el-button v-if="authzData['F:BO_MSG_TEST_SEND']" @click="sendMessage('messagedata')" type="primary">发送</el-button>
            </el-form-item>
        </el-form>

        <el-dialog class="messageone" :visible.sync="showhidemsgone">
           <div class="msghang">
              <span class="msg_title">发送结果：</span><span>{{sendStaus}}</span>
           </div>
           <div class="msghang">
              <span class="msg_title" v-if="sendStaus==='发送失败'">原因：</span><span>{{sendReason}}</span>
           </div>
           <div class="msghang" v-if="sendStaus==='发送成功'">
              <span class="msg_title">业务消息id：</span><span>{{sendResult.msgId}}</span>
           </div>
           <div class="wrapbtn">
              <el-button type="primary" @click="surebtn">确定</el-button>
           </div>
        </el-dialog>

    </div>
</template>

<script>
  export default {
     name:"LonganmessageTest",
     data(){
       return{
         authzData:'',
         MessageList:[
         ],
          showhidemsgone:false,
          sendResult:{}, //发送返回结果
          sendStaus:'',  //发送结果描述
          sendReason:'', //发送失败原因
          messagedata:{
            selectTemplate:"",  //选择模板
            parameter:"",  //参数
            recevierType:"", //接收人类型
            receiver:"",   //接收人
          },
          rules:{
            selectTemplate:{required:true,message:"请选择模板消息!",trigger:"blur"},
            parameter:{required:true,message:"请填写参数!",trigger:'blur'},
            recevierType:{required:true,message:"请选择接收人类型!",trigger:'blur'}
          },
       }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       this.LonganMessagelist();
     },
     methods:{
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

        sendMessage(messagedata){
           let that=this;
           let params={
                 tpCode:that.messagedata.selectTemplate,
                 params:that.messagedata.parameter,
                 receiverUserType:that.messagedata.recevierType,
                 receiverUserIds:that.messagedata.receiver,
           };
           this.$refs[messagedata].validate((valid) => {
                if (valid) {
                  that.$api.testMessageTemp(params).then(response=>{
                    if(response.data.code=='0'){
                      that.sendStaus="发送成功"
                      that.showhidemsgone=true;
                      that.sendResult=response.data.data;
                    }else{
                      that.sendStaus="发送失败"
                      that.sendReason=response.data.msg;
                      that.showhidemsgone=true;
                    }
                  }).catch(error=>{
                      that.$alert(error,"警告",{
                        confirmButtonText:"确定"
                      })
                  })
                }else{
                  console.log("error!")
                }
           })
        },
        //测试确定
        surebtn(){
          let that=this;
          that.showhidemsgone=false;
          that.messagedata={
            selectTemplate:"",
            parameter:"",
            recevierType:"",
            receiver:"",
          }
        },

     },
  }

</script>

<style lang="less">
   .messageTest{
      .messageone .el-dialog{width: 30%;}
      .msghang{
        .msgcontent{width: calc(100% - 50px);display: inline-block;}
        }
    }
</style>

<style lang="less" scoped>
.messageTest{
   .alignleft{
       text-align: left;
     }
   .title{font-weight: bold;}
   .messageForm{
     width: 40%;
     text-align: left;
     .el-select{
        display: block;
       }
   }
   .messageone{
       .msghang{text-align: left;clear: both;
           margin-bottom: 10px;
          .msg_title{float: left;display: inline-block;width:110px;text-align: right;
          .msgcontent{display: inline-block !important;float: left;}
         }
        }
        .wrapbtn{margin-top: 20px;}
       }
}
</style>














