<template>
    <div class="hoteladd">
        <p class="title">修改商品</p>
        <el-form :model="CommodityAdd" :rules="rules" ref="CommodityAdd" label-width="140px" class="hotelform">
            <el-form-item label="商品图片" prop="hotelBanner">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="bannerList"
                    :before-upload="(file,index)=>{return beforeUpload(file, 1)}"
                    :on-success="(res, file, fileList,index)=>{return handleSuccess(res, file, fileList,1)}"
                    :on-remove="(file, fileList,index)=>{return handleRemove(file, fileList,1)}"
                    :on-exceed="(file,fileList,index)=>{return handleExceed(file,fileList,1)}"
                    :on-error="(file,fileList,index)=>{return imgUploadError(file,fileList,1)}">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传5张</label>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品详情banner" prop="hotelBanner">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :file-list="bannerdetail"
                    :before-upload="(file,index)=>{return beforeUpload(file, 2)}"
                    :on-success="(res, file, fileList,index)=>{return handleSuccess(res, file, fileList,2)}"
                    :on-remove="(file, fileList,index)=>{return handleRemove(file, fileList,2)}"
                    :on-exceed="(file,fileList,index)=>{return handleExceed(file,fileList,2)}"
                    :on-error="(file,fileList,index)=>{return imgUploadError(file,fileList,2)}">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传5张</label>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品名称" prop="productName">
                <el-input v-model.trim="CommodityAdd.productName"></el-input>
            </el-form-item>
            <el-form-item label="商品显示名称" prop="prodShowName">
                <el-input v-model.trim="CommodityAdd.prodShowName"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model.trim="CommodityAdd.supplierName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="sqSign">
                <el-input v-model.trim="CommodityAdd.sqSign"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="expPeriod">
                <el-input class="termput" maxlength="10" v-model.trim="CommodityAdd.expPeriod"></el-input>
                <el-select class="termput" v-model="tishiselectdate" :placeholder="tishiselectdate" @change="selectdate">
                    <el-option v-for="item in dateriqi" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="proSize">
                <el-input v-model.trim="CommodityAdd.proSize"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="priceMax">
                <el-input v-model.trim="CommodityAdd.priceMax" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="建议零售价" prop="retailPrice">
                <el-input v-model.trim="CommodityAdd.retailPrice" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="hotelBanner">
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    name="fileContent"
                    :file-list="productmiaos"
                    :before-upload="(file,index)=>{return beforeUpload(file, 3)}"
                    :on-success="(res, file, fileList,index)=>{return handleSuccess(res, file, fileList,3)}"
                    :on-remove="(file, fileList,index)=>{return handleRemove(file, fileList,3)}"
                    :on-exceed="(file,fileList,index)=>{return handleExceed(file,fileList,3)}"
                    :on-error="(file,fileList,index)=>{return imgUploadError(file,fileList,3)}">
                    <el-button size="big" type="primary" class="miaosniu">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;上传商品详情图，对图片数量和大小不做要求</label>
                </el-upload>
            </el-form-item>
            <el-form-item class="btnwrap">
                <el-button @click="resetForm('CommodityAdd')">取消</el-button>
                <el-button type="primary" @click="submitForm('CommodityAdd')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Commodityedit',
    data(){

        return{
            uploadUrl:this.$api.upload_file_url,
            dateriqi:[{id:"1",value:"天"},{id:"2",value:"月"},{id:"3",value:"年"}],
            productid:null,      //商品id
            imageList:"",        //传递商品绝对路径给服务器
            bannerList: [],      //获取显示商品列表图片
            bannerdetail: [],    //商品详情banner
            productmiaos: [],    //商品描述图片
            oprOgrId:'',
            tishiselectdate: '天',
            CommodityAdd: {
                expPeriod:'',
                productName: '',
                prodShowName:'',
                supplierName: '',
                sqSign: '',
                expPeriod:'',
                proSize:'',
                priceMax:'',
                retailPrice:'',
            },
            rules: {
                productName: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品名称请保持在32个字符以内', trigger: 'blur'}
                ],
                prodShowName: [
                    {required: true, message: '请填写商品显示名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品显示名称请保持在32个字符以内', trigger: 'blur'}
                ],
                supplierName: [
                    {required: true, message: '请填写供应商名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '供应商名称请保持在32个字符以内', trigger: 'blur'}
                ],
                sqSign: [
                    {required: true, message: '请填写商品编号', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品编号请保持在32个字符以内', trigger: 'blur'}
                ],
                expPeriod: [
                    {required: true, message: '请填写保质期', trigger: 'blur'},
                    {min: 1, max: 10, message: '保质期请保持在10个字符以内', trigger: 'blur'}
                ],
                proSize: [
                    {required: true, message: '请填写规格', trigger: 'blur'},
                    {min: 1, max: 32, message: '规格请保持在32个字符以内', trigger: 'blur'}
                ],
                priceMax: [
                    {required: true, message: '请填最高采购价', trigger: 'blur'},
                    // {message:'最高采购价请输入数字',trigger:'blur',type:'number'},
                    // {min: 1,max: 9999999999, message: '酒店楼层请输入在10位数以内', trigger: 'blur',type:"number"}
                ],
                retailPrice: [
                    {required: true, message: '请填写建议零售价', trigger: 'blur'},
                    // {message:'建议零售价请输入数字',trigger:'blur',type:'number'},
                    // {min: 1,max: 9999999999, message: '酒店楼层请输入在10位数以内', trigger: 'blur',type:"number"}
                ],
            },
        }
    },
    mounted(){
        this.oprOgrId=localStorage.orgId
        this.productid=this.$route.params.productid;
        this.Getdata();
    },
    methods: {

        //修改商品
        submitForm(CommodityAdd) {

            let that = this;
            // that.imageList=that.bannerList[0].path
            let nowbannerdetail=that.bannerdetail.map(item=>item.path)
            let nowproductmiaos=that.productmiaos.map(item=>item.path)
            let id=that.productid;
            if(nowproductmiaos.length<1){
                 nowproductmiaos="";
            }else{
                 nowproductmiaos=JSON.stringify(nowproductmiaos)
            }
            let params = {
                entryOprOrgId:that.oprOgrId,
                productName: that.CommodityAdd.productName,
                supplierName: that.CommodityAdd.supplierName,
                prodShowName:that.CommodityAdd.prodShowName,
                sqSign: that.CommodityAdd.sqSign,
                expPeriod: that.CommodityAdd.expPeriod+that.tishiselectdate,
                proSize: that.CommodityAdd.proSize,
                priceMax: parseFloat(that.CommodityAdd.priceMax).toFixed(2),
                retailPrice: parseFloat(that.CommodityAdd.retailPrice).toFixed(2),
                prodLogoPath: that.imageList,   //商品列表图片
                productBannerImages: JSON.stringify(nowbannerdetail),   //商品详情banner
                productDescImages: nowproductmiaos,   //商品描述图片
            }
            if(that.bannerList.length<1){
               that.$message.error('请上传商品图片');
               return false
            }
            if(nowbannerdetail.length<1){
               that.$message.error('请上传商品详情banner');
               return false
            }
            this.$refs[CommodityAdd].validate((valid) => {
                if (valid) {
                    this.$api.changecommodity(params,id)
                        .then(response => {
                            if(response.data.code==0){
                               that.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                            setTimeout(function(){
                                that.$router.push({name:'CommodityList'});
                            },2000)
                        })
                        .catch(error => {
                            that.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        resetForm(CommodityAdd) {
            this.$router.push({name:'CommodityList'})
        },
        //选择年月日
        selectdate(e){
          this.tishiselectdate=e
        },
        //获取数据
        Getdata(){
            let that=this;
            let id=that.productid
            let params=""
            this.$api.lookcommodity({params},id).then(response=>{
                  if(response.data.code==0){

                      that.CommodityAdd=response.data.data
                      let nowselectdate=response.data.data.expPeriod
                      that.CommodityAdd.expPeriod=nowselectdate.substr(0,nowselectdate.length-1)
                      that.tishiselectdate=nowselectdate.substr(nowselectdate.length-1,1)
                      that.imageList = response.data.data.prodLogoPath;
                      const imageListbanner=response.data.data.bannerImageList
                      const imageListmiaos=response.data.data.descImageList
                      that.bannerList.push({
                         name:"",
                         url:response.data.data.prodLogoUrl,
                         path:response.data.data.prodLogoPath
                      })
                      that.bannerdetail=imageListbanner.map((item,index)=>{
                          return {
                             name:"",
                             url:item.imageUrl,
                             path:item.imagePath
                          }
                      })
                      that.productmiaos=imageListmiaos.map((item,index)=>{
                          return {
                             name:"",
                             url:item.imageUrl,
                             path:item.imagePath
                          }
                      })
                  }else{
                     that.$alert(error,"警告",{
                         confirmButtonText:"确定"
                     })
                  }
            }).catch(error=>{
                that.$alert(error,"警告",{
                    confirmButtonText:"确定"
                })
            })
        },
         //图片上传成功
        handleSuccess(res, file, fileList,index) {
          let that=this;
          if(index==1){
              if(res.code==0){
                const image={
                  name: file.name,
                  url: file.url,
                  path: res.data
                }
                that.bannerList.push(image);
                that.imageList=res.data
              }else{
                  that.$alert(res.msg,"警告",{
                      confirmButtonText: "确定"
                  })
              }
          }else if(index==2){
              if(res.code==0){
                const image={
                  name: file.name,
                  url: file.url,
                  path: res.data
                }
                that.bannerdetail.push(image);
              }else{
                  that.$alert(res.msg,"警告",{
                      confirmButtonText: "确定"
                  })
              }
          }else if(index==3){
              if(res.code==0){
                const image={
                  name: file.name,
                  url: file.url,
                  path: res.data
                }
                that.productmiaos.push(image);
              }else{
                  that.$alert(res.msg,"警告",{
                      confirmButtonText: "确定"
                  })
              }
          }

        },
        //移除图片
        handleRemove(file, fileList,index) {
            let that=this;
            if(index==1){
                if(fileList.length>0){
                   that.bannerList=fileList.map((item,index)=>{
                    return {
                        name:item.name,
                        url:item.url,
                        path:item.path
                    }
                  })
                  that.imageList=that.bannerList[0].path
                }else{
                  that.bannerList=[];
                  that.imageList=""
                }
            }else if(index==2){
                if(fileList.length>0){
                    that.bannerdetail=fileList.map((item,index)=>{
                      return {
                          name:item.name,
                          url:item.url,
                          path:item.path
                      }
                    })
                }else{
                  that.bannerdetail=[]
                }
            }else if(index==3){
                if(fileList.length>0){
                    that.productmiaos=fileList.map((item,index)=>{
                      return {
                          name:item.name,
                          url:item.url,
                          path:item.path
                      }
                    })
                }else{
                  that.productmiaos=[]
                }

            }
        },
        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
        },
        //文件上传之前调用 做一些拦截限制
        beforeUpload(file,index){
          if(index==1){
              const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG) {
              this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
              }
              if (!isLt2M) {
              this.$message.error('上传商品图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
          }else if(index==2){
              const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isJPG) {
              this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
              }
              if (!isLt2M) {
              this.$message.error('上传商品图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
          }else if(index==3){
              const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
              if (!isJPG) {
              this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
              }
              return isJPG;
          }

        },
        //文件超出个数限制时
        handleExceed(file,fileList,index){
            if(index==1){
               this.$message.error('上传图片不能超过1张！');
            }else if(index==2){
               this.$message.error('上传图片不能超过5张！');
            }
          },
        //图片上传失败
        imgUploadError(file,fileList,index){
            if(index==1){
               this.$message.error('上传图片失败！');
            }else if(index==2){
               this.$message.error('上传图片失败！');
            }else if(index==3){
               this.$message.error('上传图片失败！');
            }

        }
    },
}
</script>


<style lang="less" scoped>
.el-select{
    width: 32%;
  }
.hoteladd{
    text-align: left;
    el-form-item{display: block;}
    .danweiyuan{margin-left: 5px;}
    .title{
        font-weight: bold;
    }
    .hotelform{
        width: 50%;
        .starclass{
            padding-top: 10px;
        }
        .divskin{
            width: 32%;
            display: inline-block;
            .imgskin{
                background: #f9f;
                width: 90px;
                height: 120px;
                display: inline-block;
            }
        }
        .mapposition{
            width: 100%;
            height: 100px;
            background: #9f9;
        }
        .upload-hint{
            font-size: 12px;
            color: #999;
            line-height: 12px;
        }

        .btnwrap{margin-left: 140px;}
        .el-input{width: 225px;}
        .termput{width: 80px;display: inline-block;float: left;
            margin-right: 10px;}
        .btnwrap{margin-left: 140px;}
    }
}

</style>

