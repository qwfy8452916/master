<template>
    <div class="LonganMessagelist">
      <el-form :inline="true" align=left class="searchform">
           <!-- <el-form-item label="code" prop="codenumber">
                <el-input v-model="codenumber"></el-input>
            </el-form-item> -->
           <el-form-item label="名称" prop="templatename">
                <el-input v-model="templatename"></el-input>
           </el-form-item>

            <el-form-item label="状态">
                <el-select v-model="inquireState">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="ENABLE"></el-option>
                    <el-option label="禁用" value="DISABLE"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div class="addranchisee"><el-button type="primary" @click="addranchisee">+创建</el-button></div>
        <el-table
            :data="messageDataList"
            border
            stripe
            style="width:100%;"
            >
            <el-table-column fixed prop="tpCode" label="code" align="center"></el-table-column>
            <el-table-column prop="tpTitle" label="名称" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='ENABLE'">启用</span>
                    <span v-if="scope.row.status=='DISABLE'">禁用</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="isSafe" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkmsg(scope.row.tpCode)">查看</el-button>
                    <el-button type="text" size="small" @click="enableDisable(scope.row.tpCode,scope.row.status)">
                        <span v-if="scope.row.status=='DISABLE'">启用</span>
                        <span v-if="scope.row.status=='ENABLE'">禁用</span>
                    </el-button>
                    <el-button type="text" size="small" @click="editDialog(scope.row.tpCode)">修改</el-button>
                    <el-button type="text" size="small" @click="delbtn(scope.row.tpCode)">删除</el-button>
                </template>
            </el-table-column>
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

        <el-dialog :title="titleText" :visible.sync="showhidedia">

              <el-form :model="tempData" :rules="rules" ref="formData">
                <el-form-item label="code" label-width="120px" prop="tpCode">
                  <el-input :disabled="checkProhibit" v-model="tempData.tpCode" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="120px" prop="tpTitle">
                  <el-input :disabled="checkProhibit" v-model="tempData.tpTitle" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item class="" label="接收人" label-width="120px" prop="receiverUserIds">
                    <el-input :disabled="checkProhibit" v-model="tempData.receiverUserIds" :rows="3" type="textarea">
                    </el-input>
                </el-form-item>
                <div class="channeltext">途径</div>
                <el-form-item class="switchstyle" label="控制优先级开关" label-width="120px" prop="isPrioritySend">
                    <el-switch :disabled="switchjudge || checkProhibit" v-model="tempData.isPrioritySend" :active-value='1' :inactive-value='0'></el-switch>
                </el-form-item>

                <div v-for="(item,index) in tempData.templateDetail" :key="index">
                <el-form-item class="dingyue" label-width="120px">
                    <el-checkbox :disabled="checkProhibit" :label="item.title" v-model="item.ctpType" :true-label="item.selectType" :false-label="item.noselectType" @change="SubscribeChange(item.ctpType,index)"></el-checkbox>
                </el-form-item>
                 <div class="channeltext">

                      <el-form-item class="selecttemp" label="选择模板" label-width="100px">
                            <el-select
                            :disabled="checkProhibit"
                            v-model="item.ctpCode"
                            filterable
                            placeholder="请选择">
                                <el-option
                                  v-for="itemchild in item.msgtempdata"
                                  :key="itemchild.ctpCode"
                                  :label="itemchild.ctpTitle"
                                  :value="itemchild.ctpCode">
                                </el-option>
                            </el-select>
                            <el-form-item style="display:inline-block;" v-if="item.ctpCode!='' && channeldata.length>=2 && tempData.isPrioritySend=='1'">
                                <el-input :disabled="checkProhibit" v-model="item.sort"></el-input>
                            </el-form-item>
                        </el-form-item>
                    </div>
                  </div>
              </el-form>

              <div slot="footer" class="dialog-footer" center>
                <el-button type="primary" @click="showhidedia=false">取 消</el-button>
                <el-button v-if="!checkProhibit" @click="surebtn('formData')" type="primary">确 定</el-button>
              </div>

        </el-dialog>


         <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该模板？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'LonganMessagelist',
    data(){
        return{
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //默认当前页码
            pageNum: 1,   //实际当前页码
            encryptedOrgId: '',
            showhidedia: false,
            dialogVisibleDelete:false,
            switchjudge:true,
            loadingM:false,
            loadingMtemp:false,
            loadingMshort:false,
            checkProhibit:false, //查看禁用
            titleText:"创建消息模板",
            MessageList:[],   //订阅消息模板列表
            TempMessageList:[],   //模板消息列表
            ShortMessageList:[],   //短消息列表
            MsgDetailData:{},  //查看消息模板详情
            inquireProdName: '',
            inquireState: '',
            messageDataList: [],
            // codenumber:'',  //code查询
            templatename:'',
            sorttwo:'',     //模板消息优先级
            sortthree:'',     //短消息优先级
            createEditJudge:'', //创建编辑按钮触发判断
            channeldata:[],   //选中模板途径
            editcode:'',  //编辑查看传递的tpCode
            checktempData:[],  //编辑获取详情消息模板
            tempData:{
                isPrioritySend:'', //优先级值
                tpCode:'',  //code值
                tpTitle:'',  //模板名称
                receiverUserIds:'',  //订阅消息接收人
                templateDetail:[
                  {title:'模板消息',ctpTypejudge:'WX_MP_T',ctpType:'',selectType:0,noselectType:'00',ctpCode:'',sort:'',msgtempdata:[],},
                  {title:'订阅消息',ctpTypejudge:'WX_MINI_D',ctpType:'',selectType:1,noselectType:'11',ctpCode:'',sort:'',msgtempdata:[],},
                  {title:'短消息',ctpTypejudge:'PHONE_M',ctpType:'',selectType:2,noselectType:'22',ctpCode:'',sort:'',msgtempdata:[],}
                ],
            },

            rules:{
              tpCode: {required: true, message: '请输入code值', trigger: 'blur'},
              tpTitle: {required: true, message: '请输入模板名称', trigger: 'blur'},
              receiverUserIds:{required:true,message:'请填写模板名称',trigger:'blur'}
            }

        }
    },
    mounted(){
        this.encryptedOrgId = this.$route.params.orgId;
        this.LonganMessagelist();
        this.messageTempData();
        this.tempmessageTempData();
        this.tempmessageShortData();
    },
    methods: {


        //消息模板列表
        LonganMessagelist(){
            let that=this;
            const params = {
                pageNo: this.pageNum,
                pageSize: this.pageSize,
                isPage:true,
                status:this.inquireState,
                tpTitle:this.templatename,
            };
            this.$api.getMessageList({params})
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        that.messageDataList = result.data.records;
                        that.pageTotal = result.data.total;
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



          remoteMessage(val){
            this.messageTempData(val);
         },

         //模板消息选择列表
          tempmessageTempData(mName){
            let that=this;
            const params = {
                isPage:false,
                ctpTitle: mName,
                ctpType:'WX_MP_T',
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

         //启用禁用模板操作
         enableDisable(e,status){
           let that=this;
           this.editcode=e;
           if(status=='ENABLE'){
             that.Disabletemp();
           }else if(status=='DISABLE'){
             that.enableMessageTemp();
           }

          },

          //禁用模板
          Disabletemp(){
            let that=this;
            let params="";
           this.$api.disableMessageTemp(params,this.editcode).then(response=>{
               if(response.data.code=='0'){
                  that.$message.success("操作成功")
                  that.LonganMessagelist();
               }else{
                  that.$message.error("禁用模板失败")
               }
            }).catch(error=>{
                that.$alert(error,"警告",{
                  confirmButtonText:"确定"
                })
            })
          },

          //启用模板
          enableMessageTemp(){
            let that=this;
            let params="";
            this.$api.enableMessageTemp(params,this.editcode).then(response=>{
               if(response.data.code=='0'){
                  that.$message.success("操作成功")
                  that.LonganMessagelist();
               }else{
                 that.$message.error("启用模板失败")
               }
            }).catch(error=>{
               that.$alert(error,"警告",{
                 confirmButtonText:"确定"
               })
            })
          },


          //订阅消息模板选择列表
          messageTempData(mName){
            let that=this;
            const params = {
                isPage:false,
                ctpTitle: mName,
                ctpType:'WX_MINI_D',
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
                ctpType:'PHONE_M',
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

         //编辑弹窗
         editDialog(e){
            let that=this;
            this.titleText="编辑消息模板";
            this.createEditJudge="编辑";
            this.checkProhibit=false;

            this.editcode=e;
            this.tempData={
                isPrioritySend:'', //优先级值
                tpCode:'',  //code值
                tpTitle:'',  //模板名称
                receiverUserIds:'',  //订阅消息接收人
                templateDetail:[
                  {title:'模板消息',ctpTypejudge:'WX_MP_T',ctpType:'',selectType:0,noselectType:'00',ctpCode:'',sort:'',msgtempdata:that.TempMessageList,},
                  {title:'订阅消息',ctpTypejudge:'WX_MINI_D',ctpType:'',selectType:1,noselectType:'11',ctpCode:'',sort:'',msgtempdata:that.MessageList,},
                  {title:'短消息',ctpTypejudge:'PHONE_M',ctpType:'',selectType:2,noselectType:'22',ctpCode:'',sort:'',msgtempdata:that.ShortMessageList,}
                ],
            },
            console.log(e)
            this.editMsgList();
         },

         //编辑获取消息模板详情
         editMsgList(){
            let that=this;
            const params="";
            this.$api.checkMessageTemp(params,that.editcode).then(response=>{

               if(response.data.code=='0'){
                 that.checktempData=response.data.data.templateDetail;

                 that.tempData.isPrioritySend=response.data.data.isPrioritySend;
                 that.tempData.tpCode=response.data.data.tpCode;
                 that.tempData.tpTitle=response.data.data.tpTitle;
                 that.tempData.receiverUserIds=response.data.data.receiverUserIds;
                 console.log(response.data.data)

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
                  that.showhidedia=true
                  this.$nextTick(()=>{
                    this.clearValidate('formData');
                  })
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

          //查看消息模板
          checkmsg(e){
            let that=this;
            this.editcode=e;
            that.checkProhibit=true;
            console.log(e)
            this.titleText="查看消息模板";
            this.tempData={
                isPrioritySend:'', //优先级值
                tpCode:'',  //code值
                tpTitle:'',  //模板名称
                receiverUserIds:'',  //订阅消息接收人
                templateDetail:[
                  {title:'模板消息',ctpTypejudge:'WX_MP_T',ctpType:'',selectType:0,noselectType:'00',ctpCode:'',sort:'',msgtempdata:that.TempMessageList,},
                  {title:'订阅消息',ctpTypejudge:'WX_MINI_D',ctpType:'',selectType:1,noselectType:'11',ctpCode:'',sort:'',msgtempdata:that.MessageList,},
                  {title:'短消息',ctpTypejudge:'PHONE_M',ctpType:'',selectType:2,noselectType:'22',ctpCode:'',sort:'',msgtempdata:that.ShortMessageList,}
                ],
            },
            this.editMsgList();
          },

        //新增模板
        addranchisee(){
          let that=this;
          this.titleText="创建消息模板";
          this.createEditJudge="创建";
          this.checkProhibit=false;
          this.tempData={
                isPrioritySend:'', //优先级值
                tpCode:'',  //code值
                tpTitle:'',  //模板名称
                receiverUserIds:'',  //订阅消息接收人
                templateDetail:[
                  {title:'模板消息',ctpTypejudge:'WX_MP_T',ctpType:'',selectType:0,noselectType:'00',ctpCode:'',sort:'',msgtempdata:that.TempMessageList,},
                  {title:'订阅消息',ctpTypejudge:'WX_MINI_D',ctpType:'',selectType:1,noselectType:'11',ctpCode:'',sort:'',msgtempdata:that.MessageList,},
                  {title:'短消息',ctpTypejudge:'PHONE_M',ctpType:'',selectType:2,noselectType:'22',ctpCode:'',sort:'',msgtempdata:that.ShortMessageList,}
                ],
            },
           this.showhidedia=true
           this.$nextTick(()=>{
              this.clearValidate('formData');
            })
        },

        //删除模板
        delbtn(e){
          this.editcode=e;
          this.dialogVisibleDelete=true;
        },
        //删除确定
        Confirmdel(){
          let that=this;
          let params="";
          this.$api.deleteMessageTemp(params,that.editcode).then(response=>{
             if(response.data.code=='0'){
                that.$message.success("操作成功")
                that.LonganMessagelist();
                that.dialogVisibleDelete=false;
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
                   this.tempData.templateDetail[index].ctpCode="";
                   this.tempData.templateDetail[index].sort="";

                }
                if(e=='1'){
                  this.channeldata.push(e)
                }else if(e=='11'){
                   this.channeldata.splice(this.channeldata.indexOf('1'),1)
                   this.tempData.templateDetail[index].ctpCode="";
                   this.tempData.templateDetail[index].sort="";

                }
                if(e=='2'){
                  this.channeldata.push(e)
                }else if(e=='22'){
                   this.channeldata.splice(this.channeldata.indexOf('2'),1)
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

        //添加确定
        surebtn(formData){
           let that=this;
           for(let i=0;i<this.tempData.templateDetail.length;i++){
             if(this.tempData.templateDetail[i].ctpCode!=''){
               console.log(this.tempData.templateDetail[i].ctpCode)
               if(this.tempData.templateDetail[i].ctpType==='' || this.tempData.templateDetail[i].ctpType!=this.tempData.templateDetail[i].selectType){
                  this.$message.error("请勾选消息类型！")
                  return false;
               }
             }
          }

          for(let i=0;i<this.tempData.templateDetail.length;i++){
            console.log(this.tempData.templateDetail[i].ctpType)
             if(this.tempData.templateDetail[i].ctpType!='' && this.tempData.templateDetail[i].ctpType==this.tempData.templateDetail[i].selectType){
               if(this.tempData.templateDetail[i].ctpCode==''){
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
                 templateDetail:templateDetailarr
             }
             console.log(params)

           if(this.createEditJudge==="创建"){
              this.$refs[formData].validate((valid, model) => {
                if(valid){
                  this.$api.createMessageTemp(params).then(response=>{
                    if(response.data.code=='0'){
                      this.LonganMessagelist();
                      this.showhidedia=false;
                    }else{
                      this.$alert(error,"警告",{
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
         }
          if(this.createEditJudge==="编辑"){
                this.$refs[formData].validate((valid, model) => {
                  if(valid){
                    this.$api.editMessageTemp(params,that.editcode).then(response=>{
                      if(response.data.code=='0'){
                        this.LonganMessagelist();
                        this.showhidedia=false;
                      }else{
                        this.$alert(error,"警告",{
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
          }
      },

      clearValidate(formData) {
          let that=this;
          that.$refs[formData].clearValidate();
        },


        //查询
        inquire(){
            this.pageNum = 1;
            this.LonganMessagelist();
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
    },
}
</script>

<style lang="less">
   .LonganMessagelist{
    .el-dialog__header{text-align: left;}
    .switchstyle{
      margin-top: 30px;
    }
    .el-form-item__content{text-align: left;}
    .dingyue{
      .el-form-item__content{margin-left: 100px !important;}
    }
    .selecttemp{
      .el-select{width: 40%;}
    }
    .el-dialog__footer{text-align: center;}
    .messagetwo .el-dialog{width: 40%;}
    .msghang{
       .msgcontent{width: calc(100% - 50px);display: inline-block;}
    }

  }
</style>

<style lang="less" scoped>
.LonganMessagelist{
    .pagination{
        margin-top: 20px;
    }
    .addranchisee{
        float: left;
        margin-bottom: 10px;
    }
    .el-dialog__header{
        text-align: left;
      }
    .channeltext{font-size: 14px;font-weight: 700;
    text-align: left;padding-left: 78px;box-sizing: border-box;}
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

