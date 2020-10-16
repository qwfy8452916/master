<template>
    <div class="hotellist">
        <el-row>
           <el-col :span="24" class="addcommodity">
                查看商品信息
            </el-col>
        </el-row>
        <el-table :data="CabinetLook" border style="width:100%;">
          <el-table-column fixed prop="latticeCode" label="格子序号" width="80px" align=center></el-table-column>
            <el-table-column  prop="prodProductDTO.id" label="商品id" width="120px" align=center>
              <template slot-scope="scope">
                    <span v-if="scope.row.prodProductDTO != null" >{{scope.row.prodProductDTO.id}} </span>
                </template>
            </el-table-column>
            <el-table-column prop='' label="商品图片" align=center>
                <template slot-scope="scope">
                    <img v-if="scope.row.prodProductDTO != null" :src="scope.row.prodProductDTO.prodLogoUrl" alt="" style="width: 50px;height: 50px">
                </template>
            </el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodUnitMeasure" label="规格" width="180px" align=center></el-table-column>
            <el-table-column prop="hotelProduct.prodRetailPrice" label="零售价" width="100px" align=center></el-table-column>
            <!-- <el-table-column prop="isFree" label="设为免费" width="100px" align=center>
                  <template slot-scope="scope">
                      <el-checkbox v-if="scope.row.isFree==0" true-label="1" false-label="0" v-model="scope.row.isFree" @change="handleCheckAllChange(scope.$index,CabinetLook)"></el-checkbox>
                      <el-checkbox v-else-if="scope.row.isFree==1" checked true-label="1" false-label="0" v-model="scope.row.isFree" @change="handleCheckAllChange(scope.$index,CabinetLook)"></el-checkbox>
                  </template>
            </el-table-column> -->
            <el-table-column  prop="isEmpty" label="是否有商品" width="120px" align=center show-overflow-tooltip>
                   <template slot-scope="scope">
                        <span v-if="scope.row.isEmpty==0">有商品</span>
                        <span v-else-if="scope.row.isEmpty==1">无商品</span>
                    </template>
            </el-table-column>
            <el-table-column fixed="right" prop="replTime" label="最近补货时间" width="180px" align=center></el-table-column>
        </el-table>
        <div class="btnwrap">
            <el-button @click="resetForm">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cabinetlook',
    data() {
        return{
            query:'',
            inquireHotelName: '',
            hotelid:'',
            Cabinetid:'',   //柜子id
            CabinetLook: [],
            isFreeboll:true,
        }
    },
    created() {
        this.Cabinetid=this.$route.query.modifyid;
        this.query=this.$route.query.query
        this.Getdata();
    },
    methods: {
        //加载数据
        Getdata(){
          let that=this;
          let params={
            cabinetId:that.Cabinetid,
            orgAs:2
          };
          this.$api.CabinetLook({params}).then(response =>{
             if(response.data.code==0){
               console.log(response.data.data)
               that.CabinetLook=response.data.data;
             }else{
                 that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                    })
             }
          }).catch(error=>{
              that.$alert(error,"警告",{
                  confirmButtonText:"确定"
              })
          })

        },

       //设为免费
        // handleCheckAllChange(index,row){
        //   let that=this;
        //   let isFree=row[index].isFree
        //   let id=row[index].id
        //   let params={
        //     isFree:isFree
        //   };
        //   this.$api.updatelattice(params,id).then(response =>{
        //     if(response.data.code==0){
        //       this.$message.success('设置成功')
        //     }
        //   }).catch(error=>{
        //     that.$alert(error,"警告",{
        //       confirmButtonText:"确定"
        //     })
        //   })
        // },

        //取消
        resetForm() {
          let query=this.query;
            this.$router.push({name:'Cabinetgl',query:{query}});
        },

    }
}
</script>

<style lang="less" scoped>

.addcommodity{text-align:left;margin-bottom: 12px;font-weight: bold;}
.btnwrap{margin-left: 20px;text-align: left;margin-top: 30px;}
</style>

