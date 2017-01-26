//index.js
//获取应用实例
var app = getApp()
var period = 1 * 60 * 1000
var interval = 1000
var timeCounter
var flag = 0
var count = 0

var countStart = function(that) {
  // 渲染倒计时时钟
  that.setData({
    time: timeFormat(period)
  })
  if (period <= 0) {
    that.setData({
      time: '已完成',
      timeEndDisplay: 'none',
      newDisplay: 'block'
    })
    // timeout则跳出递归
    clearTimeout(timeCounter)
    count = count + 1
    console.log('count', count)
    // 存储番茄钟数据
    wx.setStorage({
      key: 'numberOfTomato', data: count});
      return
    }
    // wx.getStorage({
    //   key: 'numberOfTomato',
    //   success: function(res) {
    //     console.log('data', res.data)
    //   } 
    // })
  timeCounter = setTimeout(function() {
    period -= interval
    countStart(that)
  }, interval)
  flag = 1
}

var countStop = function() {
  clearTimeout(timeCounter)
}

var restartTimer = function(that) {
    period = 1 * 60 * 1000
    countStart(that)
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
    timerDisplay: 'none',
    newDisplay: 'none'
  },

  // 事件处理函数 开始计时
  bindViewTap: function(event) {
    console.log('event')
    this.setData({
      display: 'none',
      timerDisplay: 'block'
    })
    // countStart(this)
    restartTimer(this)
  },
  // 暂停计时
  stopCount: function() {
    countStop()
    var stopTime = this.data['time']
    this.setData({
      time: stopTime
    })
  },
  // 放弃
  giveUp: function() {
    console.log('give up')
    countStop()
    this.setData({
      display: 'block',
      timerDisplay: 'none',
    })
  },
  // 开始新番茄
  newTimer: function() {
    this.setData({
      timeEndDisplay: 'block',
      newDisplay: 'none'
    })
    restartTimer(this)
  },
  onLoad: function () {
    console.log('onLoad')
  }
})



