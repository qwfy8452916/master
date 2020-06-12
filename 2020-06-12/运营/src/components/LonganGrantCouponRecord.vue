<template>
   <div class="GrantCouponRecord">
       <el-form :inline="true" align="left">
          <el-form-item label="优惠方式">
            <el-select v-model="discountWay">
                <el-option label="全部" value=""></el-option>
                <el-option label="满减券" value="1"></el-option>
                <el-option label="折扣券" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券类型">
             <el-select v-model="couponType" @change="couponTypeEvent">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="通用券" value="0"></el-option>
                 <el-option label="商品券" value="1"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="组织类型">
             <el-select v-model="couponOwnerOrgKind" :disabled="couponDisabled">
                 <el-option label="全部" value=""></el-option>
                 <el-option label="平台" value="1"></el-option>
                 <el-option label="运营商" value="2"></el-option>
                 <el-option label="酒店" value="3"></el-option>
                 <el-option label="供应商" value="4"></el-option>
                 <el-option label="入驻商家" value="5"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="组织名称" prop="couponOwnerOrgId">
                <el-select
                    :disabled="couponDisabled"
                    v-model="couponOwnerOrgId"
                    filterable
                    remote
                    :remote-method="remoteOrgan"
                    :loading="loadingO"
                    @focus="getOrgan()"
                    >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in organNameList"
                        :key="item.index"
                        :label="item.orgName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="批次名称">
             <el-select v-model="batchId"
                    filterable
                    remote
                    :remote-method="remoteBatchone"
                    :loading="loadingBone"
                    @focus="getCouponBatch()">
                <el-option label="全部" value=""></el-option>
                <el-option
                v-for="item in batchData"
                :label="item.couponBatchName"
                :key="item.id"
                :value="item.id">
                </el-option>
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
             <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
       </el-form>
       <div class="alignleft"><el-button class="addbutton" type="primary" @click="grantBtn">发放</el-button></div>
       <el-table :data="GrantRecordData" border stripe style="width:100%">
          <el-table-column fixed prop="discountWay" label="优惠范围+方式" min-width="120px" align="center">
            <template slot-scope="scope">
                 <span>{{scope.row.couponRange == 1?'商品':'订房'}}{{scope.row.discountWay == 1?'满减券':'折扣券'}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="couponType" label="优惠券类型" min-width="100px" align="center">
              <template slot-scope="scope">
                 <span v-if="scope.row.couponLimit=='0'">通用券</span>
                 <span v-if="scope.row.couponLimit=='1'">商品券</span>
              </template>
          </el-table-column>
          <el-table-column prop="couponOwnerOrgKindName" label="组织类型" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="couponOwnerOrgName" label="组织名称" min-width="180px"></el-table-column>
          <el-table-column prop="couponBatchName" label="批次名称" min-width="120px"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称" min-width="120px"></el-table-column>
          <el-table-column prop="givedTime" label="发放时间" min-width="160px" align="center"></el-table-column>
          <el-table-column prop="givedCount" label="计划发放数量" min-width="120px" align="center"></el-table-column>
          <el-table-column prop="successCount" label="发放成功数量" min-width="120px" align="center"></el-table-column>
          <el-table-column prop="failedCount" label="发放失败数量" min-width="120px" align="center"></el-table-column>
          <el-table-column fixed="right" prop="id" label="操作" min-width="80px" align="center">
              <template slot-scope="scope">
                  <el-button v-if="authzData['F:BO_COUPON_GRANT_GRANTRECORD']" type="text" @click="grantRecord(scope.row.id)">发放记录</el-button>
              </template>
          </el-table-column>
       </el-table>
       <div class="pagination">
          <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
       </div>

        <el-dialog title="发放" :visible.sync="datchdialog" width="30%" class="datchdialog">
            <el-form label-width="100px">
              <el-form-item prod="discountWay">
                <span slot="label"><label class="required-icon">*</label> 优惠方式</span>
                <el-select v-model="diaGrantData.discountWay">
                    <el-option label="满减券" value="1"></el-option>
                    <el-option label="折扣券" value="2"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item prod="batchId">
                  <span slot="label"><label class="required-icon">*</label> 批次名称</span>
                   <el-select v-model="diaGrantData.batchId"
                    filterable
                    remote
                    :remote-method="remoteBatch"
                    :loading="loadingB"
                    @focus="getCouponBatchGroup()">
                     <el-option-group
                       v-for="itemparent in batchGroupData"
                       :key="itemparent.couponOwnerOrgKind"
                       :label="itemparent.couponOwnerOrgKindName">
                       <el-option
                        v-for="item in itemparent.batchList"
                        :label="item.couponBatchName"
                        :key="item.id"
                        :value="item.id">
                        </el-option>
                     </el-option-group>
                   </el-select>
               </el-form-item>
               <el-form-item prod="userCount">
                  <span slot="label"><label class="required-icon">*</label> 每用户数量</span>
                   <el-input v-model.number="diaGrantData.userCount"></el-input>
               </el-form-item>
               <el-form-item prod="grantObj">
                  <span slot="label"><label class="required-icon">*</label> 发放对象</span>
                   <el-input v-model="diaGrantData.grantObj" type="textarea" rows="3"></el-input>
               </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="datchdialog=false">取 消</el-button>
                <el-button v-if="authzData['F:BO_COUPON_GRANT_SUBMIT']" type="primary" @click="sureGrantBtn">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
   export default {
     name:"LonganGrantCouponRecord",
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
          deledialog:false,
          datchdialog:false,
          couponDisabled:false,
          loadingO:false,
          loadingB:false,
          loadingBone:false,
          batchData:[], //批次数据
          batchGroupData:[], //批次分组数据
          organNameList:[], //组织列表
          batchId:"", //批次ID
          couponOwnerOrgKind:"", //组织类型ID
          couponOwnerOrgId:'', //优惠券所属组织ID
          couponBatchName:'',  //批次名称
          discountWay: '',   //优惠方式
          couponType:'', //优惠券类型
          useDate:[],  //发放时间
          GrantRecordData:[],
          diaGrantData:{
             discountWay: "",   //优惠方式
             batchId:'', //批次名称
             userCount: 1,  //每用户数量
             grantObj:'',  //发放对象
          },
       }
     },
     mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
      if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
       this.getCouponGrantRecord();
       this.getCouponBatch();
      //  this.getCouponBatchGroup();
     },
     methods:{
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.getCouponGrantRecord();
        },
        resetFunc(){
          this.discountWay = ''
          this.couponType = ''
          this.couponOwnerOrgKind = ''
          this.couponOwnerOrgId = ''
          this.batchId = ''
          this.useDate = []
          this.getCouponGrantRecord();
        },
        //优惠券类型
        couponTypeEvent(e){
          if(e=='0'){
            this.couponOwnerOrgKind="";
            this.couponOwnerOrgId="";
            this.couponDisabled=true
          }else{
            this.couponDisabled=false
          }
        },

        //发放记录
        grantRecord(id){
            this.$router.push({name:"LonganAllGrantRecord",query:{id}})
        },

        //发放
        grantBtn(){
          this.diaGrantData.discountWay="";
          this.diaGrantData.batchId="";
          this.diaGrantData.userCount= 1;
          this.diaGrantData.grantObj="";
          this.datchdialog=true;
        },
        //确认发放
        sureGrantBtn(){
          let that=this;
          if(this.diaGrantData.discountWay == "" || this.diaGrantData.batchId == "" || this.diaGrantData.grantObj == ""){
            that.$message.error("请输入必填项");
            return false;
          }
          let regNum = /^[1-9]\d*$/g;
          if(!regNum.test(this.diaGrantData.userCount)){
            that.$message.error("每用户量格式有误");
            return false;
          }
          let params={
            discountWay:this.diaGrantData.discountWay,
            batchId:this.diaGrantData.batchId,
            couponBatchName:this.diaGrantData.diabatchName,
            countPerUser:this.diaGrantData.userCount,
            users:this.diaGrantData.grantObj
          };
          this.$api.grantCoupon(params)
            .then(response=>{
              const result = response.data;
              if(response.data.code=='0'){
                that.$message.success("操作成功")
                that.datchdialog=false;
              }else{
                that.$message.error(result.msg);
              }
            })
            .catch(error=>{
                that.$alert(error,"警告",{
                  confirmButtonText:"确定"
                })
              })
        },

       //获取组织
        getOrgan(hName){
          let that=this;
          let params={
            orgName: hName,
            pageNo: 1,
            pageSize: 50
          }
          this.$api.getOrganization({params}).then(response=>{
             if(response.data.code==0){
                that.organNameList=response.data.data.records
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
        },
        remoteOrgan(val){
            this.getOrgan(val);
        },
        //获取优惠券批次列表
        getCouponBatch(couponBatchName){
         let that=this;
         let params={
           couponBatchName:couponBatchName,
           pageNo: 1,
           pageSize: 50
         };
          this.$api.getCouponBatch({params}).then(response=>{
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
        remoteBatchone(val){
           this.getCouponBatch(val);
        },
        //按组织类型分组可发放的批次
        getCouponBatchGroup(batchName){
          if(this.diaGrantData.discountWay == ""){
            this.$message.error("请选择优惠方式");
            return false;
          }
          let that=this;
          let params={
            discountWay: this.diaGrantData.discountWay,
            batchName:batchName,
            pageNo: 1,
            pageSize: 50
          }
         this.$api.getCouponBatchGroup(params).then(response=>{
           if(response.data.code=='0'){
              that.batchGroupData=response.data.data;
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
        remoteBatch(val){
            this.getCouponBatchGroup(val);
        },
        //获取发放优惠券记录列表
        getCouponGrantRecord(){
         let that=this;
         if(this.useDate == null){
                this.useDate = [];
            }
         let params={
            pageNo: this.pageNum,
            pageSize: this.pageSize,
            discountWay:this.discountWay,
            couponType:this.couponType,
            couponOwnerOrgKind:this.couponOwnerOrgKind,
            couponOwnerOrgId:this.couponOwnerOrgId,
            batchId:this.batchId,
            givedTimeStart:this.useDate[0],
            givedTimeEnd:this.useDate[1],
         };
          this.$api.getCouponGrantRecord({params}).then(response=>{
             const result = response.data;
             if(response.data.code=='0'){
               that.GrantRecordData=response.data.data.records;
               that.pageTotal=response.data.data.total;
             }else{
               this.$message.error(result.msg);
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
            this.getCouponGrantRecord();
            this.$store.commit('setSearchList',{
                discountWay: this.discountWay,
                couponType: this.couponType,
                couponOwnerOrgKind: this.couponOwnerOrgKind,
                couponOwnerOrgId: this.couponOwnerOrgId,
                batchId: this.batchId,
                useDate:this.useDate
            })
        },

     },

   }
</script>

<style lang="less" scope>
   .GrantCouponRecord{
     .pagination{
          margin-top: 20px;
      }
     .alignleft{text-align: left;margin-bottom:10px;}
     .el-dialog__footer{text-align: center !important;}
     .datchdialog{
       .el-select{width: 100%;}
       .required-icon{
        color: #ff3030;
      }
     }
   }
</style>
