<template>
    <div class="LonganHotelAfterSale">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="订单号">
                <el-input v-model="orderId"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="hotelId" 
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
            <el-form-item label="房间号">
                <el-input v-model="userRoomCode"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input v-model="userMobile"></el-input>
            </el-form-item>
            <el-form-item label="申请售后原因">
                <el-select v-model="requestReason">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in requestReasonlist"
                        :key="item.id"
                        :label="item.dictName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提交时间">
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
        <el-table :data="LonganHotelAfterSaleDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="orderId" label="订单号" min-width="140px" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" min-width="160px"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户姓名" min-width="100px"></el-table-column>
            <el-table-column prop="customerMobile" label="用户手机号" min-width="120px" align=center></el-table-column>
            <el-table-column prop="requestReason" label="申请售后原因" min-width="120px">
                <template slot-scope="scope">
                    <span v-for="item in requestReasonlist" :key="item.id">
                        <span v-if="scope.row.requestReason==item.id">{{item.dictName}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="replAmount" label="上传凭证" min-width="300px">
                <template slot-scope="scope">
                    <a v-for="item in scope.row.csRequestDTOs" :key="item.id" :href="item.url" target="_blank">{{item.url}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="requestRemark" label="备注" min-width="120px"></el-table-column>
            <el-table-column prop="lastUpdatedAt" label="提交时间" min-width="160px" align=center></el-table-column>
        </el-table>
        <div class="pagination">
            <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
        </div>
    </div>
</template>

<script>
import resetButton from './resetButton'
import LonganPagination from '@/components/LonganPagination'
export default {
    name: 'LonganHotelAfterSale',
    components:{
        resetButton,
        LonganPagination
    },
    data(){
        return{
            inquireTime: [],
            LonganHotelAfterSaleDataList: [],

            hotelId: '',
            hotelList: [],
            orderId: '',
            userRoomCode: '',
            userMobile: '',
            requestReason: '',
            requestReasonlist: [],

            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
            oprId: '',
            loadingH: false,
        }
    },
    mounted(){
        this.oprId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getrequestReasonlist();
        this.LonganHotelAfterSale();
    },
    methods: {
        resetFunc(){
            this.orderId = ''
            this.hotelId = ''
            this.userRoomCode = ''
            this.userMobile = ''
            this.requestReason = ''
            this.inquireTime = []
            this.LonganHotelAfterSale();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.LonganHotelAfterSale();
        },
        //获取所有酒店名称
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
        //获取所有售后故障原因
        getrequestReasonlist(){
            const params ={
                key: 'AFTER_SALE_REASON',
                orgId: '0'
            }
            this.$api.getrequestReasonlist({params}).then(response=>{
                if(response.data.code==0){
                  this.requestReasonlist = response.data.data;
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
        //售后申请记录
        LonganHotelAfterSale(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.oprId,
                hotelId: this.hotelId,
                orderId: this.orderId,
                userRoomCode: this.userRoomCode,
                userMobile: this.userMobile,
                requestReason: this.requestReason,
                startTime: this.inquireTime[0],
                endTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            this.$api.LonganHotelAfterSale({params}).then(response=>{
                if(response.data.code==0){
                    this.LonganHotelAfterSaleDataList = response.data.data.records;
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
            this.LonganHotelAfterSale();
            this.$store.commit('setSearchList',{
                orderId: this.orderId,
                hotelId: this.hotelId,
                userRoomCode: this.userRoomCode,
                userMobile: this.userMobile,
                requestReason: this.requestReason,
                inquireTime:this.inquireTime
            })
        },
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

