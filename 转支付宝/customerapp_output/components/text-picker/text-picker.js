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
    input_select: '',
    selectlist: '',
    arrIndex: 0,
    sendval:'1',
  },
  behaviors: ['wx://component-export'],
  props: {
    forminfo:Object,
  },
  didMount() {


  },
  didUpdate() {

  },
  didUnmount() {},
  methods: {

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
  // bindPickerChange: function (e) {
  //   const selectlist_data = this.data.selectlist;
  //   this.setData({
  //     index: e.detail.value,
  //     input_select: selectlist_data[e.detail.value].val
  //   });
  // },

    bindObjPickerChange(e) {
    
    this.setData({
      arrIndex: e.detail.value,
      sendval:this.props.forminfo.valueScopeJson[e.detail.value].id
    });
    e.detail.value=this.data.sendval
    this.props.onHangdleTab(e)
  },

  },
});
