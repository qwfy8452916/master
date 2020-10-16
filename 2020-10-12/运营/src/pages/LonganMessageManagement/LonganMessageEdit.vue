
<template>
  <div class="messageTest">
    <el-form :model="tempData" :rules="rules" ref="tempData" align="left">
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
            @change="SubscribeChange(item.ctpType,index)"
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
              <el-input :disabled="checkProhibit" v-model="item.sort" oninput ="value=value.replace(/[^(^)][^(^)+^0-9]/g,'')"></el-input>
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
          :active-value="1"
          :inactive-value="0"
          @change="updateStatus"
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
          <span v-for="(item,index) in tempData.subTerminal" :key="index" class="terminalItem">{{item.dictName}}<i class="el-tag__close el-icon-close" @click="deleterminal(index)"></i></span>
      </div>

      <el-form-item class="ownerMessageType" label="订阅类型" label-width="120px" prop="subscriptionType">
          <el-select
              v-model="tempData.subscriptionType"
              filterable
              placeholder="请选择"
              @change="subType"
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
      <div class="typetitlebox">指定分类 <el-button @click="addType" type="primary">添加</el-button></div>
      <el-table
      :data="tempData.specifyClassify"
      border
      stripe>
         <el-table-column prop="name" label="显示名称" align="center"></el-table-column>
         <el-table-column prop="key" label="key" align="center"></el-table-column>
         <el-table-column prop="tpCode" label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="editType(scope.$index)">修改</el-button>
                <el-button type="text" @click="deleType(scope.$index)">移除</el-button>
            </template>
         </el-table-column>
       </el-table>
      </div>

</div>

    <div class="alignleft">
      <el-button @click="cancelBtn">返 回</el-button>
      <el-button
        v-if="!checkProhibit && authzData['F:BO_MSG_MSGTEMP_SUBMIT']"
        @click="surebtn('tempData')"
        type="primary"
      >确 定</el-button>
    </div>
    </el-form>

     <el-dialog :title="typeJudege" :visible.sync='addDialogType' left width="30%" class="typedia">
             <el-form :model="typeObject" :rules="rules" ref="typeObject">
                <el-form-item label="显示名称" label-width="100px" prop="name">
                  <el-input v-model="typeObject.name"></el-input>
                </el-form-item>
                <el-form-item label="key" label-width="100px" prop="key">
                  <el-input v-model="typeObject.key"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogType=false">取 消</el-button>
                <el-button type="primary" @click="sureAddType('typeObject')">确 定</el-button>
              </div>
      </el-dialog>


  </div>
</template>

