var through = require('through2')
var gitRawCommits = require('git-raw-commits')
var uuid = require('node-uuid')
var seperator = '|' + uuid.v1() + '|'
var _ = require('lodash')

var commits = []
function run(){
  var commitsStream = gitRawCommits({format:['%an','%ae','%at','%s','%b'].join(seperator)})
  var filter = through(function(buffer,enc,cb) {
    var content = buffer.toString()
    var parts = content.split(seperator)
    if(parseInt(parts[2])*1000>=startOfWeek()){
      commits.push({
        name: parts[0],
        email : parts[1],
        timestamp : parts[2],
        date : new Date(parts[2] * 1000),
        subject : parts[3],
        body : parts[4],
      })
    }else{
      return commitsStream.unpipe(filter)
    }
    cb()
  })
  commitsStream.pipe(filter)
    .on('error', function(e){
      console.log('unknown error')
      console.log(e)
    })
    .on('unpipe', function(){
      console.log(onGetCommits(commits))
    })
    .on('finish', function(){
      console.log(onGetCommits(commits))
    })

}

function onGetCommits(commits){
  var grouped = _.groupBy(commits, (function(c){
    return c.date.getDay()
  }))
  var days = [1,2,3,4,5,6,0]
  var ch = ['周一','周二', '周三', '周四', '周五', '周六', '周日']
  return days.map(function(day){
    return grouped[day] && _.uniqBy(grouped[day],'subject').reduce(function(prev, current){
      return prev  + current.subject+ '\n'
    },'')
  }).reduce(function(prev, current, i){
    return prev + ch[i] + '\n' + (current || '无\n') + '\n'
  },'')
}
function startOfWeek(date, options){
  date = date || new Date()
  var defaults = {
    startDayOfWeek: 1
  }
  var options = Object.assign({}, defaults, options)
  var day = date.getDay()
  var d = new Date(+date)
  var delta
  if(options.startDayOfWeek <= day){
    delta = options.startDayOfWeek - day
  }else{
    delta = options.startDayOfWeek - 7 - day
  }
  var theDay = new Date(d.setDate(d.getDate() + delta))

  theDay.setHours(0)
  theDay.setMinutes(0)
  theDay.setSeconds(0)
  theDay.setMilliseconds(0)

  return theDay
}


exports.run = run
exports.startOfWeek = startOfWeek

if (require.main === module) {
  run()
}
