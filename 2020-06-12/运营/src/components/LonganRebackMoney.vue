<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="openid">
                <el-input v-model="openid" placeholder="输入openid"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="nickName" placeholder="输入用户昵称"></el-input>
            </el-form-item>          
            <el-form-item label="柜子类型">
                <el-select 
                    v-model="inquireCabType"
                    filterable
                    remote
                    :remote-method="remoteCabType"
                    @focus="getCabTypeList()"
                    placeholder="请选择">
                    <el-option v-for="item in cabTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退款时间">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>          
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="openId" label="openid" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户呢称" align=center></el-table-column>
            <el-table-column prop="typeName" label="柜子类型名称" align=center></el-table-column>
            <el-table-column prop="refoundCount" label="退款数量" align=center></el-table-column>
            <el-table-column prop="refoundAmount" label="已退款金额" align=center></el-table-column>
            <el-table-column prop="createdAt" label="退款时间" align=center></el-table-column>
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
    name: 'LauncherbounceRecords',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            openid:'',
            nickName:'',
            inquireCabType:"",
            dateRange:'',
            cabTypeList:[],

            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            currentPage: 1, //当前页码
            pageNum: 1,
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.openid = this.$route.params.modifyid;

    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.openid = ''
            this.nickName = ''
            this.inquireCabType = ''
            this.dateRange = []
            this.Getdata();
        },
        //查询
        inquire(){
            this.Getdata();
            this.$store.commit('setSearchList',{
                openid: this.openid,
                nickName: this.nickName,
                inquireCabType: this.inquireCabType,
                dateRange:this.dateRange
            })
        },
       
        //当前页码
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
        //非空校验
        ifEmpty(item){
           if(item === ''){
               return undefined;
            }else{
                return item;
            }
        },
        remoteCabType(val){
            this.getCabTypeList(val);
        },
         //柜子类型列表
        getCabTypeList(ctName){
            const params = {};
            this.$api.getCabTypeList(params)
            .then(response => {
                const result = response.data;
                if(result.code == 0){
                    if(result.data.length != 0){
                        this.cabTypeList = result.data.map(item => {
                            return{
                                id: item.id,
                                typeName: item.typeName 
                            }
                        })
                    }
                    const cabTypeAll = {
                        id: '',
                        typeName : '全部'
                    };
                    this.cabTypeList.unshift(cabTypeAll);
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
        //获取数据
        Getdata(){ 
            let that=this;
            let params = {
                openId: this.ifEmpty(this.openid),
                nickName: this.ifEmpty(this.nickName),
                typeId : this.ifEmpty(this.inquireCabType),
                refundTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
                refundTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            this.$api.forturnReback({params}).then(response => {
                if(response.data.code == 0){
                    this.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total;
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
.pagination{
    margin-top: 20px;
}
</style>

