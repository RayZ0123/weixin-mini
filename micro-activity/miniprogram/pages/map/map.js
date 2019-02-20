// miniprogram/pages/map/map.js
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],// 当前地区的省市区
    longitude: '',
    latitude: '',
    markers: [],
    searchWord: '',//检索关键字
    showSuggest: false,//是否显示地址检索提示框
    suggestionItem: undefined,//检索结果
    showConfimBtn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;

    qqmapsdk = new QQMapWX({
      key: 'T2GBZ-QZBLX-PFU42-ZBWAN-BJGB7-DRFJK'
    });

    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.info('用户授权信息', res)

        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          me.getWxUserLocation()
        } else {
          // 向用户请求授权
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              me.getWxUserLocation()
            }
          })
        }
      }
    })
  },

  /**
   * 获取微信用户个人位置
   */
  getWxUserLocation: function () {
    let me = this;
    // 获取位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        let longitude = res.longitude
        let latitude = res.latitude
        me.getLocationCity(longitude, latitude)
      }
    })
  },

  /**
   * 获取当前城市
   */
  getLocationCity: function (longitude, latitude) {
    let me = this;

    let glo_addr = app.globalData.activityAddrObj;
    if (glo_addr && glo_addr.title) {
      let address = [];
      address.push(glo_addr.province);
      address.push(glo_addr.city);
      address.push(glo_addr.district);

      // 增加标记
      let markers = [];
      markers.push({
        id: 1,
        latitude: glo_addr.latitude,
        longitude: glo_addr.longitude,
        width: 50,
        height: 50,
      })

      me.setData({ address, longitude: glo_addr.longitude, latitude: glo_addr.latitude, markers })
      return;
    }
    let postUrl = app.globalData.baseUrl + '/baidu/index/location?latitude=' + latitude + '&longitude=' + longitude;
    app.requestServer(postUrl, {}, function (res) {
      if (res && res.errorCode == 9000) {
        let location_data = res.data || {};
        app.globalData.wxUserLocation = location_data;

        let address = [];
        address.push(location_data.province);
        address.push(location_data.city);
        address.push(location_data.district);

        // 增加标记
        let markers = [];
        markers.push({
          id: 1,
          latitude,
          longitude,
          width: 50,
          height: 50,
        })

        me.setData({ address, longitude, latitude, markers })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('address_seelct_map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  markertap: function(e, a, b) {
    console.info('点击标记', e, a, b)
  },

  bindClickMap: function(e) {
    console.info('点击地图', e)
  },

  bindClickPoiMap: function(e) {
    console.info('bindClickPoiMap', e)
  },

  /**
   * 查询内容变更
   */
  bindSearchInputChange: function(e) {
    let data = e.detail;
    let inputValue = data.inputValue;

    this.setData({
      searchWord: inputValue
    })

    this.getsuggest(inputValue)
  },

  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        let suggestionItem = this.data.suggestion[i];
        console.info('suggestionItem', suggestionItem)
        // 移动标记
        this.mapCtx.translateMarker({
          markerId: 1,
          duration: 1000,
          destination: {
            latitude: suggestionItem.latitude,
            longitude: suggestionItem.longitude,
          }
        })

        this.setData({
          backfill: suggestionItem.title,
          searchWord: suggestionItem.title,
          showSuggest: false,
          latitude: suggestionItem.latitude,
          longitude: suggestionItem.longitude,
          suggestionItem,
          showConfimBtn: true,
        });
      }
    }
  },

  //触发关键词输入提示事件
  getsuggest: function (keyword) {
    var _this = this;
    let regionCity = '';
    if (_this.data.address && _this.data.address.length > 2) {
      regionCity = _this.data.address[1];
    }
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region: regionCity, //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].province,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          showSuggest: true,
        });
      },
      fail: function (error) {
        //console.error(error);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },

  /**
   * 确定修改活动地址
   */
  bindChangePlace: function() {
    let { showConfimBtn, suggestionItem } = this.data;

    if (!showConfimBtn) {
      wx.showToast({
        title: '请先通过上方检索定位活动地址',
        icon: 'none'
      })

      return;
    }

    if (suggestionItem && suggestionItem.id) {
      app.globalData.activityAddrObj = suggestionItem;
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: '地址查询好像出错啦',
        icon: 'none'
      })

      return;
    }
  },
})