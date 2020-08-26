
<template>
  <div class="fatherZujian">
      <sonZujian ref="mychild" :fathdata="fathdata" @sondatamethod="sondatamethod" @passfangfa="passfangfa"></sonZujian>
      <div class="alignleft">
         <el-button type="primary" @click="jump">去子组件</el-button>
         <div>子组件传递过来的数据展示:{{getsoninfo.sonText}}</div>
         <el-button type="primary" @click="callSon">调用子组件方法</el-button>
         <div>子组件调用父组件方法修改数据:{{fathdata.chuanText}}</div>
      </div>

  </div>

</template>

<script>

  import sonZujian from '@/components/sonZujian';

  export default {
     name:"fatherZujian",
     data(){
       return {
          getsoninfo:'',  //获取子组件传递过来的数据
          fathdata:{  //传递给子组件的数据
              curStep: 9,
              chuanText:"父组件传来的数据显示在父组件",
              operateData: [
                  {
                      approveStatus: "通过",
                      approveTime: "2019-04-18 13:34:15",
                      approver: "",
                      demand_status: "STATUS_SLAVE_ORDER_CREATED",
                      demander: "test1991",
                      duration: "--",
                      log: "分公司创建批次订单",
                      remark: "--",
                      submitTime: "2019-04-18 13:34:14"
                  },
              ],
          }
       }
     },
     mounted(){

     },
     components:{
        sonZujian
     },
     methods:{

        jump(){
           console.log(this.getsoninfo)
           this.$router.push({name:"sonZujian"})
        },

        //获取子组件数据
        sondatamethod(e){
           this.getsoninfo=e;
        },
        //调用子组件方法
        callSon(){
           this.$refs.mychild.passfangfa();
        },
        //被子组件调用的方法
        passfangfa(){
           this.$set(this.fathdata,"chuanText","被子组件调用父组件方法修改的数据")
           this.$forceUpdate();
        }
     },
  }

</script>

<style lang="less" scoped>
   .fatherZujian{
       .alignleft{text-align:left;}
   }
</style>

















