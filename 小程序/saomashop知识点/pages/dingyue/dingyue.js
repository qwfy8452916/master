//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    wxmlContent:[
      {
        name: '迷你吧',
        ifBook: false
      },
      {
        name: '客房服务',
        ifBook: false
      },
      {
        name: '便利店',
        ifBook: false
      },
      {
        name: '大堂吧',
        ifBook: false
      },
      {
        name: '特产商城',
        ifBook: false
      },

    ]
  },
  onLoad(){

  },
  changeStatus(event){
    let status = event.currentTarget.dataset.status;
    let index = event.currentTarget.dataset.index;
    this.setData({
      [`wxmlContent[${index}].ifBook`]: !status
    })
  }
})
