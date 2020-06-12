





<template>
    <div class="LonganChoiceCabinet">
       <h3 class="alignleft">管理柜子</h3>
       <el-form :model="franchiseeadd" ref="franchiseeadd" label-width="135px" :inline="true">
         <div class="hangitem">
            <el-form-item label="投资类型" prop="classification">
              <!-- <el-radio-group v-model="franchiseeadd.classification" @change="typeselect">
                <div class="typehang">
                   <el-radio label="1">投资型</el-radio>
                </div>
                <div class="typehang">
                   <el-radio label="2">押金型</el-radio>
                </div>
              </el-radio-group> -->
              <div class="addwrapbox">
                  <div :disabled="true">
                    <el-radio label="1" v-model="franchiseeadd.classification">投资型</el-radio>
                    <span class="addbtn" @click="addcabinet(1)">添加</span>
                  </div>
                  <div v-if="hotelAs!='8'">
                    <el-radio v-model="franchiseeadd.classification" label="2">押金型</el-radio>
                    <span class="addbtn" @click="addcabinet(2)">添加</span>
                  </div>
              </div>
            </el-form-item>
          </div>

       </el-form>

        <el-dialog title="选择柜子" :visible.sync="dislogVisibleRole" width="42%">
            <el-transfer
                filterable
                :data = "cabDataList"
                v-model="selectcabinet"
                :titles="['柜子列表','已选柜子列表']"
                >
            </el-transfer>
            <div slot="footer">
                <el-button @click="dislogVisibleRole = false">取 消</el-button>
                <el-button v-if="authzData['F:BO_ALLY_MANAGECABINET_ADDSURE']" type="primary" @click="createSelectCabinet">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'LonganChoiceCabinet',
    data() {
        return{
          authzData: '',
          allyHotelId:'',  //酒店合作伙伴id
          hotelId:'',  //酒店id
          hotelAs:'', //类型
          franchiseeadd:{
              classification:'1',
          },
          dislogVisibleRole:false,
          waitecabDataList:[],   //可选择的柜子数据
          selectcabDataList:[],  //已选择的柜子数据
          cabDataList: [],   //可选择和已选择的柜子数据
          selectcabinet:[],  //已选择的柜子id
        }
    },
    created(){
        this.hotelId=this.$route.query.hotelId;
        this.allyHotelId=this.$route.query.id;
        this.hotelAs=this.$route.query.hotelAs;
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganFranchiseehotellist'})
      },

      //添加柜子
      addcabinet(e){
        let that=this;
        that.selectcabinet=[];
        that.cabDataList=[];
        if(this.franchiseeadd.classification!=''){
          if(this.franchiseeadd.classification==e){
            this.getWaitCabinet(function(e){

              that.getSelectCabinet(function(l){
                    that.cabDataList=e.concat(l);
                    that.dislogVisibleRole=true;
                  });
              })
          }
        }else{
          this.$message.error("请选择投资类型！")
          return false;
        }

      },



      //查询某个酒店可使用的柜子信息
      getWaitCabinet(e){
        let that=this;
        let params={
          hotelId:this.hotelId
        }
        this.$api.getWaitCabinet({params}).then(response=>{
          if(response.data.code==0){
            if(response.data.data!=null){
               that.waitecabDataList=response.data.data.map(item=>{
                  return {
                      key:item.cabId,
                      label:item.cabTypeName+'-'+item.floorAndRoom,
                    }
                  })
            }else{
              that.waitecabDataList=[];
            }

            typeof e == "function" && e(that.waitecabDataList);
          }else{
            that.$alert(response.data.msg,"警告",{
               confirmButtonText:"确定"
            })
          }
        }).catch(err=>{
           that.$alert(err,"警告",{
             confirmButtonText:"确定"
           })
        })
      },

      //获取某个类型下已关联的柜子信息
      getSelectCabinet(l){
        let that=this;
        let params={
          allyHotelId:this.allyHotelId,
          investType:this.franchiseeadd.classification,
        }
        this.$api.getSelectCabinet({params}).then(response=>{
           if(response.data.code==0){
             if(response.data.data!=null){
                that.selectcabinet=response.data.data.map(item=>item.cabId)
                that.selectcabDataList=response.data.data.map(item=>{
                  return {
                    key:item.cabId,
                    label:item.cabTypeName+'-'+item.floorAndRoom,
                  }
                })
             }else{
               that.selectcabDataList=[];
               that.selectcabinet=[];
             }
              typeof l == "function" && l(that.selectcabDataList);
           }else{
             that.$alert(response.data.msg,"警告",{
               confirmButtonText:"确定"
             })
           }
        }).catch(err=>{
          that.$alert(err,"警告",{
            confirmButtonText:"确定"
          })
        })
      },



        //新增数据
       createSelectCabinet(){
            let that=this;
            let params={
                    investType:this.franchiseeadd.classification,
                    cabIds:this.selectcabinet,
                    allyHotelId:this.allyHotelId,
                  };
                this.$api.createSelectCabinet(params).then(response=>{
                  if(response.data.code==0){
                      this.dislogVisibleRole=false;
                      that.$message.success('操作成功！');
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

        // typeselect(e){
        //   this.franchiseeadd.classification=e
        // },

    }
}
</script>

<style lang="less" scoped>
.LonganChoiceCabinet{
    width: 80%;
    .alignleft{text-align: left;}

   .niuwrap{text-align:left;margin-top: 60px;padding-left: 160px;box-sizing: border-box;}
   .hangitem{text-align: left;
     .addwrapbox{display:inline-block;position:relative;margin-left: 15px;
       .addbtn{display: inline-block;padding: 0px 15px;line-height:30px;background: #169bd5;color: #fff;
       border-radius: 5px;cursor: pointer;}
     }
   }
   .typehang{margin-bottom: 30px;position: relative;}
}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hangitem{
      .el-input__inner{width: 280px;}
      .el-form--inline .el-form-item__content{margin-top: 10px;}
   }
   .quyu{
     .el-input__inner{width: 180px;}
   }

   .el-dialog__header{
        text-align: left;
    }
    .el-transfer-panel{
        text-align: left;
        width: 230px !important;
    }
    .el-form--inline .el-form-item{
        margin-left: 15px;
    }
</style>


