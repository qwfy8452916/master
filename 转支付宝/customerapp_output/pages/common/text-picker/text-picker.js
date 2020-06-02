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
    },
    role: {
      type: Object,
      value: {}
    }
  },
  data: {
    input_select: '',
    selectlist: '',
    index: 0
  },
  behaviors: ['wx://component-export'],

  //组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.input_select
    };
  },

  ready: function () {
    this.setData({
      //给变量赋值
      input_select: this.properties.forminfo.valueScopeJson[0].val,
      selectlist: this.properties.forminfo.valueScopeJson
    });
  },
  bindPickerChange: function (e) {
    const selectlist_data = this.data.selectlist;
    this.setData({
      index: e.detail.value,
      input_select: selectlist_data[e.detail.value].val
    });
  }
});