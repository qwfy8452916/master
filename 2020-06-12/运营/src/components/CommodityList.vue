<template>
    <div class="hotellist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称">
                <el-input v-model="Hotelname"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称">
                <el-input v-model="Supplierchenghu"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <div><el-button class="addbutton" @click="addproduct">添加商品</el-button></div>
        <el-table :data="Productlist" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="商品id" width="80px" align=center></el-table-column>
            <el-table-column prop='prodLogoUrl' label="商品图片" width="80px" align=center>
                <template slot-scope="scope">
                    <img :src="scope.row.prodLogoUrl" alt="" style="width: 45px;height: 35px">
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
            <el-table-column prop="sqSign" label="商品编码"></el-table-column>
            <el-table-column prop="priceMax" label="最高采购价" width="100px" align=center></el-table-column>
            <el-table-column prop="retailPrice" label="建议零售价" width="100px" align=center></el-table-column>
            <el-table-column prop="expPeriod" label="保质期" width="100px" align=center></el-table-column>
            <el-table-column prop="proSize" label="规格" width="100px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="160px" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" width="120px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center is-center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="Modifyproduct(scope.$index, Productlist)">修改</el-button>
                    <el-button type="text" size="small" @click="Deleteproduct(scope.$index, Productlist)">删除</el-button>
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
                <!-- <el-button type="primary" @click="dialogVisibleDelete=false">确定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'CommodityList',
    data() {
        return{
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            Hotelname: '',  //商品名称
            Supplierchenghu:'',  //供应商名称
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            dialogVisibleDelete: false,
        }
    },
    created(){
        this.Getdata()
    },
    methods: {
        //查询
        inquire(){
          let that=this;
          that.Getdata()
        },
        //添加商品
        addproduct(){
          this.$router.push({name:'CommodityAdd'});
        },
        //修改
        Modifyproduct(index,rows){
            let changeid=rows[index].id
            this.$router.push({name:'Commodityedit',params:{productid: changeid}});
        },
        //删除
        Deleteproduct(index,rows){
            this.delindex=index
            this.delindexid=rows[index].id
            this.dialogVisibleDelete = true;
        },

        Confirmdel(){
            let that=this;
            let params={
                id:that.delindexid
            };
            this.$api.delcommodity({params}).then(response=>{
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
                productName:that.Hotelname,
                supplierName:that.Supplierchenghu
            }
            this.$api.commoditylist({params}).then(response=>{
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
        },


    }
}
</script>

<style lang="less" scoped>
.hotellist{
    .pagination{
        margin-top: 20px;
    }
}
</style>

