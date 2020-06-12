<template>
   <div class="PlatformCoupon">
       <el-form :inline="true" :model="query" ref="query" align="left">
          <el-form-item  label="优惠方式" prop="disMethod">
            <el-select v-model="query.disMethod">
              <el-option label="全部" value=""></el-option>
              <el-option label="满减券" value="1"></el-option>
              <el-option label="折扣券" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批次名称" prop="couponBatchName">
             <el-input v-model="query.couponBatchName"></el-input>
          </el-form-item>
          <el-form-item label="优惠券名称" prop="couponName">
             <el-input v-model="query.couponName"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="couponLimit">
             <el-select v-model="query.couponLimit">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="唯一券" value="0"></el-option>
                 <el-option label="分组券" value="1"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="优惠券金额" prop="reduceMoney">
             <el-input v-model="query.reduceMoney"></el-input>
          </el-form-item>
            <el-form-item label="领取/发放有效期" prop="useDate">
               <el-date-picker
                v-model="query.useDate"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="过期日期">
               </el-date-picker>
             </el-form-item>
             <el-form-item label="禁/启用状态" prop="isActive">
             <el-select v-model="query.isActive">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="禁用" value="0"></el-option>
                 <el-option label="启用" value="1"></el-option>
             </el-select>
          </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
             </el-form-item>
             <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
       </el-form>
       <div class="alignleft"><el-button class="addbutton" v-if="authzData['F:BO_COUPON_CURRBATCH_ADD']" @click="addbatch">新增优惠券批次</el-button></div>
       <el-table :data="batchData" border stripe style="width:100%">
          <el-table-column fixed prop="discountWay" label="优惠范围+方式" min-width="120px" align="center">
            <template slot-scope="scope">
                 <span>{{scope.row.couponRange == 1?'商品':'订房'}}{{scope.row.discountWay == 1?'满减券':'折扣券'}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="couponBatchName" label="批次名称" min-width="120px"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称" min-width="120px"></el-table-column>
          <el-table-column prop="couponLimit" label="类型" align="center">
              <template slot-scope="scope">
                 <span v-if="scope.row.couponLimit=='0'">唯一券</span>
                 <span v-if="scope.row.couponLimit=='1'">分组券</span>
              </template>
          </el-table-column>
          <el-table-column label="使用门槛/最低消费金额" min-width="100px" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.discountWay=='1'">{{scope.row.useLimitMoney}}</span>
                <span v-if="scope.row.discountWay=='2'">{{scope.row.discountMinBuyMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reduceMoney" label="优惠券金额/折扣值" min-width="100px" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.discountWay=='1'">{{scope.row.reduceMoney}}</span>
                <span v-if="scope.row.discountWay=='2'">{{scope.row.couponDiscount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discountMaxMoney" label="封顶金额" min-width="100px" align="center"></el-table-column>
          <el-table-column prop="batchStartTime" label="领取/发放有效期" min-width="170px" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.batchStartTime}}至{{scope.row.batchEndTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="couponTermType" label="使用有效期/领取后天数" min-width="100px" align="center">
             <template slot-scope="scope">
                <span v-if="scope.row.couponTermType=='0'">{{scope.row.couponTermDays}}天</span>
                <span v-if="scope.row.couponTermType=='1'">{{scope.row.couponTermStartDate}}至{{scope.row.couponTermEndDate}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="isActive" label="禁/启用状态" align="center">
              <template slot-scope="scope">
                    <el-switch v-if="authzData['F:BO_COUPON_CURRBATCH_SWITCH']" v-model="scope.row.isActive" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.id,scope.row.isActive)"></el-switch>
              </template>
          </el-table-column>
          <el-table-column fixed="right" prop="id" label="操作" align="center" min-width="300px">
              <template slot-scope="scope">
                  <el-button v-if="authzData['F:BO_COUPON_CURRBATCH_MODIFY']" type="text" @click="editBatch(scope.row.id)">修改</el-button>
                  <el-button v-if="authzData['F:BO_COUPON_CURRBATCH_DELETE']" type="text" @click="delBatch(scope.row.id)">删除</el-button>
                  <el-button v-if="authzData['F:BO_COUPON_CURRBATCH_DETAIL']" type="text" @click="checkBtn(scope.row.id)">查看详情</el-button>
                  <el-button v-if="scope.row.canGive=='1' && authzData['F:BO_COUPON_CURRBATCH_GRANT']" :disabled="scope.row.isActive=='0'" type="text" @click="grant(scope.row.id,scope.row.couponBatchName)">发放</el-button>
                  <el-button v-if="authzData['F:BO_COUPON_CURRBATCH_ORDER']" type="text" @click="checkOrder(scope.row.id)">查看订单</el-button>
              </template>
          </el-table-column>
       </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
        <el-dialog title="提示" :visible.sync="deledialog" width="30%">
            <span>是否确认删除该优惠券批次?</span>
            <span slot="footer">
               <el-button @click="deledialog=false">取 消</el-button>
               <el-button type="primary" @click="sureDeleBtn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="发放" :visible.sync="datchdialog" width="30%">
            <el-form :model="diaGrantData" :rules="rules" ref="diaGrantData">
               <el-form-item label="批次名称" label-width="100px">
                   <el-input :disabled="true" v-model="diaGrantData.diabatchName"></el-input>
               </el-form-item>
               <el-form-item label="每用户数量" label-width="100px" prop="userCount">
                   <el-input v-model.number="diaGrantData.userCount"></el-input>
               </el-form-item>
               <el-form-item label="发放对象" label-width="100px" prop="grantObj">
                   <el-input v-model="diaGrantData.grantObj" type="textarea" rows="3"></el-input>
               </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="datchdialog=false">取 消</el-button>
                <el-button v-if="authzData['F:BO_COUPON_CURRBATCH_GRANTSUBMIT']" type="primary" @click="sureGrantBtn('diaGrantData')">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
   export default {
     name:"LonganPlatformCoupon",
     components:{
        LonganPagination,
        resetButton
    },
     data(){
       return {
          authzData:'',
          pageTotal: 0,
          pageSize: 10,
          pageNum: 1,
          batchId:'', //批次id
          deledialog:false,
          datchdialog:false,
          query:{
             couponBatchName:'',  //批次名称
             couponName:'', //优惠券名称
             couponLimit:'', //优惠券类型
             reduceMoney:'',  //优惠券金额
             useDate:[],  //使用有效期
             isActive:'',  //启用禁用
             currentPage:'',
          },

          batchStartTime:'', //领取发放起始时间
          batchEndTime:'',  //领取发放截止时间

          batchData:[],
          diaGrantData:{
             diabatchName:'', //批次名称
             userCount:'',  //每用户数量
             grantObj:'',  //发放对象
          },
          rules:{
            userCount:{required:true,type:'number',message:'每用户数量有误',trigger:blur},
            grantObj:{required:true,message:'请填写发放对象',trigger:blur},
          }
       }
     },
     created(){
       if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
     },
     mounted(){
       (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
       if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.query[item] = this.$store.state.searchList[item]
            }
        }
       this.getCouponBatch();
     },
     methods:{
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getCouponBatch();
        },
       resetFunc(){
            this.query.disMethod = ''
            this.query.couponBatchName = ''
            this.query.couponName = ''
            this.query.couponLimit = ''
            this.query.reduceMoney = ''
            this.query.useDate = ''
            this.query.isActive = ''
            this.getCouponBatch();
        },
        //重置
        resetbtn(query){
          this.$refs[query].resetFields();
        },

        //新增
        addbatch(){
            this.$router.push({name:"LonganPlatformCouponAdd"})
        },

        //修改
        editBatch(id){
          this.query.currentPage=this.currentPage
          let query=this.query
          this.$router.push({name:"LonganPlatformCouponEdit",query:{id,query}})
        },
        //查看详情
        checkBtn(id){
          this.query.currentPage=this.currentPage
          let query=this.query
          this.$router.push({name:"LonganPlatformCouponcheck",query:{id,query}})
        },

        //查看订单
        checkOrder(id){
           let orgAs=2;
           this.$router.push({name:"LonganOrderList"})
        },
        //删除
        delBatch(id){
          this.batchId=id;
          this.deledialog=true;
        },
        //确认删除
        sureDeleBtn(){
          let that=this;
          let params="";
          this.$api.deleCouponBatch(params,that.batchId).then(response=>{
            if(response.data.code=='0'){
              that.deledialog=false;
              that.$message.success("操作成功")
              that.getCouponBatch();
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


        //发放
        grant(id,name){
          this.batchId=id;
          this.diaGrantData.diabatchName=name;
          this.diaGrantData.userCount="";
          this.diaGrantData.grantObj="";
          this.datchdialog=true;
        },

        //确认发放
        sureGrantBtn(diaGrantData){
          let that=this;
          let params={
            batchId:this.batchId,
            couponBatchName:this.diaGrantData.diabatchName,
            countPerUser:this.diaGrantData.userCount,
            users:this.diaGrantData.grantObj,
          };
          this.$refs[diaGrantData].validate((valid,model)=>{
            if(valid){
               this.$api.grantCoupon(params).then(response=>{
                  if(response.data.code=='0'){
                    that.$message.success("操作成功")
                    that.datchdialog=false;
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
             }else{
               console.log('error!')
             }
          })

        },
        //启用禁用
        updateStatus(id,isActive){
           let that=this;
           let params="";
           this.$api.couponIsActiv(params,id).then(response=>{
            console.log(response.data.code)
             if(response.data.code=='0'){
                that.$message.success("操作成功")
                that.getCouponBatch();
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
        //获取优惠券批次列表
        getCouponBatch(){
         let that=this;
         if(this.useDate == null){
                this.useDate = [];
            }
         let params={
            orgAs:2,
            couponType:0,
            pageNo: this.pageNum,
            pageSize: this.pageSize,
            discountWay:this.query.disMethod,
            couponBatchName:this.query.couponBatchName,
            couponName:this.query.couponName,
            couponLimit:this.query.couponLimit,
            reduceMoney:this.query.reduceMoney,
            batchStartTime:this.query.useDate[0],
            batchEndTime:this.query.useDate[1],
            isActive:this.query.isActive,
         };
          this.$api.getCouponBatch({params}).then(response=>{
             if(response.data.code=='0'){
               that.batchData=response.data.data.records;
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
            this.getCouponBatch();
            this.$store.commit('setSearchList',{
                discountWay: this.query.disMethod,
                couponBatchName: this.query.couponBatchName,
                couponName:this.query.couponName,
                couponLimit:this.query.couponLimit,
                reduceMoney:this.query.reduceMoney,
                useDate:this.query.useDate,
                isActive:this.query.isActive
            })
        },

     },

   }
</script>

<style lang="less" scope>
   .PlatformCoupon{
     .pagination{
          margin-top: 20px;
      }
     .alignleft{text-align: left;margin-bottom:10px;}
     .el-dialog__footer{text-align: center !important;}
     .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
     }
   }
</style>
