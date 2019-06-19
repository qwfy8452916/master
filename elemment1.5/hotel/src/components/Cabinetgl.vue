<template>
    <div>
        <el-form :inline="true" align=left>
            <el-form-item label="柜子id">
                <el-input v-model="cabinetId"></el-input>
            </el-form-item>
            <el-form-item label="二维码id">
                <el-input v-model="qrCode"></el-input>
            </el-form-item>
            <el-form-item label="酒店楼层">
                <el-input v-model="hotelFloor"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select class="termput" v-model="defaultstatus" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="CabinetList" border style="width:100%;" >
            <el-table-column fixed prop="cabinetCode" label="柜子id" align=center></el-table-column>
            <el-table-column prop="cabinetIot" label="物联卡" align=center></el-table-column>
            <el-table-column prop="cabinetQrcode" label="二维码id" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column prop="cabinetStatus" label="状态" align=center>
                <template scope="scope">
                    {{ scope.row.cabinetStatus===1 ? "正常":"故障" }}
                </template>
            </el-table-column>
            <el-table-column prop="faultTypeName" label="故障类型" align=center></el-table-column>
            <el-table-column prop="wifiSsid" label="WiFi名称" align=center></el-table-column>
            <el-table-column prop="wifiPassword" label="WiFi密码" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" align=center></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="200px" align=center>
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
            oprOgrId:"",  //标识
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
            defaultstatus:"",  //状态
            statusdata:[{id:"",name:"全部"},{id:1,name:"正常"},{id:2,name:"异常"}],
        }
    },
     created() {
       this.oprOgrId=localStorage.orgId
       this.Getdata()
    },
    methods: {


      selectdate(e){
        console.log(e)
        this.defaultstatus=e
      },
        //查询
        inquire(){
        let that=this;
        if(!isNaN(that.hotelFloor)){
          this.Getdata()
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
                encryptedOrgId:that.oprOgrId,
                cabinetCode : that.cabinetId,
                cabinetQrcode :that.qrCode,
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                roomFloor :that.hotelFloor,
                cabinetStatus:that.defaultstatus,
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

