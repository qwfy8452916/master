<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="房间号">
                <el-input v-model="roomCode"></el-input>
            </el-form-item>
            <el-form-item label="物联卡">
                <el-input v-model="IotCard"></el-input>
            </el-form-item>
            <el-form-item label="物理编码">
                <el-input v-model="qrCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="酒店楼层">
                <el-input v-model="hotelFloor"></el-input>
            </el-form-item> -->
            <el-form-item label="状态">
                <el-select class="termput" v-model="defaultstatus" placeholder="请选择" @change="selectdate">
                    <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select class="termput" v-model="cabinetType" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="实体柜" value="0"></el-option>
                    <el-option label="虚拟柜" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="不间断电源">
                <el-select class="termput" v-model="electricStatus" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>

        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="id" label="柜子id" align=center></el-table-column>
            <el-table-column prop="cabinetIot" label="物联卡" align=center></el-table-column>
            <el-table-column prop="cabinetQrcode" label="物理编码" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="酒店楼层" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="createdAt" label="添加时间" align=center></el-table-column>
            <el-table-column prop="cabinetStatus" label="状态" align=center>
                <template slot-scope="scope">
                    {{ scope.row.cabinetStatus===1 ? "正常":"故障" }}
                </template>
            </el-table-column>
            <el-table-column prop="isVisual" label="类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isVisual=='0'">实体柜</span>
                    <span v-if="scope.row.isVisual=='1'">虚拟柜</span>
                </template>
            </el-table-column>
            <el-table-column prop="enterSettingName" label="进场配置名称" align=center></el-table-column>
            <el-table-column prop="isPowerFailure" label="不间断电源" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isPowerFailure=='1'">是</span>
                    <span v-if="scope.row.isPowerFailure=='0'">否</span>
                </template>
            </el-table-column>
            <el-table-column prop="wifiSsid" label="WiFi名称" align=center></el-table-column>
            <el-table-column prop="wifiPassword" label="WiFi密码" align=center></el-table-column>
            <el-table-column prop="lastUpdatedByName" label="操作人姓名" align=center></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="200px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BH_CAB_CABINETGLALTER']" type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" v-if="scope.row.cabType!='02' && authzlist['F:BH_CAB_CABINETGL_DETAIL'] && scope.row.isVisual!='1'" size="small" @click="Cabinetgllook(scope.$index, CabinetList)">查看商品信息</el-button>
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
import resetButton from './resetButton'
export default {
    name: 'Cabinetgl',
    components:{
        resetButton
    },
    data() {
        return{
            authzlist: {}, //权限数据
            oprOgrId:"",  //标识
            hotelid:'',
            qrCode:"",    //柜子二维码id
            IotCard:"",   //柜子物联卡
            cabinetType:"",  //柜子类型
            electricStatus:"",  //柜子断电状态
            hotelName:"",
            roomCode:"",
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
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelid = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata()
    },
    mounted(){
        this.oprOgrId = this.$route.params.orgId;
    },
    methods: {
        resetFunc(){
            this.roomCode = ''
            this.IotCard = ''
            this.qrCode = ''
            this.defaultstatus = ''
            this.cabinetType = ''
            this.electricStatus = ''
            this.Getdata();
        },
        selectdate(e){
            // console.log(e)
            this.defaultstatus=e
        },
        //查询
        inquire(){
            let that=this;
            this.Getdata()
            this.$store.commit('setSearchList',{
                roomCode: this.roomCode,
                qrCode: this.qrCode,
                defaultstatus: this.defaultstatus,
                cabinetType: this.cabinetType,
                electricStatus: this.electricStatus,
                IotCard:this.IotCard
            })
        // if(!isNaN(that.hotelFloor)){
        //   this.Getdata()
        // }else{
        //   this.$message.error('楼层请输入数字');
        //  }
        },

        updateStatus(id,value){
           console.log(id)
           console.log(value)
        },


        //修改
        Cabinetglchange(index,row){
            let modifyid=row[index]
            this.$router.push({name:'Cabinetchange',query:{modifyid}});
        },
        //查看
        Cabinetgllook(index,row){
            let modifyid=row[index].id
            this.$router.push({name:'Cabinetlook',query:{modifyid}});
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
                // encryptedOrgId:that.oprOgrId,
                hotelId:this.hotelid,
                orgAs:3,
                cabinetQrcode :that.qrCode,
                cabinetIot:that.IotCard,
                pageNo:that.pageNum,
                pageSize:that.pageSize,
                roomCode :that.roomCode,
                cabinetStatus:that.defaultstatus,
                isVisual:that.cabinetType,
                isPowerFailure:that.electricStatus,
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

