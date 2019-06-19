<template>
    <div class="HotelDivideInto">
        <el-form :inline="true" align=left>
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
        <ul class="HotelDivideIntoul" v-for="item in HotelDivideIntoList" v-if="HotelDivideIntoulshow">
            <li>
                <span>本月销售(元)：</span><span>{{item.salesAmoun}}</span>
            </li>
            <li>
                <span>本月毛利(元)：</span><span>{{item.profitAmount}}</span>
            </li>
            <li>
                <span>本月分成(元)：</span><span>{{item.dividedAmoun}}</span>
            </li>
            <li>
                <span>冻结金额（元）：</span><span>{{item.lockAmoun}}</span>
            </li>
            <li>
                <span>可提现金额（元）：</span><span>{{item.balanceAmoun}}</span>
            </li>
        </ul>
        <ul class="HotelDivideIntoul" v-else>
            <li>
                <span>本月销售(元)：</span><span></span>
            </li>
            <li>
                <span>本月毛利(元)：</span><span></span>
            </li>
            <li>
                <span>本月分成(元)：</span><span></span>
            </li>
            <li>
                <span>冻结金额（元）：</span><span></span>
            </li>
            <li>
                <span>可提现金额（元）：</span><span></span>
            </li>
        </ul>
        <div class="btnbox">
            <el-button type="text" @click="dialogFormVisible = true">提现</el-button>
        </div>
        <el-dialog class="changebox" title="提现申请" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="请输入提现金额:" :label-width="formLabelWidth">
                    <el-input type="number" v-model="form.money" auto-complete="off"></el-input>
                </el-form-item>
                <div class="tixian-font">请确认账户信息：</div>
                <ul class="AccountInformation">
                    <li><span>开户银行:</span><span>{{ form.hotelBank }}</span></li>
                    <li><span>账户名称:</span><span>{{ form.hotelAccountName }}</span></li>
                    <li><span>账    号:</span><span>{{ form.hotelAccount }}</span></li>
                </ul>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="tixianfun">确 定</el-button>
            </div>
            <div class="rulebox">
                <span>提现规则：</span>
                每周能提现两次，每周一，周四为可提现日。<br />
                申请提现后，提现金额进入审核阶段。<br />
                审核通过后提现金额将转入您的账户，请注意查收。
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelDivideInto',
    data(){
        return{
            inquireTime: [],
            dialogFormVisible: false,
            form: {},
            formLabelWidth: '120px',
            orgId: '',
            HotelDivideIntoList: [],
            HotelDivideIntoulshow: false
        }
    },
    mounted(){
        this.orgId = localStorage.getItem('orgId');
        this.jisuantime();
        this.HotelDivideInto();
        this.getwithdraw();
    },
    methods: {
        jisuantime(){  
            const date1 = new Date(); //当天日期
            const end = this.timeFormat(date1);;//当天
            date1.setDate(1);
            const start = this.timeFormat(date1);//1号
            this.inquireTime=[start,end];
        },
        timeFormat(date) {
            if (!date || typeof(date) === "string") {
                this.error("参数异常，请检查...");
            }
            var y = date.getFullYear(); //年
            var m = date.getMonth() + 1; //月
            var d = date.getDate(); //日
            return y + "-" + m + "-" + d;
        },
        //酒店分成
        HotelDivideInto(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedOrgId: this.orgId,
                orderAtStart: this.inquireTime[0],
                orderAtEnd: this.inquireTime[1]
            };
            this.$api.HotelDivideInto({params}).then(response=>{
                if(response.data.code==0){
                    if(response.data.data.length > 0){
                        this.HotelDivideIntoulshow = true;
                        this.HotelDivideIntoList = response.data.data;
                    }else{
                        this.HotelDivideIntoulshow = false;
                    }
                    
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
        //获取酒店账户信息
        getwithdraw(){
            const params = {
                orgId: this.orgId
            };
            this.$api.getwithdraw({params}).then(response=>{
                if(response.data.code==0){
                  this.form = response.data.data;
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
            this.HotelDivideInto();
        },
        //提现申请
        tixianfun(){
            if(this.form.money==''|| this.form.money==undefined){
                this.$message({
                    message: '请输入提现金额',
                    type: 'warning'
                });
                return false;
            }else if(this.form.money < 0){
                this.$message({
                    message: '提现金额不可为负数',
                    type: 'warning'
                });
                this.form.money = '';
                return false;
            }else if(this.form.money>this.HotelDivideIntoList[0].balanceAmoun){
                this.$message({
                    message: '提现金额不能大于可提现金额，请重新填写提现金额',
                    type: 'error'
                });
                this.form.money = '';
                return false;
            }else{
                this.dialogFormVisible = false;
                const params = {
                    hotelOrgId: this.orgId,
                    hotelWithdrawalAmount: this.form.money,
                    hotelBank:  this.form.hotelBank,
                    hotelAccountName:  this.form.hotelAccountName,
                    hotelAccount:  this.form.hotelAccount
                };
                this.$api.postwithdraw(params).then(response=>{
                    if(response.data.code==0&&response.data.data){
                        this.$message({
                            message: '您已成功提交申请，提现金额为'+ this.form.money +'元，我们会在尽快处理，请注意查收！',
                            type: 'success'
                        });
                        this.form.money = '';
                        this.HotelDivideInto();
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
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .HotelDivideIntoul{
        width: 330px;
        border: 1px solid #ccc;
        padding: 0;
        margin-bottom: 20px;
    }
    .HotelDivideIntoul li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
    }
    .HotelDivideIntoul li:last-child{
        border-bottom: none;
    }
    .HotelDivideIntoul li span{
        width: 48%;
        flex-grow: 1;
        font-size: 16px;
        color: #333;
        text-align: left;
        padding-left: 2%;
    }
    .HotelDivideIntoul li span:first-child{
        border-right: 1px solid #ccc;
    }
    .btnbox{
        text-align: left;
    }
    .btnbox .el-button{
        width: 150px;
    }
    .el-button--text{
        background: #409EFF;
        color: #fff;
    }
    .tixianbox{
        position: fixed;
        width: 300px;
        padding: 20px 20px;
        background: #fff;
        top:20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        z-index: 9;
    }
    .tixian-font{
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        text-align: left;
        padding-left: 8px;
    }
    .tixianform{
        text-align: left;
    }
    .moneyinput{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .AccountInformation{
        padding-left: 8px;
    }
    .AccountInformation li{
        list-style: none;
        text-align: left;
        font-size: 14px;
        line-height: 30px;
        display: flex;
        justify-content: flex-start;
    }
    .AccountInformation li span:first-child{
        width: 80px;
    }
    .rulebox{
        font-size: 12px;
        color: #bebebe;
        text-align: left;
        line-height: 25px;
    }
    .rulebox span{
        display: block;
        font-size: 14px;
        color: #333;
    }
</style>