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
    input_radio:'',
  },
  behaviors: ['wx://component-export'],//组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.input_radio
    }
  },
  ready:function(){
    this.setData({   //给变量赋值
      input_radio: this.properties.forminfo.valueScopeJson[0].val
    })
  },
  methods: {
    enterValue:function(e){
      this.setData({
        input_radio: e.detail.value
      });
    }
  }
}) 