
const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
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
    role: {
      type: Object,
      value: {}
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

  //组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.sendval
    };
  },

  ready: function () {
    this.setData({
      //给变量赋值
      sendval: this.properties.forminfo.valueScopeJson[0].val
    });
  },
  enterValue: function (e) {
    this.setData({
      sendval: e.detail.value
    });
    this.props.onHangdleTab(e)
  }
  

  },
});
