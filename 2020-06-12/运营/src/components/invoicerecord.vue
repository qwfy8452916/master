<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间号">
                <el-input v-model="roomName"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="userName"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-select 
                    v-model="inquireProdName"
                    filterable
                    remote
                    :remote-method="remoteProd"
                    :loading="loadingP"
                    @focus="getProdList()"
                    placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
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
            <el-table-column prop="customerId" label="用户id" width="80px" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户昵称"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" width="80px" align=center></el-table-column>
            <el-table-column prop="prodShowName" label="商品名称"></el-table-column>
            <el-table-column prop="actualPay" label="商品金额" width="100px" align=center></el-table-column>
            <el-table-column prop="orderTime" label="支付时间" width="160px" align=center></el-table-column>
            <el-table-column prop="createAt" label="开票时间" width="160px" align=center></el-table-column>
        </el-table>
         <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next,jumper"
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
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            hoteldata:null,  //酒店数据
            prodata:null,   //商品数据
            hotelid:"",  //酒店名称id
            roomName:"",   //房间号
            userName:"",   //用户昵称
            prodid:"",   //商品名称ID
            Productlist: [],
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
            inquireHotelName: '',
            hotelList: [],
            prodList: [],
            inquireProdName: '',
            loadingH: false,
            loadingP: false
          }
    },
    created(){
        // this.oprOgrId=localStorage.orgId
        this.oprOgrId = this.$route.params.orgId;
        this.Getdata(this.oprOgrId)
        this.getHotelList()
        this.getProdList()
    },
    methods: {
        //查询
        inquire(){
          this.Getdata(this.oprOgrId);

        },


         //选择酒店
        selectdate(e){
          let that=this;
          that.hotelid=e;

        },

         //选择商品
        selectprodate(e){
          let that=this;
          that.prodid=e;
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
        //商品列表
        getProdList(pName){
            this.loadingP = true;
            const params = {
                orgAs: 2,
                prodName: pName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.platformCommodityList(params)
                .then(response => {
                    this.loadingP = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.prodList = result.data.records.map(item => {
                            return{
                                id: item.id,
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
                hotelId:that.inquireHotelName,
                roomCode:that.roomName,
                customerName:that.userName,
                prodId:that.inquireProdName,
                beginCreateAt:that.dateone,
                endCreateAt:that.datetwo,
                // oprOrgId:oprOgrId
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
        }

    }
}
</script>

<style lang="less" scoped>
.purchaselist{
   .adddateone{margin-right: 0px;}
}
.pagination{
    margin-top: 20px;
}
</style>

<style lang="less">
.datetwotitle{
       color: #333;
       label.el-form-item__label{padding-left: 2px;}
   }
</style>

