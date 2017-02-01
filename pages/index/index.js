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
    {'name': '工作', 'data': 0},
    {'name': '学习', 'data': 0},
    {'name': '思考', 'data': 0},
    {'name': '写作', 'data': 0},
    {'name': '运动', 'data': 0},
    {'name': '阅读', 'data': 0}
  ]
// var tomatoDay = [
//     {'day': 0, 'numberOf': 0}
//   ]
var tomatoDay = [{'day': 0, 'numberOf': 0}]
var tomatoArray = [0]

var storeInDay = function(currentDay) {
  var tmp = {'day': currentDay, 'numberOf': 1}
  // tomatoDay.push(tmp)
  var endInx = tomatoDay.length - 1
  if (tomatoDay[endInx].day === currentDay) {
    tomatoDay[endInx].numberOf++
    console.log('in', tomatoArray[endInx])
    tomatoArray[endInx]++
    console.log('in', tomatoArray)
  } else {
    tomatoDay.push(tmp)
    tomatoArray.push(tmp.numberOf)
  }
  console.log('tomatoDay', tomatoDay)
  console.log('tomatoArray', tomatoArray)
  
  // 不到一周时，对数据补零
  var tmpArray = tomatoArray.slice(1)
  var restArray = []
  var len = 7 - tmpArray.length
  if (tmpArray.length < 7) {
    for (var i = 0; i < len; i++) {
      restArray.push(0)
    }
  }
  var result = restArray.concat(tmpArray)
  console.log('result', result)
  // return tomatoDay

  // 大于一周，即多于 7 个元素时，取后面后面 7 个元素
  if (result.length > 7) {
    var start = result.length - 7
    result = result.slice(start)
    console.log('start', start)
  }
  return result
}

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
    tomatoObj[checkedInx].data = tomatoObj[checkedInx].data + 1
    console.log('count', tomatoObj[checkedInx].data)
    console.log('tomato obj data', tomatoObj)
    // 存储番茄钟数据
      wx.setStorage({
        key: 'tomato', data: tomatoObj})
      var now = new Date()
      var day = now.getDate()
      // storeInDay(day)
      wx.setStorage({
        key: 'tomatoDays', data: storeInDay(day)})
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



