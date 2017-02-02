function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return `${year} 年 ${formatNumber(month)} 月 ${day} 日`
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getBeforeNday(date, n, flag) {
    var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24
    var yesterday = new Date()
    yesterday.setTime(yesterday_milliseconds)
    var strYear = yesterday.getFullYear()
    var strDay = yesterday.getDate()
    var strMonth = yesterday.getMonth() + 1

    // var dataStr = strYear+"/"+strMonth+"/"+strDay
    // var dataStr = `${strMonth} 月 ${strDay} 日`

    // 格式化输出格式
    if (flag === 0) {
        var dataStr = `${strYear}, ${strMonth}, ${strDay}`
    }
    if (flag === 1) {
        var dataStr = `${strMonth} 月 ${strDay} 日`
    }
    return dataStr
  }

// 生成最近一周时间横坐标
var makeDate = function() {
  var date1 = new Date()
  // console.log('date1', date1)
  var date2 = getBeforeNday(date1, date1.getDay() + 2, 0)
  var preivous = new Date(date2)
  // console.log('preivous', preivous)
  var daymis = 24 * 3600 * 1000
  var now = date1
  // console.log('now', now)
  var dateArray = []
  while(preivous < now) {
      console.log(preivous.getDate())
      dateArray.push(preivous.getDate())
      preivous = new Date(preivous.getTime()+daymis)
  }
  // console.log('result:', dateArray)
   // 第一个元素变成月日格式
  dateArray[0] = getBeforeNday(date1, date1.getDay() + 2, 1)
  // console.log('date 0', dateArray[0])
  return dateArray
}

module.exports = {
  formatTime: formatTime,
  getBeforeNday: getBeforeNday,
  makeDate: makeDate
}


