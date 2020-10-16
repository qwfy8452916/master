<template>
    <div class="Franchiseehoteldetail">
       <h3 class="alignleft">查看详情</h3>
       <el-form :model="franchisedetail" ref="franchisedetail" label-width="135px" :inline="true">
          <div class="hangitem widthlimit">
              <el-form-item label="合作伙伴名称" prop="allyName">
                  <el-select v-model="franchisedetail.allyName" placeholder="请选择" @change="classselect" :disabled="true">
                      <el-option value="">全部</el-option>
                      <el-option value="1">合伙人</el-option>
                      <el-option value="2">城市运营商</el-option>
                  </el-select>
              </el-form-item>
          </div>
          <div class="hangitem widthlimit">
              <el-form-item label="酒店名称" prop="hotelName">
                  <el-select :disabled="true" v-model="franchisedetail.hotelName" placeholder="请选择" @change="hotelName">
                     <el-option value="01">思思大酒店</el-option>
                  </el-select>
              </el-form-item>
          </div>
          <!-- <div class="hangitem widthlimit">
              <el-form-item label="身份" prop="hotelAs">
                  <el-select v-model="franchisedetail.hotelAs" placeholder="请选择" @change="hotelAs">
                     <el-option value="01">加盟商01</el-option>
                  </el-select>
              </el-form-item>
          </div> -->
          <div class="hangitem widthlimit">
                <el-form-item label="身份">
                    <el-select :disabled="true" v-model="franchisedetail.hotelAs" @change="selectidentity">
                        <el-option label="加盟商" :value="8"></el-option>
                        <el-option label="合伙人" :value="7"></el-option>
                        <el-option label="城市运营商" :value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" class="identityput" v-if="franchisedetail.hotelAs=='6'">
                    <el-select :disabled="true" v-model="franchisedetail.investType">
                        <el-option label="投资型" :value="1"></el-option>
                        <el-option label="押金型" :value="2"></el-option>
                    </el-select>
                 </el-form-item>
                 <!-- <el-form-item label="" class="identityput" v-if="franchisedetail.hotelAs=='8'">
                    <el-select :disabled="true" v-model="franchisedetail.starLevel">
                        <el-option label="1星" :value="1"></el-option>
                        <el-option label="2星" :value="2"></el-option>
                        <el-option label="3星" :value="3"></el-option>
                        <el-option label="4星" :value="4"></el-option>
                        <el-option label="5星" :value="5"></el-option>
                    </el-select>
                 </el-form-item> -->
           </div>

           <el-form-item class="hangitem selectbox" v-if="franchisedetail.hotelAs=='8'">
               <div class="floorwrap">
                  <div class="floorfont">
                    <span>酒店柜子:</span>
                  </div>
                  <div class="cabwrap">

                      <el-checkbox-group v-model="checkList" :disabled="true">
                        <el-checkbox v-for="item in floordate" :key="item.index"  :label="item.cabTypeName+'-'+item.floorAndRoom"></el-checkbox>
                      </el-checkbox-group>

                  </div>
               </div>
            </el-form-item>


       </el-form>

        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'LonganFranchiseehoteldetail',
    data() {
        return{
          query:'',
          checkId:'',
          franchisedetail:{
              allyName:'',
              hotelAs:'',
              hotelName:'',
              investType:'',
          },
          floordate:[],
          checkList:[],
          province: [],
            city: [],
            area: [],
        }
    },
    created(){
         this.checkId=this.$route.query.id;
         this.query=this.$route.query.query
         this.Getdata()
    },
    methods: {

       //获取数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.Gethotelpartnerdetail({params},that.checkId).then(response=>{
                if(response.data.code==0){
                  that.franchisedetail=response.data.data
                  that.floordate=response.data.data.hotelCabDTOList;
                  let selectcab=response.data.data.hotelCabDTOList;
                  if(selectcab!=null){
                     let selectcabdata=selectcab.map(item=>item.floorAndRoom)
                     that.checkList=selectcabdata;
                  }
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


       //取消
      cancelbtn(){
        let query=this.query;
        this.$router.push({name:'LonganFranchiseehotellist',query:{query}})
      },



      selectidentity(e){

      },

      classselect(e){

      },

      hotelAs(e){

      },

      hotelName(e){

      },


    }
}
</script>

<style lang="less" scoped>
.Franchiseehoteldetail{
    width: 80%;
    .alignleft{text-align: left;}

   .niuwrap{text-align:left;margin-top: 60px;padding-left: 160px;box-sizing: border-box;}
   .hangitem{text-align: left;}
   .selectbox{width: 100%;text-align: left;}

   .floorwrap{overflow: hidden;padding: 5px 10px;border: 1px solid #c9c9c9;
   box-sizing: border-box;margin-bottom: 10px;margin-left: 80px;}
   .floorfont{font-size: 14px;color: #606266;text-align: left;}
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
   .selectbox .el-form-item__content{width: 87%;}
</style>


