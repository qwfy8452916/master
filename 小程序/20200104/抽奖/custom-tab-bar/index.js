Component({
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#56ab4e",
    backgroundcolor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "项目介绍",
        iconPath: "/images/footer/introduction.png",
        selectedIconPath: "/images/footer/introduction.png"
      },
      {
        pagePath: "/pages/smartCab/smartCab",
        text: "智盒投资",
        iconPath: "/images/footer/smartCab.png",
        selectedIconPath: "/images/footer/smartCab.png"
      },
      {
        pagePath: "/pages/personal/personal",
        text: "个人中心",
        iconPath: "/images/footer/personal.png",
        selectedIconPath: "/images/footer/personal.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})