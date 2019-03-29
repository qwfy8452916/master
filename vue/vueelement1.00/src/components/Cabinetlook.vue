<template>
    <div class="hotellist">
        <el-row>
        <el-col :span="24" class="addcommodity">
                查看商品信息
            </el-col>
        </el-row>
        <el-table :data="CabinetLook" border style="width:100%;" >
            <el-table-column fixed prop="oprProductDTO.id" label="商品id" width="180px" align=center></el-table-column>
            <el-table-column prop='oprProductDTO.imagePathList[0]' label="商品图片" width="180px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.oprProductDTO.imagePathList[0]" alt="" style="width: 50px;height: 50px">
                </template> 
            </el-table-column>
            <el-table-column prop="oprProductDTO.productName" label="商品名称" width="180px" align=center></el-table-column>
            <el-table-column prop="oprProductDTO.proSize" label="规格" width="180px" align=center></el-table-column>
            <el-table-column prop="oprProductDTO.retailPrice" label="建议零售价" width="180px" align=center></el-table-column>
            <el-table-column prop="isEmpty" label="是否有商品" width="240px" align=center show-overflow-tooltip>
                   <template scope="scope">
                        {{ scope.row.isEmpty ? '有商品' : '无商品' }}
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

        }
   
    }
}
</script>

<style lang="less" scoped>

.addcommodity{text-align:left;margin-bottom: 12px;font-weight: bold;}
</style>

