<template>
   <div class="CardticketDetail">
      <el-form align="left" :model="carddata" label-width="140px">
          <p class="title">查看详情</p>
          <el-form-item label="酒店" prop="">
             <span style="color:#C0C4CC">{{carddata.vouOwnerOrgName}}</span>
          </el-form-item>
          <el-form-item label="卡券名称" prop="vouName">
               <el-input :disabled="true" v-model="carddata.vouName" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="基础价格" prop="vouBasicPrice">
               <el-input v-model="carddata.vouBasicPrice" :disabled="true"></el-input>元
          </el-form-item>
          <el-form-item label="允许转赠" prop="canGive">
               <el-switch v-model="carddata.canGive" :disabled="true" :active-value="1" :inactive-value="0" ></el-switch>
          </el-form-item>
          <el-form-item label="卡券说明" prop="vouInstruction">
              <el-input v-model="carddata.vouInstruction" :disabled="true" type="textarea" :rows="5" maxlength="250"></el-input>
          </el-form-item>
          <el-form-item label="卡券图片" class="cardpicbox">
            <el-upload
                    :disabled="true"
                    :action="uploadUrl"
                    list-type="picture"
                    :limit="1"
                    :file-list="bannerList"
                    :headers="headers"
                    name="fileContent"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-error="imgUploadError">
                    <el-button size="small" type="primary">上传</el-button>
                    <label slot="tip" class="el-upload__tip">&nbsp;&nbsp;只能上传jpg、jpeg、png文件，且不超过2M，图片最多上传1张</label>
                </el-upload>
          </el-form-item>
          <el-form-item label="使用有效期" prop="vouTermType">
               <div>
                  <el-radio v-model="carddata.vouTermType" :label="0" :disabled="true">领取后天数</el-radio>
                    <el-form-item class="vouTermType" v-if="carddata.vouTermType===0" prop="vouTermDays">
                         <el-input v-model.number="carddata.vouTermDays" :disabled="true"></el-input>天
                    </el-form-item>
               </div>
               <div style="margin-top:10px;">
                  <el-radio v-model="carddata.vouTermType" :label="1" :disabled="true">固定日期</el-radio>
                  <el-form-item class="vouTermType" v-if="carddata.vouTermType=='1'" prop="cardTermDate">
                         <el-date-picker
                          :disabled="true"
                          v-model="carddata.cardTermDate"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="过期日期"
                          >
                        </el-date-picker>
                  </el-form-item>
               </div>
            </el-form-item>
            <el-form-item label="使用场景" prop="vouUseScene">
               <el-select v-model="carddata.vouUseScene" :disabled="true">
                 <el-option :key="item.dictValue" :value="item.dictValue" :label="item.dictName" v-for="item in UseSceneData"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="核销地点" prop="vouVerifiedAddress" v-if="carddata.vouUseScene==1">
                <el-input v-model="carddata.vouVerifiedAddress" :disabled="true" :rows="3" type="textarea" maxlength="250"></el-input>
            </el-form-item>
            <el-form-item label="核销次数" prop="vouVerifiedTotalType" v-if="carddata.vouUseScene==1">
               <el-radio v-model="carddata.vouVerifiedTotalType" :disabled="true" :label="1">一次</el-radio>
               <el-radio v-model="carddata.vouVerifiedTotalType" :disabled="true" :label="2">多次</el-radio>
               <span v-if="carddata.vouVerifiedTotalType==2">
                 <el-form-item prop="vouVerifiedTotal" style="display:inline-block;">
                    <el-input class="vouVerifiedTotal" :disabled="true" v-model.number="carddata.vouVerifiedTotal"></el-input>次
                 </el-form-item>
                 </span>
            </el-form-item>
            <el-form-item label="抵扣设置" prop="vouDeductibleType" v-if="carddata.vouUseScene==2">
               <el-radio v-model="carddata.vouDeductibleType" :disabled="true" :label="0">现金</el-radio>
               <el-form-item prop="vouDeductibleMoney" v-if="carddata.vouDeductibleType==0" class="Moneywrap">
               金额:<el-input v-model="carddata.vouDeductibleMoney" :disabled="true" class="vouDeductibleType"></el-input>元</el-form-item>
               <div>
                  <el-radio v-model="carddata.vouDeductibleType" :disabled="true" :label="1">商品</el-radio>
                  <span v-if="carddata.vouDeductibleType==1">
                    <span style="margin-right:5px;color:#C0C4CC">{{carddata.deductHotelProdName}}<span v-if="carddata.deductHotelProdSpecName!=null">(</span>{{carddata.deductHotelProdSpecName}}<span v-if="carddata.deductHotelProdSpecName!=null">)</span></span>
                  </span>
               </div>
            </el-form-item>
            <el-form-item label="创建人">
             <span style="color:#C0C4CC">{{carddata.createdByName}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span style="color:#C0C4CC">{{carddata.createdAt}}</span>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancelBtn">返回</el-button>
            </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
  name:"LonganCardticketDetail",
  data(){


      return {
       hotelName:"",
       detailId:'',
       uploadUrl:this.$api.upload_file_url,
       UseSceneData:[],
       headers: {},
       bannerList:[],
       carddata:{
         vouName:'',
         vouBasicPrice:'',
         canGive:'',
         vouInstruction:'',
         vouImagePath:'',
         vouTermType:'',
         cardTermDate:[],
         vouTermDays:'',
         vouUseScene:'',
         vouVerifiedAddress:'',
         vouVerifiedTotalType:'',
         vouVerifiedTotal:'',
         vouDeductibleType:'',
         vouDeductibleMoney:'',
         vou_deductible_hotel_prod_id:'', //卡券抵扣商品id
         vouDeductibleHotelProdId:'',
         selectprodName:''
      },
    }
  },
  created(){
        this.detailId=this.$route.query.id;
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.hotelName=localStorage.hotelName;
        this.getUseScene();
        this.CardticketDetail()
  },
  mounted(){

  },
  methods:{



        //获取详情
        CardticketDetail(){
          let that=this;
          let params={};
          this.$api.CardticketDetail(params,this.detailId).then(response=>{
            let result=response.data;
            if(result.code==0){
              that.carddata=result.data
              that.bannerList.push({
                path:result.data.vouImagePath,
                name: result.data.vouImagePath,
                url: result.data.vouImageUrl,
              })
              that.carddata.cardTermDate=[];
              if(result.data.vouTermStartDate!==null || result.data.vouTermEndDate!==null){
                   that.carddata.cardTermDate[0]=result.data.vouTermStartDate;
                   that.carddata.cardTermDate[1]=result.data.vouTermEndDate;
                }

            }else{
              that.$message.error(result.msg)
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        //获取场景
        getUseScene(){
          let that=this;
          let params={
            key:"VOU_USE_SCENE",
            orgId:'0'
          }
          this.$api.basicDataItems(params).then(response=>{
              const result=response.data;
              if(result.code==0){
                that.UseSceneData=result.data.map(item=>{
                  return {
                    dictName:item.dictName,
                    dictValue:parseInt(item.dictValue)
                  }
                })
              }
          }).catch(error=>{
            this.$alert(error,"警告",{
               confirmButtonText:"确定"
            })
          })
        },


        cancelBtn(){
          this.$router.push({name:"LonganCardticketList"})
        },

           //图片上传成功
            handleSuccess(res, file, fileList) {
                  if(res.code==0){
                  const image={
                    name: file.name,
                    url: file.url,
                    path: res.data
                  }
                  this.bannerList.push(image);
                }
            },
            //图片移除
            handleRemove(file, fileList) {
                if(fileList.length>0){
                   this.bannerList=fileList.map((item,index)=>{
                    return {
                        name:item.name,
                        url:item.url,
                        path:item.response.data
                    }
                  })
                }else{
                  this.bannerList=[];
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
                this.$message.error('上传图片不能超过1张！');
            },

            //图片上传失败
            imgUploadError(file,fileList){
                this.$message.error('上传图片失败！');
            }
  }
}
</script>

<style lang="less" scope>
  .CardticketDetail{
    text-align: left;
    .title{
      font-weight: bold;
    }
    .el-input,.el-select,.el-textarea{
      width: 300px;
    }
    .vouTermType{
      display: inline-block;
    }
    .vouTermType .el-input{
      width:100px;
    }
    .frequency.el-input{
      width:100px;
    }
    .vouDeductibleType.el-input{
      width:100px;
    }
    .vouVerifiedTotal.el-input{
      width: 200px;
    }
    .vouDeductibleHotelProdId.el-select{
      .el-input{
        width: 230px;
      }
    }
    .Moneywrap{
      display: inline-block;
    }
    .cardpicbox{
      width: 50%;
    }
  }
</style>



