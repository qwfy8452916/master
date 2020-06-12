<template>
    <div class="Franchisee">
        <el-form :model="query" ref="query" :inline="true" align=left class="searchform">
            <el-form-item label="合作伙伴名称" prop="allyId">
                <el-select
                  filterable
                  remote
                  :remote-method="remotePartner"
                  :loading="loadingPar"
                  @focus="Getselectpartner()"
                  v-model="query.allyId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in selectpartnerlist"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="酒店名称" prop="inquireHotel">
                <el-select
                    v-model="query.inquireHotel"
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
            <el-form-item label="身份" prop="frantype">
                <el-select v-model="query.frantype">
                   <el-option value="" label="全部"></el-option>
                   <el-option value="6" label="城市运营商"></el-option>
                   <el-option value="7" label="合伙人"></el-option>
                   <el-option value="8" label="加盟商"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
                <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>

        <el-table :data="FranchiseeDataList" border stripe style="width:100%;" >
            <el-table-column prop="allyName" label="合作伙伴名称" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="hotelAs" label="身份" align=center>
                <template slot-scope="scope">
                   <span v-if="scope.row.hotelAs=='6'">城市运营商</span>
                   <span v-if="scope.row.hotelAs=='7'">合伙人</span>
                   <span v-if="scope.row.hotelAs=='8'">加盟商</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column label="操作" align=center fixed="right" width="240px">
               <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_ALLY_HOTEL_DELETE']" type="text" size="small" @click="remove(scope.row.id)">移除</el-button>
                    <el-button v-if="authzData['F:BO_ALLY_HOTEL_VIEW']" type="text" size="small" @click="lookdetail(scope.row.id)">查看详情</el-button>
                    <el-button v-if="scope.row.hotelAs=='8' && authzData['F:BO_ALLY_PARTNER_MANAGECABINET']" type="text" size="small" @click="choicecabinet(scope.row.id,scope.row.hotelId,scope.row.hotelAs)">管理柜子</el-button>
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

        <el-dialog class="qiyongtis" title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认移除该合作伙伴？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="sureRemove">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganFranchiseehotellist',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            hotelList:[],
            selectpartnerlist:[],
            FranchiseeDataList:[],
            query:{
              allyId:'',  //合作伙伴名称
              inquireHotel:'',  //酒店id
              frantype:'',  //身份
              currentPage:'',
            },
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            removeId: '', //移除id
            dialogVisibleDelete:false,
            loadingH: false,
            loadingPar:false,
        }
    },
    created(){
      if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.currentPage=this.$route.query.query.currentPage
        }
        
      this.getHotelList();
      this.Getselectpartner();
    },

    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})

        if(Object.keys(this.$route.query).length!=0 && (typeof(this.$route.query.query))==='object'){
            this.query=this.$route.query.query;
            this.pageNum=this.$route.query.query.currentPage
        }
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.Franchisee();
    },
    methods: {
        resetFunc(){
            this.query.allyId = ''
            this.query.inquireHotel = ''
            this.query.frantype = ''
            this.Franchisee();
        },
         //重置
         resetbtn(query){
           this.$refs[query].resetFields();
         },

         //查看详情
         lookdetail(id){
            this.query.currentPage=this.currentPage
            let query=this.query
            this.$router.push({name:'LonganFranchiseehoteldetail',query:{id,query}})
         },


         //移除
         remove(id){
            this.removeId=id;
            this.dialogVisibleDelete=true;
         },

         //管理柜子
         choicecabinet(id,hotelId,hotelAs){
            this.$router.push({name:'LonganChoiceCabinet',query:{id,hotelId,hotelAs}})
         },

         //确定移除
         sureRemove(){
             let that=this;
             let params="";
             this.$api.Removehotelpartner({params},that.removeId).then(response=>{
                if(response.data.code==0){
                  that.$message.success("操作成功!")
                  that.dialogVisibleDelete=false;
                  that.Franchisee();
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
             }).catch(err=>{
               this.$alert(err,"警告",{
                 confirmButtonText:"确定"
               })
             })

         },


        Franchisee(){

            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                allyId:this.query.allyId,
                hotelId:this.query.inquireHotel,
                hotelAs:this.query.frantype,
            };
            this.$api.gethotelpartner({params}).then(response=>{
                if(response.data.code==0){
                    this.FranchiseeDataList = response.data.data.records;
                    this.pageTotal = response.data.data.total
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
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


        	//获取合作伙伴所有下拉列表
        Getselectpartner(hName){
          let that=this;
          let params={
            allyName: hName,
            pageNo: 1,
            pageSize: 50
          }
          this.$api.getPartnerdata({params}).then(response=>{
             if(response.data.code==0){
                that.selectpartnerlist=response.data.data.records;
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

        remotePartner(val){
            this.Getselectpartner(val);
        },



        //查询
        inquire(){
            this.pageNum = 1;
            this.currentPage=1;
            this.Franchisee();
            this.$store.commit('setSearchList',{
                allyId: this.query.allyId,
                inquireHotel: this.query.inquireHotel,
                frantype: this.query.frantype
            })
        },

        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.Franchisee();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Franchisee();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Franchisee();
        }
    }
}
</script>

<style lang="less" scoped>
.Franchisee{
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
    .cell a{
        display: block;
        margin-bottom: 10px;
    }


}

</style>

<style lang="less">
  .Franchisee{
    .el-dialog__footer{text-align: center !important;}
    .qiyongtis .el-dialog{width: 350px !important;}
    .resetpassword .el-dialog{width: 500px !important;}
    .resetbtn.el-button--primary{
        background-color: #71a8e0;
        border-color: #71a8e0;
    }
  }
</style>


