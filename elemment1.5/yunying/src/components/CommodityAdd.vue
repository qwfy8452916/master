<template>
    <div class="hoteladd">
        <p class="title">新增商品</p>
        <el-form :model="CommodityAdd" :rules="rules" ref="CommodityAdd" label-width="140px" class="hotelform">
            <el-form-item label="商品列表图片" prop="hotelBanner">
                <!-- <el-input v-model="CommodityAdd.hotelBanner"></el-input> -->
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    name="fileContent"
                    :before-upload="(file,index)=>{return beforeUpload(file, 1)}"
                    :on-success="(res, file, fileList,index)=>{return handleSuccess(res, file, fileList,1)}"
                    :on-remove="(file, fileList,index)=>{return handleRemove(file, fileList,1)}"
                    :on-exceed="(file,fileList,index)=>{return handleExceed(file,fileList,1)}"
                    :on-error="(file,fileList,index)=>{return imgUploadError(file,fileList,1)}">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传1张</label>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品详情banner" prop="hotelBanner">
                <!-- <el-input v-model="CommodityAdd.hotelBanner"></el-input> -->
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="5"
                    name="fileContent"
                    :before-upload="(file,index)=>{return beforeUpload(file, 2)}"
                    :on-success="(res, file, fileList,index)=>{return handleSuccess(res, file, fileList,2)}"
                    :on-remove="(file, fileList,index)=>{return handleRemove(file, fileList,2)}"
                    :on-exceed="(file,fileList,index)=>{return handleExceed(file,fileList,2)}"
                    :on-error="(file,fileList,index)=>{return imgUploadError(file,fileList,2)}">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传5张</label>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品名称" prop="commodityname">
                <el-input v-model.trim="CommodityAdd.commodityname"></el-input>
            </el-form-item>
            <el-form-item label="商品显示名称" prop="showcommodityname">
                <el-input v-model.trim="CommodityAdd.showcommodityname"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="suppliername">
                <el-input v-model.trim="CommodityAdd.suppliername"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="sqlnumber">
                <el-input v-model.trim="CommodityAdd.sqlnumber"></el-input>
            </el-form-item>
            <el-form-item label="保质期" prop="guaranteetime">
                <el-input class="termput" maxlength="10" v-model.trim="CommodityAdd.guaranteetime"></el-input>
                <el-select class="termput" v-model="CommodityAdd.selectdate" placeholder="天" @change="selectdate">
                    <el-option v-for="item in dateriqi" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="guige">
                <el-input v-model.trim="CommodityAdd.guige"></el-input>
            </el-form-item>
            <el-form-item label="最高采购价" prop="priceMax">
                <el-input v-model.trim="CommodityAdd.priceMax" maxlength="10"></el-input><span class="danweiyuan">元</span>
            </el-form-item>
            <el-form-item label="建议零售价" prop="retailPrice">
                <el-input v-model.trim="CommodityAdd.retailPrice" maxlength="10"></el-input><span class="danweiyuan">元</span>
            </el-form-item>
            <el-form-item label="商品描述" prop="hotelBanner">
                <!-- <el-input v-model="CommodityAdd.hotelBanner"></el-input> -->
                <el-upload
                    :action="uploadUrl"
                    list-type="picture"
                    name="fileContent"
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
    name: 'CommodityAdd',
    data(){
        return{
            // uploadUrl:this.$api.upload_file_url,
            uploadUrl: 'http://192.168.1.122:9001/longan/api/basic/file/upload', //上传附件
            dateriqi:[{id:"1",value:"天"},{id:"2",value:"月"},{id:"3",value:"年"}],
            CommodityAdd: {
                bannerList: [], //商品列表图片
                bannerdetail: [],  //商品详情banner
                productmiaos: [],  //商品描述图片
                commodityname: '',
                showcommodityname:'',
                suppliername: '',
                sqlnumber: '',
                guaranteetime:'',
                selectdate: '天',
                guige:'',
                priceMax:'',
                retailPrice:'',
                oprOgrId:'',
            },
            flag:true,
            rules: {
                commodityname: [
                    {required: true, message: '请填写商品名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品名称请保持在32个字符以内', trigger: 'blur'}
                ],
                showcommodityname: [
                    {required: true, message: '请填写商品显示名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品显示名称请保持在32个字符以内', trigger: 'blur'}
                ],
                suppliername: [
                    {required: true, message: '请填写供应商名称', trigger: 'blur'},
                    {min: 1, max: 32, message: '供应商名称请保持在32个字符以内', trigger: 'blur'}
                ],
                sqlnumber: [
                    {required: true, message: '请填写商品编号', trigger: 'blur'},
                    {min: 1, max: 32, message: '商品编号请保持在32个字符以内', trigger: 'blur'}
                ],
                guaranteetime: [
                    {required: true, message: '请填写保质期', trigger: 'blur'},
                    {min: 1, max: 10, message: '保质期请保持在10个字符以内', trigger: 'blur'}
                ],
                guige: [
                    {required: true, message: '请填写规格', trigger: 'blur'},
                    {min: 1, max: 10, message: '规格请保持在10个字符以内', trigger: 'blur'}
                ],
                priceMax: [
                    {required: true, message: '请填最高采购价', trigger: 'blur'},
                    // {message:'最高采购价请输入数字',trigger:'blur',type:'number'},
                    // {min: 1, message: '酒店楼层请输入在10位数以内', trigger: 'blur',type:"number"}
                ],
                retailPrice: [
                    {required: true, message: '请填写建议零售价', trigger: 'blur'},
                    // {message:'建议零售价请输入数字',trigger:'blur',type:'number'},
                    // {min: 1, message: '酒店楼层请输入在10位数以内', trigger: 'blur',type:"number"}
                ],
            },
        }
    },
    mounted(){
      this.oprOgrId=localStorage.orgId
    },
    methods: {

        //确定-添加商品
        submitForm(CommodityAdd) {
            let that = this;
            const imageList = that.CommodityAdd.bannerList;  //商品列表图片
            const imageListdetail = that.CommodityAdd.bannerdetail.map(item => item.path);  //商品详情banner
            var imageListmiaos = that.CommodityAdd.productmiaos.map(item => item.path);  //商品详情banner
            if(imageListmiaos.length<1){
                 imageListmiaos="";
            }else{
                 imageListmiaos=JSON.stringify(imageListmiaos)
            }
            let params = {
                entryOprOrgId:that.oprOgrId,
                productName: that.CommodityAdd.commodityname,
                supplierName: that.CommodityAdd.suppliername,
                sqSign: that.CommodityAdd.sqlnumber,
                expPeriod: that.CommodityAdd.guaranteetime+that.CommodityAdd.selectdate,
                proSize: that.CommodityAdd.guige,
                priceMax: parseFloat(that.CommodityAdd.priceMax).toFixed(2),
                retailPrice: parseFloat(that.CommodityAdd.retailPrice).toFixed(2),
                prodShowName:that.CommodityAdd.showcommodityname,
                prodLogoPath: imageList,   //商品列表图片
                productBannerImages: JSON.stringify(imageListdetail),   //商品详情banner
                productDescImages: imageListmiaos,   //商品描述图片
            }
            if(imageList==""){
               that.$message.error('请上传商品图片');
               return false
            }
            if(imageListdetail.length<1){
               that.$message.error('请上传商品详情banner');
               return false
            }
            // if(imageListmiaos.length<1){
            //    that.$message.error('请上传商品描述图片');
            //    return false
            // }
            if(that.flag==true){
              that.$refs[CommodityAdd].validate((valid) => {
                if (valid) {
                  that.flag=false;
                    that.$api.addcommodity(params)
                        .then(response => {
                            if(response.data.code==0){
                               that.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                                that.flag=true
                            }

                                  that.$router.push({name:'CommodityList'});

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
        //取消
        resetForm(CommodityAdd) {
            this.$router.push({name:'CommodityList'});
        },
        //选择年月日
        selectdate(e){
          this.CommodityAdd.selectdate=e
        },
        //图片上传成功
        handleSuccess(res, file, fileList,index) {
          let that=this;
          if(index==1){
            if(res.code==0){
              that.CommodityAdd.bannerList=res.data
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
              that.CommodityAdd.bannerdetail.push(image);
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
              that.CommodityAdd.productmiaos.push(image);
            }else{
                that.$alert(res.msg,"警告",{
                    confirmButtonText: "确定"
                })
            }
          }
        },
        //图片移除
        handleRemove(file, fileList,index) {
             let that=this;
             if(index==1){
               that.CommodityAdd.bannerList=""

          }else if(index==2){
            that.CommodityAdd.bannerdetail=fileList.map((item,index)=>{
               return {
                  name:item.name,
                  url:item.url,
                  path:item.response.data
               }
            })
          }else if(index==3){
            that.CommodityAdd.productmiaos=fileList.map((item,index)=>{
               return {
                  name:item.name,
                  url:item.url,
                  path:item.response.data
               }
            })
          }

        },
        //点击文件列表中已上传的文件时
        handlePreview(file) {
            // console.log(file);
        },
        //商品列表图片上传之前调用 做一些拦截限制
        beforeUpload(file,index){
            // console.log(index)
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
                // const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传的图片只能是jpg、jpeg、png格式!');
                }
                // if (!isLt2M) {
                // this.$message.error('上传商品图片大小不能超过 2MB!');
                // }
                return isJPG;
                // return isJPG && isLt2M;
            }
          },
        //商品列表图片文件超出个数限制时
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
        },

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
    .miaosniu{width: 200px;}
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

        .el-input{width: 225px;}
        .termput{width: 80px;display: inline-block;float: left;
            margin-right: 10px;}
    }
}

</style>

