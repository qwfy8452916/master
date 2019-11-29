const app = getApp()
let apiUrl = app.getApiUrl();

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}


Page({
  data: {
    hoteldata: [], //酒店数据
    province:[
      { name: "安徽", id: '1' }, { name: "江苏", id: '2' }, { name: "浙江", id: '3' },
    ],
    city: [
      { name: "合肥", id: '01' }, { name: "淮南", id: '02' }, { name: "蚌埠", id: '03' },
    ],
    citydata:[
      { name: "请选择", id: '' }
    ],
    showcity:[],
    showcityobj:[],




    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['江苏省', '苏州市', '姑苏区'],
    region2: ['江苏省', '苏州市'],
    customItem: '全部'
  },


  onLoad: function (options) {
    let that = this;
    // that.gethotel();

  },

  bindPickerChange1: function (e) {
    let that = this;
    let index1 = e.detail.value
    console.log(index1)
    let nowId = that.data.province[index1].id;
    if (nowId==1){
      this.setData({
        index1: e.detail.value,
        id: that.data.province[index1].id,
        citydata: that.data.city
      })
    }else{
      this.setData({
        index1: e.detail.value,
        id: that.data.province[index1].id,
        citydata: [
          { name: "请选择", id: '' }
        ],
      })
    }
  },

  bindPickerChange2: function (e) {
    let that = this;
    let index2 = e.detail.value
    let nowId = that.data.city[index2].id;
    let nowname = that.data.city[index2].name;
    let nowshowcity=that.data.showcity;
    let nowshowcityobj = that.data.showcityobj;
    if (nowshowcity.indexOf(nowId)==-1){
      nowshowcity.push(nowId)
      nowshowcityobj.push({
        name: nowname,
        id: nowId
      })
    }

    this.setData({
      index2: e.detail.value,
      id: that.data.province[index2].id,
      showcity: nowshowcity,
      showcityobj: nowshowcityobj
    })
    console.log(this.data.showcity)
    console.log(this.data.showcityobj)
  },
  
  close:function(e){
    let that=this;
    let index11=e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let nowshowcity = that.data.showcity;
    let nowshowcityobj = that.data.showcityobj;

      console.log(index11)
      nowshowcity.splice(index11,1)
      nowshowcityobj.splice(index11,1)
 
//     if (nowshowcity.length<=0){
//       this.setData({
//         citydata: []
//       })
//  }

    this.setData({
      showcity: nowshowcity,
      showcityobj: nowshowcityobj,
      // citydata: nowshowcity
    })
    console.log(this.data.showcity)
    console.log(this.data.showcityobj)
       
  },







  //获取酒店
  gethotel: function (e) {
    let that = this;
    wx.request({
      // url: apiUrl + '/hotel/all',
      url: apiUrl + '/ally/hotel/manage',
      data: {
        allyId: wx.getStorageSync("allyId"),
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          console.log(res.data.data)
          that.setData({
            hoteldata: res.data.data
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },





  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
            data.multiArray[2] = ['猪肉绦虫', '吸血虫']
            break
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物']
            data.multiArray[2] = ['鲫鱼', '带鱼']
            break
        }
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        break
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫']
                break
              case 1:
                data.multiArray[2] = ['蛔虫']
                break
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥']
                break
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓']
                break
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物']
                break
            }
            break
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼']
                break
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼']
                break
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎']
                break
            }
            break
        }
        data.multiIndex[2] = 0
        break
    }
    console.log(data.multiIndex)
    this.setData(data)
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindRegionChange2(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  
})