<template>
    <div class="supplierapply">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="供应商名称">
                <el-input v-model="suppername"></el-input>
            </el-form-item>
            <el-form-item label="地区">
                <el-input v-model="areaname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userMobile"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="handlestatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="拒绝" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="supplierapplyDataList" border stripe style="width:100%;" >
          <el-table-column prop="supplierType" label="类型" width="80px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.supplierType=='1'">工厂</span>
                   <span v-if="scope.row.supplierType=='2'">品牌商</span>
                   <span v-if="scope.row.supplierType=='3'">代理商</span>
               </template>
            </el-table-column>
            <el-table-column prop="merchantUscc" label="社会信用代码/身份证号" width="320px" align=center>
                <template slot-scope="scope">
                     <span v-if="scope.row.merchantUscc!=''">{{scope.row.merchantUscc}}</span>
                     <span v-else>{{scope.row.merchantIdno}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="merchantName" label="供应商名称"></el-table-column>
            <el-table-column prop="merchantAddress" label="所在地区" width="120px" align=center>
                <template slot-scope="scope">
                   <span v-if="scope.row.province!=null">{{scope.row.province.dictName}}</span><span v-if="scope.row.city!=null">{{scope.row.city.dictName}}</span><span v-if="scope.row.area!=null">{{scope.row.area.dictName}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="merchantContact" label="联系人" width="120px" align=center></el-table-column>
            <el-table-column prop="merchantContactPhone" label="手机号" width="120px" align=center></el-table-column>
            <el-table-column prop="supplyAreaList" label="供应区域" align=center width="320px">
               <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.supplyAreaList" :key="index">{{item.dictName}}、</span>
               </template>
            </el-table-column>
            <el-table-column prop="reviewStatus" label="审核状态" width="120px" align=center>
                <template slot-scope="scope">
                   <span v-if="scope.row.reviewStatus=='0'">待审核</span>
                   <span v-if="scope.row.reviewStatus=='1'">通过</span>
                   <span v-if="scope.row.reviewStatus=='2'">拒绝</span>
               </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="申请时间" width="120px" align=center></el-table-column>
            <el-table-column label="操作" width="120px" align=center fixed="right">
               <template slot-scope="scope">
                    <el-button v-if="scope.row.reviewStatus=='0' && authzData['F:BO_SUPPL_SUPPLIERAPPLY_TRIAL']" type="text" size="small" @click="handle(scope.$index, supplierapplyDataList)">审核</el-button>
                    <el-button v-if="authzData['F:BO_SUPPL_SUPPLIERAPPLY_CHECKDETAIL']" type="text" size="small" @click="lookdetail(scope.$index, supplierapplyDataList)">查看详情</el-button>
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

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete1" width="30%">
            <span>是否审核通过？</span>
            <span slot="footer">
                <el-button @click="refuse()">拒绝</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganSupplierApply',
    components:{
        resetButton
    },
    data(){
        return{
            authzData: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            id:'',   //供应商id
            inquireTime: [],
            supplierapplyDataList: [],
            handlestatus:'',
            userMobile: '',
            dialogVisibleDelete1:false,
            jinejudge:true,
            suppername:'',   //供应商名称
            areaname:'',  //地区

        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.supplierapply();
        
    },
    methods: {
        resetFunc(){
            this.suppername = ''
            this.areaname = ''
            this.userMobile = ''
            this.handlestatus = ''
            this.inquireTime = []
            this.supplierapply();
        },
         //查看详情
         lookdetail(index,row){
            let id=row[index].id
            this.$router.push({name:'LonganSupplierDetail',query:{id}})
         },


        handle(index,row){
          this.id=row[index].id;
          this.dialogVisibleDelete1=true;
        },

        refuse(){
          let that=this;
          this.supplierExamine(2)
          // this.dialogVisibleDelete1=false;
        },

        Confirmdel(){
          let that=this;
          this.supplierExamine(1)
        },

       supplierExamine(reviewResult ){
         let that=this;
         let params=""
         this.$api.supplierExamine({params},that.id,reviewResult).then(response=>{
                if(response.data.code==0){
                   this.dialogVisibleDelete1=false;
                   this.$message.success("操作成功!")
                   that.supplierapply()
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

        //供应商申请列表
        supplierapply(){
            let that=this;
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                merchantName: this.suppername,
                city:this.areaname,
                merchantContactPhone: this.userMobile,
                createdAtFrom : this.inquireTime[0],
                createdAtTo : this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10,
                reviewStatus :that.handlestatus,
            };
            this.$api.supplierapply({params}).then(response=>{
                if(response.data.code==0){
                    this.supplierapplyDataList = response.data.data.records;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.supplierapply();
            this.$store.commit('setSearchList',{
                suppername: this.suppername,
                areaname: this.areaname,
                userMobile: this.userMobile,
                handlestatus: this.handlestatus,
                inquireTime:this.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.supplierapply();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.supplierapply();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.supplierapply();
        }
    }
}
</script>

<style lang="less" scoped>
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
</style>

