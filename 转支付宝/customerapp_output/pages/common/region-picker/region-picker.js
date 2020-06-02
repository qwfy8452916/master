const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
Page({
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
    input_region: ''
  },

  export() {
    return {
      fromdata: this.data.input_region
    };
  },

  bindPickerChange: function (e) {
    this.setData({
      //给变量赋值
      input_region: e.detail.value
    });
  }
});