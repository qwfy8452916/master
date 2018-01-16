var app = getApp();
let apiUrl = app.getApiUrl();
Page({
    data: {
        data: [],//数据
        house_space: 0,//风格
        house_style: 0,//空间
        house_section: 0,//户型
        house_color: 0,//颜色
        page: 1,//当前页码
        // count:null,
        tabTxt: ['风格', '空间', '户型', '颜色'],//tab文案
        tab: [true, true, true, true],
        scrollTop: 0,
        iidex:null,
        filterfengge:null,
        filterhuxing: null,
        filterjvbu: null,
        filteryanse: null,
        moren:false,
        chushi:20,
        fgnumber:20,
        kongnumber:20,
        huxingnumber:20,
        colornumber:20,
        fgbc:null,
        kjbc:null,
        hxbc:null,
        ysbc:null,
        mrshujv:null
    },

    xiaoguotuxq: function (e) {
        console.log(e)
        wx.navigateTo({
            url: '../xiaoguotuxiangq/xiaoguotuxiangq?id=' + e.currentTarget.dataset.id
        })
    },

    onReady: function () {
        //初始化数据
        var self = this;
        self.getFilter();
        wx.request({
            url: apiUrl + '/appletcarousel/meitu',
            data: {
                count: self.data.chushi
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                self.setData({
                    data: res.data.info.list,
                    mrshujv: res.data.info.list
                })

            },
            fail: function () {
                console.log('error!!!!!!!!!!!!!!')
            }
        })
       
    },
    // 选项卡
    filterTab: function (e) {
        var data = [true, true, true, true], index = e.currentTarget.dataset.index;
        data[index] = !this.data.tab[index];
        this.setData({
            tab: data,
        })
    },
    // 获取筛选项
    getFilter: function () {
        var self = this;
        wx.request({
            url: apiUrl + '/appletcarousel/meitu',
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data.attribute.fengge)
                self.setData({
                    filterfengge: res.data.attribute.fengge,
                    filterhuxing: res.data.attribute.huxing,
                    filterjvbu: res.data.attribute.location,
                    filteryanse: res.data.attribute.color,
                });
                
            },
            fail: function () {
                console.log('error!!!!!!!!!!!!!!')
            }
        })
    },


    // 筛选项点击操作
    filter: function (e) {
        var self = this, id = e.currentTarget.dataset.id, iidex = e.currentTarget.dataset.index, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
        self.setData({
            fgnumber: 20,
            kongnumber: 20,
            huxingnumber: 20,
            colornumber: 20,
        })
        switch (iidex) {
            case '0':
                tabTxt[0] = txt;
                self.setData({
                    house_space: id,
                    page: 1,
                    data: [],
                    tab: [true, true, true, true],
                    tabTxt: tabTxt,
                    iidex:0,
                    moren:true,
                    fgbc: id
                   
                });
                wx.request({
                    url: apiUrl+'/appletcarousel/meitu',
                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count:self.data.fgnumber
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)
                        if (res.data.info.list.length < 1) {

                            self.setData({
                                data: self.data.mrshujv,
                                scrollTop: 0
                            })
                        } else {
                            self.setData({
                                data: res.data.info.list,
                                scrollTop: 0
                            })
                        }

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }
                })

                break;
            case '1':
                tabTxt[1] = txt;
                self.setData({
                    house_style: id,
                    page: 1,
                    data: [],
                    tab: [true, true, true, true],
                    tabTxt: tabTxt,
                    iidex: 1,
                    moren: true,
                    kjbc: id,
                });

                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',
                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: self.data.kongnumber
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        if (res.data.info.list < 1) {
                            self.setData({
                                data: self.data.mrshujv,
                                scrollTop: 0
                            })
                        } else {
                            self.setData({
                                data: res.data.info.list,
                                scrollTop: 0
                            })
                        }

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }
                })

                break;
            case '2':
                tabTxt[2] = txt;
                self.setData({
                    house_section: id,
                    page: 1,
                    data: [],
                    tab: [true, true, true, true],
                    tabTxt: tabTxt,
                    iidex: 2,
                    moren: true,
                    hxbc: id
                });
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',
                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: self.data.huxingnumber
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)
                        if (res.data.info.list < 1) {
                            self.setData({
                                data: self.data.mrshujv,
                                scrollTop: 0
                            })
                        } else {
                            self.setData({
                                data: res.data.info.list,
                                scrollTop: 0
                            })
                        }

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }
                })
                break;
            case '3':
                tabTxt[3] = txt;
                self.setData({
                    house_color: id,
                    page: 1,
                    data: [],
                    tab: [true, true, true, true],
                    tabTxt: tabTxt,
                    iidex: 3,
                    moren: true,
                    ysbc: id
                });
    
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',
                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: self.data.colornumber
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)
                        if (res.data.info.list < 1) {
                            self.setData({
                                data: self.data.mrshujv,
                                scrollTop: 0
                            })
                        } else {
                            self.setData({
                                data: res.data.info.list,
                                scrollTop: 0
                            })
                        }

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }
                })

                break;
        }

    },
   

    // //下拉加载
    downLoad: function () {
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000
        });
            var self = this;
            if (self.data.moren==false){
                let kka = self.data.chushi + 10
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',
                    data: {
                        count: kka
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)
                        self.setData({
                            data: res.data.info.list,
                            chushi: kka
                        })

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }
                })
            }
            if (self.data.iidex == 0) {
                let kkb = self.data.fgnumber + 10
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',

                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: kkb,
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)

                        self.setData({
                            data: res.data.info.list,
                            fgnumber: kkb
                        })

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }


                })
            } else if (self.data.iidex == 1){
                let kkc = self.data.kongnumber+ 10
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',

                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: kkc,
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)

                        self.setData({
                            data: res.data.info.list,
                            kongnumber: kkc
                        })

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }


                })
            } else if (self.data.iidex == 2){
                let kkd = self.data.huxingnumber + 10
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',

                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: kkd,
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)
                        self.setData({
                            data: res.data.info.list,
                            huxingnumber: kkd
                        })

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }


                })
            } else if (self.data.iidex == 3){
                let kke = self.data.colornumber + 10
                wx.request({
                    url: apiUrl + '/appletcarousel/meitu',

                    data: {
                        fengge: self.data.fgbc,
                        huxing: self.data.kjbc,
                        location: self.data.hxbc,
                        color: self.data.ysbc,
                        count: kke,
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.info.list)

                        self.setData({
                            data: res.data.info.list,
                            colornumber: kke
                        })

                    },
                    fail: function () {
                        console.log('error!!!!!!!!!!!!!!')
                    }


                })
            }
        
    },


})