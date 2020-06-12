<template>
    <div class="hotelskinadd">
        <p class="title">修改主题</p>

        <el-form :model="hotelskinAdd" :rules="rules" ref="hotelskinAdd" label-width="140px" class="hotelform">
           <el-form-item label="主题名称" prop="themeName">
                <el-input v-model.trim="hotelskinAdd.themeName" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="hotelBanner">
                <span slot="label"><label class="required-icon">*</label> 主题效果</span>
                <!-- <el-input v-model="hotelskinAdd.hotelBanner"></el-input> -->
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :file-list="skinpic"
                    :limit="1"
                    :headers="headers"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传1张</label>
                </el-upload>
            </el-form-item>
            <el-form-item label="主题说明" class="zhuti" prop="">
                <div id="skinid"></div>
            </el-form-item>


            <el-form-item class="btnwrap">
                <el-button @click="resetForm('hotelskinAdd')">取消</el-button>
                <el-button v-if="authzData['F:BO_HOTEL_THEME_EDIT_SUBMIT']" type="primary" @click="submitForm('hotelskinAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'hotelskinmodify',
    data(){
        return{
            authzData: '',
            uploadUrl:this.$api.upload_file_url,
            // uploadUrl: 'http://192.168.1.121:9001/longan/api/basic/file/upload',
            headers: {},
            hotelskinAdd:{
              themeName:"",
              imageListmiaos:[],  //传图片
              themeDescription:"",
            },
            hotelskinid:"",  //主题id
            rules:{
                themeName: [
                    {required: true, message: '请填写主题名称',trigger:'blur'},
                ],
                themeDescription: [
                    {required: true, message: '请填写主题内容',trigger:'blur'},
                ],
            },
            flag:true,
            oprOgrId:"",   //标识
            skinpic:[],    //图片
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
    //   this.oprOgrId=localStorage.orgId
    //   this.oprOgrId = this.$route.params.orgId;
      this.hotelskinid=this.$route.query.productid
      this.gethotelskin();
      this.getdata();

    },
    methods: {

        //确定-添加商品
        submitForm(hotelskinAdd) {
            let that = this;
            let params = {
                // encryptedOrgId:that.oprOgrId,
                orgAs: 2,
                themeName:that.hotelskinAdd.themeName,
                themeDescription:that.hotelskinAdd.themeDescription,
                themePath:that.hotelskinAdd.imageListmiaos
            }
            if(that.hotelskinAdd.imageListmiaos.length==[]){
               that.$message.error('请上传主题效果');
                return false
            }

            if(that.flag==true){
              that.$refs[hotelskinAdd].validate((valid) => {
                if (valid) {
                  that.flag=false;
                    that.$api.updatehotelskin(params,that.hotelskinid)
                        .then(response => {
                            if(response.data.code==0){
                               that.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                                that.flag=true
                                that.$router.push({name:'hotelskinlist'});
                            }

                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    return false;
                }
             });
            }
        },

        getdata:function(){
          let that=this;
          let params="";
          that.$api.lookhotelskindetail(params,that.hotelskinid).then(response=>{
              if(response.data.code==0){
                that.hotelskinAdd=response.data.data
                that.hotelskinAdd.imageListmiaos=response.data.data.themePath
                that.skinpic.push({
                  name:"",
                  url:response.data.data.themeImageUrl,
                  path:response.data.data.themePath,
                })
              }
          }).catch(error=>{
              that.$alert(error,"警告",{
                   confirmButtonText: "确定"
                })
          })
        },

        //获取主题说明
        gethotelskin(){
          let that=this;
          let params={
            key:"basic.theme.demo",
            orgId:0
           }
          this.$api.gethotelskin({params}).then(response=>{
            if(response.data.code=='0'){
              let skindata=response.data.data;
              let skindiv=document.getElementById("skinid")
              if(skindiv!=null){
                skindiv.innerHTML=skindata
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

        //取消
        resetForm(hotelskinAdd) {
            this.$router.push({name:'hotelskinlist'});
        },
        //选择年月日
        selectdate(e){
          this.hotelskinAdd.selectdate=e
        },
        //图片上传成功
        handleSuccess(res, file, fileList) {
            // this.HotelDataAdd.bannerList.push(res.data);
            let image = {
                name: file.name,
                url: file.url,
                path: res.data
            }
            this.skinpic.push(image);
            this.hotelskinAdd.imageListmiaos=res.data
        },
        //图片移除
        handleRemove(file, fileList) {
          this.skinpic=[]
          this.hotelskinAdd.imageListmiaos=[]

        },

        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
        },
        //主题效果上传之前调用 做一些拦截限制
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
        //主题效果文件超出个数限制时
        handleExceed(file,fileList){
            this.$message.error('上传图片不能超过1张！');
            // console.log(file,fileList);
        },

        //图片上传失败
        imgUploadError(file,fileList){
            this.$message.error('上传图片失败！');
            // console.log(file,fileList);
        }


    },
}
</script>


<style>
.hotelskinadd .zhuti .el-form-item__label{
      position: relative;
      top: 7px;
    }
</style>

<style lang="less" scoped>
.el-select{
    width: 32%;
  }
.hotelskinadd{
    text-align: left;
    el-form-item{display: block;}
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 50%;
        .starclass{
            padding-top: 10px;
        }
        .required-icon{
            color: #ff3030;
        }

        .el-input{width: 225px;}
    }
}

</style>

