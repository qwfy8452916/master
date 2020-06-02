const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
Component({
  mixins: [],
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
    sendval: 1
  },
  behaviors: ['wx://component-export'],
  props: {
    forminfo:Object
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {

  export() {
    return {
      fromdata: this.data.sendval
    };
  },

  ready: function () {
    this.setData({
      //给变量赋值
      sendval: parseInt(this.properties.forminfo.valueScopeMin)
    });
  },
  cutbackfun: function (e) {
    //减少
    const that = this;
    let inputnumber = that.data.sendval;

    if (inputnumber == 1) {
      wx2my.showToast({
        title: '数量不可小于1',
        icon: 'none',
        duration: 2000
      });
    } else {
      inputnumber = inputnumber - 1;
      that.setData({
        sendval: inputnumber
      });
    }
    e.detail.value=inputnumber
    this.props.onHangdleTab(e)
  },
  increasefun: function (e) {
    
    //增加
    const that = this;
    let inputnumber = that.data.sendval;
    inputnumber = inputnumber + 1;
    that.setData({
      sendval: inputnumber
    });
    e.detail.value=inputnumber
    this.props.onHangdleTab(e)
  }

  },
});
