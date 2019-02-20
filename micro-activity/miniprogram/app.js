//app.js
App({

  globalData: {
    baseUrl: 'https://www.yana.site/appweb',

    activityAddrObj: {}, // 活动地址存储
  },

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }

    wx.hideTabBar({
      complete: function(res) {
        console.info('隐藏原生tabbar', res)
      }
    })
  },

  /**
   * 异步json请求
   */
  requestServer: function (url, params = {}, suc, fail, showLoading = true) {
    let me = this;
    if (showLoading) {
      wx.showLoading({
        title: '玩命加载中',
      })
    }

    //  统一配置请求参数
    params = this.doPostParams(params)

    //  发起异步post请求
    wx.request({
      url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8'
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      // },
      complete: function (res) {
        // console.info('接口请求结果', res)
        if (res && res.statusCode == 200) {
          let res_data = res.data;
          if (res_data && res_data.errorCode == 2000) {
            me.relogin()  //  重新登陆
          } else {
            suc && suc(res_data)
          }
        } else {
          fail && fail(res)
        }

        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  },

  /**
   * 统一配置请求参数
   */
  doPostParams: function (obj) {
    if (obj == undefined) {
      obj = {};
    }
    let _minitoken = wx.getStorageSync('_minitoken')
    let _miniopenid = wx.getStorageSync('_miniopenid')

    if (_miniopenid && _miniopenid.length > 0) {
      obj.__openid = _miniopenid;
    }

    if (_minitoken && _minitoken.length > 0) {
      obj.__token = _minitoken;
    }
    return obj;
  },

})
