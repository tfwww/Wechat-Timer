var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js')
var res = wx.getSystemInfoSync()
var windowWidth = res.windowWidth
console.log('windowWidth', windowWidth)
var tomatoData = wx.getStorageSync('tomato')
console.log('tomatoData', tomatoData)
var tomatoInDays = wx.getStorageSync('tomatoDays')

var tomatoObj = [
  {'name': '工作', 'data': 0},
  {'name': '学习', 'data': 0},
  {'name': '思考', 'data': 0},
  {'name': '写作', 'data': 0},
  {'name': '运动', 'data': 0},
  {'name': '阅读', 'data': 1}
  ]

var ringCharts = function(data) {
  new wxCharts({
  animation: true,
  canvasId: 'ringCanvas',
  type: 'ring',
  series: data,
  width: windowWidth * 2,
  height: 300,
  dataLabel: false,
  })
}

var squareCharts = function(data) {
    new wxCharts({
    canvasId: 'areaCanvas',
    type: 'column',
    legend: false,
    categories: util.makeDate(),
    series: [{
        name: '成交量1',
        data: data
    }],
    yAxis: {
        disabled: true
    },
    width: windowWidth * 2,
    height: 300
  })
}

// 计算累计番茄数
var calAllTomato = function() {
  var result = 0
  for (var i = 0; i < tomatoInDays.length; i++) {
    result += tomatoInDays[i]
  }
  return result
}

Page({
  data: {
    date: util.formatTime(new Date()),
    deviceWidth: windowWidth * 2,
    todayTomato: tomatoInDays[tomatoInDays.length -1],
    allTomato: calAllTomato()
  },

  onLoad: function(){
    console.log('count on load')
    tomatoData = wx.getStorageSync('tomato')
    ringCharts(tomatoData)
    squareCharts(tomatoInDays)
  },

  onShow: function() {
    console.log('show')
    tomatoData = wx.getStorageSync('tomato')
    console.log('tomatoData', tomatoData)
    ringCharts(wx.getStorageSync('tomato'))

    tomatoInDays = wx.getStorageSync('tomatoDays')
    squareCharts(tomatoInDays)
    this.setData({
      todayTomato: tomatoInDays[tomatoInDays.length -1],
      allTomato: calAllTomato()
    })
  }
})