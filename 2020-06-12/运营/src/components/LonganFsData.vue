<template>
    <div class="dataBox">
        <div class="leftdata">
            <div class="header">
                <img src="../assets/icon/data.png" alt="" class="headIcon">
                <span>首发动态数据展示</span>
            </div>
            <div class="firstNum">
                <div class="cabNum">
                    <div>{{firstTotal}}</div>
                    <div>首发总台数</div>
                </div>
                <div class="cabNum cabNum2">
                    <div>{{firstRemain}}</div>
                    <div>剩余台数</div>
                </div>
            </div>
            <ul class="ulList">
                <li v-for="(item,index) in firstList" :key="index">
                    <span>{{item.investorNickName?item.investorNickName:'-'}}</span>
                    <span>{{'+'+item.cabinetQuantity+'台'}}</span>
                    <span>{{item.payTime}}</span>
                </li>
            </ul>
        </div>
        <div class="line"></div>
        <div class="leftdata">
            <div class="header">
                <img src="../assets/icon/data.png" alt="" class="headIcon">
                <span>投放动态数据展示</span>
            </div>
            <div class="firstNum">
                <div class="cabNum">
                    <div>{{putTotal}}</div>
                    <div>投放总台数</div>
                </div>
                <div class="cabNum cabNum2">
                    <div>{{putRemain}}</div>
                    <div>未投放台数</div>
                </div>
            </div>
            <ul class="ulList">
                <li v-for="(item,index) in putList" :key="index">
                    <span>{{item.investorNickName?item.investorNickName:'-'}}</span>
                    <span>{{item.hotelName}}</span>
                    <span>{{'柜子编号'+item.cabNum}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            firstList:[],
            putList:[],
            firstTotal:"",
            firstRemain:"",
            putTotal:"",
            putRemain:"",
        }
    },
    mounted(){
        this.getFisrtData()
        // setInterval(res=>{
        //     console.log(1);
        //     this.getFisrtData()
        // },1000)
    },
    methods:{
        getFisrtData(){
            this.$api.fsFirstDataShow().then(response => {
                if(response.data.code==0){
                    let resData = response.data.data
                    this.firstTotal = resData.totalCount
                    this.firstRemain = resData.remainCount
                    this.putTotal = resData.putCount
                    this.putRemain = resData.toPutCount - resData.putCount
                    this.firstList = resData.currentOrderBeans
                    this.putList = resData.currentCabinetBeans
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        }
    }
}
</script>

<style scoped lang='less'>
.dataBox{
    color: #333333;
    display: flex;
    margin-top: 20px;
    .line{
        border-left: 1px #F6F6F6 solid;
        margin: 0 70px;
        width: 1px;
    }
    .leftdata{
        .header{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
                font-size: 18px;
                font-weight: bold;
            }
        }
        .firstNum{
            display: flex;
            padding: 0 45px;
            justify-content: center;
            margin: 20px 0;
            .cabNum{
                width: 200px;
                overflow: hidden;
                height: 120px;
                border-radius: 5px;
                box-shadow: 0px 0px  10px 3px #F8FBFF;
                div:nth-child(1){
                    font-size: 60px;
                    margin-top: 10px;
                }
                div:nth-child(2){
                    font-weight: bold;
                }
            }
            .cabNum2{
                color: #2B8EF4;
                margin-left: 80px;
            }
        }
        .ulList{
            list-style: none;
            width: 100%;
            padding: 0;
            padding-right: 10px;
            height: 520px;
            overflow: auto;
            li{
                display: flex;
                height: 50px;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                border-bottom: 1px #F6F6F6 solid;
                span{
                    width: 33%;
                }
            }
        }
        .ulList::-webkit-scrollbar {
            /*滚动条整体样式*/
            width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }
        .ulList::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius   : 3px;
            background-color: rgb(228, 222, 222);
        }
        .ulList::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.1);
            background   : #fff;
            border-radius: 10px;
        }
    }
}
</style>