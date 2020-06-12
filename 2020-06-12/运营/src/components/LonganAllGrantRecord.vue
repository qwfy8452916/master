<template>
   <div class="AllGrantRecord">
       <el-form :inline="true" align="left">
          <el-form-item label="批次名称">
             <el-select v-model="batchId" filterable>
                <el-option label="全部" value=""></el-option>
                <el-option
                v-for="item in batchData"
                :label="item.couponBatchName"
                :key="item.id"
                :value="item.id">
                </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="用户id">
             <el-input v-model="cusId"></el-input>
          </el-form-item>
          <el-form-item label="发放结果">
             <el-select v-model="isSuccess">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="失败" value="0"></el-option>
                 <el-option label="成功" value="1"></el-option>
             </el-select>
          </el-form-item>
            <el-form-item label="发放时间">
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

       <el-table :data="GrantDetail" border stripe style="width:100%">
          <el-table-column prop="couponBatchName" label="批次名称" align="center"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称" align="center"></el-table-column>
          <el-table-column prop="cusId" label="用户id" align="center"></el-table-column>
          <el-table-column prop="cusNickName" label="用户昵称" align="center"></el-table-column>
          <el-table-column prop="givedTime" label="发放时间" align="center"></el-table-column>
          <el-table-column prop="isSuccess" label="发放结果" align="center">
             <template slot-scope="scope">
                <span v-if="scope.row.isSuccess=='0'">失败</span>
                <span v-if="scope.row.isSuccess=='1'">成功</span>
             </template>
          </el-table-column>
          <el-table-column prop="failedRemark" label="失败原因" align="center"></el-table-column>
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
     name:"LonganAllGrantRecord",
     data(){
       return {
          pageTotal: 1,
          currentPage: 1,
          pageNum: 1,
          givedRecordId:'', //发放记录ID
          batchId:'', //批次id
          cusId:'', //用户id
          isSuccess:'', //发放结果
          loadingO:false,
          deledialog:false,
          couponLimit:'', //优惠券类型
          useDate:[],  //发放时间
          GrantDetail:[], //发放明细数据
          batchData:[], //批次数据
       }
     },

     mounted(){
       this.givedRecordId=this.$route.query.id;
       console.log(this.givedRecordId)
       this.getCouponGrantDetail();
       this.getCouponBatch();
     },

     methods:{


        //获取优惠券批次列表
        getCouponBatch(){
         let that=this;
         let params="";
          this.$api.getCouponBatch(params).then(response=>{
             if(response.data.code=='0'){
               that.batchData=response.data.data.records;
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

        //查看优惠券批次发放记录明细列表（分页，条件）
        getCouponGrantDetail(){
         let that=this;
         let params={
            pageNo: this.pageNum,
            pageSize: 10,
            givedRecordId:this.givedRecordId,
            batchId:this.batchId,
            cusId:this.cusId,
            isSuccess:this.isSuccess,
            givedTimeStart:this.useDate[0],
            givedTimeEnd:this.useDate[1],
         };
          this.$api.getCouponGrantDetail({params}).then(response=>{
             if(response.data.code=='0'){
               that.GrantDetail=response.data.data.records;
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
            this.getCouponGrantDetail();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.getCouponGrantDetail();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getCouponGrantDetail();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getCouponGrantDetail();
        },

     },

   }
</script>

<style lang="less" scope>
   .AllGrantRecord{
     .alignleft{text-align: left;margin-bottom:10px;}
     .el-dialog__footer{text-align: center !important;}
   }
</style>
