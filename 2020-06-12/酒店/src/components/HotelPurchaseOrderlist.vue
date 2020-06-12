<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <!-- <el-form-item label="酒店名称">
                <el-input v-model="Hotelname"></el-input>
            </el-form-item> -->
            <el-form-item label="供应商名称">
                <el-input v-model="Supplierchenghu"></el-input>
            </el-form-item>
            <el-form-item label="添加时间" class="adddateone">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="dateone" style="width: 202px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="至" class="datetwotitle">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="datetwo" style="width: 202px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="Productlist" border stripe style="width:100%;" >
            <el-table-column fixed prop="purCode" label="采购单id" width="180px" align=center></el-table-column>
            <el-table-column prop="supplName" label="供应商" width="180px" align=center></el-table-column>
            <el-table-column prop="arrivedAt" label="预计到货时间" width="180px" align=center></el-table-column>
            <el-table-column prop="arrivedWay" label="到货方式" width="180px" align=center></el-table-column>
            <el-table-column prop="purMobile" label="采购人手机号" width="180px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="180px" align=center></el-table-column>
            <el-table-column prop="oprRemark" label="备注1" width="160px" align=center></el-table-column>
            <el-table-column prop="hotelRemark" label="备注2" width="160px" align=center></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="200px" align=center is-center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BH_PUR_PURCHASEORDERLIST_DETAIL']" type="text" size="small" @click="Seeorder(scope.$index, Productlist)">查看采购单</el-button>
                    <el-button v-if="authzlist['F:BH_PUR_PURCHASEORDERLISTALTER']" type="text" size="small" @click="Modifyproduct(scope.$index, Productlist)">修改</el-button>

                </template>
            </el-table-column>
        </el-table>
         <div class="pagination">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :pager-count = "11"
                :page-size="pageSize"
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
import resetButton from './resetButton'
export default {
    name: 'HotelPurchaseOrderlist',
    components:{
        resetButton
    },
    data() {
        return{
            authzlist: {}, //权限数据
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            Supplierchenghu:'',  //供应商名称
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            dialogVisibleDelete: false,
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
        }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.oprOgrId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.Supplierchenghu = ''
            this.dateone = ''
            this.datetwo = ''
            this.Getdata();
        },
        //查询
        inquire(){
            let that=this;
            that.Getdata()
            this.$store.commit('setSearchList',{
                Supplierchenghu: this.Supplierchenghu,
                datetwo: this.datetwo,
                dateone:this.dateone
            })
        },

        //修改
        Modifyproduct(index,rows){
            let productid=rows[index].id
            this.$router.push({name:'HotelPurchaseOrderedit',query:{productid}});
        },
        //查看
         Seeorder(index,rows){
            let productid=rows[index].id
            this.$router.push({name:'HotelSeepurchaseOrder',query:{productid}});
         },



        current(){
            this.pageNum = this.currentPage;
            this.Getdata();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },
        Getdata(){
            let that=this;
            let params={
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                supplName:that.Supplierchenghu,
                startTime:that.dateone,
                endTime:that.datetwo,

                orgAs:3,
            }
            this.$api.HotelPurchaseOrderlist(params).then(response=>{
                if(response.data.code==0){
                  that.pageTotal=response.data.data.total
                  that.Productlist=response.data.data.records
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        }

    }
}
</script>

<style lang="less" scoped>
.purchaselist{
   .addcommodity{text-align:left;margin-bottom: 12px;}
   .adddateone{margin-right: 0px;}
}

</style>

<style lang="less">
.datetwotitle{
       color: #333;
       label.el-form-item__label{padding-left: 2px;}
   }
</style>

