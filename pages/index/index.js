//index.js
//获取应用实例
var app = getApp()
var period = 1 * 60 * 1000
var interval = 1000
var timeCounter
var flag = 0
var res = wx.getSystemInfoSync()
var sysWidth = res.windowWidth
var sysHeight = res.windowHeight 

// var count = 0
var checkedInx
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

var fitImg = function(that) {
  var sysWidth = res.windowWidth
  var sysHeight = res.windowHeight
  wx.getImageInfo({
      src: '../../images/bg.png',
      success: function (res) {
        console.log('img width', res.width)
        var scale = sysHeight / res.height
        console.log('img height', scale)
        that.setData({
          imgWidth: sysWidth,
          imgHeight: sysHeight
        })
      }
    })
}

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
    x: 0,
    y: 0,
    hiddenView: false,
    display: 'block',
    timerDisplay: 'none',
    newDisplay: 'none',
    radioItems: [
      {name: '工作', value: '../../images/work1.png', style: 'label-work-study'},
      {name: '学习', value: '../../images/study1.png', style: 'label-work-study', checked: 'true', font: 'black-font'},
      {name: '思考', value: '../../images/think1.png', style: 'label-think'},
      {name: '写作', value: '../../images/write1.png', style: 'label-write'},
      {name: '运动', value: '../../images/sports1.png'},
      {name: '阅读', value: '../../images/read1.png', style: 'label-read'},
    ],
    hidden: false
  },

  start: function(e) {
    console.log('start e', e)
    this.setData({
      hiddenView: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function(e) {
    this.setData({
      hiddenView: true
    })
  },

  radioChange: function(event) {
    var checked = event.detail.value
    var changed = {}
    var blackFont = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems['+i+'].checked'] = true
        blackFont['radioItems['+i+'].font'] = 'black-font'
        checkedInx = i
        console.log('check inx', checkedInx)
        // console.log('this.data', this.data.radioItems[i].checked)
        // console.log('change', checked)
        // tomatoObj.kindOf = this.data.radioItems[i].name
        // console.log('findal', tomatoObj.kindOf)
      } else {
        changed['radioItems['+i+'].checked'] = false
        blackFont['radioItems['+i+'].font'] = ''
      }
    }
    // wx.setStorage({
    //   key: 'kindOfTomato', data: count});
    // console.log('event', event)
    console.log('touched font', blackFont)
    this.setData(changed)
    this.setData(blackFont)
  },

  // 事件处理函数 开始计时
  bindViewTap: function(event) {
    console.log('event')
    this.setData({
      display: 'none',
      timerDisplay: 'block',
    })
    fitImg(this)
    // 画圆
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createContext() //创建绘图工具
    // context.stroke()//对当前的路径进行描边
    // context.setStrokeStyle("#ff0000")//同上
    // context.setLineWidth(2)
    // context.moveTo(sysWidth / 2, 80)// 把路径移动到画布中的指定点，但不创建线条。参数自然就是坐标
    context.arc(sysWidth / 2, 100, 90, 0, 2 * Math.PI, true)//添加一个弧形路径到当前路径，顺时针绘制。
    //参数方面其中前两个参数还是坐标，第三个参数是矩形的宽度，第四各参数是起始弧度，从起始弧度开始，扫过的弧度，后一个参数可有可无
    context.stroke()
    context.setStrokeStyle("white")
    context.setLineWidth(2)
    context.arc(sysWidth / 2, 100, 110, 0, 2 * Math.PI, true)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(0.5)
    context.arc(sysWidth / 2, 100, 140, 0, 2 * Math.PI, true)
    context.stroke()
    // 调用 wx.drawCanvas，通过 canvasId 指定在哪张画布上绘制，通过 actions 指定绘制行为
    wx.drawCanvas({
      canvasId: 'circle',//这个就是刚开始设置的plainId
      actions: context.getActions() // 获取绘图动作数组
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



