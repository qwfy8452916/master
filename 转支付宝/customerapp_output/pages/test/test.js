const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');

Page({
  data: {
    data1:"测试数据1",
    data2:"测试数据2",
    animationData:'',
    senddata:{
      info:"传给子组件的数据"
    },
    receivedata:'接收的数据在此显示'
  },
  onLoad() {},

saveRef(ref) {
  console.log(ref)
  // 存储自定义组件实例，方便以后调用
    this.counter = ref;
    // this.counter.zifangfa()
  },

  zhixing(){

    //  this.donghua();


    this.counter.donghua()
    // this.counter.xianShi({
    //   data:function(res){
    //     console.log(res)
    //   }
    // })
  },

  fatherreceive(e){
    console.log(e)
    this.setData({
      receivedata:e
    })
  }



});
