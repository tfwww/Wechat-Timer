var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js')
var res = wx.getSystemInfoSync();
var windowWidth = res.windowWidth;

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

Page({
  data:{
    date: util.formatTime(new Date()),
    deviceWidth: windowWidth * 2
  },

  onLoad:function(options){
    console.log('count on load')
    ringCharts
  }
})