<script>
export default {
  name: "LonganMessageEdit",
  data() {
    return {
      authzData: '',
      editcode:'', //消息模板code
      addDialogType:false,
      checkProhibit:false, //查看禁用
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


      rules:{
              tpCode: {required: true, message: '请输入code值', trigger: 'blur'},
              tpTitle: {required: true, message: '请输入模板名称', trigger: 'blur'},
              ownerType:{required:true,message:'请选择所有者类型',trigger:'change'},
              subTerminal:{required:true,message:'请选择订阅终端',trigger:'change'},
              subscriptionType:{required:true,message:'请选择订阅类型',trigger:'change'},
              name:{required: true, message: '请输入显示名称', trigger: 'blur'},
              key:{required: true, message: '请输入key', trigger: 'blur'},
            },

    };
  },
  mounted() {
     (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        this.editcode=this.$route.query.editcode;

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
            this.$api.checkMessageTemp(params,that.editcode).then(response=>{

               if(response.data.code=='0'){
                 console.log(response.data.data)
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



        //勾选模板类型处理
        SubscribeChange(e,index){

          if(this.channeldata.indexOf(e)==-1){

                if(e=='0'){
                  this.channeldata.push(e)
                }else if(e=='00'){
                   this.channeldata.splice(this.channeldata.indexOf('0'),1)
                   this.tempData.templateDetail[index].ctpType="";
                   this.tempData.templateDetail[index].ctpCode="";
                   this.tempData.templateDetail[index].sort="";

                }
                if(e=='1'){
                  this.channeldata.push(e)
                }else if(e=='11'){
                   this.channeldata.splice(this.channeldata.indexOf('1'),1)
                   this.tempData.templateDetail[index].ctpType="";
                   this.tempData.templateDetail[index].ctpCode="";
                   this.tempData.templateDetail[index].sort="";

                }
                if(e=='2'){
                  this.channeldata.push(e)
                }else if(e=='22'){
                   this.channeldata.splice(this.channeldata.indexOf('2'),1)
                   this.tempData.templateDetail[index].ctpType="";
                   this.tempData.templateDetail[index].ctpCode="";
                   this.tempData.templateDetail[index].sort="";
                }
              }
              this.countJudge();
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


        //修改确定
        surebtn(tempData){
          console.log(this.tempData.templateDetail)
           let that=this;


           for(let i=0;i<this.tempData.templateDetail.length;i++){
             if(this.tempData.templateDetail[i].ctpCode.toString().length>0){
               if(this.tempData.templateDetail[i].ctpType.toString().length<1 || this.tempData.templateDetail[i].ctpType!=this.tempData.templateDetail[i].selectType){
                  this.$message.error("请勾选消息类型！")
                  return false;
               }
             }
          }

          for(let i=0;i<this.tempData.templateDetail.length;i++){
             if(this.tempData.templateDetail[i].ctpType.toString().length>0 && this.tempData.templateDetail[i].ctpType==this.tempData.templateDetail[i].selectType){
               if(this.tempData.templateDetail[i].ctpCode.toString().length<1){
                  this.$message.error("请选择模板！")
                  return false;
               }
             }
          }

          //处理数据得到传给后端的数据
          let templateDetailarr=[];
          this.tempData.templateDetail.map((item,index)=>{
            if(item.ctpCode!=''){
              templateDetailarr.push({
                   ctpCode:item.ctpCode,
                   sort:item.sort
              })
            }
          })

          let params={
                 tpCode:this.tempData.tpCode,
                 tpTitle:this.tempData.tpTitle,
                 receiverUserIds:this.tempData.receiverUserIds,
                 isPrioritySend:this.tempData.isPrioritySend,
                 templateDetail:templateDetailarr,
                 ownerType:this.tempData.ownerType,
                 isSubscriptionSupported:this.tempData.isSubscriptionSupported,
                 terminal:JSON.stringify(this.tempData.terminal),
                 subscriptionType:this.tempData.subscriptionType,
                 specifyClassify:JSON.stringify(this.tempData.specifyClassify),
             }


                this.$refs[tempData].validate((valid, model) => {
                  if(valid){
                    this.$api.editMessageTemp(params,that.editcode).then(response=>{
                      if(response.data.code=='0'){
                         this.$message.success("操作成功")
                         this.$router.push({name:"LonganMessagelist"})
                      }else{
                        this.$alert(response.data.msg,"警告",{
                          confirmButtonText:"确定"
                        })
                      }
                    }).catch(error=>{
                      this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
                  }else{
                      console.log('error submit!');
                      return false
                    }
              })

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

       //是否支持订阅
       updateStatus(e){
         if(e===0){
           this.tempData.subTerminal=[];
           this.tempData.terminal=[];
           this.tempData.specifyClassify=[];
           this.tempData.subscriptionType="";
         }
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

       //删除所选终端
       deleterminal(e){
         let index=e;
         this.tempData.terminal.splice(index,1)
         this.tempData.subTerminal.splice(index,1)
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

       //选择订阅类型
       subType(e){
         if(e==1){
            this.tempData.specifyClassify=[];
         }
       },

       //添加分类
       addType(){
         let that=this;
         this.typeJudege="添加"
         this.typeObject={
           name:'',
           key:''
         }
         this.addDialogType=true;
         this.$nextTick(()=>{
            that.$refs['typeObject'].clearValidate();
          });
       },

       //删除分类
       deleType(e){
         let index=e;
         this.tempData.specifyClassify.splice(index,1)
       },

       //确定分类
       sureAddType(typeObject){
          this.$refs[typeObject].validate((valid, model) => {

             if(valid){
                let nowtypeObject=JSON.stringify(this.typeObject)
                if(this.typeJudege==="添加"){
                  this.tempData.specifyClassify.push(JSON.parse(nowtypeObject))
                }
                console.log(this.tempData.specifyClassify)
                this.addDialogType=false;
             }else{
               console.log("error!")
               return false;
             }
          })



       },

       //修改分类
       editType(e){
         this.typeJudege="修改"
         let index=e;
         this.typeObject=this.tempData.specifyClassify[index];
         this.addDialogType=true;
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



