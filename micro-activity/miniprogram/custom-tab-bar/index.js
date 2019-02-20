Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#3385ff",
    createBtnPath: "/images/tabbar/create-btn.png",
    createPagePath: "/pages/form/form",
    list: [{
      pagePath: "/pages/all-list/allList",
      iconPath: "/images/tabbar/main.png",
      selectedIconPath: "/images/tabbar/main-select.png",
      text: "首页"
    }, {
      pagePath: "/pages/my-list/myList",
      iconPath: "/images/tabbar/list.png",
      selectedIconPath: "/images/tabbar/list-select.png",
      text: "列表"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.info('data', data)

      // tab页切换
      if (data.index != 'page') {
        this.setData({
          selected: data.index
        })
        wx.switchTab({ url })
      } else {
        // 跳转到非tab页时
        wx.navigateTo({
          url
        })
      }
      
    }
  }
})