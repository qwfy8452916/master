
<template>
  <div class="CabTypeListAdd">
     <p class="title">关联酒店详情</p>
     <el-form align="left" :disabled="true" :model="addLinkData" label-width="120px" :rules="rules" ref="addLinkData">
        <el-form-item label="酒店" prop="relateHotelId">
            <el-select
                :disabled="true"
                filterable
                remote
                :loading="loadingH"
                :remote-method="remoteCabType"
                @focus="getHotelList()"
                v-model="addLinkData.relateHotelId"
                placeholder="请选择酒店名称">
                <el-option
                    v-for="item in hotelList"
                    :key="item.id"
                    :label="item.hotelName"
                    :value="item.id"
                    >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="显示名称" label-width="120px" prop="showName">
           <el-input v-model="addLinkData.showName" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="房价" label-width="120px" prop="roomPrice">
           <el-input v-model="addLinkData.roomPrice"></el-input>
        </el-form-item>
        <el-form-item label="推荐入住理由" label-width="120px" prop="description">
           <el-input show-word-limit :autosize="{minRows:2}" type="textarea" v-model="addLinkData.description" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="banner图" prop="banner">
            <el-upload
                :action="uploadUrl"
                list-type="picture"
                :limit="1"
                :headers="headers"
                :file-list="fileList"
                name="fileContent"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-error="imgUploadError"
                :before-remove="beforeRemove">
                <el-button size="small" type="primary">点击上传</el-button>
                <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;图片上传支持jpg、jpeg、png等格式,最多支持1张图片</label>
            </el-upload>
        </el-form-item>
        <el-form-item label="进场配置：" prop="enterId">
            <el-select v-model="addLinkData.enterId" placeholder="选择进场配置">
              <el-option v-for="item in enterSettings" :value="item.id" :label="item.settingName" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="添加人" label-width="120px" prop="roomPrice">
           <el-input v-model="addLinkData.createrName"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" label-width="120px" prop="description">
           <el-input v-model="addLinkData.createdAt" maxlength="255"></el-input>
        </el-form-item>
     </el-form>
      <div style="margin-left:120px;text-align:left">
          <el-button @click="cancelBtn">返回</el-button>
      </div>
  </div>
</template>

<script>
  export default{
    name:'HotelContactDetail',
    data(){
      var validator = (rule, value, callback) => {
        if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(value)){
            callback(new Error('请规范填写金额'));
        }else{
            callback();
        }
      }
      return {
         authzData:'',
         headers:{},
         uploadUrl: this.$api.upload_file_url,
         loadingH:false,
         hotelList:[],
         fileList:[],
         enterSettings:[],
         addLinkData:{
            hotelId:'',
            relateHotelId:'',
            showName:'',
            roomPrice:'',
            description:'',
            banner:'',
            enterId:'',
         },
         RelateID:'',
         rules:{
            relateHotelId:[{required:true,message:"请选择关联酒店",trigger:"change"}],
            roomPrice:[{required:true,message:"请填写房价",trigger:"blur"},{validator: validator,trigger: 'blur'}],
            description:[{required:true,message:"请填写推荐入住理由",trigger:"blur"}],
            banner:[{required:true,message:"请上传banner图",trigger:"change"}],
            enterId:[{required:true,message:"请选择进场配置",trigger:"change"}],
         },

      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
      const token = localStorage.getItem('Authorization');
      this.headers = {"Authorization": token};
      this.addLinkData.hotelId = localStorage.getItem('hotelId');
      this.RelateID = this.$route.query.modifyid;
      this.getHotelList();
      this.getFillbackData()

    },
    methods:{
      getFillbackData(){
        let that = this
        this.$api.getOneRelateHotel(this.RelateID).then(response => {
            if(response.data.code == 0){
              let ralateData = response.data.data
              this.fileList = [{
                name:ralateData.banner,
                url:ralateData.bannerUrl
              }]
              this.addLinkData = ralateData
              this.getEnterSettings();
            }else{
              that.$alert(response.data.data.msg,"警告",{
                  confirmButtonText: "确定"
              })
            }
          })
          .catch(error => {
              that.$alert(error,"警告",{
                  confirmButtonText: "确定"
              })
          })
      },
      cancelBtn(){
        this.$router.push({name:'HotelContactList'})
      },
      getEnterSettings(){
        let params = {
            all: 1,
            hotelId : this.addLinkData.relateHotelId
        };
        this.$api.getCabinetConfig(params)
            .then(response => {
                const result = response.data;
                if(result.code == 0){
                    this.enterSettings = result.data
                }else{
                    this.$message.error(result.msg);
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
      },

      remoteCabType(val){
        this.getHotelList(val);
      },
      //酒店列表
      getHotelList(hName){
          this.loadingH = true;
          const params = {
              orgAs: 2,
              hotelName: hName,
              pageNo: 1,
              pageSize: 50
          };
          this.$api.hotelList(params)
              .then(response => {
                  this.loadingH = false;
                  const result = response.data;
                  if(result.code == 0){
                      this.hotelList = result.data.records.map(item => {
                          return{
                              id: item.id,
                              hotelName: item.hotelName
                          }
                      })
                  }else{
                      this.$message.error(result.msg);
                  }
              })
              .catch(error => {
                  this.$alert(error,"警告",{
                      confirmButtonText: "确定"
                  })
              })
      },
      //确定
      sureBtn(addLinkData){
        let that=this;
        let params = this.addLinkData
        this.$refs[addLinkData].validate((valid,model)=>{
          if(valid){
            this.$api.changeRelateHotel(params,this.RelateID).then(response=>{
               if(response.data.code=='0'){
                  that.$message.success("操作成功")
                  that.$router.push({name:"HotelContactList"})
               }else{
                 that.$alert(response.data.msg,"警告",{
                   confirmButtonText:"确定"
                 })
               }
            })
          }else{
            console.log("error!")
          }
        })
      },
      //删除确认
      beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //图片上传成功
      handleSuccess(res, file, fileList){
          this.addLinkData.banner = res.data
      },
      //移除图片
      handleRemove(file, fileList){
          this.addLinkData.banner = ''
      },
      //文件超出个数限制时
      handleExceed(file, fileList){
          this.$message.error('图片只能上传1张！')
      },
      //图片上传失败
      imgUploadError(file,fileList){
          this.$message.error('上传图片失败！');
      },

    }
  }
</script>

<style lang="less" scope>
  .CabTypeListAdd{
    .title{font-weight: bold;text-align: left;}
    .el-input,.el-select,.el-textarea{
      width: 270px;
    }
    .cancelleft.el-button--primary{
      margin-left: 50px;
    }
  }
</style>




















