<template>
    <div class="frame">
        <LonganSidebar/>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LonganSidebar from '@/components/LonganSidebar'
export default {
    name: 'HomePage',
    components: {
        LonganSidebar
    },
    data() {
        return{

        }
    },
    mounted(){
        this.$router.push({name:'LonganPrivilegeUserList'});
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
.frame{
    padding: 0;
    margin: 0;
    .main{
        float: left;
        width: calc(100% - 362px);
        margin: 20px 30px;
    }
}
</style>


