<template>
    <div class="purchaselist">
        <el-form :inline="true" align=left>
          <el-form-item label="酒店名称">
                <el-input v-model="hotelname"></el-input>
            </el-form-item>
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
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>


        <el-table :data="Productlist" border style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="roomCode" label="用户房间号" align=center></el-table-column>
            <el-table-column prop="customerName" label="用户姓名" align=center></el-table-column>
            <el-table-column prop="mobile" label="手机号" align=center></el-table-column>
            <el-table-column prop="createat" label="提交时间" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
              <template scope="scope">
                    {{ scope.row.status===0 ? "待确认":(scope.row.status===1?"已确认":"已取消") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="" label="操作" align=center is-center>
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
            hotelname:"",  //酒店名称
            customerName: '',  //用户姓名
            mobile:'',  //手机号
            delindexid:null,    //当前id
            delindex:null,    //当前索引
            status:"",    //状态
            Productlist: [],
            dialogVisibleDelete: false,
            dateone:"", //时间1
            datetwo:"", //时间2
            oprOgrId:"", //标识
            statusdata:[{"name":"全部","value":""},{"name":"待确认","value":"0"},{"name":"已确认","value":"1"},{"name":"已取消","value":"2"}],
            audio: {
              currentTime: 0,
              maxTime: 0,
              playing: false,  //是否自动播放
              muted: false,   //是否静音
              speed: 1,
              waiting: true,
              preload: 'auto'
            },
        }
    },
    created(){
        this.oprOgrId=localStorage.orgId
        this.Getdata(this.oprOgrId)
    },
    methods: {
        //查询
        inquire(){
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
                hotelName:that.hotelname,
                customerName:that.customerName,
                mobile:that.mobile,
                startTime:that.dateone,
                endTime:that.datetwo,
                status:that.status,
                entryOprOrgId:oprOgrId,
            }
            this.$api.getserverrecord({params}).then(response=>{
                if(response.data.code==0){
                  that.pageTotal=response.data.data.total
                  that.Productlist=response.data.data.records
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

