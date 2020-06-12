<template>
   <div class="CouponOrder">
       <el-form :inline="true" align="left">
          <!-- <el-form-item label="批次名称">
             <el-select v-model="batchId" filterable>
                <el-option label="全部" value=""></el-option>
                <el-option
                v-for="item in batchData"
                :label="item.couponBatchName"
                :key="item.id"
                :value="item.id">
                </el-option>
             </el-select>
          </el-form-item> -->
          <el-form-item label="订单编号">
             <el-input v-model="orderCode"></el-input>
          </el-form-item>
          <el-form-item label="酒店名称" prop="inquireHotel">
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
          <el-form-item label="用户id">
             <el-input v-model="cusId"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
             <el-input v-model="cusPhone"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
             <el-select v-model="isSuccess">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="待支付" value="0"></el-option>
                 <el-option label="已支付" value="1"></el-option>
                 <el-option label="已取消" value="1"></el-option>
             </el-select>
          </el-form-item>
            <el-form-item label="下单时间">
               <el-date-picker
                v-model="useDate"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="过期日期">
               </el-date-picker>
             </el-form-item>

             <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
             </el-form-item>
       </el-form>

       <el-table :data="couponOrderData" border stripe style="width:100%">
          <el-table-column prop="couponBatchName" label="批次名称" align="center"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称" align="center"></el-table-column>
          <el-table-column prop="couponName" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="couponName" label="酒店名称" align="center"></el-table-column>
          <el-table-column prop="couponName" label="商品数量" align="center"></el-table-column>
          <el-table-column prop="couponName" label="商品金额" align="center"></el-table-column>
          <el-table-column prop="couponName" label="优惠券金额" align="center"></el-table-column>
          <el-table-column prop="couponName" label="实付金额" align="center"></el-table-column>
          <el-table-column prop="cusId" label="用户id" align="center"></el-table-column>
          <el-table-column prop="cusNickName" label="用户昵称" align="center"></el-table-column>
          <el-table-column prop="reduceMoney" label="手机号" align="center"></el-table-column>
          <el-table-column prop="reduceMoney" label="订单状态" align="center"></el-table-column>
          <el-table-column prop="givedTime" label="下单时间" align="center"></el-table-column>
          <el-table-column prop="givedTime" label="支付时间" align="center"></el-table-column>
          <el-table-column prop="givedTime" label="取消时间" align="center"></el-table-column>
          <el-table-column prop="id" label="操作" align="center">
             <template slot-scope="scope">
                <el-button type="text" @click="checkDetail(scope.row.id)">商品详情</el-button>
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

   </div>
</template>

<script>
   export default {
     name:"LonganCouponOrder",
     data(){
       return {
          pageTotal: 1,
          currentPage: 1,
          pageNum: 1,
          batchId:'', //批次id
          cusId:'', //用户id
          cusPhone:'', //手机号
          orderCode:'', //订单编号
          hotelId:'', //酒店id
          isSuccess:'', //发放结果
          loadingO:false,
          deledialog:false,
          loadingH:false,
          couponLimit:'', //优惠券类型
          inquireHotel:'', //酒店id
          useDate:[],  //发放时间
          couponOrderData:[{couponBatchName:'优惠券订单批次1',id:61}], //优惠券订单数据
          // batchData:[], //批次数据
          hotelList: [], //酒店数据
       }
     },

     mounted(){
       this.getHotelList();
      //  this.getCouponcouponOrderData();
      //  this.getCouponBatch();
     },

     methods:{




        //查看详情
        checkDetail(id){
          this.$router.push({name:"LonganCouponOrderDetail",query:{id}})
        },


        //获取优惠券批次列表
        // getCouponBatch(){
        //  let that=this;
        //  let params="";
        //   this.$api.getCouponBatch(params).then(response=>{
        //      if(response.data.code=='0'){
        //        that.batchData=response.data.data.records;
        //      }else{
        //        that.$alert(response.data.msg,"警告",{
        //          confirmButtonText:"确定"
        //        })
        //      }
        //   }).catch(error=>{
        //     that.$alert(error,"警告",{
        //       confirmButtonText:"确定"
        //     })
        //   })
        // },

        //查看优惠券批次发放记录明细列表（分页，条件）
        getCouponcouponOrderData(){
         let that=this;
         let params={
            pageNo: this.pageNum,
            pageSize: 10,
            givedRecordId:this.givedRecordId,
            // batchId:this.batchId,
            orderCode:this.orderCode,
            hotelId:this.hotelId,
            cusId:this.cusId,
            cusPhone:this.cusPhone,
            isSuccess:this.isSuccess,
            givedTimeStart:this.useDate[0],
            givedTimeEnd:this.useDate[1],
         };
          this.$api.getCouponOrder({params}).then(response=>{
             if(response.data.code=='0'){
               that.couponOrderData=response.data.data.records;
               that.pageTotal=response.data.data.total;
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
        inquire(){
            this.pageNum = 1;
            this.getCouponcouponOrderData();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.getCouponcouponOrderData();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getCouponcouponOrderData();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getCouponcouponOrderData();
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

     },

   }
</script>

<style lang="less" scope>
   .CouponOrder{
     .alignleft{text-align: left;margin-bottom:10px;}
     .el-dialog__footer{text-align: center !important;}
   }
</style>
