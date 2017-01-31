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

function getBeforeNday(date,n) {      
    var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24 
    var yesterday = new Date()      
    yesterday.setTime(yesterday_milliseconds)          
    var strYear = yesterday.getFullYear()   
    var strDay = yesterday.getDate()
    var strMonth = yesterday.getMonth() + 1 
    if(strMonth < 10) {    
        strMonth = "0" + strMonth    
    }    
    // datastr = strYear+"/"+strMonth+"/"+strDay 
    var dataStr = `${strMonth} 月 ${strDay} 日`
    return dataStr 
  } 

module.exports = {
  formatTime: formatTime,
  getBeforeNday: getBeforeNday
}


