const app = getApp();
import wxrequest from '../../request/api'
Component({
  properties: {
    maxlength: {
      type: String,//类型
      value: 9//默认值
    },
  },
  data: {
    imglist: [],
    isshowupbtn: true,
    isshowpx: false,
    num: 1
  },
  methods: {
    bindChooiceProduct: function () {//上传图片
      const that = this;
      const max_length = that.data.maxlength;
      let imglength = that.data.imglist.length;
      let countnum = 9;
      that.setData({
        isshowpx: true
      });
      if(max_length != 0) {
        countnum = max_length;
      }
      if (imglength != 0){
        if(max_length != 0) {
          countnum = max_length - imglength;
        } else {
          countnum = 9;
        }
      }
      wx.chooseImage({
        count: countnum,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > countnum) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '最多上传' + max_length + '张'
            });
            return;
          } else {
            //启动上传等待中...  
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 10000
            });
            // let uploadImgCount = 0;
            for (let i = 0, h = tempFilePaths.length; i < h; i++) {
              wx.uploadFile({
                url: app.globalData.requestUrl + 'basic/file/upload2',
                filePath: tempFilePaths[i],
                name: 'fileContent',
                formData: {
                  'imgIndex': i
                },
                header: {
                  // "Content-Type": "multipart/form-data",
                  'content-type': 'application/json', // 默认值
                  'Authorization': 'Bearer' + app.globalData.token
                },
                success: function (res) {
                  if (res.statusCode == 200) {
                    // uploadImgCount++;
                    let data = JSON.parse(res.data);
                    let img_data = {};
                    let listdata = that.data.imglist;
                    img_data.filePath = data.data.filePath;
                    img_data.fileUri = data.data.fileUri;
                    img_data.type = false;
                    img_data.num = 0;
                    listdata.push(img_data);
                    let isshow = true;
                    if(max_length == listdata.length) {
                      isshow = false;
                    }
                    that.setData({
                      imglist: listdata,
                      isshowupbtn: isshow
                    });
                    wx.hideToast();
                  } else {
                    wx.hideToast();
                    wx.showModal({
                      title: '错误提示',
                      content: '上传图片失败,请重新上传',
                      showCancel: false
                    })
                  }
                },
                fail: function (res) {
                  wx.hideToast();
                  wx.showModal({
                    title: '错误提示',
                    content: '上传图片失败',
                    showCancel: false,
                    success: function (res) { }
                  })
                }
              });
            }
          }
        }
      });
    },
    closeimg: function (e) {//删除图片
      const that = this;
      const indexnum = e.currentTarget.dataset.index;
      let listdata = that.data.imglist;
      listdata.splice(indexnum, 1);
      that.setData({
        imglist: listdata,
        isshowupbtn: true
      });
    },
    confirmfun: function () {
      this.setData({
        isshowpx: false
      })
    },
    changeSort: function (e) {
      const that = this;
      const indexnum = e.currentTarget.dataset.index;
      let img_list = that.data.imglist;
      let num_data = that.data.num;
      let listdata = [];
      img_list[indexnum].type = !img_list[indexnum].type;
      if(img_list[indexnum].type) {
        img_list[indexnum].num = num_data;
        num_data += 1;
      } else {
        img_list[indexnum].num = 0;
        num_data -= 1;
      }
      console.log(num_data);
      console.log(img_list);
      that.setData({
        num: num_data,
        imglist: img_list
      })
    }
  }
})
