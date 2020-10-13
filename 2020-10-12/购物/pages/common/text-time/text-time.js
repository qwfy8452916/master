// components/region-picker/region-picker.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    label: {
      type: String,
      value: '',
    },
    formid: {
      type: String,
      value: '',
    },
    forminfo: {
      type: Object,
      value: {}
    }
  },
  behaviors: ['wx://component-export'],
  data: {
    text_time: '',
  },
  export() {
    return {
      fromdata: this.data.text_time
    }
  },
  methods: {
    bindPickerChange: function (e) {
      this.setData({   //给变量赋值
        text_time: e.detail.value
      })
    }
  }
})
