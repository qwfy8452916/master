<template>
    <div>
        <el-form :inline="true" align=left>
            <el-form-item label="柜子id">
                <el-input v-model="cabinetId"></el-input>
            </el-form-item>
            <el-form-item label="二维码id">
                <el-input v-model="qrCode"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-input v-model="hotelName"></el-input>
            </el-form-item>
            <el-form-item label="酒店楼层">
                <el-input v-model="hotelFloor"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="CabinetList" border style="width:100%;" >
            <el-table-column prop="cabinetCode" label="柜子id" width="120px" align=center></el-table-column>
            <el-table-column prop="cabinetIot" label="物联卡" width="120px" align=center></el-table-column>
            <el-table-column prop="cabinetQrcode" label="二维码id" width="120px" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" width="120px" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" width="120px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" width="120px" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" width="150px" align=center></el-table-column>
            <el-table-column prop="cabinetStatus" label="状态" width="120px" align=center>
                <template scope="scope">
                    {{ scope.row.cabinetStatus===0 ? '正常' : '故障' }}
                </template>
            </el-table-column>
            <el-table-column prop="createdBy" label="操作人姓名" width="120px" align=center></el-table-column>
            <el-table-column prop="" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" size="small" @click="Cabinetgllook(scope.$index, CabinetList)">查看商品信息</el-button>
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
    </div>
</template>

<script>



export default {
    name: 'Cabinetgl',
    data() {
        return{
            cabinetId:"",
            qrCode:"",
            hotelName:"",
            hotelFloor:"",
            pageId:"",
            pageSize:10,   //每页显示条数
            CabinetList: [],
            modifyid:'' ,  //柜子id
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
        }
    },
     created() {
       this.Getdata()
    },
    methods: {
        //查询
        inquire(){
            let that=this;
            let params = {
                cabinetCode : that.cabinetId, 
                cabinetQrcode :that.qrCode,
                hotelName : that.hotelName,
                pageNo : that.pageId,
                pageSize : that.pageSize,
                roomFloor : that.hotelFloor,
                passvalue:''   //柜子id
            }
            if(!isNaN(that.hotelFloor)){
                this.$api.CabinetGl({params}).then(response => {
                        if(response.data.code == 0){
                            that.CabinetList=response.data.data.records
                        }else{
                            that.$alert(response.data.data.msg,"警告",{
                                confirmButtonText: "确定"
                            })
                        }
                    })
                    .catch(error => {
                        that.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }else{
                this.$message.error('楼层请输入数字');
            }



           

        },
        //修改
        Cabinetglchange(index,row){
            let guiId=row[index].id
            this.$router.push({name:'Cabinetchange',params:{modifyid: guiId}});
        },
        //查看
        Cabinetgllook(index,row){
            let guiId=row[index].id
            this.$router.push({name:'Cabinetlook',params:{modifyid: guiId}});
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
        //获取数据
        Getdata(){
            let that=this;
            let params = {
                cabinetCode : "", 
                cabinetQrcode :"",
                hotelName:"",
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                roomFloor :"" 
            }

            this.$api.CabinetGl({params}).then(response => {
                    if(response.data.code == 0){
                        that.pageTotal=response.data.data.total
                        that.CabinetList=response.data.data.records
                    }else{
                        that.$alert(response.data.data.msg,"警告",{
                            confirmButtonText: "确定"
                        })
                    }
                })
                .catch(error => {
                    that.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
          }
       }
}
</script>

<style lang="less" scoped>

</style>

