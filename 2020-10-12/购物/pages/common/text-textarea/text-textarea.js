const app = getApp();
import wxrequest from '../../../request/api'
Component({
  options:{
    addGlobalClass: true,
  },
  properties:{
    label:{
      type:String,
      value:'',
    },
    formid:{
      type: String,
      value: '',
    },
    forminfo:{
      type:Object,
      value:{}
    },
    role:{
       type:Object,
       value:{}
    }
  },
  data: {
    input_textarea:'',
  },
  behaviors: ['wx://component-export'],//组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.input_textarea
    }
  },
  ready:function(){
  },
  methods: {
    enterValue:function(e){
       this.setData({
         input_textarea: e.detail.value
       });
    }
  }
}) 