<template>
   <div class="AllCouponGroup">
       <el-form :inline="true" :model="query" ref="query" align="left">
          <el-form-item label="组织类型" prop="organType">
             <el-select v-model="query.organType">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="平台" value="1"></el-option>
                  <el-option label="运营商" value="2"></el-option>
                  <el-option label="酒店" value="3"></el-option>
                  <el-option label="供应商" value="4"></el-option>
                  <el-option label="入驻商家" value="5"></el-option>
             </el-select>
          </el-form-item>

          <el-form-item label="组织" prop="organId">
                <el-select
                    v-model="query.organId"
                    filterable
                    remote
                    :remote-method="remoteOrgan"
                    :loading="loadingO"
                    @focus="getOrgan()"
                    placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in organNameList"
                        :key="item.id"
                        :label="item.orgName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="分组名称" prop="groupName">
             <el-input v-model="query.groupName"></el-input>
          </el-form-item>

             <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button>
             </el-form-item>
       </el-form>

       <el-table :data="groupData" border stripe style="width:100%">
          <el-table-column prop="groupOwnerOrgKindName" label="组织类型" align="center"></el-table-column>
          <el-table-column prop="groupOwnerOrgName" label="组织名称" align="center"></el-table-column>
          <el-table-column prop="groupName" label="分组名称" align="center"></el-table-column>
          <el-table-column prop="id" label="操作" align="center" width="300px">
              <template slot-scope="scope">
                  <el-button v-if="authzData['F:BO_COUPON_ALLGROUP_MODIFY']" type="text" @click="editGroup(scope.row.id)">修改</el-button>
                  <el-button v-if="authzData['F:BO_COUPON_ALLGROUP_DELETE']" type="text" @click="delBatch(scope.row.id)">删除</el-button>
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
        <el-dialog title="提示" :visible.sync="deledialog" width="30%">
            <span>是否确认删除该优惠券分组?</span>
            <span slot="footer">
               <el-button type="primary" @click="deledialog=false">取 消</el-button>
               <el-button type="primary" @click="suredel">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
   export default {
     name:"LonganAllCouponGroup",
     data(){
       return {
          authzData:'',
          pageTotal: 1,
          currentPage: 1,
          pageNum: 1,
          deledialog:false,
          datchdialog:false,
          loadingO:false,
          groupId:'', //分组id
          query:{
             organType:'', //组织类型
             organId:'', //组织名称id
             groupName:'',  //分组名称
             currentPage:'',
          },
          organNameList:[], //组织数据
          groupData:[], //分组数据

          batchData:[],
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
        this.getOrgan();
        this.getCouponGroupList();

     },
     methods:{

        //重置
        resetbtn(query){
          this.$refs[query].resetFields()
        },

        //修改
        editGroup(e){
         let id=e
         this.query.currentPage=this.currentPage
         let query=this.query
         this.$router.push({name:"LonganAllCouponGroupEdit",query:{id,query}})
        },
        //删除
        delBatch(e){
          this.groupId=e;
          this.deledialog=true;
        },
        //确定删除
        suredel(){
          let that=this;
          let params={};
          this.$api.delCouponGroup(params,that.groupId).then(response=>{
             if(response.data.code=='0'){
                this.deledialog=false;
                that.$message.success("操作成功")
                that.getCouponGroupList();
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
        grant(){
          this.datchdialog=true;
        },

        //获取优惠券分组列表
        getCouponGroupList(){
           let that=this;
           let params={
              pageNo: this.pageNum,
              pageSize: 10,
              orgAs:'',
              groupOwnerOrgKind:this.query.organType,
              groupOwnerOrgId:this.query.organId,
              groupName:this.query.groupName
           };
           this.$api.getCouponGroupList({params}).then(response=>{
              if(response.data.code=='0'){
                  that.groupData=response.data.data.records
                  that.pageTotal=response.data.data.total
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
                that.organNameList=response.data.data.records;
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

        //查询
        inquire(){
            this.pageNum=1;
            this.currentPage=1;
            this.getCouponGroupList();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.getCouponGroupList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.getCouponGroupList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.getCouponGroupList();
        },

     },

   }
</script>

<style lang="less" scope>
   .AllCouponGroup{
     .alignleft{text-align: left;margin-bottom:10px;}
     .el-dialog__footer{text-align: center !important;}
     .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
     }
   }
</style>
