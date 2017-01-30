//index.js
//获取应用实例
var app = getApp()
var period = 1 * 60 * 1000
var interval = 1000
var timeCounter
var flag = 0
// var count = 0
var checkedInx = 0
var tomatoObj = [
  {'kindOf': '工作', 'numberOf': 0},
  {'kindOf': '学习', 'numberOf': 0},
  {'kindOf': '思考', 'numberOf': 0},
  {'kindOf': '写作', 'numberOf': 0},
  {'kindOf': '运动', 'numberOf': 0},
  {'kindOf': '阅读', 'numberOf': 0},
  ]

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
    tomatoObj[checkedInx].numberOf = tomatoObj[checkedInx].numberOf + 1
    console.log('count', tomatoObj[checkedInx].numberOf)
    // 存储番茄钟数据
      wx.setStorage({
        key: 'tomato', data: tomatoObj})
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
    newDisplay: 'none',
    radioItems: [
      {name: '工作', value: '0'},
      {name: '学习', value: '1', checked: 'true'},
      {name: '思考', value: '2'},
      {name: '写作', value: '3'},
      {name: '运动', value: '4'},
      {name: '阅读', value: '5'},
    ],
    hidden: false
  },

  radioChange: function(event) {
    var checked = event.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems['+i+'].checked'] = true
        checkedInx = i
        console.log('check inx', checkedInx)
        // console.log('this.data', this.data.radioItems[i].checked)
        // console.log('change', checked)
        // tomatoObj.kindOf = this.data.radioItems[i].name
        // console.log('findal', tomatoObj.kindOf)
      } else {
        changed['radioItems['+i+'].checked'] = false
      }
    }
    // wx.setStorage({
    //   key: 'kindOfTomato', data: count});
    // console.log('event', event)
    this.setData(changed)
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



