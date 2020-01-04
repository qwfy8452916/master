<template>
    <div class="frame">
         <div>yinyong</div>
         <HelloWorld @user-modify="modify"></HelloWorld>
         <div>{{$store.getters.datasj}}</div>
    </div>
</template>

<script>

import { HelloWorld } from 'yinyong'
import store from '@/vuex/store'
export default {
    name: 'yinyong',
    store,
    components: {
        HelloWorld
    },
    data() {
        return{

        }
    },
    mounted(){
        // this.$router.push({name:'index'});
    },
    methods: {
      modify(id){
        console.log('引用界面打印'+id)
      }
    }
}
</script>

<style lang="less" scoped>
.frame{
    padding: 0;
    margin: 0;

}
</style>
