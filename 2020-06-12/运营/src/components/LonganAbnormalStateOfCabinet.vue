<template>
    <div class="LonganAbnormalStateOfCabinet">
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
            <el-form-item label="柜子状态">
                <el-select v-model="CabinetType">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="异常" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
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
        </el-form>
        <el-table :data="LonganAbnormalStateOfCabinetDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="roomFloor" label="楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="cabId" label="柜子id" align=center></el-table-column>
            <el-table-column prop="status" label="柜子状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '0'">异常</span>
                    <span v-else-if="scope.row.status == '1'">正常</span>
                </template>
            </el-table-column>
            <el-table-column prop="malType" label="故障类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '0'">初始类型</span>
                    <span v-else-if="scope.row.status == '1'">扫码失败</span>
                    <span v-else-if="scope.row.status == '2'">柜门不开</span>
                    <span v-else-if="scope.row.status == '3'">锁具异常</span>
                    <span v-else-if="scope.row.status == '4'">其他</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="故障开始时间" width="160px" align=center></el-table-column>
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
export default {
    name: 'LonganAbnormalStateOfCabinet',
    data(){
        return{
            HotelName: '',
            CabinetType: '',
            inquireTime: '',
            LonganAbnormalStateOfCabinetDataList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            encryOprOrgId: '',
            inquireHotelName: '',
            hotelList: [],
            loadingH: false
        }
    },
    mounted(){
        // this.encryOprOrgId=localStorage.getItem('orgId');
        // this.encryOprOrgId = this.$route.params.orgId;
        this.getHotelList();
        this.LonganAbnormalStateOfCabinet();
    },
    methods: {
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
        //柜子异常
        LonganAbnormalStateOfCabinet(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                // encryOprOrgId: this.encryOprOrgId,
                orgAs: 2,
                hotelId: this.inquireHotelName,
                status: this.CabinetType,
                startTime: this.inquireTime[0],
                endTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganAbnormalStateOfCabinet({params}).then(response=>{
                if(response.data.code==0){
                    this.LonganAbnormalStateOfCabinetDataList = response.data.data.records;
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
            this.LonganAbnormalStateOfCabinet();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganAbnormalStateOfCabinet();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganAbnormalStateOfCabinet();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganAbnormalStateOfCabinet();
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

