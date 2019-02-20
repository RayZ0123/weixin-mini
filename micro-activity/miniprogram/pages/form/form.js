// miniprogram/pages/form/form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityModule: {
      id: '1',
      images: [
        {
          id: '0',
          imgurl: 'https://img.ishanshan.com/gimg/n/20190215/8e3d80760936054d16c7d48425809723'
        },
        {
          id: '1',
          imgurl: 'https://img.ishanshan.com/gimg/n/20190217/9d3b5cce6b5b3d95fe4fdd8c83e56a9d'
        },
        {
          id: '2',
          imgurl: 'https://img.ishanshan.com/gimg/n/20190215/8e3d80760936054d16c7d48425809723'
        },
        {
          id: '3',
          imgurl: 'https://img.ishanshan.com/gimg/n/20190217/9d3b5cce6b5b3d95fe4fdd8c83e56a9d'
        }
      ]
    },
    formData: {
      beginDay: '2019-02-15',
      beginTime: '22:11',
      endDay: '2019-02-15',
      endTime: '23:24',
      address: {
        
      }
    },
    moreFieldVisible: false,
    userFieldVisible: false,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.info('用户授权信息', res)
        if (!res.authSetting['scope.userLocation']) {
          // 向用户请求授权
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindChangeModule: function() {
    wx.navigateTo({
      url: '/pages/modules/modules'
    });
  },

  /**
   * 跳转地图选择界面
   */
  bindChangeMapPlace: function() {
    let me = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          // 向用户请求授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: function() {
              me.openChooseLocation();
            }
          })
        } else {
          me.openChooseLocation();
        }
      }
    })

    
  },

  openChooseLocation: function() {
    let me = this;
    wx.chooseLocation({
      success: function (res) {
        let formData = me.data.formData;
        formData.address.addr = res.address;
        formData.address.latitude = res.latitude;
        formData.address.longitude = res.longitude;
        formData.address.name = res.name;
        me.setData({
          formData
        })
      }
    })
  },

  /**
   * 修改开始时间的日期
   */
  bindChangeBeginDay: function(e) {
    let formData = this.data.formData;
    formData.beginDay = e.detail.value;
    this.setData({
      formData
    })
  },

  /**
   * 修改开始时间的日期
   */
  bindChangeBeginTime: function (e) {
    let formData = this.data.formData;
    formData.beginTime = e.detail.value;
    this.setData({
      formData
    })
  },

  /**
   * 修改结束时间的日期
   */
  bindChangeEndDay: function (e) {
    let formData = this.data.formData;
    formData.endDay = e.detail.value;
    this.setData({
      formData
    })
  },

  /**
   * 修改开始时间的日期
   */
  bindChangeEndTime: function (e) {
    let formData = this.data.formData;
    formData.endTime = e.detail.value;
    this.setData({
      formData
    })
  },

  bindChangeMoreFieldVisible: function() {
    this.setData({
      moreFieldVisible: !this.data.moreFieldVisible
    })
  },

  bindChangeUserFieldVisible: function () {
    this.setData({
      userFieldVisible: !this.data.userFieldVisible
    })
  },
})