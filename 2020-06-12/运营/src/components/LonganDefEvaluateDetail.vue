<template>
    <div class="DefEvaluateDetail">
       <h3 class="alignleft">查看详情</h3>
       <el-form :model="DelEvalFormData" ref="DelEvalFormData" class="alignleft">

             <el-form-item label="商品名称" label-width="100px" prop="hotelproname" class="multiselect">
               <el-input v-model="DelEvalFormData.prodName" :disabled="true"></el-input>
            </el-form-item>
          <el-form-item label="酒店名称" label-width="100px">
              <el-input v-model="DelEvalFormData.hotelName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item class="evaluate" label="评价内容" prop="evaluate" label-width="100px">
             <el-input v-model="DelEvalFormData.remarkContent" maxlength="255" type="textarea" :rows="4" :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="上传图片" prop="bannerList" class="picupload" label-width="100px">
              <div>
                  <img v-for="(item,index) in DelEvalFormData.remarkImageDTOS" :key="index" class="picimg" :src="item.imageUrl">
              </div>
            </el-form-item>

            <el-row>
                <el-col :span="24" class="niuwrap">
                    <el-button type="primary" @click="cancelbtn()">返回</el-button>
                </el-col>
            </el-row>

       </el-form>




    </div>
</template>

<script>
export default {
    name: 'LonganDefEvaluateDetail',
    data() {
        return{
            uploadUrl:this.$api.upload_file_url,
            DefEvaluateid:'',
            headers: {},
            DelEvalFormData:{
              hotelproname:[],
              hotelname:[],
              allhotel:true,
              evaluate:'',
              selectxzid:[],
              selecthotelxzid:[],
            },

        }
    },
    created(){
        this.DefEvaluateid=this.$route.query.id;
        const token = localStorage.getItem('Authorization');
        this.headers = {"Authorization": token};
        this.Getdata()
    },
    methods: {

      selectxz(e){
        console.log(e)
        this.DelEvalFormData.selectxzid=[],
       e.map(item=>{
           if(this.DelEvalFormData.selectxzid.indexOf(item.id)==-1){
              this.DelEvalFormData.selectxzid.push(item.id)
           }
        })
        console.log(this.DelEvalFormData.selectxzid)
      },

      delet(index,formData){
         this.DelEvalFormData.selectxzid=[],
         this.DelEvalFormData.hotelproname.splice(index,1)
         console.log(this.DelEvalFormData.hotelproname)
         this.DelEvalFormData.hotelproname.map(item=>{
           if(this.DelEvalFormData.selectxzid.indexOf(item.id)==-1){
              this.DelEvalFormData.selectxzid.push(item.id)
           }
        })
        this.$refs[formData].validate((valid, model) => {
              })
        console.log(this.DelEvalFormData.selectxzid)
      },

      selecthotelxz(e){
         this.DelEvalFormData.selectxzid=[];
         if(e.length>0){
           this.DelEvalFormData.allhotel=''
         }
       e.map(item=>{
           if(this.DelEvalFormData.selectxzid.indexOf(item.id)==-1){
              this.DelEvalFormData.selectxzid.push(item.id)
           }
        })
        console.log(this.DelEvalFormData.selectxzid)
      },

      delethotel(index,formData){
         this.DelEvalFormData.selecthotelxzid=[],
         this.DelEvalFormData.hotelname.splice(index,1)
         console.log(this.DelEvalFormData.hotelname)
         this.DelEvalFormData.hotelname.map(item=>{
           if(this.DelEvalFormData.selecthotelxzid.indexOf(item.id)==-1){
              this.DelEvalFormData.selecthotelxzid.push(item.id)
           }
        })
        this.$refs[formData].validate((valid, model) => {
              })
        console.log(this.DelEvalFormData.selecthotelxzid)
      },

      allhotel(e,formData){
          if(e==true){
            this.DelEvalFormData.hotelname=[];
            this.DelEvalFormData.selecthotelxzid=[];
          }
          this.$refs[formData].validate((valid, model) => {
              })
      },


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganDefEvaluate'})
      },


       //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.EvalDetail({params},that.DefEvaluateid).then(response=>{
                if(response.data.code==0){
                  that.DelEvalFormData=response.data.data
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




    }
}
</script>

<style lang="less" scoped>
.DefEvaluateDetail{
    width: 80%;
     .picupload{width: 500px;
     .picimg{width: 100px;height: 100px;display: inline-block;
      border: 1px solid #333;margin-right: 10px;
     }
    }
    .hangitem{text-align: left}
    .alignleft{text-align: left;}
    .hotelname,.allhotel{display: inline-block;}
   .niuwrap{text-align:left;margin-top: 60px;}
   .el-input,.el-textarea{width: 320px;}
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
}

</style>

<style lang="less">
.DefEvaluateDetail{
   .seeordertitle .el-form-item__label{width:100px;}
   .el-form-item__content{text-align: left !important;}
   .multiselect{
      .el-select .el-tag{display: none;}
    }
}
</style>


