var target = require('./') 
var assert = require('assert')



console.log('test startOfWeek')
!function(){
  var startOfWeek = target.startOfWeek
  var date, result

  date = new Date(2016,11,5, 23,23,0)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))

  date = new Date(2016,11,6)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))

  date = new Date(2016,11,7)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))

  date = new Date(2016,11,8)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))
  
  date = new Date(2016,11,9)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))
  
  date = new Date(2016,11,10)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))

  date = new Date(2016,11,11)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,5, 0,0,0))

  date = new Date(2016,11,12)
  result = startOfWeek(date)
  assert.equal(+result, +new Date(2016,11,12, 0,0,0))

}()
console.log('all ok')
