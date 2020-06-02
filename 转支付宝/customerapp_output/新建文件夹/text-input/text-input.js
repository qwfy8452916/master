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
    forminfo: {
      type: Object,
      value: {}
    },
    role: {
      type: Object,
      value: {}
    },
    inputtext: ''

  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {

  //组件最终对外导出的数据
  export() {
    return {
      fromdata: this.data.inputtext
    };
  },

  ready: function () {},
  enterValue: function (e) {
    this.setData({
      inputtext: e.detail.value
    });
  }



  },
});
