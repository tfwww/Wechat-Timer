//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    display: ''
  },

  //事件处理函数
  bindViewTap: function(event) {
    console.log(event)
    this.setData({
      display: 'display: none;'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
