
<template>
   <div class="sonZujian">
        <el-button type="primary" @click="dialogVisibleDelete=true">子组件弹窗</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span v-if="fathdata==undefined">是否确认删除该商品？</span>
            <span v-if="fathdata!=undefined">{{fathdata.chuanText}}</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>
        <el-button type="primary" @click="jumpdata">子组件点击向父组件传数据</el-button>
        <el-button type="primary" @click="jump">子组件去父组件 在父组件不跳转</el-button>
        <el-button type="primary" @click="sondiaoqu">子组件调用父组件方法</el-button>
   </div>
</template>

<script>
   export default {
      name:"sonZujian",
      props:{
         fathdata:Object
      },
      data(){
        return {
           dialogVisibleDelete:true,
           sondata:{
              soninfo01: 6,
              sonText:"我是子组件的数据",
              sonoperateData: [
                  {
                      log: "子组件分公司创建批次订单",
                      remark: "子组件--",
                      submitTime: "子组件2019-04-18 13:34:14"
                  },
              ],
          },
        }
      },
      mounted(){
         console.log(this.fathdata)
      },
      methods:{
         Confirmdel(){
           this.dialogVisibleDelete=false;
         },

         jump(){  //跳转到父组件
            this.$router.push({name:"fatherZujian"})
          },

          jumpdata(){ //向父组件传递数据
            this.$emit('sondatamethod',this.sondata)
         },

         passfangfa(){ //被父组件调用的子组件方法
            // this.sondata.chuanText='被父组件调用子组件方法';
            this.$set(this.sondata,"sonText","被父组件调用子组件方法修改的数据")
            this.$forceUpdate();
            console.log(this.sondata.sonText)
         },

         sondiaoqu(){  //子组件调用父组件方法
           this.$emit('passfangfa')
         },

      },

   }
</script>

<style lang="less" scoped>
   .sonZujian{

   }
</style>














