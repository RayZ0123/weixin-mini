// miniprogram/pages/modules/modules.js

const arrutil = require('../../utils/arrutil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleTypeList: [
      {
        id: '1',
        key: 'sys',
        title: '游戏',
        seqNo: 0,
      }, 
      {
        id: '2',
        key: 'sys',
        title: '聚会',
        seqNo: 1,
      },
      {
        id: '3',
        key: 'user',
        title: '我的模板',
        seqNo: 2,
      }
    ],

    moduleList: []
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
    let { moduleTypeList, moduleList } = this.data;
    let moduleTypeListCopy = JSON.parse(JSON.stringify(moduleTypeList));
    let moduleTypeListSort = arrutil.sort(moduleTypeListCopy, 'seqNo')
    let obj = {};
    moduleTypeListSort && moduleTypeListSort.map(function(item, index) {
      obj[item.id] = item;
    })

    moduleList && moduleList.map(function(mitem, mindex) {
      let moduleTypeItem = obj[mitem.moduleType];
      if (moduleTypeItem.children == undefined) {
        moduleTypeItem.children = []
      }
      moduleTypeItem.children.push(mitem)
    })

    this.setData({
      moduleTypeList: moduleTypeListSort
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let sizearr = [3, 2, 3]
    let imgs = [
      'https://img.ishanshan.com/gimg/n/20190215/8e3d80760936054d16c7d48425809723',
      'https://img.ishanshan.com/gimg/n/20190217/9d3b5cce6b5b3d95fe4fdd8c83e56a9d'
    ]
    let words = '给海关法的圣迭戈火箭黄蜂官方首发好几个输给韩国发士大夫';

    let moduleList = [];
    let moduleTypeList = this.data.moduleTypeList;

    moduleTypeList && moduleTypeList.map(function (item, index) {
      let size = sizearr[index];
      
      for (let i = 0; i < size; i++) {
        let title = '';
        let titleSize = Math.floor(Math.random() * 15) + 1;
        for (let ti = 0; ti < titleSize; ti++) {
          title += words[Math.floor(Math.random() * words.length)]
        }
        moduleList.push({
          id: index + i + Math.random() + '',
          moduleType: item.id,
          moduleTypeKey: item.key,
          cover: imgs[Math.floor(Math.random() * imgs.length)],
          images: imgs,
          title,
        })
      }
    });

    this.setData({
      moduleList
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

  }
})