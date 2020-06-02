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
    role: {
      type: Object,
      value: {}
    },
    sendval: ''

  },
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

  ready: function () {},
  enterValue: function (e) {
    console.log(e)
    this.setData({
      sendval: e.detail.value
    });
    this.props.onHangdleTab(e)
  }



  },
});
