// component/form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    forminfo: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    shuchudata:'',
  },
  export() {
    console.log(this.data.shuchudata)
    return {
      forminfo: this.data.shuchudata
    }
  },

  ready: function () {
    console.log(this.data.forminfo)
    console.log(this.properties.forminfo)
    
  },

  observers: {
    'forminfo'(data) {  
      console.log(data)

    }
  },

  attached: function () {
    console.log(this.data.forminfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {

    switchdj: function () {
      this.setData({
        switchJudge: !this.data.switchJudge
      })
    },

    //重置
    // reset:function(){
    //   // this.setData({
    //   //   shuchudata:'我传过去'
    //   // })
    //   // console.log(this.data.shuchudata)
    //   this.triggerEvent('myevent', { shuchudata:'我传过去'})

    // },
    
    //搜索
    formSubmit:function(e){
      console.log(e.detail.value)
      this.triggerEvent('myevent', { data: e.detail.value })
    },
 
    //重置
    formReset: function (e) {
      let nowforminfo=this.data.forminfo.map(item=>{
        if (item.type =="pick"){
          item.nowindex="";
        }
        return item;
      })
      console.log(e)
      this.setData({
        forminfo: nowforminfo
      })

    },

    bindchange(e){
      
      let wkindex=e.currentTarget.dataset.index
      let sxindex=e.detail.value

      let nowindex = "forminfo[" + wkindex + "].nowindex"
      this.setData({
        [nowindex]: e.detail.value
      })

      console.log(this.data.forminfo)
    },

  }
})
