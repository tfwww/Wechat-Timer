var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js')
var res = wx.getSystemInfoSync()
var windowWidth = res.windowWidth
console.log('windowWidth', windowWidth)
var tomatoData = wx.getStorageSync('tomato')
console.log('tomatoData', tomatoData)

var tomatoObj = [
  {'name': '工作', 'data': 0},
  {'name': '学习', 'data': 0},
  {'name': '思考', 'data': 0},
  {'name': '写作', 'data': 0},
  {'name': '运动', 'data': 0},
  {'name': '阅读', 'data': 1}
  ]

var ringCharts = new wxCharts({
  animation: true,
  canvasId: 'ringCanvas',
  type: 'ring',
  series: tomatoData,
  width: windowWidth * 2,
  height: 300,
  dataLabel: false,
})

var squareCharts = new wxCharts({
    canvasId: 'areaCanvas',
    type: 'column',
    categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
    series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
    }],
    yAxis: {
        disabled: true
    },
    width: windowWidth * 2,
    height: 300
})

Page({
  data: {
    date: util.formatTime(new Date()),
    deviceWidth: windowWidth * 2
  },

  onLoad: function(){
    console.log('count on load')
    ringCharts
    squareCharts
  }
})