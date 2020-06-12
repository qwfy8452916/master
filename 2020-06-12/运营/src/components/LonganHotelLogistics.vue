<template>
   <div class="HotelLogistics">
       <el-form :inline="true" align="left">
           <el-form-item label="酒店名称">
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物流名称">
                <el-select
                    v-model="lgcId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingW"
                    @focus="getlogistics()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in logisticsData"
                        :key="item.id"
                        :label="item.lgcName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="inquire">查询</el-button>
           </el-form-item>
           <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
           </el-form-item>
       </el-form>
       <div class="alignleft"><el-button class="addbutton" @click="addBtn">添加</el-button></div>
       <el-table :data="hotelLogisticsData" border stripe>
           <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
           <el-table-column prop="lgcName" label="外部物流" align="center"></el-table-column>
           <el-table-column prop="startPrice" label="计程运费设置" align="center">
             <template slot-scope="scope">
                <span>起步价{{scope.row.startPrice}}元，起步里程{{scope.row.startMileage}}公里，超出价格{{scope.row.exceededMileagePrice}}元/公里</span>
             </template>
           </el-table-column>
           <el-table-column prop="storeCode" label="门店编码" align="center"></el-table-column>
           <el-table-column prop="cityCode" label="城市代码" align="center"></el-table-column>
           <el-table-column prop="orderProdType" label="订单商品类型" align="center"></el-table-column>
           <el-table-column prop="id" label="操作" align="center">
               <template slot-scope="scope">
                  <el-button type="text" @click="detail(scope.row.id)">详情</el-button>
                  <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
                  <el-button type="text" @click="deletebtn(scope.row.id)">移除</el-button>
               </template>
           </el-table-column>
       </el-table>
       <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
       </div>
       <el-dialog title="提示" :visible.sync="deledialog" width="30%">
          <span>是否确认移除该物流？</span>
          <span slot="footer">
             <el-button @click="deledialog=false">取消</el-button>
             <el-button type="primary" @click="sureDele">确定</el-button>
          </span>
       </el-dialog>
   </div>
</template>
<script>
  import resetButton from './resetButton'
  import LonganPagination from '@/components/LonganPagination'
  export default {
    name:"LonganHotelLogistics",
    components:{
      resetButton,
      LonganPagination
    },
    data(){
      return {
        hotelLogisticsData:[],
        logisticsData:[],
        lgcId:'',
        hotelId:"",
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1,
        loadingH:false,
        loadingW:false,
        hotelList:[],
        deledialog:false,
        deleId:'',

      }
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

       if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
              this[item] = this.$store.state.searchList[item]
            }
        }
      this.getHotelList();
      this.getlogistics();
      this.getHotelLogistics();
    },
    methods:{

      resetFunc(){
            this.lgcId=''
            this.hotelId=''
            this.getHotelLogistics();
        },

        //获取列表数据
        getHotelLogistics(){
          let that=this;
          let params={
              hotelId:this.hotelId,
              lgcId:this.lgcId,
              pageNo: this.pageNum,
              pageSize: this.pageSize
          }
          this.$api.getHotelLogistics({params}).then(response=>{
             let result=response.data;
             if(result.code==0){
                that.hotelLogisticsData=result.data.records;
                that.pageTotal=result.data.total
             }else{
               that.$message.error(result.msg)
             }
          }).catch(err=>{
            that.$alert(err,"警告",{
              confirmButtonText:"确定"
            })
          })
        },


        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteHotel(val){
            this.getHotelList(val);
        },

        //获取物流下拉列表
        getlogistics(wName){
            this.loadingH = true;
            const params = {
                lgcName: wName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.getlogistics(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.logisticsData = result.data.records.map(item => {
                            return{
                                id: item.id,
                                lgcName: item.lgcName
                            }
                        })
                        const lgclAll = {
                            id: '',
                            lgcName: '全部'
                        };
                        this.logisticsData.unshift(lgclAll);
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        remoteLogistics(val){
            this.getlogistics(val);
        },

        //修改
        edit(id){
          this.$router.push({name:"LonganHotelLogisticsEdit",query:{id}})
        },

        //详情
        detail(id){
          this.$router.push({name:"LonganHotelLogisticsDetail",query:{id}})
        },
        //添加
        addBtn(){
          this.$router.push({name:"LonganHotelLogisticsAdd"})
        },
        //删除
        deletebtn(id){
          this.deleId=id;
          this.deledialog=true;
        },
        //确定删除
        sureDele(){
          let that=this;
          this.$api.dellogistics(that.deleId).then(response=>{
             const result=response.data;
             if(result.code==0){
               that.$message.success("操作成功")
               that.getHotelLogistics();
               this.deledialog=false;
             }else{
               that.$message.error(result.msg)
               this.deledialog=false;
             }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        //查询
        inquire(){
            this.pageNum = 1;
            this.getHotelLogistics();
            this.$store.commit('setSearchList',{
                lgcId:this.lgcId,
                hotelId:this.hotelId,
            })
        },

        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getHotelLogistics();
        },

    }
  }
</script>

<style lang="less" scope>
  .HotelLogistics{
     .pagination{
       margin-top: 20px;
     }
     .el-dialog__footer{text-align: center !important;}
  }

</style>
