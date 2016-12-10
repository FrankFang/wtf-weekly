var through = require('through2');

var gitRawCommits = require('git-raw-commits');
 
gitRawCommits({format:'%an %ae %at %s %b'})
  .pipe(through(function(a,enc,cb) {
    console.log(a.toString()) 
    cb()
  }, function() {
    console.log(2)
  }))
