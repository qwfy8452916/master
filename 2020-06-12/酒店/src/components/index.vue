<template>
    <div class="index">
        <label class="welcome">欢迎登录 - 管理后台</label>
        <img src="../assets/images/indexbg.png" class="indeximg" alt="indexbg" />
    </div>
</template>

<script>
export default {
    name: 'index',
    data(){
        return{

        }
    },
}
</script>

<style lang="less" scoped>
.index{
    margin: -20px -30px;
    .welcome{
        width: calc( 100% - 300px);
        font-size: 38px;
        color: #fff;
        line-height: 38px;
        position: absolute;
        top: 48%;
    }
    .indeximg{
        width: 100%;
    }
}
</style>

