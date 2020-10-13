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
     inputtext:'',
  },
  behaviors: ['wx://component-export'],//组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.inputtext
    }
  },
  ready:function(){
    // console.log(forminfo)
  },
  methods: {
    enterValue:function(e){
       this.setData({
        inputtext: e.detail.value
       });
    }
  }
}) 