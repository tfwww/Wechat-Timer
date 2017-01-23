//index.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数
  bindViewTap: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../timer/timer'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
