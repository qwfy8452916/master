<template>
  <div class="resetB">
      <el-button style="background:#71a8e0" @click="reset" type="primary">重&nbsp;&nbsp;置</el-button>
  </div>
</template>

<script>
export default {
    methods:{
      reset(){
        this.$store.commit('resetSearch')
        this.$emit('resetFunc')
      }
    }
}
</script>

<style lang="less" scope>

</style>