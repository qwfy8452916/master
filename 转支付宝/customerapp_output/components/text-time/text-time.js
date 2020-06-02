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
    sendval: ''

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

  // bindPickerChange: function (e) {
  //   this.setData({
  //     //给变量赋值
  //     sendval: e.detail.value
  //   });
  // },

   datePickerHMS(e) {
     let that=this;
    my.datePicker({
      format: 'HH:mm',
      currentDate: that.data.sendval,
      success: (res) => {
        that.setData({
           sendval:res.date
        })
        e.detail.value=res.date
        this.props.onHangdleTab(e)
      },
    });
  },

  },
});
