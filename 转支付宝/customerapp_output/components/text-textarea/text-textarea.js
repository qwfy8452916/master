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
    input_textarea: '',
    selectShow:false,
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
      fromdata: this.data.input_textarea
    };
  },

  ready: function () {},
  enterValue: function (e) {
    this.setData({
      input_textarea: e.detail.value
    });
  }

  },
});
