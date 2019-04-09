<template>
    <div class="login-wrapper">
        <p class="title">龙眼 - 运营平台</p>
        <el-form>
            <el-form-item label="账号：">
                <el-input v-model="account"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="background-animation">
            <ul class="background-bubbles">
                <li v-for="(item,index) in bubbles" :key="index"></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    head() {
        return{
            title: '龙眼-运营平台',
            meta: [
                {hid:'description', name:'description', content:'description'}
            ]
        }
    },
    data() {
        return {
            account: "",
            password: "",
            bubbles: []
        }
    },
    created() {
        this.bubbles.length = 5;
    },
    methods: {
        login() {
            let that = this;
            const params = {
                account: that.account,
                password: that.password 
            };

            that.$router.push({name: "HomePage"});

            // this.$api.login(params)
            //     .then(response => {
            //         // if(response.data.msg_code == 10000){
            //         //     if(response.data.response.token){
            //         //         this.$message({
            //         //             $message: '登录成功！',
            //         //             type: 'success',
            //         //         });
            //         //         that.$router.push({name: "index"});
            //         //     }else{
            //         //         that.$router.push({name: "register"});
            //         //     }
            //         // }else{
            //         //     that.$alert(response.data.message,"警告",{
            //         //         confirmButtonText: "确定"
            //         //     })
            //         // }
            //     })
            //     .catch(error => {
            //         // that.$alert(error,"警告",{
            //         //     confirmButtonText: "确定"
            //         // })
            //     })



            // this.$message({
            //     $message: '登录',
            //     type: 'success'
            // })
            // const params = {};
            // this.$api.login(params)
            //     .then(res => {

            //     })
            //     .catch(err => {
                    
            //     })
            // this.$message({
            //     message: '登录',
            //     type: 'success'
            // })
        }
    }
}
</script>

<style scoped>
.el-form{
    width: 90%;
}
.el-input{
    width: 80%;
}
.el-button{
    width: 40%;
}
</style>

<style lang="less" scoped>
.login-wrapper{
    width: 300px;
    height: 300px;
    padding: 10px 100px;
    border: 2px solid #409eff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 250px);
    .title{
        font-size: 28px;
        margin-bottom: 40px;
    }

    .background-bubbles {
        position: fixed;
        //使气泡背景充满整个屏幕
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        li{
            position: absolute;
            // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
            bottom: -100px;
            // 默认的气泡大小；
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.15);
            list-style: none;
            // 使用自定义动画使气泡渐现、上升和翻滚；
            animation: animationSquare 16s infinite alternate;
            transition-timing-function: linear;
            // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
            &:nth-child(1){
                left: 46%;
                animation-delay: 6s;   //延时
                animation-duration: 14s;   //动画时长
                background: rgba(255,255,0,0.15);
            }
            &:nth-child(2){
                left: 12%;
                animation-delay: 4s;   //延时
                animation-duration: 15s;   //动画时长
                background: rgba(0,0,255,0.1);
            }
            &:nth-child(3){
                left: 27%;
                width: 60px;
                height: 60px;
                animation-delay: 2s;   //延时
                animation-duration: 14s;   //动画时长
                background: rgba(0,255,0,0.15);
            }
            &:nth-child(4){
                left: 65%;
                width: 30px;
                height: 30px;
                animation-delay: 1s;   //延时
                background: rgba(255,0,255,0.05);
            }
            &:nth-child(5){
                left: 88%;
                width: 80px;
                height: 80px;
                animation-delay: 3s;   //延时
                animation-duration: 10s;   //动画时长
                background: rgba(255,0,0,0.1);
            }
        }
        // 自定义 animationSquare 动画；
        @keyframes animationSquare {
            0%{
                opacity: 0.5;
                transform: translateY(0px) rotate(45deg); 
            }
            25%{
                opacity: 0.75;
                transform: translateY(-300px) rotate(90deg); 
            }
            50%{
                opacity: 1;
                transform: translateY(-600px) rotate(135deg); 
            }
            100%{
                opacity: 0;
                transform: translateY(-1000px) rotate(180deg);
            }
        }
    }

}
</style>

