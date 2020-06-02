const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
// components/region-picker/region-picker.js
Page({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  data: {
    label: {
      type: String,
      value: ''
    },
    formid: {
      type: String,
      value: ''
    },
    forminfo: {
      type: Object,
      value: {}
    }
  },
  behaviors: ['wx://component-export'],
  data: {
    text_datetime: ''
  },

  export() {
    return {
      fromdata: this.data.text_datetime
    };
  },

  bindPickerChange: function (e) {
    this.setData({
      //给变量赋值
      text_datetime: e.detail.value
    });
  }
});