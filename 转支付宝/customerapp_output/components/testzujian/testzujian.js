const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
var objfunction



Component({
  mixins: [],
  data: {
    info:"11111",
    sendfatherdata:'',
  },
  props: {
    senddata:Object
  },
  didMount() {
    // this.objfunction11()
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

  xianShi:function(obj){
    this.objfunction(10)
    if (obj.data) {
        objfunction = obj.data;
      }
  },

  zifangfa:function(){
    console.log("调用成功了！")
  },

  donghua(){

   var that = this;
      var animation = wx2my.createAnimation({
        transformOrigin: "50% 50%",
        duration: 500,
        timingFunction: "ease",
        delay: 0
      })
      
      animation.translateY(35).step()
      that.setData({
        animationData: animation.export()
      })


  },

  enterValue(e){
    console.log(e)
    let aa=e.detail.value
    console.log(aa)
    this.setData({
      sendfatherdata:aa
    })
   this.props.onFatherreceive(this.data.sendfatherdata)

  }


  },
});
