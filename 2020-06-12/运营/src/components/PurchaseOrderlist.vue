<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <!-- <el-form-item label="酒店名称">
                <el-input v-model="Hotelname"></el-input>
            </el-form-item> -->
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
        <div v-if="authzData['F:BO_PUR_PURORDER_ADD']"><el-button class="addbutton" @click="addproduct()">新增采购</el-button></div>
        <el-table :data="Productlist" border stripe style="width:100%;" >
            <el-table-column fixed prop="purCode" label="采购单id" width="110px" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" width="160px"></el-table-column>
            <el-table-column prop="supplName" label="供应商" width="160px"></el-table-column>
            <el-table-column prop="arrivedAt" label="预计到货时间" width="110px" align=center></el-table-column>
            <el-table-column prop="arrivedWay" label="到货方式" width="180px"></el-table-column>
            <el-table-column prop="purMobile" label="采购人手机号" width="110px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" width="100px" align=center></el-table-column>
            <el-table-column prop="oprRemark" label="运营商备注"></el-table-column>
            <el-table-column prop="hotelRemark" label="酒店备注"></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="170px" align=center is-center>
                <template slot-scope="scope">
                    <el-button v-if="authzData['F:BO_PUR_PURORDER_VIEW']" type="text" size="small" @click="Seeorder(scope.$index, Productlist)">查看采购单</el-button>
                    <el-button v-if="authzData['F:BO_PUR_PURORDER_EDIT']" type="text" size="small" @click="Modifyproduct(scope.$index, Productlist)">修改</el-button>
                    <el-button v-if="authzData['F:BO_PUR_PURORDER_DELETE']" type="text" size="small" @click="Deleteproduct(scope.$index, Productlist)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :pager-count = "11"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认删除该商品？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'PurchaseOrderlist',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            hotelList:[],  //酒店数据
            inquireHotel: '',  //酒店名称
            loadingH: false,
            Supplierchenghu:'',  //供应商名称
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            dialogVisibleDelete: false,
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
            datalist:"",
        }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        let that=this;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.oprOgrId = this.$route.params.orgId;
        this.Getdata(this.oprOgrId)
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {
        resetFunc(){
            this.inquireHotel = ''
            this.Supplierchenghu = ''
            this.dateone = ''
            this.datetwo = ''
            this.Getdata(this.oprOgrId);
        },
        //查询
        inquire(){
          let that=this;
          that.Getdata(this.oprOgrId)
          this.$store.commit('setSearchList',{
                inquireHotel: this.inquireHotel,
                Supplierchenghu:this.Supplierchenghu,
                dateone:this.dateone,
                datetwo:this.datetwo
            })
        },
        //添加商品
        addproduct(){
          this.$router.push({name:'PurchaseOrderadd'});
        },
        //修改
        Modifyproduct(index,rows){
            let productid=rows[index].id
            this.$router.push({name:'PurchaseOrderedit',query:{productid}});
        },
        //查看
         Seeorder(index,rows){
            let productid=rows[index].id
            this.$router.push({name:'SeepurchaseOrder',query:{productid}});
         },
        //删除
        Deleteproduct(index,rows){
            this.delindex=index
            this.delindexid=rows[index].id
            this.dialogVisibleDelete = true;
        },

        Confirmdel(){
            let that=this;
            let params="";
            this.$api.delpurchaseorder({params},that.delindexid).then(response=>{
                if(response.data.code==0){
                   that.Productlist.splice(that.delindex,1)
                   this.$message.success('操作成功！');
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
            this.dialogVisibleDelete = false;
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

        current(){
            this.pageNum = this.currentPage;
            this.Getdata(this.oprOgrId);
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata(this.oprOgrId);
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata(this.oprOgrId);
        },
        Getdata(oprOgrId){
            let that=this;
            let params={
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                hotelId:that.inquireHotel,
                supplName:that.Supplierchenghu,
                startTime:that.dateone,
                endTime:that.datetwo,
                orgAs:2
                // oprOgrId:oprOgrId,
            }
            this.$api.purchaseorderlist({params}).then(response=>{
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
   .adddateone{margin-right: 0px;}
}

</style>

<style lang="less">
.datetwotitle{
    color: #333;
    label.el-form-item__label{padding-left: 2px;}
}
.pagination{
    margin-top: 20px;
}
</style>

