const app = getApp();
import wxrequest from '../../request/api'
//0：未参与，1：报名待审核，2：已报名待签到，3：已签到，-1：报名驳回，100：不需要报名，101：报名截止
Page({
  data: {
    signupdata: '',
    username: '',
    usertel: '',
    organisation: '',
    userremark: '',
    auditRemark: '',
    submittype: 0,
    meetingdata: '',
    meetingindex: 4,//1：报名，2：报名成功，3：签到，4：会议结束or其他问题
    isshowform: false,
    isshowpopups: false,
    giftpackage: false,
    imgurl: '',
    isshowimg: false
  },
  onLoad: function () {
    this.get_signupdata();
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_signupdata: function () {//报名状态
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      code: app.globalData.code
    };
    wxrequest.getsignupdata(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let titleval = '';
        let meetingval = 5;
        let isshowpopupsval = false;
        let giftpackageval = false;
        if(resdatas.enlistOrSign == 1) {
          titleval = '报名  SignUp';
          meetingval = 1;
        } else {
          titleval = '签到  SignIn';
          meetingval = 3;
        }
        if(resdatas.status == 1 || resdatas.status == 2 || resdatas.status == 3 || resdatas.status == 101) {
          isshowpopupsval = true;
        }
        if(resdatas.receiveGiftFlag == 0 && resdatas.detail.couponFlag == 1 && resdatas.status == 3 && resdatas.enlistOrSign == 2) {
          giftpackageval = true;
        }
        wx.setNavigationBarTitle({
          title: titleval
        });
        that.setData({
          signupdata: resdatas,
          meetingindex: meetingval,
          giftpackage: giftpackageval,
          isshowpopups: isshowpopupsval
        });
        if (resdatas.enlistOrSign == 2 && resdatas.status == 2) {
          that.participatefun();
        }
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        setTimeout(function () {
          wx.reLaunch({
            url: app.globalData.jumpurl
          })
        }, 4000);
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  toggleformbox: function () {
    this.setData({
      isshowform: !this.data.isshowform
    });
  },
  participatefun: function () {//报名or签到
    const that = this;
    if(that.data.submittype == 1) {
      return false;
    }
    that.setData({
      submittype: 1
    });
    const signupdata_data = that.data.signupdata;
    if(signupdata_data.status == 0 || signupdata_data.status == -1 || signupdata_data.status == 100) {
      if(that.data.username == '') {
        wx.showToast({
          title: '请填写姓名',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          submittype: 0
        });
        return false;
      } else if(that.data.usertel == '' || !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(that.data.usertel)) {
        wx.showToast({
          title: '请填写正确的手机号',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          submittype: 0
        });
        return false;
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    const linkData = {
      actId: signupdata_data.detail.actId,
      actMeetingId: signupdata_data.detail.id,
      visitorName: that.data.username,
      visitorMobile: that.data.usertel,
      visitorOrganisation: that.data.organisation,
      visitorRemark: that.data.userremark,
    }
    if(signupdata_data.enlistOrSign == 1) {
      wxrequest.putsignup(linkData).then(res => {
        that.dealwith(res);
      }).catch(err => {
        console.log(err)
      });
    } else {
      wxrequest.putsignin(linkData).then(res => {
        that.dealwith(res);
      }).catch(err => {
        console.log(err)
      });
    }
  },
  dealwith: function (res) {
    const that = this;
    let signupdata = that.data.signupdata;
    let resdata = res.data;
    let resdatas = res.data.data;
    if (resdata.code == 0) {
      wx.hideLoading();
      if(signupdata.enlistOrSign == 1) {//报名之后处理某些事情
        signupdata.status = resdatas;
        that.setData({
          submittype: 0,
          isshowpopups: true,
          signupdata: signupdata,
          isshowform: false
        });
      } else if(signupdata.enlistOrSign == 2) {//签到之后处理某些事情
        if(resdatas.status != 0) {
          that.setData({
            submittype: 0,
            username: '',
            usertel: '',
            organisation: '',
            userremark: '',
            auditRemark: '',
          });
          wx.showToast({
            title: resdatas.msg,
            icon: 'none',
            duration: 3000
          });
        } else {
          that.get_signupdata();
        }
        // if(resdatas.status != 0) {
        //   that.setData({
        //     submittype: 0,
        //     username: '',
        //     usertel: '',
        //     organisation: '',
        //     userremark: '',
        //     auditRemark: '',
        //   });
        //   wx.showToast({
        //     title: resdatas.msg,
        //     icon: 'none',
        //     duration: 3000
        //   });
        // } else {
        //   signupdata.status = 3;
        //   let giftpackageval = false;
        //   if(signupdata.receiveGiftFlag == 0 && signupdata.detail.couponFlag == 1) {
        //     giftpackageval = true;
        //   }
        //   that.setData({
        //     signupdata: signupdata,
        //     giftpackage: giftpackageval
        //   });
        // }
      }
    } else {
      wx.hideLoading();
      that.setData({
        submittype: 0
      });
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      });
    }
  },
  clearfun: function (e) {
    const that = this;
    const valindex = e.currentTarget.dataset.val;
    console.log(1111111111);
    if(valindex == 1) {
      that.setData({
        username: ' '
      });
    } else if (valindex == 2) {
      that.setData({
        usertel: ' '
      });
    }
  },
  usernamefun: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  usertelfun: function (e) {
    this.setData({
      usertel: e.detail.value
    })
  },
  organisationfun: function (e) {
    this.setData({
      organisation: e.detail.value
    })
  },
  userremarkfun: function (e) {
    this.setData({
      userremark: e.detail.value
    })
  },
  jumpfun: function () {
    wx.reLaunch({
      url: app.globalData.jumpurl
    })
  },
  hiddenpopupsfun: function () {
    this.setData({
      isshowpopups: false
    })
  },
  getformdatafun: function () {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      actId: that.data.signupdata.detail.actId,
      meetingSettingId: that.data.signupdata.detail.id
    };
    wxrequest.getmeetingcusinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          username: resdatas.visitorName,
          usertel: resdatas.visitorMobile,
          organisation: resdatas.visitorOrganisation,
          userremark: resdatas.visitorRemark,
          auditRemark: resdatas.auditRemark,
        });
        that.toggleformbox();
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  delayfun: function () {
    setTimeout(()=>{
      this.participatefun();
    },300);
  },
  downloadfun (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    if (edata.datatype == 1) {
      that.downloadfile(edata.url);
    } else {
      that.downloadimg(edata.url);
    }
  },
  downloadfile(dataUrl){
    wx.downloadFile({//下载文件
      url: dataUrl, 
      success(res) {
        wx.saveFile({//保存到本地
          tempFilePath: res.tempFilePath,
          success: function (res) {
            const savedFilePath = res.savedFilePath;
            wx.showToast({
              title: '下载成功',
              icon: 'success'
            });
            wx.openDocument({// 打开文件
              filePath: savedFilePath,
              success: function (res) {
                wx.hideToast();
                console.log('打开文档成功')
              },
            });
          },
          fail: function (err) {
            wx.showToast({
              title: '下载失败，请重新下载',
              icon: 'none'
            });
            console.log('下载失败')
          }
        });
      }
    })
  },
  downloadimg(dataUrl) {
    const that = this;
    wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: dataUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function (res) {
            wx.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success:modalSuccess=>{
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击保存图片按钮即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData",failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  mycouponfun: function () {
    wx.reLaunch({
      url: '../my/my?type==2'
    })
  },
  hiddengiftpackage: function () {
    this.setData({
      giftpackage: false
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
    const signupdata = that.data.signupdata;
    if(e.detail.statustype == 1) {
      signupdata.status = 3;
      signupdata.receiveGiftFlag = 1;
      that.setData({
        signupdata: signupdata
      })
    }
  },
  openimg: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let url = '';
    if(edata.url) {
      url = edata.url;
    }
    that.setData({
      imgurl: url,
      isshowimg: !that.data.isshowimg
    })
  }
})