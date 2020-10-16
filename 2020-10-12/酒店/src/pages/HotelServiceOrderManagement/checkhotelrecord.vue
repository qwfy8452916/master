<template>
    <div class="serviceorderlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="房间号">
                <el-input v-model="inquireRoomNum"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="inquireStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待确认" value="0"></el-option>
                    <el-option label="已确认" value="1"></el-option>
                    <!-- <el-option label="已完成" value="2"></el-option> -->
                    <el-option label="已取消" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提交时间">
                <el-date-picker
                    v-model="inquireSubmitTime"
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
        <el-table :data="ServiceOrderDataList" border stripe style="width:100%;" >
            <!-- <el-table-column fixed prop="hotelName" label="酒店名称"  min-width="200px"></el-table-column> -->
            <el-table-column fixed prop="roomCode" label="房间号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="hotelCategoryName" label="服务类型" min-width="120px" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="提交时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="status" label="订单状态" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待确认</span>
                    <span v-else-if="scope.row.status == 1">已确认</span>
                    <span v-else-if="scope.row.status == 2">已完成</span>
                    <span v-else-if="scope.row.status == 3">已取消</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="140px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 0" type="text" size="small" @click="serviceOrderVerify(scope.row.id)">确认</el-button>
                    <el-button type="text" size="small" @click="serviceOrderDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        <el-dialog :visible.sync="dislogVisibleVerify" width="30%">
            <span slot="title">是否确认该服务订单？</span>
            <el-input type="textarea" :rows="3" v-model.trim="confirmRemark" placeholder="请输入对该服务订单的备注（选填）" maxlength="255"></el-input>
            <div slot="footer">
                <el-button @click="dislogVisibleVerify = false">取 消</el-button>
                <el-button type="primary" @click="verifyEnsure('verifyForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'checkhotelrecord',
    components:{
        HotelPagination,
        resetButton
    },
    data(){
        return{
            authzData: '',
            hotelId: '',
            inquireRoomNum: '',
            inquireStatus: '',
            inquireSubmitTime: [],
            ServiceOrderDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            dislogVisibleVerify: false,
            confirmRemark: ''
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.ServiceOrderList();
    },
    methods: {
        resetFunc(){
            this.inquireRoomNum = ''
            this.inquireStatus = ''
            this.inquireSubmitTime = []
            this.ServiceOrderList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.ServiceOrderList();
        },
        //客房服务订单
        ServiceOrderList(){
            if(this.inquireSubmitTime == null){
                this.inquireSubmitTime = [];
            }
            const params = {
                hotelId : this.hotelId,
                createStartTime: this.inquireSubmitTime[0],
                createEndTime: this.inquireSubmitTime[1],
                roomCode: this.inquireRoomNum,
                status: this.inquireStatus,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            };
            this.$api.ServiceOrderList(params)
                .then(response=>{
                    const result = response.data;
                    if(response.data.code==0){
                        this.ServiceOrderDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error(result.msg);
                    }
                }).catch(err=>{
                    this.$alert(err,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //确认
        serviceOrderVerify(id){
            this.soId = id;
            this.confirmRemark = '';
            this.dislogVisibleVerify = true;
        },
        verifyEnsure(){
            const params = {
                confirmRemark: this.confirmRemark
            };
            const id = this.soId;
            this.$api.serviceOrderVerify(params, id)
                .then(response=>{
                    const result = response.data;
                    if(result.code == 0){
                        this.dislogVisibleVerify = false;
                        this.ServiceOrderList();
                    }else{
                        this.dislogVisibleVerify = false;
                        this.$message.error(result.msg);
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
            this.ServiceOrderList();
            this.$store.commit('setSearchList',{
                inquireRoomNum: this.inquireRoomNum,
                inquireStatus: this.inquireStatus,
                inquireSubmitTime:this.inquireSubmitTime
            })
        },
        //查看详情
        serviceOrderDetail(id){
            this.$router.push({name: 'HotelServiceOrderDetail', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
    
</style>


<!--
<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="用户姓名">
                <el-input v-model="customerName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="mobile"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select class="termput" v-model="status" placeholder="请选择" @change="selectdate">
                        <el-option v-for="item in statusdata" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
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
        </el-form>


        <el-table :data="Productlist" border stripe style="width:100%;" >
            <el-table-column prop="roomCode" label="用户房间号" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户姓名" align=center></el-table-column>
            <el-table-column prop="mobile" label="手机号" align=center></el-table-column>
            <el-table-column prop="createdAt" label="提交时间" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
              <template slot-scope="scope">
                    <span v-if="scope.row.status=='0'">待确认</span>
                    <span v-if="scope.row.status=='1'">已确认</span>
                    <span v-if="scope.row.status=='2'">已完成</span>
                    <span v-if="scope.row.status=='3'">已取消</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="100px" align=center is-center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="Seeorder(scope.$index, Productlist)">查看详情</el-button>
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
export default {
    name: 'checkhotelrecord',
    data() {
        return{
            pageSize:10,
            pageTotal: 1,  //默认总条数
            pageNum: 1,   //实际当前页码
            currentPage: 1, //默认当前页码
            customerName: '',  //用户姓名
            mobile:'',  //手机号
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            Productlist: [],
            dialogVisibleDelete: false,
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
            status:"",    //状态
            statusdata:[{"name":"全部","value":""},{"name":"待确认","value":"0"},{"name":"已确认","value":"1"},{"name":"已完成","value":"2"},{"name":"已取消","value":"3"}],

        }
    },
    created(){

    },
    mounted(){
        this.oprOgrId = this.$route.params.orgId;
        this.Getdata(this.oprOgrId)
    },

    methods: {
        //查询
        inquire(){
          this.loadjudge=false
          this.Getdata(this.oprOgrId);
        },
        //修改
        Modifyproduct(index,rows){
            let changeid=rows[index].id
            this.$router.push({name:'PurchaseOrderedit',params:{productid: changeid}});
        },
        //查看
         Seeorder(index,rows){
            let lookid=rows[index].id
            this.$router.push({name:'hotelrecorddetail',params:{productid: lookid}});
         },
        //删除
        Deleteproduct(index,rows){
            this.delindex=index
            this.delindexid=rows[index].id
            this.dialogVisibleDelete = true;
        },

        selectdate(e){
             this.status=e
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
                customerName:that.customerName,
                mobile:that.mobile,
                startTime:that.dateone,
                endTime:that.datetwo,
                status:that.status,
                orgAs:3,
                // entryHOrgId:oprOgrId,
               }
                that.$api.getserverrecord({params}).then(response=>{
                if(response.data.code==0){
                  that.Productlist=response.data.data.records
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
-->