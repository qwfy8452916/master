<template>
    <div class="MerchantDividedetail">
        <el-form :model="formdata" ref="formdata" :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称" prop="hotelId">
                <el-select
                    v-model="formdata.hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
                <el-select v-model="formdata.identity">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="平台" value="1"></el-option>
                    <el-option label="运营商" value="2"></el-option>
                    <el-option label="酒店" value="3"></el-option>
                    <el-option label="供应商" value="4"></el-option>
                    <el-option label="入驻商" value="5"></el-option>
                    <el-option label="城市运营商" value="6"></el-option>
                    <el-option label="合伙人" value="7"></el-option>
                    <el-option label="加盟商" value="8"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间" prop="inquireTime">
                <el-date-picker
                    @change="datechange"
                    v-model="formdata.inquireTime"
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
                <!-- <el-button type="primary" @click="reset('formdata')">重&nbsp;&nbsp;置</el-button> -->
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <div class="export"><el-button class="addbutton" @click="exportniu">导出</el-button></div>
        <el-table :data="MerchantDividedetailDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="orgAs" label="身份" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.orgAs=='1'">平台</span>
                   <span v-if="scope.row.orgAs=='2'">运营商</span>
                   <span v-if="scope.row.orgAs=='3'">酒店</span>
                   <span v-if="scope.row.orgAs=='4'">供应商</span>
                   <span v-if="scope.row.orgAs=='5'">入驻商</span>
                   <span v-if="scope.row.orgAs=='6'">城市运营商</span>
                   <span v-if="scope.row.orgAs=='7'">合伙人</span>
                   <span v-if="scope.row.orgAs=='8'">加盟商</span>
               </template>
            </el-table-column>
            <el-table-column prop="revenueKindName" label="类别" align=center></el-table-column>
            <el-table-column prop="funcName" label="功能区" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.funcId!=-1">{{scope.row.funcName}}</span>
                   <span v-if="scope.row.funcId==-1">客房预订</span>
               </template>
            </el-table-column>
            <el-table-column prop="revenueDate" label="交易日期"></el-table-column>
            <el-table-column prop="salesAmount" label="销售金额（元）" align=center></el-table-column>
            <el-table-column prop="revenueAmount" label="分成金额（元）" align=center></el-table-column>
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
    name: 'MerchantDividedetail',
    components:{
        resetButton
    },
    data(){
        return{
            authzlist: {}, //权限数据
            formdata:{
              inquireTime: [],
              identity:'',
              hotelId:'',
            },
            MerchantDividedetailDataList: [],
            hotelList: [],
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            oprId: '',
            loadingH: false,
        }
    },
    created(){
      this.getnowdate();
      this.getHotelList()
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this.formdata[item] = this.$store.state.searchList[item]
            }
        }
        this.MerchantDividedetail();
        this.oprId = this.$route.params.orgId;


    },
    methods: {
        resetFunc(){
            this.formdata.hotelId = ''
            this.formdata.identity = ''
            this.formdata.inquireTime = []
            this.MerchantDividedetail();
        },
         //查看详情
         lookdetail(id){
            this.$router.push({name:'MerchantDividedetaildetail',query:{id}})
         },
        MerchantDividedetail(){
            let that=this;
            if(this.formdata.inquireTime == null){
                this.formdata.inquireTime = [];
            }
            const params = {
                pageNo: this.pageNum,
                pageSize: 10,
                orgAs:this.formdata.identity,
                hotelId:this.formdata.hotelId,
                startDate: this.formdata.inquireTime[0],
                endDate: this.formdata.inquireTime[1],
            };
            this.$api.getDividetail({params}).then(response=>{
                if(response.data.code==0){
                    that.MerchantDividedetailDataList = response.data.data.records;
                    that.pageTotal = response.data.data.total
                    console.log(that.MerchantDividedetailDataList)
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

        //获取当月日期
        getnowdate(){
          let nowdate=new Date();
          let enddate=nowdate.getFullYear()+'-'+parseInt(nowdate.getMonth()+1)+'-'+nowdate.getDate()
          let startdate=nowdate.getFullYear()+'-'+parseInt(nowdate.getMonth()+1)+'-'+'1'
          this.formdata.inquireTime[0]=startdate
          this.formdata.inquireTime[1]=enddate

        },

        datechange(e){
          let start=new Date(e[0]).getTime();
          let endtinme=new Date(e[1]).getTime();
          let difference=endtinme-start
          this.addmulMonth(e[0],2)
          let twodatetime=new Date(this.twotime).getTime()-start+1000*3600*24;
          if(difference>twodatetime){
            this.formdata.inquireTime[1]=this.twotime
            this.$message.error('时间范围最大为两个月！');
          }
       },

       addmulMonth(dtstr, n)
        {
            var s = dtstr.split("-");
            var yy = parseInt(s[0]);
            var mm = parseInt(s[1]);
            var dd = parseInt(s[2]);
            var dt = new Date(yy, mm, dd);

            var num=dt.getMonth() + parseInt(n);
            if(num/12>1){
              yy+=Math.floor(num/12) ;
              mm=num%12;
            }else{
                mm+=parseInt(n);
            }
            this.twotime=yy + "-" + mm  + "-" + dd;
            return yy + "-" + mm  + "-" + dd;
        },



        //获取所有酒店名称
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 5,
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

        //查询
        inquire(){
            this.pageNum = 1;
            this.MerchantDividedetail();
            this.$store.commit('setSearchList',{
                hotelId: this.formdata.hotelId,
                identity: this.formdata.identity,
                inquireTime:this.formdata.inquireTime
            })
        },
        // 重置
        reset(formName){
          this.$refs[formName].resetFields();
          this.formdata.inquireTime=[];

        },

        //导出
        exportniu(){
           let that=this;
           if(this.formdata.identity==''){
                  window.location.href ="http://hotel.kefangbao.com.cn/longan/api/fin/export/download"
              // window.location.href ="http://172.16.200.90:9001/longan/api/fin/export/download"
              // window.location.href ="http://192.168.1.122:9001/longan/api/fin/export/download"
           }else{
                 window.location.href ="http://hotel.kefangbao.com.cn/longan/api/fin/export/download?orgAs="+this.formdata.identity
              // window.location.href ="http://172.16.200.90:9001/longan/api/fin/export/download?orgAs="+this.formdata.identity
              // window.location.href ="http://192.168.1.122:9001/longan/api/fin/export/download?orgAs="+this.formdata.identity
              }

        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.MerchantDividedetail();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.MerchantDividedetail();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.MerchantDividedetail();
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
    .cell a{
        display: block;
        margin-bottom: 10px;
    }
    .export{
        float: left;
        margin-bottom: 10px;
    }
</style>

