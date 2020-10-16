<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="房间号">
                <el-input v-model="roomName"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="userName"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" class="ordertitle" prop="prodid">
                 <el-select class="termput" 
                    v-model="prodid"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodata" :key="item.id" :label="item.productName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开票时间" class="adddateone">
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
        </el-form>


        <el-table :data="Productlist" border stripe style="width:100%;" >
            <el-table-column prop="customerId" label="用户ID" width="80px" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户昵称"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="prodShowName" label="商品名称"></el-table-column>
            <el-table-column prop="actualPay" label="商品金额" align=center></el-table-column>
            <el-table-column prop="orderTime" label="支付时间" align=center></el-table-column>
            <el-table-column prop="createdAt" label="开票时间" align=center></el-table-column>
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


    </div>

</template>

<script>
export default {
    name: 'invoicerecord',
    data() {
        return{
            hotelId: '',
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            prodata:null,   //商品数据
            roomName:"",   //房间号
            userName:"",   //用户昵称
            prodid:"",   //商品名称ID
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
            loadingP: false
            }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        this.oprOgrId = this.$route.params.orgId;
        this.hotelId = localStorage.getItem('hotelId');
        this.Getdata(this.oprOgrId)
        this.getProdList()
    },
    methods: {
        //查询
        inquire(){
          this.Getdata(this.oprOgrId);

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
        Getdata(){
            let that=this;
            let params={
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                roomCode:that.roomName,
                customerName:that.userName,
                prodId:that.prodid,
                beginCreateAt:that.dateone,
                endCreateAt:that.datetwo,
                // hotelOrgId:oprOgrId
            }
            this.$api.getinvoicerecordlist({params}).then(response=>{
                if(response.data.code==0){
                  that.pageTotal=response.data.data.total
                  that.Productlist=response.data.data.list
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

        //得到商品数据
        // getProdList(){
        //     let that=this;

        //       this.$api.getProdNameList({}).then(response=>{
        //         if(response.data.code==0){
        //             that.prodata=response.data.data
        //           }else{
        //               that.$alert(response.data.msg,"警告",{
        //               confirmButtonText: "确定"
        //             })
        //           }
        //         }).catch(err=>{
        //               that.$alert(err,"警告",{
        //                 confirmButtonText: "确定"
        //             })
        //           })
        //      },
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: 0,
                hotelId: this.hotelId,
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.ownCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodata = result.data.records.map(item => {
                            return{
                                id: item.id,
                                productName: item.prodProductDTO.prodName
                            }
                        })
                        const prodAll = {
                            id: '',
                            productName: '全部'
                        };
                        this.prodata.unshift(prodAll);
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

