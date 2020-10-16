<template>
    <div class="AccountHandle">
        <table>
          <tr>
            <td>状态</td><td>{{getcashdata.status==1?'待处理':(getcashdata.status==2?'已转账':'转账失败')}}</td>
          </tr>
          <tr>
            <td>组织</td><td>{{getcashdata.orgName}}</td>
          </tr>
          <tr>
            <td>提现金额(元)</td><td>{{getcashdata.withdrawalAmount}}</td>
          </tr>
          <tr>
            <td>申请人</td><td>{{getcashdata.withdrawalName}}</td>
          </tr>
          <tr>
            <td>申请时间</td><td>{{getcashdata.withdrawalTime}}</td>
          </tr>
          <tr>
            <td>开户银行</td><td>{{getcashdata.bank}}</td>
          </tr>
          <tr>
            <td>账户名称</td><td>{{getcashdata.accountName}}</td>
          </tr>
          <tr>
            <td>账号</td><td>{{getcashdata.account}}</td>
          </tr>

        </table>
        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">取消</el-button>
                <el-button type="primary" @click="handlebtn()">处理</el-button>
            </el-col>
        </el-row>

         <el-dialog class="handlepopup" title="提示" :visible.sync='dialogVisibleDelete' center width="30%">
             <el-form :model="handledata" ref="handledata" :rules="rules">
                <el-form-item label="处理结果" label-width="100px" prop="handleresult">
                   <el-select v-model="handledata.handleresult">
                      <el-option label="处理成功" value="2"></el-option>
                      <el-option label="处理失败" value="3"></el-option>
                   </el-select>
                </el-form-item>
              <el-form-item v-if="handledata.handleresult=='2'" label="转账时间" label-width="100px" prop="transferMoneytime">
                <el-date-picker
                    @change="getdatetime"
                    v-model="handledata.transferMoneytime"
                    type="datetime"
                    placeholder="转账时间">
                </el-date-picker>
            </el-form-item>
                <el-form-item v-if="handledata.handleresult=='2'" label="转账凭证" label-width="100px" prop="bannerList">
                     <el-upload
                        :action="uploadUrl"
                        list-type="picture"
                        :limit="3"
                        :headers="headers"
                        name="fileContent"
                        :before-upload="beforeUpload"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-error="imgUploadError">
                        <el-button size="small" type="primary">上传图片</el-button>
                        <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传3张</label>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" label-width="100px">
                  <el-input type="textarea" v-model="handledata.remark" rows="3"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="(dialogVisibleDelete=false)">取 消</el-button>
                <el-button v-if="authzData['F:BO_FIN_WITHDRAW_DEAL_SUBMIT']" type="primary" @click="surebtn('handledata')">确 定</el-button>
              </div>
          </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'LonganAccountHandle',
    data() {
        return{
            authzData: '',
            query:'',
            uploadUrl:this.$api.upload_file_url,
            // uploadUrl:'http://192.168.1.85:9001/longan/api/basic/file/upload',
            prodchangeid:"",  //查看id
            getcashdata:{},  //数据
            dialogVisibleDelete:false,
            handledata:{
               handleresult:'2',
               transferMoneytime:'',
               bannerList:[],
               remark:'',
            },
            headers: {},
            oprId:'',   //运营商id
            orgId:'',   //组织id
            withdrawalAmount:'',  //提现金额
            accountId:'',  //组织分成账户id
            rules:{
              handleresult: {required: true, message: '请选择处理结果！', trigger: 'change'},
              transferMoneytime: {required: true, message: '请选择转账日期！', trigger: 'change'},
              bannerList: {required: true, message: '请上传转账凭证！', trigger: 'change'},
            }
        }
    },
    created(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.prodchangeid=this.$route.query.id;
        this.query=this.$route.query.query
        this.Getdata()
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
    },
    methods: {


       //取消
      cancelbtn(){
        let query=this.query;
        this.$router.push({name:'LonganCarryDetail',query:{query}})
      },

      //处理
      handlebtn(){
         this.dialogVisibleDelete=true
      },

      surebtn(formData){

        let that=this;
        console.log(this.handledata.transferMoneytime)

        let imagepath=this.handledata.bannerList.map(item=>item.path);
        let params={
           dealResult:this.handledata.handleresult,
           transferTime:this.handledata.transferMoneytime,
           remark:this.handledata.remark,
           accessoryPath: JSON.stringify(imagepath),
           withdrawalAmount:this.withdrawalAmount,
           accountId:this.accountId,
           oprId:this.oprId,
           orgId:this.orgId,
           id:this.prodchangeid
        };
        if(this.handledata.handleresult=='3' && this.handledata.remark==''){
           this.$message.error("请输入备注!")
           return false;
        }
        this.$refs[formData].validate((valid, model) => {
           if(valid){
        this.$api.dealgetcash(params,that.prodchangeid).then(response=>{
            if(response.data.code==0){
                that.$message.success("操作成功")
                that.$router.push({name:"LonganCarryDetail"})
              }else{
                that.$alert(response.data.msg,"警告",{
                   confirmButtonText: "确定"
                  })
              }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
            }
         })
        },



        getdatetime(e){
          console.log(e)
          this.changetime(e)
        },

        changetime(e){
          var d = new Date(e)

          var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +       d.getMinutes() + ':' + d.getSeconds();
          this.handledata.transferMoneytime=times;
        },




       //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.getcashdetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.getcashdata=response.data.data;
                  that.oprId=response.data.data.oprId;
                  that.orgId=response.data.data.orgId;
                  that.accountId=response.data.data.orgId;
                  that.withdrawalAmount=response.data.data.withdrawalAmount;
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },



         //图片上传成功
        handleSuccess(res, file, fileList) {
            if(res.code==0){
              const image={
                  name: file.name,
                  url: file.url,
                  path: res.data
                }
                this.handledata.bannerList.push(image);
                console.log(this.handledata.bannerList)
            }
        },
        //图片移除
        handleRemove(file, fileList) {

            if(fileList.length>0){
                this.handledata.bannerList=fileList.map((item,index)=>{
                      return {
                          name:item.name,
                          url:item.url,
                          path:item.path
                      }
                  })
            }else{
              this.handledata.bannerList=[];
            }
            console.log(this.handledata.bannerList)
        },

        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
        },
        //效果图片上传之前调用 做一些拦截限制
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传商品图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //效果图片文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('上传图片不能超过3张！');
            // console.log(file,fileList);
        },

        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }

    }
}
</script>

<style lang="less" scoped>
.AccountHandle{
    width: 80%;
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 350px;border-top: 1px solid #e4e4e4;}
    .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}

    }
   .niuwrap{text-align:left;margin-top: 60px;}
}

</style>

<style>
   .seeordertitle .el-form-item__label{width:100px;}
   .handlepopup .el-select{width: 100%;}
   .handlepopup .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 100%;}

</style>


