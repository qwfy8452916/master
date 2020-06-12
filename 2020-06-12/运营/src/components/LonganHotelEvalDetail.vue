<template>
    <div class="HotelEvalDetail">
       <h3 class="alignleft">查看详情</h3>
        <table>
          <tr>
            <td>酒店名称</td><td>{{EvalFormData.hotelName}}</td>
          </tr>
          <tr>
            <td>商品类型</td><td>
               <span v-if="EvalFormData.prodOwnerOrgKind==1">平台</span>
               <span v-if="EvalFormData.prodOwnerOrgKind==2">运营商</span>
               <span v-if="EvalFormData.prodOwnerOrgKind==3">酒店</span>
               <span v-if="EvalFormData.prodOwnerOrgKind==4">供应商</span>
               <span v-if="EvalFormData.prodOwnerOrgKind==5">入驻商家</span>
            </td>
          </tr>
          <tr>
            <td>商家</td><td>{{EvalFormData.prodOwnerOrgName}}</td>
          </tr>
          <tr>
            <td>用户id</td><td>{{EvalFormData.customerId}}</td>
          </tr>
          <tr>
            <td>用户昵称</td><td>{{EvalFormData.nickName}}</td>
          </tr>
          <tr>
            <td>商品名称</td><td>{{EvalFormData.prodName}}</td>
          </tr>
          <tr>
            <td>评价内容</td><td>{{EvalFormData.remarkContent}}</td>
          </tr>
          <tr>
            <td>评价图片</td>
            <td class="picwrap">
                <a v-for="(item,index) in EvalFormData.remarkImageDTOS" :key="index" :href="item.imageUrl" target="_blank">
                  <img :src="item.imageUrl"/>
                </a>
                <!-- <a href="http://pic37.nipic.com/20140113/8800276_184927469000_2.png" target="_blank">
                  <img src="http://pic37.nipic.com/20140113/8800276_184927469000_2.png"/>
                </a>-->
            </td>
          </tr>
          <tr>
            <td>评价时间</td><td>{{EvalFormData.createdAt}}</td>
          </tr>
          <tr>
            <td>评论来源</td><td>{{EvalFormData.remarkSource=='1'?'用户':'默认'}}</td>
          </tr>

        </table>



        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button type="primary" @click="cancelbtn()">返回</el-button>
                <el-button v-if="authzData['F:BO_REM_EVALUATEDETAILDELETE']" type="primary" @click="deletebtn()">删除</el-button>
            </el-col>
        </el-row>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确定删除该评价？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'LonganHotelEvalDetail',
    data() {
        return{
            authzData:'',
            evaluateid:"",  //查看id
            EvalFormData:{},  //数据
            orderinfo:[],   //订单信息
            dialogVisibleDelete:false,
        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.evaluateid=this.$route.query.id;
        this.Getdata()
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganHotelEvaluate'})
      },

      //删除
      deletebtn(){
        this.dialogVisibleDelete=true
      },

      //确定删除
      Confirmdel(){
        let params={};
          this.$api.DeleEvaluate(params,this.evaluateid).then(response=>{
                if(response.data.code==0){
                   this.$message.success("操作成功过！")
                   this.dialogVisibleDelete=false
                   this.$router.push({name:'LonganHotelEvaluate'})
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

        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.EvalDetail({params},that.evaluateid).then(response=>{
                if(response.data.code==0){
                  that.EvalFormData=response.data.data
                  console.log(that.EvalFormData)
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

    }
}
</script>

<style lang="less" scoped>
.HotelEvalDetail{
    width: 80%;
    .alignleft{text-align: left;}
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 350px;border-top: 1px solid #e4e4e4;}
    .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
    }
   .niuwrap{text-align:left;margin-top: 60px;}
   a{text-decoration: none;}
   .picwrap img{width: 50px;height: 40px;cursor: pointer;float: left;margin-right: 10px;}
}

</style>

<style>
   .seeordertitle .el-form-item__label{width:100px;}
</style>


