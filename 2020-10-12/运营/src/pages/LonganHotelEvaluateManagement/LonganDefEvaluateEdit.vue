<template>
    <div class="DefEvaluateEdit">
       <h3 class="alignleft">修改默认评价</h3>
       <el-form :model="editdata" ref="editdata" :rules="rules" class="alignleft">

             <el-form-item label="商品名称" label-width="100px" prop="prodName" class="multiselect widlength">
                <el-input v-model="editdata.prodName" :disabled="true"></el-input>
             </el-form-item>

          <el-form-item class="hotelname multiselect widlength" label="酒店名称" label-width="100px" prop="hotelname">
             <el-input v-model="editdata.hotelName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="evaluate" label="评价内容" prop="remarkContent" label-width="100px">
             <el-input @keyup.native="wordStatic(editdata.remarkContent);" v-model="editdata.remarkContent" maxlength="255" type="textarea" :rows="4"></el-input>
             <div class="weui_textarea_counter"><span id="num">{{editdata.remarkContent.length}}</span>/255</div>
          </el-form-item>
           <el-form-item label="上传图片" prop="bannerList" class="picupload">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="9"
                    :file-list="editdata.bannerList"
                    :headers="headers"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <el-button size="small" type="primary">上&nbsp;&nbsp;传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传9张</label>
                </el-upload>
            </el-form-item>

           <el-row>
            <el-col :span="24" class="niuwrap">
                    <el-button @click="cancelbtn()">取消</el-button>
                    <el-button v-if="authzData['F:BO_REM_DEFAULTEVALUATEEDITSURE']" type="primary" @click="surebtn('editdata')">确定</el-button>
                </el-col>
            </el-row>

       </el-form>




    </div>
</template>

<script>
export default {
    name: 'LonganDefEvaluateEdit',
    data() {

        return{
            authzData:'',
            uploadUrl:this.$api.upload_file_url,
            headers: {},
            evaluatechangeid:'',

            editdata:{
              hotelNameList:[],
              proNameList:[],
              allhotel:true,
              evaluate:'',
              bannerList:[],
              selectxzid:[],
              selecthotelxzid:[],
            },
            rules:{
                    evaluate:{required:true,message:'请填写评价内容',trigger:'blur'},
                },

        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.evaluatechangeid=this.$route.query.id;
        console.log(this.evaluatechangeid)
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.Getdata()
    },
    methods: {

       //取消
      cancelbtn(){
       this.$router.push({name:'LonganDefEvaluate'})
      },

      //确定
      surebtn(formData){
         let that=this;
         console.log(this.editdata.allhotel)
         const bannerPath = this.editdata.bannerList.map(item => item.path);

        this.$refs[formData].validate((valid, model) => {
                console.log(valid);
                console.log(JSON.stringify(model));
                if(valid){
                  const params = {
                  remarkContent:that.editdata.remarkContent,
                  remarkImages:JSON.stringify(bannerPath)
              };
              this.$api.EvalUpload(params,that.evaluatechangeid).then(response=>{
                  if(response.data.code==0){
                      that.$message.success('操作成功')
                      that.$router.push({name:'LonganDefEvaluate'})
                  }else{
                    this.$alert(response.data.msg,"警告",{
                      confirmButtonText: "确定"
                    })
                  }
              }).catch(err=>{
                this.$alert(err,"警告",{
                    confirmButtonText: "确定"
                })
              })

                }
              })
      },




        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.EvalDetail({params},that.evaluatechangeid).then(response=>{
                if(response.data.code==0){
                  that.editdata=response.data.data
                  this.editdata.bannerList = response.data.data.remarkImageDTOS.map(item => {
                            return {
                                id: item.id,
                                name: item.imagePath,
                                url: item.imageUrl,
                                path: item.imagePath
                            }
                        });
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

          wordStatic(value) {
            var content = document.getElementById('num');
            if (content) {
                value = value.replace(/\n|\r/gi,"");
                content.innerText = value.length;
                }
            },

          //图片上传成功
            handleSuccess(res, file, fileList) {
                  if(res.code==0){
                  const image={
                    name: file.name,
                    url: file.url,
                    path: res.data
                  }
                  this.editdata.bannerList.push(image);
                }
            },
            //图片移除
            handleRemove(file, fileList) {
                console.log(fileList)
                if(fileList.length>0){
                   this.editdata.bannerList=fileList.map((item,index)=>{
                    return {
                        name:item.name,
                        url:item.url,
                        path:item.path
                    }
                  })
                }else{
                  this.editdata.bannerList=[];
                }
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
                this.$message.error('上传图片不能超过9张！');
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
.DefEvaluateEdit{
    width: 80%;
    .picupload{width: 500px;}
    .hangitem{text-align: left}
    .alignleft{text-align: left;}
    .hotelname,.allhotel{display: inline-block;}
   .niuwrap{text-align:left;margin-top: 60px;}
   .evaluate .el-textarea{width: 320px;}
   .selectarea{width: 300px;
    .selectitem{width: 50%;display: inline-block;float: left;
      .selectyuan{width: 16px;height: 16px;border-radius: 50%;
      font-size: 12px;color: #fff;background: #C0C4CC;line-height: 16px;
       .el-icon-close{
         -webkit-transform: scale(.8);
         transform: scale(.8);
       }
      }
    }
   }
   .el-input{width: 320px !important;}
}

</style>

<style lang="less">
.DefEvaluateEdit{
   .seeordertitle .el-form-item__label{width:100px;}
   .el-form-item__content{text-align: left !important;}
   .multiselect{
      .el-select .el-tag{display: none;}
    }
}
</style>


