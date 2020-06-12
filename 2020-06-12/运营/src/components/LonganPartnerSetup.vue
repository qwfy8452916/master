<template>
    <div class="PartnerSetup">
       <h3 class="alignleft">合作伙伴设置</h3>
       <el-form :model="partnerdata" ref="partnerdata" :rules="rules" :inline="true">
          <div class="hangitem widthlimit">

              <el-form-item label="合作伙伴" prop="partnername">
                  <el-input v-model="partnerdata.partnername" :disabled="true"></el-input>
              </el-form-item>
              <el-button type="primary" class="rightbtn newadd" @click="adddata">新增</el-button>
          </div>
        <div class="wrap" v-if="showjudege">
          <div class="addwrap hangitem"  v-for="(additem,index) in partnerdata.addidentity" :key="index">
            <div>
                 <el-form-item label="酒店" :prop="'addidentity.'+index+'.hotelId'" :rules="rules.hotelnameyz">
                     <el-select v-model="additem.hotelId" filterable @change="selectHotel(index,additem.hotelId)">
                        <el-option v-for="item in hotelNameList"
                            :key="item.index"
                            :label="item.hotelName"
                            :value="item.id"
                        ></el-option>
                      </el-select>
                  </el-form-item>

                <el-button type="danger" @click="deleteadd(index)" class="rightbtn">删除</el-button>
             </div>
             <div>
                <el-form-item label="身份" :prop="'addidentity.'+index+'.hotelAs'" :rules="rules.identityyz">
                    <el-select v-model="additem.hotelAs" @change="selectidentity(index,additem.hotelAs)">
                        <el-option label="城市运营商" :value="6"></el-option>
                        <el-option label="合伙人" :value="7"></el-option>
                        <el-option label="加盟商" :value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" class="identityput" :prop="'addidentity.'+index+'.investType'" :rules="rules.investTypeyz" v-if="additem.hotelAs=='6'">
                    <el-select v-model="additem.investType">
                        <el-option label=" " :value="0"></el-option>
                        <el-option label="投资型" :value="1"></el-option>
                        <el-option label="押金型" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                 <!-- <el-form-item label="" class="identityput" :prop="'addidentity.'+index+'.starLevel'" :rules="rules.starLevelyz" v-if="additem.hotelAs=='8'">
                    <el-select v-model="additem.starLevel">
                        <el-option label="1星" :value="1"></el-option>
                        <el-option label="2星" :value="2"></el-option>
                        <el-option label="3星" :value="3"></el-option>
                        <el-option label="4星" :value="4"></el-option>
                        <el-option label="5星" :value="5"></el-option>
                    </el-select>
                 </el-form-item> -->
             </div>

              <!-- <el-form-item class="hangitem selectbox" v-if="additem.hotelAs=='8'" :prop="'addidentity.'+index+'.hotelCabDTOList'">

                <div class="floorwrap" v-if="floordate[index]">
                    <div class="floorfont">
                      <span>酒店柜子:</span>
                    </div>
                    <div class="cabwrap">

                        <el-checkbox-group v-model="showselectbox[index].hotelCabDTOList">

                             <el-checkbox v-for="itemcab in floordate[index]" :key="itemcab.index"  @change=selectbox(index,itemcab.cabId) :label="itemcab.floorAndRoom"></el-checkbox>

                        </el-checkbox-group>

                        <el-checkbox-group v-model="showselectbox[index].hotelCabDTOList">
                          <span v-for="(itemcab,suoyin) in floordate[index]" :key="itemcab.index">
                             <el-checkbox v-if="itemcab.cabId=='5' || itemcab.cabId=='7' && itemcab.floorAndRoom!=showselectbox[index].hotelCabDTOList[suoyin]" :disabled="true"  @change=selectbox(index,itemcab.cabId) :label="itemcab.floorAndRoom"></el-checkbox>
                             <el-checkbox v-else @change=selectbox(index,itemcab.cabId) :label="itemcab.floorAndRoom"></el-checkbox>
                          </span>
                        </el-checkbox-group>

                    </div>
                </div>
               </el-form-item> -->

          </div>
        </div>
       </el-form>

        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">取消</el-button>
                <el-button v-if="authzData['F:BO_ALLY_PARTNERSET_SUBMIT']" type="primary" @click="surebtn('partnerdata')">确定</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganPartnerSetup',
    data() {
        return{
          authzData:'',
          partnerId:"",
          showjudege:true,
          hotelNameList:[],
          floordate:[],
          // showselectbox:[],   //选中柜子数据
          // selectcab:[],  //选中柜子数组

          partnerdata:{
             partnername:'',
             addidentity:[
              //  {
              //    hotelId:'',
              //    hotelAs:'',
              //    investType:'',
              //    starLevel:'',
              //    hotelCabDTOList:[],
              //  }
             ],

          },


          rules:{
            partnername:{required: true, message: '请输入合作伙伴！', trigger: 'blur'},
            hotelnameyz:{required: true, message: '请选择酒店！', trigger: 'change'},
            identityyz:{required: true, message: '请选择身份！', trigger: 'change'},
            investTypeyz:{required: true, message: '请选择投资类型！', trigger: 'change'},
            // starLevelyz:{required: true, message: '请选择星级！', trigger: 'change'},
            // hotelCabDTOListyz: { type: 'array', required: true, message: '有酒店柜子未选择！', trigger: 'change'},
          },

        }
    },
    created(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.partnerId=this.$route.query.id;
        this.partnerdata.partnername=this.$route.query.namexm;
        this.query=this.$route.query.query
        this.HotelNameList();
        this.Getdata()
    },
    methods: {


      //点击选中转换成后台接收格式
      // selectbox(index,e){
      //   let that=this;


      //    let selectcab=[];

      //    for(var i=0;i<this.showselectbox[index].hotelCabDTOList.length;i++){

      //       for(var j=0;j<this.floordate[index].length;j++){

      //          if(this.showselectbox[index].hotelCabDTOList[i]==this.floordate[index][j].floorAndRoom){

      //             let newcabId=this.floordate[index][j].cabId
      //             if(selectcab.indexOf(newcabId)==-1){
      //                   selectcab.push(newcabId)
      //               }else{
      //                   selectcab.splice(selectcab.indexOf(newcabId), 1);
      //               }
      //          }
      //       }
      //    }


      //    let selectcabobj=selectcab.map(item=>{
      //       return {cabId:item}
      //    })

      //    this.partnerdata.addidentity[index].hotelCabDTOList=selectcabobj;

      // },


       //取消
      cancelbtn(){
       let query=this.query;
       this.$router.push({name:'LonganFranchiseelist',query:{query}})
      },


      //新增数据
      adddata(){
        this.showjudege=true;
        let newLine= {
                 hotelId:'',
                 hotelAs:'',
                 investType:'',
                //  starLevel:'',
                //  hotelCabDTOList:[],
               };
         this.partnerdata.addidentity.push(newLine)

        //  let newbox= {
        //     hotelCabDTOList:[],
        //  };
        //  this.showselectbox.push(newbox)

      },


      //获取详情数据
       Getdata(){
            let that=this;
            let params={
              allyId:this.partnerId,
            };
            this.$api.Getsetpartnerdetail({params}).then(response=>{
                if(response.data.code==0){

                  that.partnerdata.addidentity=response.data.data.allyHotelDTO;
                  let nowcabarr=response.data.data.allyHotelDTO;
                  for(var i=0;i<nowcabarr.length;i++){
                    if(nowcabarr[i].hotelAs=='8'){
                      that.floordate[i]=nowcabarr[i].specialCabList
                        // that.showselectbox.push({hotelCabDTOList:[]});  //进来不显示勾选

                        // let hotelCabDTOList=nowcabarr[i].hotelCabDTOList.map(item=>item.floorAndRoom)

                        // that.showselectbox.push({hotelCabDTOList})


                    }else{
                      that.floordate[i]=[];
                      // that.showselectbox.push({hotelCabDTOList:[]});
                    }
                  }

                  that.$forceUpdate();

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

        //获取所有酒店名称
        HotelNameList(){

            this.$api.HotelNameList().then(response=>{
                if(response.data.code==0){
                  this.hotelNameList = response.data.data;
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
        },


        //根据酒店id获取酒店柜子
        selectHotel(index,e){
          // let that=this;
          // let params={
          //     hotelId:e,
          //   }
          //   this.$api.SearchHotelCab({params}).then(response=>{
          //       if(response.data.code==0){
          //         that.floordate[index]=response.data.data

          //         this.$forceUpdate();
          //       }else{
          //         this.$alert(response.data.msg,"警告",{
          //           confirmButtonText: "确定"
          //          })
          //       }
          //   }).catch(err=>{
          //     this.$alert(err,"警告",{
          //         confirmButtonText: "确定"
          //     })
          //   })
        },

        //查询某个酒店所有的柜子信息
        // SearchHotelCab(){
        //     let params={
        //       hotelId:'',
        //     }
        //     this.$api.SearchHotelCab({params}).then(response=>{
        //         if(response.data.code==0){
        //           this.floordate = response.data.data;

        //         }else{
        //           this.$alert(response.data.msg,"警告",{
        //             confirmButtonText: "确定"
        //            })
        //         }
        //     }).catch(err=>{
        //       this.$alert(err,"警告",{
        //           confirmButtonText: "确定"
        //       })
        //     })
        // },

      //删除数据
      deleteadd(index){

        this.partnerdata.addidentity.splice(index,1)
        // this.showselectbox.splice(index,1)

        this.$forceUpdate();

      },

      selectidentity(index,e){

        //  if(e==7){
        //    this.partnerdata.addidentity[index].investType='';
        //   //  this.partnerdata.addidentity[index].starLevel='';
        //    this.partnerdata.addidentity[index].hotelCabDTOList=[];
        //   //  this.showselectbox[index].hotelCabDTOList=[];
        //  }
        //  if(e==6){
        //   //  this.partnerdata.addidentity[index].starLevel='';
        //    this.partnerdata.addidentity[index].hotelCabDTOList=[];
        //   //  this.showselectbox[index].hotelCabDTOList=[];
        //  }
      },

      //提交数据
      surebtn(formData){
        let that=this;
        let params={
           allyId:this.partnerId,
           allyHotelDTOList:this.partnerdata.addidentity,
        }


        // for(var i=0;i<this.showselectbox.length;i++){
        //   if(this.showselectbox[i].hotelCabDTOList.length<=0 && this.partnerdata.addidentity[i].hotelAs=='8'){
        //     this.$message.error("有酒店柜子未选择！")
        //     return false;
        //   }
        // }

        console.log(params)
        this.$refs[formData].validate((valid, model) => {
           if(valid){

              this.$api.SetHotelpartner(params).then(response=>{
                 if(response.data.code==0){
                     that.$message.success("操作成功")
                     that.$router.push({name:"LonganFranchiseelist"})
                   }else{
                     this.$alert(response.data.msg,"警告",{
                       confirmButtonText:"确定"
                      })
                  }
              }).catch(err=>{
                this.$alert(err,"警告",{
                  confirmButtonText:"确定"
                })
              })
           }
        })
      },

      classselect(e){

      },

      franchiseename(e){

      },

      hotelname(e){

      },


    }
}
</script>

<style lang="less" scoped>
.PartnerSetup{
    width: 80%;
    .alignleft{text-align: left;}

   .wrap{overflow: hidden;}
   .niuwrap{text-align:left;margin-top: 60px;padding-left: 80px;box-sizing: border-box;}
   .hangitem{text-align: left;}
   .addwrap{border: 1px solid #c9c9c9;padding: 15px 35px;box-sizing: border-box;
     margin-bottom: 15px;
   }
   .rightbtn{float: right;}
   .newadd{margin-right: 35px;}
   .floorwrap{overflow: hidden;padding: 5px 10px;border: 1px solid #c9c9c9;
   box-sizing: border-box;margin-bottom: 10px;}
   .floorfont{font-size: 14px;color: #333;}
   .cabwrap{width: 80%;margin: 0 auto;overflow: hidden;text-align: justify;
     .el-checkbox{margin-bottom: 25px;}
   }

}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hangitem{
      .el-input__inner{width: 280px;}
   }
   .widthlimit{
     .el-input__inner{width: 300px;}
   }
   .identityput{
     .el-input__inner{width: 200px;}
   }
   .selectbox {width: 100%;}
</style>


