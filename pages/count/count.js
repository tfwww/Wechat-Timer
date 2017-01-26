var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js')
var res = wx.getSystemInfoSync()
var windowWidth = res.windowWidth
console.log('windowWidth', windowWidth)

var ringCharts = new wxCharts({
  animation: true,
  canvasId: 'ringCanvas',
  type: 'ring',
  series: [{
      name: '成交量1',
      data: 15,
    }, {
      name: '成交量2',
      data: 35,
    }, {
      name: '成交量3',
      data: 78,
    }, {
      name: '成交量4',
      data: 78,
  }],
  width: windowWidth * 2,
  height: 300,
  dataLabel: false,
})

var squareCharts = new wxCharts({
    canvasId: 'areaCanvas',
    type: 'area',
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
    series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }],
    yAxis: {
        format: function (val) {
            return val + '万';
        }
    },
    width: 640,
    height: 400
})

Page({
  data: {
    date: util.formatTime(new Date()),
    deviceWidth: windowWidth * 2
  },

  onLoad: function(){
    console.log('count on load')
    ringCharts
    // squareCharts
  }
})