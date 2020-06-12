<template>
   <div class="ReplenishList">
      <el-form :inline="true" align=left>
          <el-form-item label="酒店名称">
            <el-select
                v-model="inquireHotel"
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
         <el-form-item label="房间号">
            <el-input v-model="roomCode"></el-input>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" @click="searchBtn">查询</el-button>
         </el-form-item>
         <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
      </el-form>
      <el-table :data="replenishData" border stripe style="width:100%">
          <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
          <el-table-column prop="roomFloor" label="楼层" align="center"></el-table-column>
          <el-table-column prop="roomCode" label="房间号" align="center"></el-table-column>
          <el-table-column prop="" label="操作" align="center">
             <template slot-scope="scope">
                 <el-button type="text" v-if="authzData['F:BO_CAB_REPLENISH_DETAIL']" @click="checkDetail(scope.$index,replenishData)">查看详情</el-button>
             </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
        <el-dialog :title="diatitle.hotelName+'-'+diatitle.roomFloor+'楼'+diatitle.roomCode" :visible.sync="dialogShow" class="dialogDetail">
             <el-table :data="latticeData" border stripe>
                 <el-table-column prop="latticeCode" label="格子编号" align="center"></el-table-column>
                 <el-table-column prop="prodName" label="商品名称" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.opFlag=='3'">{{scope.row.changeProdProductDTO.prodName}}</span>
                        <span v-if="scope.row.opFlag!='3' && scope.row.opFlag!='0'">{{scope.row.prodProductDTO.prodName}}</span>
                    </template>
                 </el-table-column>
                 <el-table-column prop="opFlag" label="类型" align="center">
                    <template slot-scope='scope'>
                      <span v-if="scope.row.opFlag=='1'">补货</span>
                      <span v-if="scope.row.opFlag=='2'">取货</span>
                      <span v-if="scope.row.opFlag=='3'">换货</span>
                      <span v-if="scope.row.opFlag=='0'"></span>
                    </template>
                 </el-table-column>
                 <el-table-column prop="changeProdCount" label="补货数量" align="center">
                    <template slot-scope="scope">
                       <span v-if="scope.row.opFlag=='3'">{{scope.row.changeProdCount}}</span>
                       <span v-if="scope.row.opFlag!='3' && scope.row.opFlag!='0'">{{scope.row.prodCount}}</span>
                    </template>
                 </el-table-column>
             </el-table>
             <div class="wraptotal">
                合计
                <div><span style="margin-right:8px;display:inline-block;" v-for="(item,key) in latticeData" :key="key"><span v-if="item.prodProductDTO!=null && item.opFlag!='3' && item.opFlag!='0'">{{item.prodProductDTO.prodName}}*{{item.prodCount}}</span><span v-if="item.changeProdProductDTO!=null && item.opFlag=='3'">{{item.changeProdProductDTO.prodName}}*{{item.changeProdCount}}</span></span></div>
             </div>
        </el-dialog>
   </div>
</template>

<script>
import resetButton from './resetButton'
  export default {
    name:'LonganReplenishList',
    components:{
        resetButton
    },
    data(){
      return {
         authzData:'',
         pageTotal:1,
         pageNum:1,
         currentPage:1,
         pageSize:10,
         loadingH:false,
         dialogShow:false,
         hotelList:[], //酒店数据
         inquireHotel:'', //酒店id
         roomCode:'', //房间号
         replenishData:[], //补货数据

         diatitle:{
           hotelName:'',
           roomFloor:'',
           roomCode:'',
         },
         latticeData:[], //格子信息
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
       this.getReplenish();
    },
    methods:{
      resetFunc(){
            this.inquireHotel = ''
            this.roomCode = ''
            this.getReplenish();
        },
      //查看详情
      checkDetail(index,data){
        let that=this;
        let params="";
        let cabId=data[index].id;
        this.diatitle.hotelName=data[index].hotelName;
        this.diatitle.roomFloor=data[index].roomFloor;
        this.diatitle.roomCode=data[index].roomCode;
        that.latticeData=[];
        this.$api.getReplenishDetail(params,cabId).then(response=>{
          if(response.data.code=='0'){
            that.dialogShow=true;
            that.latticeData=response.data.data
          }else{
            that.$alert(response.data.msg,"警告",{
              confirmButtonText:"确定"
            })
          }
        }).catch(error=>{
          that.$alert(error,"警告",{
            confirmButtonText:"确定"
          })
        })
      },

      //查询
      searchBtn(){
         this.getReplenish();
         this.$store.commit('setSearchList',{
                inquireHotel: this.inquireHotel,
                roomCode:this.roomCode
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

        getReplenish(){
          let that=this;
          let params={
            hotelId:this.inquireHotel,
            roomCode:this.roomCode,
            pageNo: this.pageNum,
            pageSize: this.pageSize,
          };
          this.$api.getReplenish({params}).then(response=>{
            if(response.data.code=='0'){
              that.replenishData=response.data.data.records
              that.pageTotal=response.data.data.total
            }else{
              that.$alert(response.data.msg,"警告",{
                confirmButtonText:'确定'
              })
            }
          }).catch(error=>{
            that.$alert(error,"警告",{
              confirmButtonText:"确定"
            })
          })


        },

        current(){
            this.pageNum = this.currentPage;
            this.getReplenish();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getReplenish();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getReplenish();
        },

    },
  }


</script>

<style lang="less" scope>
.ReplenishList{
   .dialogDetail{
     text-align: left;
     .el-dialog__title{float: left;}
     .wraptotal{margin-top: 20px;}
   }
}

</style>







