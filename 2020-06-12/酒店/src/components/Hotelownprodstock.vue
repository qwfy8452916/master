<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="商品名称" prop="prodid">
                <el-select
                    v-model="prodid"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否低于安全库存" class="ordertitle" prop="safeid">
                 <el-select class="termput" v-model="safeid" placeholder="请选择" @change="selectsafe">
                    <el-option v-for="item in safedata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>


        <el-table :data="Productlist" border stripe style="width:100%;" :row-class-name="noSafeClass">
            <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="totalProdAmount" label="总库存"></el-table-column>
            <el-table-column prop="cabProdAmount" label="迷你吧库存"></el-table-column>
            <el-table-column prop="invProdAmount" label="仓库库存"></el-table-column>
            <el-table-column prop="prodSafeCount" label="安全库存" align=center></el-table-column>
            <!-- <el-table-column prop="prodAmount" label="实际库存数量" align=center></el-table-column> -->
            <el-table-column prop="isSafe" label="是否低于安全库存" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isSafe == 0">是</span>
                    <span v-if="scope.row.isSafe == 1">否</span>
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
import resetButton from './resetButton'
export default {
    name: 'Hotelownprodstock',
    components:{
        resetButton
    },
    data() {
        return{
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            hotelId:'',
            prodList:[],   //商品数据
            safedata:[{"id":"","name":"全部"},{"id":0,"name":"是"},{"id":1,"name":"否"}],   //安全库存选择数据
            prodid:"",   //商品名称ID
            safeid:"",   //选择安全库存ID
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            oprOgrId:"", //标识
            loadingP:false,
            }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        this.hotelId=localStorage.hotelId;
        this.oprOgrId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata(this.oprOgrId)
        this.getProdList()
    },
    methods: {
        resetFunc(){
            this.prodid = ''
            this.safeid = ''
            this.Getdata(this.oprOgrId)
        },
        //查询
        inquire(){
            this.Getdata(this.oprOgrId);
            this.$store.commit('setSearchList',{
                prodid: this.prodid,
                safeid:this.safeid
            })
        },


        //选择商品
        selectprodate(e){
          let that=this;
          that.prodid=e;
        },

        //选择安全库存
        selectsafe(e){
          let that=this;
          that.safeid=e;
        },


        //低库存状态-样式
        noSafeClass({row, rowIndex}){
            const noSafeState = row.isSafe;
            if(noSafeState == 0){
                return 'noSafe'
            }else{
                return ''
            }
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

        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: 3,
                prodName: pName,
                hotelId:this.hotelId,
                isNeedInv:1,
                pageNo: 1,
                pageSize: 50,
                isActive:1
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){

                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.prodCode,
                                prodName: item.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            prodName: '全部'
                        };
                        this.prodList.unshift(prodAll);
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
        remoteProd(val){
            this.getProdList(val);
        },


        Getdata(oprOgrId){
            let that=this;
            let params={
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                prodCode:that.prodid,
                isSafe:that.safeid,
                orgAs:3
                // encryptedOrgId:oprOgrId
            }
            this.$api.checkstock({params}).then(response=>{
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

<style lang="less">
.el-table .noSafe{
    color: #f00;
}
</style>

