<template>
    <div class="LonganDivideInto">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-select v-model="HotelId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in hotelNameList"
                        :key="item.index"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
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
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="LonganDivideIntoDataList" border style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="salesCount" label="订单总数量" align=center></el-table-column>
            <el-table-column prop="salesAmoun" label="销售金额（元）" align=center></el-table-column>
            <el-table-column prop="dividedAmoun" label="分成金额（元)" align=center></el-table-column>
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
    name: 'LonganDivideInto',
    data(){
        return{
            inquireTime: [new Date(),new Date()],
            LonganDivideIntoDataList: [],
            HotelId: '',
            hotelNameList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            GrossIncome: '',
            oprId: ''
        }
    },
    mounted(){
        this.oprId=localStorage.getItem('orgId');
        this.HotelNameList();
        this.LonganDivideInto();
    },
    methods: {
        //获取所有酒店名称
        HotelNameList(){
            let id = this.oprId;
            this.$api.HotelNameList(id).then(response=>{
                if(response.data.code==0){
                  this.hotelNameList = response.data.data;
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
        //酒店分成
        LonganDivideInto(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                hotelId: this.HotelId,
                encryptedOrgId: this.oprId,
                orderAtStart: this.inquireTime[0],
                orderAtEnd: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.LonganDivideInto({params}).then(response=>{
                if(response.data.code==0){
                    this.LonganDivideIntoDataList = response.data.data;
                    this.pageTotal = response.data.total;
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
            this.LonganDivideInto();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganDivideInto();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganDivideInto();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganDivideInto();
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

