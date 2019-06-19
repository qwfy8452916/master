<template>
    <div class="hotellist">
        <el-row>
           <el-col :span="24" class="addcommodity">
                查看商品信息
            </el-col>
        </el-row>
        <el-table :data="CabinetLook" border style="width:100%;" >
          <el-table-column fixed prop="latticeCode" label="格子序号" width="180px" align=center></el-table-column>
            <el-table-column fixed prop="oprProductDTO.id" label="商品id" width="180px" align=center></el-table-column>
            <el-table-column prop='oprProductDTO.prodLogoUrl' label="商品图片" width="180px" align=center>
                <template slot-scope="scope">
                    <img v-if="scope.row.oprProductDTO.prodLogoUrl!=null" :src="scope.row.oprProductDTO.prodLogoUrl" alt="" style="width: 50px;height: 50px">
                </template>
            </el-table-column>
            <el-table-column prop="oprProductDTO.productName" label="商品名称" width="180px" align=center></el-table-column>
            <el-table-column prop="oprProductDTO.proSize" label="规格" width="180px" align=center></el-table-column>
            <el-table-column prop="oprProductDTO.retailPrice" label="建议零售价" width="180px" align=center></el-table-column>
            <el-table-column prop="isFree" label="设为免费" width="180px" align=center>
                  <template scope="scope">
                      <el-checkbox v-if="scope.row.isFree==0" checked true-label="0" false-label="1" v-model="scope.row.isFree" @change="handleCheckAllChange(scope.$index,CabinetLook)"></el-checkbox>
                 <el-checkbox v-else-if="scope.row.isFree==1" true-label="0" false-label="1" v-model="scope.row.isFree" @change="handleCheckAllChange(scope.$index,CabinetLook)"></el-checkbox>
                  </template>
            </el-table-column>
            <el-table-column fixed="right" prop="isEmpty" label="是否有商品" width="240px" align=center show-overflow-tooltip>
                   <template scope="scope">
                        <span v-if="scope.row.isEmpty==2">有商品</span>
                        <span v-else-if="scope.row.isEmpty==1">无商品</span>
                        <span v-else-if="scope.row.isEmpty==0">无商品</span>
                    </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'Cabinetlook',
    data() {
        return{
            inquireHotelName: '',
            Cabinetid:'',   //柜子id
            CabinetLook: [],
            isFreeboll:true,
        }
    },
    created() {
        this.Cabinetid=this.$route.params.modifyid;
        this.Getdata();
    },
    methods: {
        //加载数据
        Getdata(){
          let that=this;
          let params={
            cabinetId:that.Cabinetid
          };
          this.$api.CabinetLook({params}).then(response =>{
             if(response.data.code==0){
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

        handleCheckAllChange(index,row){
          let that=this;
          let isFree=row[index].isFree
          let id=row[index].id
          let params={
            isFree:isFree
          };
          this.$api.updatelattice(params,id).then(response =>{
            if(response.data.code==0){
              this.$message.success('设置成功')
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

    }
}
</script>

<style lang="less" scoped>

.addcommodity{text-align:left;margin-bottom: 12px;font-weight: bold;}
</style>

