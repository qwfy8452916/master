<template>
    <div class="zn-header">
        <div class="imgBox">
            <img src="../../assets/img/logo.png" alt="">
        </div>
        <p>江建联采管理后台</p>
        <div class="getOut" @click="getOutF">
            <img src="../../assets/img/exit.png" alt="">
            <span>{{name}}</span>
            <span>退出</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:''
        }
    },
    mounted(){
        this.name = localStorage.getItem('username');
    },
    methods:{
        getOutF:function(){
            this.$api.loginOut().then(res=>{
                if(res.data.code == 0){
                    localStorage.removeItem('AuthData');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userID');
                    localStorage.removeItem('username');
                    localStorage.removeItem('accountType');
                    this.$message(res.data.data);
                    setTimeout(() => {
                        this.$router.push({path:"/login"})
                    }, 200);
                   
                }else{
                    this.$message(res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang='less' scoped>
    .imgBox{
        float: left;
        img{
            width: 98px;
            height: 33px;
            display: block;
            margin-top: 15px;
        }
    }
    p{
        float: left;
        font-size: 20px;
        color:#fff;
        font-weight: bold;
        margin-left:15px;
        line-height: 26px;
    }
    .getOut{
        width: 100px;
        float: right;
        color: #fff;
        cursor: pointer;
        text-align: center;
        img{
            width: 26px;
            height: 28px;
            display: block;
            float: left;
            margin-top: 15px;
        }
    }
</style>
