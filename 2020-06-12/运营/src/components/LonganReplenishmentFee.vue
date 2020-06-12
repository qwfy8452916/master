<template>
    <div class="LonganReplenishmentFee">
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
            <el-form-item label="补货人">
                <el-input v-model="empName"></el-input>
            </el-form-item>
            <el-form-item label="选择时间">
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
        <el-table :data="LonganReplenishmentFeeDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="latticeCode" label="补货格子" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称"></el-table-column>
            <el-table-column prop="empName" label="补货人" align=center></el-table-column>
            <el-table-column prop="replAmount" label="补货费" align=center></el-table-column>
            <el-table-column prop="replTime" label="补货时间" align=center></el-table-column>
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
    name: 'LonganReplenishmentFee',
    components:{
        resetButton
    },
    data(){
        return{
            inquireTime: [new Date(),new Date()],
            LonganReplenishmentFeeDataList: [],
            HotelId: '',
            inquireHotelName: '',
            hotelList: [],
            inquireProdName: '',
            prodName: '',
            empName: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            GrossIncome: '',
            oprId: '',
            prodList: '',
            loadingH: false,
            loadingP: false
        }
    },
    mounted(){
        // this.oprId=localStorage.getItem('orgId');
        // this.oprId = this.$route.params.orgId;
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getProdList();
        this.LonganReplenishmentFee();
    },
    methods: {
        resetFunc(){
            this.empName = ''
            this.inquireHotelName = ''
            this.inquireProdName = ''
            this.inquireTime = []
            this.LonganReplenishmentFee();
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
        //补货费记录
        LonganReplenishmentFee(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // encryptedOrgId: this.oprId,
                orgAs: 2,
                hotelId: this.inquireHotelName,
                prodName: this.inquireProdName,
                empName: this.empName,
                applyStartTime: this.inquireTime[0],
                applyEndTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganReplenishmentFee({params}).then(response=>{
                if(response.data.code==0){
                    this.LonganReplenishmentFeeDataList = response.data.data.list;
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
            this.LonganReplenishmentFee();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                inquireProdName: this.inquireProdName,
                empName: this.empName,
                inquireTime: this.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganReplenishmentFee();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganReplenishmentFee();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganReplenishmentFee();
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
</style>

