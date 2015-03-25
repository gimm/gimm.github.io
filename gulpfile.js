var gulp = require('gulp');

gulp.task('task1', function(){
    console.log('task1');
    process.stdout.setEncoding('utf8');
    process.stdin.setEncoding('utf8');
    gulp.src('README.md')
        .pipe(StringifyStream())
        .pipe(process.stdout);
});

var stream = require('stream'),
    util = require('util');

function StringifyStream(options) {
  if (!(this instanceof StringifyStream))
    return new StringifyStream(options);

  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this,options);
}

util.inherits(StringifyStream,stream.Transform);

StringifyStream.prototype._transform = function(d,e,callback) {
  this.push(JSON.stringify(d));
  callback();
};