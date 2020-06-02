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
    input_number: 1
  },

  export() {
    return {
      fromdata: this.data.input_number
    };
  },

  ready: function () {
    this.setData({
      //给变量赋值
      input_number: parseInt(this.properties.forminfo.valueScopeMin)
    });
  },
  cutbackfun: function () {
    //减少
    const that = this;
    let inputnumber = that.data.input_number;

    if (inputnumber == 1) {
      wx2my.showToast({
        title: '数量不可小于1',
        icon: 'none',
        duration: 2000
      });
    } else {
      inputnumber = inputnumber - 1;
      that.setData({
        input_number: inputnumber
      });
    }
  },
  increasefun: function () {
    //增加
    const that = this;
    let inputnumber = that.data.input_number;
    inputnumber = inputnumber + 1;
    that.setData({
      input_number: inputnumber
    });
  }
});