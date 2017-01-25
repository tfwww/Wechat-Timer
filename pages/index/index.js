//index.js
//获取应用实例
var app = getApp()
var period = 25 * 60 * 1000
var interval = 1000

var countStart = function(that) {
  // 渲染倒计时时钟
  that.setData({
    time: timeFormat(period)
  })
  if (period <= 0) {
    that.setData({
      time: "已经截止"
    })
    // timeout则跳出递归
    clearTimeout(timeCounter)
  }
  setTimeout(function() {
    period -= interval
    countStart(that)
  }, interval)
}

// 时间格式化输出，如 25:19。每 1000ms 都会调用一次
var timeFormat = function(wholeTime) {
  // 换算时间
  var periodSec = (wholeTime / 1000) % 60
  var periodMin = Math.floor(period / 1000 / 60)
  return `${periodMin}:${periodSec}`
}

Page({
  data: {
    display: 'block',
    timerDisplay: 'none'
  },

  //事件处理函数
  bindViewTap: function(event) {
    console.log('event')
    this.setData({
      display: 'none',
      timerDisplay: 'block'
    })
    countStart(this)
  },

  onLoad: function () {
    console.log('onLoad')
  }
})

// 倒计时


